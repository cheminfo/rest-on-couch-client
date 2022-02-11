import { resetTestDatabase, testRoc } from '../../testUtils';

beforeAll(async () => {
  await resetTestDatabase();
});

test('should create and fetch a document', async () => {
  const doc = await testRoc.create({
    $id: 'newDoc',
    $kind: 'entry',
    $content: { hello: 'world' },
    $owners: [],
  });
  expect(doc).toBeDefined();
  expect(doc.getValue()).toBeUndefined();
  const data = await doc.fetch();
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
    $id: 'newDoc',
  });

  expect(data._attachments).toBeUndefined();
});

test('should create then delete a document with roc.deleteDocument', async () => {
  const doc = await testRoc.create({
    $id: 'docToDelete',
    $kind: 'entry',
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
    $kind: 'entry',
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
      $kind: 'entry',
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

    const oneAttachment = doc.getAttachment('test.txt');
    expect(oneAttachment).toStrictEqual(afterAttachments[0]);

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

  it('should delete attachment from document', async () => {
    const query = testRoc.getView('entryById', {
      key: 'docWithAttachment',
    });
    const data = await query.fetch();

    expect(data).toHaveLength(1);

    const doc = testRoc.initializeDocument(data[0]);

    expect(doc.getAttachmentList()).toHaveLength(1);
    await doc.update(doc.getValue().$content, undefined, ['test.txt']);

    expect(doc.getAttachmentList()).toHaveLength(0);
  });

  it('should fail if attachments are requested but document is not fetched', async () => {
    const query = testRoc.getView('entryById', {
      key: 'docWithAttachment',
    });
    const data = await query.fetch();

    expect(data).toHaveLength(1);

    const doc = testRoc.getDocument(data[0]._id);
    expect(() => doc.getAttachmentList()).toThrow(
      'You must fetch the document in order to get the attachment list',
    );
  });

  it('should fail if one attchment is requested but document is not fetched', async () => {
    const query = testRoc.getView('entryById', {
      key: 'docWithAttachment',
    });
    const data = await query.fetch();

    expect(data).toHaveLength(1);

    const doc = testRoc.getDocument(data[0]._id);
    expect(() => doc.getAttachment('test.txt')).toThrow(
      'You must fetch the document in order to get an attachment',
    );
  });

  it('should fail if trying to get an attachment that does not exist', async () => {
    const query = testRoc.getView('entryById', {
      key: 'docWithAttachment',
    });
    const data = await query.fetch();

    expect(data).toHaveLength(1);

    const doc = testRoc.initializeDocument(data[0]);
    expect(() => doc.getAttachment('test.txt')).toThrow(
      'attachment test.txt does not exist',
    );
  });
});
