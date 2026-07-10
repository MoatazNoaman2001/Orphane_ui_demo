# Orphan Data Observatory — Module Overview (First Release)

Top-level module map derived from the First Release Proposal v2.1.
**12 functional modules + 3 cross-cutting foundations**, grouped by proposal phase.
This is a planning skeleton — each module gets its own detailed spec later.

## Foundations — cross-cutting (Phase 0 · W2–3)

| # | Module | Top-level entries |
|---|--------|-------------------|
| F1 | Auth & Access Control | Login, 5-role RBAC, partner row-level scoping (an org sees only its own data) |
| F2 | Bilingual engine (i18n) | AR (RTL) / EN (LTR), locale routing, dual-language content fields, extensible locales |
| F3 | Audit & data safety | Audit log on every mutation, soft-deletes only — "no deletion without a trace" |

- **Arch:** substrate, not features — role guards + `org_id` scoping in one middleware layer; translations as data; audit hooks in the base data layer so no module can bypass them.
- **Risk:** expensive to retrofit; role/permission matrix needs Federation sign-off in week 1.

## Data Core (Phase 1 · W3–5)

| # | Module | Top-level entries |
|---|--------|-------------------|
| 1 | Countries & sub-regions | Country registry (seeded as data-gap), statuses: Published / In prep / Data gap / Internal, publish toggle; sub-region schema stored now, surfaced later |
| 2 | Sources | Source records, attachments, publish/hide toggle |
| 3 | Indicators | Identity-card rule: no value without source + year + confidence grade (A–E); publish/hide per indicator |

- **Arch:** identity-card validation as DB constraints, not just form validation.
- **Risk:** this is the founding rule — if it is soft anywhere, the product promise breaks.

## Public Site (Phase 2 · W4–6)

| # | Module | Top-level entries |
|---|--------|-------------------|
| 4 | Public website | Home, methodology page (admin-editable), country list, unified country template + data-gap message, reports section |
| 5 | Interactive map | Leaflet, country-level, standard world GeoJSON |
| 6 | Dashboard + sources library | Preliminary indicator charts/filters over approved data; browsable source library |

- **Arch:** public routes read from a published-only data view enforced at query level — never per-page checks.
- **Risk:** map naming/boundary sensitivities (keep data client-provided); dashboard must stay "preliminary".

## Partner Portal & Workflow (Phase 3 · W5–7) — heaviest part

| # | Module | Top-level entries |
|---|--------|-------------------|
| 7 | Partner portal | Scoped login, org profile, aggregated-only entry (no personal fields by schema), attachments, preview-before-submit |
| 8 | Review & approval engine | State machine: submit → triage → methodological review → edit-request loop ↔ partner → confidence classification → internal approval → publish / internal / reject / archive; Federation notes; hard publish block before approval |

- **Arch:** explicit state enum + allowed-transitions table; every transition audited; the edit-request loop cycles.
- **Risk:** highest complexity, latest in timeline; free-text fields can smuggle personal data — mitigated by field design + review gate.

## Cross-cutting & Delivery (Phase 4 · W8 + buffer)

| # | Module | Top-level entries |
|---|--------|-------------------|
| 9 | Search & filters | Countries, sources, indicators, organizations, partner entries (DB full-text sufficient) |
| 10 | Export | Approved data only → CSV / Excel |
| 11 | Admin panel | Control surface for everything: content editing, status/publish toggles, hide-org-name toggle, user & org management (built incrementally from Phase 0) |
| 12 | Ops | Backup/restore procedure, deployment to client hosting, optional PWA layer |

## Top project risks

1. **Review workflow complexity** — prototype the state machine on paper with the Federation before coding.
2. **Client-dependency latency** — UI/UX approval gates development; AR/EN content must come from client (no MT); delays shift delivery 1:1.
3. **Public/internal leakage** — a governance failure, not a bug; solve structurally at query level.
4. **RTL polish** — cheap at 80%, expensive at 100%; the buffer month exists largely for this.
5. **Scope discipline** — fixed $1,300 / 8 weeks with an explicit out-of-scope list; anything beyond Section 6 is quoted separately.
