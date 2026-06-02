# Prompt — Build UI Pages

Implement all public website pages using the repository layer.

## Required Pages
- HomeView
- ProductsView
- ProductDetailView
- ServicesView
- ServiceDetailView
- BranchesView
- ArticlesView
- ArticleDetailView
- ContactView

## Required Components
```text
components/common/Container.vue
components/common/SectionHeading.vue
components/common/CTAButton.vue
components/product/ProductCard.vue
components/product/ProductGrid.vue
components/service/ServiceCard.vue
components/branch/BranchCard.vue
components/article/ArticleCard.vue
```

## Product Listing
- Load data using `getProducts`.
- Display cards.
- Add keyword filter.
- Add category filter.
- Show price display:
  - `contact` -> `Liên hệ`
  - `fixed` -> formatted VND
  - `from` -> `Từ {price}đ`

## Contact Page
- Do not implement backend form.
- Show hotline, Zalo, Messenger, branch contact info.
