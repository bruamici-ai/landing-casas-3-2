import { stayManifestResponse } from '../src/server/stay-manifest.mjs';

export default async function handler(request, response) {
  const result = stayManifestResponse(new URL(request.url, 'https://experiencias-mendoza.vercel.app'));
  if (!['GET', 'HEAD'].includes(request.method)) {
    result.headers.set('Allow', 'GET, HEAD');
    response.statusCode = 405;
  } else response.statusCode = result.status;
  for (const [name, value] of result.headers) response.setHeader(name, value);
  response.end(request.method === 'HEAD' || response.statusCode === 405 ? '' : await result.text());
}
