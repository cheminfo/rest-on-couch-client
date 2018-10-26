import { INewAttachment } from '../../RocBase';
import { getTestData } from '../fixtures/data';
import { FakeRoc } from '../Roc';

import { RocClientError } from '../../Error';

describe('fake attachments', () => {
  it('add attachment', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const doc = roc.getDocument('uuid1');
    await doc.fetch();
    const attachment: INewAttachment = {
      content_type: 'text/plain',
      name: 'attachment2',
      data: new Buffer('test', 'utf-8')
    };
    await doc.update(doc.getValue().$content, [attachment]);
    expect(doc.getValue()._attachments.attachment2).toBeDefined();

    const attachmentContent = await doc.fetchAttachment('attachment2', 'utf-8');
    expect(attachmentContent).toEqual('test');
  });

  it('delete attachment', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const doc = roc.getDocument('uuid1');
    await doc.fetch();
    await doc.update(doc.getValue().$content, null, ['attachment1']);
    expect(doc.getValue()._attachments).toEqual({});
    expect(doc.fetchAttachment('attachment1')).rejects.toThrow(
      /does not exist/
    );
  });

  it('get list of attachments', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const doc = roc.getDocument('uuid1');
    await doc.fetch();
    const list = doc.getAttachmentList();
    expect(list).toEqual([
      {
        digest: 'digest',
        content_type: 'text/plain',
        revpos: 1,
        length: 4,
        stub: true,
        name: 'attachment1',
        url: 'https://mydb.cheminfo.org/db/eln/entry/uuid1/attachment1'
      }
    ]);
  });

  it('get an attachment', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const doc = roc.getDocument('uuid1');
    await doc.fetch();
    const attachment = doc.getAttachment('attachment1');
    expect(attachment).toEqual({
      digest: 'digest',
      content_type: 'text/plain',
      revpos: 1,
      length: 4,
      stub: true,
      name: 'attachment1',
      url: 'https://mydb.cheminfo.org/db/eln/entry/uuid1/attachment1'
    });
  });

  it('get a non-existing attachment should throw', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const doc = roc.getDocument('uuid1');
    await doc.fetch();
    function getNonExisting() {
      doc.getAttachment('non-existing');
    }
    expect(getNonExisting).toThrowError(RocClientError);
    expect(getNonExisting).toThrowError(/does not exist/);
  });

  it('get an attachment before fetch should throw', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const doc = roc.getDocument('uuid1');
    function getAttachment() {
      doc.getAttachment('attachment1');
    }
    expect(getAttachment).toThrowError(RocClientError);
    expect(getAttachment).toThrowError(/must fetch/);
  });
});
