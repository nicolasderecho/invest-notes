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
    symbol: "CNDX / CSNDX",
    name: "iShares NASDAQ 100 UCITS ETF",
    isin: "IE00B53SZB19",
    exposure: "Nasdaq-100",
    role: "Sesgo hacia crecimiento y tecnología",
    listing: "Según ticker y mercado",
    currency: "Según cotización",
    notes: [
      "Se superpone con muchas empresas de CSPX. No aporta por sí solo diversificación geográfica.",
      "El ticker cambia según la bolsa. Confirmá siempre clase e ISIN.",
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
];
export const cspx = instruments[0];
