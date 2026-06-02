<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GarageLoader from '@/components/common/GarageLoader.vue';
import { getDashboard, type Dashboard } from '@/repositories/adminRepository';

const dashboard = ref<Dashboard | null>(null);
const isLoading = ref(true);
const error = ref('');

const cards = [
  ['Products', 'totalProducts'],
  ['Services', 'totalServices'],
  ['Branches', 'totalBranches'],
  ['Articles', 'totalArticles'],
  ['Leads', 'totalLeads'],
  ['New Leads', 'newLeads'],
  ['Bookings Today', 'bookingsToday'],
  ['Pending Bookings', 'pendingBookings'],
  ['Active Job Cards', 'activeJobCards'],
  ['Draft/Sent Quotes', 'draftOrSentQuotations'],
  ['Unpaid Invoices', 'unpaidInvoices'],
  ['Active Users', 'activeUsers'],
] as const;

onMounted(async () => {
  try {
    dashboard.value = await getDashboard();
  } catch {
    error.value = 'Không tải được dashboard.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div>
    <div class="mb-5">
      <h1 class="text-2xl font-black text-ink">Dashboard</h1>
      <p class="mt-1 text-sm text-slate-500">Tổng quan dữ liệu Phase 2 từ database.</p>
    </div>

    <GarageLoader v-if="isLoading" compact label="Đang kiểm tra đồng hồ vận hành..." />
    <p v-else-if="error" class="rounded-md bg-red-50 p-4 text-sm font-semibold text-red-700">{{ error }}</p>
    <div v-else-if="dashboard" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div v-for="[label, key] in cards" :key="key" class="rounded-lg border border-slate-200 bg-white p-5">
        <p class="text-sm font-bold text-slate-500">{{ label }}</p>
        <p class="mt-3 text-3xl font-black text-ink">{{ dashboard[key] }}</p>
      </div>
    </div>
  </div>
</template>
