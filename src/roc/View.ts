import { AxiosInstance } from 'axios';

import { IViewOptions, IViewResult } from '../types';

export default class View<ContentType> {
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
    resolve: (value: IViewResult<ContentType>) => void,
    reject: (error: Error) => void,
  ) {
    this.fetch().then(resolve, reject);
  }

  public async fetch(
    options: IViewOptions = {},
  ): Promise<IViewResult<ContentType>> {
    const params = Object.assign({}, this.options, options);

    const response = await this.request({
      url: '/',
      params,
    });
    return response.data;
  }
}
