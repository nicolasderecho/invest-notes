import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Info, ShieldAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Review, Instrument } from "@/data/types";
import { taxDisclaimer } from "@/data/sources";
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        {description}
      </p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
export function GuideCard({
  to,
  title,
  description,
  icon: Icon,
  label,
}: {
  to: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  label?: string;
}) {
  return (
    <Link
      to={to}
      className="group block h-full rounded-xl focus-visible:outline-offset-4"
    >
      <Card className="h-full gap-4 border-border bg-card shadow-none transition-colors group-hover:border-primary/40 group-hover:bg-accent/20">
        <CardHeader>
          <div className="mb-3 flex items-center justify-between">
            <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <Icon className="size-5" />
            </span>
            {label ? (
              <Badge variant="secondary">{label}</Badge>
            ) : (
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            )}
          </div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="leading-6">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
export function Notice({
  title,
  children,
  warning = false,
}: {
  title: string;
  children: ReactNode;
  warning?: boolean;
}) {
  const Icon = warning ? ShieldAlert : Info;
  return (
    <Alert
      className={
        warning
          ? "border-warning/20 bg-warning-foreground text-warning"
          : "border-info/15 bg-info-foreground text-info"
      }
    >
      <Icon className="size-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="text-inherit leading-6">
        {children}
      </AlertDescription>
    </Alert>
  );
}
export function TaxNotice() {
  return (
    <Notice title="Alcance de esta referencia" warning>
      {taxDisclaimer}
    </Notice>
  );
}
export function ReviewFooter({ review }: { review: Review }) {
  return (
    <div className="mt-10 border-t pt-5">
      <p className="text-xs text-muted-foreground">
        Última revisión:{" "}
        <time dateTime={review.lastReviewed}>{review.lastReviewed}</time> ·
        Datos e interfaces pueden cambiar.
      </p>
      <Accordion type="single" collapsible>
        <AccordionItem value="sources" className="border-0">
          <AccordionTrigger className="py-3 text-xs text-muted-foreground">
            Fuentes oficiales consultadas
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-3">
              {review.sources.map((source) => (
                <li key={source.url}>
                  <a
                    className="text-link inline-flex items-center gap-1 text-sm"
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.label}
                    <ArrowUpRight className="size-3" />
                    <span className="sr-only"> (abre en otra pestaña)</span>
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
export function InstrumentCard({ instrument }: { instrument: Instrument }) {
  return (
    <Card className="gap-4 shadow-none">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-xl">{instrument.symbol}</CardTitle>
          <Badge variant="secondary">{instrument.income}</Badge>
        </div>
        <CardDescription>{instrument.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium">{instrument.role}</p>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          {[
            ["Exposición", instrument.exposure],
            ["Domicilio", instrument.domicile],
            ["ISIN", instrument.isin],
            ["Cotización", `${instrument.listing} · ${instrument.currency}`],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-1 break-words font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <ul className="list-disc space-y-2 pl-4 text-sm leading-6 text-muted-foreground">
          {instrument.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">
          Revisado: {instrument.lastReviewed} ·{" "}
          <a
            href={instrument.sources[0].url}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Ficha oficial ↗
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
export function RelatedLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link inline-flex items-center gap-2 text-sm" to={to}>
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}
