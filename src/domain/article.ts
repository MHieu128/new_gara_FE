import type { SeoMetadata } from './common';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  category: string;
  tags: string[];
  authorName: string;
  publishedAt: string;
  seo: SeoMetadata;
  isFeatured: boolean;
  isPublished: boolean;
}

export interface ArticleQuery {
  category?: string;
  tag?: string;
  keyword?: string;
  featuredOnly?: boolean;
}
