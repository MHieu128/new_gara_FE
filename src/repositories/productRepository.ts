import products from '@/data/products.json';
import productCategories from '@/data/product-categories.json';
import type { Product, ProductCategory, ProductQuery } from '@/domain/product';

export async function getProductCategories(): Promise<ProductCategory[]> {
  return [...(productCategories as unknown as ProductCategory[])].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  const categories = await getProductCategories();
  const category = query.categorySlug
    ? categories.find((item) => item.slug === query.categorySlug)
    : null;
  const keyword = query.keyword?.trim().toLowerCase();

  return (products as unknown as Product[])
    .filter((product) => product.isActive)
    .filter((product) => !query.featuredOnly || product.isFeatured)
    .filter((product) => !query.categoryId || product.categoryId === query.categoryId)
    .filter((product) => !category || product.categoryId === category.id)
    .filter((product) => !query.brand || product.brand === query.brand)
    .filter((product) => {
      if (!keyword) return true;
      const haystack = [
        product.name,
        product.shortDescription,
        product.description,
        product.brand,
        product.sku,
        ...(product.tags ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(keyword);
    });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return (products as unknown as Product[]).find((product) => product.slug === slug && product.isActive) ?? null;
}
