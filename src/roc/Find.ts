import type { AxiosInstance } from 'axios';

import type {
  PromisedFindQueryResult,
  RocAxiosRequestOptions,
  RocFindOptions,
  RocFindQueryResult,
} from '../types.ts';

export default class Find<ResultType> {
  protected baseOptions: RocFindOptions;
  private request: AxiosInstance;
  public constructor(options: RocFindOptions, request: AxiosInstance) {
    this.request = request;
    this.baseOptions = options;
  }

  public then(
    resolve: (value: RocFindQueryResult<ResultType>) => void,
    reject: (error: Error) => void,
  ) {
    this.fetch<ResultType>().then(resolve, reject);
  }

  public async fetch<ResultType>(
    options: RocFindOptions = {},
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
