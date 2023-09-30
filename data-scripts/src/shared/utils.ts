export function sortKeyComparator(a: { sortKey: string }, b: { sortKey: string }): 1 | -1 {
  return a.sortKey > b.sortKey ? 1 : -1;
}

export async function fetchJSON(url: string): Promise<unknown> {
  const response = await fetch(url);
  const responseJSON: unknown = await response.json();
  return responseJSON;
}
