import axios from 'axios';

import { Roc } from '.';

const userToken = 'DanRufB1VWQPmUFa3FGpdxXwL0IQafk2';

const couchdbAxios = axios.create({
  auth: {
    username: 'rest-on-couch',
    password: 'admin',
  },
  baseURL: 'http://localhost:5984/',
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
    rights: ['read', 'write', 'create', 'delete'],
  });
}

export const testRoc = new Roc({
  accessToken: userToken,
  database: 'test',
  url: 'http://localhost:3000',
});
