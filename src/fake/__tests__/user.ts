import { getTestData } from '../fixtures/data';
import { FakeRoc } from '../Roc';

it('fake roc get user', async () => {
  const data = getTestData();
  const roc = new FakeRoc(data);
  const user = await roc.getUser();
  expect(user).toEqual('test@test.com');
});
