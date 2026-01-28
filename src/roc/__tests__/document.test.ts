import { assert, beforeAll, describe, expect, it } from 'vitest';

import { resetTestDatabase, testRoc } from '../../testUtils.ts';
import type { RocDocument } from '../index.ts';

beforeAll(async () => {
  await resetTestDatabase();
});

describe('documents', () => {
  it('should create and fetch a document', async () => {
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

  it('should create then delete a document with roc.deleteDocument', async () => {
    const doc = await testRoc.create({
      $id: 'docToDelete',
      $kind: 'entry',
      $content: { hello: 'world' },
      $owners: [],
    });

    const data = await testRoc.deleteDocument(doc.uuid);

    await expect(doc.fetch()).rejects.toThrowError(/404/);
    expect(data).toMatchObject({
      ok: true,
    });
  });

  it('should create then delete a document with doc.delete', async () => {
    const doc = await testRoc.create({
      $id: 'docToDelete',
      $kind: 'entry',
      $content: { hello: 'world' },
      $owners: [],
    });

    await doc.delete();

    await expect(doc.fetch()).rejects.toThrowError(/404/);
    expect(doc.deleted).toBe(true);
  });

  it('should fail if trying to update a document but the content contains the _id property', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: RocDocument<any> = await testRoc.create({
      $id: 'docToUpdate',
      $kind: 'entry',
      $content: { hello: 'world' },
      $owners: [],
    });
    await doc.fetch();

    await expect(() => doc.update(doc.getValue())).rejects.toThrowError(
      /Your content contains an _id proprerty/,
    );
  });
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

    const firstAfterAttachment = afterAttachments[0];
    assert(firstAfterAttachment);

    expect(firstAfterAttachment).toMatchObject({
      name: 'test.txt',
      revpos: 2,
      length: bufferContent.length,
      stub: true,
    });
    expect(firstAfterAttachment.digest).toMatch(/md5-/);

    const oneAttachment = doc.getAttachment('test.txt');

    expect(oneAttachment).toStrictEqual(afterAttachments[0]);

    const attachmentAsText = await doc.fetchAttachment('test.txt', 'text');
    assert(typeof attachmentAsText === 'string');

    expect(attachmentAsText).toBe('buffer content');

    const attachmentAsBuffer = await doc.fetchAttachment(
      'test.txt',
      'arraybuffer',
    );

    expect(attachmentAsBuffer).toStrictEqual(attachmentData);
  });

  it('should overwrite the same attachment', async () => {
    const [docContent] = await testRoc.getView('entryById', {
      key: 'docWithAttachment',
    });

    assert(docContent);
    const doc = testRoc.initializeDocument(docContent);

    expect(doc.getAttachmentList()).toHaveLength(1);

    const docValue = doc.getValue();
    assert(docValue);
    const contents2 = 'buffer contents rev 2';
    await doc.update(docValue.$content, [
      {
        name: 'test.txt',
        content_type: 'text/plain',
        data: Buffer.from(contents2),
      },
    ]);

    expect(doc.getAttachmentList()).toHaveLength(1);

    const attachmentAsBuffer = await doc.fetchAttachment(
      'test.txt',
      'arraybuffer',
    );

    expect(attachmentAsBuffer).toStrictEqual(Buffer.from(contents2));
  });

  it('should not overwrite the same attachment if configured to be forbidden', async () => {
    const [docContent] = await testRoc.getView('entryById', {
      key: 'docWithAttachment',
    });
    assert(docContent);

    const doc = testRoc.initializeDocument(docContent, {
      allowAttachmentOverwrite: false,
    });

    expect(doc.getAttachmentList()).toHaveLength(1);

    const contents2 = 'buffer contents rev 2';
    const docValue = doc.getValue();
    assert(docValue);

    await expect(
      doc.update(docValue.$content, [
        {
          name: 'test.txt',
          content_type: 'text/plain',
          data: Buffer.from(contents2),
        },
      ]),
    ).rejects.toThrowError(
      'overwriting test.txt, overwriting attachments is forbidden',
    );
  });

  it('should delete attachment from document', async () => {
    const query = testRoc.getView('entryById', {
      key: 'docWithAttachment',
    });
    const data = await query.fetch();

    expect(data).toHaveLength(1);

    const firstDatum = data[0];

    expect(firstDatum).toBeDefined();

    assert(firstDatum);
    const doc = testRoc.initializeDocument(firstDatum);

    const docValue = doc.getValue();
    assert(docValue);

    expect(doc.getAttachmentList()).toHaveLength(1);

    await doc.update(docValue.$content, undefined, ['test.txt']);

    expect(doc.getAttachmentList()).toHaveLength(0);
  });

  it('should fail if attachments are requested but document is not fetched', async () => {
    const query = testRoc.getView('entryById', {
      key: 'docWithAttachment',
    });
    const data = await query.fetch();

    expect(data).toHaveLength(1);

    const firstDatum = data[0];
    assert(firstDatum);

    const doc = testRoc.getDocument(firstDatum._id);

    expect(() => doc.getAttachmentList()).toThrowError(
      'You must fetch the document in order to get the attachment list',
    );
  });

  it('should fail if one attchment is requested but document is not fetched', async () => {
    const query = testRoc.getView('entryById', {
      key: 'docWithAttachment',
    });
    const data = await query.fetch();

    expect(data).toHaveLength(1);

    const firstDatum = data[0];

    expect(firstDatum).toBeDefined();

    assert(firstDatum);
    const doc = testRoc.getDocument(firstDatum._id);

    expect(() => doc.getAttachment('test.txt')).toThrowError(
      'You must fetch the document in order to get an attachment',
    );
  });

  it('should fail if trying to get an attachment that does not exist', async () => {
    const query = testRoc.getView('entryById', {
      key: 'docWithAttachment',
    });
    const data = await query.fetch();

    expect(data).toHaveLength(1);

    const firstDatum = data[0];

    expect(firstDatum).toBeDefined();

    assert(firstDatum);

    const doc = testRoc.initializeDocument(firstDatum);

    expect(() => doc.getAttachment('test.txt')).toThrowError(
      'attachment test.txt does not exist',
    );
  });
});
