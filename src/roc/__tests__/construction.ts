import { Roc } from '../index';

global.window = {
  // @ts-expect-error Monkey-patching for tests.
  location: {
    origin: 'https://www.rocserver.com',
  },
};

test('construct urls', () => {
  const roc = new Roc({
    url: 'https://example.com/roc',
    database: 'exampledb',
  });
  // @ts-expect-error Private property.
  expect(roc.url).toBe('https://example.com/roc/');
  // @ts-expect-error Private property.
  expect(roc.dbUrl).toBe('https://example.com/roc/db/exampledb/');
});

test('construct urls when no domain is provided', () => {
  const roc = new Roc({
    url: '/roc',
    database: 'exampledb',
  });
  // @ts-expect-error Private property.
  expect(roc.url).toBe('https://www.rocserver.com/roc/');
  // @ts-expect-error Private property.
  expect(roc.dbUrl).toBe('https://www.rocserver.com/roc/db/exampledb/');
});
