import { ResponseType } from 'axios';

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

export interface INewDocument<ContentType = Record<string, any>> {
  $id: any;
  $content: ContentType;
  $kind: string;
  $owners: string[];
}

export interface INewRevisionMeta {
  $modificationDate: number;
  _rev: string;
}

export interface IBaseDocument<ContentType = Record<string, any>>
  extends INewDocument<ContentType>,
    INewRevisionMeta {
  _id: string;
  $type: 'entry' | 'group';
  $creationDate: number;
  $lastModification: string;
}

export interface IDocument<ContentType = Record<string, any>>
  extends IBaseDocument<ContentType> {
  _attachments: {
    [key: string]: ICouchAttachmentStub;
  };
}

export interface IDocumentDraft<ContentType = Record<string, any>>
  extends IBaseDocument<ContentType> {
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

export interface IFetchAttachmentOptions {
  type: ResponseType | 'buffer';
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
  include_docs?: boolean;
}

// Views
export interface IReduceQueryOptions extends ICouchViewBase {
  group?: boolean;
  groupLevel?: number;
}

export interface IRocReduceQueryParams extends IReduceQueryOptions {
  reduce: true;
}

export interface IQueryResult<
  KeyType = any,
  ValueType = any,
  ContentType = Record<string, any>
> {
  id: string;
  key: KeyType;
  doc?: IDocument<ContentType>;
  value: ValueType;
}

export interface IReduceQueryResult<KeyType = any, ValueType = any> {
  key: KeyType;
  value: ValueType;
}

export type PromisedQueryResult<KeyType, ValueType, ContentType> = Promise<
  Array<IQueryResult<KeyType, ValueType, ContentType>>
>;

export type PromisedReduceQueryResult<KeyType, ValueType> = Promise<
  Array<IReduceQueryResult<KeyType, ValueType>>
>;

export interface ICouchUser {
  username: string;
  admin: boolean;
  provider: string | null;
  authenticated: boolean;
}
