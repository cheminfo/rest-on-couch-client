import { getTestData } from '../fixtures/data';
import { FakeRoc } from '../Roc';
import { INewAttachment } from '../../RocBase';

describe('fake attachments', () => {
    it('add attachment', async () => {
        const data = getTestData();
        const roc = new FakeRoc(data);
        const doc = await roc.getDocument('uuid1');
        await doc.fetch();
        const attachment: INewAttachment = {
            content_type: 'text/plain',
            name: 'attachment1',
            data: new Buffer('test', 'utf-8')
        }
        await doc.update(doc.getValue().$content, [attachment])
        expect(doc.getValue()._attachments.attachment1).toBeDefined();

        const attachmentContent = await doc.fetchAttachment('attachment1', 'utf-8');
        expect(attachmentContent).toEqual('test');
    });
});
