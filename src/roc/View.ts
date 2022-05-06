import { AxiosInstance } from 'axios';

import { IViewOptions, IViewResult, RocAxiosOptions } from '../types';

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
    axiosOptions?: RocAxiosOptions,
  ): Promise<IViewResult<ContentType, IdType>> {
    const params = Object.assign({}, this.options, options);

    const response = await this.request({
      url: '/',
      params,
      ...axiosOptions,
    });
    return response.data;
  }
}
