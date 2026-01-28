import type { AxiosInstance } from 'axios';

import type {
  RocAxiosRequestOptions,
  RocViewOptions,
  RocViewResult,
} from '../types.ts';

export default class View<ContentType, IdType> {
  private request: AxiosInstance;
  private options: RocViewOptions;
  public readonly viewName: string;

  public constructor(
    viewName: string,
    options: RocViewOptions,
    request: AxiosInstance,
  ) {
    this.request = request;
    this.options = options;
    this.viewName = viewName;
  }

  public then(
    resolve: (value: RocViewResult<ContentType, IdType>) => void,
    reject: (error: Error) => void,
  ) {
    this.fetch().then(resolve, reject);
  }

  public async fetch(
    options: RocViewOptions = {},
    axiosOptions?: RocAxiosRequestOptions,
  ): Promise<RocViewResult<ContentType, IdType>> {
    const params = { ...this.options, ...options };

    const response = await this.request({
      url: '/',
      params,
      ...axiosOptions,
    });
    return response.data;
  }
}
