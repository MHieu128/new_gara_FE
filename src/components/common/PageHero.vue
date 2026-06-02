<script setup lang="ts">
import Container from './Container.vue';

defineProps<{
  eyebrow?: string;
  title: string;
  description?: string;
}>();
</script>

<template>
  <section class="media-fallback bg-midnight py-16 text-white sm:py-20">
    <Container>
      <p v-if="eyebrow" class="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-200">
        {{ eyebrow }}
      </p>
      <h1 class="max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
        {{ title }}
      </h1>
      <p v-if="description" class="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
        {{ description }}
      </p>
    </Container>
  </section>
</template>
