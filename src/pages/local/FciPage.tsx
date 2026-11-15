import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Notice,
  PageHeader,
  RelatedLink,
  ReviewFooter,
} from "@/components/reference/Primitives";
import { localReview } from "@/data/sources";
export default function FciPage() {
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Fondos Comunes de Inversión"
        title="FCI y Santander Super Ahorro"
        description="Un FCI reúne dinero de varios inversores. Un administrador lo invierte según el mandato del fondo; vos participás a través de cuotapartes."
      />
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["Suscribir", "Ingresás dinero y recibís cuotapartes."],
          [
            "Mantener",
            "El valor de tu tenencia cambia con el valor de la cuotaparte.",
          ],
          [
            "Rescatar",
            "Solicitás convertir tu participación en dinero, según las reglas del fondo.",
          ],
        ].map(([title, text]) => (
          <Card key={title} className="gap-3 shadow-none">
            <CardHeader>
              <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="body-copy">{text}</CardContent>
          </Card>
        ))}
      </section>
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle className="text-xl">Super Ahorro $</CardTitle>
            <Badge variant="secondary">Liquidez en ARS</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="body-copy">
            Es el ejemplo concreto para entender un fondo de mercado de dinero y
            perfil conservador. Su función en esta referencia es estacionar
            pesos de corto plazo, con menor volatilidad esperada que activos
            accionarios.
          </p>
          <p className="body-copy">
            No cumple el mismo rol que QQQ o GLD. El rendimiento se refleja en
            la cuotaparte y cambia con la cartera; no mostramos una tasa fija ni
            una renta actual.
          </p>
          <p className="body-copy">
            Santander publica el plazo de rescate y las condiciones de cada
            fondo. Verificá el producto exacto, tu clase de cuotaparte y el
            canal: fondos con nombres parecidos pueden tener otra cartera o
            liquidez.
          </p>
        </CardContent>
      </Card>
      <Notice title="Conservador no significa garantizado" warning>
        Un FCI no es un plazo fijo ni un depósito bancario. La disponibilidad y
        el resultado dependen del reglamento, los activos y las condiciones
        operativas.
      </Notice>
      <section>
        <h2 className="section-title mb-3">Antes de suscribir</h2>
        <Accordion type="multiple">
          {[
            [
              "liquidez",
              "¿Cuándo puedo rescatar?",
              "Revisá el plazo, los horarios, el canal y eventuales límites. “Inmediato” no debe interpretarse como disponibilidad incondicional en cualquier situación.",
            ],
            [
              "riesgo",
              "¿En qué invierte?",
              "Leé el reglamento y la composición de cartera. Money market es una categoría; no todos los FCI tienen el mismo riesgo.",
            ],
            [
              "costos",
              "¿Qué costos y rendimiento miro?",
              "Identificá la clase y los honorarios aplicables. Los rendimientos pasados, incluso anualizados, no son una tasa prometida para los próximos días.",
            ],
          ].map(([id, title, text]) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent className="body-copy">{text}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <RelatedLink to="/local/cauciones">
        Comparar con una caución colocadora
      </RelatedLink>
      <ReviewFooter review={localReview} />
    </div>
  );
}
