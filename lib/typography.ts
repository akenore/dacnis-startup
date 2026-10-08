/**
 * French typography: a narrow no-break space before ? ! ; and a no-break space before :
 * so the punctuation never wraps onto its own line.
 */
export function frenchSpacing<T>(value: T): T {
  if (typeof value === "string") {
    return value.replace(/ ([?!;])/g, " $1").replace(/ :/g, " :") as T;
  }
  if (Array.isArray(value)) return value.map(frenchSpacing) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, frenchSpacing(v)])) as T;
  }
  return value;
}
