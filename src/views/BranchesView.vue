<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import BranchCard from '@/components/branch/BranchCard.vue';
import Container from '@/components/common/Container.vue';
import PageHero from '@/components/common/PageHero.vue';
import type { Branch } from '@/domain/branch';
import { getBranches } from '@/repositories/branchRepository';

const branches = ref<Branch[]>([]);
const province = ref('');
const provinces = computed(() => [...new Set(branches.value.map((branch) => branch.province))]);
const visibleBranches = computed(() =>
  province.value ? branches.value.filter((branch) => branch.province === province.value) : branches.value,
);

onMounted(async () => {
  branches.value = await getBranches();
});
</script>

<template>
  <PageHero
    eyebrow="Locations"
    title="Hệ thống chi nhánh"
    description="Thông tin liên hệ Shinwa Pro Garage Đà Nẵng, mở cửa 07:30 - 18:00 từ Thứ 2 đến Chủ nhật."
  />
  <section class="py-12">
    <Container>
      <div class="mb-8 max-w-xs">
        <label class="mb-2 block text-sm font-bold text-ink" for="province">Tỉnh / thành</label>
        <select id="province" v-model="province" class="min-h-12 w-full rounded-md border border-slate-300 px-4">
          <option value="">Tất cả</option>
          <option v-for="item in provinces" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="grid gap-6 md:grid-cols-2">
        <BranchCard v-for="branch in visibleBranches" :key="branch.id" :branch="branch" />
      </div>
    </Container>
  </section>
</template>
