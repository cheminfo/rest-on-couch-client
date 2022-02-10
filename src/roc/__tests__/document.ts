import { resetTestDatabase, testRoc } from '../../testUtils';

beforeAll(async () => {
  await resetTestDatabase();
});

test('should create a document', async () => {
  const doc = await testRoc.create({
    $id: 'newDoc',
    $kind: 'kind',
    $content: { hello: 'world' },
    $owners: [],
  });
  expect(doc).toBeDefined();
});
