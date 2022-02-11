import { resetTestDatabase, testRoc } from '../../testUtils';

beforeAll(async () => {
  await resetTestDatabase();
});

test('should create and fetch a document', async () => {
  const doc = await testRoc.create({
    $id: 'newDoc',
    $kind: 'kind',
    $content: { hello: 'world' },
    $owners: [],
  });
  expect(doc).toBeDefined();
  expect(doc.getValue()).toBeUndefined();
  const data = await doc.fetch();
  expect(data).toBeDefined();
  expect(data.$modificationDate).toBeDefined();
  expect(data.$creationDate).toBeDefined();
  expect(data._id).toBeDefined();
  expect(data._rev).toMatch(/^1-/);
  expect(data.$id).toBe('newDoc');
  expect(data.$kind).toBe('kind');
  expect(data.$content).toMatchObject({
    hello: 'world',
  });
  expect(data.$owners).toHaveLength(1);
  expect(data.$owners[0]).toBe('admin@cheminfo.org');
});

test('should create then delete a document with roc.deleteDocument', async () => {
  const doc = await testRoc.create({
    $id: 'docToDelete',
    $kind: 'kind',
    $content: { hello: 'world' },
    $owners: [],
  });

  const data = await testRoc.deleteDocument(doc.uuid);
  await expect(doc.fetch()).rejects.toThrow(/404/);
  expect(data).toMatchObject({
    ok: true,
  });
});

test('should create then delete a document with doc.delete', async () => {
  const doc = await testRoc.create({
    $id: 'docToDelete',
    $kind: 'kind',
    $content: { hello: 'world' },
    $owners: [],
  });

  await doc.delete();
  await expect(doc.fetch()).rejects.toThrow(/404/);
  expect(doc.deleted).toBe(true);
});
