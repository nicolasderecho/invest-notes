import { ArrowLeftRight, Layers3, Wallet } from "lucide-react";
import {
  GuideCard,
  Notice,
  PageHeader,
  ReviewFooter,
} from "@/components/reference/Primitives";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { localRoles } from "@/data/local/reference";
import { localReview } from "@/data/sources";
export default function LocalHomePage() {
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Argentina"
        title="Inversión local, con contexto"
        description="Distinguí exposición de largo plazo, dinero para gastos y alternativas para estacionar pesos. Cada instrumento cumple un rol diferente."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <GuideCard
          to="/local/cedears"
          title="CEDEARs"
          description="Activos extranjeros que operás en el mercado local. Ejemplos: GLD y QQQ."
          icon={Layers3}
        />
        <GuideCard
          to="/local/fci"
          title="FCI y Super Ahorro"
          description="Cuotapartes, rescates y fondos para administrar liquidez."
          icon={Wallet}
        />
        <GuideCard
          to="/local/cauciones"
          title="Cauciones"
          description="Prestar a corto plazo, con garantía, tasa y vencimiento acordados."
          icon={ArrowLeftRight}
        />
      </div>
      <section>
        <h2 className="section-title mb-3">
          ¿Qué necesidad resuelve cada uno?
        </h2>
        <p className="body-copy mb-5">
          Comparación conceptual. Revisá condiciones específicas del producto y
          de tu banco o broker antes de operar.
        </p>
        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instrumento</TableHead>
                <TableHead>Rol y liquidez</TableHead>
                <TableHead>Qué tener presente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localRoles.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="min-w-32 align-top font-medium whitespace-normal">
                    {item.name}
                  </TableCell>
                  <TableCell className="min-w-44 align-top whitespace-normal">
                    <p>{item.role}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.liquidity}
                    </p>
                  </TableCell>
                  <TableCell className="min-w-48 align-top text-muted-foreground whitespace-normal leading-6">
                    {item.risk}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground sm:hidden">
          Deslizá la tabla horizontalmente para ver todas las columnas.
        </p>
      </section>
      <Notice title="Pensá primero en cuándo necesitás el dinero">
        Una alternativa que sirve para invertir a varios años puede no servir
        para un pago del mes próximo. Liquidez, volatilidad y riesgo de moneda
        son preguntas distintas.
      </Notice>
      <ReviewFooter review={localReview} />
    </div>
  );
}
