import type { Product, ProductCategory, ProductQuery } from '@/domain/product';
import { getJson, type PagedResponse } from '@/repositories/apiClient';

const defaultPageSize = 100;

export async function getProductCategories(): Promise<ProductCategory[]> {
  const categories = await getJson<ProductCategory[]>('/api/public/product-categories');
  return categories.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  const categorySlug = query.categorySlug ?? (query.categoryId ? await findProductCategorySlug(query.categoryId) : undefined);
  const response = await getJson<PagedResponse<Product>>('/api/public/products', {
    categorySlug,
    brand: query.brand,
    keyword: query.keyword,
    featuredOnly: query.featuredOnly,
    page: 1,
    pageSize: defaultPageSize,
  });

  return response.items;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await getJson<Product>(`/api/public/products/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}

async function findProductCategorySlug(categoryId: string): Promise<string | undefined> {
  const categories = await getProductCategories();
  return categories.find((item) => item.id === categoryId)?.slug;
}
