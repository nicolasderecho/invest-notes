import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Notice,
  PageHeader,
  RelatedLink,
  ReviewFooter,
} from "@/components/reference/Primitives";
import {
  bondExitChoices,
  sovereignFacts,
  sovereignReview,
  sovereignTermIds,
} from "@/data/local/bonds";
import { glossary } from "@/data/glossary";

export default function SovereignBondsPage() {
  const terms = sovereignTermIds
    .map((id) => glossary.find((entry) => entry.id === id))
    .filter((entry) => entry !== undefined);
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Renta fija · Argentina"
        title="Bonos soberanos"
        description="Deuda de un gobierno nacional: entendé qué comprás, cómo se paga y por qué una tasa alta no es dinero gratis."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {sovereignFacts.map((fact) => (
          <Card key={fact.title} className="gap-3 shadow-none">
            <CardHeader>
              <CardTitle className="text-base">{fact.title}</CardTitle>
            </CardHeader>
            <CardContent className="body-copy">{fact.description}</CardContent>
          </Card>
        ))}
      </div>
      <section className="space-y-4" id="conceptos">
        <h2 className="section-title">Los términos de la ficha del bono</h2>
        <dl className="divide-y rounded-xl border bg-card px-5">
          {terms.map((term) => (
            <div key={term.id} className="py-4">
              <dt className="font-medium">
                <Link className="text-link" to={`/glossary#${term.id}`}>
                  {term.term}
                </Link>
              </dt>
              <dd className="body-copy mt-1">{term.description}</dd>
            </div>
          ))}
        </dl>
      </section>
      <Notice title="Cupón y TIR no son la misma tasa">
        El cupón describe pagos de interés contractuales; la TIR incorpora el
        precio que pagás y los flujos pendientes. Comprar bajo la par no elimina
        el riesgo de incumplimiento. El resultado realizado también depende de
        costos, reinversión y de si vendés antes.
      </Notice>
      <section className="space-y-3">
        <h2 className="section-title">AL y GD no son intercambiables</h2>
        <p className="body-copy">
          En estos ejemplos, AL30/AL35 corresponden a ley argentina y GD30/GD35
          a emisiones bajo ley extranjera. El año del ticker no alcanza para
          comparar: revisá ley aplicable, moneda, cronograma y condiciones
          específicas. Ley extranjera tampoco garantiza cobro ni evita una
          reestructuración.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="section-title">¿Qué pasa si necesito salir antes?</h2>
        {bondExitChoices.map((choice) => (
          <div key={choice.title}>
            <h3 className="text-sm font-semibold">{choice.title}</h3>
            <p className="body-copy mt-1">{choice.description}</p>
          </div>
        ))}
      </section>
      <Notice title="Un rendimiento alto refleja riesgos" warning>
        Una TIR elevada suele reflejar mayor riesgo percibido de crédito,
        default o reestructuración, además de condiciones de mercado y liquidez.
        Los pagos pueden cambiar o no cumplirse; verificá el prospecto y las
        condiciones vigentes antes de operar.
      </Notice>
      <RelatedLink to="/local/bopreal">
        Distinguir deuda del Tesoro de BOPREAL del BCRA
      </RelatedLink>
      <ReviewFooter review={sovereignReview} />
    </div>
  );
}
