<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { SiteSettings } from '@/domain/common';
import { getSiteSettings } from '@/repositories/siteRepository';

const settings = ref<SiteSettings | null>(null);

onMounted(async () => {
  settings.value = await getSiteSettings();
});
</script>

<template>
  <div class="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 md:bottom-6">
    <div class="flex items-center justify-between gap-2 rounded-full border border-white/30 bg-midnight/92 p-2 text-white shadow-premium backdrop-blur">
      <a
        :href="`tel:${settings?.hotline ?? '0379147896'}`"
        class="flex min-h-11 flex-1 items-center justify-center rounded-full bg-shinwa px-4 text-sm font-black hover:bg-blue-700"
      >
        Hotline 24/7
      </a>
      <a
        :href="settings?.zaloUrl ?? 'https://zalo.me/0379147896'"
        class="flex min-h-11 flex-1 items-center justify-center rounded-full bg-white px-4 text-sm font-black text-ink hover:text-shinwa"
      >
        Zalo
      </a>
      <RouterLink
        to="/lien-he"
        class="hidden min-h-11 flex-1 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-black hover:bg-white/10 sm:flex"
      >
        Đặt lịch
      </RouterLink>
    </div>
  </div>
</template>
