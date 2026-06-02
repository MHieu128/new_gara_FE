# Phase 1 — Static Public Website Tasks

## Goal
Create a beautiful, fast, frontend-only public website using Vue 3, Vite, TypeScript and TailwindCSS.

## Scope
- No backend.
- No database.
- No auth.
- Data comes from local JSON.
- Components use repository functions.
- Website is deployable as static files.

## Tasks

### Foundation
- [ ] Create Vue 3 + Vite + TypeScript project.
- [ ] Install TailwindCSS.
- [ ] Configure path alias `@`.
- [ ] Configure Vue Router.
- [ ] Create base app layout.
- [ ] Create global CSS.

### Domain Models
- [ ] Create `src/domain/product.ts`.
- [ ] Create `src/domain/service.ts`.
- [ ] Create `src/domain/branch.ts`.
- [ ] Create `src/domain/article.ts`.
- [ ] Create `src/domain/common.ts`.

### Local Data
- [ ] Create `src/data/products.json`.
- [ ] Create `src/data/product-categories.json`.
- [ ] Create `src/data/services.json`.
- [ ] Create `src/data/service-categories.json`.
- [ ] Create `src/data/branches.json`.
- [ ] Create `src/data/articles.json`.
- [ ] Create `src/data/site-settings.json`.

### Repository Layer
- [ ] Create `productRepository.ts`.
- [ ] Create `serviceRepository.ts`.
- [ ] Create `branchRepository.ts`.
- [ ] Create `articleRepository.ts`.
- [ ] Create `siteRepository.ts`.
- [ ] All repository functions must be async.
- [ ] Components must not import JSON directly.

### Layout Components
- [ ] AppHeader
- [ ] AppFooter
- [ ] MobileNavigation
- [ ] CTAButton
- [ ] SectionHeading
- [ ] Container
- [ ] Breadcrumb

### Pages
- [ ] Home page.
- [ ] Product listing/detail.
- [ ] Service listing/detail.
- [ ] Branch listing.
- [ ] Article listing/detail.
- [ ] Contact page.

### Performance
- [ ] Lazy load images.
- [ ] Use WebP/AVIF assets.
- [ ] Code split routes.
- [ ] Avoid heavy dependencies.
- [ ] Lighthouse 90+ target.

## Definition of Done
- `npm run build` passes.
- `npm run dev` works.
- All routes render.
- Data is loaded through repositories.
- No backend dependency exists.
- Responsive design works on mobile/tablet/desktop.
- UI looks premium and professional.
