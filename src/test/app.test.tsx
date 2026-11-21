import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, it, expect, vi } from "vitest";
import { AppRoutes } from "@/app/router";
import { ThemeProvider, useTheme } from "@/app/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { buyingSteps } from "@/data/ibkr/buying-cspx";
import { instruments } from "@/data/ibkr/instruments";
function renderRoute(route: string) {
  return render(
    <ThemeProvider>
      <TooltipProvider>
        <MemoryRouter initialEntries={[route]}>
          <AppRoutes />
        </MemoryRouter>
      </TooltipProvider>
    </ThemeProvider>,
  );
}
describe("Rutas y navegación", () => {
  it.each([
    ["/", "Invertir, con contexto."],
    ["/ibkr", "Tu guía para IBKR"],
    ["/ibkr/cspx", "Qué es CSPX"],
    ["/ibkr/buy-cspx", "Comprar CSPX, paso a paso"],
    ["/ibkr/portfolio", "¿Estoy ganando o perdiendo?"],
    ["/ibkr/alternatives", "Alternativas, según su rol"],
    ["/ibkr/1042-s", "Qué revisar sobre Form 1042-S"],
    ["/local", "Inversión local, con contexto"],
    ["/local/cedears", "CEDEARs: qué estás comprando"],
    ["/local/fci", "FCI y Santander Super Ahorro"],
    ["/local/cauciones", "Cauciones bursátiles"],
    ["/local/bopreal", "BOPREAL: moneda, pagos y riesgos"],
    ["/local/bonos-soberanos", "Bonos soberanos"],
    ["/glossary", "Glosario de inversión"],
    ["/missing", "Esta nota no está acá"],
  ])("renderiza %s", (route, title) => {
    renderRoute(route);
    expect(
      screen.getByRole("heading", { level: 1, name: title }),
    ).toBeVisible();
  });
  it("diferencia áreas y ofrece compra en un clic", async () => {
    const user = userEvent.setup();
    renderRoute("/ibkr");
    const nav = screen.getByRole("navigation", {
      name: "Navegación principal",
    });
    for (const label of ["IBKR", "Inversión local", "Glosario"])
      expect(
        within(nav).getByRole("link", { name: label }),
      ).toBeInTheDocument();
    expect(
      within(
        screen.getByRole("navigation", { name: "Guías de la sección" }),
      ).queryByText("CEDEARs"),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: /Abrir checklist/ }));
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Comprar CSPX, paso a paso",
      }),
    ).toBeVisible();
    await user.click(
      within(nav).getByRole("link", { name: "Inversión local" }),
    );
    expect(
      screen.queryByRole("link", { name: "Revisión 1042-S" }),
    ).not.toBeInTheDocument();
  });
});
describe("Guías", () => {
  it("muestra el ISIN esperado y los campos de identidad", () => {
    renderRoute("/ibkr/cspx");
    expect(screen.getByText("IE00B5BMR087")).toBeVisible();
    expect(screen.getByText("Irlanda")).toBeVisible();
    expect(screen.getByText("London Stock Exchange")).toBeVisible();
  });
  it("incluye todos los pasos esenciales y permite revisar detalles", async () => {
    const user = userEvent.setup();
    renderRoute("/ibkr/buy-cspx");
    for (const step of buyingSteps)
      expect(
        screen.getByRole("heading", { level: 2, name: step.title }),
      ).toBeVisible();
    expect(buyingSteps.map((step) => step.id)).toEqual([
      "cash",
      "identity",
      "hours",
      "amount",
      "limit",
      "day",
      "rth",
      "delayed",
      "warnings",
      "filled",
      "statement",
    ]);
    const detailButtons = screen.getAllByRole("button", {
      name: "Entender este paso",
    });
    await user.click(detailButtons[8]);
    expect(screen.getByText(/Mandatory Cap Price:/)).toBeVisible();
    expect(screen.getByText(/Cash Quantity Order Confirmation:/)).toBeVisible();
    await user.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getByText("1 de 11 pasos revisados")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Reiniciar" }));
    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
  });
  it("renderiza los instrumentos con identidad completa", () => {
    renderRoute("/ibkr/alternatives");
    expect(instruments).toHaveLength(8);
    for (const instrument of instruments) {
      expect(instrument.isin).toMatch(/^IE[A-Z0-9]{10}$/);
      for (const field of [
        instrument.symbol,
        instrument.name,
        instrument.domicile,
        instrument.income,
        instrument.exposure,
        instrument.lastReviewed,
      ])
        expect(field.length).toBeGreaterThan(0);
      expect(
        screen.getByText(instrument.isin, { selector: "dd" }),
      ).toBeVisible();
      expect(instrument.sources.length).toBeGreaterThan(0);
    }
  });
});
describe("Glosario", () => {
  it("filtra sin distinguir mayúsculas ni acentos y busca definiciones", () => {
    renderRoute("/glossary");
    const input = screen.getByRole("textbox", {
      name: "¿Qué término querés entender?",
    });
    fireEvent.change(input, { target: { value: "uNrEaLiZeD" } });
    expect(
      screen.getByRole("heading", { name: "Unrealized P&L" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Ask" }),
    ).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: "CAUCION" } });
    expect(
      screen.getByRole("heading", { name: "Caución bursátil" }),
    ).toBeVisible();
  });
  it("permite recuperar la lista tras una búsqueda vacía", async () => {
    const user = userEvent.setup();
    renderRoute("/glossary");
    await user.type(screen.getByRole("textbox"), "zzzzzz");
    expect(screen.getByText("No encontramos ese término")).toBeVisible();
    await user.click(
      screen.getByRole("button", { name: "Ver todos los términos" }),
    );
    expect(screen.getByRole("heading", { name: "Ask" })).toBeVisible();
  });
});
function ThemeHarness() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <output>{theme}</output>
      <button onClick={() => setTheme("dark")}>Oscuro</button>
      <button onClick={() => setTheme("light")}>Claro</button>
      <button onClick={() => setTheme("system")}>Sistema</button>
    </>
  );
}
describe("Tema", () => {
  it("aplica, persiste y restaura la selección", async () => {
    const user = userEvent.setup();
    const view = render(
      <ThemeProvider>
        <ThemeHarness />
      </ThemeProvider>,
    );
    await user.click(screen.getByText("Oscuro"));
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("invest-notes-theme")).toBe("dark");
    view.unmount();
    render(
      <ThemeProvider>
        <ThemeHarness />
      </ThemeProvider>,
    );
    expect(document.documentElement).toHaveClass("dark");
    await user.click(screen.getByText("Claro"));
    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("invest-notes-theme")).toBe("light");
  });
  it("sigue cambios del sistema y limpia su listener", () => {
    let callback: () => void = () => {};
    const media = {
      matches: true,
      media: "",
      addEventListener: vi.fn((_event: string, cb: () => void) => {
        callback = cb;
      }),
      removeEventListener: vi.fn(),
    };
    vi.mocked(window.matchMedia).mockReturnValueOnce(
      media as unknown as MediaQueryList,
    );
    const view = render(
      <ThemeProvider>
        <ThemeHarness />
      </ThemeProvider>,
    );
    expect(document.documentElement).toHaveClass("dark");
    media.matches = false;
    callback();
    expect(document.documentElement).not.toHaveClass("dark");
    view.unmount();
    expect(media.removeEventListener).toHaveBeenCalledWith("change", callback);
  });
  it("tolera almacenamiento no disponible", () => {
    const spy = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("blocked");
      });
    render(
      <ThemeProvider>
        <ThemeHarness />
      </ThemeProvider>,
    );
    expect(screen.getByText("system")).toBeVisible();
    spy.mockRestore();
  });
});

describe("Interacciones de la interfaz", () => {
  it("abre, amplía y cierra un ejemplo con Escape", async () => {
    const user = userEvent.setup();
    renderRoute("/ibkr/buy-cspx");
    const trigger = screen.getByRole("button", {
      name: "Ver ejemplo: Ticket de compra",
    });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog");
    expect(
      within(dialog).getByRole("heading", { name: "Ticket de compra" }),
    ).toBeVisible();
    expect(within(dialog).getByRole("img")).toHaveAttribute(
      "alt",
      expect.stringContaining("CSPX"),
    );
    await user.click(within(dialog).getByRole("button", { name: "Ampliar" }));
    expect(
      within(dialog).getByRole("button", { name: "Ajustar a pantalla" }),
    ).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  it("permite cambiar el tema desde el menú", async () => {
    const user = userEvent.setup();
    renderRoute("/ibkr");
    await user.click(
      screen.getByRole("button", { name: "Cambiar tema: Sistema" }),
    );
    await user.click(screen.getByRole("menuitemradio", { name: "Oscuro" }));
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("invest-notes-theme")).toBe("dark");
  });
  it("abre la navegación móvil y la cierra al elegir un destino", async () => {
    const user = userEvent.setup();
    renderRoute("/ibkr");
    await user.click(screen.getByRole("button", { name: "Abrir navegación" }));
    const mobile = screen.getByRole("navigation", { name: "Navegación móvil" });
    expect(
      within(mobile).getByRole("link", { name: "Comprar CSPX" }),
    ).toBeVisible();
    await user.click(
      within(mobile).getByRole("link", { name: "Inversión local" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Inversión local, con contexto",
      }),
    ).toBeVisible();
  });
});
