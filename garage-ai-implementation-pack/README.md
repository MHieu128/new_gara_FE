# Garage Platform — AI Implementation Pack

## Product Vision
Build a performance-first, premium public website for an automotive garage, then evolve it into a complete garage management platform with CRM, booking, quotation, job cards, inventory, warranty and AI assistance.

## Current Target
Start with **Phase 1 — Static Public Website**.

## Target Stack

### Phase 1 Frontend
- Vue 3
- Vite
- TypeScript
- TailwindCSS
- Vue Router
- Local JSON data
- No backend
- No database
- No authentication

### Phase 2+ Backend
- .NET 10 LTS
- ASP.NET Core Minimal API
- EF Core
- PostgreSQL
- OpenAPI/Swagger
- Docker

### AI Later
- AI Orchestrator behind backend APIs
- RAG/search layer
- AI logs
- Feature flags
- Guardrails: AI must not invent prices, warranties, stock, or final technical conclusions.

## Repository Structure
```text
garage-platform/
├── README.md
├── docs/
│   ├── architecture.md
│   ├── frontend-spec.md
│   ├── backend-spec.md
│   ├── database.md
│   ├── api-contract.md
│   ├── performance.md
│   ├── ai-features.md
│   └── coding-standards.md
├── tasks/
│   ├── phase-1-static-website.md
│   ├── phase-2-backend-api.md
│   ├── phase-3-cms-booking.md
│   ├── phase-4-garage-operations.md
│   └── phase-5-ai-features.md
├── prompts/
│   ├── 00-master-implementation-prompt.md
│   ├── 01-init-vue-static-site.md
│   ├── 02-build-data-layer.md
│   ├── 03-build-ui-pages.md
│   ├── 04-optimize-frontend-performance.md
│   ├── 05-init-dotnet-api.md
│   ├── 06-create-database-schema.md
│   ├── 07-build-public-api.md
│   ├── 08-build-admin-api.md
│   ├── 09-add-ai-chatbot.md
│   └── 10-review-and-refactor.md
├── src-data-samples/
└── schemas/
```

## Non-Negotiable Implementation Rules
- Phase 1 is frontend-only.
- Vue components must never import JSON directly.
- All data access must go through async repository functions.
- Keep TypeScript domain models compatible with future API DTOs.
- Build a beautiful, responsive, premium UI.
- Optimize performance from the beginning.
- Use local JSON first, then swap repository implementation to .NET API in Phase 2.
- Do not implement backend, auth, database or AI in Phase 1.

## Definition of Done — Phase 1
- App runs locally.
- `npm run build` passes.
- All public routes work.
- UI is responsive and premium.
- Data is loaded through repository layer.
- JSON schema matches docs.
- Lighthouse targets are considered: Performance 90+, SEO 90+, Best Practices 90+, Accessibility 90+.
