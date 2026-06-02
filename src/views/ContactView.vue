<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BranchCard from '@/components/branch/BranchCard.vue';
import Container from '@/components/common/Container.vue';
import CTAButton from '@/components/common/CTAButton.vue';
import PageHero from '@/components/common/PageHero.vue';
import type { Branch } from '@/domain/branch';
import type { SiteSettings } from '@/domain/common';
import type { Service } from '@/domain/service';
import { getBranches } from '@/repositories/branchRepository';
import { postJson } from '@/repositories/apiClient';
import { getServices } from '@/repositories/serviceRepository';
import { getSiteSettings } from '@/repositories/siteRepository';

const settings = ref<SiteSettings | null>(null);
const branches = ref<Branch[]>([]);
const services = ref<Service[]>([]);
const isSubmitting = ref(false);
const submitError = ref('');
const submitSuccess = ref('');
const form = ref({
  fullName: '',
  phone: '',
  email: '',
  vehicleBrand: '',
  vehicleModel: '',
  vehicleYear: '',
  branchId: '',
  requestedServiceId: '',
  bookingType: 'consultation',
  preferredDate: '',
  preferredTime: '',
  message: '',
});

const bookingTypes = [
  { label: 'Tư vấn', value: 'consultation' },
  { label: 'Sửa chữa', value: 'repair' },
  { label: 'Bảo dưỡng', value: 'maintenance' },
  { label: 'Nâng cấp', value: 'upgrade' },
  { label: 'Kiểm tra xe', value: 'inspection' },
];

onMounted(async () => {
  const [site, branchItems, serviceItems] = await Promise.all([getSiteSettings(), getBranches(), getServices()]);
  settings.value = site;
  branches.value = branchItems;
  services.value = serviceItems;
});

async function submitBooking() {
  submitError.value = '';
  submitSuccess.value = '';

  if (!form.value.fullName.trim() || !form.value.phone.trim()) {
    submitError.value = 'Vui lòng nhập họ tên và số điện thoại.';
    return;
  }

  isSubmitting.value = true;
  try {
    await postJson('/api/public/bookings', {
      ...form.value,
      vehicleYear: form.value.vehicleYear ? Number(form.value.vehicleYear) : null,
      branchId: form.value.branchId || null,
      requestedServiceId: form.value.requestedServiceId || null,
      source: 'public_website',
    });
    submitSuccess.value = 'Garage đã nhận yêu cầu. Tư vấn viên sẽ liên hệ lại sớm.';
    form.value.message = '';
  } catch {
    submitError.value = 'Chưa gửi được yêu cầu. Vui lòng kiểm tra kết nối hoặc gọi hotline.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <PageHero
    eyebrow="Contact"
    title="Liên hệ tư vấn"
    description="Gọi hotline, nhắn Zalo/Messenger hoặc liên hệ chi nhánh Shinwa Pro Garage Đà Nẵng."
  />
  <section class="py-12">
    <Container>
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <h2 class="text-2xl font-black text-ink">Kênh liên hệ</h2>
          <div class="mt-6 grid gap-4">
            <CTAButton
              v-for="phone in settings?.hotlines ?? [settings?.hotline ?? '0379147896']"
              :key="phone"
              :href="`tel:${phone}`"
            >
              Gọi {{ phone }}
            </CTAButton>
            <CTAButton :href="settings?.zaloUrl ?? 'https://zalo.me/0379147896'" variant="secondary">Nhắn Zalo</CTAButton>
            <CTAButton :href="settings?.messengerUrl ?? 'https://m.me/example'" variant="ghost">Messenger</CTAButton>
            <a :href="`mailto:${settings?.email ?? 'shinwapro.dn@gmail.com'}`" class="break-words font-bold text-ember">
              {{ settings?.email ?? 'shinwapro.dn@gmail.com' }}
            </a>
            <p class="leading-7 text-steel">{{ settings?.address ?? 'Đối diện công viên Phạm Đức Nam, Ngũ Hành Sơn, Đà Nẵng' }}</p>
          </div>
        </div>
        <div>
          <h2 class="mb-6 text-2xl font-black text-ink">Chi nhánh hỗ trợ</h2>
          <div class="grid gap-6">
            <BranchCard v-for="branch in branches" :key="branch.id" :branch="branch" />
          </div>
        </div>
      </div>

      <form class="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm" @submit.prevent="submitBooking">
        <div class="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p class="text-sm font-bold uppercase tracking-wide text-shinwa">Booking request</p>
            <h2 class="mt-1 text-2xl font-black text-ink">Đặt lịch tư vấn / sửa xe</h2>
          </div>
          <p class="text-sm font-semibold text-steel">Thông tin được gửi trực tiếp vào dashboard admin.</p>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <label class="block">
            <span class="text-sm font-bold text-slate-700">Họ tên *</span>
            <input v-model="form.fullName" class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-shinwa" required />
          </label>
          <label class="block">
            <span class="text-sm font-bold text-slate-700">Số điện thoại *</span>
            <input v-model="form.phone" class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-shinwa" required />
          </label>
          <label class="block">
            <span class="text-sm font-bold text-slate-700">Email</span>
            <input v-model="form.email" type="email" class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-shinwa" />
          </label>
          <label class="block">
            <span class="text-sm font-bold text-slate-700">Loại yêu cầu</span>
            <select v-model="form.bookingType" class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-shinwa">
              <option v-for="type in bookingTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
            </select>
          </label>
          <label class="block">
            <span class="text-sm font-bold text-slate-700">Hãng xe</span>
            <input v-model="form.vehicleBrand" class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-shinwa" />
          </label>
          <label class="block">
            <span class="text-sm font-bold text-slate-700">Dòng xe</span>
            <input v-model="form.vehicleModel" class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-shinwa" />
          </label>
          <label class="block">
            <span class="text-sm font-bold text-slate-700">Đời xe</span>
            <input v-model="form.vehicleYear" type="number" class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-shinwa" />
          </label>
          <label class="block">
            <span class="text-sm font-bold text-slate-700">Chi nhánh</span>
            <select v-model="form.branchId" class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-shinwa">
              <option value="">Chưa chọn</option>
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
            </select>
          </label>
          <label class="block">
            <span class="text-sm font-bold text-slate-700">Dịch vụ quan tâm</span>
            <select v-model="form.requestedServiceId" class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-shinwa">
              <option value="">Chưa chọn</option>
              <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
            </select>
          </label>
          <label class="block">
            <span class="text-sm font-bold text-slate-700">Ngày mong muốn</span>
            <input v-model="form.preferredDate" type="date" class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-shinwa" />
          </label>
          <label class="block">
            <span class="text-sm font-bold text-slate-700">Giờ mong muốn</span>
            <input v-model="form.preferredTime" type="time" class="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-shinwa" />
          </label>
          <label class="block md:col-span-2">
            <span class="text-sm font-bold text-slate-700">Ghi chú</span>
            <textarea v-model="form.message" class="mt-2 min-h-28 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-shinwa" />
          </label>
        </div>

        <p v-if="submitError" class="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{{ submitError }}</p>
        <p v-if="submitSuccess" class="mt-4 rounded-md bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{{ submitSuccess }}</p>
        <button class="mt-5 rounded-md bg-shinwa px-5 py-3 text-sm font-black text-white hover:bg-blue-700 disabled:opacity-60" :disabled="isSubmitting">
          {{ isSubmitting ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu' }}
        </button>
      </form>
    </Container>
  </section>
</template>
