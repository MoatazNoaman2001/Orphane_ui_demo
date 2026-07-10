# Figma Screen Plan — UI/UX Design Phase (W1–2)

Decisions locked:
- All screens designed in **English only**; Arabic delivered as font/type-style definitions, no mirrored screens.
- **Dashboard parts (admin panel, partner portal) are desktop-only**; public site + auth get Desktop and Mobile.

## Frame count

| Area | Layouts (screens + key states) | Desktop | Mobile |
|---|---|---|---|
| Public site | 12 | 12 | 12 |
| Auth | 2 | 2 | 2 |
| Partner portal | 9 | 9 | — |
| Admin panel | ~16 | 16 | — |
| **Total** | **~39** | **39** | **14** |

**≈ 53 frames.** Open question for the Federation: if partners submit data from phones, the portal needs mobile too (+9 frames ≈ 62).

## Screen list

### Public (9 screens → 12 layouts, Desktop + Mobile)
1. Home
2. Methodology
3. Countries list
4. Country page — unified template ×4 states (Published / In preparation / Data gap / Internal; data-gap message is a contractual deliverable)
5. Interactive map
6. Sources library
7. Indicators dashboard
8. Reports
9. Search results (with filters)

### Auth (2)
10. Login
11. Password recovery (request/reset states)

### Partner portal (5 screens → 9 layouts, desktop only)
12. Portal home / my submissions (status tracking)
13. Organization profile
14. Data entry form (aggregated fields + attachments)
15. Preview-before-submit
16. Submission detail ×5 states (submitted / in review / edit requested / approved / rejected)

### Admin panel (11 screens → ~16 layouts, desktop only)
17. Admin dashboard
18. Review queue (triage inbox)
19. Submission review detail ×~5 workflow states (triage / methodological review / request edits / classify A–E / approve-reject-archive)
20. Countries list (mgmt)
21. Country edit (status + publish toggles)
22. Indicators list (mgmt)
23. Indicator form + identity-card validation error state
24. Sources list + form
25. Organizations mgmt (hide-name toggle)
26. Users & roles (5 roles)
27. Content editor (methodology/home) · Audit log viewer

## Typography

- **English:** Geist (as in demo) or designer's choice.
- **Arabic: IBM Plex Sans Arabic** (already wired in the codebase via next/font). Alternative: Noto Kufi Arabic.
- Define Arabic text styles in Figma from day one (token swap later, not redesign).
- Arabic line-height ≈ +10–15% vs Latin at same size — design EN blocks with that slack.
- Federation decision needed: numerals policy — Latin (1234) vs Arabic-Indic (١٢٣٤); affects all data displays.
