import { IFakeRocData } from '..';

import sampleToc from './sampleToc';

export function getTestData(): IFakeRocData {
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
          _attachments: {
            attachment1: {
              digest: 'digest',
              content_type: 'text/plain',
              revpos: 1,
              length: 4,
              stub: true
            }
          }
        }
      ]
    },
    attachments: {
      uuid1: {
        attachment1: 'dGVzdA=='
      }
    },
    query: {
      documentByOwner: sampleToc
    }
  };
}
