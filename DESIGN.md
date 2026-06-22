---
version: alpha
name: TaxDOM
description: Le calculateur de taxes ultra marin — Design System
colors:
  primary: "black"
  background: "white"
  secondary-background: "#dde4e6"
  tertiary-background: "#ecf0f1"
  border: "#bdc3c7"
  muted-text: "rgba(100, 116, 139, 0.95)"
  muted-border: "rgba(148, 163, 184, 0.24)"
  blue: "#3498db"
  error: "#960000"
  shadow: "rgba(0, 0, 0, 0.1)"
  success: "#dcfce7"
  success-fg: "#166534"
  danger: "#fee2e2"
  danger-fg: "#991b1b"
  danger-hover: "#fecaca"
  info: "#e0f2fe"
  info-fg: "#0284c7"
  warning: "#fef3c7"
  warning-fg: "#d97706"
  accent: "#f3e8ff"
  accent-fg: "#7c3aed"
  overlay: "rgba(15, 23, 42, 0.45)"
typography:
  display:
    fontFamily: Rowdies, serif
    fontSize: 32px
    fontWeight: "400"
    lineHeight: 1.2
  headline-lg:
    fontFamily: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 1.3
  headline-md:
    fontFamily: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
    fontSize: 18px
    fontWeight: "600"
    lineHeight: 1.4
  body-md:
    fontFamily: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 1.6
  body-sm:
    fontFamily: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.5
  label-caps:
    fontFamily: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
    fontSize: 11px
    fontWeight: "600"
    lineHeight: 1
    letterSpacing: 0.08em
  label-md:
    fontFamily: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 1.4
rounded:
  sm: 4px
  md: 8px
  panel: 10px
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
    backgroundColor: "{colors.tertiary-background}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 10px 16px
  button-primary-hover:
    backgroundColor: "{colors.secondary-background}"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.danger-fg}"
    rounded: "{rounded.md}"
    padding: 10px 18px
  button-publish:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  card:
    backgroundColor: "{colors.secondary-background}"
    rounded: "{rounded.lg}"
    padding: 14px
  card-clickable-hover:
    rounded: "{rounded.lg}"
  input-field:
    rounded: "{rounded.md}"
    padding: 8px 12px
    height: 40px
  badge:
    rounded: "{rounded.full}"
    padding: 4px 10px
    typography: "{typography.label-caps}"
  drawer:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.lg}"
    padding: 20px 24px
  sidebar:
    backgroundColor: "{colors.secondary-background}"
    rounded: "{rounded.panel}"
---

## Overview

TaxDOM est un outil professionnel de calcul de taxes douanières pour les opérations maritimes ultra-marines. L'identité visuelle reflète le professionnalisme et la précision du domaine douanier, avec une approche minimaliste et fonctionnelle.

Le design system s'articule autour de trois applications :
- **Web publique** (Next.js 16) : interface grand public pour les simulateurs de taxes
- **Dashboard admin** (Vite + TanStack Router) : back-office pour la gestion des produits, catégories, origines, transporteurs
- **Blog** (Astro 6) : contenu éditorial et documentation

L'interface est entièrement en français, avec une attention particulière à l'accessibilité (WCAG AA) et au support complet du mode sombre.

## Colors

La palette repose sur des neutres à fort contraste avec des couleurs sémantiques pour les états et actions.

- **Primary (black/white) :** Couleur principale inversée en mode sombre pour le texte et les éléments de premier plan.
- **Background (white/#121212) :** Fond de page qui s'assombrit en mode sombre.
- **Secondary Background (#dde4e6/#2b2b2b) :** Fond secondaire pour les cartes, sidebars, panneaux.
- **Tertiary Background (#ecf0f1/#3b3b3b) :** Fond tertiaire pour les éléments interactifs (boutons, inputs).
- **Border (#bdc3c7/#525252) :** Bordures subtiles pour délimiter les conteneurs.

**Couleurs sémantiques** (toutes avec paires background/foreground) :
- **Success (#dcfce7 / #166534) :** États validés, actifs, confirmations.
- **Danger (#fee2e2 / #991b1b) :** Erreurs, suppressions, actions critiques.
- **Info (#e0f2fe / #0284c7) :** Informations, aides contextuelles.
- **Warning (#fef3c7 / #d97706) :** Avertissements, validations en attente.
- **Accent (#f3e8ff / #7c3aed) :** Éléments mis en avant, tags, catégories.

**Mode sombre :** Le système inverse automatiquement les couleurs via les semantic tokens Panda CSS. Les backgrounds passent de blanc à des gris sombres (#121212, #2b2b2b, #3b3b3b), tandis que le primary text passe de noir à blanc. Les couleurs sémantiques conservent leur teinte mais ajustent leur luminosité pour maintenir le contraste.

## Typography

La stratégie typographique combine une police display distinctive pour la marque et une stack système pour le corps de texte.

- **Display (Rowdies, serif) :** Police serif arrondie utilisée exclusivement pour le wordmark "TaxDOM" dans les navbars. Crée une identité visuelle forte et mémorable.
- **Body (System Font Stack) :** `-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` pour tous les textes courants. Offre une performance optimale et une intégration native avec l'OS.

**Hiérarchie :**
- **Headlines (600) :** Titres de sections, titres de cartes.
- **Body (400) :** Texte courant, paragraphes, descriptions.
- **Labels (500-600) :** Étiquettes, badges, métadonnées. Les labels sont en uppercase avec letter-spacing 0.08em pour les badges.

**Lisibilité :** Line-height de 1.5-1.6 pour le corps de texte, 1.2-1.3 pour les titres. Letter-spacing négatif (-0.02em) optionnel pour les grands titres.

**Note :** Le token `display` est défini à 32px fixe dans le DESIGN.md, mais l'implémentation utilise `clamp(1.4em, 5vw, 2em)` pour un rendu responsive.

## Layout

Le layout utilise une approche hybride : navbar fixe pour les apps publiques, sidebar pour le dashboard.

- **Navbar (95px) :** Hauteur fixe pour les apps web et blog. Contient le logo Rowdies, navigation principale, et sélecteur de thème.
- **Sidebar (220px max) :** Navigation verticale pour le dashboard. Fond secondary-background, border-radius 10px.
- **Max-width (2400px) :** Largeur maximale pour le contenu centré. Le contenu du dashboard est plafonné à 1400px.
- **Grille de cartes :** `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))`, gap 16px.
- **Grille fluide :** Padding et gaps basés sur une échelle de 8px (4px, 8px, 16px, 24px, 32px).

**Espacements :**
- **Containers (14-20px) :** Padding interne des cartes et sections.
- **Gaps (8-24px) :** Espacement entre éléments liés (form fields, list items).
- **Sections (32px+) :** Marge entre sections distinctes.

## Elevation & Depth

La profondeur est communiquée via des ombres légères et des bordures subtiles plutôt que des contrastes marqués.

- **Ombres légères :** `rgba(0, 0, 0, 0.1)` pour les cartes au repos, `rgba(0, 0, 0, 0.08)` pour les éléments interactifs.
- **Ombres hover :** `0 8px 20px` pour les cartes cliquables au survol, créant une élévation légère.
- **Focus rings :** `box-shadow: 0 0 0 3px color-mix(in srgb, {color} 15%, transparent)` pour les inputs et éléments focusables.
- **Bordures :** 1px solid `{colors.border}` pour délimiter les conteneurs sans alourdir.

**Transitions :** 150ms ease universel pour les états hover/focus. 200ms pour les transitions de thème (background-color, color).

## Shapes

Le langage de formes utilise des border-radius progressifs selon le type d'élément.

- **4px (sm) :** Micro-éléments (tiny badges, toggles internes, skeleton rects).
- **8px (md) :** Éléments interactifs (boutons, inputs, selects, petits composants).
- **10px (panel) :** Panneaux intermédiaires (sidebar, modals, sections, tree nodes).
- **12px (lg) :** Cartes principales, flow containers, ReactFlow nodes.
- **9999px (full) :** Pills, badges circulaires, avatars, boutons ronds, status dots.

**Cohérence :** Ne jamais mélanger des radii différents dans une même vue. Les éléments interactifs sont à 8px, les conteneurs à 10-12px, les badges à 9999px.

## Components

### Boutons

**Primary Button :**
- Background: tertiary-background
- Text: primary
- Border: 1px solid border
- Border-radius: 8px
- Padding: 10px 16px
- Font-weight: 600
- Hover: background passe à secondary-background

**Danger Button :**
- Background: danger
- Text: danger-fg
- Border-radius: 8px
- Padding: 10px 18px
- Hover: background passe à danger-hover

**Publish Button (inversé) :**
- Background: primary
- Text: background
- Border-radius: 8px
- Padding: 8px 16px
- Hover: opacity 0.9

**Icon Buttons :**
- Circulaires (999px) ou carrés (8px)
- 28-40px de côté
- Background: tertiary-background ou transparent
- Hover: background passe à secondary-background

**État désactivé (universel) :** opacity 0.5, cursor not-allowed.

### Cartes

**Card standard :**
- Background: secondary-background
- Border: 1px solid border
- Border-radius: 12px
- Padding: 14px
- Transition: all 200ms ease

**ClickableCard (hover) :**
- Hover: border-color primary, box-shadow 0 8px 20px shadow
- Focus-visible: outline 2px solid primary, offset 3px

**StatsCard :**
- Background: secondary-background
- Border-radius: 8px
- Padding: 16px
- Border: 1px solid tertiary-background

### Inputs

**Input field :**
- Border-radius: 8px
- Padding: 8px 12px
- Height: 40px
- Border: 1px solid border
- Focus: box-shadow 0 0 0 3px color-mix(in srgb, blue 15%, transparent)
- Error: box-shadow 0 0 0 3px color-mix(in srgb, error 15%, transparent)

### Badges

**Badge standard :**
- Border-radius: 9999px
- Padding: 4px 10px
- Font-size: 11px
- Text-transform: uppercase
- Letter-spacing: 0.08em

**StatusPill :**
- Border-radius: 9999px
- Padding: 5px 12px
- Font-size: 12px
- Contient un dot coloré (6px circle)

### Drawers

**Drawer panel :**
- Background: background
- Border-left: 1px solid muted-border
- Box-shadow: -32px 0 80px shadow
- Width: min(460px, 100vw)
- Padding header: 16px 24px
- Padding body: 20px 24px

### Sidebar

**Sidebar navigation :**
- Background: secondary-background
- Border-radius: panel (10px)
- Max-width: 220px
- Item actif: background tertiary-background
- Avatar: border-radius 50%, 36px

## Do's and Don'ts

**À faire :**
- Utiliser les tokens sémantiques (secondary-background, tertiary-background) plutôt que des couleurs hardcodées
- Maintenir les contrastes WCAG AA (4.5:1 pour le texte normal)
- Utiliser la police système pour le corps de texte, Rowdies uniquement pour le logo
- Appliquer border-radius 8px pour les éléments interactifs, 12px pour les cartes
- Utiliser les paires bg/fg pour les couleurs sémantiques (danger + danger-fg)
- Animer avec 150ms ease pour hover/focus, 200ms pour les transitions de thème

**À éviter :**
- Mélanger des border-radius différents dans une même vue
- Utiliser plus de 2 graisses de police différentes sur un écran
- Hardcoder des couleurs RGB/HEX quand un token sémantique existe
- Oublier les états focus pour les éléments interactifs
- Utiliser des ombres trop lourdes (rester sur rgba(0,0,0,0.1))
- Négliger le mode sombre (tester toutes les combinaisons de couleurs)
