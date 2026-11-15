import type { Review } from "../types";
import { taxReview } from "../sources";

interface AlternativeGroup {
  id: string;
  title: string;
  description: string;
  symbols: string[];
}

export const alternativeGroups: AlternativeGroup[] = [
  {
    id: "equity-core",
    title: "Acciones: núcleo y diversificación",
    description:
      "CSPX concentra la exposición en EE. UU.; XUSE agrega mercados desarrollados fuera de EE. UU.; VWRA reúne exposición global en un solo fondo.",
    symbols: ["CSPX", "XUSE", "VWRA"],
  },
  {
    id: "nasdaq-100",
    title: "Nasdaq-100: CNDX / CSNDX",
    description:
      "Sí, Nasdaq-100 está entre las alternativas. CNDX / CSNDX es la clase UCITS acumulativa de iShares documentada aquí; Nasdaq-100 es el índice y el ETF es el instrumento que comprás. No es el Nasdaq Composite.",
    symbols: ["CNDX / CSNDX"],
  },
  {
    id: "treasuries",
    title: "Treasuries mediante ETFs: IB01 e IBTA",
    description:
      "Los Treasuries son deuda del gobierno de EE. UU. Estos fondos permiten tener exposición a una cartera de esos bonos mediante participaciones de un ETF, sin comprar cada bono directamente.",
    symbols: ["IB01", "IBTA"],
  },
];

export const nasdaqNotes = [
  "Su rol es aumentar el sesgo hacia grandes empresas de crecimiento y tecnología. Comparte muchas posiciones con CSPX; sumarlo aumenta ese peso y no aporta por sí solo diversificación geográfica.",
  "QQQ también ofrece exposición al Nasdaq-100, pero su estructura estadounidense es distinta de la clase irlandesa acumulativa CNDX / CSNDX. Verificá el ISIN IE00B53SZB19, además de bolsa y moneda.",
];

export const treasuryNotes = [
  "IB01 mantiene exposición a vencimientos de 0–1 año; IBTA, de 1–3 años. El vencimiento de los bonos no es un vencimiento de tu participación: el fondo mantiene y renueva una cartera.",
  "Duración es la sensibilidad del precio a cambios de tasas. En general, IBTA es más sensible que IB01. Pueden cumplir un rol defensivo frente a acciones, pero no equivalen a efectivo ni garantizan capital o una tasa de retorno.",
  "Al vender el ETF dependés de su precio de mercado, del spread y de los costos de operación. No es lo mismo que comprar un bono individual y esperar a su vencimiento.",
];

export const treasuryReporting = {
  title: "Por qué una clase irlandesa acumulativa para esta exposición",
  paragraphs: [
    "En IB01 e IBTA sos titular de un ETF UCITS domiciliado en Irlanda; el fondo es quien mantiene los Treasuries y recibe sus intereses. La clase acumulativa retiene esos ingresos dentro del fondo en lugar de distribuirlos como efectivo a tu cuenta.",
    "El objetivo de la estructura revisada es reducir la recepción directa de rentas de fuente estadounidense que podrían generar reportes 1042-S. Comprar cualquier ETF de bonos no produce el mismo resultado: importan domicilio y clase acumulativa.",
    "Esto no garantiza que IBKR nunca emita un 1042-S ni elimina obligaciones fiscales locales. Si comprás Treasuries directamente, revisá las reglas y excepciones de cada pago: que no haya retención no implica necesariamente que no haya reporte.",
  ],
  lastReviewed: "2026-11-15",
  sources: taxReview.sources,
} satisfies Review & { title: string; paragraphs: string[] };
