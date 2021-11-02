import { FakeRoc } from '..';
import { INewDocument } from '../../types';
import { getTestData } from '../fixtures/data';

describe('fake document', () => {
  it('create document', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const newDoc: INewDocument<{ test: number }> = {
      $kind: 'kind',
      $id: 'newDocument',
      $content: {
        test: 42,
      },
      $owners: ['group1', 'group2', 'group1'],
    };
    const document = await roc.create(newDoc);
    expect(document.getValue().$content).toStrictEqual({ test: 42 });
    expect(document.getValue().$owners).toStrictEqual([
      'test@test.com',
      'group1',
      'group2',
    ]);
    expect(document.getValue().$kind).toBe('kind');
    expect(document.getValue()._id).toBeDefined();
    expect(document.getValue()._rev.substr(0, 1)).toBe('1');
  });

  it('get document', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const document = roc.getDocument('uuid1');
    const doc = await document.fetch(); // Fetch latest revision if it's out of sync
    expect(doc).toStrictEqual(data.documents.uuid1.revisions[0]);
    //   await document.forceFetch(); // Fetch latest revision even if revision is up to date
    const val = document.getValue(); // document json
    expect(val).toStrictEqual(data.documents.uuid1.revisions[0]);
  });

  it('document update content', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const document = roc.getDocument('uuid1');
    const newDocument = await document.update({
      test: 43,
    });
    expect(newDocument._rev.substr(0, 1)).toBe('2');
  });

  it('document toJSON', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const doc = roc.getDocument('uuid1');
    const val = JSON.parse(JSON.stringify(await doc.fetch()));
    expect(val).toStrictEqual(data.documents.uuid1.revisions[0]);
  });

  it('get rights', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const doc = roc.getDocument('uuid1');
    expect(await doc.hasRight('read')).toBe(true);
    expect(await doc.hasRight('write')).toBe(false);
    expect(await doc.hasRight('any')).toBe(false);
  });
});
