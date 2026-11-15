import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { MarketHours } from "@/components/reference/MarketHours";
import { AppRoutes } from "@/app/router";
import { ThemeProvider } from "@/app/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  dateInZone,
  detectBrowserTimeZone,
  formatTimeRange,
  getMarketSchedule,
} from "@/lib/market-hours";
import { instruments } from "@/data/ibkr/instruments";
import { alternativeGroups } from "@/data/ibkr/alternatives";

const buenosAires = "America/Argentina/Buenos_Aires";

describe("Conversión de sesiones", () => {
  it.each([
    ["2026-01-15", "05:00 – 13:30", "11:30 – 13:30"],
    ["2026-07-15", "04:00 – 12:30", "10:30 – 12:30"],
    ["2026-03-16", "05:00 – 13:30", "10:30 – 13:30"],
    ["2026-10-28", "05:00 – 13:30", "10:30 – 13:30"],
  ])(
    "resuelve Londres y Nueva York por separado para %s",
    (date, london, overlap) => {
      const schedule = getMarketSchedule(date)!;
      expect(formatTimeRange(schedule.london, buenosAires, date)).toBe(london);
      expect(formatTimeRange(schedule.overlap!, buenosAires, date)).toBe(
        overlap,
      );
    },
  );
  it("aplica el cambio de Londres de marzo y octubre", () => {
    expect(getMarketSchedule("2026-03-27")!.london.start.toISOString()).toBe(
      "2026-03-27T08:00:00.000Z",
    );
    expect(getMarketSchedule("2026-03-30")!.london.start.toISOString()).toBe(
      "2026-03-30T07:00:00.000Z",
    );
    expect(getMarketSchedule("2026-10-23")!.london.end.toISOString()).toBe(
      "2026-10-23T15:30:00.000Z",
    );
    expect(getMarketSchedule("2026-10-26")!.london.end.toISOString()).toBe(
      "2026-10-26T16:30:00.000Z",
    );
  });
  it("incluye la fecha local si la sesión cruza medianoche", () => {
    const range = getMarketSchedule("2026-01-15")!.london;
    expect(formatTimeRange(range, "Asia/Tokyo", "2026-01-15")).toBe(
      "17:00 (15/01/2026) – 01:30 (16/01/2026)",
    );
  });
  it("usa el día de Londres aunque el equipo esté en otra fecha", () => {
    const instant = new Date("2026-07-15T23:30:00Z");
    expect(dateInZone(instant, "Europe/London")).toBe("2026-07-16");
    expect(dateInZone(instant, buenosAires)).toBe("2026-07-15");
  });
  it.each(["", "2026-02-30", "2026-13-10", "invalid", "15/01/2026"])(
    "rechaza la fecha inválida %s",
    (date) => expect(getMarketSchedule(date)).toBeNull(),
  );
  it("marca fines de semana sin presentarlos como sesiones confirmadas", () => {
    expect(getMarketSchedule("2026-11-15")!.weekend).toBe(true);
    expect(getMarketSchedule("2026-11-16")!.weekend).toBe(false);
  });
  it("usa UTC explícitamente si no hay zona disponible", () => {
    const spy = vi
      .spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions")
      .mockImplementation(() => {
        throw new Error("Unavailable");
      });
    try {
      expect(detectBrowserTimeZone()).toEqual({
        timeZone: "UTC",
        detected: false,
      });
    } finally {
      spy.mockRestore();
    }
  });
});

describe("Referencia de horarios", () => {
  it("muestra la zona inferida y permite comparar Buenos Aires en invierno y verano", () => {
    const detected = detectBrowserTimeZone().timeZone;
    render(<MarketHours />);
    expect(
      screen.getByText(
        `Zona detectada en tu navegador: ${detected}. No se solicita ubicación.`,
      ),
    ).toBeVisible();
    const zone = screen.getByRole("combobox", { name: "Mostrar horarios en" });
    fireEvent.change(zone, { target: { value: buenosAires } });
    const date = screen.getByLabelText("Fecha de la sesión en Londres");
    fireEvent.change(date, { target: { value: "2026-01-15" } });
    expect(screen.getByText("05:00 – 13:30")).toBeVisible();
    expect(screen.getByText("11:30 – 13:30")).toBeVisible();
    fireEvent.change(date, { target: { value: "2026-07-15" } });
    expect(screen.getByText("04:00 – 12:30")).toBeVisible();
    expect(screen.getByText("10:30 – 12:30")).toBeVisible();
    fireEvent.change(zone, { target: { value: "Europe/London" } });
    expect(screen.getByText("08:00 – 16:30")).toBeVisible();
  });
  it("advierte sobre fines de semana, fechas vacías y límites del calendario", () => {
    render(<MarketHours />);
    const date = screen.getByLabelText("Fecha de la sesión en Londres");
    fireEvent.change(date, { target: { value: "2026-11-15" } });
    expect(
      screen.getByText("La fecha elegida cae en fin de semana"),
    ).toBeVisible();
    expect(screen.getByText(/No se verifican feriados/)).toBeVisible();
    fireEvent.change(date, { target: { value: "" } });
    expect(screen.getByRole("status")).toHaveTextContent(
      "Elegí una fecha válida",
    );
    expect(
      screen.queryByText("Sesión regular de Londres"),
    ).not.toBeInTheDocument();
  });
  it("se consulta desde el paso de horarios de la guía y también desde CSPX", async () => {
    const user = userEvent.setup();
    const view = render(
      <ThemeProvider>
        <TooltipProvider>
          <MemoryRouter initialEntries={["/ibkr/buy-cspx"]}>
            <AppRoutes />
          </MemoryRouter>
        </TooltipProvider>
      </ThemeProvider>,
    );
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    const step = screen
      .getByRole("heading", { name: "Elegí la sesión regular" })
      .closest("li")!;
    await user.click(
      within(step).getByRole("button", { name: "Entender este paso" }),
    );
    expect(
      screen.getByRole("combobox", { name: "Mostrar horarios en" }),
    ).toBeVisible();
    view.unmount();
    render(
      <ThemeProvider>
        <TooltipProvider>
          <MemoryRouter initialEntries={["/ibkr/cspx"]}>
            <AppRoutes />
          </MemoryRouter>
        </TooltipProvider>
      </ThemeProvider>,
    );
    expect(
      screen.getByRole("heading", { name: "¿Cuándo operar CSPX?" }),
    ).toBeVisible();
  });
});

describe("Alternativas por exposición", () => {
  it("incluye cada instrumento una vez en grupos válidos", () => {
    const symbols = alternativeGroups.flatMap((group) => group.symbols);
    expect(new Set(symbols).size).toBe(instruments.length);
    expect([...symbols].sort()).toEqual(
      instruments.map((instrument) => instrument.symbol).sort(),
    );
  });
  it("separa Nasdaq y Treasuries, con explicación de estructura y límites de 1042-S", () => {
    render(
      <ThemeProvider>
        <TooltipProvider>
          <MemoryRouter initialEntries={["/ibkr/alternatives"]}>
            <AppRoutes />
          </MemoryRouter>
        </TooltipProvider>
      </ThemeProvider>,
    );
    const nasdaq = screen.getByRole("region", {
      name: "Nasdaq-100: CNDX / CSNDX",
    });
    expect(within(nasdaq).getByText("IE00B53SZB19")).toBeVisible();
    expect(
      within(nasdaq).getByText(
        /no aporta por sí solo diversificación geográfica/,
      ),
    ).toBeVisible();
    const bonds = screen.getByRole("region", {
      name: "Treasuries mediante ETFs: IB01 e IBTA",
    });
    expect(within(bonds).getByText("IE00BGSF1X88")).toBeVisible();
    expect(within(bonds).getByText("IE00BYXPSP02")).toBeVisible();
    expect(
      within(bonds).getByText(/retiene esos ingresos dentro del fondo/),
    ).toBeVisible();
    expect(
      within(bonds).getByText(
        /Esto no garantiza que IBKR nunca emita un 1042-S/,
      ),
    ).toBeVisible();
  });
});
