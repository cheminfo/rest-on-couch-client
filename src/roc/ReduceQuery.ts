import type { AxiosInstance } from 'axios';

import type { IReduceQueryResult } from '../index.ts';
import type {
  IReduceQueryOptions,
  IRocReduceQueryParams,
  PromisedReduceQueryResult,
  RocAxiosRequestOptions,
} from '../types.ts';

export default class ReduceQuery<KeyType = unknown, ValueType = unknown> {
  public readonly viewName: string;
  private request: AxiosInstance;
  private baseOptions: IReduceQueryOptions;
  public constructor(
    viewName: string,
    options: IReduceQueryOptions,
    request: AxiosInstance,
  ) {
    this.viewName = viewName;
    this.request = request;
    this.baseOptions = options;
  }

  public then(
    resolve: (value: Array<IReduceQueryResult<KeyType, ValueType>>) => void,
    reject: (error: Error) => void,
  ) {
    this.fetch().then(resolve, reject);
  }

  public async fetch(
    options: IReduceQueryOptions = {},
    axiosOptions?: RocAxiosRequestOptions,
  ): PromisedReduceQueryResult<KeyType, ValueType> {
    const requestOptions: IRocReduceQueryParams = {
      ...this.baseOptions,
      ...options,
      reduce: true,
    };
    const response = await this.request({
      url: '/',
      params: requestOptions,
      ...axiosOptions,
    });
    return response.data;
  }
}
