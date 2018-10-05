import { getTestData } from '../fixtures/data';
import { FakeRoc } from '../Roc';

describe('fake groups', () => {
  it('add group', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const doc = await roc.getDocument('uuid1');
    const groups = await doc.addGroups('group1');
    expect(groups).toEqual(['test@test.com', 'group1']);
    expect(doc.getValue().$owner).toEqual(['test@test.com', 'group1']);
  });

  it('add groups', async () => {
    const data = getTestData();
    const roc = new FakeRoc(data);
    const doc = await roc.getDocument('uuid1');
    const groups = await doc.addGroups(['group1', 'group2', 'group1']);
    expect(groups).toEqual(['test@test.com', 'group1', 'group2']);
    expect(doc.getValue().$owner).toEqual([
      'test@test.com',
      'group1',
      'group2'
    ]);
  });
});
