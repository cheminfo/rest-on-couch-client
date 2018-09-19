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

type DocumentAttachments = Map<string, Blob>;

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

export abstract class BaseRoc {
  public abstract getUser(): Promise<string>;
}

export abstract class BaseRocDocument {
  public uuid: string;
  public rev?: string;

  protected roc: BaseRoc;
  protected attachments: DocumentAttachments = new Map();
  protected value?: IDocument;
  constructor(roc: BaseRoc, uuid: string) {
    this.roc = roc;
    this.uuid = uuid;
  }

  public abstract fetch(rev?: string): Promise<object>;
  public abstract updateContent(content: object): Promise<IDocument>;

  public getValue(): object | undefined {
    return this.value;
  }

  public setValue(val: IDocument) {
    this.value = val;
  }

  public addAttachment(name: string, attachment: Blob) {
    this.attachments.set(name, attachment);
  }

  public removeAttachment(name: string) {
    this.attachments.delete(name);
  }
}
