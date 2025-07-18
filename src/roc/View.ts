import { AxiosInstance } from 'axios';

import { IViewOptions, IViewResult, RocAxiosRequestOptions } from '../types';

export default class View<ContentType, IdType> {
  private request: AxiosInstance;
  private options: IViewOptions;
  public readonly viewName: string;

  public constructor(
    viewName: string,
    options: IViewOptions,
    request: AxiosInstance,
  ) {
    this.request = request;
    this.options = options;
    this.viewName = viewName;
  }

  public then(
    resolve: (value: IViewResult<ContentType, IdType>) => void,
    reject: (error: Error) => void,
  ) {
    this.fetch().then(resolve, reject);
  }

  public async fetch(
    options: IViewOptions = {},
    axiosOptions?: RocAxiosRequestOptions,
  ): Promise<IViewResult<ContentType, IdType>> {
    const params = { ...this.options, ...options };

    const response = await this.request({
      url: '/',
      params,
      ...axiosOptions,
    });
    return response.data;
  }
}
