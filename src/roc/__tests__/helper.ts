import { getRocClientError } from '../..';
import { testRoc } from '../../testUtils';

test('getRocClientError', async () => {
  try {
    await testRoc.getQuery('entryById');
  } catch (e) {
    const rocError = getRocClientError(e);
    expect(rocError).toMatchObject({
      code: 'unauthorized',
      error: 'entryById is not a view with owner',
    });
  }
});
