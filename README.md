# Personal Investment Reference

A small, static personal reference app for quickly reviewing the investing concepts, workflows, and instruments used in two separate contexts:

1. **International investing through Interactive Brokers (IBKR)**
2. **Local investing in Argentina**

The project is intentionally **not** a portfolio tracker, trading terminal, tax calculator, or financial-advice engine. Its purpose is fast recall: when I forget how to buy CSPX in IBKR, what a limit order means, how to read Unrealized P&L, what a CEDEAR is, or how a money-market FCI differs from a caución, I should be able to find the answer in a few seconds.

> **Important:** financial and tax rules can change. The app should show a visible `Last reviewed` date and avoid absolute claims such as “this can never generate a 1042-S”. Prefer wording such as “under the structure/rules reviewed on the stated date, this normally does not create a direct U.S.-source dividend/interest payment to the account holder.”

---

## Product goals

### Primary goals

- Provide a **quick monthly checklist** for buying CSPX through IBKR.
- Keep **IBKR/international** and **Argentina/local** investing clearly separated in the UI.
- Explain unfamiliar terminology in plain Spanish.
- Document the rationale behind the current long-term ETF choices.
- Make it easy to identify which instruments fit the current objective of minimizing direct U.S.-source income that may lead to Form 1042-S reporting.
- Explain how to interpret IBKR portfolio values such as Market Value, Cost Basis, Unrealized P&L, Realized P&L, Cash, and Net Liquidation.
- Provide a concise reference for CEDEARs, FCI, money-market funds, and cauciones in Argentina.
- Support **light and dark mode** using semantic design tokens so the visual design can be changed centrally.

### Non-goals

- No brokerage integration.
- No live prices.
- No authentication.
- No database.
- No user accounts.
- No automatic tax calculations.
- No trade recommendations based on current market prices.
- No prediction engine.

All content is static and should be easy to edit in source-controlled data files.

---

# Technology

Use a deliberately small frontend stack:

- **Vite**
- **React**
- **TypeScript**
- **React Router**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React** for icons
- **Vercel** free tier for deployment

The component library the project should use is **shadcn/ui**. It works well for this use case because its components are added to the project source rather than hidden behind a large runtime abstraction, it integrates directly with Tailwind, and its theming model already uses semantic CSS variables such as `--primary`, `--secondary`, `--muted`, `--background`, and corresponding foreground tokens.

For this simple static app, use React Router in **Declarative Mode**. Data loaders, actions, SSR, and React Router Framework Mode are unnecessary unless the scope grows later.

---

# UX principles

The application is a **reference tool**, not a financial dashboard.

Optimize for:

- fast scanning;
- short pages;
- obvious navigation;
- minimal charts;
- plain-language definitions;
- progressive disclosure;
- strong separation between international and local investing;
- mobile usability;
- no information overload.

Avoid a dense Bloomberg-like interface.

## Main navigation

Use a persistent top navigation on desktop and a compact mobile navigation on small screens.

Top-level destinations:

- **IBKR**
- **Inversión local**
- **Glosario**

An optional minimal `/` landing page may show three large navigation cards, but it should not duplicate all content.

### Suggested routes

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
/local/bopreal
/local/bonos-soberanos
/glossary
```

The most important route is `/ibkr/buy-cspx`. It should be reachable from the IBKR landing page with one click/tap.

---

# Information architecture

## Area 1 — IBKR / international investing

This area is only about the international portfolio and IBKR mechanics.

### IBKR overview

Show a concise summary:

- Objective: long-term investing.
- Main current instrument: CSPX.
- Strategy: recurring contributions + buy-and-hold.
- Preference: Irish-domiciled, UCITS, accumulating ETFs where appropriate.
- Current concern: avoid unnecessary direct U.S.-source dividend/interest payments that may create Form 1042-S reporting.

Include a disclaimer card explaining that this is a personal reference, not tax advice, and that regulations and broker reporting can change.

---

## CSPX reference

Create a prominent instrument card for CSPX.

### CSPX

**Name**  
iShares Core S&P 500 UCITS ETF

**Ticker used in IBKR**  
`CSPX`

**ISIN**  
`IE00B5BMR087`

**Structure**

- Domicile: Ireland
- UCITS: yes
- Income treatment: accumulating
- Exposure: S&P 500
- Typical listing used here: London Stock Exchange / USD
- Role: long-term core equity holding

### Explanation

CSPX is not “the S&P 500 itself”. The S&P 500 is an index. CSPX is an ETF that seeks to replicate it.

Explain the chain visually in a simple callout:

```text
S&P 500 index
    ↓ tracked by
CSPX ETF
    ↓ purchased through
IBKR
```

### Accumulating ETF

Explain that CSPX is **accumulating**:

- companies in the index may pay dividends;
- the fund receives the income;
- the accumulating share class does not normally distribute that income as cash to the investor;
- the income remains/reinvests within the fund and is reflected economically in the fund's NAV/value.

This is why compounding is not visible as a separate “interest payment” in IBKR.

---

# Form 1042-S reference

This section must be precise and cautious.

## What it is

Form 1042-S is a U.S. reporting form commonly associated with certain U.S.-source payments made to foreign persons, including categories such as dividends and interest.

The app should **never** claim that a given portfolio structure guarantees that IBKR will never issue Form 1042-S.

Instead distinguish between:

1. instruments that normally avoid paying U.S.-source dividends/interest **directly to the account holder** because the investor owns an Irish accumulating fund; and
2. instruments that can create direct U.S.-source income/reporting.

## Current preferred pattern

```text
Investor
  ↓ owns
Irish-domiciled accumulating UCITS ETF
  ↓ fund owns
Underlying securities
```

Examples discussed for this pattern:

| Instrument | Exposure | Domicile | Income | Intended role |
|---|---|---|---|---|
| CSPX | S&P 500 | Ireland | Accumulating | Core U.S. equity |
| CNDX / CSNDX* | Nasdaq-100 | Ireland | Accumulating | Tech/growth tilt |
| XUSE | MSCI World ex USA | Ireland | Accumulating | Developed markets outside U.S. |
| VWRA | FTSE All-World | Ireland | Accumulating | One-fund global portfolio |
| IB01 | U.S. Treasury 0–1y | Ireland | Accumulating | Very short-duration defensive allocation |
| IBTA | U.S. Treasury 1–3y | Ireland | Accumulating | Short-duration defensive allocation |

`*` Always verify the exact share class by **ISIN**, not ticker alone. For the iShares Nasdaq-100 UCITS accumulating share class discussed here, use ISIN `IE00B53SZB19` as the primary identity check.

### Why ISIN matters

A ticker can vary by exchange and currency. The **ISIN uniquely identifies the share class** and is the safest way to verify the intended instrument.

---

## Instruments to review carefully before buying

Use a warning-style card, not a prohibition list.

Examples:

- VOO
- SPY
- IVV
- QQQ
- individual U.S. dividend-paying stocks such as NVDA
- direct U.S. Treasury bills, notes, or bonds
- U.S.-domiciled bond ETFs that distribute income
- remunerated settled cash in IBKR

Reason: these may create direct U.S.-source dividend or interest payments and therefore may have different Form 1042-S reporting implications.

Label the section:

> **Review before buying — not automatically “bad” investments**

The issue is tax/reporting structure, not investment quality.

---

# Monthly CSPX purchase guide

This should be the app's most practical screen.

Use a numbered checklist with compact explanatory accordions.

## 1. Confirm cash availability

Before placing the order, verify that the USD deposit is available for trading.

Relevant terms:

- `Cash`
- `Settled Cash`
- deposit hold / availability date

Do not assume that a deposit visible in the account is necessarily immediately available for trading or withdrawal.

## 2. Search for CSPX

Expected instrument:

```text
CSPX
ISHARES CORE S&P 500
LSEETF
USD
```

Verify:

```text
ISIN: IE00B5BMR087
```

## 3. Prefer regular market hours

Market hours and daylight-saving offsets change during the year.

Do not hard-code one Buenos Aires time permanently as “the correct time”. Instead explain the principle:

- buy while London Stock Exchange is in its regular session;
- when possible, prefer the overlap between London and the U.S. regular session for an S&P 500 ETF;
- re-check London/New York daylight-saving offsets when needed.

A small note may contain the **last reviewed time window**, clearly timestamped, but it must be treated as mutable content.

## 4. Buy by USD amount

IBKR supports fractional quantities for the instrument/account setup used here.

Example workflow:

```text
Buy
→ Quantity unit: USD
→ Enter desired investment amount
```

Leave enough cash for estimated commissions if necessary.

## 5. Use a Limit order

Explain:

### Market order

“Execute as soon as possible at the best currently available price.”

### Limit order

“Buy at the best available price, but never above my maximum limit.”

Example:

```text
Current visible ask: 830
Buy limit: 835
```

This does **not** mean the investor will necessarily pay 835. It means the order must not execute above 835.

## 6. Time in Force

Recommended default for this recurring workflow:

```text
Day
```

Meaning: cancel the unfilled remainder when the trading session ends.

Explain `GTC` separately in the glossary.

## 7. Outside RTH

Recommended default:

```text
Outside RTH: No
```

Meaning: do not execute outside Regular Trading Hours.

## 8. Delayed market data warning

If IBKR shows `Delayed Data`, explain:

- the displayed bid/ask may be delayed;
- the order can still be submitted;
- a Limit order helps cap the maximum purchase price;
- real-time market data can be subscribed to separately if desired.

## 9. Typical IBKR warnings

Explain in collapsible cards:

### Mandatory Cap Price

IBKR may apply an additional internal price cap/floor intended to prevent executions at prices it considers disorderly or too far from the reference market.

### Cash Quantity Order Confirmation

When buying by cash amount rather than an exact number of shares, the final fractional quantity is estimated until execution.

## 10. Confirm execution

Go to:

```text
Trade → Orders & Trades
```

A completed order should show `Filled`.

If one order is filled in multiple pieces, add the fill quantities together to obtain total shares purchased. Use the weighted average fill price for the order's execution price.

For authoritative historical records use:

```text
Performance & Reports → Activity Statement
```

---

# Reading the IBKR portfolio

Create a concise card per metric.

## Shares / Position

Number of ETF shares currently owned. Can include fractional shares.

## Avg. Price

Average acquisition price shown for the position. It can differ from any single fill because multiple purchases are combined.

## Cost Basis

IBKR's cost basis for the currently held position, including relevant cost adjustments and commissions under IBKR's reporting methodology.

## Market Value

Approximate current value of the open position.

Conceptually:

```text
shares × current market price
```

## Unrealized P&L

The best quick answer to:

> “Am I currently up or down on this open investment?”

Conceptually:

```text
Market Value − Cost Basis
```

- Positive = currently profitable on paper.
- Negative = currently at a loss on paper.
- It becomes realized only after selling.

It is not necessarily the exact amount of cash received after selling because the actual sale price, spread, slippage, and selling commission still matter.

## Realized P&L

Gain or loss already crystallized by selling.

## Cash

Uninvested cash balance.

## Settled Cash

Cash whose settlement process has completed and is available according to the account's applicable rules.

## Net Liquidation

The most useful quick approximation for:

> “How much is my entire IBKR account worth right now if all open positions were liquidated around current market values?”

It combines the value of securities and cash, subject to actual execution prices and transaction costs.

---

# Compounding

Explain why compounding still applies even though the investor does not receive a visible interest payment.

For CSPX:

```text
Underlying companies generate earnings/dividends
→ CSPX receives fund income
→ accumulating share class retains/reinvests it internally
→ the economic value remains within the fund
→ future returns act on the enlarged asset base
```

Additionally, each new monthly contribution starts its own long-term compounding period.

Do not present a constant annual return as guaranteed. ETF returns are irregular and can be negative for long periods.

---

# Portfolio alternatives / roles

Explain *role*, not “best ETF”.

## CSPX

Core U.S. equity exposure.

## CNDX / CSNDX

Nasdaq-100 exposure. Useful as a deliberate growth/technology tilt, not as geographic diversification from CSPX. It overlaps heavily with large U.S. technology companies already held in CSPX.

## XUSE

Developed markets excluding the United States. Useful when the goal is genuine geographic diversification away from U.S. equity.

## VWRA

Global all-world solution. Useful for maximum simplicity because one fund already includes U.S., developed ex-U.S., and emerging-market exposure. Combining it with CSPX intentionally overweights the U.S., so the overlap should be understood.

## IB01 / IBTA

Short-duration Treasury exposure through Irish accumulating UCITS wrappers. Useful as defensive/risk-reducing portfolio components or for money with a shorter horizon than equities.

Do not prescribe a fixed allocation. Example allocations such as 80/20 should be clearly labelled illustrative.

---

# Area 2 — Inversión local (Argentina)

This must live in its own navigation area and should not visually imply that local instruments share the same tax/reporting characteristics as IBKR holdings.

## Purpose

Reference for investing surplus ARS that remain in Argentina.

The app should distinguish among:

- long-term / dollar-linked market exposure;
- short-term conservative parking of ARS;
- liquidity needs.

---

# CEDEARs

## Definition

A CEDEAR is a locally traded certificate representing an underlying foreign security. It allows an Argentine investor to gain exposure to foreign companies or ETFs while trading through the local capital market.

The local ARS price is influenced by:

- movement of the underlying foreign asset; and
- the implicit financial exchange rate.

Therefore a CEDEAR is **not** simply a peso-denominated fixed-income instrument.

## CEDEARs discussed in this project

### GLD

Exposure to the SPDR Gold Shares ETF / gold.

Role discussed:

- diversification;
- defensive allocation / store-of-value exposure;
- not equivalent to cash;
- gold can fall or remain flat for long periods.

### QQQ

Exposure to the Invesco QQQ / Nasdaq-100.

Role discussed:

- growth-oriented exposure;
- more volatile;
- overlaps with large U.S. technology holdings already present through CSPX.

### Local ticker variants

Explain the convention conceptually:

- base ticker, e.g. `GLD` / `QQQ`: local ARS trading line;
- `D` suffix: local USD/MEP trading line where applicable;
- `C` suffix: cable / external-dollar line where applicable.

Exact availability and market conventions can change, so the broker screen is authoritative at transaction time.

## Bid / Ask / Spread

Reuse the same glossary concepts as IBKR.

For less-liquid CEDEARs, a wide spread can cost more than a small difference in broker commission.

Prefer limit orders when price control matters.

---

# FCI — Fondos Comunes de Inversión

## Definition

An FCI pools money from multiple investors and invests according to a defined mandate. Investors own fund units (`cuotapartes`) rather than directly choosing every security held by the fund.

## Santander Super Ahorro

Use this as the concrete example already used personally.

Explain it as a conservative / money-market-style parking vehicle for ARS rather than a direct competitor to QQQ or GLD.

Typical use case:

- ARS not needed immediately;
- high liquidity desired;
- lower volatility than equity CEDEARs;
- expectation of short-term yield rather than aggressive long-term capital growth.

Do not hard-code current yield; it changes over time.

---

# Cauciones bursátiles

## Definition

A caución is essentially a short-term secured lending transaction in the local capital market.

Conceptually:

```text
Investor has ARS available
→ places cash in a caución for N days
→ borrower receives financing and provides eligible collateral
→ at maturity investor receives principal + agreed interest
```

The investor providing the money is the **colocador**. The party receiving financing is the **tomador**.

## Compared with a money-market FCI

| Money-market FCI | Caución |
|---|---|
| Fund manager invests for you | You place the transaction directly through the market/broker |
| Liquidity based on fund rules | Fixed selected term |
| Yield changes through fund portfolio | Rate known when the caución is placed |
| Simpler operationally | More manual/control |
| Diversified portfolio | One secured market transaction |

A money-market FCI may itself use cauciones as part of its underlying portfolio.

---

# Plazo fijo vs FCI vs CEDEAR vs USD

Do not rank these universally. Explain their different roles.

## Peso cash

Highest liquidity but generally poor for idle savings in an inflationary environment because it earns no return.

## Plazo fijo

Known nominal rate for a fixed term, but remains exposed to ARS inflation/devaluation and sacrifices liquidity during the term.

## Money-market FCI

Useful for short-term conservative parking and liquidity.

## CEDEAR

Market-risk asset. Useful for foreign-asset exposure and longer horizons, but not guaranteed to preserve value over a specific short period.

## Buying USD

Currency hedge / liquidity in dollars, not automatically an investment. Holding USD protects against ARS devaluation but has opportunity cost and USD inflation.

---

# Glossary

Implement as a searchable alphabetical list. Definitions should remain short and plain-language.

Seed it with at least:

- Accumulating ETF
- Ask
- Bid
- Buy and hold
- CAPE / Shiller CAPE
- Cash
- Caución bursátil
- CEDEAR
- Cost Basis
- DCA / recurring investing
- Dividend
- ETF
- FCI
- Fill
- GTC
- Hedge
- Hedge fund
- Index
- ISIN
- Limit order
- Long
- Margin
- Market order
- Market Value
- Money market
- Nasdaq-100
- Net Liquidation
- Outside RTH
- P&L
- Realized P&L
- RTH
- S&P 500
- Settled Cash
- Short
- Spread
- TNA
- Time in Force
- Trust
- UCITS
- Unrealized P&L
- W-8BEN
- 1042-S

The glossary must be accessible globally from the primary navigation.

---

## Visual References

The application includes real screenshots from Interactive Brokers and local Argentine investment platforms. These images are intended as contextual help for concepts and workflows that are easier to understand visually.

Screenshots must complement the written explanation, not replace it.

### Asset location

Screenshots should be stored under:

```text
public/screenshots/
  ibkr/
    buy-cspx-order-ticket.png
    buy-cspx-order-submitted.png
    portfolio-position-metrics.png
    account-balances.png
    activity-statement-cspx.png
    cspx-position-details.png

  local/
    cedears-gld-qqq.jpg
```

### IBKR screenshots

#### `buy-cspx-order-ticket.png`

Use in the **How to buy CSPX** guide.

It should help explain:

- selecting CSPX
- specifying quantity as USD
- using a Limit Order
- setting Time in Force to `Day`
- keeping `Outside RTH` disabled
- understanding that the limit price is the maximum acceptable price per share
- reviewing the order before submission

#### `buy-cspx-order-submitted.png`

Use after the order-entry explanation to show what a submitted CSPX order looks like.

It may be used when explaining:

- order status
- limit price
- submitted quantity
- pending versus filled orders

#### `portfolio-position-metrics.png`

Use in **Understanding your portfolio**.

This is the primary screenshot for explaining:

- Position / shares
- Average Price
- Cost Basis
- Market Value
- Daily P&L
- Unrealized P&L

It should visually reinforce the explanation that:

> Unrealized P&L indicates approximately how much the open position is currently above or below its cost basis.

#### `account-balances.png`

Use in **Account balances** or **How much is my account worth?**

Use it to explain:

- Net Liquidation
- Cash
- Settled Cash
- Unsettled Cash
- Buying Power
- Available Funds

The most important concept to emphasize is:

> Net Liquidation is the approximate current value of the entire brokerage account, including investments and cash.

#### `activity-statement-cspx.png`

Use in the section explaining **Activity Statements** and historical verification of trades.

It should help users identify:

- executed trades
- commissions
- quantity
- execution price
- security information
- CSPX ISIN
- exchange/listing information

Activity Statements should be described as the preferred historical record for confirming executed transactions.

#### `cspx-position-details.png`

Use as an optional secondary visual in the portfolio section.

It can reinforce the relationship between:

- shares held
- average purchase price
- cost basis
- market value
- unrealized P&L

Avoid displaying it if `portfolio-position-metrics.png` already communicates the same concept clearly on the same screen.

### Local investment screenshots

#### `cedears-gld-qqq.jpg`

Use in:

```text
Local Investing → CEDEARs
```

It serves as a concrete example of a local Argentine brokerage portfolio containing CEDEAR positions such as:

- GLD
- QQQ

The screenshot should be accompanied by an explanation that CEDEARs are locally traded certificates representing foreign assets and that their ARS price is influenced both by the underlying asset and the relevant financial exchange rate.

### Screenshot UX

Screenshots should not dominate pages.

Prefer:

- a small preview
- a `View example` or `See IBKR example` action
- opening the full screenshot in a shadcn/ui `Dialog`

On mobile, screenshots must remain readable and scrollable or zoomable when appropriate.

Screenshots are examples of the UI at a particular point in time. IBKR and other financial platforms may change their interfaces, so explanatory text must not depend on exact button placement.

# Visual design

## General style

Aim for a calm reference/documentation UI rather than a trading terminal.

Suggested characteristics:

- generous whitespace;
- max content width around 1100–1200px;
- readable typography;
- cards only when they improve grouping;
- avoid excessive gradients;
- avoid financial red/green everywhere;
- use red/green primarily for semantic profit/loss or warnings/success;
- mobile-first responsive layout.

## Semantic tokens

Never hard-code primary UI colors throughout components such as `bg-blue-600` or `text-zinc-900` unless the color has a very specific semantic role.

Use shadcn/Tailwind semantic classes:

```text
bg-background
text-foreground
bg-card
text-card-foreground
bg-primary
text-primary-foreground
bg-secondary
text-secondary-foreground
bg-muted
text-muted-foreground
bg-accent
border-border
text-destructive
```

Theme values must live centrally in the global CSS using `:root` and `.dark` variables.

Use the shadcn token model, including pairs such as:

```css
--background
--foreground
--card
--card-foreground
--primary
--primary-foreground
--secondary
--secondary-foreground
--muted
--muted-foreground
--accent
--accent-foreground
--destructive
--border
--input
--ring
--radius
```

If additional semantic states are needed, add tokens such as:

```css
--success
--success-foreground
--warning
--warning-foreground
--info
--info-foreground
```

Expose them to Tailwind through the current Tailwind/shadcn theme mechanism. This allows a future visual redesign to happen primarily by editing tokens rather than individual components.

## Dark mode

Support:

- Light
- Dark
- System

Persist the user's choice in local storage.

Use the `.dark` class strategy recommended by shadcn/ui for Vite.

---

# Suggested shadcn/ui components

Keep the component set small:

- `Button`
- `Card`
- `Badge`
- `Alert`
- `Accordion`
- `Tabs` where useful inside a section, not as a replacement for top-level routing
- `Separator`
- `Input`
- `Table`
- `Tooltip`
- `DropdownMenu`
- `Sheet` for mobile navigation

Potentially add `Command` later for a global quick-search palette, but do not make it necessary for v1.

---

# Suggested source structure

```text
src/
  app/
    router.tsx
    AppShell.tsx
  components/
    layout/
      Header.tsx
      MobileNav.tsx
      PageHeader.tsx
      SectionNav.tsx
      ThemeToggle.tsx
    reference/
      DefinitionCard.tsx
      InstrumentCard.tsx
      MetricCard.tsx
      RiskNotice.tsx
      StepList.tsx
      QuickFacts.tsx
    ui/
      ...shadcn components
  data/
    ibkr/
      instruments.ts
      buying-cspx.ts
      portfolio-metrics.ts
      tax-reporting.ts
    local/
      cedears.ts
      fci.ts
      cauciones.ts
    glossary.ts
  pages/
    HomePage.tsx
    ibkr/
      IbkrHomePage.tsx
      CspxPage.tsx
      AlternativesPage.tsx
      BuyCspxPage.tsx
      PortfolioPage.tsx
      TaxReportingPage.tsx
    local/
      LocalHomePage.tsx
      CedearsPage.tsx
      FciPage.tsx
      CaucionesPage.tsx
    GlossaryPage.tsx
    NotFoundPage.tsx
  lib/
    utils.ts
  styles/
    globals.css
  main.tsx
```

Prefer structured content in `src/data` over embedding large blocks of finance copy directly inside page JSX.

---

# Suggested data model

Example instrument definition:

```ts
export type InstrumentRiskFlag =
  | "equity-risk"
  | "duration-risk"
  | "direct-us-income-review"
  | "overlap-risk"

export interface InstrumentReference {
  symbol: string
  name: string
  isin?: string
  domicile?: string
  accumulating?: boolean
  ucits?: boolean
  exposure: string
  role: string
  notes: string[]
  riskFlags: InstrumentRiskFlag[]
  lastReviewed: string
}
```

Do not encode an oversimplified boolean such as:

```ts
neverGenerates1042S: true
```

That would imply certainty that the app cannot support.

Prefer something like:

```ts
taxReporting: {
  directUsIncomeProfile: "normally-no-direct-distribution",
  reviewNote: "Irish accumulating UCITS structure; rules and broker reporting can change."
}
```

---

# Installation

Recommended setup with current Tailwind/shadcn tooling:

```bash
npm create vite@latest investment-reference -- --template react-ts
cd investment-reference
npm install
npm install react-router
npm install tailwindcss @tailwindcss/vite
npm install lucide-react
npx shadcn@latest init
```

Configure the Tailwind Vite plugin and `@/*` alias according to the current official Vite/shadcn documentation rather than copying an old Tailwind v3 setup.

Add required shadcn components individually, for example:

```bash
npx shadcn@latest add button card badge alert accordion separator input table tooltip dropdown-menu sheet
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

---

# Vercel deployment

This is a Vite SPA.

Vercel supports Vite deployments directly. Connect the Git repository or deploy with the Vercel CLI.

Expected build configuration:

```text
Build command: npm run build
Output directory: dist
```

Because React Router uses client-side routes, ensure direct navigation/refresh of nested SPA routes resolves to `index.html`.

Add `vercel.json` if required by the deployment configuration:

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

Verify routes such as `/ibkr/buy-cspx` by opening them directly in a new browser tab after deployment.

---

# Content maintenance

## Reference additions reviewed 2026-11-21

- Local guides: BOPREAL Serie 1 (USD amortization versus optional holder redemption in ARS at A3500) and sovereign bonds, with credit/liquidity risks and glossary-linked terminology.
- ETF alternatives: CNDX for the USD LSE listing, Irish SMH UCITS and SEMI, ticker-collision warning, and the daily leverage distinction for TQQQ.
- Existing CSPX and CEDEAR sections: internal accumulation versus cash/species distributions, including the historical IOL crediting reference. Internal accumulation does not normally add investor shares.
- Glossary: bond terms, market direction and sentiment, distributions, and clearer Bid/Ask/Spread examples.

Sources and review dates live with the structured data. Market availability, prices, yields, FX rates, fees and event-specific dividend conditions must be checked at transaction time; no live data is fetched.

Development checks:

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

`lint` uses Oxlint (development-only); `typecheck` uses the project's TypeScript compiler. No runtime/UI dependencies were added for these topics.

Every page containing potentially changing financial/tax facts should display:

```text
Last reviewed: YYYY-MM-DD
```

Content that should be periodically verified:

- ETF domicile
- accumulating/distributing status
- ISIN
- ticker/listing
- TER
- broker market-hours behavior
- market-data subscriptions
- IBKR reporting rules
- Form 1042-S documentation
- local broker ticker conventions
- FCI characteristics
- Argentine market/regulatory rules

Do not hard-code yields, exchange rates, current ETF prices, commissions, or political/macroeconomic forecasts into evergreen explanatory copy.

---

# Testing expectations

Minimum tests for v1:

- routes render without errors;
- top-level IBKR/local separation is preserved;
- theme can switch light/dark/system;
- glossary search/filter works;
- instrument cards render expected identity fields;
- CSPX checklist renders every required step;
- SPA deep-linking is manually tested after Vercel deployment.

Use Vitest + React Testing Library only where it adds value. Do not over-test static prose.

---

# Accessibility

- semantic headings in logical order;
- keyboard-accessible navigation;
- visible focus states;
- sufficient contrast in both themes;
- never rely only on red/green to communicate gain/loss;
- icons must have text labels or accessible names when interactive;
- glossary search must have a visible label or accessible label.

---

# v1 acceptance criteria

The first production version is complete when:

1. The app deploys to Vercel and nested routes work on direct refresh.
2. Light, dark, and system modes work.
3. IBKR and local investing are visibly separate top-level areas.
4. `/ibkr/buy-cspx` gives a complete recurring purchase checklist.
5. CSPX identity is documented with ISIN `IE00B5BMR087`.
6. The IBKR alternatives page documents CSPX, CNDX/CSNDX, XUSE, VWRA, IB01, and IBTA by role.
7. A warning section identifies U.S.-domiciled/direct-income instruments that require 1042-S review.
8. Portfolio metrics explain Market Value, Cost Basis, Unrealized P&L, Realized P&L, Cash, Settled Cash, and Net Liquidation.
9. The local area explains CEDEARs, GLD, QQQ, FCI/Super Ahorro, and cauciones.
10. The glossary is searchable and contains the terminology listed above.
11. Styling uses semantic theme tokens rather than repeated hard-coded colors.
12. Changing `--primary`, `--secondary`, surfaces, foregrounds, and radius tokens noticeably redesigns the application without requiring page-by-page CSS changes.

