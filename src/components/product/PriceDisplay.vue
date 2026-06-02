<script setup lang="ts">
import type { PriceLabel } from '@/domain/common';
import { formatPrice } from '@/repositories/formatters';

const props = defineProps<{
  priceLabel: PriceLabel;
  price?: number | null;
}>();
</script>

<template>
  <span class="font-black text-ember">{{ formatPrice(props.priceLabel, props.price) }}</span>
</template>
