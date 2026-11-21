import type { APIRoute } from 'astro';
import { stayManifestResponse } from '../server/stay-manifest.mjs';
export const prerender = false;
export const GET: APIRoute = ({ url }) => stayManifestResponse(url);
