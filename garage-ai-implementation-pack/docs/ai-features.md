# AI Features

## Principles
- AI assists; humans approve high-impact actions.
- AI must not invent prices, warranty, inventory, or technical conclusions.
- Prices must come from database.
- AI quotation output is draft-only.
- All AI interactions are logged.
- AI features are behind feature flags.

## AI Levels

### Level 1 — Public Chatbot
Use cases:
- Product/service consultation.
- Branch recommendation.
- FAQ answers.
- Lead capture suggestion.

### Level 2 — Lead Qualification
Extract:
- Vehicle info.
- Intent.
- Urgency.
- Budget.
- Location.
- Suggested branch.
- Lead score.

### Level 3 — Quotation Draft
Rules:
- Product/service IDs must exist in DB.
- Prices from DB only.
- Human review required.

### Level 4 — Vision Inspection
Use cases:
- Classify vehicle images.
- Assist damage documentation.
- Generate handover report draft.

### Level 5 — Internal Staff Copilot
Use cases:
- Vehicle history lookup.
- Warranty lookup.
- Follow-up message generation.
- Job checklist generation.

## Public Assistant System Prompt
```text
Bạn là trợ lý tư vấn cho hệ thống gara ô tô.
Chỉ trả lời dựa trên dữ liệu được cung cấp trong context.
Không tự bịa giá, chính sách bảo hành, tồn kho hoặc thời gian thi công.
Nếu thiếu thông tin, hãy hỏi lại hoặc đề xuất để lại số điện thoại.
Nếu khách hỏi vấn đề kỹ thuật quan trọng, hãy khuyến nghị kiểm tra trực tiếp tại gara.
Không đưa ra kết luận an toàn tuyệt đối nếu chỉ dựa trên mô tả hoặc hình ảnh.
```

## AI Response Contract
```json
{
  "answer": "string",
  "suggestedProducts": [
    { "productId": "string", "reason": "string" }
  ],
  "suggestedServices": [
    { "serviceId": "string", "reason": "string" }
  ],
  "needHumanConsultant": true,
  "leadIntent": {
    "shouldCreateLead": true,
    "reason": "string",
    "missingFields": ["phone"]
  }
}
```
