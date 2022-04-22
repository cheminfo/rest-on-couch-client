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

export interface INewEntryDocument<ContentType, IdType> {
  $id: IdType;
  $content: ContentType;
  $kind: string;
  $owners: string[];
}

export interface INewRevisionMeta {
  $modificationDate: number;
  _rev: string;
}

export interface IBaseEntryDocument<ContentType, IdType>
  extends INewEntryDocument<ContentType, IdType>,
    INewRevisionMeta {
  _id: string;
  $type: 'entry';
  $kind: string;
  $creationDate: number;
  $lastModification: string;
}

export interface IEntryDocument<ContentType, IdType>
  extends IBaseEntryDocument<ContentType, IdType> {
  _attachments: {
    [key: string]: ICouchAttachmentStub;
  };
}

export interface IEntryDocumentDraft<ContentType, IdType>
  extends IBaseEntryDocument<ContentType, IdType> {
  _attachments?: {
    [key: string]: ICouchAttachment | ICouchInlineAttachment;
  };
}

const groupRights = {
  delete: 'delete',
  read: 'read',
  write: 'write',
  owner: 'owner',
  addAttachment: 'addAttachment',
} as const;

type GroupRight = keyof typeof groupRights;
export interface IGroupDocument extends INewRevisionMeta {
  _id: string;
  name: string;
  $type: 'group';
  $creationDate: number;
  $lastModification: string;
  $owners: string[];
  customUsers: [];
  users: string[];
  rights: GroupRight[];
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
  data: Buffer | string | Blob;
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

export type FetchAttachmentType<T extends ResponseType> = T;

// ============================
// View and Query
// ============================
export interface ICouchViewBase<KeyType> {
  startkey?: KeyType;
  endkey?: KeyType;
  key?: KeyType;
}

// Queries
export interface IQueryOptions<KeyType = unknown>
  extends ICouchViewBase<KeyType> {
  mine?: boolean;
  include_docs?: boolean;
}

// Views
export interface IReduceQueryOptions<KeyType = unknown>
  extends ICouchViewBase<KeyType> {
  group?: boolean;
  groupLevel?: number;
}

export interface IRocReduceQueryParams extends IReduceQueryOptions {
  reduce: true;
}

export interface IQueryResult<
  KeyType = unknown,
  ValueType = unknown,
  ContentType = Record<string, unknown>,
  IdType = unknown,
> {
  id: string;
  key: KeyType;
  doc?: IEntryDocument<ContentType, IdType>;
  value: ValueType;
}

export type IViewResult<ContentType, IdType> = Array<
  IEntryDocument<ContentType, IdType>
>;

export interface IViewOptions<KeyType = unknown> {
  limit?: number;
  descending?: boolean;
  attachments?: boolean;
  key?: KeyType;
  startkey?: KeyType;
  endkey?: KeyType;
}
export interface IReduceQueryResult<KeyType = unknown, ValueType = unknown> {
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

export interface ICouchUserGroup {
  name: string;
  rights: string[];
}

export interface ICouchGroupInfo<PublicUserInfo> {
  name: string;
  description?: string;
  users?: string[];
  rights?: string[];
  ldapInfo?: PublicUserInfo[];
}

export interface Ok {
  ok: true;
}
