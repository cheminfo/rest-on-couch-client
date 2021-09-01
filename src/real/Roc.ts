import axios, { AxiosInstance } from 'axios';

import { BaseRocReduceQuery } from '../base';
import BaseRoc from '../base/BaseRoc';
import BaseRocDocument from '../base/BaseRocDocument';
import BaseRocQuery from '../base/BaseRocQuery';
import {
  ICouchUser,
  ICouchUserGroup,
  INewDocument,
  IQueryOptions,
  IReduceQueryOptions,
  IViewOptions,
} from '../types';

import Query from './Query';
import ReduceQuery from './ReduceQuery';
import RocDocument from './RocDocument';
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
      const keys = Object.keys(params);
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

export default class Roc extends BaseRoc {
  private url: string;
  private dbUrl: string;
  private request: AxiosInstance;
  private dbRequest: AxiosInstance;
  private accessToken?: string;

  public constructor(config: IRocConfig) {
    super();
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

  public async create<ContentType>(
    newDocument: INewDocument<ContentType>,
  ): Promise<BaseRocDocument<ContentType>> {
    const response = await this.dbRequest.post('entry', newDocument);
    return this.getDocument(response.data.id);
  }

  public getDocument<ContentType = Record<string, any>>(
    uuid: string,
  ): RocDocument<ContentType> {
    const url = new URL(`entry/${uuid}/`, this.dbUrl).href;
    return new RocDocument(uuid, createAxios(url, this.accessToken));
  }

  public getQuery<
    KeyType = any,
    ValueType = any,
    ContentType = Record<string, any>,
  >(
    viewName: string,
    options: IQueryOptions = {},
  ): BaseRocQuery<KeyType, ValueType, ContentType> {
    return new Query<KeyType, ValueType, ContentType>(
      viewName,
      options,
      createAxios(
        new URL(`_query/${viewName}`, this.dbUrl).href,
        this.accessToken,
      ),
    );
  }

  public getReduceQuery<KeyType = any, ValueType = any>(
    viewName: string,
    options: IReduceQueryOptions = {},
  ): BaseRocReduceQuery<KeyType, ValueType> {
    return new ReduceQuery<KeyType, ValueType>(
      viewName,
      options,
      createAxios(
        new URL(`_view/${viewName}`, this.dbUrl).href,
        this.accessToken,
      ),
    );
  }

  public getView<KeyType = any, ContentType = any>(
    viewName: string,
    options: IViewOptions<KeyType> = {},
  ) {
    return new View<ContentType>(
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

  public async getUserGroups(): Promise<ICouchUserGroup[]> {
    const response = await this.dbRequest.get('user/_me/groups');
    return response.data;
  }
}
