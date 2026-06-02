<script setup lang="ts">
defineProps<{
  items: Array<{ label: string; to?: string }>;
}>();
</script>

<template>
  <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
    <ol class="flex flex-wrap items-center gap-2">
      <li>
        <RouterLink to="/" class="hover:text-ember">Trang chủ</RouterLink>
      </li>
      <li v-for="item in items" :key="item.label" class="flex items-center gap-2">
        <span>/</span>
        <RouterLink v-if="item.to" :to="item.to" class="hover:text-ember">{{ item.label }}</RouterLink>
        <span v-else class="font-medium text-ink">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>
