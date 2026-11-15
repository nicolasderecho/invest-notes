import type { Definition } from "./types";
const entries: Array<[string, string, string?]> = [
  [
    "Accumulating ETF",
    "Clase de ETF que retiene y reinvierte ingresos dentro del fondo, en lugar de distribuirlos como efectivo al inversor.",
    "/ibkr/cspx",
  ],
  [
    "Ask",
    "Precio más bajo al que alguien ofrece vender en el libro de órdenes. Puede cambiar antes de tu ejecución.",
    "/ibkr/buy-cspx",
  ],
  [
    "Bid",
    "Precio más alto al que alguien ofrece comprar en el libro de órdenes.",
    "/ibkr/buy-cspx",
  ],
  [
    "Buy and hold",
    "Comprar y mantener durante un horizonte largo. No elimina el riesgo ni impide revisar la estrategia.",
    "/ibkr/cspx",
  ],
  [
    "CAPE / Shiller CAPE",
    "Relación entre precio y ganancias medias de aproximadamente diez años ajustadas por inflación. Es una medida de valuación, no un reloj para predecir el mercado.",
  ],
  [
    "Cash",
    "Saldo de efectivo no invertido; su disponibilidad depende de la liquidación y de las reglas de la cuenta.",
    "/ibkr/portfolio",
  ],
  [
    "Caución bursátil",
    "Préstamo de corto plazo en el mercado con garantías, tasa y vencimiento acordados.",
    "/local/cauciones",
  ],
  [
    "CEDEAR",
    "Certificado que se negocia en Argentina y representa un activo extranjero. Su precio en ARS incorpora exposición al activo y al tipo de cambio financiero.",
    "/local/cedears",
  ],
  [
    "Cost Basis",
    "Costo registrado de la posición que todavía conservás, con los ajustes aplicables del broker.",
    "/ibkr/portfolio",
  ],
  [
    "DCA",
    "Aportes periódicos: invertir importes de forma recurrente en distintos momentos. No garantiza ganancias ni evita pérdidas.",
    "/ibkr/buy-cspx",
  ],
  [
    "Delayed Data",
    "Cotización demorada: el dato visible no necesariamente refleja el mercado en este instante.",
    "/ibkr/buy-cspx",
  ],
  [
    "Dividend",
    "Dividendo: distribución que una empresa o fondo realiza a sus titulares. No es un rendimiento garantizado.",
    "/ibkr/cspx",
  ],
  [
    "ETF",
    "Exchange-Traded Fund: fondo cuyas participaciones se compran y venden en bolsa. Puede seguir un índice y tener distintos riesgos.",
    "/ibkr/cspx",
  ],
  [
    "FCI",
    "Fondo Común de Inversión: reúne dinero de inversores y lo administra según un reglamento. Participás mediante cuotapartes.",
    "/local/fci",
  ],
  [
    "Fill",
    "Ejecución de una orden, total o parcial. Una orden puede tener varios fills.",
    "/ibkr/buy-cspx",
  ],
  [
    "GTC",
    "Good Till Canceled: vigencia más allá del día, hasta cancelación o vencimiento según las reglas del broker.",
    "/ibkr/buy-cspx",
  ],
  [
    "Hedge",
    "Cobertura: posición o instrumento que busca compensar un riesgo específico. Puede tener costos y no ser perfecta.",
  ],
  [
    "Hedge fund",
    "Fondo con estrategias y reglas que pueden incluir apalancamiento, derivados o ventas en corto. No significa que sea de bajo riesgo.",
  ],
  [
    "Index",
    "Índice: medida de una canasta de activos bajo reglas definidas. Un ETF puede intentar seguirlo; el índice no se compra directamente.",
    "/ibkr/cspx",
  ],
  [
    "ISIN",
    "Identificador internacional de un valor o clase. Permite verificar la identidad aunque el ticker cambie entre mercados.",
    "/ibkr/cspx",
  ],
  [
    "Limit order",
    "Orden con límite de precio: al comprar, fija el máximo por acción. Puede no ejecutarse.",
    "/ibkr/buy-cspx",
  ],
  [
    "Long",
    "Posición comprada: tu exposición se beneficia de una suba del activo y pierde con una baja, antes de otros costos.",
  ],
  [
    "Margin",
    "Margen: garantías y, según la cuenta, capacidad de operar con dinero prestado. Puede amplificar pérdidas y provocar liquidaciones.",
  ],
  [
    "Market order",
    "Orden que busca ejecutar al precio disponible, sin asegurar un precio máximo de compra.",
    "/ibkr/buy-cspx",
  ],
  [
    "Market Value",
    "Valor aproximado actual de una posición abierta, usando un precio de referencia.",
    "/ibkr/portfolio",
  ],
  [
    "Money market",
    "Mercado de dinero: instrumentos de muy corto plazo. Un fondo money market busca liquidez y baja volatilidad; no equivale a un depósito garantizado.",
    "/local/fci",
  ],
  [
    "Nasdaq-100",
    "Índice de grandes empresas no financieras listadas en Nasdaq, con fuerte peso tecnológico.",
    "/ibkr/alternatives",
  ],
  [
    "Net Liquidation",
    "Valor aproximado de la cuenta a precios actuales, considerando posiciones, efectivo y otros saldos aplicables.",
    "/ibkr/portfolio",
  ],
  [
    "Outside RTH",
    "Permiso para que una orden opere fuera de las horas regulares, si el producto y la orden lo admiten.",
    "/ibkr/buy-cspx",
  ],
  [
    "P&L",
    "Profit and Loss: ganancia o pérdida. Revisá si el dato es diario, realizado o no realizado.",
    "/ibkr/portfolio",
  ],
  [
    "Realized P&L",
    "Resultado concretado al cerrar o vender una posición, según el cálculo del broker.",
    "/ibkr/portfolio",
  ],
  [
    "RTH",
    "Regular Trading Hours: horario regular de negociación del mercado correspondiente.",
    "/ibkr/buy-cspx",
  ],
  [
    "S&P 500",
    "Índice de grandes empresas estadounidenses. No es un fondo ni una rentabilidad prometida.",
    "/ibkr/cspx",
  ],
  [
    "Settled Cash",
    "Efectivo cuya liquidación terminó. Otras restricciones de disponibilidad pueden seguir aplicando.",
    "/ibkr/portfolio",
  ],
  [
    "Short",
    "Posición vendida en corto: busca beneficiarse de una baja. Puede implicar préstamo de activos y pérdidas muy grandes si el precio sube.",
  ],
  [
    "Spread",
    "Diferencia entre Ask y Bid. Es un costo implícito de operar y suele ampliarse cuando hay menor liquidez.",
    "/ibkr/buy-cspx",
  ],
  [
    "TNA",
    "Tasa Nominal Anual: tasa expresada por año. Por sí sola no indica el rendimiento efectivo final ni cómo se capitaliza.",
    "/local/cauciones",
  ],
  [
    "Time in Force",
    "Vigencia de la orden. Day y GTC determinan cuánto tiempo puede permanecer activa.",
    "/ibkr/buy-cspx",
  ],
  [
    "Trust",
    "Estructura jurídica en la que un fiduciario administra bienes para beneficiarios. Su funcionamiento e impuestos dependen de la jurisdicción y del instrumento.",
  ],
  [
    "UCITS",
    "Marco regulatorio europeo para fondos de inversión. No garantiza rendimientos ni implica que un fondo no pueda perder valor.",
    "/ibkr/cspx",
  ],
  [
    "Unrealized P&L",
    "Ganancia o pérdida de una posición que todavía no vendiste, respecto de su costo registrado.",
    "/ibkr/portfolio",
  ],
  [
    "W-8BEN",
    "Formulario para documentar la condición de persona física extranjera ante un pagador estadounidense y, cuando corresponde, beneficios de tratado. No garantiza que no haya reportes.",
    "/ibkr/1042-s",
  ],
  [
    "1042-S",
    "Formulario estadounidense que reporta determinadas rentas de fuente estadounidense pagadas a personas extranjeras. Reporte y retención son conceptos distintos.",
    "/ibkr/1042-s",
  ],
  [
    "Plazo fijo",
    "Depósito por un plazo pactado, con condiciones de tasa y disponibilidad. Un plazo fijo tradicional restringe liquidez y mantiene riesgo de inflación en ARS.",
    "/local",
  ],
  [
    "Cuotaparte",
    "Unidad que representa tu participación en un FCI; su valor cambia con el patrimonio del fondo.",
    "/local/fci",
  ],
];
export const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
export const glossary: Definition[] = entries
  .map(([term, description, href]) => ({
    id: normalize(term)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-$/, ""),
    term,
    description,
    href,
  }))
  .sort((a, b) => a.term.localeCompare(b.term, "es", { sensitivity: "base" }));
