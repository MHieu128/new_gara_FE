import { getJson, postJson, setAuthToken } from '@/repositories/apiClient';

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  branchId?: string | null;
}

export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
  user: AdminUser;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await postJson<LoginResponse>('/api/auth/login', { email, password });
  setAuthToken(response.accessToken);
  localStorage.setItem('garage_admin_user', JSON.stringify(response.user));
  localStorage.setItem('garage_admin_expires_at', response.expiresAt);
  return response;
}

export async function getMe(): Promise<AdminUser> {
  return getJson<AdminUser>('/api/auth/me');
}

export function logout(): void {
  setAuthToken(null);
  localStorage.removeItem('garage_admin_user');
  localStorage.removeItem('garage_admin_expires_at');
}

export function getStoredUser(): AdminUser | null {
  const raw = localStorage.getItem('garage_admin_user');
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}
