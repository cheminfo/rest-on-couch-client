import { IRocData } from '../Roc';

export function getTestData(): IRocData {
  return {
    uuid1: [
      {
        _id: 'uuid1',
        _rev: '1-db302401f0df79e06b79f10f79c1f0f9',
        $content: {},
        $modificationDate: 0,
        $creationDate: 0,
        $kind: 'kind',
        $owner: ['test@test.com']
      }
    ]
  };
}
