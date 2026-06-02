# Prompt — Build Static JSON Data Layer

Implement the Phase 1 static data layer.

## Requirements
- Create TypeScript domain models under `src/domain`.
- Create sample JSON files under `src/data`.
- Create repository functions under `src/repositories`.
- All repository functions must be async.
- Vue components must not import JSON directly.

## Domain Files
```text
src/domain/product.ts
src/domain/service.ts
src/domain/branch.ts
src/domain/article.ts
src/domain/common.ts
```

## Repository Files
```text
src/repositories/productRepository.ts
src/repositories/serviceRepository.ts
src/repositories/branchRepository.ts
src/repositories/articleRepository.ts
src/repositories/siteRepository.ts
```

## Required Functions
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
