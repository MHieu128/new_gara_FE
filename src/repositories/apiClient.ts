const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
const authTokenKey = 'garage_admin_token';

export interface PagedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export function getAuthToken(): string | null {
  return localStorage.getItem(authTokenKey);
}

export function setAuthToken(token: string | null): void {
  if (token) {
    localStorage.setItem(authTokenKey, token);
    return;
  }

  localStorage.removeItem(authTokenKey);
}

export async function getJson<T>(path: string, query: Record<string, string | number | boolean | undefined> = {}): Promise<T> {
  return requestJson<T>(path, { method: 'GET', query });
}

export async function postJson<T>(path: string, body?: unknown): Promise<T> {
  return requestJson<T>(path, { method: 'POST', body });
}

export async function putJson<T>(path: string, body?: unknown): Promise<T> {
  return requestJson<T>(path, { method: 'PUT', body });
}

export async function patchJson<T>(path: string, body?: unknown): Promise<T> {
  return requestJson<T>(path, { method: 'PATCH', body });
}

export async function deleteJson<T = void>(path: string): Promise<T> {
  return requestJson<T>(path, { method: 'DELETE' });
}

async function requestJson<T>(
  path: string,
  options: {
    method: string;
    query?: Record<string, string | number | boolean | undefined>;
    body?: unknown;
  },
): Promise<T> {
  const url = new URL(path, API_BASE_URL);

  Object.entries(options.query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  const headers = new Headers();
  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    method: options.method,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
