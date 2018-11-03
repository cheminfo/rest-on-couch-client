/* tslint:disable max-classes-per-file */
import { randomBytes } from 'crypto';

import BaseRoc from '../base/BaseRoc';
import BaseRocDocument from '../base/BaseRocDocument';
import BaseRocQuery from '../base/BaseRocQuery';
import { BaseRocReduceQuery } from '../base/BaseRocReduceQuery';
import { RocClientError, RocHTTPError } from '../Error';
import {
  ICouchAttachments,
  IDocument,
  IFetchAttachmentOptions,
  INewAttachment,
  INewDocument,
  INewRevisionMeta,
  IQueryOptions,
  IQueryResult,
  IReduceQueryOptions,
  IReduceQueryResult
} from '../types';

export interface IFakeRocData {
  documents: {
    [key: string]: IDocument[];
  };
  attachments: {
    // document uuid
    [key: string]: {
      // attachment name
      [key: string]: string; // attachment data base64
    };
  };
  query: {
    [key: string]: IQueryResult[];
  };
  reducer?: {
    [key: string]: IReduceQueryResult[];
  };
}

export class FakeQuery<A, B> extends BaseRocQuery {
  protected roc: FakeRoc;
  constructor(roc: FakeRoc, viewName: string, baseOptions: IQueryOptions) {
    super(viewName, baseOptions);
    this.roc = roc;
  }

  public async fetch(
    option: IQueryOptions = {}
  ): Promise<Array<IQueryResult<A, B>>> {
    if (!this.roc.data.query[this.viewName]) {
      throw new RocHTTPError(401, `${this.viewName} is not a view with owner`);
    }
    return this.roc.data.query[this.viewName];
  }
}

export class FakeReducer<A, B> extends BaseRocReduceQuery {
  protected roc: FakeRoc;
  constructor(roc: FakeRoc, viewName: string) {
    super(viewName);
    this.roc = roc;
  }

  public async fetch(
    option: IReduceQueryOptions = {}
  ): Promise<Array<IReduceQueryResult<A, B>>> {
    throw new Error('not implemented');
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

  public async fetchAttachment(
    name: string,
    options: IFetchAttachmentOptions = {
      type: 'text'
    }
  ) {
    const attachments = this.roc.data.attachments[this.uuid];
    if (attachments) {
      const data = attachments[name];
      if (data) {
        const buffer = Buffer.from(data, 'base64');
        if (options.type === 'buffer') {
          return buffer;
        } else if (options.type === 'text') {
          return buffer.toString();
        } else {
          throw new RocClientError('unsupported fetch attachment options');
        }
      }
    }
    throw new RocClientError('attachment does not exist');
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
    if (this.value === undefined) {
      await this.fetch();
    }

    this.checkConflict();
    // value must be defined after fetch
    const doc = this.value!;

    if (deleteAttachments) {
      for (const attachment of deleteAttachments) {
        const att = this.roc.data.documents[this.uuid][0]._attachments;
        if (!att || !att[attachment]) {
          throw new RocClientError('attachment to delete does not exist');
        }
        delete att[attachment];
        delete this.roc.data.attachments[this.uuid][attachment];
      }
    }

    const newMeta = getNewRevisionMeta(doc._rev);

    const attachments = doc._attachments || {};
    const updatedAttachments: ICouchAttachments = Object.assign(
      {},
      attachments
    );
    if (newAttachments) {
      for (const attachment of newAttachments) {
        const prevAttachment = attachments[attachment.name];
        let revpos = 1;
        if (prevAttachment) {
          revpos = prevAttachment.revpos! + 1;
        }
        this.saveAttachment(this.uuid, attachment.name, attachment.data);
        if (
          Buffer.isBuffer(attachment.data) ||
          typeof attachment.data === 'string'
        ) {
          updatedAttachments[attachment.name] = {
            content_type: attachment.content_type,
            length: attachment.data.length,
            revpos,
            digest: Math.random()
              .toString(36)
              .substr(2),
            stub: true
          };
        }
      }
    }

    const newDocument: IDocument = {
      ...doc,
      $content: content,
      ...newMeta,
      _attachments: updatedAttachments
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

  protected getBaseUrl() {
    return `https://${this.roc.fakeHost}/db/${this.roc.fakeDatabase}/entry/`;
  }

  private saveAttachment(uuid: string, name: string, data: Buffer | string) {
    const attachments = this.roc.data.attachments[uuid] || {};
    if (Buffer.isBuffer(data)) {
      attachments[name] = data.toString('base64');
    } else {
      attachments[name] = data;
    }
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

export class FakeRoc extends BaseRoc {
  public data: IFakeRocData;
  public fakeDatabase: string;
  public fakeHost: string;

  constructor(rocData: IFakeRocData) {
    super();
    this.data = rocData;
    this.fakeDatabase = 'eln';
    this.fakeHost = 'mydb.cheminfo.org';
  }

  public getDocument(uuid: string) {
    return new FakeDocument(this, uuid);
  }

  public getQuery<KeyType = any, ValueType = any>(
    viewName: string,
    options: IQueryOptions = {}
  ) {
    return new FakeQuery<KeyType, ValueType>(this, viewName, options);
  }

  public getReduceQuery<KeyType = any, ValueType = any>(viewName: string) {
    return new FakeReducer<KeyType, ValueType>(this, viewName);
  }

  public async create(newDocument: INewDocument) {
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
      $owners: ['test@test.com', ...new Set(newDocument.$owners)],
      _attachments: {}
    };
    if (!this.data.documents[uuid]) {
      this.data.documents[uuid] = [];
    }
    this.data.documents[uuid].push(document);
    return new FakeDocument(this, document);
  }

  public async getUser() {
    return {
      username: 'test@test.com',
      provider: 'test',
      authenticated: true,
      admin: false
    };
  }
}
