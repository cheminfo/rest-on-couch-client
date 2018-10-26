import { AxiosInstance } from 'axios';

import {
  BaseRocDocument,
  Encoding,
  IAttachment,
  IDocument,
  INewAttachment
} from './RocBase';

export class RocDocument extends BaseRocDocument {
  private request: AxiosInstance;

  constructor(uuid: string, request: AxiosInstance) {
    super(uuid);
    this.request = request;
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

  public async fetch(rev?: string): Promise<IDocument> {
    if (rev) {
      throw new Error('UNIMPLEMENTED fetch with rev');
    }
    const response = await this.request.get(this.uuid);
    return response.data;
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
