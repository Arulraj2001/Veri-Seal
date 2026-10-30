---
colors:
  primary: "#D9531E"
  secondary: "#09090B"
  background: "#FAFAFA"
  surface: "#FFFFFF"
  text: "#09090B"
  text-muted: "#71717A"
  border: "#E4E4E7"
  accent-es: "#D9531E"
  accent-fr: "#2563EB"
  accent-de: "#D97706"
typography:
  fontFamily: "Geist, Plus Jakarta Sans, sans-serif"
  monoFamily: "Geist Mono, JetBrains Mono, monospace"
  headingTracking: "-0.03em"
  bodyTracking: "-0.01em"
---

## Overview
Kagazo International Precision Suite implements a Tactile Swiss-Fintech design system for Spain (ES), France (FR), and Germany (DE) utility micro-tools.

## Colors
- **Primary / Accent ES:** `#D9531E` (Iberian Terracotta)
- **Accent FR:** `#2563EB` (French Ultramarine)
- **Accent DE:** `#D97706` (German Precision Amber)
- **Neutral Canvas:** `#FAFAFA`
- **Surface Card:** `#FFFFFF`
- **Text Main:** `#09090B` (Off-black)
- **Text Muted:** `#71717A`
- **Border Hairline:** `#E4E4E7`

## Typography
- **Headlines:** Track-tight (`-0.03em`), high contrast, no screaming font sizes.
- **Numbers & Calculation Results:** Monospace font (`Geist Mono`) mandatory to prevent numeric layout jitter during slider scrubbing.

## Layout
- Maximum content width: 1152px (max-w-6xl).
- Dual sticky gutter margins reserved for high-viewability non-intrusive 160x600 display units.
- Clean 2-column asymmetric split for calculation cockpit: Left column controls (sliders, selectors), right column dark-mode result waterfall card.

## Components
- **Sliders & Inputs:** Tactile numeric steppers, active focus ring matching locale accent color.
- **Result Waterfall Card:** High-contrast Dark Zinc (`#09090B`) container with stacked percentage bars for Net, Tax, and Social contributions.
- **Answer Capsule:** Bordered white card featuring a 45-word direct answer capsule optimized for AI Overviews and featured snippets.

## Do's and Don'ts
- **DO** keep exact 0% storage privacy guarantee visible.
- **DO** use localized official terminology (e.g. *Sueldo Neto*, *Cotisations URSSAF*, *Lohnsteuer*).
- **DON'T** use purple or neon gradient buttons.
- **DON'T** let the root global Header and Footer render on international route groups.
