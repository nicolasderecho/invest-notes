import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/reference/Primitives";
export default function NotFoundPage() {
  return (
    <>
      <PageHeader
        eyebrow="Página no encontrada"
        title="Esta nota no está acá"
        description="El enlace puede ser incorrecto. Volvé a la biblioteca para encontrar la guía que buscás."
      />
      <Button asChild>
        <Link to="/">Volver al inicio</Link>
      </Button>
    </>
  );
}
