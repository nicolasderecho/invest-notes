import type { BuyStep } from "../types";
export const buyingSteps: BuyStep[] = [
  {
    id: "cash",
    title: "Confirmá el efectivo disponible en USD",
    summary:
      "Revisá que el depósito esté habilitado para operar y que alcance para la orden y sus costos.",
    details: [
      "Cash es el saldo de efectivo; Settled Cash identifica efectivo cuyo proceso de liquidación terminó.",
      "Un depósito visible puede tener una retención o fecha de disponibilidad. Disponibilidad para operar y para retirar no siempre coinciden.",
      "Revisá los fondos disponibles y la vista previa. No uses Buying Power como si fuera necesariamente efectivo propio.",
    ],
    terms: ["Cash", "Settled Cash"],
  },
  {
    id: "identity",
    title: "Buscá CSPX y verificá su identidad",
    summary:
      "Elegí la cotización prevista en Londres, en USD, y confirmá la clase por ISIN.",
    setting: "CSPX · LSEETF · USD · IE00B5BMR087",
    details: [
      "Buscá CSPX y abrí los datos del instrumento: iShares Core S&P 500 UCITS ETF, clase acumulativa.",
      "El ISIN es la comprobación principal de la clase. No alcanza con reconocer el ticker; revisá también bolsa y moneda.",
      "SMART puede aparecer como enrutamiento de la orden: no reemplaza la verificación de la cotización que elegiste.",
    ],
    terms: ["ISIN", "ETF"],
  },
  {
    id: "hours",
    title: "Elegí la sesión regular",
    summary:
      "Consultá la sesión regular de Londres y su coincidencia con EE. UU. en tu zona horaria. Revisá feriados; esta franja no garantiza evitar saltos de precio.",
    details: [
      "Para un ETF del S&P 500, la coincidencia con la sesión regular estadounidense puede ayudar a observar precios de los activos subyacentes. La liquidez y el spread deben revisarse igualmente.",
      "Londres y Nueva York cambian la hora en fechas distintas; Buenos Aires no sigue esos mismos cambios. No hay una única franja argentina válida todo el año.",
      "Verificá el calendario y la sesión del mercado antes de enviar la orden.",
    ],
    terms: ["RTH", "Spread"],
  },
  {
    id: "amount",
    title: "Ingresá cuánto querés invertir",
    summary:
      "Si buscás fracciones, elegí importe en USD en lugar de una cantidad entera de acciones.",
    setting: "Buy → Quantity: USD → importe",
    details: [
      "La disponibilidad de fracciones depende del instrumento, la cuenta y los permisos. Si USD/fracciones no aparece, confirmá elegibilidad y configuración con IBKR.",
      "Dejá margen para la comisión estimada. Las comprobaciones de Cash Quantity también pueden exigir efectivo adicional; revisá la vista previa en vez de comprometer todo el saldo.",
      "El importe total de la orden y el precio límite por acción son campos diferentes.",
    ],
    terms: ["Fill"],
  },
  {
    id: "limit",
    title: "Definí tu precio máximo con Limit",
    summary:
      "Una orden de compra Limit no debe ejecutarse por encima del límite por acción que aceptaste.",
    setting: "Order Type = Limit",
    details: [
      "Market intenta ejecutar al precio disponible, sin fijar tu máximo. Limit controla el precio, pero puede quedar sin ejecutar o ejecutarse parcialmente.",
      "Ejemplo hipotético: Ask 830 y límite 835. Podría ejecutar a un precio menor que 835; 835 es el techo, no un precio prometido.",
      "La diferencia del ejemplo no es una regla para sumar USD 5. Elegí tu máximo aceptable y revisá si la cotización está demorada.",
    ],
    terms: ["Limit order", "Market order", "Ask"],
  },
  {
    id: "day",
    title: "Usá vigencia Day",
    summary:
      "Para este flujo mensual, la parte no ejecutada vence al terminar la sesión aplicable.",
    setting: "Time in Force = Day",
    details: [
      "Day evita que el remanente siga activo en sesiones posteriores. No significa que vaya a ejecutarse durante el día.",
      "GTC mantiene la orden más allá de la sesión, sujeta a las reglas y vencimientos del broker. Si querés intentarlo otro día, revisá antes el estado anterior.",
    ],
    terms: ["Time in Force", "GTC"],
  },
  {
    id: "rth",
    title: "Mantené Outside RTH desactivado",
    summary:
      "El flujo documentado limita la ejecución a las horas regulares del mercado.",
    setting: "Outside RTH = No",
    details: [
      "RTH significa Regular Trading Hours. Este ajuste no garantiza liquidez ni un spread pequeño.",
      "La disponibilidad y el comportamiento de la opción dependen del producto y del tipo de orden. Confirmá lo que indique el ticket.",
    ],
    terms: ["Outside RTH", "RTH"],
  },
  {
    id: "delayed",
    title: "Entendé Delayed Data",
    summary:
      "El Bid y el Ask visibles pueden corresponder a un momento anterior.",
    details: [
      "Una cotización demorada no bloquea por sí sola el envío de una orden. Sí limita lo que sabés del precio disponible ahora.",
      "Limit fija un techo; no convierte un dato demorado en un dato actual ni asegura que el precio sea conveniente.",
      "Verificá el estado de datos. Las suscripciones de tiempo real y sus costos se consultan por separado; no son necesarias para entender esta guía.",
    ],
    terms: ["Delayed Data", "Bid", "Ask"],
  },
  {
    id: "warnings",
    title: "Leé las advertencias y revisá la orden",
    summary:
      "Confirmá instrumento, lado Buy, importe, límite, vigencia, sesión y costos antes de enviar.",
    details: [
      "Mandatory Cap Price: IBKR puede aplicar límites de protección adicionales. La orden puede no ejecutar si sus controles de precio la restringen. Leé el mensaje concreto.",
      "Cash Quantity Order Confirmation: el importe monetario se procesa sobre una base no garantizada; la cantidad final de acciones o fracciones depende de la ejecución y de cómo se gestiona el remanente. Revisá el importe y los fills finales.",
      "No aceptes una advertencia por costumbre. Si contradice lo que esperabas, cancelá la revisión y comprobá los datos antes de enviar.",
    ],
  },
  {
    id: "filled",
    title: "Comprobá Filled, no solo Submitted",
    summary:
      "Después del envío, buscá la orden en Orders & Trades y comprobá cuánto se ejecutó.",
    setting: "Trade → Orders & Trades → Filled",
    details: [
      "Submitted significa enviada o activa; no significa comprada. Partially Filled indica que se ejecutó solo una parte.",
      "Revisá cada fill, la cantidad total, el precio medio y la comisión. Si hay varios fills, el precio medio se pondera por sus cantidades.",
      "Antes de reenviar una compra que parece pendiente, verificá su estado para evitar duplicarla. Las etiquetas pueden variar entre Client Portal, Mobile y TWS.",
    ],
    terms: ["Fill"],
  },
  {
    id: "statement",
    title: "Guardá la referencia del Activity Statement",
    summary:
      "Usá el estado de actividad para verificar históricamente la operación.",
    setting: "Performance & Reports → Activity Statement",
    details: [
      "Elegí un período que incluya la compra y revisá Trades: instrumento, fecha, cantidad, precio y comisión.",
      "Contrastá Security Information con el ISIN previsto. El informe es la referencia duradera; una captura del ticket no demuestra ejecución.",
      "Las rutas de menú pueden cambiar. Buscá Activity Statements en los reportes de tu interfaz.",
    ],
  },
];
