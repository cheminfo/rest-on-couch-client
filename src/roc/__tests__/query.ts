import { AxiosError } from 'axios';

import {
  getNewDocument,
  getNewEntry,
  resetTestDatabase,
  testRoc,
} from '../../testUtils';

beforeAll(async () => {
  await resetTestDatabase();
});

test('query documents', async () => {
  await testRoc.create(getNewEntry('id1'));
  await testRoc.create(getNewEntry('id2'));
  await testRoc.create(getNewDocument('otherKind', 'id3'));

  const query = testRoc.getQuery('entryByOwnersAndKind', {
    key: 'entry',
  });

  const data = await query.fetch();
  expect(data).toHaveLength(2);
});

test('query a view that does not have the "withOwner" property should fail', async () => {
  await expect(testRoc.getQuery('entryById')).rejects.toThrow(/401/);
});
