import { IReduceQueryOptions, PromisedReduceQueryResult } from '../types';

export abstract class BaseRocReduceQuery<KeyType = any, ValueType = any> {
  public readonly viewName: string;
  constructor(viewName: string) {
    this.viewName = viewName;
  }

  public then(
    resolve: (value: PromisedReduceQueryResult<KeyType, ValueType>) => void
  ) {
    resolve(this.fetch());
  }

  public abstract fetch(
    options?: IReduceQueryOptions
  ): PromisedReduceQueryResult<KeyType, ValueType>;
}
