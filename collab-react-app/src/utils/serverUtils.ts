export async function parseTextResponse(response: Response): Promise<string> {
  if (response.body) {
    const reader = response.body.getReader();
    const result = await reader.read();
    return new TextDecoder('utf-8').decode(result.value)
  }
  return '';
}
