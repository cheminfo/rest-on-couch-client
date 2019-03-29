import {
  IReduceQueryOptions,
  IReduceQueryResult,
  PromisedReduceQueryResult
} from '../types';

export default abstract class BaseRocReduceQuery<
  KeyType = any,
  ValueType = any
> {
  public readonly viewName: string;
  constructor(viewName: string) {
    this.viewName = viewName;
  }

  public then(
    resolve: (value: Array<IReduceQueryResult<KeyType, ValueType>>) => void
  ) {
    this.fetch().then(resolve);
  }

  public abstract async fetch(
    options?: IReduceQueryOptions
  ): PromisedReduceQueryResult<KeyType, ValueType>;
}
