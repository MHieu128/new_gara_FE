<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Container from '@/components/common/Container.vue';
import { getSiteSettings } from '@/repositories/siteRepository';
import type { SiteSettings } from '@/domain/common';

const settings = ref<SiteSettings | null>(null);

onMounted(async () => {
  settings.value = await getSiteSettings();
});
</script>

<template>
  <footer class="bg-ink py-12 text-white">
    <Container>
      <div class="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div class="flex items-center gap-3">
            <img src="/favicon.svg" alt="Shinwa Pro Garage" class="h-11 w-11 rounded-md bg-white" />
            <p class="text-xl font-black">{{ settings?.siteName ?? 'Shinwa Pro Garage' }}</p>
          </div>
          <p class="mt-3 max-w-md leading-7 text-slate-300">
            {{ settings?.tagline ?? 'Nâng cấp, chăm sóc và quản lý dịch vụ ô tô chuyên nghiệp' }}
          </p>
        </div>
        <div>
          <p class="font-bold">Điều hướng</p>
          <div class="mt-4 grid gap-2 text-sm text-slate-300">
            <RouterLink to="/san-pham" class="hover:text-white">Sản phẩm</RouterLink>
            <RouterLink to="/dich-vu" class="hover:text-white">Dịch vụ</RouterLink>
            <RouterLink to="/chi-nhanh" class="hover:text-white">Chi nhánh</RouterLink>
            <RouterLink to="/tin-tuc" class="hover:text-white">Tin tức</RouterLink>
          </div>
        </div>
        <div>
          <p class="font-bold">Liên hệ</p>
          <div class="mt-4 grid gap-2 text-sm text-slate-300">
            <a
              v-for="phone in settings?.hotlines ?? [settings?.hotline ?? '0379147896']"
              :key="phone"
              :href="`tel:${phone}`"
            >
              {{ phone }}
            </a>
            <a :href="`mailto:${settings?.email ?? 'shinwapro.dn@gmail.com'}`">{{ settings?.email ?? 'shinwapro.dn@gmail.com' }}</a>
            <span>{{ settings?.address ?? 'Đối diện công viên Phạm Đức Nam, Ngũ Hành Sơn, Đà Nẵng' }}</span>
          </div>
        </div>
      </div>
      <div class="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">
        © 2026 Shinwa Pro Garage. Static public website.
      </div>
    </Container>
  </footer>
</template>
