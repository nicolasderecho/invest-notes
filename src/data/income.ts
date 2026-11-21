import type { Review } from "./types";
import { cspxSource } from "./sources";
export const incomeReview: Review = {
  lastReviewed: "2026-11-21",
  sources: [
    cspxSource,
    {
      label: "IOL · Dividendos y acreditación de CEDEARs",
      url: "https://iol.invertironline.com/User/Articulo?articleId=4405703236507",
    },
    {
      label: "Investor.gov · Ex-dividend y fecha de registro",
      url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/ex-dividend-dates-when-are-you-entitled-stock-and",
    },
    {
      label: "BYMA · CEDEARs",
      url: "https://www.byma.com.ar/productos/productos-financieros/cedears",
    },
    {
      label: "Comafi · Ratios y dividendos de CEDEARs",
      url: "https://www.comafi.com.ar/custodiaglobal/Programas-CEDEARs-2483.note.aspx",
    },
    {
      label: "Comafi · Cargos del depositario",
      url: "https://www.comafi.com.ar/custodiaglobal/comisiones.aspx",
    },
  ],
};
export const accumulatingFlow = [
  "Las empresas del S&P 500 pueden pagar dividendos; CSPX recibe esos ingresos a nivel del fondo.",
  "La clase acumulativa retiene y reinvierte los ingresos internamente, después de los costos e impuestos aplicables.",
  "Los activos reinvertidos contribuyen al patrimonio y al valor por participación (NAV). No se acreditan como un dividendo en efectivo a tu cuenta.",
];
export const cedearDividendFlow = [
  "La empresa o ETF subyacente declara una distribución.",
  "El depositario y la estructura CEDEAR procesan el derecho según el ratio del certificado y las condiciones del evento.",
  "Si te corresponde, recibís la distribución neta en tu cuenta del broker local.",
];
export const incomeComparison = [
  [
    "¿Aparece efectivo en la cuenta?",
    "Normalmente sí, si el evento distribuye efectivo",
    "No por la reinversión interna",
  ],
  [
    "¿Se reinvierte automáticamente?",
    "No en el flujo de efectivo: vos decidís reinvertir",
    "Sí, dentro del fondo",
  ],
  [
    "¿Aumentan tus unidades automáticamente?",
    "No por un dividendo en efectivo; un pago en especie es otro evento",
    "No: 100 participaciones siguen siendo 100",
  ],
  [
    "Reinversión de distribuciones",
    "Requiere una decisión del inversor",
    "La realiza internamente el fondo",
  ],
];
export const dividendNotes = [
  {
    title: "No todas las empresas pagan",
    text: "El derecho depende de la fecha ex-dividendo, la fecha de registro y las reglas de liquidación del evento. Comprar después del corte no suele dar derecho al pago ya anunciado; verificá el aviso del depositario y del broker.",
  },
  {
    title: "Importe neto y ratio",
    text: "El importe por CEDEAR depende de su ratio respecto del activo extranjero. Puede acreditarse neto de retenciones, cargos del depositario y comisiones del broker o del evento.",
  },
  {
    title: "Qué dice IOL",
    text: "La ayuda de IOL indica que la acreditación puede tardar aproximadamente 72–96 horas hábiles y aparecer como saldo líquido en USD o, según el evento, en especie. Es una referencia revisada, no un plazo garantizado ni una regla para todos los brokers.",
  },
  {
    title: "Efectivo no es más CEDEARs",
    text: "Cobrar un dividendo en efectivo no implica que IOL compre más certificados por vos. Una distribución en especie puede agregar títulos según el evento; no es lo mismo que reinvertir automáticamente un pago en efectivo.",
  },
];
