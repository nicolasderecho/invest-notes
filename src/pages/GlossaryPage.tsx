import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, ReviewFooter } from "@/components/reference/Primitives";
import { glossary, normalize } from "@/data/glossary";
import { buyingReview, localReview, taxReview, reviewed } from "@/data/sources";
export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const normalized = normalize(query.trim());
  const filtered = glossary.filter((entry) =>
    normalize(`${entry.term} ${entry.description}`).includes(normalized),
  );
  return (
    <div className="reading-stack">
      <PageHeader
        eyebrow="De la pantalla a palabras simples"
        title="Glosario de inversión"
        description="El término que ves en inglés, explicado en español. Buscá por nombre o por una palabra de la definición."
      />
      <section
        aria-label="Buscar términos"
        className="rounded-xl border bg-card p-5"
      >
        <label
          htmlFor="glossary-search"
          className="mb-2 block text-sm font-medium"
        >
          ¿Qué término querés entender?
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-3 left-3 size-4 text-muted-foreground" />
          <Input
            id="glossary-search"
            placeholder="Probá con Limit, dividendos, caución…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 pr-12 pl-9"
          />
          {query ? (
            <Button
              aria-label="Limpiar búsqueda"
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1"
              onClick={() => setQuery("")}
            >
              <X />
            </Button>
          ) : null}
        </div>
        <p className="mt-3 text-xs text-muted-foreground" role="status">
          {filtered.length} de {glossary.length} términos · Orden alfabético
        </p>
      </section>
      {filtered.length ? (
        <div className="divide-y rounded-xl border bg-card px-5 sm:px-6">
          {filtered.map((entry) => (
            <article
              key={entry.id}
              id={entry.id}
              className="scroll-mt-28 py-5 target:rounded-lg target:bg-accent/40 target:px-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="text-base font-semibold">{entry.term}</h2>
                {entry.href ? (
                  <Link
                    to={entry.href}
                    className="text-link inline-flex items-center gap-1 text-xs"
                  >
                    Ver guía
                    <ArrowUpRight className="size-3" />
                    <span className="sr-only"> sobre {entry.term}</span>
                  </Link>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {entry.description}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <Badge variant="secondary">Sin coincidencias</Badge>
          <h2 className="mt-4 text-lg font-semibold">
            No encontramos ese término
          </h2>
          <p className="body-copy mt-2">
            Probá otra palabra o limpiá la búsqueda para ver el glosario
            completo.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setQuery("")}
          >
            Ver todos los términos
          </Button>
        </div>
      )}
      <ReviewFooter
        review={{
          lastReviewed: reviewed,
          sources: [
            ...buyingReview.sources,
            ...localReview.sources,
            ...taxReview.sources.filter(
              (source) =>
                !buyingReview.sources.some((other) => other.url === source.url),
            ),
          ],
        }}
      />
    </div>
  );
}
