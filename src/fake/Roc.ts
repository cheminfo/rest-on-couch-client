/* tslint:disable max-classes-per-file */
import { randomBytes } from 'crypto';

import { RocHTTPError } from '../Error';
import {
  BaseRoc,
  BaseRocDocument,
  BaseRocQuery,
  IDocument,
  INewAttachment,
  INewDocument,
  INewRevisionMeta,
  IQueryOptions,
  IQueryResult
} from '../RocBase';

export interface IRocData {
  documents: {
    [key: string]: IDocument[];
  };
  query: {
    [key: string]: IQueryResult[];
  };
}

export class FakeQuery<A, B> extends BaseRocQuery {
  protected roc: FakeRoc;
  constructor(roc: FakeRoc, viewName: string) {
    super(viewName);
    this.roc = roc;
  }
  public async fetch(
    option: IQueryOptions = {}
  ): Promise<Array<IQueryResult<A, B>>> {
    return this.roc.data.query[this.viewName];
  }
}

export class FakeDocument extends BaseRocDocument {
  protected roc: FakeRoc;
  constructor(roc: FakeRoc, data: string | IDocument) {
    if (typeof data === 'string') {
      super(data);
    } else {
      super(data._id);
      this.value = data;
    }
    this.roc = roc;
  }

  public async fetch(rev?: string) {
    const revs = this.roc.data.documents[this.uuid];
    if (!revs) {
      throw new RocHTTPError(404, 'document not found');
    }
    const doc: IDocument | undefined = rev
      ? revs.find((d) => d._rev === rev)
      : revs[revs.length - 1];

    if (doc === undefined) {
      throw new RocHTTPError(404, 'revision does not exist ');
    }
    this.value = doc;
    return doc;
  }

  public async update(
    content: object,
    newAttachments?: INewAttachment[],
    deleteAttachments?: string[]
  ) {
    if (newAttachments || deleteAttachments) {
      throw new Error('attachments not supported yet');
    }
    if (this.value === undefined) {
      await this.fetch();
    }

    this.checkConflict();
    // value must be defined after fetch
    const doc = this.value!;
    const newMeta = getNewRevisionMeta(doc._rev);
    const newDocument: IDocument = {
      ...doc,
      $content: content,
      ...newMeta
    };

    this.roc.data.documents[this.uuid].push(newDocument);
    this.value = newDocument;
    return newDocument;
  }

  public async addGroups(groups: string | string[]) {
    if (this.value === undefined) {
      await this.fetch();
    }

    this.checkConflict();
    const doc = this.value!;
    const owners = new Set(doc.$owners);
    if (typeof groups === 'string') {
      owners.add(groups);
    } else {
      groups.forEach((group) => owners.add(group));
    }
    doc.$owners = Array.from(owners);
    return doc.$owners.slice();
  }

  private checkConflict() {
    return;
  }
}

function getNewRevisionMeta(oldRev: string): INewRevisionMeta {
  const revMatch = oldRev.match(/^(\d+)/);
  let oldInc: string;
  if (!revMatch) {
    oldInc = '0';
  } else {
    oldInc = revMatch[0];
  }
  const newInc = +oldInc + 1;
  const rev = randomBytes(16).toString('hex');
  return {
    _rev: `${newInc}-${rev}`,
    $modificationDate: Date.now()
  };
}

export class FakeRoc extends BaseRoc<FakeDocument> {
  public static x: number = 2;
  public data: IRocData;

  constructor(rocData: IRocData) {
    super();
    this.data = rocData;
  }

  public async getDocument(uuid: string) {
    return new FakeDocument(this, uuid);
  }

  public getQuery<KeyType = any, ValueType = any>(viewName: string) {
    return new FakeQuery<KeyType, ValueType>(this, viewName);
  }

  public async create(newDocument: INewDocument): Promise<FakeDocument> {
    const uuid = randomBytes(16).toString('hex');
    const rev = `1-${randomBytes(16).toString('hex')}`;
    const document: IDocument = {
      ...newDocument,
      _id: uuid,
      _rev: rev,
      $type: 'entry',
      $lastModification: 'test@test.com',
      $modificationDate: Date.now(),
      $creationDate: Date.now(),
      $owners: ['test@test.com', ...Array.from(new Set(newDocument.$owners))]
    };
    if (!this.data.documents[uuid]) {
      this.data.documents[uuid] = [];
    }
    this.data.documents[uuid].push(document);
    return new FakeDocument(this, document);
  }

  public async getUser() {
    return 'test@test.com';
  }
}
