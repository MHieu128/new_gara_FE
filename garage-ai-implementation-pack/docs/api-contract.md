# API Contract

## General Rules
- JSON only.
- Public APIs must not expose internal fields.
- Admin APIs require authentication.
- Public detail endpoints use slug.
- Admin detail endpoints use UUID.
- Use pagination for backend list APIs.

## Public Product APIs

### GET /api/public/products
Query:
```text
categorySlug?: string
brand?: string
keyword?: string
featuredOnly?: boolean
page?: number
pageSize?: number
```
Response:
```json
{
  "items": [
    {
      "id": "prod_bi_led_xlight_qx_v2",
      "slug": "bi-led-xlight-quantum-x-v2",
      "categoryId": "cat_lighting",
      "name": "Bi LED X-Light Quantum X V2",
      "sku": "XLIGHT-QX-V2",
      "brand": "X-Light",
      "shortDescription": "Bi LED tăng sáng cho xe ô tô.",
      "price": 13500000,
      "priceLabel": "fixed",
      "images": ["/images/products/xlight.webp"],
      "tags": ["bi-led", "tang-sang"],
      "isFeatured": true
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 12
}
```

### GET /api/public/products/{slug}
Returns full product detail including description, specs, compatible vehicles and tags.

## Public Service APIs
```http
GET /api/public/services
GET /api/public/services/{slug}
GET /api/public/service-categories
```

## Public Branch APIs
```http
GET /api/public/branches
GET /api/public/branches/{slug}
```

## Public Article APIs
```http
GET /api/public/articles
GET /api/public/articles/{slug}
```

## Public Lead API
### POST /api/public/leads
Request:
```json
{
  "fullName": "Nguyễn Văn Nam",
  "phone": "0900000000",
  "email": "nam@example.com",
  "vehicleBrand": "Ford",
  "vehicleModel": "Ranger",
  "vehicleYear": 2022,
  "requestedServiceId": "svc_do_den_o_to",
  "preferredBranchId": "branch_da_nang",
  "message": "Tôi muốn tư vấn độ đèn cho xe Ford Ranger.",
  "source": "public_website"
}
```
Response:
```json
{
  "id": "0f59a087-1e61-4b1f-9d07-64a3e2d189fb",
  "status": "new",
  "message": "Yêu cầu của bạn đã được ghi nhận."
}
```
Validation:
- fullName required, max 200
- phone required, max 30
- email optional, valid email
- message optional, max 2000
- source required
