import {
  Encoding,
  IAttachment,
  ICouchUser,
  IDocument,
  INewAttachment,
  INewDocument,
  IQueryOptions,
  IReduceQueryOptions,
  PromisedQueryResult,
  PromisedReduceQueryResult
} from './types';

/* tslint:disable max-classes-per-file */

export abstract class BaseRoc {
  public abstract getUser(): Promise<ICouchUser>;
  public abstract getDocument(uuid: string): BaseRocDocument;
  public abstract getQuery<KeyType = any, ValueType = any>(
    viewName: string,
    options: IQueryOptions
  ): BaseRocQuery<KeyType, ValueType>;
  public abstract getReduceQuery<KeyType = any, ValueType = any>(
    viewName: string
  ): BaseRocReduceQuery<KeyType, ValueType>;
  public abstract create(newDocument: INewDocument): Promise<BaseRocDocument>;
}

export abstract class BaseRocQuery<KeyType = any, ValueType = any> {
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

export abstract class BaseRocDocument {
  public uuid: string;
  public rev?: string;

  protected value?: IDocument;
  constructor(uuid: string) {
    this.uuid = uuid;
  }

  public abstract getAttachmentList(): IAttachment[];
  public abstract getAttachment(name: string): IAttachment;

  public abstract fetchAttachment(
    name: string,
    encoding?: Encoding
  ): Promise<Buffer | string>;
  public abstract fetch(rev?: string): Promise<IDocument>;
  public abstract update(
    content: IDocument,
    newAttachments?: INewAttachment[],
    deleteAttachments?: string[]
  ): Promise<IDocument>;
  public abstract addGroups(groups: string | string[]): Promise<string[]>;

  public getValue() {
    return this.value;
  }

  public toJSON() {
    return this.getValue();
  }
}
