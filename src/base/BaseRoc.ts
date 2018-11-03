import { BaseRocReduceQuery } from '.';
import {
  ICouchUser,
  INewDocument,
  IQueryOptions,
  IReduceQueryOptions
} from '../types';
import BaseRocDocument from './BaseRocDocument';
import BaseRocQuery from './BaseRocQuery';

export default abstract class BaseRoc {
  public abstract getUser(): Promise<ICouchUser>;
  public abstract getDocument(uuid: string): BaseRocDocument;
  public abstract getQuery<KeyType = any, ValueType = any>(
    viewName: string,
    options?: IQueryOptions
  ): BaseRocQuery<KeyType, ValueType>;
  public abstract getReduceQuery<KeyType = any, ValueType = any>(
    viewName: string,
    options?: IReduceQueryOptions
  ): BaseRocReduceQuery<KeyType, ValueType>;
  public abstract create(newDocument: INewDocument): Promise<BaseRocDocument>;
}
