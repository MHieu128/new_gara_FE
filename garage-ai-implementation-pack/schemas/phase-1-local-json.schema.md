# Phase 1 Local JSON Schema

## ProductCategory
```ts
interface ProductCategory { id: string; parentId?: string | null; name: string; slug: string; description?: string; imageUrl?: string; sortOrder: number; }
```

## Product
```ts
interface Product { id: string; slug: string; categoryId: string; name: string; sku?: string; brand?: string; shortDescription: string; description: string; price?: number | null; priceLabel: 'fixed' | 'from' | 'contact'; images: string[]; specs: Record<string, string>; compatibleVehicles?: CompatibleVehicle[]; tags?: string[]; isFeatured: boolean; isActive: boolean; }
```

## Service
```ts
interface Service { id: string; slug: string; categoryId: string; name: string; shortDescription: string; description: string; heroImageUrl: string; gallery: string[]; basePrice?: number | null; priceLabel: 'fixed' | 'from' | 'contact'; estimatedDurationMinutes?: number | null; relatedProductIds: string[]; faqs: ServiceFaq[]; seo: SeoMetadata; isFeatured: boolean; isActive: boolean; }
```

## Branch
```ts
interface Branch { id: string; slug: string; name: string; province: string; district?: string; address: string; phoneNumbers: string[]; email?: string; latitude?: number; longitude?: number; googleMapUrl?: string; openingHours?: string; services: string[]; isActive: boolean; }
```

## Article
```ts
interface Article { id: string; slug: string; title: string; excerpt: string; content: string; coverImageUrl: string; category: string; tags: string[]; authorName: string; publishedAt: string; seo: SeoMetadata; isFeatured: boolean; isPublished: boolean; }
```
