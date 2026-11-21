import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Notice,
  PageHeader,
  RelatedLink,
  ReviewFooter,
} from "@/components/reference/Primitives";
import { ReferenceTable } from "@/components/reference/ReferenceTable";
import {
  bondDate,
  bondExitChoices,
  boprealFacts,
  boprealReview,
  boprealRisk,
  boprealSeries,
} from "@/data/local/bonds";

export default function BoprealPage() {
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Renta fija local · BCRA"
        title="BOPREAL: moneda, pagos y riesgos"
        description="Una referencia para evaluar una posible inversión de excedentes locales. No es efectivo en dólares ni un reemplazo automático de una inversión de largo plazo."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {boprealFacts.map((fact) => (
          <Card key={fact.title} className="gap-3 shadow-none">
            <CardHeader>
              <CardTitle className="text-base">{fact.title}</CardTitle>
            </CardHeader>
            <CardContent className="body-copy">{fact.description}</CardContent>
          </Card>
        ))}
      </div>
      <Notice title="La distinción es el tipo de pago, no «bonos en pesos vs. en dólares»">
        <div className="space-y-2">
          <p>
            <strong>Amortización normal de 1A, 1B, 1C y 1D: USD.</strong>
          </p>
          <p>
            Rescate anticipado opcional del tenedor en 1A/1B/1C: ARS al tipo de
            cambio de referencia BCRA A3500 aplicable. 1D no tiene esa opción
            del tenedor.
          </p>
        </div>
      </Notice>
      <section className="space-y-4">
        <h2 className="section-title">Serie 1: cuatro instrumentos</h2>
        <p className="body-copy">
          La Serie 1 se separó en 1A, 1B, 1C y 1D. Todas comparten vencimiento
          final el 31/10/2027. La amortización contractual se estructuró en dos
          cuotas del 50% del valor nominal: 30/04/2027 y 31/10/2027, en USD,
          sujetas a cumplimiento y ajustes de día hábil.
        </p>
        <ReferenceTable
          caption="BOPREAL Serie 1 · Condiciones contractuales revisadas"
          headings={[
            "Serie",
            "Vencimiento final",
            "Moneda normal",
            "Rescate anticipado del tenedor",
            "Moneda del rescate",
          ]}
          rows={boprealSeries.map((series) => [
            series.series,
            bondDate(series.maturity),
            series.normalCurrency,
            series.holderRedemptionFrom
              ? `Desde ${bondDate(series.holderRedemptionFrom)}`
              : "Sin opción del tenedor",
            series.redemptionCurrency,
          ])}
        />
        <p className="body-copy">
          Estas fechas indican cuándo puede ejercerse el derecho; no implican un
          rescate automático. La moneda en que comprás o vendés una especie en
          bolsa tampoco cambia la moneda del pago contractual.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="section-title">
          Vender y cobrar una amortización son decisiones distintas
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {bondExitChoices.map((choice) => (
            <Card key={choice.title} className="gap-3 shadow-none">
              <CardHeader>
                <CardTitle className="text-base">{choice.title}</CardTitle>
              </CardHeader>
              <CardContent className="body-copy">
                {choice.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Notice title="Riesgos que siguen presentes" warning>
        {boprealRisk}
      </Notice>
      <Accordion type="single" collapsible>
        <AccordionItem value="check">
          <AccordionTrigger>
            Qué verificar antes de operar o pedir un rescate
          </AccordionTrigger>
          <AccordionContent className="space-y-3 body-copy">
            <p>
              Confirmá especie, serie, saldo nominal residual, cronograma
              vigente, liquidez, spread, comisiones y restricciones con el
              broker. No se publica aquí una cotización ni una TIR actual.
            </p>
            <p>
              El rescate del tenedor tiene un procedimiento específico y usa el
              A3500 del día de ejercicio según las condiciones revisadas. No
              equivale a vender a otro inversor. La opción de rescate del emisor
              es distinta: 1D no tiene opción del tenedor, pero no significa
              ausencia de toda cláusula de rescate. Revisá los términos vigentes
              del BCRA.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <RelatedLink to="/local/bonos-soberanos">
        Repasar conceptos de renta fija y TIR
      </RelatedLink>
      <ReviewFooter review={boprealReview} />
    </div>
  );
}
