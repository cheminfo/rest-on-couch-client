import { AxiosInstance } from 'axios';
import { BaseRocQuery, IQueryOptions, IQueryResult } from './RocBase';

export default class Query<A, B> extends BaseRocQuery {
  private request: AxiosInstance;
  constructor(viewName: string, request: AxiosInstance) {
    super(viewName);
    this.request = request;
  }

  public async fetch(
    options: IQueryOptions = {}
  ): Promise<Array<IQueryResult<A, B>>> {
    const response = await this.request({
      url: '',
      params: options
    });
    return response.data;
  }
}
