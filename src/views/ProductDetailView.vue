<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import Container from '@/components/common/Container.vue';
import CTAButton from '@/components/common/CTAButton.vue';
import PriceDisplay from '@/components/product/PriceDisplay.vue';
import type { Product } from '@/domain/product';
import { getProductBySlug } from '@/repositories/productRepository';

const route = useRoute();
const product = ref<Product | null>(null);
const loading = ref(true);

async function loadProduct() {
  loading.value = true;
  product.value = await getProductBySlug(String(route.params.slug));
  document.title = product.value ? `${product.value.name} | Shinwa Pro Garage` : 'Không tìm thấy sản phẩm';
  loading.value = false;
}

onMounted(loadProduct);
watch(() => route.params.slug, loadProduct);
</script>

<template>
  <section class="py-10">
    <Container>
      <Breadcrumb :items="[{ label: 'Sản phẩm', to: '/san-pham' }, { label: product?.name ?? 'Chi tiết' }]" />
      <div v-if="loading" class="mt-10 rounded-lg bg-white p-8 text-steel">Đang tải sản phẩm...</div>
      <div v-else-if="product" class="mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div class="media-fallback aspect-[4/3] overflow-hidden rounded-lg shadow-premium">
          <img
            v-if="product.images[0]"
            :src="product.images[0]"
            :alt="product.name"
            class="h-full w-full object-cover"
            @error="($event.target as HTMLImageElement).style.display = 'none'"
          />
        </div>
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.18em] text-ember">{{ product.brand ?? 'Garage' }}</p>
          <h1 class="mt-3 text-4xl font-black leading-tight text-ink">{{ product.name }}</h1>
          <p class="mt-5 text-lg leading-8 text-steel">{{ product.shortDescription }}</p>
          <div class="mt-6 text-2xl">
            <PriceDisplay :price-label="product.priceLabel" :price="product.price" />
          </div>
          <div class="mt-8 flex flex-wrap gap-3">
            <CTAButton to="/lien-he">Tư vấn sản phẩm</CTAButton>
            <CTAButton to="/san-pham" variant="ghost">Quay lại catalog</CTAButton>
          </div>
        </div>
        <div class="lg:col-span-2">
          <div class="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <article class="rounded-lg bg-white p-6 shadow-sm">
              <h2 class="text-2xl font-black text-ink">Mô tả sản phẩm</h2>
              <p class="mt-4 leading-8 text-steel">{{ product.description }}</p>
            </article>
            <aside class="rounded-lg bg-white p-6 shadow-sm">
              <h2 class="text-2xl font-black text-ink">Thông số</h2>
              <dl class="mt-4 grid gap-3">
                <div v-for="(value, key) in product.specs" :key="key" class="flex justify-between gap-4 border-b border-slate-100 pb-3">
                  <dt class="font-semibold text-steel">{{ key }}</dt>
                  <dd class="text-right font-bold text-ink">{{ value }}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </div>
      <div v-else class="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
        <h1 class="text-2xl font-black text-ink">Không tìm thấy sản phẩm</h1>
        <p class="mt-3 text-steel">Sản phẩm có thể đã ngừng hiển thị.</p>
        <CTAButton to="/san-pham" class="mt-6">Về danh sách sản phẩm</CTAButton>
      </div>
    </Container>
  </section>
</template>
