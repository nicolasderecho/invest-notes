# AGENTS.md

## Mission

Implement and maintain a small, static React reference application for personal investment knowledge.

The app exists to answer recurring questions quickly, especially:

- How do I buy CSPX again in IBKR?
- How do I verify that I selected the correct ETF?
- What do Limit, Day, Outside RTH, Bid, Ask, Spread, Fill, and Delayed Data mean?
- Am I currently up or down on my open IBKR positions?
- What is the difference between Market Value, Cost Basis, Unrealized P&L, and Net Liquidation?
- Which Irish accumulating ETF alternatives were considered and what role does each play?
- Which instruments require extra review because of possible direct U.S.-source income / Form 1042-S reporting?
- What is a CEDEAR, FCI, Super Ahorro, caución, or plazo fijo in the local Argentine context?

This is a **reference/documentation product**, not a trading system.

---

# Product constraints

## Must

- Use Vite + React + TypeScript.
- Use React Router.
- Use Tailwind CSS.
- Use shadcn/ui.
- Use Lucide React for icons.
- Deploy as a static SPA to Vercel free tier.
- Support Light / Dark / System themes.
- Use centralized semantic design tokens.
- Keep international/IBKR content and Argentine/local content clearly separated.
- Keep the UI simple enough for fast lookup on desktop and mobile.

## Must not

- Add a backend unless explicitly requested later.
- Add authentication.
- Connect to IBKR or local brokers.
- Store brokerage credentials.
- Fetch live portfolio balances.
- Fetch live market prices in v1.
- Turn the app into a recommendation engine.
- Present tax outcomes as guaranteed.
- Add unnecessary state-management libraries.
- Add a database.
- Add complex charts unless they materially improve a specific reference page.

---

# Architecture

Use a straightforward SPA architecture.

Preferred router mode: **React Router Declarative Mode**.

Do not use React Router Framework Mode, SSR, server actions, or loaders unless requirements later justify them.

Suggested layout:

```text
src/
  app/
    router.tsx
    AppShell.tsx
  components/
    layout/
    reference/
    ui/
  data/
    ibkr/
    local/
    glossary.ts
  pages/
    ibkr/
    local/
    GlossaryPage.tsx
    HomePage.tsx
    NotFoundPage.tsx
  lib/
  styles/
    globals.css
```

Keep financial/reference content in structured data files where practical. Pages should focus on layout and composition rather than containing hundreds of lines of hard-coded prose.

---

# Navigation rules

The top-level information architecture is fixed unless explicitly changed:

```text
IBKR
Inversión local
Glosario
```

Do not intermingle local Argentine investing cards into IBKR pages.

Do not intermingle 1042-S/IBKR tax-reporting explanations into the local CEDEAR/FCI pages unless a comparison explicitly requires it.

Suggested routes:

```text
/
/ibkr
/ibkr/cspx
/ibkr/alternatives
/ibkr/buy-cspx
/ibkr/portfolio
/ibkr/1042-s
/local
/local/cedears
/local/fci
/local/cauciones
/glossary
```

The monthly CSPX workflow should always be reachable in one navigation action after entering the IBKR area.

---

# UI philosophy

This app is closer to **personal documentation** than to a broker dashboard.

Prefer:

- short explanation cards;
- checklists;
- definition blocks;
- small comparison tables;
- accordions for optional detail;
- badges for instrument properties;
- clear page titles and subtitles.

Avoid:

- giant dashboards;
- fake live tickers;
- excessive KPI cards;
- decorative finance charts;
- dense tables with dozens of columns;
- constant red/green coloring;
- gradients everywhere;
- finance-themed visual clichés.

If a page cannot be understood quickly on a phone, simplify it.

---

# shadcn/ui

Use shadcn/ui as the component foundation.

Install only components that are actually used.

Likely v1 components:

```text
button
card
badge
alert
accordion
separator
input
table
tooltip
dropdown-menu
sheet
```

`Tabs` may be used inside a page when two small views are closely related, but do not use tabs to replace top-level routes for IBKR vs local investing.

Use `Sheet` for mobile navigation if necessary.

Use `Command` only if/when a global command-palette search is added. Glossary v1 can use a normal Input filter.

---

# Theme and styling

## Critical rule

Do **not** scatter concrete palette colors throughout feature components.

Bad:

```tsx
<div className="bg-blue-600 text-white border-zinc-200" />
```

Preferred:

```tsx
<div className="bg-primary text-primary-foreground border-border" />
```

Use semantic shadcn/Tailwind tokens wherever possible.

Required token families:

```text
background / foreground
card / card-foreground
popover / popover-foreground
primary / primary-foreground
secondary / secondary-foreground
muted / muted-foreground
accent / accent-foreground
destructive
border
input
ring
radius
```

Optional project-specific semantic tokens:

```text
success / success-foreground
warning / warning-foreground
info / info-foreground
```

Define light values in `:root` and dark values under `.dark`.

Prefer current shadcn/Tailwind conventions and OKLCH-compatible theme values.

A future redesign should mostly require editing theme variables, typography, spacing/radius tokens, and a few layout primitives — not rewriting every page.

## Theme provider

Support:

- `light`
- `dark`
- `system`

Persist selection in localStorage.

Use the shadcn Vite dark-mode pattern based on toggling the `dark` class on the root document element.

---

# Content tone

Primary language: **Spanish**.

Tone:

- plain;
- concise;
- explanatory;
- non-patronizing;
- practical.

The user is learning financial terminology. Do not assume specialist knowledge.

Define the English term when it is what the broker UI displays, but explain it in Spanish.

Example:

```text
Unrealized P&L
Ganancia o pérdida de una posición que todavía no vendiste.
```

Do not translate broker labels so aggressively that the user can no longer map the explanation back to the IBKR UI.

---

# Financial-content safety rules

This project contains personal reference material, not professional financial/tax advice.

## Never write absolute tax guarantees

Do not write:

```text
CSPX never generates a 1042-S.
```

Prefer:

```text
CSPX is an Irish-domiciled accumulating UCITS ETF. Under the structure reviewed here, it normally does not pay a U.S.-source dividend directly to the account holder in the same way a U.S.-domiciled distributing ETF can. Broker reporting and tax rules can change.
```

Do not model this as a simple boolean like `safeFrom1042S: true`.

Use descriptive metadata and a review note.

## Distinguish wrappers from underlying assets

Example:

```text
CSPX domicile: Ireland
CSPX listing used: London Stock Exchange
Trading currency: USD
Underlying companies: largely U.S.
```

Do not conflate domicile, exchange, currency, and underlying exposure.

## ISIN is authoritative for identity checks

When documenting ETF identity, show ISIN prominently.

Known reference identities from the current project scope:

```text
CSPX: IE00B5BMR087
CNDX/CSNDX accumulating Nasdaq-100 share class: IE00B53SZB19
```

If other ISINs are added, verify them before committing.

## Mutable facts

Any fact likely to change should carry a `lastReviewed` date in data or page content.

Examples:

- fees;
- TER;
- market opening overlap translated into Buenos Aires time;
- broker UI labels;
- market-data pricing;
- tax/reporting guidance;
- local FCI yields;
- local broker commissions;
- exchange-rate assumptions.

Avoid making current yields/prices part of timeless explanatory text.

---

# IBKR content requirements

## CSPX identity

The CSPX page must include:

```text
Ticker: CSPX
Name: iShares Core S&P 500 UCITS ETF
ISIN: IE00B5BMR087
Domicile: Ireland
Income: Accumulating
Exposure: S&P 500
```

## Buying CSPX

The monthly checklist must cover:

1. Confirm USD cash availability.
2. Search for CSPX.
3. Confirm the intended listing and ISIN.
4. Prefer regular market hours.
5. Explain daylight-saving variability rather than hard-coding one eternal Buenos Aires time.
6. Buy by USD amount when fractional shares are intended.
7. Leave room for commission when needed.
8. Use Limit order as the default workflow documented here.
9. Explain Limit vs Market.
10. `Time in Force = Day` for the documented recurring workflow.
11. `Outside RTH = No` for the documented recurring workflow.
12. Explain delayed market data.
13. Explain Mandatory Cap Price warning.
14. Explain Cash Quantity Order Confirmation warning.
15. Explain where to confirm `Filled` status.
16. Explain Activity Statement as the durable record.

Do not present the example limit-price buffer as an investment recommendation. The core concept is “maximum acceptable price”, not “always add $5”.

---

# IBKR portfolio metrics

The Portfolio page must define and visually distinguish:

## Market Value

Approximate current value of the open position.

## Cost Basis

IBKR's tracked cost of the current position.

## Unrealized P&L

Quick indicator of whether the still-open position is currently up or down relative to its cost basis.

Use an example:

```text
Cost Basis = 3,410
Market Value = 3,500
Unrealized P&L ≈ +90
```

Clarify that a future sale still incurs actual execution price/spread/fees.

## Realized P&L

Profit/loss already crystallized by selling.

## Cash

Uninvested cash.

## Settled Cash

Cash whose settlement process has completed according to the account's rules.

## Net Liquidation

Approximate total current account value if open positions were liquidated around current market values plus current cash.

Do not tell the user that Net Liquidation equals guaranteed withdrawal proceeds.

---

# IBKR ETF alternatives

Document by **role**, not by ranking.

Required v1 reference set:

## CSPX

Core S&P 500 / U.S. equity.

## CNDX / CSNDX

Nasdaq-100 / growth and technology tilt.

Important note: substantial overlap with CSPX; this is not meaningful geographic diversification.

## XUSE

Developed world excluding U.S.; geographic diversification.

## VWRA

Global all-world single-fund solution. Explain that combining VWRA with CSPX intentionally re-overweights U.S. equities.

## IB01

Very short-duration U.S. Treasury exposure through an Irish accumulating UCITS wrapper.

## IBTA

Short-duration U.S. Treasury exposure through an Irish accumulating UCITS wrapper.

Do not prescribe a single “correct” allocation.

---

# 1042-S review section

Use three visual groups:

### Pattern currently preferred

Irish-domiciled accumulating UCITS ETF.

### Review carefully

Examples:

```text
VOO
SPY
IVV
QQQ
U.S. dividend-paying individual stocks
Direct U.S. Treasuries
U.S.-domiciled distributing bond ETFs
Remunerated settled cash
```

### Why

The concern is **direct U.S.-source dividend/interest payments and reporting**, not whether the investment itself is good or bad.

Always display the project's tax disclaimer and Last reviewed date on this page.

---

# Local investment content requirements

The `/local` area is separate from IBKR.

## CEDEAR page

Explain:

- what a CEDEAR is;
- that it trades locally;
- that the underlying asset can be foreign;
- that ARS value reflects both underlying-market movement and the financial FX channel;
- it is not a fixed-income instrument;
- it can be held long-term;
- liquidity/spread matters.

Required examples:

### GLD

Gold exposure. Explain defensive/diversification role and that gold can still decline.

### QQQ

Nasdaq-100 exposure. Explain growth/volatility and overlap with CSPX.

Explain local ticker currency variants conceptually (`base`, `D`, `C`) but include a note that exact exchange/broker conventions should be checked at transaction time.

## FCI page

Explain Fondo Común de Inversión and `cuotapartes`.

Use Santander **Super Ahorro** as the concrete familiar example.

Position it as a short-term/conservative ARS parking tool, not as an equivalent to QQQ/GLD.

Do not hard-code its current yield.

## Cauciones page

Explain the secured short-term lending concept.

Define:

- colocador;
- tomador;
- fixed term;
- agreed rate;
- collateral.

Compare with a money-market FCI.

---

# Glossary requirements

The glossary is a core feature, not an afterthought.

Implement:

- client-side text filter;
- alphabetical ordering;
- English UI term retained where useful;
- concise Spanish explanation;
- optional links to related guide pages.

Seed terms:

```text
Accumulating ETF
Ask
Bid
Buy and hold
CAPE / Shiller CAPE
Cash
Caución bursátil
CEDEAR
Cost Basis
DCA
Dividend
ETF
FCI
Fill
GTC
Hedge
Hedge fund
Index
ISIN
Limit order
Long
Margin
Market order
Market Value
Money market
Nasdaq-100
Net Liquidation
Outside RTH
P&L
Realized P&L
RTH
S&P 500
Settled Cash
Short
Spread
TNA
Time in Force
Trust
UCITS
Unrealized P&L
W-8BEN
1042-S
```

Do not let glossary definitions become essay-length. Link to a dedicated page for deeper explanations.

---

# Coding standards

## TypeScript

- Strict TypeScript.
- Avoid `any` except at unavoidable external boundaries.
- Prefer explicit data interfaces for reference content.
- Keep page components small.
- Extract reusable content patterns only after repetition is real.

## React

- Functional components.
- Keep state local unless state truly spans the app.
- Do not add Redux/Zustand for v1.
- Prefer derived values over duplicated state.
- Theme is global; glossary query is local.

## CSS / Tailwind

- Prefer semantic classes.
- No inline style objects unless unavoidable.
- No page-specific duplicated color palettes.
- Avoid arbitrary Tailwind values when a token/scale already exists.
- Use responsive utility classes intentionally, not excessively.

## Components

Prefer composition over large prop-heavy universal components.

Good reusable abstractions:

```text
InstrumentCard
DefinitionCard
MetricCard
RiskNotice
StepList
QuickFacts
PageHeader
```

Do not create a mega `FinancialCard` with dozens of conditional props.

---

# Content source strategy

Reference content should be data-driven where practical.

Examples:

```text
src/data/ibkr/instruments.ts
src/data/ibkr/portfolio-metrics.ts
src/data/local/cedears.ts
src/data/glossary.ts
```

Every mutable financial reference entry should support:

```ts
lastReviewed: "YYYY-MM-DD"
```

Potentially include:

```ts
sources?: Array<{ label: string; url: string }>
```

for official sources if the UI later adds a “Sources” drawer.

Do not fetch those URLs at runtime in v1.

---

# Testing

Use Vitest + React Testing Library selectively.

Required tests:

- core routes render;
- navigation differentiates IBKR / local / glossary;
- theme provider applies and persists theme;
- glossary filtering is case-insensitive;
- CSPX page displays the expected ISIN;
- monthly buying guide contains all essential steps;
- instrument data renders without missing required identity fields.

Do not snapshot-test entire documentation pages.

Manual test before release:

- desktop light;
- desktop dark;
- mobile light;
- mobile dark;
- keyboard navigation;
- direct refresh on `/ibkr/buy-cspx` after Vercel deployment.

---

# Vercel

Expected static build:

```text
npm run build
→ dist/
```

For a Vite SPA using client-side React Router, make sure deep links work after deployment.

If needed, use:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

A deployment is not considered complete until a nested route can be opened directly/refreshed without a Vercel 404.

---

# Dependency discipline

Before adding a package ask:

1. Can React/Tailwind/shadcn already solve this?
2. Is this functionality actually required by v1?
3. Does this dependency create runtime or maintenance cost disproportionate to the feature?

Do not add packages for trivial utilities.

Likely dependencies should remain close to:

```text
react
react-dom
react-router
lucide-react
shadcn-generated dependencies
tailwindcss
@tailwindcss/vite
```

plus test/dev tooling.

---

# Implementation order

Recommended sequence:

1. Scaffold Vite React TypeScript project.
2. Configure Tailwind using the current Vite plugin.
3. Initialize shadcn/ui.
4. Configure semantic light/dark tokens.
5. Implement ThemeProvider and ThemeToggle.
6. Implement AppShell and top-level navigation.
7. Implement routing.
8. Add static data models.
9. Implement IBKR landing page.
10. Implement CSPX page.
11. Implement monthly Buy CSPX checklist.
12. Implement portfolio metrics page.
13. Implement alternatives / 1042-S review pages.
14. Implement Local landing page.
15. Implement CEDEAR / FCI / caución pages.
16. Implement searchable glossary.
17. Add tests.
18. Add Vercel SPA rewrite if required.
19. Build and validate responsive behavior.
20. Deploy and test direct nested URLs.

---

# Definition of done

A feature is done when:

- it is understandable without prior context;
- it works in dark and light mode;
- it works on mobile;
- it uses semantic tokens;
- it does not duplicate content unnecessarily;
- financial/tax wording is appropriately qualified;
- current/mutable facts show or inherit a review date;
- tests are added when behavior, rather than prose, warrants them;
- `npm run build` succeeds.

