<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAdminAuth } from '@/composables/useAdminAuth';

const router = useRouter();
const { currentUser, logout } = useAdminAuth();

const navItems = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Products', to: '/admin/products' },
  { label: 'Services', to: '/admin/services' },
  { label: 'Branches', to: '/admin/branches' },
  { label: 'Articles', to: '/admin/articles' },
  { label: 'Leads', to: '/admin/leads' },
  { label: 'Users', to: '/admin/users' },
];

function handleLogout() {
  logout();
  router.push('/admin/login');
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 pb-0">
    <aside class="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white lg:block">
      <div class="border-b border-slate-200 px-6 py-5">
        <p class="text-xs font-bold uppercase tracking-wide text-slate-500">Garage Admin</p>
        <p class="mt-1 text-lg font-black text-ink">Shinwa Pro</p>
      </div>
      <nav class="grid gap-1 p-3">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-shinwa"
          active-class="bg-shinwa text-white hover:bg-shinwa hover:text-white"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <div class="lg:pl-64">
      <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-sm font-black text-ink">{{ currentUser?.fullName }}</p>
            <p class="text-xs font-semibold text-slate-500">{{ currentUser?.email }} · {{ currentUser?.role }}</p>
          </div>
          <nav class="flex gap-2 overflow-x-auto lg:hidden">
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="whitespace-nowrap rounded-md px-3 py-2 text-xs font-bold text-slate-600"
              active-class="bg-shinwa text-white"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
          <button class="rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50" @click="handleLogout">
            Đăng xuất
          </button>
        </div>
      </header>
      <section class="px-4 py-6 sm:px-6">
        <RouterView />
      </section>
    </div>
  </div>
</template>
