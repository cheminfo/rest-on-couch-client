import { FakeRoc } from '../..';
import { RocHTTPError } from '../../Error';
import { getTestData } from '../fixtures/data';

describe('fake queries', () => {
  it('fetch', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const query = roc.getQuery('documentByOwner');
    const queryResult = await query.fetch();
    expect(queryResult).toHaveLength(11);
  });

  it('fetch view not found', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const query = roc.getQuery('inexistant');
    async function fetchQuery() {
      await query.fetch();
    }
    await expect(fetchQuery()).rejects.toThrow(RocHTTPError);
    await expect(fetchQuery()).rejects.toThrow(/not a view with owner/);
  });

  it('getQuery can be awaited', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const query = roc.getQuery('documentByOwner');
    const queryResult = await query;
    expect(queryResult).toHaveLength(11);
  });
});
