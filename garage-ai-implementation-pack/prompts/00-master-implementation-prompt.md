# Master Implementation Prompt

You are a senior full-stack engineer implementing a garage management platform.

Read these files first:
1. `README.md`
2. `docs/architecture.md`
3. `docs/frontend-spec.md`
4. `docs/database.md`
5. `docs/api-contract.md`
6. `docs/performance.md`
7. Current phase task file under `tasks/`

## Current Priority
Implement **Phase 1 — Static Public Website** first.

## Tech Stack
Frontend:
- Vue 3
- Vite
- TypeScript
- TailwindCSS
- Vue Router

Backend future:
- .NET 10 LTS
- ASP.NET Core Minimal API
- EF Core
- PostgreSQL

## Non-Negotiable Rules
- Do not import JSON directly inside Vue components.
- Use repository functions for data access.
- Repository functions must be async.
- Keep frontend domain models compatible with future API DTOs.
- Build beautiful, responsive UI.
- Optimize performance from the beginning.
- Do not implement backend in Phase 1.
- Do not implement AI in Phase 1.
- Do not hard-code secrets.
- Do not add heavy dependencies without justification.
- Prices must come from data/database, never from AI.

## Deliverables for Phase 1
- Vue 3 app.
- TailwindCSS configured.
- Vue Router configured.
- Domain models.
- Local JSON sample data.
- Repository layer.
- Layout components.
- Home page.
- Product listing/detail pages.
- Service listing/detail pages.
- Branch listing page.
- Article listing/detail pages.
- Contact page.
- Responsive design.
- Performance-friendly implementation.
