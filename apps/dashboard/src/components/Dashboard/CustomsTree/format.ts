/**
 * Converts a 10-digit RITA code to the standard HS dot-notation.
 * "0102000000" → "01.02"   "8501100000" → "85.01.10"
 */
export function formatHsCode(code: string): string {
  const significant = code.replace(/0+$/, "")
  // Trimming can eat the second digit of a pair ("8501100000" → "85011"): pad it back
  const trimmed = significant.padEnd(Math.max(2, Math.ceil(significant.length / 2) * 2), "0")
  const pairs = trimmed.match(/.{1,2}/g) ?? [code.slice(0, 2)]
  return pairs.join(".")
}

/** Capitalises the first letter and lower-cases the rest (RITA labels are ALL CAPS). */
export function toSentenceCase(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
