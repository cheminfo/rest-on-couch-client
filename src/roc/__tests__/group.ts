import { resetTestDatabase, testRoc } from '../../testUtils';

beforeAll(async () => {
  await resetTestDatabase();
});

test('create group', async () => {
  const group = await testRoc.createGroup('group1');
  expect(group).toStrictEqual({ ok: true });
});

test('get group', async () => {
  const group = await testRoc.getGroup('group1');
  expect(group).toMatchObject({
    $owners: ['admin@cheminfo.org'],
    $type: 'group',
    customUsers: [],
    name: 'group1',
    rights: [],
    users: [],
  });
});

test('get group info', async () => {
  const groupInfo = await testRoc.getGroupInfo('group1');
  expect(groupInfo).toMatchObject({
    name: 'group1',
    rights: [],
    users: [],
  });
});

test('get group info with ldap info', async () => {
  const groupInfo = await testRoc.getGroupInfo('group1', {
    ldapInfo: true,
  });
  expect(groupInfo).toMatchObject({
    name: 'group1',
    rights: [],
    users: [],
    ldapInfo: [],
  });
});

test('get groups info', async () => {
  await testRoc.createGroup('group2');
  const groupsInfo = await testRoc.getGroupsInfo();
  expect(groupsInfo).toMatchInlineSnapshot(`
    Array [
      Object {
        "name": "group1",
        "rights": Array [],
        "users": Array [],
      },
      Object {
        "name": "group2",
        "rights": Array [],
        "users": Array [],
      },
    ]
  `);
});

test('get groups info with ldap info', async () => {
  const groupsInfo = await testRoc.getGroupsInfo({ ldapInfo: true });
  expect(groupsInfo).toMatchInlineSnapshot(`
    Array [
      Object {
        "ldapInfo": Array [],
        "name": "group1",
        "rights": Array [],
        "users": Array [],
      },
      Object {
        "ldapInfo": Array [],
        "name": "group2",
        "rights": Array [],
        "users": Array [],
      },
    ]
  `);
});
