/** Trims surrounding whitespace and converts a user-provided name to UPPERCASE. */
export function normalizeName(value: string): string {
  return value.trim().toUpperCase()
}
