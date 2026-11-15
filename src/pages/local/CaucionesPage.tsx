import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Notice,
  PageHeader,
  ReviewFooter,
} from "@/components/reference/Primitives";
import { caucionVsFci } from "@/data/local/reference";
import { localReview } from "@/data/sources";
export default function CaucionesPage() {
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="Financiación de corto plazo"
        title="Cauciones bursátiles"
        description="Una operación de préstamo con garantías en el mercado. Si colocás dinero, acordás un plazo y una tasa; quien toma el préstamo aporta activos en garantía."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          [
            "Colocador",
            "Aporta el dinero y espera recibir capital e intereses al vencimiento.",
          ],
          [
            "Tomador",
            "Recibe financiamiento y constituye las garantías exigidas.",
          ],
          [
            "Plazo fijo de la operación",
            "Seleccionás un vencimiento. No lo confundas con una inversión que rescatás a demanda.",
          ],
          [
            "Tasa y garantía",
            "La tasa se acuerda al operar. El mercado establece qué activos admite y cómo los valúa como respaldo.",
          ],
        ].map(([title, text]) => (
          <Card key={title} className="gap-3 shadow-none">
            <CardHeader>
              <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="body-copy">{text}</CardContent>
          </Card>
        ))}
      </div>
      <Notice title="Revisá el resultado neto y el vencimiento">
        La tasa publicada puede ser TNA: no es el porcentaje que ganás en unos
        pocos días. Antes de confirmar, mirá monto final, plazo, moneda,
        comisiones y cargos. El capital queda comprometido hasta el vencimiento
        acordado.
      </Notice>
      <section>
        <h2 className="section-title mb-4">Frente a un FCI money market</h2>
        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aspecto</TableHead>
                <TableHead>FCI money market</TableHead>
                <TableHead>Caución colocadora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caucionVsFci.map(([label, fci, caucion]) => (
                <TableRow key={label}>
                  <TableCell className="align-top font-medium">
                    {label}
                  </TableCell>
                  <TableCell className="min-w-44 align-top whitespace-normal leading-6 text-muted-foreground">
                    {fci}
                  </TableCell>
                  <TableCell className="min-w-44 align-top whitespace-normal leading-6 text-muted-foreground">
                    {caucion}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="body-copy mt-4">
          Un FCI money market puede incluir cauciones en su propia cartera. En
          ese caso, el administrador decide cómo usarlas; vos mantenés
          cuotapartes del fondo.
        </p>
      </section>
      <Notice
        title="La garantía reduce ciertos riesgos; no los elimina"
        warning
      >
        La protección depende de las reglas del mercado y de la gestión de
        garantías. Evaluá riesgos operativos, condiciones del intermediario y
        necesidad de liquidez antes de colocar.
      </Notice>
      <ReviewFooter review={localReview} />
    </div>
  );
}
