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
  button-default:
    backgroundColor: "{colors.elevated}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 10px 16px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: 10px 16px
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
  card-meta:
    textColor: "{colors.textMuted}"
    typography: "{typography.label-md}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  input-field:
    backgroundColor: "{colors.elevated}"
    rounded: "{rounded.md}"
    padding: 8px 12px
    height: 40px
  badge:
    backgroundColor: "{colors.elevated}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: 4px 10px
    typography: "{typography.label-md}"
  badge-info:
    backgroundColor: "{colors.infoBg}"
    textColor: "{colors.infoFg}"
    rounded: "{rounded.full}"
    padding: 4px 10px
    typography: "{typography.label-md}"
  badge-success:
    backgroundColor: "{colors.successBg}"
    textColor: "{colors.successFg}"
    rounded: "{rounded.full}"
    padding: 4px 12px
    typography: "{typography.label-md}"
  badge-warning:
    backgroundColor: "{colors.warningBg}"
    textColor: "{colors.warningFg}"
    rounded: "{rounded.full}"
    padding: 5px 12px
    typography: "{typography.label-md}"
  link:
    textColor: "{colors.primary}"
  result-figure:
    textColor: "{colors.primaryHover}"
  drawer:
    backgroundColor: "{colors.background}"
    padding: 20px 24px
  drawer-backdrop:
    backgroundColor: "{colors.overlay}"
  sidebar:
    backgroundColor: "{colors.elevated}"
    rounded: "{rounded.lg}"
  flow-handle-yes:
    backgroundColor: "{colors.accentGreen}"
  flow-handle-label-yes:
    textColor: "{colors.accentGreen}"
  flow-minimap-condition:
    backgroundColor: "{colors.accentPink}"
  flow-minimap-fee:
    backgroundColor: "{colors.accentOrange}"
---

## Overview

TaxDOM is a professional customs tax calculator for overseas maritime operations. The visual identity reflects the professionalism and precision of the customs domain, with a minimalist and functional approach.

The design system spans three applications:
- **Public web** (Next.js 16): consumer-facing interface for tax simulators
- **Admin dashboard** (TanStack Start): back-office for managing products, categories, origins, and carriers
- **Blog** (Astro 7): editorial content and documentation

Full dark mode support is provided via Panda CSS semantic tokens. All color tokens automatically flip between their `base` (light) and `_dark` values.

## Colors

All tokens are defined in `packages/ui/theme/semantic-tokens.ts`.

- **foreground (black/white):** Primary foreground color — text, icons, active elements.
- **background (white/#121212):** Page background.
- **elevated (#f1f3f4/#1e1e1e):** Cards, sidebars, panels, input backgrounds.
- **border (#838e96/#6a6a6a):** Dividers, separators and hover outlines. Components carry no border
  at rest. Dark enough to clear 3:1 on both `background` and `elevated`.
- **shadow (rgba(0,0,0,0.1)/rgba(0,0,0,0.5)):** Subtle drop shadow for elevation.
- **overlay (rgba(15,23,42,0.45)/rgba(0,0,0,0.6)):** Modal and drawer backdrops.
- **textMuted (#617087/#94a3b8):** Secondary text, metadata, helper labels.
- **primary (#1f74af/#60a5fa):** Interactive color — primary buttons, focus rings, links.
- **primaryHover (#1a6092/#3b82f6):** Darker primary for emphasized figures in simulator results
  and their hover states.

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
> Components in the front matter only declare fills and text the code really paints. The `flow-*`
> ones cover the accents the flow editor uses as fills or text: the start and "yes" handles, the
> "Oui" label and the minimap nodes. `pnpm design:lint` still reports `accentViolet`, `accentCyan`
> and `shadow` as `orphaned-tokens`. That is a limitation of the design.md schema, not a real
> orphan: the two accents are only applied as **border** colors on condition nodes and `shadow` only
> inside `box-shadow`, and neither property is among the recognized component sub-tokens
> (`backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`).
> Do **not** silence the warning by declaring them as `backgroundColor` — that would misdescribe
> the implementation.

- **accentGreen (#059669/#34d399)** — flow start nodes, affirmative branches.
- **accentPink (#db2777/#f472b6)** — EU conditions.
- **accentViolet (#7c3aed/#a78bfa)** — individual conditions.
- **accentCyan (#0891b2/#22d3ee)** — amount conditions.
- **accentOrange (#ea580c/#fb923c)** — fee nodes.

## Typography

All sizes are defined in `rem` (16px base) to respect user browser preferences. Tokens are in `packages/ui/theme/tokens.ts`.

**Font families:**
- **rowdies** (`var(--rowdies), serif`): Display font for the "TaxDOM" wordmark in navbars, the blog
  search field and the headline figures of the web simulators.
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

- **Navbar (95px):** Fixed height across web (`sizes.navbarHeight`) and blog.
- **Sidebar (250px max):** Vertical navigation for the dashboard.
- **Max-width (2400px):** Maximum width for centered content in the web app (`sizes.maxWidth`).
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
| `border` / `background`, `elevated` | 3:1 | A divider or hover outline must stay visible |

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

- **Shadows:** cards rest flat. Clickable dashboard cards (stats, origins) lift on hover with
  `0 8px 20px {colors.shadow}`; drawers cast `-32px 0 80px {colors.shadow}`.
- **Focus rings:** `box-shadow: 0 0 0 3px color-mix(in srgb, {color} 15%, transparent)`.
- **Borders:** none on components at rest. `1px solid {colors.border}` is reserved for dividers,
  separators and interaction states (hover, focus, error).
- **Transitions:** 150ms ease for hover/focus, 200ms for theme transitions.

## Shapes

| Token | Value | Usage |
|---|---|---|
| `rounded.sm` | 4px | Micro-elements, skeleton rects |
| `rounded.md` | 8px | Buttons, inputs, selects |
| `rounded.lg` | 12px | Cards, modals, sidebar, flow nodes |
| `rounded.full` | 9999px | Pills, badges, avatars, icon buttons |

## Components

### Buttons

Dashboard `Button`, variants via `data-variant`. All share `rounded.md`, padding 10px 16px,
`body-sm` text and a 1px border.

- **Default:** background `elevated`, text `foreground`, transparent border.
- **Primary:** background `primary`, text `background` → hover: opacity 0.85.
- **Outline:** transparent background, border `elevated` → hover: background `elevated`, border
  `foreground`.
- **Danger:** background `errorBg`, text `errorFg` → hover: `errorFg` mixed 25% into `elevated`.
- **Focus:** 2px solid `primary` outline, 2px offset.

**Publish Button** (transporter rules flow editor):
- Background: `foreground` → hover: opacity 0.9
- Text: `background`
- Border-radius: `rounded.md`
- Padding: 8px 16px

**Disabled state (universal):** opacity 0.5, cursor not-allowed.

### Cards

- Background: `elevated`
- Border: none at rest (clickable cards keep a transparent 1px border)
- Border-radius: `rounded.lg`
- Padding: 14px
- Hover (clickable): border-color `border`
- Focus (clickable): 2px solid `foreground` outline, 3px offset

### Inputs

- Background: `elevated`
- Border-radius: `rounded.md`
- Padding: 8px 12px — Height: 40px
- Border: 1px solid `elevated` → focus: `primary`, error: `errorFg`
- Focus: `box-shadow: 0 0 0 3px color-mix(in srgb, primary 15%, transparent)`
- Error: `box-shadow: 0 0 0 3px color-mix(in srgb, errorFg 15%, transparent)`

### Badges

- Border-radius: `rounded.full`
- Font-size: `label-md` (0.75rem), weight 600
- Decorative badges (`Badge`, padding 4px 10px): `elevated` / `foreground` for neutral,
  `infoBg` / `infoFg` for categories and info.
- Status badges (`StatusBadge`, padding 4px 12px): `successBg` / `successFg` when active,
  `errorBg` / `errorFg` when inactive.
- Status pills (`StatusPill`, padding 5px 12px): one status pair per state, e.g. `warningBg` /
  `warningFg` for medium priority.

### Drawers

- Background: `background`
- Border-left: 1px solid `border`
- Box-shadow: -32px 0 80px `shadow`
- Width: min(460px, 100vw)

### Sidebar

- Background: `elevated`
- Border-radius: `rounded.lg`
- Max-width: 250px

## Do's and Don'ts

**Do:**
- Use tokens defined in `packages/ui/theme/` — never hardcode values
- Maintain WCAG AA contrast ratios (4.5:1 for normal text)
- Use `rowdies` only for the wordmark and display figures, `nativeFont` for everything else
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
| `button-default` / `button-primary` / `button-danger` | 10px 16px | 12px 16px |
| `card` | 14px | 16px |
| `badge` / `badge-info` | 4px 10px | 4px 12px |
| `badge-warning` (status pills) | 5px 12px | 4px 12px |

Migrating these shifts layout by 2px in places, so it is done as its own reviewed change — not
opportunistically alongside unrelated work.

The drawer still has a `1px solid {colors.border}` left edge, which predates the no-border rule
and is to be removed.
