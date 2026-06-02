# Prompt — Create Database Schema

Implement database entities and EF Core configuration based on:
- `docs/database.md`
- `schemas/database-schema.sql`

## Requirements
- Use UUID primary keys.
- Use snake_case database table/column names.
- Add `created_at` and `updated_at`.
- Add indexes from `docs/database.md`.
- Add constraints for enum-like fields.
- Use JSONB for flexible fields.
- Create initial migration.
- Seed data equivalent to Phase 1 JSON.
