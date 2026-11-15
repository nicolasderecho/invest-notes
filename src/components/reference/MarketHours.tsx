import { useId, useState } from "react";
import { Clock3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Notice, ReviewFooter } from "@/components/reference/Primitives";
import {
  dateInZone,
  detectBrowserTimeZone,
  formatTimeRange,
  getMarketSchedule,
} from "@/lib/market-hours";
import { marketHoursNotes, marketHoursReview } from "@/data/ibkr/market-hours";

export function MarketHours() {
  const id = useId();
  const [browserZone] = useState(detectBrowserTimeZone);
  const [selection, setSelection] = useState("browser");
  const [date, setDate] = useState(() =>
    dateInZone(new Date(), "Europe/London"),
  );
  const timeZone = selection === "browser" ? browserZone.timeZone : selection;
  const schedule = getMarketSchedule(date);
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="space-y-4 scroll-mt-24"
      id="market-hours"
    >
      <div>
        <p className="eyebrow mb-2">
          Horario de ejecución, no pronóstico de precio
        </p>
        <h2
          id={`${id}-heading`}
          className="section-title flex items-center gap-2"
        >
          <Clock3 className="size-5 shrink-0 text-primary" />
          ¿Cuándo operar CSPX?
        </h2>
        <p className="body-copy mt-3">
          Buscá el horario regular de Londres. Para este ETF de acciones
          estadounidenses, revisá también la coincidencia con la sesión de EE.
          UU. Operar dentro de esas horas no evita por completo saltos de
          precio.
        </p>
      </div>
      <Card className="gap-4 shadow-none">
        <CardHeader>
          <CardTitle className="text-base">
            Convertí la sesión a tu horario
          </CardTitle>
          <p className="text-xs leading-6 text-muted-foreground">
            {browserZone.detected
              ? `Zona detectada en tu navegador: ${browserZone.timeZone}.`
              : "No se pudo detectar tu zona. Mostramos UTC; podés elegir Buenos Aires u otra referencia."}{" "}
            No se solicita ubicación.
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`${id}-date`}
                className="mb-2 block text-sm font-medium"
              >
                Fecha de la sesión en Londres
              </label>
              <Input
                id={`${id}-date`}
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                aria-describedby={`${id}-calendar-note`}
              />
            </div>
            <div>
              <label
                htmlFor={`${id}-zone`}
                className="mb-2 block text-sm font-medium"
              >
                Mostrar horarios en
              </label>
              <select
                id={`${id}-zone`}
                className="h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm"
                value={selection}
                onChange={(event) => setSelection(event.target.value)}
              >
                <option value="browser">
                  {browserZone.detected ? "Mi zona" : "Zona de respaldo"} ·{" "}
                  {browserZone.timeZone}
                </option>
                <option value="America/Argentina/Buenos_Aires">
                  Buenos Aires
                </option>
                <option value="Europe/London">Londres</option>
                <option value="America/New_York">Nueva York</option>
              </select>
            </div>
          </div>
          <p
            id={`${id}-calendar-note`}
            className="text-xs leading-6 text-muted-foreground"
          >
            Horarios habituales de lunes a viernes. No se verifican feriados,
            cierres anticipados ni suspensiones. La fecha elegida corresponde al
            calendario de Londres.
          </p>
          {schedule ? (
            <>
              {schedule.weekend ? (
                <Notice title="La fecha elegida cae en fin de semana" warning>
                  No hay sesión regular prevista para sábado o domingo. Elegí un
                  día hábil y comprobá además los calendarios oficiales; las
                  franjas de abajo son solo la referencia horaria habitual.
                </Notice>
              ) : null}
              <div className="space-y-3" aria-live="polite" aria-atomic="true">
                <p className="text-xs font-medium break-words">
                  Horario mostrado en {timeZone} · Fecha de Londres: {date}
                </p>
                <dl className="space-y-3">
                  <div className="rounded-lg border p-4">
                    <dt className="text-sm font-medium">
                      Sesión regular de Londres
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">
                      {formatTimeRange(schedule.london, timeZone, date)}
                    </dd>
                    <dd className="mt-1 text-xs text-muted-foreground">
                      08:00–16:30 en Londres · Sesión continua habitual, sin
                      subastas
                    </dd>
                  </div>
                  <div className="rounded-lg border border-primary/20 bg-accent/30 p-4">
                    <dt className="text-sm font-medium">
                      Coincidencia Londres + EE. UU.
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">
                      {schedule.overlap
                        ? formatTimeRange(schedule.overlap, timeZone, date)
                        : "Sin coincidencia habitual"}
                    </dd>
                    <dd className="mt-2">
                      <Badge variant="secondary">Referencia operativa</Badge>
                    </dd>
                    <dd className="mt-2 text-xs leading-6 text-muted-foreground">
                      Calculada con la sesión estadounidense 09:30–16:00 de
                      Nueva York. No representa un estado de mercado en vivo ni
                      asegura mejores precios.
                    </dd>
                  </div>
                </dl>
              </div>
            </>
          ) : (
            <p role="status" className="text-sm text-muted-foreground">
              Elegí una fecha válida para convertir los horarios.
            </p>
          )}
          <Accordion type="single" collapsible>
            <AccordionItem value="why" className="border-0">
              <AccordionTrigger className="text-sm">
                Cómo usar esta franja y qué precauciones tomar
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-3 pl-4 text-sm leading-7 text-muted-foreground">
                  {marketHoursNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <ReviewFooter review={marketHoursReview} />
    </section>
  );
}
