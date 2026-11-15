# Revisión local

## Ejecutar

Requiere Node 24 LTS (verificado con 24.11.1) y npm.

```bash
npm ci
npm run dev
```

Abrí la URL que imprime Vite (normalmente http://127.0.0.1:5173).

```bash
npm test
npm run build
npm run preview
```

La compilación genera `dist/`. No se configuró ni ejecutó un despliegue.

## Recorrido sugerido

1. Entrá en IBKR y abrí **Comprar CSPX**.
2. Desplegá las explicaciones, marcá pasos y reiniciá el checklist. Las marcas duran solo mientras seguís en esa página.
3. Abrí el ejemplo de ticket. Ampliá la imagen, desplazala y cerrá el diálogo con Escape.
4. Consultá **Qué es CSPX** y verificá el ISIN y los campos de identidad.
5. Revisá **Entender mi portfolio** y los ejemplos históricos de posiciones y saldos.
6. Buscá `Limit`, `UNREALIZED` o `caucion` en el glosario. La búsqueda también encuentra palabras de las definiciones.
7. Cambiá Claro / Oscuro / Sistema y recargá para comprobar persistencia.
8. Entrá en Inversión local y revisá CEDEARs, FCI y cauciones.

## Revisión visual pendiente

Las pruebas automatizadas y la compilación se ejecutan localmente. No había un navegador conectado al agente para verificar el diseño visual. Antes de considerar una publicación, revisar:

- Escritorio claro y oscuro.
- Móvil claro y oscuro; menú lateral, tablas y lectura de imágenes ampliadas.
- Tab, Shift+Tab, Enter y Escape; foco visible y retorno del foco de los diálogos.
- Contenido y redacción con el titular del proyecto.

El servidor local sirve rutas anidadas. Eso no verifica Vercel: el rewrite y la apertura/recarga directa de `/ibkr/buy-cspx` deben comprobarse al desplegar.

## Capturas

Solo se copiaron a `public/screenshots` los ejemplos inspeccionados sin identificadores de cuenta visibles:

- `sample.png` → `ibkr/buy-cspx-order-ticket.png`
- `current.png` → `ibkr/portfolio-position-metrics.png`
- `casr2.png` → `ibkr/account-balances.png`
- `1000115514.jpg` → `local/cedears-gld-qqq.jpg`

Las imágenes conservan importes personales históricos, y se presentan como ejemplos, nunca como valores actuales. Los originales no fueron modificados.

`order.png` y `herg.png` contienen identificadores de cuenta; no se incorporaron a la app. Los ejemplos de orden enviada y Activity Statement podrán agregarse después de una redacción apropiada. Las explicaciones escritas de ambos conceptos ya están incluidas.

## Mantenimiento

- Contenido: `src/data/`; composición: `src/pages/`.
- Fuentes y fechas de revisión: `src/data/sources.ts` e instrumentos.
- Colores: `src/styles/globals.css`, mediante tokens semánticos.
- No hay consultas de precios, saldos ni URLs de fuentes en tiempo de ejecución.
- Selección de tema: única preferencia persistida, en localStorage.
- Dependencias estables comprobadas en npm al iniciar; `package-lock.json` fija la instalación reproducible.
