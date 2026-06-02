# Phase 5 — AI Features Tasks

## Goal
Add safe, useful AI capabilities to support customers and staff.

## Tasks

### AI Foundation
- [ ] Create AI module.
- [ ] Create `IGarageAiAssistant`.
- [ ] Create `IAiTool`.
- [ ] Add AI feature flags.
- [ ] Add AI interaction logging.
- [ ] Add prompt templates.

### Public Chatbot
- [ ] Add `/api/public/ai/chat`.
- [ ] Retrieve product/service/branch context.
- [ ] Answer only from context.
- [ ] Suggest lead capture.
- [ ] Return structured JSON.

### Lead Qualification
- [ ] Extract vehicle info.
- [ ] Extract customer intent.
- [ ] Extract urgency.
- [ ] Suggest branch.
- [ ] Score lead.
- [ ] Write extracted JSON to lead.

### Quotation Draft
- [ ] Generate draft quotation.
- [ ] Use product/service IDs from database.
- [ ] Use prices from database only.
- [ ] Mark draft as requiring human review.

### Guardrails
- [ ] AI cannot invent price.
- [ ] AI cannot invent warranty.
- [ ] AI cannot invent inventory.
- [ ] AI cannot finalize technical safety conclusion.
- [ ] AI cannot send quotation without staff review.

## Definition of Done
- AI can be disabled through feature flag.
- AI logs are persisted.
- AI output uses structured contract.
- Human review is required for quote draft.
