---
name: Civic Precision
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fc'
  on-secondary-container: '#57657a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b1a'
  on-tertiary-container: '#868381'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1d1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  tabular-stat:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an authoritative, high-efficiency operating canvas for municipal administrators, civil servants, and citizens. Built upon principles of structural clarity, radical reduction of visual noise, and immediate legibility, the interface prioritizes operational urgency over ornament.

The design movement merges **Functional Minimalism** with **Structured High-Contrast Editorial SaaS**. It strips away decorative gradients, gratuitous iconography, and arbitrary illustrations to position public data, civic accountability, and analytical workflows at the forefront.

### Design Principles
- **Utilitarian Decisiveness:** Every UI primitive exists strictly to communicate operational state, priority, or action. Form follows civic consequence.
- **Architectural Neutrality:** The chrome and canvas remain aggressively monochromatic, allowing status signals and tabular metrics to command immediate, unambiguous comprehension.
- **Data-Dense Legibility:** Grid structures, tabular alignments, and high-contrast typographic pairings facilitate rapid parsing of incident streams, dispatch records, and geospatial reports.

## Colors

The system employs a strict light-mode monochromatic spectrum punctuated solely by functional status accents. Structural chrome remains rooted in deep carbon neutrals and stark structural boundaries, preventing cognitive fatigue during extended administrative shifts.

### Structural Grayscale
- **Canvas Base:** `#F7F7F7` serves as the global backdrop, establishing clean separation from component tiles.
- **Primary Surface:** `#FFFFFF` anchors interactive cards, sidebars, tables, and modal layers.
- **Secondary Surface:** `#F0F0F0` handles input fills, table headers, and nested container sections.
- **Dividers & Grid Lines:** `#E5E5E5` provides structural separation without competing with text.
- **High-Contrast Text & Actions:** `#111111` drives primary typography and high-emphasis button fills; `#000000` is reserved for absolute contrast focal points and active state borders.

### Functional Status Indicators
Color application is strictly reserved for lifecycle states. Background badges use a soft tint paired with a high-contrast ink:
- **Resolved:** Background `#DCFCE7`, Foreground `#166534` (Deep Pine).
- **In Progress:** Background `#FEF3C7`, Foreground `#B45309` (Amber Ochre).
- **Rejected / Critical / Escalated:** Background `#FEE2E2`, Foreground `#991B1B` (Oxblood Crimson).
- **Under Review / Triaged:** Background `#F1F5F9`, Foreground `#475569` (Slate Neutral).

Charts, data bars, and metrics must utilize grayscale gradations (`#111111`, `#475569`, `#94A3B8`, `#E2E8F0`) rather than multi-hued spectra, reserving colored markers exclusively for SLA breach status.

## Typography

Typographic scale is structured around **Inter** across all functional roles. Numerical tracking and data presentation require the CSS property `font-feature-settings: "tnum" 1, "cv05" 1` to guarantee monospaced tabular alignment across KPI modules, incident queues, and resolution timelines.

### Implementation Guidelines
- **Weight Contrast:** Maintain stark differences between weights. Use `700` (Bold) for module titles and KPI integers; utilize `400` (Regular) for incident descriptions, logs, and secondary metadata.
- **Labeling Discipline:** Micro-labels, SLA timers, and complaint tracking codes must be set in `label-sm` or `label-md` with positive letter tracking and uppercase transformation when identifying system codes (e.g., `CASE #CV-8924`).
- **Data Tables:** All cell contents, including timestamps and currency/count metrics, inherit `body-md` or `body-sm` with tabular lining figures enabled by default.

## Layout & Spacing

Layout geometry follows an 8-point vertical grid architecture with 4-point micro-adjustments for compact table densities and input fields. The structural paradigm employs a **Fluid Grid** constrained within a maximum application viewport of 1600px.

### Breakpoints & Adaptive Strategy
- **Mobile (< 768px):** 4-column layout; gutter `1rem`; edge margin `1rem`. Side navigation collapses into an off-canvas drawer. Metric cards snap to single column with horizontal swipe-through queues.
- **Tablet (768px - 1024px):** 8-column layout; gutter `1rem`; edge margin `1.5rem`. Secondary detail panes stack beneath the main complaint list.
- **Desktop (> 1024px):** 12-column layout; gutter `1.5rem`; edge margin `2rem`. Persistent global navigation, dual-pane incident lists, and persistent situational telemetry remain active simultaneously.

Horizontal and vertical gap distances align rigorously to the scale: `space-xs` (4px) for inline status icon spacing, `space-sm` (8px) for stack item buffers, `space-md` (16px) for interior card padding, and `space-xl` (32px) for primary analytical section breaks.

## Elevation & Depth

This design system rejects conventional blur-heavy drop shadows. Spatial hierarchy is maintained through **Low-Contrast Outlines** combined with **Tonal Surface Layering**.

### Hierarchy of Planes
- **Ground Floor (Base Canvas):** `#F7F7F7`. The global window frame and inactive surface areas.
- **Floor 1 (Structural Cards & Tables):** `#FFFFFF` bordered with a crisp `1px solid #E5E5E5`. No drop shadow.
- **Floor 2 (Sub-sections, Inset Trays & Inputs):** `#F0F0F0` or `#FFFFFF` with inset `1px solid #E5E5E5`.
- **Floor 3 (Popovers, Flyouts, Sticky Headers):** `#FFFFFF` paired with an outline of `1px solid #111111` or a hairline `1px solid #E5E5E5` backed by an ultra-diffused ambient perimeter: `box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05)`.
- **Floor 4 (Modals & Emergency System Alerts):** `#FFFFFF` surface enclosed in a definitive `1px solid #000000` border, cast against a `#000000` backdrop overlay at 40% opacity.

## Shapes

The interface embraces a restrained **Soft (`1`)** corner geometry. This slight curvature tempers pure brutality, providing a balanced, modern enterprise finish without softening the system's professional posture.

### Radius Values
- **Base Components (`rounded` / 0.25rem / 4px):** Applied to buttons, text input fields, status chips, segmented switches, and pagination controls.
- **Containers (`rounded-lg` / 0.5rem / 8px):** Applied to data table wrappers, analytical card boundaries, modals, and slide-over panels.
- **No Circular Shapes:** Avoid pill-shaped buttons or fully round elements. User avatars, filter badges, and iconography must remain square or use the standard 4px soft radius to maintain architectural discipline.

## Components

### Buttons & Interactive Controls
- **Primary Button:** `#111111` solid background with pure `#FFFFFF` label. On hover, background shifts to `#000000`. Focused state adds a 2px offset ring in `#111111`.
- **Secondary Button:** Surface `#FFFFFF`, border `1px solid #E5E5E5`, text `#111111`. On hover, surface becomes `#F0F0F0` and border shifts to `#111111`.
- **Destructive Action:** Surface `#FFFFFF`, border `1px solid #FEE2E2`, text `#991B1B`. Active hover fills `#991B1B` with pure `#FFFFFF` text.

### Status Chips & Badges
- Constructed with `label-sm` typography (uppercase tracking), vertical padding of `2px`, and horizontal padding of `8px`.
- Strictly bounded by the status palette tokens. Borders are 1px solid using an opacity of 20% of the ink color. No circular pill shapes; use a 4px corner radius.

### Data Tables & Incident Lists
- **Header:** Background `#F0F0F0`, border-bottom `1px solid #E5E5E5`, typography `label-md` in `#475569`, text uppercase.
- **Rows:** Alternating zebra backgrounds are prohibited. Default `#FFFFFF` background separated by `1px solid #E5E5E5` row dividers.
- **Hover State:** Table row transitions to `#F7F7F7` on cursor focus.
- **Numerical Alignment:** Numeric columns right-align with `tnum` font features active. Case ID columns display as fixed-width, bold `Inter` tracking.

### Input Fields & Search Filters
- **Default State:** Background `#FFFFFF`, height `36px`, border `1px solid #E5E5E5`, text `#111111`, placeholder `#94A3B8`.
- **Focus State:** Border shifts to crisp `1px solid #000000` with no multi-colored glow or drop shadows.
- **Prefix / Suffix:** Monochromatic icons (`16px`) in `#475569`.

### Cards & Analytical Metric Tiles
- Surface `#FFFFFF` encased in `1px solid #E5E5E5`.
- Inner structure includes a clear header with a descriptive label (`label-md` in `#475569`), followed by a large tabular number (`tabular-stat` in `#111111`), concluding with an SLA baseline delta indicator.
- Metric charts within cards employ monochrome step lines, bar charts in `#111111` or `#94A3B8`, and hairline baseline rules in `#E5E5E5`.

### Checkboxes & Radios
- Square 16px boxes with a 2px radius. Inactive: `#FFFFFF` with `1px solid #E5E5E5`. Checked: Solid `#111111` fill with an interior `#FFFFFF` checkmark or center square.