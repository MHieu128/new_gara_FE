# Prompt — Review and Refactor

Review the implementation against the project specs.

## Check Frontend
- Components do not import JSON directly.
- Repository layer exists.
- Routes match `docs/frontend-spec.md`.
- UI is responsive.
- Images are optimized.
- No heavy unnecessary dependencies.
- Build passes.
- TypeScript errors are fixed.

## Check Backend
- Public APIs use DTOs.
- Admin APIs are protected or have clear auth TODOs.
- Database schema follows `docs/database.md`.
- Migrations apply.
- No internal fields exposed publicly.
- All admin mutations write audit logs.

## Output
1. Issues found.
2. Files changed.
3. Remaining risks.
4. Recommended next steps.
