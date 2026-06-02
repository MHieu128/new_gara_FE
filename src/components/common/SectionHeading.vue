<script setup lang="ts">
defineProps<{
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  inverse?: boolean;
}>();
</script>

<template>
  <div :class="['mb-8 max-w-3xl', align === 'center' ? 'mx-auto text-center' : '']">
    <p v-if="eyebrow" class="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-shinwa">
      {{ eyebrow }}
    </p>
    <h2 :class="['text-3xl font-black leading-tight sm:text-4xl', inverse ? 'text-white' : 'text-ink']">
      {{ title }}
    </h2>
    <p v-if="description" :class="['mt-4 text-base leading-7', inverse ? 'text-slate-300' : 'text-steel']">
      {{ description }}
    </p>
  </div>
</template>
