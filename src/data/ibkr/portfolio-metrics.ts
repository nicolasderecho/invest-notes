import type { Definition } from "../types";
export const metrics: Definition[] = [
  {
    id: "position",
    term: "Position / Shares",
    description: "Cantidad de acciones que tenés. Puede incluir fracciones.",
  },
  {
    id: "avg-price",
    term: "Avg. Price",
    description:
      "Precio medio de adquisición que muestra IBKR para la posición.",
    detail:
      "Combina compras y ajustes; puede diferir del precio de un fill individual.",
  },
  {
    id: "cost-basis",
    term: "Cost Basis",
    description:
      "Costo que IBKR registra para la posición que todavía conservás.",
    detail:
      "Puede incluir comisiones y ajustes según su metodología. No es el total de todos tus depósitos.",
  },
  {
    id: "market-value",
    term: "Market Value",
    description: "Valor aproximado actual de esa posición abierta.",
    detail:
      "Conceptualmente: cantidad de acciones × precio de referencia. Revisá moneda y antigüedad de la cotización.",
  },
  {
    id: "unrealized",
    term: "Unrealized P&L",
    description:
      "Cuánto está arriba o abajo la posición abierta respecto de su costo.",
    detail:
      "Aproximadamente Market Value − Cost Basis, expresados en la misma moneda. Todavía no vendiste.",
  },
  {
    id: "realized",
    term: "Realized P&L",
    description: "Ganancia o pérdida concretada al vender.",
    detail:
      "El resultado informado depende de los lotes y del método de cálculo aplicable.",
  },
  {
    id: "daily",
    term: "Daily P&L",
    description:
      "Variación del resultado durante el día según la referencia de IBKR.",
    detail:
      "No responde cuánto ganaste desde la compra. Para eso, distinguí Unrealized y Realized P&L.",
  },
  {
    id: "cash",
    term: "Cash",
    description: "Efectivo no invertido de la cuenta.",
    detail:
      "Puede existir en varias monedas. Un saldo no implica disponibilidad inmediata para todos los usos.",
  },
  {
    id: "settled",
    term: "Settled Cash",
    description: "Efectivo cuyo proceso de liquidación ya terminó.",
    detail:
      "La disponibilidad para operar o retirar también depende de retenciones y reglas de la cuenta.",
  },
  {
    id: "net",
    term: "Net Liquidation",
    description:
      "Valor aproximado total de la cuenta a precios actuales, incluyendo posiciones y efectivo.",
    detail:
      "Considera los demás saldos y obligaciones que correspondan. No garantiza el importe final de una venta ni lo que podés retirar.",
  },
  {
    id: "unsettled",
    term: "Unsettled Cash",
    description:
      "Efectivo asociado a operaciones que todavía no completaron su liquidación.",
  },
  {
    id: "buying-power",
    term: "Buying Power / Available Funds",
    description:
      "Capacidad de operar según el tipo de cuenta y sus requisitos.",
    detail:
      "En cuentas con margen puede incluir capacidad de endeudamiento: no equivale a ahorro propio disponible.",
  },
];
