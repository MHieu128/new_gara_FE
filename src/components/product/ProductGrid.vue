<script setup lang="ts">
import type { Product } from '@/domain/product';
import ProductCard from './ProductCard.vue';

defineProps<{
  products: Product[];
}>();
</script>

<template>
  <div v-if="products.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
  <div v-else class="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-steel">
    Không tìm thấy sản phẩm phù hợp.
  </div>
</template>
