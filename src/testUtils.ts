import axios from 'axios';

import { INewEntryDocument, Roc } from '.';

const userToken = 'DanRufB1VWQPmUFa3FGpdxXwL0IQafk2';

const couchdbAxios = axios.create({
  auth: {
    username: 'rest-on-couch',
    password: 'admin',
  },
  baseURL: 'http://127.0.0.1:5984/',
});

export async function resetTestDatabase() {
  const allDocuments = await couchdbAxios.get('/test/_all_docs');
  for (let doc of allDocuments.data.rows) {
    if (
      !doc.id.startsWith('_design/') &&
      doc.id !== 'defaultGroups' &&
      doc.id !== 'rights'
    ) {
      await couchdbAxios.delete(`/test/${doc.id}`, {
        params: {
          rev: doc.value.rev,
        },
      });
    }
  }

  await couchdbAxios.post('/test', {
    $type: 'token',
    $kind: 'user',
    $id: userToken,
    $owner: 'admin@cheminfo.org',
    $creationDate: 1634817005933,
    rights: [
      'read',
      'write',
      'owner',
      'create',
      'delete',
      'addAttachment',
      'createGroup',
      'readGroup',
    ],
  });
}

export const testRoc = new Roc({
  accessToken: userToken,
  database: 'test',
  url: 'http://localhost:4000',
});

type TestNewDoc = INewEntryDocument<{ hello: 'world' }, string>;

export function getNewEntry(id: string, groups?: string[]) {
  return {
    $id: id,
    $kind: 'entry',
    $content: { hello: 'world' },
    $owners: groups ?? [],
  } as TestNewDoc;
}

export function getNewDocument(kind: string, id: string) {
  return {
    $id: id,
    $kind: kind,
    $content: { hello: 'world' },
    $owners: [],
  } as TestNewDoc;
}
