import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { AppRoutes } from "@/app/router";
import { ThemeProvider } from "@/app/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { glossary, normalize } from "@/data/glossary";
import { instruments } from "@/data/ibkr/instruments";
import { boprealSeries } from "@/data/local/bonds";

function route(path: string) {
  return render(
    <ThemeProvider>
      <TooltipProvider>
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>
      </TooltipProvider>
    </ThemeProvider>,
  );
}

describe("Renta fija local", () => {
  it("distingue USD normal de rescate ARS por serie y no ofrece rescate del tenedor en 1D", () => {
    route("/local/bopreal");
    const table = screen.getByRole("table");
    const dates = ["30/04/2025", "30/04/2026", "30/04/2027"];
    for (const [index, series] of boprealSeries.entries()) {
      const row = within(table)
        .getByRole("rowheader", { name: series.series })
        .closest("tr")!;
      expect(within(row).getByText("31/10/2027")).toBeVisible();
      expect(within(row).getByText("USD")).toBeVisible();
      if (index < 3) {
        expect(within(row).getByText(`Desde ${dates[index]}`)).toBeVisible();
        expect(within(row).getByText("ARS al A3500 aplicable")).toBeVisible();
      } else {
        expect(within(row).getByText("Sin opción del tenedor")).toBeVisible();
        expect(within(row).queryByText(/ARS/)).not.toBeInTheDocument();
      }
    }
  });
  it("usa las definiciones centrales en bonos soberanos y conserva la separación de navegación", async () => {
    const user = userEvent.setup();
    route("/local");
    const nav = screen.getByRole("navigation", { name: "Guías de la sección" });
    await user.click(
      within(nav).getByRole("link", { name: "Bonos soberanos" }),
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Bonos soberanos" }),
    ).toBeVisible();
    expect(
      screen.getByText(
        glossary.find((entry) => entry.term === "TIR")!.description,
      ),
    ).toBeVisible();
    expect(
      screen.queryByRole("link", { name: "Revisión 1042-S" }),
    ).not.toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "BOPREAL" })).toHaveAttribute(
      "href",
      "/local/bopreal",
    );
  });
});

describe("Identidad de alternativas", () => {
  it("mantiene clases únicas y la identidad LSE USD de CNDX y SMH UCITS", () => {
    expect(new Set(instruments.map((item) => item.isin)).size).toBe(
      instruments.length,
    );
    expect(
      instruments.find((item) => item.isin === "IE00B53SZB19"),
    ).toMatchObject({
      symbol: "CNDX",
      currency: "USD",
      listing: "London Stock Exchange",
      ucits: true,
      replication: "Física",
      ter: "≈ 0,30% anual",
    });
    expect(
      instruments.find((item) => item.isin === "IE00BMC38736"),
    ).toMatchObject({
      symbol: "SMH UCITS",
      domicile: "Irlanda",
      currency: "USD",
      ucits: true,
      ter: "≈ 0,35% anual",
    });
    expect(
      instruments.find((item) => item.isin === "IE000I8KRLL9"),
    ).toMatchObject({ symbol: "SEMI", income: "Accumulating" });
  });
  it("presenta la colisión de SMH y permite abrir la explicación diaria de TQQQ", async () => {
    const user = userEvent.setup();
    route("/ibkr/alternatives");
    expect(
      screen.getByText("SMH: el ticker por sí solo no identifica el fondo"),
    ).toBeVisible();
    expect(screen.getAllByText("IE00BMC38736")).toHaveLength(2);
    await user.click(
      screen.getByRole("button", { name: "TQQQ no es simplemente QQQ" }),
    );
    expect(screen.getByText(/3× el movimiento DIARIO/)).toBeVisible();
  });
});

describe("Dividendos y glosario", () => {
  it("abre referencias internas aunque el filtro oculte el término destino", async () => {
    const user = userEvent.setup();
    route("/glossary");
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Bull market" },
    });
    expect(
      screen.queryByRole("heading", { name: "Bullish" }),
    ).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("link", { name: "Ver guía sobre Bull market" }),
    );
    expect(screen.getByRole("heading", { name: "Bullish" })).toBeVisible();
    expect(screen.getByRole("textbox")).toHaveValue("");
  });
  it("explica la acreditación IOL como detalle opcional, sin confundir efectivo con reinversión", async () => {
    const user = userEvent.setup();
    route("/local/cedears");
    const section = screen.getByRole("region", {
      name: "Dividendos de CEDEARs: ¿dónde aparecen?",
    });
    expect(within(section).getByRole("table")).toBeVisible();
    await user.click(
      within(section).getByRole("button", { name: "Qué dice IOL" }),
    );
    expect(within(section).getByText(/72–96 horas hábiles/)).toBeVisible();
    await user.click(
      within(section).getByRole("button", {
        name: "Efectivo no es más CEDEARs",
      }),
    );
    expect(
      within(section).getByText(/no implica que IOL compre más certificados/),
    ).toBeVisible();
  });
  it("extiende el bloque de acumulación existente una sola vez", () => {
    route("/ibkr/cspx");
    expect(
      screen.getAllByText("100 participaciones de CSPX siguen siendo 100"),
    ).toHaveLength(1);
    expect(
      screen.getByText(/Ese aumento de cantidad proviene de tu nueva compra/),
    ).toBeVisible();
  });
  it("mantiene términos únicos y ordenados, con las nuevas definiciones solicitadas", () => {
    expect(new Set(glossary.map((item) => item.id)).size).toBe(glossary.length);
    expect(glossary.map((item) => item.term)).toEqual(
      glossary
        .map((item) => item.term)
        .sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" })),
    );
    for (const term of [
      "BOPREAL",
      "Sovereign bond",
      "Coupon",
      "Amortization",
      "Maturity",
      "TIR",
      "Nominal value",
      "Bull",
      "Bullish",
      "Bear",
      "Bearish",
      "Bull market",
      "Bear market",
      "Distributing ETF",
      "Ex-dividend date",
    ])
      expect(glossary.filter((item) => item.term === term)).toHaveLength(1);
  });
  it("busca sin acentos, también en los ejemplos, y permite abrir los matices alcistas", async () => {
    const user = userEvent.setup();
    route("/glossary");
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "AMORTIZACIÓN" } });
    expect(screen.getByRole("heading", { name: "Amortization" })).toBeVisible();
    fireEvent.change(input, { target: { value: "NVDA" } });
    expect(screen.getByRole("heading", { name: "Bullish" })).toBeVisible();
    await user.click(
      screen.getByRole("button", { name: "Ejemplo y matices de Bullish" }),
    );
    expect(
      screen.getByText(/sectores rezagados, correcciones temporales/),
    ).toBeVisible();
    expect(normalize("Bajista")).toBe("bajista");
  });
});
