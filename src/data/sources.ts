import type { Review } from "./types";
export const reviewed = "2026-11-14";
export const cspxSource = {
  label: "iShares · CSPX",
  url: "https://www.ishares.com/uk/individual/en/products/253743/ishares-core-s-p-500-ucits-etf-cspx",
};
export const buyingReview: Review = {
  lastReviewed: reviewed,
  sources: [
    {
      label: "IBKR · Órdenes por importe",
      url: "https://www.interactivebrokers.com/support/faq/content/use-cash-amount-submit-stock-81629744",
    },
    {
      label: "IBKR · Efectivo adicional en Cash Quantity",
      url: "https://www.interactivebrokers.com/support/faq/content/cash-quantity-order-fractional-share-88583071",
    },
    {
      label: "IBKR · Limit order",
      url: "https://www.ibkrguides.com/traderworkstation/order-types.htm",
    },
    {
      label: "IBKR · Tipos de estados de cuenta",
      url: "https://www.ibkrguides.com/clientportal/performanceandstatements/typestatement.htm",
    },
    {
      label: "IBKR · Advertencias del ticket de órdenes",
      url: "https://www.interactivebrokers.com/docs/web-api/trading/orders/suppressible-message-i-ds",
    },
    {
      label: "IBKR · Controles de precio",
      url: "https://www.interactivebrokers.com/support/faq/content/disclosure-regarding-price-cap-notices-1169377631",
    },
    cspxSource,
  ],
};
export const portfolioReview: Review = {
  lastReviewed: reviewed,
  sources: [
    {
      label: "IBKR · Guía de informes",
      url: "https://www.ibkrguides.com/reportingreference/reportguide/reportingoverview.htm",
    },
  ],
};
export const taxReview: Review = {
  lastReviewed: reviewed,
  sources: [
    {
      label: "IRS · Instrucciones de Form 1042-S",
      url: "https://www.irs.gov/instructions/i1042s",
    },
    {
      label: "IRS · Ingresos de fuente extranjera",
      url: "https://www.irs.gov/individuals/international-taxpayers/foreign-source-income-form-1042-s-reporting-not-required",
    },
    cspxSource,
  ],
};
export const localReview: Review = {
  lastReviewed: reviewed,
  sources: [
    {
      label: "BYMA · CEDEARs",
      url: "https://www.byma.com.ar/productos/productos-financieros/cedears",
    },
    {
      label: "BYMA · Caución",
      url: "https://www.byma.com.ar/productos/productos-financieros/caucion",
    },
    {
      label: "Santander · Información de Superfondos",
      url: "https://www.santander.com.ar/personas/inversiones/informacion-fondos",
    },
    {
      label: "Santander · Comparador de fondos",
      url: "https://www.santander.com.ar/comparador-superfondos",
    },
  ],
};
export const taxDisclaimer =
  "Referencia personal, no asesoramiento financiero ni impositivo. La estructura del instrumento no garantiza un resultado fiscal ni que IBKR nunca emita un 1042-S. Las normas, tu situación y los reportes del broker pueden cambiar; revisá el caso con un profesional.";
