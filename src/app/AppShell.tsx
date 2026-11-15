import { useEffect, useRef } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { ArrowUpRight, BookOpen, Menu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  primaryNav,
  ibkrNav,
  localNav,
  glossaryNav,
  homeNav,
} from "@/data/navigation";
import { cn } from "@/lib/utils";
export function AppShell() {
  const { pathname, hash } = useLocation();
  const main = useRef<HTMLElement>(null);
  const initial = useRef(true);
  const area = pathname.startsWith("/ibkr")
    ? "IBKR"
    : pathname.startsWith("/local")
      ? "Inversión local"
      : pathname.startsWith("/glossary")
        ? "Glosario"
        : "Tu biblioteca";
  const nav =
    area === "IBKR"
      ? ibkrNav
      : area === "Inversión local"
        ? localNav
        : area === "Glosario"
          ? glossaryNav
          : homeNav;
  useEffect(() => {
    if (hash) {
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView({ block: "center" });
    } else {
      window.scrollTo(0, 0);
      if (!initial.current) main.current?.focus({ preventScroll: true });
    }
    initial.current = false;
  }, [pathname, hash]);
  useEffect(() => {
    const title = nav.find((item) => item.to === pathname)?.label;
    document.title = `${title || "Notas de inversión"} · Referencia personal`;
  }, [pathname, nav]);
  const sectionLinks = (mobile = false) =>
    nav.map(({ label, to, icon: Icon }) => {
      const link = (
        <NavLink
          end
          to={to}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              isActive
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )
          }
        >
          <Icon className="size-4" />
          {label}
        </NavLink>
      );
      return mobile ? (
        <SheetClose asChild key={to}>
          {link}
        </SheetClose>
      ) : (
        <div key={to}>{link}</div>
      );
    });
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-card focus:p-3"
      >
        Saltar al contenido
      </a>
      <header className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur-sm">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 font-semibold tracking-tight"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="size-5" />
            </span>
            <span>
              Notas de inversión
              <span className="hidden text-xs font-normal tracking-normal text-muted-foreground sm:block">
                Tu referencia personal
              </span>
            </span>
          </Link>
          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-1 md:flex"
          >
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-4 py-2 text-sm font-medium",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="md:hidden"
                  variant="ghost"
                  size="icon"
                  aria-label="Abrir navegación"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Notas de inversión</SheetTitle>
                  <SheetDescription>Elegí un área o una guía.</SheetDescription>
                </SheetHeader>
                <nav aria-label="Navegación móvil" className="space-y-2 px-5">
                  {primaryNav.map((item) => (
                    <SheetClose asChild key={item.to}>
                      <Link
                        className="block rounded-md px-3 py-3 font-medium hover:bg-accent"
                        to={item.to}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <Separator />
                  <p className="eyebrow px-3 py-3">{area}</p>
                  {sectionLinks(true)}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl md:grid-cols-[15rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden border-r px-5 md:block">
          <div className="sticky top-18 flex min-h-[calc(100dvh-4.5rem)] flex-col py-8">
            <p className="eyebrow mb-4 px-3">{area}</p>
            <nav aria-label="Guías de la sección" className="space-y-1">
              {sectionLinks()}
            </nav>
            <Separator className="my-6" />
            <Link
              to="/glossary"
              className="flex items-center justify-between gap-2 px-3 text-sm text-muted-foreground hover:text-primary"
            >
              Consultar un término
              <ArrowUpRight className="size-4" />
            </Link>
            <div className="mt-auto px-3 pt-12">
              <ShieldCheck className="mb-2 size-4 text-muted-foreground" />
              <p className="text-xs leading-5 text-muted-foreground">
                Una biblioteca para consultar a tu ritmo.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Contenido estático · Sin conexión al broker
              </p>
            </div>
          </div>
        </aside>
        <div className="min-w-0">
          <main
            id="main"
            tabIndex={-1}
            ref={main}
            className="min-h-[calc(100dvh-12rem)] px-5 py-7 outline-none sm:px-8 sm:py-9 lg:px-12"
          >
            <div className="mb-7 flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary">
                Biblioteca
              </Link>
              <span>/</span>
              <span>{area}</span>
            </div>
            <Outlet />
          </main>
          <footer className="mx-5 flex flex-col justify-between gap-3 border-t py-6 text-xs leading-5 text-muted-foreground sm:mx-8 sm:flex-row lg:mx-12">
            <span>Notas personales para entender y recordar.</span>
            <span>No es asesoramiento financiero ni impositivo.</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
