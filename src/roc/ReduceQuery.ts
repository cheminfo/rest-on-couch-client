import type { AxiosInstance } from 'axios';

import type { RocReduceQueryResult } from '../index.ts';
import type {
  RocAxiosRequestOptions,
  RocReduceQueryOptions,
  RocReduceQueryParams,
} from '../types.ts';

export class ReduceQuery<KeyType = unknown, ValueType = unknown> {
  public readonly viewName: string;
  private request: AxiosInstance;
  private baseOptions: RocReduceQueryOptions;
  public constructor(
    viewName: string,
    options: RocReduceQueryOptions,
    request: AxiosInstance,
  ) {
    this.viewName = viewName;
    this.request = request;
    this.baseOptions = options;
  }

  public then(
    resolve: (value: Array<RocReduceQueryResult<KeyType, ValueType>>) => void,
    reject: (error: Error) => void,
  ) {
    this.fetch().then(resolve, reject);
  }

  public async fetch(
    options: RocReduceQueryOptions = {},
    axiosOptions?: RocAxiosRequestOptions,
  ): Promise<Array<RocReduceQueryResult<KeyType, ValueType>>> {
    const requestOptions: RocReduceQueryParams = {
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
