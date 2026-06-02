import serviceCategories from '@/data/service-categories.json';
import services from '@/data/services.json';
import type { Service, ServiceCategory, ServiceQuery } from '@/domain/service';

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  return [...(serviceCategories as unknown as ServiceCategory[])].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getServices(query: ServiceQuery = {}): Promise<Service[]> {
  const categories = await getServiceCategories();
  const category = query.categorySlug
    ? categories.find((item) => item.slug === query.categorySlug)
    : null;

  return (services as unknown as Service[])
    .filter((service) => service.isActive)
    .filter((service) => !query.featuredOnly || service.isFeatured)
    .filter((service) => !query.categoryId || service.categoryId === query.categoryId)
    .filter((service) => !category || service.categoryId === category.id);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return (services as unknown as Service[]).find((service) => service.slug === slug && service.isActive) ?? null;
}
