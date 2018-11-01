import { AxiosInstance } from 'axios';

import {
  BaseRocDocument,
  Encoding,
  IAttachment,
  IDocument,
  IDocumentWithInlineAttachments,
  INewAttachment
} from './RocBase';
import { addInlineUploads, deleteInlineUploads } from './utils';

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
    const response = await this.request.get('');
    return response.data;
  }

  public async update(
    content: object,
    newAttachments?: INewAttachment[],
    deleteAttachments?: string[]
  ): Promise<IDocument> {
    let newDoc: IDocumentWithInlineAttachments = this.value!;
    if (deleteAttachments !== undefined) {
      newDoc = deleteInlineUploads(this.value!, deleteAttachments);
    }

    if (newAttachments !== undefined) {
      newDoc = await addInlineUploads(this.value!, newAttachments);
    }

    // Send the new doc
    const response = await this.request.put('', {
      data: newDoc
    });

    return this.value;
  }

  public addGroups(groups: string | string[]): Promise<string[]> {
    throw new Error('UNIMPLEMENTED addGroups');
  }
}
