export const cedears = [
  {
    symbol: "GLD",
    exposure: "Oro",
    role: "Exposición al oro como posible diversificación.",
    note: "Puede caer o pasar períodos largos sin subir. No equivale a efectivo ni garantiza protección en cada crisis.",
  },
  {
    symbol: "QQQ",
    exposure: "Nasdaq-100",
    role: "Exposición a grandes empresas de crecimiento, con fuerte peso tecnológico.",
    note: "Puede tener caídas importantes. Se superpone con empresas que ya están en CSPX; no agrega por sí solo diversificación geográfica.",
  },
];
export const localRoles = [
  {
    name: "Efectivo en ARS",
    role: "Pagos y disponibilidad inmediata",
    liquidity: "Inmediata",
    risk: "No genera rendimiento por sí solo; la inflación reduce poder de compra.",
  },
  {
    name: "Plazo fijo tradicional",
    role: "Tasa nominal pactada por un plazo",
    liquidity: "Al vencimiento",
    risk: "Inflación, devaluación y falta de disponibilidad durante el plazo. Revisá condiciones del banco.",
  },
  {
    name: "FCI money market",
    role: "Estacionar ARS a corto plazo",
    liquidity: "Según el fondo y canal",
    risk: "Rendimiento variable y riesgos de la cartera. No es un depósito bancario.",
  },
  {
    name: "Caución colocadora",
    role: "Prestar por un plazo acordado",
    liquidity: "Al vencimiento pactado",
    risk: "Operación con garantía, costos y reglas de mercado. Garantía no significa ausencia de riesgo.",
  },
  {
    name: "CEDEAR",
    role: "Exposición a un activo extranjero",
    liquidity: "Depende del mercado y del spread",
    risk: "Variación del activo y del tipo de cambio financiero; horizonte corto puede dar pérdidas.",
  },
  {
    name: "USD en efectivo",
    role: "Liquidez y exposición al dólar",
    liquidity: "Según dónde se mantenga",
    risk: "No rinde por sí solo; pierde poder de compra frente a inflación en USD y puede bajar contra otras monedas.",
  },
];
export const caucionVsFci = [
  [
    "Decisión",
    "El administrador selecciona la cartera",
    "Vos elegís el plazo y aceptás la tasa",
  ],
  [
    "Disponibilidad",
    "Según reglas de rescate y canal",
    "Capital comprometido hasta el vencimiento",
  ],
  [
    "Rendimiento",
    "Variable con el valor de la cuotaparte",
    "Tasa acordada al colocar, antes de costos",
  ],
  [
    "Estructura",
    "Cartera de instrumentos del fondo",
    "Préstamo garantizado bajo reglas de mercado",
  ],
  [
    "Operación",
    "Suscripción y rescate de cuotapartes",
    "Colocación con plazo, moneda y tasa definidos",
  ],
];
