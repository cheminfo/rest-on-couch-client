import axios, { AxiosInstance } from 'axios';
import { BaseRocReduceQuery } from '../base';
import BaseRoc from '../base/BaseRoc';
import BaseRocDocument from '../base/BaseRocDocument';
import BaseRocQuery from '../base/BaseRocQuery';
import {
  ICouchUser,
  INewDocument,
  IQueryOptions,
  IReduceQueryOptions
} from '../types';
import Query from './Query';
import ReduceQuery from './ReduceQuery';
import RocDocument from './RocDocument';

export interface IRocConfig {
  url: string;
  database: string;
}

function createAxios(url: string) {
  return axios.create({
    baseURL: url,
    withCredentials: true,
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
    }
  });
}

export default class Roc extends BaseRoc {
  private url: string;
  private dbUrl: string;
  private request: AxiosInstance;
  private dbRequest: AxiosInstance;

  constructor(config: IRocConfig) {
    super();
    this.url = config.url;
    this.request = createAxios(this.url);
    this.dbUrl = new URL(`db/${config.database}/`, config.url).href;
    this.dbRequest = createAxios(this.dbUrl);
  }

  public async create(newDocument: INewDocument): Promise<BaseRocDocument> {
    const response = await this.dbRequest.post('entry', newDocument);
    return this.getDocument(response.data.id);
  }

  public getDocument(uuid: string): RocDocument {
    const url = new URL(`entry/${uuid}/`, this.dbUrl).href;
    return new RocDocument(uuid, createAxios(url));
  }

  public getQuery<KeyType = any, ValueType = any>(
    viewName: string,
    options: IQueryOptions = {}
  ): BaseRocQuery<KeyType, ValueType> {
    return new Query<KeyType, ValueType>(
      viewName,
      options,
      createAxios(new URL(`_query/${viewName}`, this.dbUrl).href)
    );
  }

  public getReduceQuery<KeyType = any, ValueType = any>(
    viewName: string,
    options: IReduceQueryOptions = {}
  ): BaseRocReduceQuery<KeyType, ValueType> {
    return new ReduceQuery<KeyType, ValueType>(
      viewName,
      options,
      createAxios(new URL(`_view/${viewName}`, this.dbUrl).href)
    );
  }

  public async getUser(): Promise<ICouchUser> {
    const response = await this.request.get('auth/session');
    return response.data;
  }
}
