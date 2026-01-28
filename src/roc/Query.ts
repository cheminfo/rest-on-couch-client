import type { AxiosInstance } from 'axios';

import type { IQueryResult } from '../index.ts';
import type {
  IQueryOptions,
  PromisedQueryResult,
  RocAxiosRequestOptions,
} from '../types.ts';

export default class Query<KeyType, ValueType, ContentType> {
  public readonly viewName: string;
  protected baseOptions: IQueryOptions;
  private request: AxiosInstance;
  public constructor(
    viewName: string,
    options: IQueryOptions,
    request: AxiosInstance,
  ) {
    this.request = request;
    this.viewName = viewName;
    this.baseOptions = options;
  }

  public then(
    resolve: (
      value: Array<IQueryResult<KeyType, ValueType, ContentType>>,
    ) => void,
    reject: (error: Error) => void,
  ) {
    this.fetch().then(resolve, reject);
  }

  public async fetch(
    options: IQueryOptions = {},
    axiosOptions?: RocAxiosRequestOptions,
  ): PromisedQueryResult<KeyType, ValueType, ContentType> {
    const params = { ...this.baseOptions, ...options };

    if (!params.mine) delete params.mine;
    if (!params.include_docs) delete params.include_docs;

    const response = await this.request({
      url: `_query/${this.viewName}`,
      params,
      ...axiosOptions,
    });
    return response.data;
  }
}
