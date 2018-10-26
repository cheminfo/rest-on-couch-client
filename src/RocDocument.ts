import {
  BaseRocDocument,
  Encoding,
  IAttachment,
  IDocument,
  INewAttachment
} from './RocBase';

export class RocDocument extends BaseRocDocument {
  constructor(uuid: string, doc: IDocument) {
    super(uuid);
    this.value = doc;
  }

  public getAttachmentList(): IAttachment[] {
    throw new Error('UNIMPLEMENTED getAttachmentList');
  }
  public getAttachment(name: string): IAttachment {
    throw new Error('UNIMPLEMENTED getAttachment');
  }

  public fetchAttachment(
    name: string,
    encoding?: Encoding
  ): Promise<Buffer | string> {
    throw new Error('UNIMPLEMENTED fetchAttachment');
  }
  public fetch(rev?: string): Promise<IDocument> {
    throw new Error('UNIMPLEMENTED fetch');
  }
  public update(
    content: object,
    newAttachments?: INewAttachment[],
    deleteAttachments?: string[]
  ): Promise<IDocument> {
    throw new Error('UNIMPLEMENTED update');
  }
  public addGroups(groups: string | string[]): Promise<string[]> {
    throw new Error('UNIMPLEMENTED addGroups');
  }
}
