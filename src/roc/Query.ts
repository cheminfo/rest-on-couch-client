import type { AxiosInstance } from 'axios';

import type { RocQueryResult } from '../index.ts';
import type { RocAxiosRequestOptions, RocQueryOptions } from '../types.ts';

export class Query<KeyType, ValueType, ContentType> {
  public readonly viewName: string;
  protected baseOptions: RocQueryOptions;
  private request: AxiosInstance;
  public constructor(
    viewName: string,
    options: RocQueryOptions,
    request: AxiosInstance,
  ) {
    this.request = request;
    this.viewName = viewName;
    this.baseOptions = options;
  }

  public then(
    resolve: (
      value: Array<RocQueryResult<KeyType, ValueType, ContentType>>,
    ) => void,
    reject: (error: Error) => void,
  ) {
    this.fetch().then(resolve, reject);
  }

  public async fetch(
    options: RocQueryOptions = {},
    axiosOptions?: RocAxiosRequestOptions,
  ): Promise<Array<RocQueryResult<KeyType, ValueType, ContentType>>> {
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
