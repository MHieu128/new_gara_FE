<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CTAButton from '@/components/common/CTAButton.vue';
import MobileNavigation from './MobileNavigation.vue';
import { getSiteSettings } from '@/repositories/siteRepository';
import type { SiteSettings } from '@/domain/common';

const mobileOpen = ref(false);
const settings = ref<SiteSettings | null>(null);

const links = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Sản phẩm', to: '/san-pham' },
  { label: 'Dịch vụ', to: '/dich-vu' },
  { label: 'Chi nhánh', to: '/chi-nhanh' },
  { label: 'Tin tức', to: '/tin-tuc' },
  { label: 'Liên hệ', to: '/lien-he' },
];

onMounted(async () => {
  settings.value = await getSiteSettings();
});
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex min-w-0 items-center gap-3">
        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-shinwa shadow-lg shadow-blue-900/20">
          <img src="/favicon.svg" alt="Shinwa Pro Garage" class="h-9 w-9" />
        </span>
        <span class="min-w-0">
          <span class="block max-w-[190px] truncate text-base font-black leading-tight text-ink sm:max-w-[260px]">
            {{ settings?.siteName ?? 'Shinwa Pro Garage' }}
          </span>
          <span class="hidden text-xs font-medium text-steel sm:block">Garage kỹ thuật Đà Nẵng</span>
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-md px-3 py-2 text-sm font-semibold text-graphite hover:bg-blue-50 hover:text-shinwa"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="hidden items-center gap-3 xl:flex">
        <a :href="`tel:${settings?.hotline ?? '0379147896'}`" class="text-sm font-bold text-ink">
          {{ settings?.hotline ?? '0379147896' }}
        </a>
        <CTAButton to="/lien-he">Tư vấn ngay</CTAButton>
      </div>

      <button
        class="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 lg:hidden"
        type="button"
        :aria-expanded="mobileOpen"
        aria-label="Mở menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="sr-only">Menu</span>
        <span class="flex flex-col gap-1.5">
          <span class="block h-0.5 w-5 bg-ink"></span>
          <span class="block h-0.5 w-5 bg-ink"></span>
          <span class="block h-0.5 w-5 bg-ink"></span>
        </span>
      </button>
    </div>
    <MobileNavigation :open="mobileOpen" :links="links" @close="mobileOpen = false" />
  </header>
</template>
