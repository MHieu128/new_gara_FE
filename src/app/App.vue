<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import FloatingContactBar from '@/components/layout/FloatingContactBar.vue';
</script>

<template>
  <div class="min-h-screen bg-slate-50 pb-24 text-ink sm:pb-28">
    <AppHeader />
    <main>
      <RouterView />
    </main>
    <AppFooter />
    <FloatingContactBar />
  </div>
</template>
