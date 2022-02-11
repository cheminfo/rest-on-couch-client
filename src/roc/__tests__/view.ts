import {
  getNewDocument,
  getNewEntry,
  resetTestDatabase,
  testRoc,
} from '../../testUtils';

beforeAll(async () => {
  await resetTestDatabase();
});

test('getView', async () => {
  await testRoc.create(getNewEntry('id1'));
  await testRoc.create(getNewEntry('id2'));
  await testRoc.create(getNewDocument('otherKind', 'id3'));

  const query = testRoc.getView('entryById', {
    key: 'id1',
  });

  const datas = await query.fetch();
  expect(datas).toHaveLength(1);
  const data = datas[0];

  expect(data).toBeDefined();
  expect(typeof data.$modificationDate).toBe('number');
  expect(typeof data.$creationDate).toBe('number');
  expect(typeof data._id).toBe('string');
  expect(data._rev).toMatch(/^1-/);
  expect(data).toMatchObject({
    $content: {
      hello: 'world',
    },
    $owners: ['admin@cheminfo.org'],
    $kind: 'entry',
    $id: 'id1',
  });

  expect(data._attachments).toBeUndefined();
});

test('getView thenable', async () => {
  const data = await testRoc.getView('entryById', {
    key: 'id1',
  });

  expect(data).toHaveLength(1);
});

test('getView range', async () => {
  const data = await testRoc.getView('entryById', {
    startkey: 'id1',
    endkey: 'id2',
  });

  expect(data).toHaveLength(2);
});
