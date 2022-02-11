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
  expect(data._attachments).toBeUndefined();
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

describe('attachments', () => {
  it('should add an attachment to the document using Buffer', async () => {
    const doc = await testRoc.create({
      $id: 'docWithAttachment',
      $kind: 'kind',
      $content: { hello: 'world' },
      $owners: [],
    });
    const data = await doc.fetch();
    const attachments = doc.getAttachmentList();
    expect(attachments).toHaveLength(0);

    const bufferContent = 'buffer content';
    const attachmentData = Buffer.from(bufferContent, 'utf-8');
    await doc.update(data.$content, [
      {
        name: 'test.txt',
        content_type: 'text/plain',
        data: attachmentData,
      },
    ]);

    const afterAttachments = doc.getAttachmentList();

    expect(afterAttachments).toHaveLength(1);
    expect(afterAttachments[0]).toMatchObject({
      name: 'test.txt',
      revpos: 2,
      length: bufferContent.length,
      stub: true,
    });
    expect(afterAttachments[0].digest).toMatch(/md5-/);

    const attachmentAsText = await doc.fetchAttachment('test.txt', 'text');
    if (typeof attachmentAsText !== 'string') {
      throw new Error('expected contents to be a string');
    }
    expect(attachmentAsText).toBe('buffer content');

    const attachmentAsBuffer = await doc.fetchAttachment(
      'test.txt',
      'arraybuffer',
    );
    expect(attachmentAsBuffer).toStrictEqual(attachmentData);
  });
});
