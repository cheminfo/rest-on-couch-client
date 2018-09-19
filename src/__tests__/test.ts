import { FakeRoc, IRocData } from '../fake/Roc';

const data: IRocData = {
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

it('fake roc', async () => {
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
