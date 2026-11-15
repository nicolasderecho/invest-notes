import { Link } from "react-router";
import {
  ArrowRight,
  ArrowLeftRight,
  ChartNoAxesCombined,
  ClipboardCheck,
  FileCheck2,
  Layers3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GuideCard,
  PageHeader,
  TaxNotice,
} from "@/components/reference/Primitives";
export default function IbkrHomePage() {
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Inversión internacional"
        title="Tu guía para IBKR"
        description="Compras recurrentes, inversión a largo plazo y explicaciones para entender lo que ves en tu cuenta."
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Largo plazo</Badge>
          <Badge variant="secondary">Aportes recurrentes</Badge>
          <Badge variant="outline">Referencia personal</Badge>
        </div>
      </PageHeader>
      <section className="rounded-xl border border-primary/20 bg-card p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow text-primary">El recorrido mensual</p>
            <h2 className="mt-3 text-2xl font-semibold">
              Comprar CSPX, paso a paso
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
              Confirmá el instrumento, prepará una orden Limit y verificá que se
              haya ejecutado.
            </p>
          </div>
          <Button asChild size="lg" className="self-start lg:self-auto">
            <Link to="/ibkr/buy-cspx">
              <ClipboardCheck />
              Abrir checklist
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t pt-4 text-xs text-muted-foreground">
          <span>
            ISIN{" "}
            <strong className="font-mono font-medium text-foreground">
              IE00B5BMR087
            </strong>
          </span>
          <span>Londres · USD</span>
          <span>Clase acumulativa</span>
        </div>
      </section>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="section-title">Entendé lo que estás haciendo</h2>
          <span className="hidden text-xs text-muted-foreground sm:block">
            Guías para volver a consultar
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <GuideCard
            to="/ibkr/cspx"
            icon={Layers3}
            title="Qué estás comprando"
            description="CSPX, S&P 500, acumulación y cómo verificar el ETF correcto."
          />
          <GuideCard
            to="/ibkr/portfolio"
            icon={ChartNoAxesCombined}
            title="¿Estoy ganando o perdiendo?"
            description="Diferenciá el valor de tu posición, su costo y el resultado abierto."
          />
          <GuideCard
            to="/ibkr/alternatives"
            icon={ArrowLeftRight}
            title="Alternativas, según su rol"
            description="Exposición global, sesgo tecnológico y bonos de corta duración."
          />
          <GuideCard
            to="/ibkr/1042-s"
            icon={FileCheck2}
            title="Qué revisar sobre 1042-S"
            description="Ingresos directos de fuente estadounidense y límites de esta referencia."
          />
        </div>
      </section>
      <TaxNotice />
    </div>
  );
}
