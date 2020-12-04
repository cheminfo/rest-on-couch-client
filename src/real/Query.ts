import { AxiosInstance } from 'axios';

import BaseRocQuery from '../base/BaseRocQuery';
import { IQueryOptions, PromisedQueryResult } from '../types';

export default class Query<A, B, ContentType> extends BaseRocQuery<
  A,
  B,
  ContentType
> {
  private request: AxiosInstance;
  public constructor(
    viewName: string,
    options: IQueryOptions,
    request: AxiosInstance,
  ) {
    super(viewName, options);
    this.request = request;
  }

  public async fetch(
    options: IQueryOptions = {},
  ): PromisedQueryResult<A, B, ContentType> {
    const params = Object.assign({}, this.baseOptions, options);

    const response = await this.request({
      url: '',
      params,
    });
    return response.data;
  }
}
