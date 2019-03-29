import { FakeRoc } from '../..';
import { getTestData } from '../fixtures/data';

it('fake roc get user', async () => {
  const data = getTestData();
  const roc = new FakeRoc(data);
  const user = await roc.getUser();
  expect(user).toEqual({
    username: 'test@test.com',
    provider: 'test',
    authenticated: true,
    admin: false
  });
});
