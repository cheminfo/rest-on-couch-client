import type { AxiosRequestConfig } from 'axios';

import type {
  BaseEntryDocument,
  CouchAttachment,
  CouchAttachmentBase,
  RocNewRevisionMeta,
} from './types_internal.ts';
import type { groupRights } from './util/constants.ts';

export interface RocConfig {
  url: string;
  database: string;
  accessToken?: string;
}

export interface RocNewEntryDocument<ContentType, IdType> {
  $id: IdType;
  $content: ContentType;
  $kind: string;
  $owners: string[];
}

export interface RocEntryDocument<
  ContentType,
  IdType,
> extends BaseEntryDocument<ContentType, IdType> {
  _attachments: Record<string, CouchAttachmentStub>;
}

export type RocGroupRight = (typeof groupRights)[number];

export interface RocGroupDocument extends RocNewRevisionMeta {
  _id: string;
  name: string;
  $type: 'group';
  $creationDate: number;
  $lastModification: string;
  $owners: string[];
  customUsers: string[];
  users: string[];
  /**
   * Ldap domain
   */

  // eslint-disable-next-line @typescript-eslint/naming-convention
  DN?: string;
  /**
   * ldap filter
   */
  filter?: string;
  rights: RocGroupRight[];
}

export interface RocNewAttachment extends CouchAttachmentBase {
  /* The name of the resource */
  name: string;
  /* Buffer or base64 encoded url containing attachment data */
  data: Buffer | string | Blob;
}

export interface RocAttachment extends CouchAttachmentStub {
  /* The name of the resource */
  name: string;
  /* The url of the resource */
  url: string;
}

interface CouchAttachmentStub extends CouchAttachment {
  stub: true;
}

// ============================
// View and Query
// ============================
interface CouchViewBase<KeyType> {
  startkey?: KeyType;
  endkey?: KeyType;
  key?: KeyType;
}

// Queries
export interface RocQueryOptions<
  KeyType = unknown,
> extends CouchViewBase<KeyType> {
  mine?: boolean;
  include_docs?: boolean;
}

// Views
export interface RocReduceQueryOptions<
  KeyType = unknown,
> extends CouchViewBase<KeyType> {
  group?: boolean;
  groupLevel?: number;
}

export interface RocReduceQueryParams extends RocReduceQueryOptions {
  reduce: true;
}

export interface RocQueryResult<
  KeyType = unknown,
  ValueType = unknown,
  ContentType = Record<string, unknown>,
  IdType = unknown,
> {
  id: string;
  key: KeyType;
  doc?: RocEntryDocument<ContentType, IdType>;
  value: ValueType;
}

export type RocViewResult<ContentType, IdType> = Array<
  RocEntryDocument<ContentType, IdType>
>;

export interface RocViewOptions<KeyType = unknown> {
  limit?: number;
  descending?: boolean;
  attachments?: boolean;
  key?: KeyType;
  startkey?: KeyType;
  endkey?: KeyType;
}
export interface RocReduceQueryResult<KeyType = unknown, ValueType = unknown> {
  key: KeyType;
  value: ValueType;
}

export interface RocFindQueryResult<ResultType> {
  docs: ResultType[];
  warning?: string;
  execution_status?: FindExecutionStatus;
  bookmark?: string;
}

interface FindExecutionStatus {
  total_keys_examined: number;
  total_docs_examined: number;
  total_quorum_docs_examined: number;
  results_returned: number;
  execution_time_ms: number;
}
export interface RocUserSessionData {
  username: string;
  admin: boolean;
  provider: string | null;
  authenticated: boolean;
}

export interface RocUserGroup {
  name: string;
  rights: string[];
}

export interface RocGroupInfo<PublicUserInfo> {
  name: string;
  description?: string;
  users?: string[];
  rights?: string[];
  ldapInfo?: PublicUserInfo[];
}

export interface RocOkResponse {
  ok: true;
}

export type RocAxiosRequestOptions = Pick<
  AxiosRequestConfig,
  'signal' | 'timeout' | 'timeoutErrorMessage'
>;

export interface RocFindOptions {
  right?: RocGroupRight;
  mine?: boolean;
  group?: string;
  query?: RocMangoQueryOptions;
}

export interface RocMangoQueryOptions {
  selector?: object;
  fields?: string[];
  limit?: number;
  bookmark?: string;
  skip?: number;
  sort?: string[] | Array<Record<string, 'asc' | 'desc'>>;
  use_index?: string;
  update?: boolean;
  execution_stats?: boolean;
}
