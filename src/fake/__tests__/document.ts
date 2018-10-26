import { INewDocument } from '../../RocBase';
import { getTestData } from '../fixtures/data';
import { FakeRoc } from '../Roc';

describe('fake document', () => {
  it('create document', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const newDoc: INewDocument = {
      $kind: 'kind',
      $id: 'newDocument',
      $content: {
        test: 42
      },
      $owners: ['group1', 'group2', 'group1']
    };
    const document = await roc.create(newDoc);
    expect(document.getValue().$content).toEqual({ test: 42 });
    expect(document.getValue().$owners).toEqual([
      'test@test.com',
      'group1',
      'group2'
    ]);
    expect(document.getValue().$kind).toEqual('kind');
    expect(document.getValue()._id).toHaveLength(32);
    expect(document.getValue()._rev.substr(0, 1)).toEqual('1');
  });

  it('get document', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const document = roc.getDocument('uuid1');
    const doc = await document.fetch(); // Fetch latest revision if it's out of sync
    expect(doc).toEqual(data.documents.uuid1[0]);
    //   await document.forceFetch(); // Fetch latest revision even if revision is up to date
    const val = document.getValue(); // document json
    expect(val).toEqual(data.documents.uuid1[0]);
  });

  it('document update content', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const document = roc.getDocument('uuid1');
    const newDocument = await document.update({
      test: 43
    });
    expect(newDocument._rev.substr(0, 1)).toEqual('2');
  });

  it('document toJSON', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const doc = roc.getDocument('uuid1');
    const val = JSON.parse(JSON.stringify(await doc.fetch()));
    expect(val).toEqual(data.documents.uuid1[0]);
  });
});
