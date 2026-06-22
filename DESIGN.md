---
name: TaxDOM
description: Overseas customs tax calculator — Design System
colors:
  foreground: "black"
  bg: "white"
  surface: "#f1f3f4"
  border: "#bdc3c7"
  overlay: "rgba(15, 23, 42, 0.45)"
  textMuted: "#64748b"
  primary: "#3498db"
  success: "#dcfce7"
  warning: "#fef3c7"
  error: "#960000"
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
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 10px 16px
  button-primary-hover:
    backgroundColor: "{colors.border}"
  button-publish:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.bg}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: 14px
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
  badge-success:
    backgroundColor: "{colors.success}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  badge-warning:
    backgroundColor: "{colors.warning}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  drawer:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.lg}"
    padding: 20px 24px
  drawer-backdrop:
    backgroundColor: "{colors.overlay}"
  sidebar:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
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
- **bg (white/#121212):** Page background.
- **surface (#f1f3f4/#1e1e1e):** Cards, sidebars, panels, input backgrounds.
- **border (#bdc3c7/#6a6a6a):** Container borders.
- **shadow (rgba(0,0,0,0.1)):** Subtle drop shadow for elevation.
- **overlay (rgba(15,23,42,0.45)):** Modal and drawer backdrops.
- **textMuted (#64748b/#94a3b8):** Secondary text, metadata, helper labels.
- **peterRiver (#3498db/#60a5fa):** Interactive color — primary buttons, focus rings, links.

**Status colors:**
- **success (#dcfce7/#14321f):** Validated states, confirmations.
- **warning (#fef3c7/#3a2f0c):** Warnings, pending validations.
- **error (#960000/#ff9b9b):** Errors, critical actions.

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
- Background: `surface` → hover: `border`
- Text: `foreground`
- Border: 1px solid `border`
- Border-radius: `rounded.md`
- Padding: 10px 16px

**Publish Button:**
- Background: `foreground` → hover: opacity 0.9
- Text: `bg`
- Border-radius: `rounded.md`
- Padding: 8px 16px

**Disabled state (universal):** opacity 0.5, cursor not-allowed.

### Cards

- Background: `surface`
- Border: 1px solid `border`
- Border-radius: `rounded.lg`
- Padding: 14px
- Hover (clickable): border-color `foreground`, box-shadow `shadow`

### Inputs

- Border-radius: `rounded.md`
- Padding: 8px 12px — Height: 40px
- Border: 1px solid `border`
- Focus: `box-shadow: 0 0 0 3px color-mix(in srgb, peterRiver 15%, transparent)`
- Error: `box-shadow: 0 0 0 3px color-mix(in srgb, error 15%, transparent)`

### Badges

- Border-radius: `rounded.full`
- Padding: 4px 10px
- Font-size: `label-md` (0.75rem)

### Drawers

- Background: `bg`
- Border-left: 1px solid `border`
- Box-shadow: -32px 0 80px `shadow`
- Width: min(460px, 100vw)

### Sidebar

- Background: `surface`
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
