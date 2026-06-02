<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BranchCard from '@/components/branch/BranchCard.vue';
import Container from '@/components/common/Container.vue';
import CTAButton from '@/components/common/CTAButton.vue';
import PageHero from '@/components/common/PageHero.vue';
import type { Branch } from '@/domain/branch';
import type { SiteSettings } from '@/domain/common';
import { getBranches } from '@/repositories/branchRepository';
import { getSiteSettings } from '@/repositories/siteRepository';

const settings = ref<SiteSettings | null>(null);
const branches = ref<Branch[]>([]);

onMounted(async () => {
  const [site, branchItems] = await Promise.all([getSiteSettings(), getBranches()]);
  settings.value = site;
  branches.value = branchItems;
});
</script>

<template>
  <PageHero
    eyebrow="Contact"
    title="Liên hệ tư vấn"
    description="Gọi hotline, nhắn Zalo/Messenger hoặc liên hệ chi nhánh Shinwa Pro Garage Đà Nẵng."
  />
  <section class="py-12">
    <Container>
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <h2 class="text-2xl font-black text-ink">Kênh liên hệ</h2>
          <div class="mt-6 grid gap-4">
            <CTAButton
              v-for="phone in settings?.hotlines ?? [settings?.hotline ?? '0379147896']"
              :key="phone"
              :href="`tel:${phone}`"
            >
              Gọi {{ phone }}
            </CTAButton>
            <CTAButton :href="settings?.zaloUrl ?? 'https://zalo.me/0379147896'" variant="secondary">Nhắn Zalo</CTAButton>
            <CTAButton :href="settings?.messengerUrl ?? 'https://m.me/example'" variant="ghost">Messenger</CTAButton>
            <a :href="`mailto:${settings?.email ?? 'shinwapro.dn@gmail.com'}`" class="break-words font-bold text-ember">
              {{ settings?.email ?? 'shinwapro.dn@gmail.com' }}
            </a>
            <p class="leading-7 text-steel">{{ settings?.address ?? 'Đối diện công viên Phạm Đức Nam, Ngũ Hành Sơn, Đà Nẵng' }}</p>
          </div>
        </div>
        <div>
          <h2 class="mb-6 text-2xl font-black text-ink">Chi nhánh hỗ trợ</h2>
          <div class="grid gap-6">
            <BranchCard v-for="branch in branches" :key="branch.id" :branch="branch" />
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
