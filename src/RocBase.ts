/* tslint:disable max-classes-per-file */

export interface IRocDocumentOptions {
  pollInterval?: number;
}

export interface INewDocument {
  $content: object;
  $kind: string;
  $owner: string[];
}

export interface INewRevisionMeta {
  $modificationDate: number;
  _rev: string;
}

export interface IDocument extends INewDocument, INewRevisionMeta {
  _id: string;
  $creationDate: number;
}

export interface INewAttachment {
  /* The name of the resource */
  name: string;
  /* The resource's mime type */
  content_type: string;
  /* blob or base64 encoded url containing attachment data*/
  data: Blob | string;
}

export interface IAttachment extends ICouchAttachment {
  /* The name of the resource */
  name: string;
  /* The url of the resource */
  url: string;
}

export interface ICouchAttachment {
  /* The resource's mime type */
  content_type: string;
  /* base64 md5 digest of the resource */
  digest: string;
  /* Length in bytes of the resource */
  length: number;
}

export interface ICouchAttachmentList {
  [key: string]: ICouchAttachment;
}

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
  public abstract create(newDocument: INewDocument): Promise<DocType>;
}

export abstract class BaseRocDocument<RocType> {
  public uuid: string;
  public rev?: string;

  protected roc: RocType;
  protected value?: IDocument;
  constructor(roc: RocType, uuid: string) {
    this.roc = roc;
    this.uuid = uuid;
  }

  public abstract fetch(rev?: string): Promise<IDocument>;
  public abstract update(
    content: object,
    newAttachments?: INewAttachment[],
    deleteAttachments?: string[]
  ): Promise<IDocument>;
  public abstract addGroups(groups: string | string[]): string[];

  public getValue() {
    return this.value;
  }

  public toJSON() {
    return this.getValue();
  }
}
