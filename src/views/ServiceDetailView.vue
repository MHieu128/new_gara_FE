<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import Container from '@/components/common/Container.vue';
import CTAButton from '@/components/common/CTAButton.vue';
import PriceDisplay from '@/components/product/PriceDisplay.vue';
import type { Service } from '@/domain/service';
import { getServiceBySlug } from '@/repositories/serviceRepository';

const route = useRoute();
const service = ref<Service | null>(null);
const loading = ref(true);

async function loadService() {
  loading.value = true;
  service.value = await getServiceBySlug(String(route.params.slug));
  document.title = service.value ? service.value.seo.title : 'Không tìm thấy dịch vụ';
  loading.value = false;
}

onMounted(loadService);
watch(() => route.params.slug, loadService);
</script>

<template>
  <section class="py-10">
    <Container>
      <Breadcrumb :items="[{ label: 'Dịch vụ', to: '/dich-vu' }, { label: service?.name ?? 'Chi tiết' }]" />
      <div v-if="loading" class="mt-10 rounded-lg bg-white p-8 text-steel">Đang tải dịch vụ...</div>
      <div v-else-if="service" class="mt-8">
        <div class="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div class="media-fallback aspect-[16/10] overflow-hidden rounded-lg shadow-premium">
            <img
              :src="service.heroImageUrl"
              :alt="service.name"
              class="h-full w-full object-cover"
              @error="($event.target as HTMLImageElement).style.display = 'none'"
            />
          </div>
          <div>
            <p class="text-sm font-bold uppercase tracking-[0.18em] text-ember">Dịch vụ</p>
            <h1 class="mt-3 text-4xl font-black leading-tight text-ink">{{ service.name }}</h1>
            <p class="mt-5 text-lg leading-8 text-steel">{{ service.shortDescription }}</p>
            <div class="mt-6 text-2xl">
              <PriceDisplay :price-label="service.priceLabel" :price="service.basePrice" />
            </div>
            <p v-if="service.estimatedDurationMinutes" class="mt-3 font-semibold text-steel">
              Thời gian dự kiến: {{ service.estimatedDurationMinutes }} phút
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <CTAButton to="/lien-he">Đặt tư vấn</CTAButton>
              <CTAButton to="/dich-vu" variant="ghost">Tất cả dịch vụ</CTAButton>
            </div>
          </div>
        </div>
        <div class="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <article class="rounded-lg bg-white p-6 shadow-sm">
            <h2 class="text-2xl font-black text-ink">Chi tiết dịch vụ</h2>
            <p class="mt-4 leading-8 text-steel">{{ service.description }}</p>
          </article>
          <aside class="rounded-lg bg-white p-6 shadow-sm">
            <h2 class="text-2xl font-black text-ink">Câu hỏi thường gặp</h2>
            <div class="mt-5 grid gap-5">
              <div v-for="faq in service.faqs" :key="faq.question">
                <p class="font-bold text-ink">{{ faq.question }}</p>
                <p class="mt-2 text-sm leading-6 text-steel">{{ faq.answer }}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div v-else class="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <h1 class="text-2xl font-black text-ink">Không tìm thấy dịch vụ</h1>
        <p class="mt-3 text-steel">Dịch vụ có thể đã ngừng hiển thị.</p>
        <CTAButton to="/dich-vu" class="mt-6">Về danh sách dịch vụ</CTAButton>
      </div>
    </Container>
  </section>
</template>
