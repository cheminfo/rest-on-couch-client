import { AxiosInstance } from 'axios';

import {
  IFindOptions,
  IFindQueryResult,
  PromisedFindQueryResult,
  RocAxiosRequestOptions,
} from '../types';

export default class Find<ResultType> {
  public readonly viewName: string;
  protected baseOptions: IFindOptions;
  private request: AxiosInstance;
  public constructor(options: IFindOptions, request: AxiosInstance) {
    this.request = request;
    this.baseOptions = options;
  }

  public then(
    resolve: (value: IFindQueryResult<ResultType>) => void,
    reject: (error: Error) => void,
  ) {
    this.fetch<ResultType>().then(resolve, reject);
  }

  public async fetch<ResultType>(
    options: IFindOptions = {},
    axiosOptions?: RocAxiosRequestOptions,
  ): PromisedFindQueryResult<ResultType> {
    const findOptions = {
      ...this.baseOptions,
      ...options,
      query: {
        ...this.baseOptions.query,
        ...options.query,
      },
    };

    const response = await this.request({
      method: 'POST',
      url: '_find',
      data: findOptions,
      ...axiosOptions,
    });
    return response.data;
  }
}
