export class RocHTTPError extends Error {
  public code: number;
  public constructor(code: number, message: string) {
    if (typeof code !== 'number') {
      throw new Error('ROCHTTPError code must be a number');
    }
    if (typeof message !== 'string') {
      throw new Error('ROCHTTPError message must be a string');
    }
    super(message);
    this.code = code;
  }
}

export class RocClientError extends Error {
  public constructor(message: string) {
    if (typeof message !== 'string') {
      throw new Error('ROCClientError message must be a string');
    }
    super(message);
  }
}
