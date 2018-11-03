import axios, { AxiosInstance } from 'axios';
import Query from './Query';
import ReduceQuery from './ReduceQuery';

import {
  BaseRoc,
  BaseRocDocument,
  BaseRocQuery,
  BaseRocReduceQuery,
  ICouchUser,
  INewDocument
} from './RocBase';
import { RocDocument } from './RocDocument';

export interface IRocConfig {
  url: string;
  database: string;
}

function createAxios(url: string) {
  return axios.create({
    baseURL: url,
    withCredentials: true
  });
}

export class Roc extends BaseRoc {
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
    throw new Error('UNIMPLEMENTED create');
  }

  public getDocument(uuid: string): RocDocument {
    const url = new URL(`entry/${uuid}/`, this.dbUrl).href;
    return new RocDocument(uuid, createAxios(url));
  }

  public getQuery<KeyType = any, ValueType = any>(
    viewName: string
  ): BaseRocQuery<KeyType, ValueType> {
    return new Query<KeyType, ValueType>(
      viewName,
      createAxios(new URL(`_query/${viewName}`, this.dbUrl).href)
    );
  }

  public getReduceQuery<KeyType = any, ValueType = any>(
    viewName: string
  ): BaseRocReduceQuery<KeyType, ValueType> {
    return new ReduceQuery<KeyType, ValueType>(
      viewName,
      createAxios(new URL(`_view/${viewName}`, this.dbUrl).href)
    );
  }

  public async getUser(): Promise<ICouchUser> {
    const response = await this.request.get('auth/session');
    return response.data;
  }
}
