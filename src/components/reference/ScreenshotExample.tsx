import { useState } from "react";
import { Image, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export function ScreenshotExample({
  src,
  alt,
  title,
  description,
}: {
  src: string;
  alt: string;
  title: string;
  description: string;
}) {
  const [zoom, setZoom] = useState(false);
  return (
    <Dialog onOpenChange={() => setZoom(false)}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-auto whitespace-normal py-2.5 text-left"
        >
          <Image className="size-4 shrink-0" />
          Ver ejemplo: {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] max-w-[95vw] overflow-y-auto sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Captura histórica · Importes ilustran ese momento, no tu saldo
            actual.
          </p>
          <Button size="sm" variant="secondary" onClick={() => setZoom(!zoom)}>
            {zoom ? <ZoomOut /> : <ZoomIn />}
            {zoom ? "Ajustar a pantalla" : "Ampliar"}
          </Button>
        </div>
        <div
          className="max-h-[60dvh] overflow-auto rounded-md border"
          tabIndex={0}
          aria-label="Imagen desplazable"
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={zoom ? "h-auto w-auto max-w-none" : "h-auto w-full"}
          />
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          {description} La interfaz del broker puede cambiar.
        </p>
      </DialogContent>
    </Dialog>
  );
}
