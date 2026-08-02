---
name: TaxDOM
description: Overseas customs tax calculator — Design System
colors:
  foreground: "black"
  background: "white"
  elevated: "#f1f3f4"
  border: "#838e96"
  shadow: "rgba(0, 0, 0, 0.1)"
  overlay: "rgba(15, 23, 42, 0.45)"
  textMuted: "#617087"
  primary: "#1f74af"
  primaryHover: "#1a6092"
  successFg: "#166534"
  successBg: "#dcfce7"
  warningFg: "#b45309"
  warningBg: "#fef3c7"
  errorFg: "#960000"
  errorBg: "#fee2e2"
  infoFg: "#1e40af"
  infoBg: "#dbeafe"
  accentGreen: "#059669"
  accentViolet: "#7c3aed"
  accentCyan: "#0891b2"
  accentPink: "#db2777"
  accentOrange: "#ea580c"
typography:
  headline-lg:
    fontFamily: nativeFont
    fontSize: 1.5rem
    lineHeight: 1.25
  headline-md:
    fontFamily: nativeFont
    fontSize: 1.125rem
    lineHeight: 1.35
  body-md:
    fontFamily: nativeFont
    fontSize: 1rem
    lineHeight: 1.5
  body-sm:
    fontFamily: nativeFont
    fontSize: 0.875rem
    lineHeight: 1.5
  label-md:
    fontFamily: nativeFont
    fontSize: 0.75rem
    lineHeight: 1.4
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  s12: 12px
  md: 16px
  s20: 20px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.elevated}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 10px 16px
  button-primary-hover:
    backgroundColor: "{colors.border}"
  button-danger:
    backgroundColor: "{colors.errorBg}"
    textColor: "{colors.errorFg}"
    rounded: "{rounded.md}"
    padding: 10px 16px
  button-publish:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.elevated}"
    rounded: "{rounded.lg}"
    padding: 14px
  scrim:
    backgroundColor: "{colors.shadow}"
  input-field:
    rounded: "{rounded.md}"
    padding: 8px 12px
    height: 40px
  badge:
    rounded: "{rounded.full}"
    padding: 4px 10px
    typography: "{typography.label-md}"
    textColor: "{colors.textMuted}"
  link:
    textColor: "{colors.primary}"
  badge-accent:
    backgroundColor: "color-mix(in srgb, {colors.primary} 12%, transparent)"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  link-hover:
    textColor: "{colors.primaryHover}"
  badge-success:
    backgroundColor: "{colors.successBg}"
    textColor: "{colors.successFg}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  badge-warning:
    backgroundColor: "{colors.warningBg}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  status-indicator:
    textColor: "{colors.warningFg}"
  drawer:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.lg}"
    padding: 20px 24px
  drawer-backdrop:
    backgroundColor: "{colors.overlay}"
  sidebar:
    backgroundColor: "{colors.elevated}"
    rounded: "{rounded.lg}"
  chip-info:
    backgroundColor: "{colors.infoBg}"
    textColor: "{colors.infoFg}"
    rounded: "{rounded.full}"
    padding: 4px 12px
    typography: "{typography.label-md}"
---

## Overview

TaxDOM is a professional customs tax calculator for overseas maritime operations. The visual identity reflects the professionalism and precision of the customs domain, with a minimalist and functional approach.

The design system spans three applications:
- **Public web** (Next.js 16): consumer-facing interface for tax simulators
- **Admin dashboard** (Vite + TanStack Router): back-office for managing products, categories, origins, and carriers
- **Blog** (Astro 6): editorial content and documentation

Full dark mode support is provided via Panda CSS semantic tokens. All color tokens automatically flip between their `base` (light) and `_dark` values.

## Colors

All tokens are defined in `packages/ui/theme/semantic-tokens.ts`.

- **foreground (black/white):** Primary foreground color — text, icons, active elements.
- **background (white/#121212):** Page background.
- **elevated (#f1f3f4/#1e1e1e):** Cards, sidebars, panels, input backgrounds.
- **border (#838e96/#6a6a6a):** Container borders. Dark enough to clear 3:1 on both `background` and `elevated`.
- **shadow (rgba(0,0,0,0.1)/rgba(0,0,0,0.5)):** Subtle drop shadow for elevation.
- **overlay (rgba(15,23,42,0.45)):** Modal and drawer backdrops.
- **textMuted (#617087/#94a3b8):** Secondary text, metadata, helper labels.
- **primary (#1f74af/#60a5fa):** Interactive color — primary buttons, focus rings, links.

- **primaryHover (#1a6092/#3b82f6):** Darker primary for hover states.

**Status colors** — each has a foreground (text/icon/border) and a subtle background. Always used as
a pair; never mix one status's foreground with another's background.
- **successFg (#166534/#4ade80) + successBg (#dcfce7/#14321f):** Validated states, confirmations.
- **warningFg (#b45309/#fbbf24) + warningBg (#fef3c7/#3a2f0c):** Warnings, pending validations.
- **errorFg (#960000/#ff9b9b) + errorBg (#fee2e2/#3a1212):** Errors, critical actions.
- **infoFg (#1e40af/#93c5fd) + infoBg (#dbeafe/#172554):** Neutral emphasis, selected items,
  informational chips. Use this rather than tinting `primary` by hand — a `color-mix` surface
  cannot carry readable text in both modes.

**Categorical accents** — for elements distinguished by *hue* rather than by status: flow/diagram
nodes, chart series. Readable on `background` in both modes, so they work as border, icon or text.
They must never be used to express a status.
> `pnpm design:lint` reports these five accents as `orphaned-tokens`. That is a limitation of the
> design.md schema, not a real orphan: the accents are applied as **border** colors on flow nodes,
> and `borderColor` is not among the recognized component sub-tokens (`backgroundColor`, `textColor`,
> `typography`, `rounded`, `padding`, `size`, `height`, `width`). Do **not** silence the warning by
> declaring them as `backgroundColor` — that would misdescribe the implementation.

- **accentGreen (#059669/#34d399)** — flow start nodes, affirmative branches.
- **accentPink (#db2777/#f472b6)** — EU conditions.
- **accentViolet (#7c3aed/#a78bfa)** — individual conditions.
- **accentCyan (#0891b2/#22d3ee)** — amount conditions.
- **accentOrange (#ea580c/#fb923c)** — fee nodes.

## Typography

All sizes are defined in `rem` (16px base) to respect user browser preferences. Tokens are in `packages/ui/theme/tokens.ts`.

**Font families:**
- **rowdies** (`var(--rowdies), serif`): Display font used exclusively for the "TaxDOM" wordmark in navbars.
- **nativeFont** (`-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`): System stack for all body text.

**Scale:**

| Token | Size | Usage |
|---|---|---|
| `headline-lg` | 1.5rem (24px) | Section headings |
| `headline-md` | 1.125rem (18px) | Subheadings, card titles |
| `body-md` | 1rem (16px) | Body text |
| `body-sm` | 0.875rem (14px) | Secondary text, descriptions |
| `label-md` | 0.75rem (12px) | Labels, badges, metadata |

## Layout

- **Navbar (95px):** Fixed height across web and blog apps.
- **Sidebar (220px max):** Vertical navigation for the dashboard.
- **Max-width (2400px):** Maximum width for centered content.
- **Card grid:** `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))`, gap `spacing.md`.

## Contrast guarantees

Every pair below is verified in **both** color modes. These are constraints, not observations: a
change to any of these tokens must keep them satisfied.

Text tokens are checked against **both `background` and `elevated`**. `elevated` is the stricter
surface in light mode, so it is what sets the value — a token tuned only against white will fail
inside a card.

| Pair | Threshold | Rationale |
|---|---|---|
| `foreground` / `background`, `elevated` | 4.5:1 | Body text |
| `textMuted` / `background`, `elevated` | 4.5:1 | Secondary text — use this, never `border`, for muted text |
| `primary` / `background`, `elevated` | 4.5:1 | Links carry small text, and links sit inside cards |
| `background` / `primary` | 4.5:1 | Label on a filled primary button |
| `<status>Fg` / `<status>Bg` | 4.5:1 | Badge text on its own tint |
| accents / `background`, `elevated` | 3:1 | Borders and icons (WCAG 1.4.11, non-text) |
| `border` / `background`, `elevated` | 3:1 | A card or input outline identifies a component |

33 combinations are verified across both modes. Never put text on a hand-rolled
`color-mix()` surface: use the matching `<status>Bg` / `<status>Fg` pair instead.

## Spacing

Spacing follows Material's **4dp grid**: every step is a multiple of 4.

| Token | Value | Token | Value |
|---|---|---|---|
| `xs` | 4px | `md` | 16px |
| `sm` | 8px | `s20` | 20px |
| `s12` | 12px | `lg` | 24px |
| | | `xl` | 32px |

Need a value that is not in the scale? Take the nearest step. Do not add an off-grid token, and do
not hardcode a px value to work around the grid.

## Elevation & Depth

- **Shadows:** `token(colors.shadow)` for resting cards. `0 8px 20px` for clickable cards on hover.
- **Focus rings:** `box-shadow: 0 0 0 3px color-mix(in srgb, {color} 15%, transparent)`.
- **Borders:** 1px solid `token(colors.border)`.
- **Transitions:** 150ms ease for hover/focus, 200ms for theme transitions.

## Shapes

| Token | Value | Usage |
|---|---|---|
| `rounded.sm` | 4px | Micro-elements, skeleton rects |
| `rounded.md` | 8px | Buttons, inputs, selects |
| `rounded.lg` | 12px | Cards, drawers, modals, nodes |
| `rounded.full` | 9999px | Pills, badges, avatars, icon buttons |

## Components

### Buttons

**Primary Button:**
- Background: `elevated` → hover: `border`
- Text: `foreground`
- Border: 1px solid `border`
- Border-radius: `rounded.md`
- Padding: 10px 16px

**Publish Button:**
- Background: `foreground` → hover: opacity 0.9
- Text: `background`
- Border-radius: `rounded.md`
- Padding: 8px 16px

**Disabled state (universal):** opacity 0.5, cursor not-allowed.

### Cards

- Background: `elevated`
- Border: 1px solid `border`
- Border-radius: `rounded.lg`
- Padding: 14px
- Hover (clickable): border-color `foreground`, box-shadow `shadow`

### Inputs

- Border-radius: `rounded.md`
- Padding: 8px 12px — Height: 40px
- Border: 1px solid `border`
- Focus: `box-shadow: 0 0 0 3px color-mix(in srgb, primary 15%, transparent)`
- Error: `box-shadow: 0 0 0 3px color-mix(in srgb, errorFg 15%, transparent)`

### Badges

- Border-radius: `rounded.full`
- Padding: 4px 10px
- Font-size: `label-md` (0.75rem)

### Drawers

- Background: `background`
- Border-left: 1px solid `border`
- Box-shadow: -32px 0 80px `shadow`
- Width: min(460px, 100vw)

### Sidebar

- Background: `elevated`
- Border-radius: `rounded.lg`
- Max-width: 220px

## Do's and Don'ts

**Do:**
- Use tokens defined in `packages/ui/theme/` — never hardcode values
- Maintain WCAG AA contrast ratios (4.5:1 for normal text)
- Use `rowdies` only for the logo, `nativeFont` for everything else
- Always provide `focus-visible` states on interactive elements
- Test all color combinations in dark mode

**Don't:**
- Mix different `rounded` values within the same view
- Hardcode RGB/HEX colors when a token exists
- Create new tokens without verifying they will actually be used
- Define tokens with zero values or values identical to existing tokens

## Relationship to Material Design

The system borrows Material's **4dp spacing grid** and its **type scale naming** (`headline` /
`body` / `label`, sized `lg` / `md` / `sm`). It deliberately departs from Material on two points:

- **Type scale values.** Sizes are tuned to a dense data application, not to Material's values —
  `headline-lg` is 24px where Material's `headlineLarge` is 32px.
- **Color roles.** Material's full role set (`onPrimary`, `surface`, `outline`,
  `primaryContainer`, …) would introduce a dozen tokens with no consumer. The system keeps only
  roles that are actually used, per the "no token without a usage" rule.

## Known deviations

Component paddings predating the 4dp grid, still to migrate:

| Component | Current | Target |
|---|---|---|
| `button-primary` / `button-danger` | 10px 16px | 12px 16px |
| `card` | 14px | 16px |
| `badge` | 4px 10px | 4px 12px |

Migrating these shifts layout by 2px in places, so it is done as its own reviewed change — not
opportunistically alongside unrelated work.
