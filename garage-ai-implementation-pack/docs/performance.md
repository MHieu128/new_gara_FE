# Performance Strategy

## Targets
| Category | Target |
|---|---:|
| Performance | 90+ |
| Accessibility | 90+ |
| Best Practices | 90+ |
| SEO | 90+ |

## Frontend Performance Budget
| Resource | Budget |
|---|---:|
| Initial JS | < 170 KB gzipped |
| Initial CSS | < 60 KB gzipped |
| Hero image | < 250 KB |
| Product card image | < 80 KB |
| Initial page weight | < 1 MB |
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

## Vue Rules
- Use route-level code splitting.
- Use async components for heavy sections.
- Avoid unnecessary watchers.
- Avoid global state for page-local data.
- Use pagination/filtering for large lists.
- Use stable keys in `v-for`.
- Do not render huge hidden DOM blocks.

## Image Rules
- Use WebP/AVIF.
- Lazy load below-the-fold images.
- Reserve image aspect ratio to avoid CLS.
- Do not ship huge original images.

Example:
```vue
<img
  :src="product.images[0]"
  :alt="product.name"
  loading="lazy"
  class="aspect-[4/3] w-full object-cover"
/>
```

## Backend Performance Rules
- Use pagination.
- Avoid `SELECT *`.
- Use DTO projections.
- Use indexes for slugs, filters and foreign keys.
- Avoid N+1 queries.
- Cache public catalog data.
- Use response compression.
- Use async I/O.
- Do not block threads.

## Caching
Phase 1 static assets:
```text
Cache-Control: public, max-age=31536000, immutable
```
HTML:
```text
Cache-Control: no-cache
```
Phase 2 API:
- Cache public catalog for 1–5 minutes.
- Invalidate on admin update.
