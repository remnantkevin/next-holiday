export async function getJson(url: string | URL): Promise<[unknown, Response]> {
  const response = await fetch(url);
  const responseJson: unknown = await response.json();
  return [responseJson, response];
}
