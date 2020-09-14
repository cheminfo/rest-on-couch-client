import {
  IReduceQueryOptions,
  IReduceQueryResult,
  PromisedReduceQueryResult,
} from '../types';

export default abstract class BaseRocReduceQuery<
  KeyType = any,
  ValueType = any
> {
  public readonly viewName: string;
  public constructor(viewName: string) {
    this.viewName = viewName;
  }

  public then(
    resolve: (value: Array<IReduceQueryResult<KeyType, ValueType>>) => void,
    reject: (error: Error) => void,
  ) {
    this.fetch().then(resolve, reject);
  }

  public abstract async fetch(
    options?: IReduceQueryOptions,
  ): PromisedReduceQueryResult<KeyType, ValueType>;
}
