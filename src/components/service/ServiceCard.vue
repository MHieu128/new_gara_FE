<script setup lang="ts">
import type { Service } from '@/domain/service';
import PriceDisplay from '@/components/product/PriceDisplay.vue';

defineProps<{
  service: Service;
}>();
</script>

<template>
  <article class="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-premium">
    <RouterLink :to="`/dich-vu/${service.slug}`" class="block">
      <div class="media-fallback relative aspect-[16/10] overflow-hidden">
        <img
          :src="service.heroImageUrl"
          :alt="service.name"
          class="h-full w-full object-cover"
          loading="lazy"
          @error="($event.target as HTMLImageElement).style.display = 'none'"
        />
        <span
          v-if="service.isFeatured"
          class="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-shinwa shadow-sm"
        >
          Nổi bật
        </span>
      </div>
      <div class="p-5">
        <h3 class="text-xl font-black text-ink">{{ service.name }}</h3>
        <p class="mt-3 line-clamp-2 text-sm leading-6 text-steel">{{ service.shortDescription }}</p>
        <div class="mt-4 flex items-center justify-between gap-4">
          <PriceDisplay :price-label="service.priceLabel" :price="service.basePrice" />
          <span v-if="service.estimatedDurationMinutes" class="text-sm font-semibold text-steel">
            {{ service.estimatedDurationMinutes }} phút
          </span>
        </div>
        <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-shinwa">
          <span>Tư vấn dịch vụ</span>
          <span class="transition group-hover:translate-x-1">→</span>
        </div>
      </div>
    </RouterLink>
  </article>
</template>
