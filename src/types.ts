import {} from 'axios';

// ============================
// Roc
// ============================
export interface IRocOptions {
  url: string;
  database: string;
  username?: string;
  password?: string;
  authTimeout?: number;
}

// ============================
// Document
// ============================
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

export interface IBaseDocument extends INewDocument, INewRevisionMeta {
  _id: string;
  $type: 'entry' | 'group';
  $creationDate: number;
  $lastModification: string;
}

export interface IDocument extends IBaseDocument {
  _attachments: {
    [key: string]: ICouchAttachmentStub;
  };
}

export interface IDocumentDraft extends IBaseDocument {
  _attachments: {
    [key: string]: ICouchAttachment | ICouchInlineAttachment;
  };
}

// ============================
// Attachments
// ============================
interface ICouchAttachmentBase {
  /* The resource's mime type */
  content_type: string;
}

interface ICouchAttachment extends ICouchAttachmentBase {
  /* base64 md5 digest of the resource */
  digest: string;
  /* Length in bytes of the resource */
  length: number;
  revpos: number;
}
export interface INewAttachment extends ICouchAttachmentBase {
  /* The name of the resource */
  name: string;
  /* Buffer or base64 encoded url containing attachment data */
  /* TODO: add Blob support for the browser */
  data: Buffer | string;
}

export interface ICouchInlineAttachment extends ICouchAttachmentBase {
  /* base64 string with attachment data */
  data: string;
}
export interface IAttachment extends ICouchAttachmentStub {
  /* The name of the resource */
  name: string;
  /* The url of the resource */
  url: string;
}
export interface ICouchAttachmentStub extends ICouchAttachment {
  stub: true;
}

export interface ICouchAttachmentData extends ICouchAttachment {
  data: string;
}

export interface ICouchAttachments {
  [key: string]: ICouchAttachmentStub;
}

// This will be exported in the next version of axios
type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';
export interface IFetchAttachmentOptions {
  type: ResponseType;
}

// ============================
// View and Query
// ============================
export interface ICouchViewBase {
  startKey?: any;
  endKey?: any;
  key?: any;
}

// Queries
export interface IQueryOptions extends ICouchViewBase {
  mine?: boolean;
  includeDocs?: boolean;
}

// Views
export interface IReduceQueryOptions extends ICouchViewBase {
  group?: boolean;
  groupLevel?: number;
}

export interface IRocReduceQueryParams extends IReduceQueryOptions {
  reduce: true;
}

export interface IQueryResult<KeyType = any, ValueType = any> {
  id: string;
  key: KeyType;
  doc?: IDocument;
  value: ValueType;
}

export interface IReduceQueryResult<KeyType = any, ValueType = any> {
  key: KeyType;
  value: ValueType;
}

export type PromisedQueryResult<KeyType, ValueType> = Promise<
  Array<IQueryResult<KeyType, ValueType>>
>;

export type PromisedReduceQueryResult<KeyType, ValueType> = Promise<
  Array<IReduceQueryResult<KeyType, ValueType>>
>;

export interface ICouchUser {
  username: string;
  admin: boolean;
  provider: string;
  authenticated: boolean;
}
