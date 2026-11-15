import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Notice,
  PageHeader,
  ReviewFooter,
} from "@/components/reference/Primitives";
import { ScreenshotExample } from "@/components/reference/ScreenshotExample";
import { metrics } from "@/data/ibkr/portfolio-metrics";
import { portfolioReview } from "@/data/sources";
export default function PortfolioPage() {
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Leer tu cuenta · IBKR"
        title="¿Estoy ganando o perdiendo?"
        description="Para una posición que todavía conservás, empezá por Unrealized P&L. Para el conjunto de tu cuenta, mirá Net Liquidation."
      />
      <section className="rounded-xl border bg-card p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="section-title">Una posición, tres valores</h2>
          <Badge variant="outline">Ejemplo hipotético en USD</Badge>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            ["Cost Basis", "3,410", "Lo que registra IBKR como costo"],
            ["Market Value", "3,500", "Lo que vale aproximadamente ahora"],
            ["Unrealized P&L", "≈ +90", "Ganancia abierta, sin vender"],
          ].map(([term, value, description], index) => (
            <div key={term} className="rounded-lg bg-muted/60 p-4">
              <p className="text-xs font-medium text-muted-foreground">
                {term}
              </p>
              <p
                className={`mt-2 text-3xl font-semibold tabular-nums ${index === 2 ? "text-success" : ""}`}
              >
                {value}
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
        <p className="body-copy mt-4">
          Compará importes en la misma moneda. Una venta futura tendrá su propio
          precio de ejecución, spread y comisión; +90 no es una promesa del
          efectivo que recibirías.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="section-title">Los nombres que muestra IBKR</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {metrics.map((metric) => (
            <Card
              key={metric.id}
              id={metric.id}
              className="scroll-mt-24 gap-3 shadow-none"
            >
              <CardHeader>
                <CardTitle className="text-base">{metric.term}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7">{metric.description}</p>
                {metric.detail ? (
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {metric.detail}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Notice title="Total de la cuenta no equivale a dinero retirable">
        Net Liquidation es una valoración aproximada. Los fondos para retirar
        pueden depender de liquidación, retenciones, obligaciones, conversión de
        monedas y costos.
      </Notice>
      <section className="space-y-4">
        <h2 className="section-title">Ubicalo en la pantalla</h2>
        <div className="flex flex-wrap gap-3">
          <ScreenshotExample
            src="/screenshots/ibkr/portfolio-position-metrics.png"
            alt="Portfolio de IBKR con CSPX, Cost Basis, Market Value, Daily P&L y Unrealized P&L"
            title="Métricas de una posición"
            description="Compará Cost Basis y Market Value; después ubicá Unrealized P&L. Daily P&L mide otro período."
          />
          <ScreenshotExample
            src="/screenshots/ibkr/account-balances.png"
            alt="Pantalla Balances de IBKR con Net Liquidation, Cash, Settled Cash y Unsettled Cash"
            title="Saldos de la cuenta"
            description="Net Liquidation resume el valor total. Cash y Settled Cash describen saldos con distinta situación de liquidación; no los sumes como si fueran dinero adicional."
          />
        </div>
      </section>
      <ReviewFooter review={portfolioReview} />
    </div>
  );
}
