import { AxiosError } from 'axios';
import { describe, expect, it } from 'vitest';

import { getRocClientError } from '../../index.ts';
import { testRoc } from '../../testUtils.ts';

describe('Axios errors', () => {
  it('is an axios error', async () => {
    await expect(testRoc.getQuery('entryById').fetch()).rejects.toBeInstanceOf(
      AxiosError,
    );
  });

  it('error data has been fetched', async () => {
    await expect(testRoc.getQuery('entryById')).rejects.toSatisfy((error) => {
      const errorData = getRocClientError(error);
      console.log(errorData);
      return (
        errorData?.code === 'unauthorized' &&
        errorData?.error === 'entryById is not a view with owner'
      );
    });
  });
});
