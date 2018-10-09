/* tslint:disable max-classes-per-file */

export interface IRocDocumentOptions {
  pollInterval?: number;
}

export interface INewDocument {
  $id: any;
  $content: object;
  $kind: string;
  $owners: string[];
}

export interface INewRevisionMeta {
  $modificationDate: number;
  _rev: string;
}

export interface IDocument extends INewDocument, INewRevisionMeta {
  _id: string;
  $type: 'entry' | 'group';
  $creationDate: number;
  $lastModification: string;
  _attachments?: ICouchAttachments;
}

export interface INewAttachment {
  /* The name of the resource */
  name: string;
  /* The resource's mime type */
  content_type: string;
  /* Buffer or base64 encoded url containing attachment data */
  /* TODO: add Blob support for the browser */
  data: Buffer | string;
}

export interface ICouchAttachments {
  [key: string]: ICouchAttachmentStub;
}
export interface ICouchAttachmentWithContent extends ICouchAttachmentStub {
  /* base64 string with attachment data */
  data: string;
}
export interface IAttachment extends ICouchAttachmentStub {
  /* The name of the resource */
  name: string;
  /* The url of the resource */
  url: string;
}

interface ICouchAttachment {
  /* The resource's mime type */
  content_type: string;
  /* base64 md5 digest of the resource */
  digest: string;
  /* Length in bytes of the resource */
  length: number;
  revpos: number;
}
export interface ICouchAttachmentStub extends ICouchAttachment {
  stub: true;
}

export interface ICouchAttachmentData extends ICouchAttachment {
  data: string;
}

export interface ICouchAttachmentList {
  [key: string]: ICouchAttachmentStub;
}

export type Encoding = 'utf-8' | 'latin1' | 'base64';

// Queries
export interface IQueryOptions {
  startKey?: any;
  endKey?: any;
  key?: any;
  mine?: boolean;
  group?: boolean;
  groupLevel?: number;
  keys?: any[];
  reduce?: boolean;
  descending?: boolean;
  includeDocs?: boolean;
}

export interface IQueryResult<KeyType = any, ValueType = any> {
  id: string;
  key: KeyType;
  doc?: IDocument;
  value: ValueType;
}

export type ViewResult = IDocument[];

export interface IRocOptions {
  url: string;
  database: string;
  username?: string;
  password?: string;
  authTimeout?: number;
}

export interface IRocDocumentOptions {
  pollInterval?: number;
}

export abstract class BaseRoc<DocType> {
  public abstract getUser(): Promise<string>;
  public abstract getDocument(uuid: string): Promise<DocType>;
  public abstract getQuery<KeyType = any, ValueType = any>(
    viewName: string
  ): BaseRocQuery<KeyType, ValueType>;
  public abstract create(newDocument: INewDocument): Promise<DocType>;
}

export abstract class BaseRocQuery<KeyType = any, ValueType = any> {
  public readonly viewName: string;
  constructor(viewName: string) {
    this.viewName = viewName;
  }
  public abstract fetch(
    options: IQueryOptions
  ): Promise<Array<IQueryResult<KeyType, ValueType>>>;
}

export abstract class BaseRocDocument {
  public uuid: string;
  public rev?: string;

  protected value?: IDocument;
  constructor(uuid: string) {
    this.uuid = uuid;
  }

  public abstract fetchAttachment(
    name: string,
    encoding?: Encoding
  ): Promise<Buffer | string>;
  public abstract fetch(rev?: string): Promise<IDocument>;
  public abstract update(
    content: object,
    newAttachments?: INewAttachment[],
    deleteAttachments?: string[]
  ): Promise<IDocument>;
  public abstract addGroups(groups: string | string[]): Promise<string[]>;

  public getValue() {
    return this.value;
  }

  public toJSON() {
    return this.getValue();
  }
}
