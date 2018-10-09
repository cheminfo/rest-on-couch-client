import { INewAttachment } from '../../RocBase';
import { getTestData } from '../fixtures/data';
import { FakeRoc } from '../Roc';

describe('fake attachments', () => {
    it('add attachment', async () => {
        const data = getTestData();
        const roc = new FakeRoc(data);
        const doc = await roc.getDocument('uuid1');
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
        const doc = await roc.getDocument('uuid1');
        await doc.fetch();
        await doc.update(doc.getValue().$content, null, ['attachment1']);
        expect(doc.getValue()._attachments).toEqual({});
        expect(doc.fetchAttachment('attachment1')).rejects.toThrow(/does not exist/);
    });
});
