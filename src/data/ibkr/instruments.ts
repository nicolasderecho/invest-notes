import type { Instrument } from "../types";
import { cspxSource, reviewed } from "../sources";
const common = {
  domicile: "Irlanda",
  income: "Accumulating",
  ucits: true,
  lastReviewed: reviewed,
  taxReporting: {
    directUsIncomeProfile: "Normalmente sin distribución directa al titular",
    reviewNote:
      "La clase acumulativa retiene ingresos dentro del fondo. Esto no garantiza ausencia de reportes ni elimina impuestos dentro del fondo o en tu jurisdicción.",
  },
};
export const instruments: Instrument[] = [
  {
    ...common,
    symbol: "CSPX",
    name: "iShares Core S&P 500 UCITS ETF",
    isin: "IE00B5BMR087",
    exposure: "S&P 500",
    role: "Núcleo de acciones de EE. UU.",
    listing: "London Stock Exchange",
    currency: "USD",
    notes: [
      "Renta variable: su valor puede bajar, incluso durante períodos largos.",
      "Domicilio irlandés, cotización en Londres y exposición estadounidense son cosas distintas.",
    ],
    sources: [cspxSource],
  },
  {
    ...common,
    symbol: "CNDX",
    lastReviewed: "2026-11-21",
    name: "iShares NASDAQ 100 UCITS ETF",
    isin: "IE00B53SZB19",
    exposure: "Nasdaq-100",
    role: "Sesgo hacia crecimiento y tecnología",
    listing: "London Stock Exchange",
    currency: "USD",
    replication: "Física",
    ter: "≈ 0,30% anual",
    notes: [
      "Se superpone con muchas empresas de CSPX. No aporta por sí solo diversificación geográfica.",
      "CNDX es el ticker de la cotización USD en Londres. CSNDX puede identificar la misma clase en otro mercado o proveedor de datos: verificá el ISIN, no solo las letras.",
    ],
    sources: [
      {
        label: "iShares · Nasdaq-100",
        url: "https://www.ishares.com/uk/individual/en/products/253741/ishares-nasdaq-100-ucits-etf",
      },
    ],
  },
  {
    ...common,
    symbol: "XUSE",
    name: "iShares MSCI World ex-USA UCITS ETF",
    isin: "IE000R4ZNTN3",
    exposure: "Mercados desarrollados sin EE. UU.",
    role: "Diversificación geográfica",
    listing: "Verificar mercado elegido",
    currency: "Según cotización",
    notes: [
      "No incluye mercados emergentes. Sigue teniendo riesgo accionario.",
      "La moneda de cotización no determina la exposición cambiaria de las empresas.",
    ],
    sources: [
      {
        label: "iShares · XUSE",
        url: "https://www.ishares.com/uk/individual/en/literature/fact-sheet/xuse-ishares-msci-world-ex-usa-ucits-etf-fund-fact-sheet-en-gb.pdf",
      },
    ],
  },
  {
    ...common,
    symbol: "VWRA",
    name: "Vanguard FTSE All-World UCITS ETF",
    isin: "IE00BK5BQT80",
    exposure: "Acciones globales, desarrolladas y emergentes",
    role: "Solución global en un solo fondo",
    listing: "London Stock Exchange",
    currency: "USD",
    notes: [
      "Ya incluye EE. UU. Combinarlo con CSPX aumenta deliberadamente el peso estadounidense.",
      "Global no significa libre de caídas.",
    ],
    sources: [
      {
        label: "Vanguard · FTSE All-World Acc",
        url: "https://www.vanguard.co.uk/professional/product/etf/equity/9679/ftse-all-world-ucits",
      },
    ],
  },
  {
    ...common,
    symbol: "IB01",
    lastReviewed: "2026-11-15",
    name: "iShares $ Treasury Bond 0-1yr UCITS ETF",
    isin: "IE00BGSF1X88",
    exposure: "Treasuries de EE. UU., vencimientos de 0–1 año",
    role: "Bonos de duración muy corta",
    listing: "London Stock Exchange",
    currency: "USD",
    notes: [
      "Menor sensibilidad a tasas que bonos más largos; no equivale a efectivo garantizado.",
      "El rendimiento cambia y existen costos y riesgo de mercado.",
    ],
    sources: [
      {
        label: "iShares · IB01",
        url: "https://www.ishares.com/uk/individual/en/products/307243/ishares-treasury-bond-0-1yr-ucits-etf-ib01",
      },
    ],
  },
  {
    ...common,
    symbol: "IBTA",
    lastReviewed: "2026-11-15",
    name: "iShares $ Treasury Bond 1-3yr UCITS ETF",
    isin: "IE00BYXPSP02",
    exposure: "Treasuries de EE. UU., vencimientos de 1–3 años",
    role: "Bonos de duración corta",
    listing: "London Stock Exchange",
    currency: "USD",
    notes: [
      "Mayor sensibilidad a tasas que IB01. Puede perder valor si suben las tasas.",
      "Comprar el ETF no es lo mismo que tener un Treasury individual hasta su vencimiento.",
    ],
    sources: [
      {
        label: "iShares · IBTA",
        url: "https://www.ishares.com/uk/individual/en/products/287340/ishares-treasury-bond-1-3yr-ucits-etf-ibta",
      },
    ],
  },
  {
    ...common,
    symbol: "SMH UCITS",
    name: "VanEck Semiconductor UCITS ETF",
    isin: "IE00BMC38736",
    domicile: "Irlanda",
    exposure: "Semiconductores",
    role: "Exposición sectorial concentrada",
    listing: "London Stock Exchange · ticker SMH",
    currency: "USD",
    replication: "Física (replicación completa)",
    ter: "≈ 0,35% anual",
    lastReviewed: "2026-11-21",
    notes: [
      "Reinvestment / acumulación, sin distribución regular: reinvierte dentro del fondo.",
      "SMH también identifica un ETF de VanEck domiciliado en EE. UU. Mismo ticker no significa misma estructura jurídica; confirmá nombre, bolsa, domicilio e ISIN IE00BMC38736.",
      "Concentra el riesgo en semiconductores y se superpone con empresas de CSPX/CNDX. No reemplaza el rol de un núcleo diversificado.",
    ],
    sources: [
      {
        label: "VanEck · SMH UCITS: estructura y acumulación",
        url: "https://www.vaneck.com/uk/en/investments/semiconductor-etf/holdings/",
      },
      {
        label: "VanEck · SMH UCITS: ISIN y cotizaciones",
        url: "https://www.vaneck.com/uk/en/library/fact-sheets/smh-fact-sheet.pdf",
      },
      {
        label: "VanEck · SMH estadounidense (otro fondo)",
        url: "https://www.vaneck.com/us/en/investments/semiconductor-etf-smh/overview/",
      },
    ],
  },
  {
    ...common,
    symbol: "SEMI",
    name: "iShares MSCI Global Semiconductors UCITS ETF",
    isin: "IE000I8KRLL9",
    exposure: "Semiconductores globales y equipamiento",
    role: "Canasta sectorial más amplia",
    listing: "London Stock Exchange",
    currency: "USD",
    replication: "Física",
    lastReviewed: "2026-11-21",
    notes: [
      "Clase irlandesa UCITS acumulativa. Canasta más amplia que SMH UCITS, pero sigue concentrada en un sector.",
      "Las metodologías y ponderaciones son distintas. Más empresas no implica que sea inherentemente mejor ni que elimine el riesgo tecnológico.",
    ],
    sources: [
      {
        label: "iShares · SEMI",
        url: "https://www.ishares.com/uk/individual/en/products/319084/ishares-msci-global-semiconductors-ucits-etf-semi",
      },
    ],
  },
];
export const cspx = instruments[0];
