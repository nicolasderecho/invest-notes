import { CheckCircle2, FileSearch, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PageHeader,
  ReviewFooter,
  TaxNotice,
} from "@/components/reference/Primitives";
import { taxReview } from "@/data/sources";
const reviewItems = [
  "VOO, SPY, IVV y QQQ: ETFs domiciliados en EE. UU.",
  "Acciones estadounidenses que pagan dividendos",
  "Treasuries estadounidenses mantenidos directamente",
  "ETFs de bonos domiciliados en EE. UU. que distribuyen ingresos",
  "Efectivo liquidado remunerado en IBKR",
];
export default function TaxReportingPage() {
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Estructura e impuestos · IBKR"
        title="Qué revisar sobre Form 1042-S"
        description="La pregunta es qué pagos recibís directamente y cómo se reportan. La calidad de una inversión y su tratamiento fiscal son evaluaciones diferentes."
      />
      <TaxNotice />
      <section className="space-y-4">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <CheckCircle2 className="size-5 text-primary" />
              Patrón actualmente preferido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm font-medium">
              ETF UCITS irlandés, clase acumulativa
            </p>
            <p className="body-copy">
              Sos titular de participaciones del fondo; el fondo mantiene los
              activos subyacentes. Bajo la estructura revisada, normalmente no
              recibís un dividendo estadounidense directo de esas empresas como
              lo recibirías al tener la acción o un ETF estadounidense
              distribuidor.
            </p>
            <p className="body-copy">
              Que el fondo acumule no elimina posibles impuestos dentro de él ni
              tus obligaciones locales. Tampoco garantiza que tu cuenta nunca
              reciba un 1042-S por otro concepto.
            </p>
          </CardContent>
        </Card>
        <Card className="border-warning/25 shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <FileSearch className="size-5 text-warning" />
              Revisar cuidadosamente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
              {reviewItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="body-copy mt-4">
              Son ejemplos que requieren revisar la fuente, la naturaleza del
              ingreso, la entidad pagadora y las excepciones. No todos los
              intereses tienen idénticas reglas.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <Info className="size-5 text-primary" />
              Por qué importa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="body-copy">
              El 1042-S documenta determinadas rentas de fuente estadounidense
              pagadas a personas extranjeras. Puede haber reporte aun cuando no
              se retenga impuesto: “sin retención” y “sin reporte” no son
              equivalentes.
            </p>
            <p className="body-copy">
              El W-8BEN acredita tu condición de persona extranjera y, si
              corresponde, beneficios de tratado. No vuelve todos tus ingresos
              exentos ni evita todos los formularios.
            </p>
            <p className="body-copy">
              La conclusión debe revisarse para tu residencia fiscal, la entidad
              de IBKR y el año correspondiente. Esta página no determina tus
              obligaciones en Argentina.
            </p>
          </CardContent>
        </Card>
      </section>
      <ReviewFooter review={taxReview} />
    </div>
  );
}
