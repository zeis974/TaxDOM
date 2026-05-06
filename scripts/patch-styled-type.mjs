/**
 * Panda CSS generates StyledComponent with only an object-style call signature,
 * which causes TS2554 when using tagged template literals with interpolations (${...}).
 * This patch adds a template literal tag overload to fix the type error.
 *
 * Must run AFTER `panda codegen` since styled-system/ is regenerated each time.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const target = join(process.cwd(), "styled-system/types/jsx.d.ts")

if (!existsSync(target)) {
  console.log("\x1b[34m [script] \x1b[0mstyled-system not generated yet, skipping patch\x1b[0m")
  process.exit(0)
}

const content = readFileSync(target, "utf8")

if (content.includes("...values: string[]")) {
  console.log("\x1b[34m [script] \x1b[33mStyledComponent already patched, skipping\x1b[0m")
  process.exit(0)
}

const updated = content.replace(
  "(args: { raw: readonly string[] | ArrayLike<string> }): (props: ComponentProps<T>) => JSX.Element",
  `(args: { raw: readonly string[] | ArrayLike<string> }): (props: ComponentProps<T>) => JSX.Element
  (strings: TemplateStringsArray, ...values: string[]): (props: ComponentProps<T>) => JSX.Element`,
)

writeFileSync(target, updated)
console.log("\x1b[34m [script] \x1b[32mPatched StyledComponent type\x1b[0m")
