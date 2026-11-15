import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Globe2,
  Landmark,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GuideCard, PageHeader } from "@/components/reference/Primitives";
export default function HomePage() {
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Una idea clara, a la vez"
        title="Invertir, con contexto."
        description="Tu biblioteca personal para recordar cómo operar y entender qué significa cada decisión."
      >
        <Badge variant="outline">Referencia en español</Badge>
      </PageHeader>
      <section className="rounded-xl border border-primary/15 bg-accent/40 p-6 sm:p-8">
        <ClipboardCheck className="mb-5 size-7 text-primary" />
        <p className="eyebrow text-primary">Tu consulta más frecuente</p>
        <h2 className="mt-2 text-2xl font-semibold">
          ¿Cómo compro CSPX otra vez?
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
          Desde verificar el ETF correcto hasta confirmar la ejecución. Un paso
          a paso con los términos que vas a encontrar en IBKR.
        </p>
        <Button asChild className="mt-6">
          <Link to="/ibkr/buy-cspx">
            Abrir guía de compra
            <ArrowRight />
          </Link>
        </Button>
      </section>
      <section>
        <h2 className="section-title mb-4">Elegí dónde consultar</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          <GuideCard
            to="/ibkr"
            icon={Globe2}
            title="IBKR"
            description="CSPX, órdenes, portfolio y alternativas internacionales."
          />
          <GuideCard
            to="/local"
            icon={Landmark}
            title="Inversión local"
            description="CEDEARs, fondos y cauciones en Argentina."
          />
          <GuideCard
            to="/glossary"
            icon={BookOpen}
            title="Glosario"
            description="Términos de inversión explicados en pocas palabras."
          />
        </div>
      </section>
      <p className="body-copy">
        Consultá los conceptos y revisá las fuentes antes de operar. Los
        ejemplos son históricos o hipotéticos; no muestran cotizaciones ni
        saldos actuales.
      </p>
    </div>
  );
}
