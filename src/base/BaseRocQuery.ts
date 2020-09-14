import { IQueryOptions, IQueryResult, PromisedQueryResult } from '../types';

export default abstract class BaseRocQuery<KeyType = any, ValueType = any> {
  public readonly viewName: string;
  protected baseOptions: IQueryOptions;
  public constructor(viewName: string, options: IQueryOptions) {
    this.viewName = viewName;
    this.baseOptions = options;
  }

  public then(
    resolve: (value: Array<IQueryResult<KeyType, ValueType>>) => void,
    reject: (error: Error) => void,
  ) {
    this.fetch().then(resolve, reject);
  }
  public abstract fetch(
    options?: IQueryOptions,
  ): PromisedQueryResult<KeyType, ValueType>;
}
