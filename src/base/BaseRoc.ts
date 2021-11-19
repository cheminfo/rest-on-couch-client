import { ICouchGroupInfo } from '..';
import {
  ICouchUser,
  ICouchUserGroup,
  INewDocument,
  IQueryOptions,
  IReduceQueryOptions,
} from '../types';

import BaseRocDocument from './BaseRocDocument';
import BaseRocQuery from './BaseRocQuery';

import { BaseRocReduceQuery } from '.';

export default abstract class BaseRoc {
  public abstract getUser(): Promise<ICouchUser>;
  public abstract getUserGroups(): Promise<ICouchUserGroup[]>;
  public abstract getGroupsInfo(): Promise<ICouchGroupInfo[]>;
  public abstract getDocument<ContentType = Record<string, any>>(
    uuid: string,
  ): BaseRocDocument<ContentType>;
  public abstract getQuery<
    KeyType = any,
    ValueType = any,
    ContentType = Record<string, any>,
  >(
    viewName: string,
    options?: IQueryOptions,
  ): BaseRocQuery<KeyType, ValueType, ContentType>;
  public abstract getReduceQuery<KeyType = any, ValueType = any>(
    viewName: string,
    options?: IReduceQueryOptions,
  ): BaseRocReduceQuery<KeyType, ValueType>;
  public abstract create<ContentType = Record<string, any>>(
    newDocument: INewDocument<ContentType>,
  ): Promise<BaseRocDocument<ContentType>>;
}
