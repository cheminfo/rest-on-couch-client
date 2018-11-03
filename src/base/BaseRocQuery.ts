import { IQueryOptions, PromisedQueryResult } from '../types';

export default abstract class BaseRocQuery<KeyType = any, ValueType = any> {
  public readonly viewName: string;
  protected baseOptions: IQueryOptions;
  constructor(viewName: string, options: IQueryOptions) {
    this.viewName = viewName;
    this.baseOptions = options;
  }

  public then(
    resolve: (value: PromisedQueryResult<KeyType, ValueType>) => void
  ) {
    resolve(this.fetch());
  }
  public abstract fetch(
    options?: IQueryOptions
  ): PromisedQueryResult<KeyType, ValueType>;
}
