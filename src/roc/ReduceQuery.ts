import { AxiosInstance } from 'axios';

import { IReduceQueryResult } from '..';
import {
  IReduceQueryOptions,
  IRocReduceQueryParams,
  PromisedReduceQueryResult,
  RocAxiosOptions,
} from '../types';

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
    axiosOptions?: RocAxiosOptions,
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
