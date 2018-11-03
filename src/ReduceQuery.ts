import { AxiosInstance } from 'axios';
import {
  BaseRocReduceQuery,
  IReduceQueryOptions,
  IReduceQueryResult
} from './RocBase';

export default class ReduceQuery<A, B> extends BaseRocReduceQuery {
  private request: AxiosInstance;
  constructor(viewName: string, request: AxiosInstance) {
    super(viewName);
    this.request = request;
  }

  public async fetch(
    options: IReduceQueryOptions = {}
  ): Promise<Array<IReduceQueryResult<A, B>>> {
    const requestOptions = {
      ...options,
      reduce: true
    };
    const response = await this.request({
      url: '',
      params: options
    });
    return response.data;
  }
}
