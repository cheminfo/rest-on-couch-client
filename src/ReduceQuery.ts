import { AxiosInstance } from 'axios';
import {
  BaseRocReduceQuery,
  IReduceQueryOptions,
  IReduceQueryResult,
  IRocReduceQueryParams
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
    const requestOptions: IRocReduceQueryParams = {
      ...options,
      reduce: true
    };
    const response = await this.request({
      url: '',
      params: requestOptions
    });
    return response.data;
  }
}
