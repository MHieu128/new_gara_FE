<script setup lang="ts">
import type { Branch } from '@/domain/branch';

defineProps<{
  branch: Branch;
}>();
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3 class="text-xl font-black text-ink">{{ branch.name }}</h3>
        <p class="mt-1 text-sm font-semibold text-ember">{{ branch.province }}<span v-if="branch.district">, {{ branch.district }}</span></p>
      </div>
      <span class="rounded-md bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Đang hoạt động</span>
    </div>
    <div class="mt-5 grid gap-3 text-sm leading-6 text-steel">
      <p>{{ branch.address }}</p>
      <p v-if="branch.openingHours">Giờ mở cửa: {{ branch.openingHours }}</p>
      <a v-for="phone in branch.phoneNumbers" :key="phone" :href="`tel:${phone}`" class="font-bold text-ink hover:text-ember">
        {{ phone }}
      </a>
      <a v-if="branch.googleMapUrl" :href="branch.googleMapUrl" class="font-bold text-ember" target="_blank" rel="noreferrer">
        Xem bản đồ
      </a>
    </div>
  </article>
</template>
