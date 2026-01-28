import { expect, test } from 'vitest';

import { getRocClientError } from '../../index.ts';
import { testRoc } from '../../testUtils.ts';

test('getRocClientError', async () => {
  try {
    await testRoc.getQuery('entryById');

    // Make sure tests fails if the statement above does not throw
    expect(false).toBe(true);
  } catch (e) {
    const rocError = getRocClientError(e);

    // eslint-disable-next-line vitest/no-conditional-expect
    expect(rocError).toMatchObject({
      code: 'unauthorized',
      error: 'entryById is not a view with owner',
    });
  }
});
