import {
  InstrumentCard,
  Notice,
  PageHeader,
  RelatedLink,
  ReviewFooter,
} from "@/components/reference/Primitives";
import { instruments } from "@/data/ibkr/instruments";
import { reviewed } from "@/data/sources";
export default function AlternativesPage() {
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Instrumentos internacionales"
        title="Alternativas, según su rol"
        description="Compará qué exposición agrega cada fondo, dónde se superpone y qué riesgo introduce. No hay una distribución única correcta."
      />
      <Notice title="Más tickers no siempre significa más diversificación">
        CNDX comparte empresas con CSPX. VWRA ya incluye acciones
        estadounidenses. Entender la exposición conjunta importa más que contar
        fondos.
      </Notice>
      <div className="grid gap-5 lg:grid-cols-2">
        {instruments.map((instrument) => (
          <InstrumentCard key={instrument.symbol} instrument={instrument} />
        ))}
      </div>
      <section>
        <h2 className="section-title mb-3">Antes de sumar un instrumento</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
          <li>¿Qué objetivo y horizonte tiene ese dinero?</li>
          <li>¿Agrega exposición nueva o aumenta algo que ya tenés?</li>
          <li>¿Entendés sus caídas posibles, sus costos y su liquidez?</li>
          <li>¿Verificaste ISIN, clase, mercado y tratamiento de ingresos?</li>
        </ul>
      </section>
      <RelatedLink to="/ibkr/1042-s">
        Revisar ingresos directos y reportes
      </RelatedLink>
      <ReviewFooter
        review={{
          lastReviewed: reviewed,
          sources: instruments.flatMap((instrument) => instrument.sources),
        }}
      />
    </div>
  );
}
