import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Notice,
  PageHeader,
  RelatedLink,
  ReviewFooter,
} from "@/components/reference/Primitives";
import { ScreenshotExample } from "@/components/reference/ScreenshotExample";
import { cedears } from "@/data/local/reference";
import { localReview } from "@/data/sources";
import { CedearDividends } from "@/components/reference/CedearDividends";
export default function CedearsPage() {
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Mercado argentino"
        title="CEDEARs: qué estás comprando"
        description="Un Certificado de Depósito Argentino representa un activo extranjero y se negocia en el mercado local a través de tu broker."
      />
      <Notice title="Operar en pesos no lo convierte en renta fija">
        El valor en ARS depende del activo subyacente, del tipo de cambio
        financiero implícito y de la relación de conversión del certificado.
        Puede bajar aunque el dólar suba.
      </Notice>
      <section>
        <h2 className="section-title mb-3">
          Dos movimientos detrás del precio
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-base">
                1. El activo extranjero
              </CardTitle>
            </CardHeader>
            <CardContent className="body-copy">
              La acción o ETF que representa puede subir o bajar en su mercado
              de origen.
            </CardContent>
          </Card>
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-base">2. El canal cambiario</CardTitle>
            </CardHeader>
            <CardContent className="body-copy">
              La conversión a ARS incorpora un tipo de cambio financiero. No
              asumas que se mueve igual que una cotización bancaria.
            </CardContent>
          </Card>
        </div>
      </section>
      <section>
        <h2 className="section-title mb-4">Ejemplos familiares</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {cedears.map((item) => (
            <Card key={item.symbol} className="shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{item.symbol}</CardTitle>
                  <Badge variant="secondary">{item.exposure}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-7">{item.role}</p>
                <p className="body-copy">{item.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className="section-title mb-3">Ticker base, D y C</h2>
        <dl className="space-y-4 text-sm">
          {[
            [
              "Base (GLD, QQQ)",
              "Habitualmente identifica la negociación en ARS.",
            ],
            [
              "Sufijo D",
              "Puede identificar la especie con liquidación en USD local / MEP.",
            ],
            [
              "Sufijo C",
              "Puede identificar la especie con liquidación en dólar cable.",
            ],
          ].map(([label, description]) => (
            <div key={label} className="border-b pb-3">
              <dt className="font-medium">{label}</dt>
              <dd className="mt-1 leading-6 text-muted-foreground">
                {description}
              </dd>
            </div>
          ))}
        </dl>
        <p className="body-copy mt-4">
          Confirmá la especie, moneda de liquidación, disponibilidad y
          convenciones exactas en la bolsa y tu broker al operar.
        </p>
      </section>
      <section>
        <h2 className="section-title mb-3">Horizonte y costo de operar</h2>
        <p className="body-copy">
          Podés mantener CEDEARs a largo plazo. Eso no elimina el riesgo del
          activo ni garantiza recuperar capital en una fecha concreta. Revisá
          liquidez, Bid, Ask y Spread; un spread amplio puede importar más que
          una pequeña diferencia de comisión. Una orden Limit controla el
          precio, aunque no garantiza ejecución.
        </p>
        <div className="mt-4">
          <RelatedLink to="/glossary#spread">
            Repasar Bid, Ask y Spread
          </RelatedLink>
        </div>
      </section>
      <CedearDividends />
      <ScreenshotExample
        src="/screenshots/local/cedears-gld-qqq.jpg"
        alt="Tenencias históricas de CEDEARs GLD y QQQ en un broker argentino, expresadas en pesos"
        title="GLD y QQQ en un broker local"
        description="Ubicá los certificados GLD y QQQ. Los valores en ARS de esta captura histórica no son precios actuales ni rendimientos esperados."
      />
      <ReviewFooter review={localReview} />
    </div>
  );
}
