<script setup lang="ts">
import type { Product } from '@/domain/product';
import PriceDisplay from './PriceDisplay.vue';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <article class="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-premium">
    <RouterLink :to="`/san-pham/${product.slug}`" class="block">
      <div class="media-fallback aspect-[4/3] overflow-hidden">
        <img
          v-if="product.images[0]"
          :src="product.images[0]"
          :alt="product.name"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          @error="($event.target as HTMLImageElement).style.display = 'none'"
        />
      </div>
      <div class="p-5">
        <div class="mb-2 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wide text-steel">
          <span>{{ product.brand ?? 'Garage' }}</span>
          <span v-if="product.sku">{{ product.sku }}</span>
        </div>
        <h3 class="text-lg font-black leading-snug text-ink group-hover:text-ember">
          {{ product.name }}
        </h3>
        <p class="mt-3 line-clamp-2 text-sm leading-6 text-steel">
          {{ product.shortDescription }}
        </p>
        <div class="mt-4">
          <PriceDisplay :price-label="product.priceLabel" :price="product.price" />
        </div>
        <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-shinwa">
          <span>Xem chi tiết</span>
          <span class="transition group-hover:translate-x-1">→</span>
        </div>
      </div>
    </RouterLink>
  </article>
</template>
