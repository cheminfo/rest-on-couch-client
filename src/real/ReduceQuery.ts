import { AxiosInstance } from 'axios';

import { BaseRocReduceQuery } from '../base';
import {
  IReduceQueryOptions,
  IRocReduceQueryParams,
  PromisedReduceQueryResult,
} from '../types';

export default class ReduceQuery<A, B> extends BaseRocReduceQuery {
  private request: AxiosInstance;
  private baseOptions: IReduceQueryOptions;
  public constructor(
    viewName: string,
    options: IReduceQueryOptions,
    request: AxiosInstance,
  ) {
    super(viewName);
    this.request = request;
    this.baseOptions = options;
  }

  public async fetch(
    options: IReduceQueryOptions = {},
  ): PromisedReduceQueryResult<A, B> {
    const requestOptions: IRocReduceQueryParams = {
      ...this.baseOptions,
      ...options,
      reduce: true,
    };
    const response = await this.request({
      url: '',
      params: requestOptions,
    });
    return response.data;
  }
}
