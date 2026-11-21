import { Notice } from "./Primitives";
import { accumulatingFlow } from "@/data/income";
export function AccumulationExplanation() {
  return (
    <section id="accumulation" className="scroll-mt-24 space-y-4">
      <h2 className="section-title">
        Dividendos y capitalización dentro de CSPX
      </h2>
      <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
        {accumulatingFlow.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <Notice title="100 participaciones de CSPX siguen siendo 100">
        La reinversión interna normalmente no entrega participaciones extra al
        inversor. Tenés la misma cantidad; cambia el patrimonio que respalda
        cada participación, junto con los movimientos del mercado.
      </Notice>
      <p className="body-copy">
        Los ingresos retenidos quedan expuestos a resultados futuros: así
        contribuyen a la capitalización. También puede haber capitalización por
        apreciación en una estructura distribuidora; la diferencia aquí es la
        reinversión automática de las distribuciones. No asegura rentabilidad ni
        evita caídas.
      </p>
      <p className="body-copy">
        Cada aporte mensual compra participaciones adicionales y empieza su
        propio período invertido. Ese aumento de cantidad proviene de tu nueva
        compra, no de la acumulación interna del ETF.
      </p>
    </section>
  );
}
