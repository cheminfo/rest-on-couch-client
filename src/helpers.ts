// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getRocClientError(e: any) {
  if (e.response?.data) {
    return e.response.data;
  }
  return null;
}
