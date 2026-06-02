<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import FloatingContactBar from '@/components/layout/FloatingContactBar.vue';

const route = useRoute();
const isAdminRoute = computed(() => Boolean(route.meta.admin));
</script>

<template>
  <div class="min-h-screen bg-slate-50 pb-24 text-ink sm:pb-28">
    <AppHeader v-if="!isAdminRoute" />
    <main>
      <RouterView />
    </main>
    <AppFooter v-if="!isAdminRoute" />
    <FloatingContactBar v-if="!isAdminRoute" />
  </div>
</template>
