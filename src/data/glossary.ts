import type { Definition } from "./types";
const entries: Array<[string, string, string?, string?]> = [
  [
    "BOPREAL",
    "Bonos para la Reconstrucción de una Argentina Libre: deuda emitida por el BCRA, inicialmente vinculada a deudas comerciales de importadores. No es deuda emitida por el Tesoro.",
    "/local/bopreal",
  ],
  [
    "Sovereign bond",
    "Bono soberano: deuda de un gobierno nacional, con pagos contractuales sujetos al cumplimiento del emisor.",
    "/local/bonos-soberanos",
  ],
  [
    "Price",
    "Precio: lo que pagás o recibís al operar un bono en el mercado. Puede cotizar por cada 100 de valor nominal y diferir del capital pendiente de pago.",
    "/local/bonos-soberanos",
  ],
  [
    "Nominal value",
    "Valor nominal: unidad de capital de referencia del bono, no su precio de mercado. El valor nominal residual es el capital que queda tras las amortizaciones.",
    "/local/bonos-soberanos",
  ],
  [
    "Coupon",
    "Cupón: pago de interés contractual del bono. La tasa de cupón no es tu rendimiento total, porque este también depende del precio pagado.",
    "/local/bonos-soberanos",
  ],
  [
    "Amortization",
    "Amortización: devolución del capital de un bono, en una o varias cuotas según sus condiciones.",
    "/local/bonos-soberanos",
  ],
  [
    "Maturity",
    "Vencimiento: fecha contractual del último pago de un bono. Parte del capital puede haberse amortizado antes.",
    "/local/bonos-soberanos",
  ],
  [
    "Yield",
    "Rendimiento: retorno expresado como tasa. Identificá si la ficha muestra rendimiento corriente o al vencimiento; no equivale automáticamente al cupón ni a una ganancia asegurada.",
    "/local/bonos-soberanos",
  ],
  [
    "TIR",
    "Tasa Interna de Retorno: rendimiento anualizado implícito en el precio actual y los flujos contractuales pendientes del bono, suponiendo que se paguen según el cronograma.",
    "/local/bonos-soberanos",
    "No es una tasa prometida: costos, reinversión, incumplimientos o vender antes pueden cambiar el resultado efectivo.",
  ],
  [
    "Distributing ETF",
    "Clase de ETF que distribuye ingresos a sus titulares según su política. Reinvertir ese efectivo normalmente requiere una decisión del inversor.",
    "/local/cedears#dividends",
  ],
  [
    "Ex-dividend date",
    "Fecha ex-dividendo: desde esta fecha la compra normalmente ya no da derecho al dividendo anunciado. Revisá fecha de registro, liquidación y reglas específicas del evento.",
    "/local/cedears#dividends",
  ],
  [
    "Bull",
    "Toro: símbolo de una visión alcista. Ayuda memoria: el toro ataca hacia arriba con los cuernos; bull se asocia con subas.",
    "/glossary#bullish",
  ],
  [
    "Bullish",
    "Alcista: expectativa de suba en un activo o tendencia/sentimiento general positivo durante un período. No exige que todas las acciones suban cada día.",
    undefined,
    "Bullish on NVDA = esperar una suba de NVDA. Un mercado bullish puede tener acciones que caen, sectores rezagados, correcciones temporales y días negativos.",
  ],
  [
    "Bear",
    "Oso: símbolo de una visión bajista. Ayuda memoria: el oso golpea hacia abajo con la garra; bear se asocia con bajas.",
    "/glossary#bearish",
  ],
  [
    "Bearish",
    "Bajista: expectativa de baja en un activo o tendencia/sentimiento general negativo. No significa que todos los activos caigan simultáneamente.",
    undefined,
    "Bearish on the S&P 500 = esperar una baja del índice. En un mercado bearish algunas acciones pueden subir, sectores defensivos pueden rendir mejor y puede haber rallies temporales.",
  ],
  [
    "Bull market",
    "Mercado alcista: tendencia amplia y sostenida de subas durante el período considerado, con posibles retrocesos y diferencias entre activos.",
    "/glossary#bullish",
  ],
  [
    "Bear market",
    "Mercado bajista: caída amplia y sostenida; es común usar una baja de alrededor del 20% o más desde un máximo reciente como referencia, aunque las definiciones varían.",
    "/glossary#bearish",
  ],
  [
    "Accumulating ETF",
    "Clase de ETF que reinvierte ingresos dentro del fondo, sin distribuirlos normalmente como efectivo ni entregar participaciones extra al inversor.",
    "/ibkr/cspx#accumulation",
  ],
  [
    "Ask",
    "El menor precio que piden los vendedores: lo mínimo que están dispuestos a aceptar ahora. Una compra Market tiende a ejecutar cerca del Ask, sin garantía del precio final.",
    "/ibkr/buy-cspx",
  ],
  [
    "Bid",
    "El mayor precio que ofrecen los compradores: lo que están dispuestos a pagar ahora. Una venta Market tiende a ejecutar cerca del Bid, sin garantía del precio final.",
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
    "Ask − Bid. Ejemplo: Bid 99.90, Ask 100.10 → Spread 0.20. Un spread estrecho suele asociarse a mejor liquidez; uno amplio implica mayor fricción. Las cotizaciones no garantizan ejecución.",
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
  .map(([term, description, href, detail]) => ({
    id: normalize(term)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-$/, ""),
    term,
    description,
    href,
    detail,
  }))
  .sort((a, b) => a.term.localeCompare(b.term, "es", { sensitivity: "base" }));
