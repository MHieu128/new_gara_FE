<script setup lang="ts">
defineProps<{
  open: boolean;
  links: Array<{ label: string; to: string }>;
}>();

defineEmits<{
  close: [];
}>();
</script>

<template>
  <div v-if="open" class="border-t border-slate-200 bg-white lg:hidden">
    <nav class="space-y-1 px-4 py-4" aria-label="Điều hướng di động">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block rounded-md px-3 py-3 text-base font-semibold text-ink hover:bg-slate-100"
        @click="$emit('close')"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </div>
</template>
