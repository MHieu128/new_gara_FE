<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GarageLoader from '@/components/common/GarageLoader.vue';
import { assignLead, listResource, updateLeadStatus, type AdminRecord } from '@/repositories/adminRepository';

const leads = ref<AdminRecord[]>([]);
const branches = ref<AdminRecord[]>([]);
const isLoading = ref(true);
const error = ref('');

const statuses = ['new', 'contacted', 'quoted', 'booked', 'lost'];

onMounted(load);

async function load() {
  isLoading.value = true;
  error.value = '';
  try {
    [leads.value, branches.value] = await Promise.all([listResource('leads'), listResource('branches')]);
  } catch {
    error.value = 'Không tải được leads.';
  } finally {
    isLoading.value = false;
  }
}

async function changeStatus(lead: AdminRecord, status: string) {
  await updateLeadStatus(lead.id, status);
  await load();
}

async function changeBranch(lead: AdminRecord, branchId: string) {
  if (!branchId) return;
  await assignLead(lead.id, branchId);
  await load();
}
</script>

<template>
  <div>
    <div class="mb-5">
      <h1 class="text-2xl font-black text-ink">Leads</h1>
      <p class="mt-1 text-sm text-slate-500">Quản lý yêu cầu khách hàng gửi từ public form.</p>
    </div>

    <GarageLoader v-if="isLoading" compact label="Đang nhận tín hiệu khách hàng..." />
    <p v-else-if="error" class="rounded-md bg-red-50 p-4 text-sm font-semibold text-red-700">{{ error }}</p>
    <div v-else class="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm">
          <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th class="px-4 py-3">Customer</th>
              <th class="px-4 py-3">Phone</th>
              <th class="px-4 py-3">Vehicle</th>
              <th class="px-4 py-3">Message</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Branch</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="lead in leads" :key="lead.id">
              <td class="px-4 py-3 font-bold text-ink">{{ lead.customerName }}</td>
              <td class="px-4 py-3 text-slate-700">{{ lead.customerPhone }}</td>
              <td class="px-4 py-3 text-slate-700">{{ lead.vehicleBrand }} {{ lead.vehicleModel }} {{ lead.vehicleYear }}</td>
              <td class="max-w-sm px-4 py-3 text-slate-700">{{ lead.message }}</td>
              <td class="px-4 py-3">
                <select
                  class="rounded-md border border-slate-300 px-2 py-1 text-xs font-bold"
                  :value="String(lead.status)"
                  @change="changeStatus(lead, ($event.target as HTMLSelectElement).value)"
                >
                  <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
                </select>
              </td>
              <td class="px-4 py-3">
                <select
                  class="rounded-md border border-slate-300 px-2 py-1 text-xs font-bold"
                  :value="String(lead.branchId ?? '')"
                  @change="changeBranch(lead, ($event.target as HTMLSelectElement).value)"
                >
                  <option value="">Chưa assign</option>
                  <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
