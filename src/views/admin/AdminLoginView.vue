<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminAuth } from '@/composables/useAdminAuth';
import { login } from '@/repositories/authRepository';

const router = useRouter();
const { setUser } = useAdminAuth();
const email = ref('admin@garage.local');
const password = ref('Admin@123456');
const isLoading = ref(false);
const error = ref('');

async function submit() {
  error.value = '';
  isLoading.value = true;
  try {
    const response = await login(email.value, password.value);
    setUser(response.user);
    router.push('/admin');
  } catch {
    error.value = 'Email hoặc mật khẩu không đúng.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 px-4">
    <form class="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-premium" @submit.prevent="submit">
      <p class="text-sm font-bold uppercase tracking-wide text-shinwa">Garage Admin</p>
      <h1 class="mt-2 text-2xl font-black text-ink">Đăng nhập quản trị</h1>

      <label class="mt-6 block text-sm font-bold text-slate-700" for="admin-email">Email</label>
      <input
        id="admin-email"
        v-model="email"
        autocomplete="email"
        class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-shinwa"
        type="email"
        required
      />

      <label class="mt-4 block text-sm font-bold text-slate-700" for="admin-password">Mật khẩu</label>
      <input
        id="admin-password"
        v-model="password"
        autocomplete="current-password"
        class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-shinwa"
        type="password"
        required
      />

      <p v-if="error" class="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{{ error }}</p>

      <button class="mt-6 w-full rounded-md bg-shinwa px-4 py-3 text-sm font-black text-white hover:bg-blue-700 disabled:opacity-60" :disabled="isLoading">
        {{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
      </button>
    </form>
  </div>
</template>
