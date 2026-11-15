import type { Review } from "../types";

export const marketSessions = {
  london: {
    timeZone: "Europe/London",
    openHour: 8,
    openMinute: 0,
    closeHour: 16,
    closeMinute: 30,
  },
  newYork: {
    timeZone: "America/New_York",
    openHour: 9,
    openMinute: 30,
    closeHour: 16,
    closeMinute: 0,
  },
} as const;

export const marketHoursReview: Review = {
  lastReviewed: "2026-11-15",
  sources: [
    {
      label: "LSE · Negociación de ETFs y sesión continua",
      url: "https://docs.londonstockexchange.com/sites/default/files/documents/Exchange%20Traded%20Funds%20-%20Introducing%20and%20Operating%20ETFs%20in%20the%20UK%20%28002%29_0.pdf",
    },
    {
      label: "NYSE · Horarios, feriados y cierres anticipados",
      url: "https://www.nyse.com/trade/hours-calendars",
    },
    {
      label: "LSE · Calendario de negociación",
      url: "https://www.londonstockexchange.com/en/resources/markets-products/business-days",
    },
  ],
};

export const marketHoursNotes = [
  "Para este flujo, buscá la sesión regular de Londres. La coincidencia con la sesión de EE. UU. permite que también se negocien las acciones subyacentes de CSPX; es una referencia operativa, no una predicción de precios.",
  "La apertura de Londres o de EE. UU. puede incorporar noticias y ajustes de precio. No hace falta comprar en el primer minuto: observá Bid, Ask y Spread, revisá si los datos están demorados y usá tu precio máximo con Limit.",
  "Ninguna franja garantiza un precio más bajo, ausencia de saltos o ejecución. Mantener Outside RTH = No evita habilitar ejecuciones fuera de sesión regular, pero no elimina volatilidad dentro de ella.",
  "Londres y Nueva York cambian la hora en fechas distintas. La conversión usa la fecha elegida y las reglas horarias del navegador, en vez de fijar una hora permanente en Buenos Aires.",
];
