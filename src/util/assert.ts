export function assert(
  value: unknown,
  message = 'Expected value to be defined',
): asserts value {
  if (!value) throw new Error(message);
}
