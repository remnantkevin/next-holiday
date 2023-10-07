export async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url);
  const responseJson: unknown = await response.json();
  return responseJson;
}
