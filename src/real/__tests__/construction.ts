import { Roc } from '../index';

global.window = {
  // @ts-expect-error
  location: {
    origin: 'https://www.rocserver.com',
  },
};

test('construct urls', () => {
  const roc = new Roc({
    url: 'https://example.com/roc',
    database: 'exampledb',
  });
  // @ts-expect-error
  expect(roc.url).toStrictEqual('https://example.com/roc/');
  // @ts-expect-error
  expect(roc.dbUrl).toStrictEqual('https://example.com/roc/db/exampledb/');
});

test('construct urls when no domain is provided', () => {
  const roc = new Roc({
    url: '/roc',
    database: 'exampledb',
  });
  // @ts-expect-error
  expect(roc.url).toStrictEqual('https://www.rocserver.com/roc/');
  // @ts-expect-error
  expect(roc.dbUrl).toStrictEqual(
    'https://www.rocserver.com/roc/db/exampledb/',
  );
});
