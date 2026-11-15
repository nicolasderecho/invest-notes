import { useState } from "react";
import { Link } from "react-router";
import { CheckCheck, RotateCcw } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Notice,
  PageHeader,
  ReviewFooter,
} from "@/components/reference/Primitives";
import { MarketHours } from "@/components/reference/MarketHours";
import { ScreenshotExample } from "@/components/reference/ScreenshotExample";
import { buyingSteps } from "@/data/ibkr/buying-cspx";
import { buyingReview } from "@/data/sources";
import { glossary } from "@/data/glossary";
export default function BuyCspxPage() {
  const [done, setDone] = useState<Set<string>>(() => new Set());
  function toggle(id: string) {
    setDone((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Guía mensual · IBKR"
        title="Comprar CSPX, paso a paso"
        description="Un checklist para recorrer la compra con calma. Abrí las explicaciones cuando necesites recordar qué significa cada campo."
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Limit</Badge>
          <Badge variant="secondary">Day</Badge>
          <Badge variant="secondary">Outside RTH: No</Badge>
        </div>
      </PageHeader>
      <Notice title="Antes de empezar">
        Esta guía documenta un flujo personal de compra. Confirmá la
        elegibilidad para fracciones, los permisos y las condiciones que muestre
        tu cuenta. Marcar pasos acá no envía órdenes al broker.
      </Notice>
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium" role="status">
              {done.size} de {buyingSteps.length} pasos revisados
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Las marcas se reinician al salir de esta guía.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDone(new Set())}
            disabled={!done.size}
          >
            <RotateCcw />
            Reiniciar
          </Button>
        </div>
        <progress
          className="mt-4 h-1.5 w-full overflow-hidden rounded-full accent-primary"
          value={done.size}
          max={buyingSteps.length}
          aria-label="Pasos revisados"
        />
      </div>
      <ol className="space-y-4">
        {buyingSteps.map((step, index) => (
          <li
            key={step.id}
            className="scroll-mt-24 rounded-xl border bg-card p-5 sm:p-6"
            id={step.id}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-semibold leading-6">
                    {step.title}
                  </h2>
                  <Checkbox
                    checked={done.has(step.id)}
                    onCheckedChange={() => toggle(step.id)}
                    aria-label={`Marcar paso ${index + 1}: ${step.title}`}
                    className="mt-1 size-5 shrink-0"
                  />
                </div>
                <p className="body-copy mt-2">{step.summary}</p>
                {step.id === "hours" ? (
                  <p className="mt-2 text-xs text-primary">
                    Abrí “Entender este paso” para ver la sesión convertida a tu
                    zona.
                  </p>
                ) : null}
                {step.setting ? (
                  <div className="mt-3 rounded-md bg-muted px-3 py-2 font-mono text-xs leading-6 break-words">
                    {step.setting}
                  </div>
                ) : null}
                <Accordion type="single" collapsible>
                  <AccordionItem value="details" className="border-0">
                    <AccordionTrigger className="py-3 text-sm font-medium text-primary">
                      Entender este paso
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc space-y-3 pl-4 text-sm leading-7 text-muted-foreground">
                        {step.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                      {step.id === "hours" ? <MarketHours /> : null}
                      {step.terms ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {step.terms.map((term) => (
                            <Link
                              key={term}
                              className="text-link text-xs"
                              to={`/glossary#${glossary.find((entry) => entry.term === term)?.id || ""}`}
                            >
                              {term} ↗
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </li>
        ))}
      </ol>
      {done.size === buyingSteps.length ? (
        <Notice title="Checklist revisado">
          <CheckCheck className="mr-1 inline size-4" />
          Confirmá el estado real en IBKR. Este progreso solo registra tu
          revisión de la guía.
        </Notice>
      ) : null}
      <section className="space-y-4">
        <h2 className="section-title">Un ejemplo real del ticket</h2>
        <p className="body-copy">
          Ubicá el importe en USD, el precio límite por acción, Day y Outside
          RTH. El precio y el importe de la captura son históricos.
        </p>
        <ScreenshotExample
          src="/screenshots/ibkr/buy-cspx-order-ticket.png"
          alt="Ticket de compra CSPX en IBKR con cantidad en USD, orden Limit, vigencia Day y Outside RTH No"
          title="Ticket de compra"
          description="Observá que Quantity expresa el importe total en USD, mientras Limit Price fija el máximo por acción. La cotización visible indica Delayed Data."
        />
      </section>
      <ReviewFooter review={buyingReview} />
    </div>
  );
}
