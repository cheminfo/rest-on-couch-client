import axios, { AxiosInstance } from 'axios';
import {
  BaseRoc,
  BaseRocDocument,
  BaseRocQuery,
  ICouchUser,
  INewDocument
} from './RocBase';
import { RocDocument } from './RocDocument';

export interface IRocConfig {
  url: string;
  database: string;
}

export class Roc extends BaseRoc {
  private request: AxiosInstance;
  private dbRequest: AxiosInstance;

  constructor(config: IRocConfig) {
    super();
    this.request = axios.create({
      baseURL: config.url
    });
    this.dbRequest = axios.create({
      baseURL: new URL(`db/${config.database}/`, config.url).href
    });
  }

  public async create(newDocument: INewDocument): Promise<BaseRocDocument> {
    throw new Error('UNIMPLEMENTED create');
  }

  public async getDocument(uuid: string): Promise<RocDocument> {
    throw new Error('UNIMPLEMENTED getDocument');
  }

  public getQuery<KeyType = any, ValueType = any>(
    viewName: string
  ): BaseRocQuery<KeyType, ValueType> {
    throw new Error('UNIMPLEMENTED getQuery');
  }

  public async getUser(): Promise<ICouchUser> {
    throw new Error('UNIMPLEMENTED getUser');
  }
}
