# Prompt — Build Public API

Implement public API endpoints based on `docs/api-contract.md`.

## Endpoints
```http
GET  /api/public/products
GET  /api/public/products/{slug}
GET  /api/public/product-categories
GET  /api/public/services
GET  /api/public/services/{slug}
GET  /api/public/service-categories
GET  /api/public/branches
GET  /api/public/branches/{slug}
GET  /api/public/articles
GET  /api/public/articles/{slug}
POST /api/public/leads
```

## Requirements
- Use DTOs.
- Do not expose internal fields.
- Use slug for detail endpoints.
- Filter inactive/unpublished records.
- Add pagination for list endpoints.
- Validate lead creation.
- Create customer and vehicle when creating lead.
- Return appropriate HTTP status codes.
