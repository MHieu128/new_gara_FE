<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Container from '@/components/common/Container.vue';
import PageHero from '@/components/common/PageHero.vue';
import ProductGrid from '@/components/product/ProductGrid.vue';
import type { Product, ProductCategory } from '@/domain/product';
import { getProductCategories, getProducts } from '@/repositories/productRepository';

const products = ref<Product[]>([]);
const categories = ref<ProductCategory[]>([]);
const keyword = ref('');
const categorySlug = ref('');

const filteredProducts = computed(async () =>
  getProducts({
    keyword: keyword.value,
    categorySlug: categorySlug.value || undefined,
  }),
);

async function loadProducts() {
  products.value = await filteredProducts.value;
}

onMounted(async () => {
  const [items, categoryItems] = await Promise.all([getProducts(), getProductCategories()]);
  products.value = items;
  categories.value = categoryItems;
});
</script>

<template>
  <PageHero
    eyebrow="Catalog"
    title="Sản phẩm nâng cấp ô tô"
    description="Gói bảo dưỡng, detailing và phụ kiện nâng cấp được tư vấn theo dòng xe, nhu cầu sử dụng và ngân sách."
  />
  <section class="py-12">
    <Container>
      <div class="mb-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_260px_auto]">
        <input
          v-model="keyword"
          class="min-h-12 rounded-md border border-slate-300 px-4 text-sm outline-none focus:border-ember"
          placeholder="Tìm theo tên, mã, thương hiệu..."
          type="search"
          @input="loadProducts"
        />
        <select
          v-model="categorySlug"
          class="min-h-12 rounded-md border border-slate-300 px-4 text-sm outline-none focus:border-ember"
          @change="loadProducts"
        >
          <option value="">Tất cả danh mục</option>
          <option v-for="category in categories" :key="category.id" :value="category.slug">
            {{ category.name }}
          </option>
        </select>
        <button class="min-h-12 rounded-md bg-ink px-5 text-sm font-bold text-white hover:bg-graphite" @click="loadProducts">
          Lọc
        </button>
      </div>
      <ProductGrid :products="products" />
    </Container>
  </section>
</template>
