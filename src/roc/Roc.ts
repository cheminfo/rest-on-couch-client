import axios, { AxiosInstance } from 'axios';

import { ICouchGroupInfo, IEntryDocument } from '..';
import {
  ICouchUser,
  ICouchUserGroup,
  IGroupDocument,
  INewEntryDocument,
  IQueryOptions,
  IReduceQueryOptions,
  IViewOptions,
  Ok,
} from '../types';

import Query from './Query';
import ReduceQuery from './ReduceQuery';
import RocDocument, { RocDocumentOptions } from './RocDocument';
import View from './View';

export interface IRocConfig {
  url: string;
  database: string;
  accessToken?: string;
}

function createAxios(url: string, accessToken?: string) {
  return axios.create({
    baseURL: url,
    withCredentials: true,
    params: accessToken ? { token: accessToken } : {},
    paramsSerializer(params) {
      const keysToProcess = ['key', 'startkey', 'endkey'];
      const searchParams = new URLSearchParams();
      const keys = Object.keys(params).filter(
        (key) => params[key] !== undefined,
      );
      for (const key of keys) {
        if (keysToProcess.includes(key)) {
          searchParams.append(key, JSON.stringify(params[key]));
        } else {
          searchParams.append(key, params[key]);
        }
      }
      return searchParams.toString();
    },
  });
}

export default class Roc<PublicUserInfo = unknown, PrivateUserInfo = unknown> {
  private url: string;
  private dbUrl: string;
  private accessToken?: string;

  public readonly request: AxiosInstance;
  public readonly dbRequest: AxiosInstance;

  public constructor(config: IRocConfig) {
    this.url = config.url;
    if (!this.url.endsWith('/')) {
      this.url += '/';
    }
    if (this.url.startsWith('/') && typeof window === 'object') {
      this.url = `${window.location.origin}${this.url}`;
    }
    this.accessToken = config.accessToken;
    this.request = createAxios(this.url, config.accessToken);
    this.dbUrl = new URL(`db/${config.database}/`, this.url).href;
    this.dbRequest = createAxios(this.dbUrl, config.accessToken);
  }

  public async create<ContentType, IdType>(
    newDocument: INewEntryDocument<ContentType, IdType>,
  ) {
    const response = await this.dbRequest.post('entry', newDocument);
    return this.getDocument<ContentType, IdType>(response.data.id);
  }

  public initializeDocument<ContentType, IdType>(
    data: IEntryDocument<ContentType, IdType>,
    options?: RocDocumentOptions,
  ) {
    const url = new URL(`entry/${data._id}/`, this.dbUrl).href;
    return new RocDocument(data, createAxios(url, this.accessToken), options);
  }

  public getDocument<ContentType, IdType>(
    uuid: string,
    options?: RocDocumentOptions,
  ): RocDocument<ContentType, IdType> {
    const url = new URL(`entry/${uuid}/`, this.dbUrl).href;
    return new RocDocument(uuid, createAxios(url, this.accessToken), options);
  }

  public async deleteDocument(uuid: string) {
    const url = new URL(`entry/${uuid}/`, this.dbUrl).href;
    const request = createAxios(url, this.accessToken);
    const response = await request.delete('/');
    return response.data;
  }

  public getQuery<
    KeyType = unknown,
    ValueType = unknown,
    ContentType = Record<string, unknown>,
  >(viewName: string, options: IQueryOptions = {}) {
    return new Query<KeyType, ValueType, ContentType>(
      viewName,
      options,
      createAxios(
        new URL(`_query/${viewName}`, this.dbUrl).href,
        this.accessToken,
      ),
    );
  }

  public getReduceQuery<KeyType = unknown, ValueType = unknown>(
    viewName: string,
    options: IReduceQueryOptions = {},
  ) {
    return new ReduceQuery<KeyType, ValueType>(
      viewName,
      options,
      createAxios(
        new URL(`_view/${viewName}`, this.dbUrl).href,
        this.accessToken,
      ),
    );
  }

  public getView<
    KeyType = unknown,
    ContentType = Record<string, unknown>,
    IdType = unknown,
  >(viewName: string, options: IViewOptions<KeyType> = {}) {
    return new View<ContentType, IdType>(
      viewName,
      options,
      createAxios(
        new URL(`_view/${viewName}`, this.dbUrl).href,
        this.accessToken,
      ),
    );
  }

  public async getUser(): Promise<ICouchUser> {
    const response = await this.request.get('auth/session');
    return response.data;
  }

  public async getUserInfo(): Promise<PrivateUserInfo> {
    const response = await this.dbRequest.get('userInfo/_me');
    return response.data;
  }

  public async getUserGroups(): Promise<ICouchUserGroup[]> {
    const response = await this.dbRequest.get('user/_me/groups');
    return response.data;
  }

  public async createGroup(name: string): Promise<Ok> {
    const response = await this.dbRequest.put(`group/${name}`);
    return response.data;
  }

  public async getGroup(name: string): Promise<IGroupDocument> {
    const response = await this.dbRequest.get(`group/${name}`);
    return response.data;
  }

  public async getGroupsInfo(options?: {
    ldapInfo?: boolean;
  }): Promise<ICouchGroupInfo<PublicUserInfo>[]> {
    const response = await this.dbRequest.get('groups/info', {
      params: options,
    });
    return response.data;
  }

  public async getGroupInfo(
    name: string,
    options?: {
      ldapInfo?: boolean;
    },
  ): Promise<ICouchGroupInfo<PublicUserInfo>> {
    const response = await this.dbRequest.get(`group/${name}/info`, {
      params: options,
    });
    return response.data;
  }
}
