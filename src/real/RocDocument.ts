import { AxiosInstance } from 'axios';

import BaseRocDocument from '../base/BaseRocDocument';
import {
  IDocument,
  IDocumentDraft,
  IFetchAttachmentOptions,
  INewAttachment
} from '../types';
import { addInlineUploads, deleteInlineUploads } from './utils';

export default class RocDocument extends BaseRocDocument {
  private request: AxiosInstance;

  constructor(uuid: string, request: AxiosInstance) {
    super(uuid);
    this.request = request;
  }

  public async fetchAttachment(
    name: string,
    options: IFetchAttachmentOptions = {
      type: 'text'
    }
  ): Promise<Buffer | string> {
    const url = new URL(name, this.getBaseUrl()).href;
    // @ts-ignore
    const response = await this.request({
      url,
      responseType: options.type
    });
    return response.data;
  }

  public async fetch(rev?: string): Promise<IDocument> {
    if (rev) {
      throw new Error('UNIMPLEMENTED fetch with rev');
    }
    const response = await this.request.get('');
    this.value = response.data;
    return response.data;
  }

  public async update(
    content: object,
    newAttachments?: INewAttachment[],
    deleteAttachments?: string[]
  ): Promise<IDocument> {
    await this._fetchIfUnfetched();
    let newDoc: IDocumentDraft = {
      ...this.value!,
      $content: content
    };

    if (deleteAttachments !== undefined) {
      newDoc = deleteInlineUploads(newDoc, deleteAttachments);
    }

    if (newAttachments !== undefined) {
      newDoc = await addInlineUploads(newDoc, newAttachments);
    }

    // Send the new doc
    await this.request.put('', newDoc);

    // Get the new document
    // With updated properties ($lastModifification...)
    // And new attachment list

    await this.fetch();
    return this.value!;
  }

  public addGroups(groups: string | string[]): Promise<string[]> {
    throw new Error('UNIMPLEMENTED addGroups');
  }

  protected getBaseUrl() {
    return this.request.defaults.baseURL || '';
  }
  private async _fetchIfUnfetched() {
    if (this.value === undefined) {
      await this.fetch();
    }
  }
}
