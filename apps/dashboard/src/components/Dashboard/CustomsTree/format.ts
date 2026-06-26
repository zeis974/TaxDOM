/**
 * Converts a 10-digit RITA code to the standard HS dot-notation.
 * "0102000000" → "01.02"   "8501100000" → "85.01.10"
 */
export function formatHsCode(code: string): string {
  const trimmed = code.replace(/0+$/, "") || code.slice(0, 2)
  const pairs = trimmed.match(/.{1,2}/g) ?? [code.slice(0, 2)]
  return pairs.join(".")
}

/** Capitalises the first letter and lower-cases the rest (RITA labels are ALL CAPS). */
export function toSentenceCase(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
