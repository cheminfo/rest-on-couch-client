import type { RocNewEntryDocument } from './types.ts';

export interface CouchInlineAttachment extends CouchAttachmentBase {
  /* base64 string with attachment data */
  data: string;
}

export interface CouchAttachment extends CouchAttachmentBase {
  /* base64 md5 digest of the resource */
  digest: string;
  /* Length in bytes of the resource */
  length: number;
  revpos: number;
}

export interface RocNewRevisionMeta {
  $modificationDate: number;
  _rev: string;
}

export interface BaseEntryDocument<ContentType, IdType>
  extends RocNewEntryDocument<ContentType, IdType>, RocNewRevisionMeta {
  _id: string;
  $type: 'entry';
  $kind: string;
  $creationDate: number;
  $lastModification: string;
}

export interface EntryDocumentDraft<
  ContentType,
  IdType,
> extends BaseEntryDocument<ContentType, IdType> {
  _attachments?: Record<string, CouchAttachment | CouchInlineAttachment>;
}
// ============================
// Attachments
// ============================
export interface CouchAttachmentBase {
  /* The resource's mime type */
  content_type: string;
}
