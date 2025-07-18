import { AxiosInstance } from 'axios';

import { FetchAttachmentType, IAttachment } from '..';
import { RocClientError } from '../Error';
import {
  IEntryDocument,
  IEntryDocumentDraft,
  INewAttachment,
  RocAxiosRequestOptions,
} from '../types';

import { addInlineUploads, deleteInlineUploads } from './utils';

export interface RocDocumentOptions {
  allowAttachmentOverwrite: boolean;
}

const defaultRocOptions: RocDocumentOptions = {
  allowAttachmentOverwrite: true,
};
export default class RocDocument<
  ContentType = Record<string, unknown>,
  IdType = string,
> {
  private request: AxiosInstance;
  public uuid: string;
  public rev?: string;
  protected value?: IEntryDocument<ContentType, IdType>;
  public deleted: boolean;
  private options: RocDocumentOptions;

  public constructor(
    data: string | IEntryDocument<ContentType, IdType>,
    request: AxiosInstance,
    options: RocDocumentOptions = defaultRocOptions,
  ) {
    if (typeof data === 'string') {
      this.uuid = data;
    } else {
      this.uuid = data._id;
      this.rev = data._rev;
      this.value = data;
    }
    this.request = request;
    this.deleted = false;
    this.options = options;
  }

  public async fetchAttachment(
    name: string,
    responseType: FetchAttachmentType<'text' | 'arraybuffer' | 'blob'>,
    axiosOptions?: RocAxiosRequestOptions,
  ): Promise<Buffer | string> {
    const url = new URL(name, this.getBaseUrl()).href;
    const response = await this.request({
      url,
      responseType,
      ...axiosOptions,
    });
    return response.data;
  }

  public async fetch(
    rev?: string,
    axiosOptions?: RocAxiosRequestOptions,
  ): Promise<IEntryDocument<ContentType, IdType>> {
    if (rev) {
      throw new Error('UNIMPLEMENTED fetch with rev');
    }
    const response = await this.request.get('/', axiosOptions);
    this.value = response.data;
    return response.data;
  }

  public async update(
    content: ContentType,
    newAttachments?: INewAttachment[],
    deleteAttachments?: string[],
    axiosOptions?: RocAxiosRequestOptions,
  ): Promise<IEntryDocument<ContentType, IdType>> {
    if (typeof content === 'object' && '_id' in content) {
      throw new Error(
        'Your content contains an _id proprerty. This is probably an error since you should not pass the entire document, only $content',
      );
    }

    await this._fetchIfUnfetched();
    let newDoc: IEntryDocumentDraft<ContentType, IdType> = {
      ...this.value,
      $content: content,
    };

    if (deleteAttachments !== undefined) {
      newDoc = deleteInlineUploads(newDoc, deleteAttachments);
    }

    if (newAttachments !== undefined) {
      if (!this.options.allowAttachmentOverwrite) {
        for (const attachment of newAttachments) {
          if (newDoc._attachments?.[attachment.name]) {
            throw new RocClientError(
              `overwriting ${attachment.name}, overwriting attachments is forbidden`,
            );
          }
        }
      }

      newDoc = await addInlineUploads(newDoc, newAttachments);
    }

    // Send the new doc
    await this.request.put('/', newDoc, axiosOptions);

    // Get the new document
    // With updated properties ($lastModifification...)
    // And new attachment list

    await this.fetch();
    return this.value;
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

  public async delete(axiosOptions?: RocAxiosRequestOptions) {
    const response = await this.request.delete('/', axiosOptions);
    if (response.data.ok) {
      this.value = undefined;
      this.deleted = true;
    } else {
      throw new Error('document was not deleted');
    }
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

  public getValue() {
    return this.value;
  }

  public toJSON() {
    return this.getValue();
  }

  public addGroups(/* groups: string | string[] */): Promise<string[]> {
    throw new Error('UNIMPLEMENTED addGroups');
  }

  public async hasRight(right: string, axiosOptions?: RocAxiosRequestOptions) {
    const response = await this.request.get(`_rights/${right}`, axiosOptions);
    return response.data;
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
