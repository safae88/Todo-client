/**
 * Base URL for the backend. Set REACT_APP_API_URL in .env (e.g. your Railway URL on Vercel).
 * Falls back to local dev server when unset.
 */
export const API_URL = (
  process.env.REACT_APP_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

/** Build a full URL for an API path (e.g. "/api/auth/login"). */
export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${p}`;
}
