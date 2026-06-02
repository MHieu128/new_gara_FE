import { computed, ref } from 'vue';
import { getAuthToken } from '@/repositories/apiClient';
import { getStoredUser, logout as clearSession, type AdminUser } from '@/repositories/authRepository';

const currentUser = ref<AdminUser | null>(getStoredUser());

export function useAdminAuth() {
  const isAuthenticated = computed(() => Boolean(getAuthToken() && currentUser.value));

  function setUser(user: AdminUser | null) {
    currentUser.value = user;
  }

  function logout() {
    clearSession();
    currentUser.value = null;
  }

  return {
    currentUser,
    isAuthenticated,
    setUser,
    logout,
  };
}
