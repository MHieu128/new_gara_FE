# Backend Specification

## Goal
Build a backend API that replaces Phase 1 local JSON data and enables CMS, leads, bookings, quotations and garage operations.

## Stack
- .NET 10 LTS
- ASP.NET Core Minimal API
- EF Core
- PostgreSQL
- OpenAPI/Swagger
- Docker
- Structured logging
- OpenTelemetry-ready

## Architecture
Use modular monolith.

```text
src/
├── Garage.Api/
├── Garage.Application/
├── Garage.Domain/
├── Garage.Infrastructure/
└── Garage.Worker/
```

## Modules
Phase 2:
- Catalog
- CMS
- Branches
- Customers
- Vehicles
- Leads
- Audit Logs

Phase 3:
- Bookings
- Quotations
- Notifications

Phase 4:
- Job Cards
- Inventory
- Warranty
- Invoices

Phase 5:
- AI Chat
- AI Lead Qualification
- AI Quotation Draft
- Staff Copilot

## API Principles
- Public APIs expose only public fields.
- Admin APIs require authentication and RBAC.
- Use DTOs, never expose EF entities directly.
- Validate all mutations.
- All admin mutations write audit logs.
- Use pagination for list endpoints.
- Use UUID primary keys.
- Use slug for public detail pages.
- Do not expose cost price, internal notes or AI logs publicly.

## Public APIs
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

## Admin APIs
```http
GET    /api/admin/products
POST   /api/admin/products
PUT    /api/admin/products/{id}
DELETE /api/admin/products/{id}
GET    /api/admin/services
POST   /api/admin/services
PUT    /api/admin/services/{id}
DELETE /api/admin/services/{id}
GET    /api/admin/branches
POST   /api/admin/branches
PUT    /api/admin/branches/{id}
DELETE /api/admin/branches/{id}
GET    /api/admin/articles
POST   /api/admin/articles
PUT    /api/admin/articles/{id}
DELETE /api/admin/articles/{id}
GET    /api/admin/leads
GET    /api/admin/leads/{id}
PATCH  /api/admin/leads/{id}/status
PATCH  /api/admin/leads/{id}/assign
```

## Example Service Contract
```csharp
public interface ILeadService
{
    Task<CreateLeadResult> CreateAsync(CreateLeadRequest request, CancellationToken cancellationToken);
    Task UpdateStatusAsync(Guid leadId, LeadStatus status, CancellationToken cancellationToken);
    Task AssignAsync(Guid leadId, Guid branchId, Guid? employeeId, CancellationToken cancellationToken);
}

public sealed record CreateLeadRequest(
    string FullName,
    string Phone,
    string? Email,
    string? VehicleBrand,
    string? VehicleModel,
    int? VehicleYear,
    Guid? RequestedServiceId,
    Guid? PreferredBranchId,
    string Message,
    string Source
);
```

## Feature Flags
```json
{
  "FeatureFlags": {
    "EnableAiChat": false,
    "EnableAiLeadQualification": false,
    "EnableAiQuotationDraft": false,
    "EnableAdminPortal": true
  }
}
```
