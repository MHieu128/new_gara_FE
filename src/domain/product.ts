import type { CompatibleVehicle, PriceLabel } from './common';

export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  sku?: string;
  brand?: string;
  shortDescription: string;
  description: string;
  price?: number | null;
  priceLabel: PriceLabel;
  images: string[];
  specs: Record<string, string>;
  compatibleVehicles?: CompatibleVehicle[];
  tags?: string[];
  isFeatured: boolean;
  isActive: boolean;
}

export interface ProductCategory {
  id: string;
  parentId?: string | null;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
}

export interface ProductQuery {
  categorySlug?: string;
  categoryId?: string;
  brand?: string;
  keyword?: string;
  featuredOnly?: boolean;
}
