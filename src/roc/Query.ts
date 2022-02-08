import { AxiosInstance } from 'axios';
import { IQueryResult } from '..';

import { IQueryOptions, PromisedQueryResult } from '../types';

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
  ): PromisedQueryResult<KeyType, ValueType, ContentType> {
    const params = Object.assign({}, this.baseOptions, options);

    const response = await this.request({
      url: '',
      params,
    });
    return response.data;
  }
}
