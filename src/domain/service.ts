import type { PriceLabel, SeoMetadata } from './common';

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  shortDescription: string;
  description: string;
  heroImageUrl: string;
  gallery: string[];
  basePrice?: number | null;
  priceLabel: PriceLabel;
  estimatedDurationMinutes?: number | null;
  relatedProductIds: string[];
  faqs: ServiceFaq[];
  seo: SeoMetadata;
  isFeatured: boolean;
  isActive: boolean;
}

export interface ServiceCategory {
  id: string;
  parentId?: string | null;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
}

export interface ServiceQuery {
  categorySlug?: string;
  categoryId?: string;
  featuredOnly?: boolean;
}
