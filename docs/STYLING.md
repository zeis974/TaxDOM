# STYLING.md — The styling rule

> **This file is the rule. It applies to every change and every new feature.**
> If a styling need does not fit within it, change this file first — do not work around it.

Values live in `packages/ui/theme/`; this document describes **how** to use them.
`DESIGN.md` (repo root) describes visual intent. When the two disagree, the code in
`packages/ui/theme/` wins and the wrong document must be fixed in the same PR.

---

## 1. The five non-negotiables

1. **No raw values** for a color, a spacing or a radius. Go through `token()`.
2. **No token created "just in case."** A token exists only if it has at least one real consumer, and a token that loses its last consumer is deleted.
3. **Spacing follows the 4dp grid** (Material). Every spacing value is a multiple of 4.
4. **One styling API:** `styled` template literals. No `css()`, `cva()`, `cx()`.
5. **Every interactive element has a `focus-visible` state.**

---

## 2. Architecture

The system is a **Panda CSS preset** in `packages/ui/` (`@taxdom/ui`), consumed by the three
frontends (`web`, `dashboard`, `blog`). It is **not** a component library.

```
packages/ui/
  preset.js                   ← definePreset(), light/dark conditions
  theme/
    tokens.ts                 ← fonts, fontSizes, sizes, radii, spacing
    semantic-tokens.ts        ← all colors (light/dark aware)
    keyframes.ts              ← animation keyframes
    utilities.ts              ← CSS property → token scale mapping
    index.ts                  ← re-exports the four above
```

`styled-system/` is generated and gitignored in every app. Regenerate with `pnpm prepare`, or
`pnpm --filter @taxdom/<app> exec panda codegen`. **Never edit it** — fixes belong in
`packages/ui/theme/`.

Shared across the three apps: `eject: true` (no Panda built-ins), `preflight: false`,
`syntax: "template-literal"`, `jsxFramework: "react"`, `importMap: "@/panda"`.

Hashing, however, **differs**:

| App | `hash` | CSS variable names |
|---|---|---|
| `web`, `dashboard` | `true` | hashed — `--izTOlS` |
| `blog` | `{ className: true, cssVar: false }` | readable — `--colors-elevated` |

This is deliberate: `<style>` blocks in `.astro` files are plain CSS that Panda does not process, so
`var(--colors-primary)` is the only way to reach a token there. The blog keeps readable names for
exactly that reason.

> ⚠️ **Consequence — never hand-write a CSS variable name outside Astro `<style>` blocks**,
> keyframes included. `var(--colors-elevated)` resolves on the blog and resolves to **nothing** on
> web and dashboard, with no build error: the declaration is silently dropped.
> Inside a Panda style object (keyframes included), a token reference is written `"{colors.elevated}"`.

---

## 3. Writing styles

### The API: `styled` template literals

```ts
import { styled } from "@/panda/jsx"

export const Card = styled.div`
  background: token(colors.elevated);
  border-radius: token(radii.lg);
  padding: token(spacing.md);
`
```

Works on any HTML element and on third-party components:

```ts
import * as m from "motion/react-m"

export const Backdrop = styled(m.div)`
  background: token(colors.overlay);
`
```

### `token()` syntax per context

| Context | Syntax | Import |
|---|---|---|
| CSS inside a template literal | `token(colors.foreground)` — **no quotes, no `${}`** | none |
| JS value (inline style, canvas, third-party API) | `token("colors.foreground")` | `@/panda/tokens` |
| `panda.config.ts` (object) | `"{colors.foreground}"` | none |

⚠️ **The classic mistake — interpolating inside a `styled`:**

```ts
// ❌ does not compile; Panda never sees the token
background: ${token("colors.elevated")};
color: token("colors.foreground");

// ✅
background: token(colors.elevated);
color: token(colors.foreground);
```

In JS, `token(path)` returns the **value** while `token.var(path)` returns the **CSS variable**. For
a semantic color both yield the variable (so dark mode works); for `spacing` or `radii`, `token()`
returns the literal (`"16px"`) and `token.var()` returns `var(--…)`.

### Subtle tints — `color-mix`

There are **no** "subtle" tokens. Derive them inline — but only for **decorative** surfaces: hover
fills, focus rings, faint separators.

```css
background: color-mix(in srgb, token(colors.primary) 12%, transparent);
box-shadow: 0 0 0 3px color-mix(in srgb, token(colors.primary) 15%, transparent);
```

> ⚠️ **Never place text on a `color-mix()` surface.** The tint lands at opposite lightness in the two
> modes, so no single text token stays readable on both: the one that passes on the light tint fails
> on the dark one. A tinted surface that carries text is a *status*, so use the matching
> `<status>Bg` / `<status>Fg` pair — `infoBg` / `infoFg` covers the neutral-emphasis case.

---

## 4. File organization

Styles live in a `.styled.tsx` file next to their logic. **The logic file contains no styling** — it
only passes `data-*` attributes.

```
components/Button/
  Button.tsx           ← logic: imports ButtonStyled, passes data-variant
  Button.styled.tsx    ← export const ButtonStyled = styled.button`…`
```

## 5. Variants

No `cva()`. Variants use `data-*` attributes and CSS attribute selectors:

```ts
export const ButtonStyled = styled.button`
  background: token(colors.elevated);
  color: token(colors.foreground);

  &[data-variant="danger"] {
    background: token(colors.errorBg);
    color: token(colors.errorFg);
  }
`
```

```tsx
<ButtonStyled data-variant={variant}>…</ButtonStyled>
```

Attributes in use: `data-variant`, `data-active`, `data-type`, `data-status`, `data-selected`,
`data-focus`, `data-condition`, `data-orphaned`.

---

## 6. Token catalogue

### Colors — 22 semantic tokens

All are mode-aware (`{ base, _dark }`), so dark mode is **automatic**: you should normally never
hand-write a `.dark &` condition.

**Neutrals**

| Token | Light | Dark | Usage |
|---|---|---|---|
| `foreground` | `black` | `white` | Default text |
| `background` | `white` | `#121212` | Page background |
| `elevated` | `#f1f3f4` | `#1e1e1e` | Cards, sidebars, inputs |
| `border` | `#838e96` | `#6a6a6a` | Borders, dividers |
| `textMuted` | `#617087` | `#94a3b8` | Secondary text, placeholders |
| `shadow` | `rgba(0,0,0,.1)` | `rgba(0,0,0,.5)` | Box shadows |
| `overlay` | `rgba(15,23,42,.45)` | `rgba(0,0,0,.6)` | Modal scrims |

> `border` is a **line** color. Muted text is `textMuted`, never `border` or `elevated` — those fail
> contrast badly as text (`elevated` on white is 1.07:1, i.e. invisible).

**Brand**

| Token | Light | Dark | Usage |
|---|---|---|---|
| `primary` | `#1f74af` | `#60a5fa` | Primary actions, links, focus |
| `primaryHover` | `#1a6092` | `#3b82f6` | Hover on `primary` |

**Status** — always used as an `Fg` / `Bg` **pair**. Never mix one status's `Fg` with another's `Bg`.

| Token | Light | Dark |
|---|---|---|
| `successFg` / `successBg` | `#166534` / `#dcfce7` | `#4ade80` / `#14321f` |
| `warningFg` / `warningBg` | `#b45309` / `#fef3c7` | `#fbbf24` / `#3a2f0c` |
| `errorFg` / `errorBg` | `#960000` / `#fee2e2` | `#ff9b9b` / `#3a1212` |
| `infoFg` / `infoBg` | `#1e40af` / `#dbeafe` | `#93c5fd` / `#172554` |

**Categorical accents** — for things told apart by *hue* rather than by status: diagram nodes, chart
series. Readable on `background` in both modes, so they work as border, icon or text.
**Never use them to express a status.**

| Token | Light | Dark |
|---|---|---|
| `accentGreen` | `#059669` | `#34d399` |
| `accentCyan` | `#0891b2` | `#22d3ee` |
| `accentViolet` | `#7c3aed` | `#a78bfa` |
| `accentPink` | `#db2777` | `#f472b6` |
| `accentOrange` | `#ea580c` | `#fb923c` |

> The set contains **no blue on purpose**: blue is the brand hue, and an accent blue is
> indistinguishable from `primary` in dark mode. Greens are emerald for the same reason against
> `successFg`. If you add an accent, check it against every existing accent *and* against `primary`
> and the status foregrounds, in both modes.

### Contrast constraints

These are requirements, not measurements. Changing a color token means re-checking them.

Text tokens are checked against **both `background` and `elevated`**. In light mode `elevated` is
the stricter surface, so it sets the value: a token tuned only against white fails inside a card.

| Pair | Threshold |
|---|---|
| `foreground`, `textMuted`, `primary`, `primaryHover` / `background` **and** `elevated` | 4.5:1 |
| `background` / `primary` (button label) | 4.5:1 |
| `<status>Fg` / `<status>Bg` | 4.5:1 |
| accents / `background` **and** `elevated` | 3:1 |
| `border` / `background` **and** `elevated` | 3:1 |

33 combinations are verified across both modes.

**Two known weaknesses the thresholds above do not catch.** Contrast ratios say nothing about
whether two *surfaces* are told apart, so these need care rather than a number:

- **`elevated` barely separates from `background` in dark mode** — ΔE 5.8 in CIELAB, below the
  threshold of perceptibility. A card that relies on its fill alone is effectively invisible against
  the page at night. Always give elevated surfaces a `border` as well.
- **`successBg` and `warningBg` are 1.3% apart in luminance** (90.6% vs 89.3%). Desaturated — in
  greyscale, or for a viewer with severe colour vision deficiency — they are the same. Never convey a
  status by its tint alone: pair it with an icon, a label, or its `Fg` colour.

> **Never put text on a hand-rolled `color-mix()` surface.** No single token stays readable on such a
> tint in both modes: the one that passes on the light tint fails on the dark one. Use the matching
> `<status>Bg` / `<status>Fg` pair — that is what `infoBg` / `infoFg` exists for.

### Spacing — 4dp grid

| Token | Value |
|---|---|
| `xs` | 4px |
| `sm` | 8px |
| `s12` | 12px |
| `md` | 16px |
| `s20` | 20px |
| `lg` | 24px |
| `xl` | 32px |

Need a value that is not on the scale? Take the nearest step. Do **not** add an off-grid token, and
do not hardcode a px value to work around the grid.

### Radii

| Token | Value | Usage |
|---|---|---|
| `sm` | 4px | Micro-elements, skeletons |
| `md` | 8px | Buttons, inputs, selects |
| `lg` | 12px | Cards, drawers, modals, nodes |
| `full` | 9999px | Pills, badges, avatars |

### Typography

Two families only:

- `nativeFont` — system stack, **all text**.
- `rowdies` — `var(--rowdies), serif`, **the TaxDOM wordmark only**.

| Token | Value | Usage |
|---|---|---|
| `headline-lg` | 1.5rem (24px) | Page titles |
| `headline-md` | 1.125rem (18px) | Section titles |
| `body-md` | 1rem (16px) | Body text |
| `body-sm` | 0.875rem (14px) | Secondary text |
| `label-md` | 0.75rem (12px) | Labels, badges, metadata |

### Sizes

| Token | Value |
|---|---|
| `navbarHeight` | 95px |
| `maxWidth` | 2400px |

### Keyframes

`fadeIn`, `rotate`, `scale`, `skeleton`, `skeleton-shimmer`, `origins-fade-in`,
`origins-fade-in-item`, `origins-fade-out`, `fadeInUp`.

---

## 7. Dark mode

Two custom conditions are defined in `packages/ui/preset.js`:

```
light: ".light &"
dark:  ".dark &, [data-theme="dark"] &"
```

They exist for residual cases. **The rule is to rely on semantic tokens**, which already handle both
modes. Hand-writing `.dark &` is a sign that a token is missing, or that the wrong one is being used.

## 8. Responsive

Plain `@media` inside template literals — Panda's object breakpoints are not used.

```css
@media (width < 768px) {
  grid-template-columns: 1fr;
}
```

Fluid sizing with `clamp()`:

```css
font-size: clamp(0.875rem, 0.85rem + 0.09vw, 1rem);
```

---

## 9. Checklist before merging a styling PR

- [ ] No hardcoded hex / rgb — `grep -nE '#[0-9a-fA-F]{3,6}'` over the diff.
- [ ] No hardcoded spacing or radius that matches an existing token.
- [ ] Every spacing value introduced is a multiple of 4.
- [ ] No token added without a consumer, no orphaned token left behind.
- [ ] `token(colors.x)` unquoted inside `styled`, quoted in JS.
- [ ] No hand-written `var(--…)` outside Astro `<style>` blocks.
- [ ] Muted text uses `textMuted`, not `border` or `elevated`.
- [ ] Interactive elements have `focus-visible`.
- [ ] Checked in light **and** dark mode.
- [ ] `typecheck` and `lint` pass for the affected apps.

### Tooling

```bash
# color tokens referenced in code but not defined in the theme
grep -rhoE 'token(\.var)?\(["'"'"']?colors\.[a-zA-Z0-9]+' apps/*/src \
  | sed -E 's/.*colors\.//' | sort -u
# compare against packages/ui/theme/semantic-tokens.ts

# spacing / radius values that bypass a token
grep -rnE '^\s*(gap|padding|margin|border-radius)[^;]*[0-9]+px' apps/*/src \
  --include='*.tsx' | grep -v 'token('
```

`pnpm design:lint` validates `DESIGN.md` against the `@google/design.md` schema.

There is currently **no automated check** for the rules above — they are reviewed by hand against
the checklist. A known backlog exists: 224 raw spacing/radius values and 40 interactive elements
without a `focus-visible` state.

A Panda MCP server is also available. `get_config`, `get_tokens` and `get_semantic_tokens` report
the **resolved** theme — useful to confirm what the engine actually sees rather than what the source
suggests. Note that `get_usage_report` only works when the server resolves a config whose `include`
paths exist, i.e. when it runs from an app directory rather than the repo root.
