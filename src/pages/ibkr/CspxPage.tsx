import { Link } from "react-router";
import { ArrowDown, ArrowRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Notice,
  PageHeader,
  ReviewFooter,
  RelatedLink,
} from "@/components/reference/Primitives";
import { MarketHours } from "@/components/reference/MarketHours";
import { cspx } from "@/data/ibkr/instruments";
export default function CspxPage() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(cspx.isin);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  }
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Identidad del instrumento"
        title="Qué es CSPX"
        description="Un ETF para acceder al S&P 500. Primero reconocé la clase; después, la cotización que vas a operar."
      />
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle className="text-3xl">CSPX</CardTitle>
            <Badge>UCITS</Badge>
            <Badge variant="secondary">Accumulating</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{cspx.name}</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6 rounded-lg bg-secondary p-4">
            <p className="eyebrow mb-2">Identidad de la clase · ISIN</p>
            <div className="flex flex-wrap items-center gap-3">
              <strong className="select-all font-mono text-xl sm:text-2xl">
                {cspx.isin}
              </strong>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copy}
                    aria-label="Copiar ISIN"
                  >
                    {copied ? <Check /> : <Copy />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copiar ISIN</TooltipContent>
              </Tooltip>
              <span role="status" className="text-xs text-muted-foreground">
                {copied
                  ? "Copiado"
                  : copyFailed
                    ? "Seleccioná y copiá el ISIN manualmente."
                    : ""}
              </span>
            </div>
          </div>
          <dl className="grid gap-5 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Domicilio", "Irlanda"],
              ["Cotización utilizada", "London Stock Exchange"],
              ["Moneda de negociación", "USD"],
              ["Ingresos", "Accumulating (acumulación)"],
              ["Exposición", "S&P 500"],
              ["Rol documentado", "Núcleo de acciones de EE. UU."],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
      <section>
        <h2 className="section-title mb-4">
          Índice, fondo y broker: tres cosas distintas
        </h2>
        <div className="grid items-center gap-3 rounded-xl border bg-card p-5 text-center sm:grid-cols-3">
          {[
            ["S&P 500", "El índice que se busca seguir"],
            ["CSPX", "El ETF que comprás"],
            ["IBKR", "El broker desde el que operás"],
          ].map(([title, description], index) => (
            <div key={title} className="relative rounded-lg bg-muted/50 p-4">
              <p className="font-semibold">{title}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {description}
              </p>
              {index < 2 ? (
                <ArrowDown className="mx-auto mt-3 size-4 text-muted-foreground sm:hidden" />
              ) : null}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="section-title mb-3">
          ¿Dónde veo los dividendos y la capitalización?
        </h2>
        <p className="body-copy">
          En una clase acumulativa, los ingresos recibidos de las inversiones
          quedan dentro del fondo. No esperes un pago de “intereses de CSPX” en
          tu saldo de efectivo.
        </p>
        <ol className="mt-4 space-y-3">
          {[
            "Las empresas subyacentes pueden generar ganancias y pagar dividendos.",
            "El fondo recibe ingresos y la clase acumulativa los retiene o reinvierte internamente.",
            "Ese efecto queda integrado en el valor del fondo; los rendimientos futuros actúan sobre una base que cambia.",
          ].map((text, i) => (
            <li key={text} className="flex gap-3 text-sm leading-6">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
                {i + 1}
              </span>
              {text}
            </li>
          ))}
        </ol>
        <p className="body-copy mt-4">
          Tus aportes mensuales compran más participaciones y cada aporte tiene
          su propio tiempo invertido. Reinvertir no impide que el precio baje ni
          asegura una tasa anual constante.
        </p>
      </section>
      <Notice title="No confundas moneda con exposición">
        Cotizar en USD no significa que el capital esté protegido. El domicilio
        es irlandés, la cotización elegida está en Londres y las empresas del
        índice son estadounidenses.
      </Notice>
      <MarketHours />
      <div className="flex flex-wrap items-center gap-5">
        <Button asChild>
          <Link to="/ibkr/buy-cspx">
            Ir a la guía de compra
            <ArrowRight />
          </Link>
        </Button>
        <RelatedLink to="/ibkr/1042-s">
          Revisar estructura e ingresos
        </RelatedLink>
      </div>
      <ReviewFooter review={cspx} />
    </div>
  );
}
