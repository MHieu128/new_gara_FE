# Coding Standards

## General
- Prefer simple, explicit code.
- Do not over-engineer Phase 1.
- Use TypeScript strictly.
- Avoid `any` unless justified.
- Do not expose internal backend fields through public APIs.

## Frontend
- Components: PascalCase.
- Repositories: camelCase file name ending with `Repository.ts`.
- Domain models: PascalCase interfaces.
- JSON files: kebab-case.
- Components must not import JSON directly.
- Pages orchestrate data loading.
- Reusable cards should be presentational.

## Backend
- Tables: snake_case plural.
- C# entities: PascalCase singular.
- DTOs: `XxxRequest`, `XxxResponse`.
- Services: `IXxxService`, `XxxService`.
- Use DTO projections.
- Use proper HTTP status codes.
- Use problem details for errors.
- Validate write requests.

## AI Coding Agent Rules
1. Read README first.
2. Read current phase task file.
3. Do not implement future phases unless explicitly asked.
4. Keep code compileable after each major change.
5. Update README if setup commands change.
6. Never hard-code production secrets.
7. Never invent missing business rules; write explicit TODOs.
