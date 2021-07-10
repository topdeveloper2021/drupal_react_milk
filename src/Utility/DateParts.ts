const defaultParts = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

export interface DatePartsReturnValueInterface {
  weekday?: string;
  year?: number;
  month?: string | number;
  day?: string | number;
  hour?: number;
  minute?: number;
  second?: number;
  hour12?: string;
  dayPeriod: string;
}

export function DateParts(
  date: Date = null,
  parts: Record<string, any> = null
): DatePartsReturnValueInterface {
  const browserLocale = Intl.DateTimeFormat().resolvedOptions();
  if (date === null || date.toString !== undefined) {
    date = new Date(date);
  }
  if (parts === null) {
    parts = defaultParts;
  }
  console.log("Date parts", date, parts);

  if (parts.timeZone === undefined) {
    parts.timeZone = browserLocale.timeZone;
  }
  const dateParts = {};
  Intl.DateTimeFormat(browserLocale.locale, parts)
    .formatToParts(date)
    .map((item) => {
      dateParts[item.type] = item.value;
    });
  return dateParts;
}

export default DateParts;
