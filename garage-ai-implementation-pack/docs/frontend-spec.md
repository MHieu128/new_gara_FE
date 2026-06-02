# Frontend Specification

## Goal
Build a beautiful, fast, frontend-only public website for an automotive garage business.

## Stack
- Vue 3
- Vite
- TypeScript
- TailwindCSS
- Vue Router
- Local JSON data
- No backend
- No database
- No auth

## Routes
```text
/                  Home page
/san-pham          Product listing
/san-pham/:slug    Product detail
/dich-vu           Service listing
/dich-vu/:slug     Service detail
/chi-nhanh         Branch listing
/tin-tuc           Article listing
/tin-tuc/:slug     Article detail
/lien-he           Contact page
```

## Folder Structure
```text
src/
├── app/App.vue
├── assets/
├── components/
│   ├── layout/AppHeader.vue
│   ├── layout/AppFooter.vue
│   ├── layout/MobileNavigation.vue
│   ├── common/
│   ├── product/
│   ├── service/
│   ├── branch/
│   └── article/
├── data/
├── domain/
├── repositories/
├── router/index.ts
├── views/
├── main.ts
└── style.css
```

## UI Direction
- Premium automotive style.
- Strong hero section.
- Beautiful imagery.
- Clean navigation.
- Modern card layouts.
- Clear CTA buttons.
- Responsive mobile-first design.
- Good whitespace and typography.

## Home Page Sections
1. Header
2. Hero
3. Trust metrics
4. Featured services
5. Featured products
6. Why choose us
7. Branch preview
8. Articles preview
9. CTA section
10. Footer

## Data Access Rule
Components must never import JSON directly.

Bad:
```ts
import products from '@/data/products.json';
```

Good:
```ts
import { getProducts } from '@/repositories/productRepository';
const products = await getProducts();
```

## Required Repository Functions
```ts
getProducts(query?: ProductQuery): Promise<Product[]>
getProductBySlug(slug: string): Promise<Product | null>
getProductCategories(): Promise<ProductCategory[]>
getServices(query?: ServiceQuery): Promise<Service[]>
getServiceBySlug(slug: string): Promise<Service | null>
getServiceCategories(): Promise<ServiceCategory[]>
getBranches(query?: BranchQuery): Promise<Branch[]>
getBranchBySlug(slug: string): Promise<Branch | null>
getBranchesByProvince(province: string): Promise<Branch[]>
getArticles(query?: ArticleQuery): Promise<Article[]>
getArticleBySlug(slug: string): Promise<Article | null>
getSiteSettings(): Promise<SiteSettings>
```

## Domain Models

### Product
```ts
export type PriceLabel = 'fixed' | 'from' | 'contact';
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
```

### Service
```ts
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
  priceLabel: 'fixed' | 'from' | 'contact';
  estimatedDurationMinutes?: number | null;
  relatedProductIds: string[];
  faqs: ServiceFaq[];
  seo: SeoMetadata;
  isFeatured: boolean;
  isActive: boolean;
}
```

### Branch
```ts
export interface Branch {
  id: string;
  slug: string;
  name: string;
  province: string;
  district?: string;
  address: string;
  phoneNumbers: string[];
  email?: string;
  latitude?: number;
  longitude?: number;
  googleMapUrl?: string;
  openingHours?: string;
  services: string[];
  isActive: boolean;
}
```

### Article
```ts
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
```

## Contact and Lead Capture
Phase 1 has no backend. Use:
- Hotline link
- Zalo link
- Messenger link
- Optional external form provider
