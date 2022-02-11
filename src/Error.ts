export class RocClientError extends Error {
  public constructor(message: string) {
    if (typeof message !== 'string') {
      throw new Error('ROCClientError message must be a string');
    }
    super(message);
  }
}
