import type { Service, ServiceCategory, ServiceQuery } from '@/domain/service';
import { getJson, type PagedResponse } from '@/repositories/apiClient';

const defaultPageSize = 100;

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const categories = await getJson<ServiceCategory[]>('/api/public/service-categories');
  return categories.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getServices(query: ServiceQuery = {}): Promise<Service[]> {
  const categorySlug = query.categorySlug ?? (query.categoryId ? await findServiceCategorySlug(query.categoryId) : undefined);
  const response = await getJson<PagedResponse<Service>>('/api/public/services', {
    categorySlug,
    featuredOnly: query.featuredOnly,
    page: 1,
    pageSize: defaultPageSize,
  });

  return response.items;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    return await getJson<Service>(`/api/public/services/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}

async function findServiceCategorySlug(categoryId: string): Promise<string | undefined> {
  const categories = await getServiceCategories();
  return categories.find((item) => item.id === categoryId)?.slug;
}
