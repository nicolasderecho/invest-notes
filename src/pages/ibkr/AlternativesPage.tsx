import {
  InstrumentCard,
  Notice,
  PageHeader,
  RelatedLink,
  ReviewFooter,
} from "@/components/reference/Primitives";
import { instruments } from "@/data/ibkr/instruments";
import {
  alternativeGroups,
  nasdaqNotes,
  treasuryNotes,
  treasuryReporting,
} from "@/data/ibkr/alternatives";
export default function AlternativesPage() {
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Instrumentos internacionales"
        title="Alternativas, según su rol"
        description="Acciones globales, Nasdaq-100 y Treasuries mediante ETFs irlandeses acumulativos. Compará exposición, solapamiento y riesgo; no hay una distribución única correcta."
      />
      <nav
        aria-label="Tipos de alternativas"
        className="flex flex-wrap gap-3 text-sm"
      >
        {alternativeGroups.map((group) => (
          <a key={group.id} className="text-link" href={`#${group.id}`}>
            {group.id === "equity-core"
              ? "Acciones globales"
              : group.id === "nasdaq-100"
                ? "Nasdaq-100"
                : "Treasuries"}
          </a>
        ))}
      </nav>
      <Notice title="Más tickers no siempre significa más diversificación">
        CNDX comparte empresas con CSPX. VWRA ya incluye acciones
        estadounidenses. Entender la exposición conjunta importa más que contar
        fondos.
      </Notice>
      {alternativeGroups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-title`}
          className="scroll-mt-24 space-y-4"
        >
          <h2 id={`${group.id}-title`} className="section-title">
            {group.title}
          </h2>
          <p className="body-copy">{group.description}</p>
          {group.id === "nasdaq-100" ? (
            <div className="space-y-3">
              {nasdaqNotes.map((note) => (
                <p className="body-copy" key={note}>
                  {note}
                </p>
              ))}
            </div>
          ) : null}
          <div className="grid gap-5 lg:grid-cols-2">
            {group.symbols
              .map((symbol) =>
                instruments.find((instrument) => instrument.symbol === symbol),
              )
              .filter((instrument) => instrument !== undefined)
              .map((instrument) => (
                <InstrumentCard
                  key={instrument.symbol}
                  instrument={instrument}
                />
              ))}
          </div>
          {group.id === "treasuries" ? (
            <>
              <ul className="list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
                {treasuryNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              <Notice title={treasuryReporting.title}>
                <div className="space-y-3">
                  {treasuryReporting.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <RelatedLink to="/ibkr/1042-s">
                    Ver criterios y excepciones de 1042-S
                  </RelatedLink>
                  <p className="text-xs">
                    Última revisión de esta explicación:{" "}
                    {treasuryReporting.lastReviewed}.
                  </p>
                </div>
              </Notice>
            </>
          ) : null}
        </section>
      ))}
      <section>
        <h2 className="section-title mb-3">Antes de sumar un instrumento</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
          <li>¿Qué objetivo y horizonte tiene ese dinero?</li>
          <li>¿Agrega exposición nueva o aumenta algo que ya tenés?</li>
          <li>¿Entendés sus caídas posibles, sus costos y su liquidez?</li>
          <li>¿Verificaste ISIN, clase, mercado y tratamiento de ingresos?</li>
        </ul>
      </section>
      <ReviewFooter
        review={{
          lastReviewed: treasuryReporting.lastReviewed,
          sources: [
            ...instruments.flatMap((instrument) => instrument.sources),
            ...treasuryReporting.sources.filter(
              (source) =>
                !instruments.some((instrument) =>
                  instrument.sources.some((other) => other.url === source.url),
                ),
            ),
          ],
        }}
      />
    </div>
  );
}
