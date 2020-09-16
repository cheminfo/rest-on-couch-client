import { RocClientError } from '../Error';
import {
  IAttachment,
  IDocument,
  IFetchAttachmentOptions,
  INewAttachment,
} from '../types';

export default abstract class BaseRocDocument {
  public uuid: string;
  public rev?: string;

  protected value?: IDocument;
  public constructor(uuid: string) {
    this.uuid = uuid;
  }

  public getAttachmentList(): IAttachment[] {
    if (this.value === undefined) {
      throw new RocClientError(
        'You must fetch the document in order to get the attachment list',
      );
    }

    // value must be defined after fetch
    const doc = this.value;
    const attachments = doc._attachments || {};
    const list = [];
    for (const key in attachments) {
      list.push(this.getAttachment(key));
    }
    return list;
  }

  public getAttachment(name: string): IAttachment {
    if (this.value === undefined) {
      throw new RocClientError(
        'You must fetch the document in order to get an attachment',
      );
    }
    const doc = this.value;
    const attachments = doc._attachments || {};
    if (!attachments[name]) {
      throw new RocClientError(`attachment ${name} does not exist`);
    }
    return {
      ...attachments[name],
      name,
      url: `${this.getBaseUrl()}${name}`,
    };
  }

  public abstract fetchAttachment(
    name: string,
    options?: IFetchAttachmentOptions,
  ): Promise<Buffer | string>;
  public abstract fetch(rev?: string): Promise<IDocument>;
  public abstract update(
    content: Record<string, any>,
    newAttachments?: INewAttachment[],
    deleteAttachments?: string[],
  ): Promise<IDocument>;
  public abstract addGroups(groups: string | string[]): Promise<string[]>;

  public getValue() {
    return this.value;
  }

  public toJSON() {
    return this.getValue();
  }

  protected abstract getBaseUrl(): string;
}
