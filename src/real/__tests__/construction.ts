import { Roc } from '../index';

// @ts-ignore
global.window = {
  location: {
    origin: 'https://www.rocserver.com'
  }
};

test('construct urls', () => {
  const roc = new Roc({
    url: 'https://example.com/roc',
    database: 'exampledb'
  });
  // @ts-ignore
  expect(roc.url).toEqual('https://example.com/roc/');
  // @ts-ignore
  expect(roc.dbUrl).toEqual('https://example.com/roc/db/exampledb');
});

test('construct urls when no domain is provided', () => {
  const roc = new Roc({
    url: '/roc',
    database: 'exampledb'
  });
  // @ts-ignore
  expect(roc.url).toEqual('https://www.rocserver.com/roc/');
  // @ts-ignore
  expect(roc.dbUrl).toEqual('https://www.rocserver.com/roc/db/exampledb');
});
