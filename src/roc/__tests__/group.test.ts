import { beforeAll, describe, expect, it } from 'vitest';

import { resetTestDatabase, testRoc } from '../../testUtils.ts';
import type { RocOkResponse } from '../../types.ts';
import { groupRights } from '../../util/constants.ts';

const ok: RocOkResponse = { ok: true };

beforeAll(async () => {
  await resetTestDatabase();
});

describe('create and update groups', () => {
  it('create group', async () => {
    const groupName = crypto.randomUUID();
    const group = await testRoc.createGroup(groupName);

    expect(group).toStrictEqual(ok);
  });

  it('add user to group', async () => {
    const groupName = crypto.randomUUID();
    await testRoc.createGroup(groupName);
    const data = await testRoc.addUserToGroup(groupName, 'john@doe.com');

    expect(data).toStrictEqual(ok);

    const group = await testRoc.getGroup(groupName);

    expect(group.users).toStrictEqual(['john@doe.com']);
  });

  it('removes user from group', async () => {
    const groupName = crypto.randomUUID();
    await testRoc.createGroup(groupName);
    await testRoc.addUserToGroup(groupName, 'john@doe.com');
    const data = await testRoc.removeUserFromGroup(groupName, 'john@doe.com');

    expect(data).toStrictEqual(ok);

    const group = await testRoc.getGroup(groupName);

    expect(group.users).toStrictEqual([]);
  });

  it('add permission to group', async () => {
    const groupName = crypto.randomUUID();
    await testRoc.createGroup(groupName);
    const data = await testRoc.addRightToGroup(groupName, 'read');

    expect(data).toStrictEqual(ok);

    const group = await testRoc.getGroup(groupName);

    expect(group.rights).toStrictEqual(['read']);
  });

  it('adds permission to group', async () => {
    const groupName = crypto.randomUUID();
    await testRoc.createGroup(groupName);
    for (const permission of groupRights) {
      // rest-on-couch does not support concurrent requests without the possibility of conflicts.
      // eslint-disable-next-line no-await-in-loop
      await testRoc.addRightToGroup(groupName, permission);
    }
    const group = await testRoc.getGroup(groupName);

    expect(group.rights.toSorted()).toStrictEqual(groupRights);
  });

  it('remove permissions from group', async () => {
    const groupName = crypto.randomUUID();
    await testRoc.createGroup(groupName);
    await testRoc.addRightToGroup(groupName, 'read');
    const data = await testRoc.removeRightFromGroup(groupName, 'read');

    expect(data).toStrictEqual(ok);

    const group = await testRoc.getGroup(groupName);

    expect(group.rights).toStrictEqual([]);
  });
});

describe('get groups', () => {
  it('get group', async () => {
    const groupName = crypto.randomUUID();
    await testRoc.createGroup(groupName);
    const group = await testRoc.getGroup(groupName);

    expect(group).toMatchObject({
      $owners: ['admin@cheminfo.org'],
      $type: 'group',
      customUsers: [],
      name: groupName,
      rights: [],
      users: [],
    });
  });

  it('get group info', async () => {
    const groupName = crypto.randomUUID();
    await testRoc.createGroup(groupName);
    const groupInfo = await testRoc.getGroupInfo(groupName);

    expect(groupInfo).toMatchObject({
      name: groupName,
      rights: [],
      users: [],
    });
  });

  it('get group info with ldap info', async () => {
    const groupName = crypto.randomUUID();
    await testRoc.createGroup(groupName);
    const groupInfo = await testRoc.getGroupInfo(groupName, {
      ldapInfo: true,
    });

    expect(groupInfo).toMatchObject({
      name: groupName,
      rights: [],
      users: [],
      ldapInfo: [],
    });
  });

  it('get groups info', async () => {
    const groupName = crypto.randomUUID();
    await testRoc.createGroup(groupName);
    const groupsInfo = await testRoc.getGroupsInfo();
    const group = groupsInfo.find((g) => g.name === groupName);

    expect(group).toStrictEqual({
      name: groupName,
      rights: [],
      users: [],
    });
  });

  it('get groups info with ldap info', async () => {
    const groupName = crypto.randomUUID();
    await testRoc.createGroup(groupName);
    const groupsInfo = await testRoc.getGroupsInfo({ ldapInfo: true });
    const group = groupsInfo.find((g) => g.name === groupName);

    expect(group).toStrictEqual({
      ldapInfo: [],
      name: groupName,
      rights: [],
      users: [],
    });
  });
});
