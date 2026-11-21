import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Notice, RelatedLink, ReviewFooter } from "./Primitives";
import { ReferenceTable } from "./ReferenceTable";
import {
  cedearDividendFlow,
  dividendNotes,
  incomeComparison,
  incomeReview,
} from "@/data/income";
export function CedearDividends() {
  return (
    <section
      id="dividends"
      aria-labelledby="cedear-dividends-title"
      className="scroll-mt-24 space-y-4"
    >
      <h2 id="cedear-dividends-title" className="section-title">
        Dividendos de CEDEARs: ¿dónde aparecen?
      </h2>
      <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
        {cedearDividendFlow.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <Accordion type="multiple">
        {dividendNotes.map((note, index) => (
          <AccordionItem key={note.title} value={String(index)}>
            <AccordionTrigger>{note.title}</AccordionTrigger>
            <AccordionContent className="body-copy">
              {note.text}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <ReferenceTable
        caption="Distribución en efectivo vs. acumulación interna"
        headings={[
          "Concepto",
          "CEDEAR con dividendo en efectivo",
          "CSPX acumulativo",
        ]}
        rows={incomeComparison}
      />
      <Notice title="Reinvertir no significa recibir unidades extra">
        En CSPX el fondo reinvierte internamente: 100 participaciones siguen
        siendo 100. En un CEDEAR con pago en efectivo, vos decidís si usás ese
        dinero para comprar más certificados. La apreciación del capital puede
        capitalizarse en ambos casos.
      </Notice>
      <RelatedLink to="/ibkr/cspx#accumulation">
        Ver el flujo de acumulación dentro de CSPX
      </RelatedLink>
      <ReviewFooter review={incomeReview} />
    </section>
  );
}
