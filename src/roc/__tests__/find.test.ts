import { beforeAll, expect, test } from 'vitest';

import {
  getNewDocument,
  getNewEntry,
  resetTestDatabase,
  testRoc,
} from '../../testUtils.ts';

beforeAll(async () => {
  await resetTestDatabase();
});

test('getFind', async () => {
  await testRoc.create(getNewEntry('id1'));
  await testRoc.create(getNewEntry('id2'));
  await testRoc.create(getNewDocument('otherKind', 'id3'));

  const find = testRoc.getFind({
    right: 'read',
    query: { limit: 2 },
  });

  const data = await find.fetch<{ $kind: string }>({
    query: { fields: ['$kind'] },
  });

  expect(data.docs).toHaveLength(2);
});

test('getFind with custom right, selector and sort', async () => {
  await testRoc.create(getNewEntry('id4'));

  const find = testRoc.getFind({
    right: 'owner',
    query: {
      limit: 2,
      selector: {
        '\\$id': {
          $gte: 'id1',
          $lte: 'id3',
        },
      },
      sort: [{ '\\$id': 'desc' }],
      use_index: 'id',
    },
  });

  const data = await find.fetch<{ $id: string }>({
    query: { fields: ['$id'] },
  });

  expect(data.docs).toHaveLength(2);
  expect(data.docs).toStrictEqual([{ $id: 'id3' }, { $id: 'id2' }]);
});

test('getFind thenable', async () => {
  const data = await testRoc.getFind<{ $kind: string }>({
    query: { limit: 3 },
  });

  expect(data.docs).toHaveLength(3);
});
