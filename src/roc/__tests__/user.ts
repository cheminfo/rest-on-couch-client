import { testRoc } from '../../testUtils';

test('get user session', async () => {
  const user = await testRoc.getUser();
  // Auth session does not exist when authenticated with token
  expect(user).toMatchObject({
    authenticated: false,
    admin: false,
    username: 'anonymous',
  });
});
