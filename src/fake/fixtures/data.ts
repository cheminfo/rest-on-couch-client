import { IRocData } from '../Roc';

import sampleToc from './sampleToc';

export function getTestData(): IRocData {
  return {
    documents: {
      uuid1: [
        {
          _id: 'uuid1',
          _rev: '1-db302401f0df79e06b79f10f79c1f0f9',
          $id: 'uuid1',
          $type: 'entry',
          $content: {},
          $modificationDate: 0,
          $creationDate: 0,
          $lastModification: 'test@test.com',
          $kind: 'kind',
          $owners: ['test@test.com'],
          _attachments: {}
        }
      ]
    },
    query: {
      documentByOwner: sampleToc
    }
  };
}
