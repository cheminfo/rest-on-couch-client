import { Encoding, IAttachment, IDocument, INewAttachment } from '../types';

export default abstract class BaseRocDocument {
  public uuid: string;
  public rev?: string;

  protected value?: IDocument;
  constructor(uuid: string) {
    this.uuid = uuid;
  }

  public abstract getAttachmentList(): IAttachment[];
  public abstract getAttachment(name: string): IAttachment;

  public abstract fetchAttachment(
    name: string,
    encoding?: Encoding
  ): Promise<Buffer | string>;
  public abstract fetch(rev?: string): Promise<IDocument>;
  public abstract update(
    content: IDocument,
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
