import type { Review } from "../types";

export const boprealReview: Review = {
  lastReviewed: "2026-11-21",
  sources: [
    {
      label: "BCRA · Condiciones de Serie 1 y separación A/B/C/D (B 12730)",
      url: "https://www.bcra.gob.ar/archivos/Pdfs/comytexord/B12730.pdf",
    },
    {
      label: "BCRA · Guía para importadores y contexto de BOPREAL",
      url: "https://www.bcra.gob.ar/bopreal-guia-para-importadores/",
    },
    {
      label: "BCRA · Condiciones de emisión Serie 1 (B 12697)",
      url: "https://www.bcra.gob.ar/archivos/Pdfs/comytexord/B12697.pdf",
    },
  ],
};

interface BoprealSeries {
  series: string;
  maturity: string;
  normalCurrency: "USD";
  holderRedemptionFrom: string | null;
  redemptionCurrency: string;
}
export const boprealSeries: BoprealSeries[] = [
  {
    series: "1A",
    maturity: "2027-10-31",
    normalCurrency: "USD",
    holderRedemptionFrom: "2025-04-30",
    redemptionCurrency: "ARS al A3500 aplicable",
  },
  {
    series: "1B",
    maturity: "2027-10-31",
    normalCurrency: "USD",
    holderRedemptionFrom: "2026-04-30",
    redemptionCurrency: "ARS al A3500 aplicable",
  },
  {
    series: "1C",
    maturity: "2027-10-31",
    normalCurrency: "USD",
    holderRedemptionFrom: "2027-04-30",
    redemptionCurrency: "ARS al A3500 aplicable",
  },
  {
    series: "1D",
    maturity: "2027-10-31",
    normalCurrency: "USD",
    holderRedemptionFrom: null,
    redemptionCurrency: "No aplica",
  },
];
export const boprealFacts = [
  {
    title: "Qué significa",
    description:
      "BOPREAL: Bonos para la Reconstrucción de una Argentina Libre. Los emitió el BCRA, no el Tesoro Nacional, inicialmente en el contexto de deudas comerciales de importadores.",
  },
  {
    title: "Cómo se accede",
    description:
      "Pueden negociarse en el mercado secundario. Un inversor puede comprarlos por un broker local como IOL si la especie está disponible y cumple los requisitos vigentes; no es lo mismo que la suscripción original para importadores.",
  },
];
export const bondExitChoices = [
  {
    title: "Vender antes del vencimiento",
    description:
      "Necesitás liquidez y una contraparte. Aceptás el precio de mercado, que puede ser mayor o menor que tu costo o el valor nominal, más los costos de operación.",
  },
  {
    title: "Mantener hasta los pagos contractuales",
    description:
      "Esperás las amortizaciones y demás pagos previstos, siempre que el emisor cumpla. Mantener el bono no transforma una promesa contractual en dinero garantizado.",
  },
];
export const boprealRisk =
  "BOPREAL no equivale a tener USD en efectivo. Tiene riesgo crediticio argentino/BCRA, regulatorio, de precio y de liquidez. Antes del vencimiento puede subir o bajar. Un pago futuro depende del cumplimiento del emisor; un default, una reestructuración o un reperfilamiento no son imposibles por la ideología del gobierno de turno.";

export const sovereignReview: Review = {
  lastReviewed: "2026-11-21",
  sources: [
    {
      label: "Ministerio de Economía · Emisión de AL30 y AL35",
      url: "https://www.argentina.gob.ar/normativa/nacional/resoluci%C3%B3n-61-2020-344092/texto",
    },
    {
      label: "Ministerio de Economía · AL30 y GD30",
      url: "https://www.argentina.gob.ar/normativa/nacional/norma-414311/texto",
    },
    {
      label: "Investor.gov · Precio, cupón y rendimiento al vencimiento",
      url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/what-are",
    },
    {
      label: "Investor.gov · Tasas, precios y riesgo de bonos",
      url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-86",
    },
  ],
};
export const sovereignFacts = [
  {
    title: "Deuda del gobierno nacional",
    description:
      "Comprar un bono soberano significa financiar al Estado bajo un cronograma contractual. Puede pagar intereses (cupones) y devolver capital (amortización) en una o varias fechas.",
  },
  {
    title: "Ejemplos argentinos",
    description:
      "AL30, GD30, AL35 y GD35 son ejemplos, no recomendaciones. Pueden cotizar antes del vencimiento a un precio superior o inferior al valor nominal.",
  },
];
export const sovereignTermIds = [
  "price",
  "nominal-value",
  "coupon",
  "amortization",
  "maturity",
  "yield",
  "tir",
];

export function bondDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
