import { expect, test } from 'vitest';

import { encodeAttachmentName } from '../utils.ts';

test('leaves a plain name unchanged', () => {
  expect(encodeAttachmentName('test.txt')).toBe('test.txt');
});

test('encodes a literal + as %2B', () => {
  expect(encodeAttachmentName('MJR_RuPt_RuPt1+hv(long).1.28a2b17f.jdx')).toBe(
    'MJR_RuPt_RuPt1%2Bhv(long).1.28a2b17f.jdx',
  );
});

test('encodes spaces as %20', () => {
  expect(encodeAttachmentName('with space.jdx')).toBe('with%20space.jdx');
});

test('preserves / separators while encoding each segment', () => {
  expect(encodeAttachmentName('nested/dir/a+b.txt')).toBe(
    'nested/dir/a%2Bb.txt',
  );
});
