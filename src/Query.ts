import { AxiosInstance } from 'axios';
import { BaseRocQuery, IQueryOptions, IQueryResult } from './RocBase';

export default class Query<A, B> extends BaseRocQuery {
  private request: AxiosInstance;
  constructor(
    viewName: string,
    options: IQueryOptions,
    request: AxiosInstance
  ) {
    super(viewName, options);
    this.request = request;
  }

  public async fetch(
    options: IQueryOptions = {}
  ): Promise<Array<IQueryResult<A, B>>> {
    const params = Object.assign({}, this.baseOptions, options);

    const response = await this.request({
      url: '',
      params
    });
    return response.data;
  }
}
