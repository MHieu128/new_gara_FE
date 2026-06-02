<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Container from '@/components/common/Container.vue';
import PageHero from '@/components/common/PageHero.vue';
import ServiceCard from '@/components/service/ServiceCard.vue';
import type { Service, ServiceCategory } from '@/domain/service';
import { getServiceCategories, getServices } from '@/repositories/serviceRepository';

const services = ref<Service[]>([]);
const categories = ref<ServiceCategory[]>([]);
const selectedCategory = ref('');

async function loadServices() {
  services.value = await getServices({ categorySlug: selectedCategory.value || undefined });
}

onMounted(async () => {
  const [items, categoryItems] = await Promise.all([getServices(), getServiceCategories()]);
  services.value = items;
  categories.value = categoryItems;
});
</script>

<template>
  <PageHero
    eyebrow="Services"
    title="Dịch vụ gara ô tô"
    description="Bảo dưỡng định kỳ, sửa chữa gầm máy, đồng sơn, điện lạnh và detailing tại Đà Nẵng."
  />
  <section class="py-12">
    <Container>
      <div class="mb-8 flex flex-wrap gap-3">
        <button
          class="rounded-md px-4 py-2 text-sm font-bold"
          :class="selectedCategory === '' ? 'bg-ink text-white' : 'bg-white text-ink'"
          @click="selectedCategory = ''; loadServices()"
        >
          Tất cả
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          class="rounded-md px-4 py-2 text-sm font-bold"
          :class="selectedCategory === category.slug ? 'bg-ink text-white' : 'bg-white text-ink'"
          @click="selectedCategory = category.slug; loadServices()"
        >
          {{ category.name }}
        </button>
      </div>
      <div v-if="services.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" />
      </div>
      <div v-else class="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-steel">
        Không tìm thấy dịch vụ phù hợp.
      </div>
    </Container>
  </section>
</template>
