# Phase 2 — Backend API Tasks

## Goal
Build .NET 10 backend API and PostgreSQL database to replace Phase 1 local JSON repositories.

## Scope
- .NET 10 Minimal API.
- PostgreSQL.
- EF Core.
- Public APIs.
- Admin CRUD APIs.
- Lead capture.
- Seed data equivalent to Phase 1 JSON.
- Docker Compose local development.

## Tasks

### Foundation
- [ ] Create .NET solution.
- [ ] Create projects: Garage.Api, Garage.Application, Garage.Domain, Garage.Infrastructure, Garage.Worker, tests.
- [ ] Add EF Core packages.
- [ ] Add PostgreSQL provider.
- [ ] Add OpenAPI/Swagger.
- [ ] Add Dockerfile.
- [ ] Add docker-compose.yml.

### Domain Entities
- [ ] ProductCategory
- [ ] Product
- [ ] ServiceCategory
- [ ] Service
- [ ] Branch
- [ ] Article
- [ ] Customer
- [ ] Vehicle
- [ ] Lead
- [ ] AuditLog

### Database
- [ ] Create DbContext.
- [ ] Configure entities.
- [ ] Create migrations.
- [ ] Add indexes.
- [ ] Add seed data.
- [ ] Validate schema against `docs/database.md`.

### Public APIs
- [ ] GET /api/public/products
- [ ] GET /api/public/products/{slug}
- [ ] GET /api/public/product-categories
- [ ] GET /api/public/services
- [ ] GET /api/public/services/{slug}
- [ ] GET /api/public/service-categories
- [ ] GET /api/public/branches
- [ ] GET /api/public/branches/{slug}
- [ ] GET /api/public/articles
- [ ] GET /api/public/articles/{slug}
- [ ] POST /api/public/leads

### Admin APIs
- [ ] Products CRUD.
- [ ] Services CRUD.
- [ ] Branches CRUD.
- [ ] Articles CRUD.
- [ ] Lead list/detail.
- [ ] Lead status update.
- [ ] Lead assignment.

### Quality
- [ ] Validate all write requests.
- [ ] Use DTOs, not entities.
- [ ] Public APIs must not expose internal fields.
- [ ] Add unit tests for lead creation.
- [ ] Add integration tests for public APIs.

## Definition of Done
- API runs locally.
- Swagger works.
- Database migrations apply successfully.
- Phase 1 frontend can switch repository implementation to API.
