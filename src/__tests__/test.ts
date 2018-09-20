import { FakeRoc, IRocData } from '../fake/Roc';
import { INewDocument } from '../RocBase';

function getData(): IRocData {
  return {
    uuid1: [
      {
        _id: '_id1',
        _rev: '_rev1',
        $content: {},
        $modificationDate: 0,
        $creationDate: 0,
        $kind: 'kind',
        $owner: ['test@test.com']
      }
    ]
  };
}

describe('fake roc', () => {
  it('create document', async () => {
    const data = getData();
    const roc = new FakeRoc(data);
    const newDoc: INewDocument = {
      $kind: 'kind',
      $content: {
        test: 42
      },
      $owner: ['group1', 'group2']
    };
    const document = await roc.create(newDoc);
    expect(document.getValue().$content).toEqual({ test: 42 });
    expect(document.getValue().$owner).toEqual([
      'test@test.com',
      'group1',
      'group2'
    ]);
    expect(document.getValue().$kind).toEqual('kind');
    expect(document.getValue()._id).toHaveLength(32);
    expect(document.getValue()._rev.substr(0, 1)).toEqual('1');
  });
  it('getDocument', async () => {
    const data = getData();
    const roc = new FakeRoc(data);
    const user = await roc.getUser();
    expect(user).toEqual('test@test.com');
    const document = await roc.getDocument('uuid1');
    const doc = await document.fetch(); // Fetch latest revision if it's out of sync
    expect(doc).toEqual(data.uuid1[0]);
    //   await document.forceFetch(); // Fetch latest revision even if revision is up to date
    const val = document.getValue(); // document json
    expect(val).toEqual(data.uuid1[0]);
  });
});