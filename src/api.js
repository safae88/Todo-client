/**
 * Backend base URL (Railway). Override locally with REACT_APP_API_URL in .env
 * e.g. REACT_APP_API_URL=http://localhost:5000
 */
const RAILWAY_BASE =
  "https://selfless-nourishment-production-9209.up.railway.app";

export const API_BASE_URL = (
  process.env.REACT_APP_API_URL || RAILWAY_BASE
).replace(/\/$/, "");

/** Build a full URL for an API path (path should start with /api/...). */
export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${p}`;
}
