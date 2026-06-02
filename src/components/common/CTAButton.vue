<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string;
    href?: string;
    variant?: 'primary' | 'secondary' | 'ghost';
  }>(),
  {
    variant: 'primary',
  },
);

const baseClasses =
  'inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2';
const variants = {
  primary: 'bg-shinwa text-white shadow-lg shadow-blue-900/20 hover:bg-blue-700',
  secondary: 'bg-ember text-ink shadow-lg shadow-orange-900/20 hover:bg-orange-400',
  ghost: 'border border-slate-300 bg-white text-ink hover:border-shinwa hover:text-shinwa',
};
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="[baseClasses, variants[variant]]">
    <slot />
  </RouterLink>
  <a v-else-if="href" :href="href" :class="[baseClasses, variants[variant]]">
    <slot />
  </a>
  <button v-else :class="[baseClasses, variants[variant]]">
    <slot />
  </button>
</template>
