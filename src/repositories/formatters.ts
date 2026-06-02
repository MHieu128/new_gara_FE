import type { PriceLabel } from '@/domain/common';

export function formatVnd(value?: number | null): string {
  if (value === null || value === undefined) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPrice(priceLabel: PriceLabel, value?: number | null): string {
  if (priceLabel === 'contact') return 'Liên hệ';
  if (priceLabel === 'from') return `Từ ${formatVnd(value)}`;
  return formatVnd(value);
}
