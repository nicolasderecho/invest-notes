import { marketSessions } from "@/data/ibkr/market-hours";

export interface TimeRange {
  start: Date;
  end: Date;
}
export interface MarketSchedule {
  london: TimeRange;
  newYork: TimeRange;
  overlap: TimeRange | null;
  weekend: boolean;
}

export function dateInZone(instant: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(instant);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function detectBrowserTimeZone(): {
  timeZone: string;
  detected: boolean;
} {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone) {
      new Intl.DateTimeFormat("es", { timeZone }).format();
      return { timeZone, detected: true };
    }
  } catch {
    /* UTC remains usable when browser detection is unavailable. */
  }
  return { timeZone: "UTC", detected: false };
}

// These sessions occur during daytime, outside DST's ambiguous/skipped hours.
// Resolve each market's wall clock independently; never reuse London's UTC offset for New York.
function marketInstant(
  date: string,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const wallTime = Date.parse(
    `${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00Z`,
  );
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  let instant = wallTime;
  for (let iteration = 0; iteration < 2; iteration++) {
    const parts = formatter.formatToParts(new Date(instant));
    const part = (type: Intl.DateTimeFormatPartTypes) =>
      Number(parts.find((item) => item.type === type)!.value);
    const observed = Date.UTC(
      part("year"),
      part("month") - 1,
      part("day"),
      part("hour"),
      part("minute"),
      part("second"),
    );
    instant += wallTime - observed;
  }
  return new Date(instant);
}

export function getMarketSchedule(date: string): MarketSchedule | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const day = new Date(`${date}T12:00:00Z`);
  if (
    !Number.isFinite(day.getTime()) ||
    day.toISOString().slice(0, 10) !== date ||
    day.getUTCFullYear() < 100
  )
    return null;
  const session = (
    market: typeof marketSessions.london | typeof marketSessions.newYork,
  ): TimeRange => ({
    start: marketInstant(
      date,
      market.openHour,
      market.openMinute,
      market.timeZone,
    ),
    end: marketInstant(
      date,
      market.closeHour,
      market.closeMinute,
      market.timeZone,
    ),
  });
  const london = session(marketSessions.london);
  const newYork = session(marketSessions.newYork);
  const start = new Date(
    Math.max(london.start.getTime(), newYork.start.getTime()),
  );
  const end = new Date(Math.min(london.end.getTime(), newYork.end.getTime()));
  return {
    london,
    newYork,
    overlap: start < end ? { start, end } : null,
    weekend: day.getUTCDay() === 0 || day.getUTCDay() === 6,
  };
}

export function formatTimeRange(
  range: TimeRange,
  timeZone: string,
  londonDate: string,
): string {
  const clock = new Intl.DateTimeFormat("es-AR", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const calendar = new Intl.DateTimeFormat("es-AR", {
    timeZone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const showDates =
    dateInZone(range.start, timeZone) !== londonDate ||
    dateInZone(range.end, timeZone) !== londonDate;
  const label = (instant: Date) =>
    `${clock.format(instant)}${showDates ? ` (${calendar.format(instant)})` : ""}`;
  return `${label(range.start)} – ${label(range.end)}`;
}
