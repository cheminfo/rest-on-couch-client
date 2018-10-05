import { getTestData } from '../fixtures/data';
import { FakeRoc } from '../Roc';

describe('fake queries', () => {
  it('fetch', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const query = roc.getQuery('documentByOwner');
    const queryResult = await query.fetch();
    expect(queryResult).toHaveLength(11);
  });
});
