# HSSM Ecosystem — Design Philosophy

**Version:** 1
**Status:** Approved. Governs the landing page, and is intended to propagate to the package documentation sites over time.
**Last updated:** 2026-08-13
**Companion to:** [`ecosystem-landing-page-spec.md`](ecosystem-landing-page-spec.md) (v3 — content and design) · [`ecosystem-landing-page-tech-spec.md`](ecosystem-landing-page-tech-spec.md) (v3 — technology) · [`ecosystem-landing-page-future-features.md`](ecosystem-landing-page-future-features.md) (backlog)

**Source material:** design brainstorming session (2026-08-13), conducted visually; the existing HSSM/SSMS/LANfactory logo family; content spec v3 §8.

---

## 1. Purpose and scope

This document defines the **visual system for the HSSM ecosystem**, not a style guide for one page.

That scope follows from a decision taken during the session: the landing page **leads**, and the three package documentation sites follow over time. The front door defines the identity rather than inheriting one. Everything here is therefore expressed as **tokens and rules** that can be ported into Material for MkDocs later, not as page-specific choices.

**What this document governs:** colour, typography, layout, figure treatment, line quality, iconography, light and dark, and motion.

**What it does not govern:** content, information architecture, and copy — those live in the content spec. Technology choices live in the tech spec.

### The brief it answers

The page must read as a **polished, mature research tool in wide community use** — simple and elegant, and *not* recognisable as another software landing page or another documentation site. The difficulty is that "simple and elegant" and "unlike anything else" pull against each other: most attempts at differentiation add noise, and noise reads as amateur.

The resolution is in §2.

---

## 2. The governing law

> **Expressiveness is reserved for evidence.**

Everything else is ink on paper.

This single law is applied three times:

| Applied to | Rule |
|---|---|
| **Colour** | Chrome is monochrome. Colour appears only inside figures. |
| **Motion** | Chrome does not animate. Only data moves. |
| **Prominence** | Figures are set apart as numbered plates. Nothing else gets that treatment. |

### Why a law rather than a palette

Three reasons, in increasing order of importance.

1. **It is differentiating.** Almost no software landing page is monochrome. The page will not be mistaken for one.
2. **It is on-thesis.** The content spec's stated principle is *"show, don't assert."* A system where the data is the only thing allowed to be expressive enforces that principle structurally instead of relying on discipline.
3. **It survives non-designers.** This is the decisive reason. The site will be maintained by people without design training, working months apart. A permissive palette requires a judgement call on every screen, and judgement calls drift. A constraint makes the decision in advance. *When in doubt, the answer is ink.*

### The law also solves the logo

The existing mark is vivid — a spectrum of capsule bars running violet to mint. On a colourful page it would be one colourful thing among many. On a monochrome page it becomes **the single intentional burst of colour**, which reads as deliberate rather than as a legacy asset.

### What the mark already gave us

The logo is not decoration. Its bars rise from a midline in violet and fall from it in mint: it is a **two-boundary defective density plot** — upper- and lower-boundary response-time distributions mirrored about a common axis. The canonical figure of the field, rendered as an identity.

Three things are therefore already ours, and the system extends them rather than inventing alternatives:

- The **capsule bar** as the atomic mark (§8)
- The **mirror about a midline** as a compositional device
- The **violet → mint spectrum** as a sequential data scale (§4.4)

---

## 3. Reference world

The system is a deliberate hybrid, and the hierarchy is explicit because hybrids without one read as indecisive.

| Half | Contributes | Where you see it |
|---|---|---|
| **Editorial / academic press** — *leads* | Typography, layout, measure, margins, the plate-and-caption discipline, section rules and numbering | The page reads as a considered publication |
| **Scientific instrument** — *accents* | Line quality, mono metadata, precision of detail, the sense that figures are readouts rather than illustrations | The artwork reads as real output |

**Not** the reference world: developer-tool and SaaS landing pages, dark-first "AI startup" aesthetics, dashboard UI, or documentation-theme defaults.

---

## 4. Colour

### 4.1 The rule

**Chrome is monochrome. Colour appears only inside figures.**

Navigation, headings, body copy, buttons, borders, rules, backgrounds, and symbol icons are all ink on paper. There is no accent colour, no brand colour in the interface, no coloured button.

Two exceptions, both principled rather than convenient:

1. **The logo** retains its spectrum. It is the one deliberate exception, and it works precisely because it is the only one.
2. **Micro-figure icons** (§8.4) may use the data scale, because they *are* data. Symbol icons may not.

### 4.2 Chrome palette — light

The ground is **Bone**: warmth you feel rather than see. It reads as considered paper next to a default white browser window, while staying neutral enough that the cool data scale sits cleanly on it. It also preserves the most contrast headroom, which matters because accessibility is a CI gate (tech spec R14).

| Token | Value | Use |
|---|---|---|
| `--ground` | `#FCFBF8` | Page background |
| `--surface` | `#F5F3EE` | Header, plate bands, subdued blocks |
| `--surface-sunken` | `#EFEDE6` | Code block background |
| `--border` | `#E5E1D8` | Hairlines, subdivisions |
| `--border-strong` | `#C9C4B8` | Button outlines, emphasised edges |
| `--ink` | `#14130F` | Primary text, section rules, icons |
| `--ink-muted` | `#4B4740` | Body copy, secondary text |
| `--ink-faint` | `#8A857B` | Captions, labels, metadata, eyebrows |
| `--plate` | `#FCFBF8` | Figure board (same as ground in light) |

### 4.3 Chrome palette — dark

Dark mode is **Plate** (§9). The page inverts; figures stay on paper. Grounds inherit the light mode's warmth — a warm paper wants a warm near-black, not a neutral one.

| Token | Value | Use |
|---|---|---|
| `--ground` | `#131211` | Page background |
| `--surface` | `#1C1B18` | Header, bands |
| `--surface-sunken` | `#232019` | Code block background |
| `--border` | `#2C2A26` | Hairlines |
| `--border-strong` | `#413E38` | Button outlines |
| `--ink` | `#F3F1EC` | Primary text, rules, icons |
| `--ink-muted` | `#A8A298` | Body copy |
| `--ink-faint` | `#8F8A80` | Captions, labels |
| `--plate` | `#F2F0EB` | Figure board — **dimmed**, see §9.2 |

### 4.4 The data scale — "Accumulation"

Derived from the logo spectrum, deepened for use on paper. **Sequential**, ordered from violet through blue and cyan to mint.

| Token | Value | | Token | Value |
|---|---|---|---|---|
| `--data-01` | `#4C1D95` | | `--data-05` | `#0369A1` |
| `--data-02` | `#3730A3` | | `--data-06` | `#0891B2` |
| `--data-03` | `#2947C4` | | `--data-07` | `#0D9488` |
| `--data-04` | `#1D4ED8` | | `--data-08` | `#10B981` |

**One version only.** Because figures always sit on paper — in both light and dark mode — the data scale needs no dark variant. This is the concrete payoff of the Plate decision (§9) and it removes a whole workstream from the asset pipeline.

**Use it for ordered quantities:** accumulation time, density height, posterior mass, parameter magnitude.

**Do not use it for categorical series by hue alone.** The scale spans violet → blue → green, which is exactly the range that collapses under the common forms of colour vision deficiency. Where a figure distinguishes *categories* rather than *magnitudes*, differentiate by **position, shape, line style, or direct labelling first**, and treat hue as reinforcement. Two adjacent stops must never be the only thing separating two meanings.

### 4.5 Icon palette

Symbol icons are chrome, so they take ink — never the data scale. This is the same law, not a separate rule.

| State | Light | Dark | Notes |
|---|---|---|---|
| Default | `--ink` `#14130F` | `--ink` `#F3F1EC` | Standard weight in capability grids and inline use |
| Secondary | `--ink-muted` `#4B4740` | `--ink-muted` `#A8A298` | Icons subordinate to adjacent text |
| Faint / decorative | `--ink-faint` `#8A857B` | `--ink-faint` `#8F8A80` | Ornamental marks, disabled states |
| Hover / active | `--ink` | `--ink` | **No hue shift.** Convey state by weight, underline, or background — never by colour |
| On plate | `--ink` `#14130F` | `--ink` `#14130F` | Icons sitting on a figure board follow *light* ink in both modes, because the board is paper |

**The micro-figure exception.** An icon that depicts real data — a histogram, a posterior contour, an accumulation trace (§8.4) — may use `--data-01` … `--data-08`, because under the governing law it is evidence rather than ornament. An icon that is a *symbol* for a concept may not, however data-adjacent the concept is. The test is literal: *does this mark depict a quantity?*

### 4.6 What colour must never do

- Fill a button, badge, or call-to-action
- Indicate hover, focus, or active state
- Differentiate navigation items or sections
- Appear in a gradient anywhere in chrome
- Serve as a "brand accent" in rules, underlines, or dividers
- Decorate an icon that is not itself a figure

---

## 5. Typography

### 5.1 The three families

| Role | Family | Weights | Used for |
|---|---|---|---|
| **Display** | Space Grotesk | 600, 700 | Tagline, section titles, headings |
| **Text** | IBM Plex Sans | 400, 500 | Body copy, subline, navigation, buttons, UI |
| **Mono** | JetBrains Mono | 400, 500 | Section numbers, eyebrows, labels, figure captions, metadata, code |

All three are open-licence variable fonts, **self-hosted and subset** — never loaded from a third-party CDN. Self-hosting avoids the third-party-request exposure that has made CDN fonts a liability for institutional sites in the EU, and removes a render-blocking dependency.

Mono is not decoration here. It carries every piece of *metadata about the content* — section numbers, figure captions, axis labels, eyebrows — which is what gives the page its instrument accent while the display and text faces keep it editorial.

### 5.2 The matplotlib share

**JetBrains Mono is the figure face.** Generated figures set their labels, ticks, and annotations in it via matplotlib rcParams, so figure typography matches page typography exactly.

This revises tech spec D10, which specified a single self-hosted font for both page and figures. Three families serve the page; one of them — the mono — is shared with matplotlib. The original constraint's *intent* (figures must not look foreign to the page) is preserved.

Pair this with `svg.fonttype: 'none'` so labels remain real `<text>` rather than outlined paths, per tech spec D8. The font must be available to the browser for those labels to render correctly, which it is, because it is self-hosted for the page anyway.

### 5.3 Scale

| Step | Size / line-height | Tracking | Family, weight |
|---|---|---|---|
| Display XL | 54 / 1.05 | −0.025em | Space Grotesk 700 |
| Display L | 34 / 1.10 | −0.022em | Space Grotesk 700 |
| Display M | 25 / 1.12 | −0.020em | Space Grotesk 700 |
| Display S | 19 / 1.20 | −0.015em | Space Grotesk 600 |
| Body L | 17 / 1.60 | 0 | IBM Plex Sans 400 |
| Body | 15 / 1.65 | 0 | IBM Plex Sans 400 |
| Body S | 13.5 / 1.60 | 0 | IBM Plex Sans 400 |
| Label | 11 / 1.00 | 0.18em, uppercase | JetBrains Mono 500 |
| Caption | 12 / 1.55 | 0 | JetBrains Mono 400 |

Below 768px, Display XL drops to 34 and Display L to 26; body sizes hold.

### 5.4 Rules of use

- **Negative tracking on display sizes, never on body.** Large Space Grotesk needs tightening; body text does not.
- **Two display weights maximum.** Weight is not a palette.
- **Mono is never body copy.** It labels; it does not narrate.
- **No italic display.** Italic is available in body for emphasis and for Latin species-style conventions, nothing else.
- **Never letter-space lowercase text.** Tracking applies to uppercase labels only.

---

## 6. Layout

### 6.1 Measure and container

| Property | Value |
|---|---|
| Container max-width | 1200px |
| Prose measure | 64ch (hard ceiling 68ch) |
| Page margin, desktop | 54px |
| Page margin, mobile | 24px |
| Plate width | Breaks the measure — container width, or a full-bleed band |

### 6.2 Flush left, always

**Body and display text are set flush left against a strong margin. Never centred.**

This is the system's one deliberate anti-convention, and it does more differentiating work than any other single choice. Centred hero text is the most recognisable landing-page tell there is; flush-left against a firm margin is what publications do. It costs nothing and it is most of the reason the page reads as a document rather than a product page.

Centring is permitted only *inside* a plate, where a figure is centred within its own board.

### 6.3 Section rhythm

The page has six sections (content spec §5), and the design must make that structure legible.

| Device | Treatment | Meaning |
|---|---|---|
| **Heavy rule** | 1.5px `--ink`, full container width | Opens a new section |
| **Hairline** | 1px `--border` | Subdivides *within* a section |
| **Section number** | `§ 01 — Hero`, Label style in mono | Names the section, reinforces the publication register |

The distinction between heavy rule and hairline is what makes six sections read as six rather than as an undifferentiated scroll. It is load-bearing, not ornamental.

### 6.4 Spacing scale

4px base: **4, 8, 12, 16, 24, 32, 48, 64, 96**. No arbitrary values. Section separation uses 64 or 96; within-section rhythm uses 16 to 32.

### 6.5 Mobile

The measure collapses to the viewport minus margins. Plates go full-bleed edge to edge, losing their side rules but keeping top rule and caption. The hero has a **defined mobile composition** rather than a squeezed desktop one — specified in content spec §6.1, and a genuine design deliverable rather than a responsive afterthought.

---

## 7. Figures and plates

### 7.1 The plate

A **plate** is a figure plus its frame and caption, treated as a distinct object on the page. Plates are the only elements permitted to break the measure, carry colour, and take a number.

| Property | Treatment |
|---|---|
| Board | `--plate` |
| Top edge | 1.5px `--ink` rule |
| Bottom edge | 1px `--border` |
| Corner radius | 6px (dark mode only, where the board is a distinct object) |
| Caption | Below, Caption style; `Figure N.` in `--ink` 500, remainder in `--ink-faint` |
| Numbering | Sequential across the page, Arabic |

### 7.2 Captions

Captions state **what the figure shows and how to read it** — the encoding, not just the subject. "Colour encodes accumulation time; the mirrored axis separates the two response boundaries" is a caption. "Model diagram" is a label.

Captions are content, and count against the content spec's word budget.

### 7.3 Accessibility

Every plate carries `role="img"`, a `<title>` and `<desc>`, and `aria-labelledby` referencing both. Decorative sub-elements are `aria-hidden="true"`.

The hero carries the page's central argument and needs more than a `<desc>` string: give it a **visually-hidden text equivalent** adjacent to the figure. Interactive hero elements are focusable controls and need accessible names, not merely titles (tech spec R23).

---

## 8. Line quality and iconography

### 8.1 The capsule pen

One drawing rule governs every mark in the system that is not type:

> **Uniform stroke, round caps, round joins.**

This is the logo's own construction — its bars are capsules. Extending it means icons, diagram arrows, hero connective lines, and figure annotations all appear drawn by the same hand, without anyone having to exercise taste. Same reasoning as the colour law.

### 8.2 Icon specification

| Property | Value |
|---|---|
| Grid | 24 × 24 |
| Stroke | 2px at 24px (scale proportionally: stroke ≈ 0.083 × size) |
| Caps / joins | Round |
| Fill | None, except where a mark is a filled capsule |
| Colour | Per §4.5 |
| Optical padding | 2px inset from the grid edge |

### 8.3 Iconography for the capability grid

The capability grid (content spec §6.5) needs roughly eight icons. They must be **mutually distinguishable at 24px** — the constraint that matters more than the individual designs. Test them small and together, never large and alone.

### 8.4 The micro-figure exception

Where a capability genuinely *has* a canonical figure — a density, a posterior contour, an accumulation trace — the icon may be a miniature of that figure rather than a symbol, and may then use the data scale (§4.5).

**Use this sparingly.** Eight legible micro-figures at 24px is a hard design problem, and if two read alike the grid looks broken rather than clever. Symbols are the default; micro-figures are earned.

---

## 9. Light and dark

### 9.1 Plate

**The page inverts; figures stay on paper.**

Figures become literal plates — lit specimens on a dark page, the way slides read on a lightbox. The section §7 plate discipline stops being a metaphor.

Two reasons this was chosen over a straight inversion:

1. **The identity survives the switch.** Dark mode remains the *same design* rather than becoming a second one, and "this is the evidence" reads more loudly on a dark page than on a light one.
2. **It halves the asset pipeline.** No dark figure variants, no second matplotlib style, no risk of the two drifting apart, no doubling of committed artwork. For a site maintained by rotating lab members, that outweighs a marginally prettier dark mode.

### 9.2 Glare control

A bright board on a dark page at night is the real risk. Three mitigations, all mandatory:

1. The board dims to `--plate` `#F2F0EB` in dark mode — not the light-mode `#FCFBF8`.
2. **Plates never run full-bleed in dark mode.** They keep margins and a 6px radius so they read as objects rather than as a flashlight.
3. Large empty areas of board are trimmed. A plate is sized to its figure, not to the container.

### 9.3 Mechanism

Follow `prefers-color-scheme` by default; offer a persisted explicit toggle (tech spec D5). The toggle matches the three package documentation sites and preserves user control.

Implement as **token overrides only** — one set of custom property values under a media query and a `[data-theme]` selector. Dark mode is a second set of values for tokens that exist anyway; it is never a second stylesheet or a second design.

Prevent flash-of-wrong-theme with a small inline script in `<head>` that applies the stored preference before first paint.

---

## 10. Motion — pass 2

Motion is deferred to the second delivery pass (tech spec §2). The **principles** are settled now, because they constrain how pass-1 artwork must be structured.

### 10.1 The rule

> **Motion is data.**

Chrome does not animate. What moves is evidence: a trajectory accumulating, a density filling, a tile docking at the "+" slot, four steps resolving in sequence.

### 10.2 Specifically forbidden

Fade-up-on-scroll for text blocks · parallax · hover-lift or scale on cards · animated gradients · loading skeletons used decoratively · anything that moves because the viewport moved.

These are product-page reflexes. Any one of them would undo the publication register instantly.

### 10.3 Character

- **Process-paced, not UI-paced.** An accumulation should take 600–1200ms and read as a process. 200ms UI easing makes data look like a menu opening.
- **Once on entry, not looping.** Indefinite hero motion is an attention and accessibility complaint, already flagged in the backlog.
- **No overshoot, no bounce.** Data does not spring.

### 10.4 Hard constraints

Every visual must communicate fully in a screenshot — animation is enhancement, never a dependency. `prefers-reduced-motion` falls back to the static composition. No layout shift. No blocking of first paint.

### 10.5 What pass 1 owes pass 2

Individually addressable elements in the hero and figures — stable ids or data attributes (tech spec R24). Pass-1 interactivity needs them anyway; pass-2 animation reuses exactly the same targets. Building them once is the retrofit worth avoiding.

---

## 11. Accessibility as a design constraint

Treated as design input, not as a review pass — and enforced as a CI gate (tech spec R14).

| Constraint | Consequence for design |
|---|---|
| Contrast | The Bone ground was chosen partly for contrast headroom. Every ink-on-ground and ink-on-plate pair must clear WCAG AA. |
| Colour never sole carrier | §4.4 and §4.5. State is conveyed by weight, underline, or background — never hue. |
| Hover parity | Anything revealed on hover must be reachable by keyboard focus and by tap (WCAG 2.1 SC 1.4.13). A payload that cannot be reached three ways does not go in the hero. |
| Motion | `prefers-reduced-motion` honoured; nothing loops. |
| Figure alternatives | §7.3. |
| Focus visibility | Focus rings are ink, never colour, and never removed. |

---

## 12. What this system forbids

A checklist for review. Any of these appearing is a defect, not a preference.

- Centred body or display text
- A coloured button, badge, or call-to-action
- An accent colour anywhere in chrome
- Gradients in chrome
- Drop shadows used for depth (the minimal dark-mode plate lift is the sole exception)
- Card grids with shadows and rounded corners as a layout device
- Emoji used as icons
- Hover states that change hue
- Hover-lift, scale, or translate transforms on interactive elements
- Stock photography, abstract 3D renders, or generic illustration
- Full-bleed bright plates in dark mode
- Colour on an icon that does not depict a quantity
- More than two display weights
- Letter-spaced lowercase text
- Arbitrary spacing values outside the scale

---

## 13. Rejected directions

Recorded so they are not re-proposed without new rationale.

| Direction | Verdict |
|---|---|
| **Data-Ink** (warm paper, monochrome chrome, colour only in data) | **Selected**, with typography from Instrument and figure discipline from Monograph |
| **Instrument** (dark-first, luminous signal colours on near-black) | Rejected as the overall direction — dark-first with luminous accents is the current house style of AI and developer-tool startups, the nearest neighbour to what the brief rules out. Its *typography* was adopted |
| **Monograph** (light, logo spectrum matured and used structurally) | Rejected as the overall direction — safest and most conventional. Its *plate-and-caption figure discipline* was adopted |
| Serif display (Source Serif 4, Literata) | Rejected in favour of Space Grotesk at the owner's preference. Noted: the serif was one of Data-Ink's differentiators, and its loss is compensated by the colour law |
| Familjen Grotesk, Instrument Sans as display | Considered as less-common alternatives to Space Grotesk; Space Grotesk retained |
| Manila `#F6F1E6`, Cream `#FBF9F5` grounds | Rejected — warmer grounds place the coolest hues of the data scale on the warmest possible background; the cyan goes visibly acidic |
| Cool white `#FCFCFD` ground | Rejected — best colour harmony, but surrenders the paper quality that makes the direction distinctive |
| **Ink** dark mode (warm inversion) | Rejected — honest and consistent, but the answer everyone reaches for, and it requires two figure variants |
| **Negative** dark mode (luminous, cool) | Rejected — it is the Instrument direction, already passed on, and would make dark mode a different design rather than the same one after sunset |
| Technical hairline icons | Rejected — elegant, but reads thin at small sizes and fights the logo's round caps |
| Micro-figures as the whole icon set | Rejected as the default; retained as an earned exception (§8.4) |
| Tailwind or any CSS framework | Rejected in tech spec D9 |
| Light-only (no dark mode) | Considered once Plate made dark mode cheap; rejected — the audience skews dark-mode, and the remaining cost is roughly a dozen token overrides |

---

## 14. Open items

| Item | Notes |
|---|---|
| Icon set design | Eight capability icons in the capsule pen. Must be mutually distinguishable at 24px — test small and together |
| Hero mobile composition | Content spec §6.1, §11. A design deliverable, not a responsive fix |
| Hero hover payload copy | Content spec §6.1a, §11 |
| Contrast audit | Verify every ink-on-ground and ink-on-plate pair against WCAG AA before the CI gate is switched on |
| Font subsetting | Determine glyph coverage needed, including figure labels and any mathematical notation |
| Propagation to package docs | Port these tokens into Material for MkDocs. Deliberately after launch |

---

## 15. Relationship to the other specs

| Document | Relationship |
|---|---|
| Content spec v3 | Owns content, IA, and copy. This document supersedes its §8 "Visual and design direction", which described a muted indigo/teal palette with a warm accent — that predates the colour law and the palette work here |
| Tech spec v3 | Owns technology. Two decisions are revised by this document: **D10** (three families, JetBrains Mono shared with matplotlib) and **D5/D8** (one figure variant, not two, because dark mode keeps figures on paper) |
| Future features | Motion goals live there; motion *principles* live here (§10) |
