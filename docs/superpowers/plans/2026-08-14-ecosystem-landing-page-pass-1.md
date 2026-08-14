# HSSM Ecosystem Landing Page — Pass 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the static, fully-interactive-without-motion HSSM ecosystem landing page and its Ecosystem reference sub-page, deployed to GitHub Pages behind four CI gates.

**Architecture:** An Astro 7 static site. All copy and structured content lives in Zod-validated content collections (YAML) so rotating lab members edit data, never templates. The visual system is vanilla CSS custom properties in one token file, with automated guards that enforce the design philosophy's colour law and spacing scale as tests rather than review items. The hero is an Astro component tree of individually addressable, focusable elements — built once for pass-1 interactivity and reused as pass-2 animation targets.

**Tech Stack:** Astro 7.2.2 · vanilla CSS custom properties (no framework) · Zod content collections · Vitest 4 + Astro Container API + linkedom · `astro:fonts` local provider · lychee · Lighthouse CI · GitHub Actions → GitHub Pages

**Scope:** Pass 1 only, per tech spec §2. Animation (D3) and the asset generation pipeline (D8) are **out of scope**, except the hero's addressable structure (R24) and the theming tokens (D5/R15), which §2 names as pass-1 obligations because they are expensive retrofits.

---

## Global Constraints

Every task's requirements implicitly include this section. Values are copied verbatim from the specs.

**Toolchain and reproducibility**
- Astro `7.2.2`. Node engine floor `>=22.12.0`; pin `.nvmrc` and CI to `24` (Active LTS).
- Committed `package-lock.json`; CI installs with `npm ci`; pinned CI runtime. (R18)
- **No Tailwind or any CSS framework.** Vanilla CSS with custom properties. (D9)
- No server-side runtime; static output only. (R1)

**The colour law — design philosophy §2, §4.1, §4.6, §12**
- Chrome is monochrome. Colour appears **only inside figures**.
- No coloured button, badge, or call-to-action. No accent colour anywhere in chrome. No gradients in chrome.
- Hover/focus/active state is conveyed by **weight, underline, or background — never by hue**.
- Two principled exceptions only: the logo keeps its spectrum; micro-figure icons that depict a quantity may use the data scale.
- Focus rings are ink, never colour, and never removed.

**Layout — design philosophy §6**
- Container max-width `1200px`; prose measure `64ch` (hard ceiling `68ch`); page margin `54px` desktop / `24px` mobile.
- **Flush left, always. Never centred.** Centring is permitted only *inside* a plate.
- Spacing scale, no arbitrary values: `4, 8, 12, 16, 24, 32, 48, 64, 96`. Section separation uses 64 or 96; within-section rhythm 16–32.
- Heavy rule `1.5px --ink` opens a section; hairline `1px --border` subdivides within one.

**Typography — design philosophy §5, tech spec D10**
- Three families, self-hosted, **never from a CDN**: Space Grotesk (display, 600/700), IBM Plex Sans (text, 400/500), JetBrains Mono (mono, 400/500).
- Maximum two display weights. Mono is never body copy. No italic display. Never letter-space lowercase text.
- Negative tracking on display sizes only, never on body.

**Accessibility — R14, R23, design philosophy §11**
- Nothing is hover-only. Every hover-revealed payload must also be reachable by keyboard focus **and** by tap. WCAG 2.1 SC 1.4.13.
- Every plate carries `role="img"`, a `<title>` and `<desc>`, and `aria-labelledby` referencing both; decorative sub-elements are `aria-hidden="true"`.
- The hero carries a **visually-hidden text equivalent** adjacent to the figure. Interactive hero elements are focusable controls with accessible names.
- Every ink-on-ground and ink-on-plate pair must clear WCAG AA.

**Motion — pass 1**
- **No animation ships in pass 1.** No transitions on hover beyond instant state change.
- Specifically forbidden, now and in pass 2: fade-up-on-scroll, parallax, hover-lift or scale on cards, animated gradients, decorative skeletons, anything that moves because the viewport moved.
- `prefers-reduced-motion` falls back to the static composition.

**This repository is Node-only (C13 — owner, 2026-08-14)**
- Never install Python, HSSM, matplotlib, arviz, or any scientific Python stack. No `requirements.txt`, no venv, no MCMC.
- Data-bearing figures arrive as **committed PNG (or SVG) files** supplied from outside this repo. Placeholders are acceptable until they land.
- Logos are in `assets/logos/` (`hssm.png`, `LANFactory.png`, `ssm_simulators.png`, `carney_brainstorm.gif`). Use those files; do not regenerate them.
- Footer copy may be dummy text in pass 1.

**Content**
- 6 sections, **~550 words** total body copy, ~4 screens at 1440×900, 4 substantial visuals.
- Hero hover payloads: **~120 words total**, excluded from the body count, one line each.
- Exactly **1** code snippet, **3 lines**. (R11)
- **No model counts anywhere in the build output.** Name families, never numbers. (R13, content spec §10)
- Model families must read as **a selection, not a catalogue**. (R25)
- Outbound model-list link targets do not yet exist upstream; link to the closest existing targets and state plainly what they are. (R26)

**Citability — D11**
- `CITATION.cff`; canonical URL tags on both pages; `@astrojs/sitemap`; one Open Graph image.
- Content licence **CC-BY**, distinct from the code licence.

---

## Decisions taken to unblock this plan

Tech spec §7 and content spec §11 leave nine items open. Six of them block implementation. A plan cannot contain placeholders, so each is **decided here with a recorded default and a rationale**, and each is stored in one file so owner sign-off is a one-line diff rather than a code change.

| # | Open item | Decision taken | Where to change it | Rationale |
|---|---|---|---|---|
| A | Tagline | **"Model what you mean."** | `src/content/copy/site.yaml` | The content spec §7 recommendation. 4 words, under the ≤8 ceiling. |
| B | Subline | **"Open Python tools for fitting neurocognitive process models to behaviour, neural, and eye-tracking data."** | `src/content/copy/site.yaml` | Content spec §7 draft 3 — the only draft that carries all three modalities the hero draws. |
| C | Hero hover payload copy | Written in Task 6, ~110 words across 15 elements | `src/content/copy/hero.yaml` | Content spec §11 assigns this to Copy but it blocks R22. Drafted to the ~120-word ceiling. |
| D | Hero mobile interaction (tap-to-reveal vs tap-to-follow) | **No reveal on touch.** Under `@media (hover: none)` every payload renders as always-visible caption text; the element stays a plain link. | `src/components/hero/hero.css` | Dissolves the gesture conflict instead of arbitrating it, satisfies R23's third path without a JS tap handler, and matches content spec §6.1a constraint 2 ("complete without interaction"). |
| E | Hero mobile composition | **Single column, same DOM.** Core tiles → module row (wraps) → left-flank group → right-flank group, each with its caption. Desktop and mobile are two CSS Grid templates over identical markup. | `src/components/hero/hero.css` | R9 demands a defined composition, not a squeeze. One DOM keeps the R24 element ids stable across breakpoints, which pass-2 animation needs. |
| F | Infrastructure modules: ring vs straight row | **Straight row**, as the content spec Appendix A wireframe draws it. | `src/components/hero/HeroModules.astro` | A ring cannot degrade to the mobile composition without re-layout, which would break decision E's single-DOM property. |
| G | Return-arrow crossing (content spec §6.1 design note) | The insight return path **exits the core's lower-left edge and runs beneath the stream panels**. | `src/components/hero/art/paths.svg` | The spec names both options; routing beneath the panels is the one that also survives the mobile stack. |
| H | Domain name and registration | **Not decided here — it is the owner's and it is institutional (R21).** The build is domain-agnostic: `site` and `base` come from environment variables with project-pages defaults, so the domain lands as two repo variables plus a `CNAME` file. | `astro.config.mjs`, repo variables | R21 says a personal registration is the single likeliest long-term failure mode. Nothing in the build should depend on which domain wins. |
| I | Code licence | **MIT** for site code; **CC-BY 4.0** for prose and figures (D11). | `LICENSE`, `LICENSE-CONTENT` | `ssm-simulators` is MIT. HSSM carries a Brown University custom licence — **flag for the owner** whether Brown requires the same here. |
| J | Logos | **Use `assets/logos/` as supplied.** Header uses `hssm.png`. Package marks (`LANFactory.png`, `ssm_simulators.png`) and `carney_brainstorm.gif` are available for credibility / footer. | `assets/logos/` | Owner, 2026-08-14. Raster files on a black field; do not redraw. |
| K | Worked-example figures | **Supplied PNG, placeholders until they arrive.** No HSSM install, no MCMC in this repo. Panel narrative may be generic. | `src/assets/figures/` | Owner, 2026-08-14 (C13). Details of the Cavanagh fit do not block pass 1. |
| L | Footer | **Dummy text is acceptable** in pass 1. | `src/layouts/BaseLayout.astro` | Owner, 2026-08-14. Real links can replace the placeholder later. |

### Two decisions that revise the tech spec

**1. Contrast — three token values in design philosophy §4.2/§4.3 fail WCAG AA and are corrected here.**

Design philosophy §14 lists "Contrast audit — verify every ink-on-ground and ink-on-plate pair against WCAG AA before the CI gate is switched on" as an open item. Running that audit against the published tokens finds three failures:

| Token | Published value | Measured | Required | Corrected value | New ratio |
|---|---|---|---|---|---|
| `--ink-faint` (light) | `#8A857B` | **3.55:1** on `--ground` | 4.5:1 — it sets Caption (12px) and Label (11px), both small text | **`#706B63`** | 5.11 ground / 4.77 surface / **4.51 sunken** |
| `--border-strong` (light) | `#C9C4B8` | **1.68:1** on `--ground` | 3.0:1 — SC 1.4.11, it is the button boundary | **`#908C84`** | 3.24 ground / 3.02 surface |
| `--border-strong` (dark) | `#413E38` | **1.76:1** on `--ground` | 3.0:1 — same reason | **`#686661`** | 3.26 ground / 3.00 surface |

Each correction is a pure multiplicative scale of the original RGB, so the hue is unchanged — these are the *least-changed* values that clear the bar. Every other published token passes: light `--ink` 17.96, `--ink-muted` 8.92; dark `--ink` 16.58, `--ink-muted` 7.38, `--ink-faint` 5.45. `--border` (`#E5E1D8` / `#2C2A26`) is a decorative hairline and is exempt from SC 1.4.11.

Task 2 encodes these ratios as a test, so the audit runs on every commit rather than once.

**Also recorded, not a failure:** on the dark-mode plate (`#F2F0EB`), data scale stops `--data-06` (3.23), `--data-07` (3.29) and `--data-08` (2.23) fall below 4.5:1. They are legal as figure fills and areas, but must not be the sole carrier of a thin line's meaning — which design philosophy §4.4 already forbids on colour-vision grounds. No token change; noted so figure authors have the numbers.

**2. GitHub Pages publishes from a `gh-pages` branch, not from an Actions artifact.**

D6 requires PR previews and notes they are "not native to GitHub Pages". The standard preview action (`rossjrw/pr-preview-action`) publishes into a subdirectory of a branch; the standard Astro deploy (`withastro/action`) uploads an artifact. **The two mechanisms cannot both drive one Pages site.** This plan picks the branch: production publishes `dist/` to `gh-pages` root, previews publish to `gh-pages/pr-preview/pr-<N>/`. One mechanism, previews work, and C10's "no step only one person can run" holds.

This is why `base` must be environment-driven (decision H): a preview lives under a different path prefix than production, and every internal link has to follow. Task 1 sets that up and Task 16 tests it.

---

## File Structure

```
.
├── .nvmrc                              # 24
├── .lycheeignore                       # reuses the HSSM package convention
├── package.json  package-lock.json
├── astro.config.mjs                    # site/base from env; sitemap; fonts
├── tsconfig.json
├── vitest.config.ts                    # wraps getViteConfig so .astro compiles in tests
├── lighthouserc.json                   # R17 budget + accessibility=1.0 gate
├── CITATION.cff                        # D11
├── LICENSE                             # MIT — site code
├── LICENSE-CONTENT                     # CC-BY 4.0 — prose and figures
├── assets/
│   └── logos/                          # supplied marks — hssm, LANFactory, ssm_simulators, carney_brainstorm
├── public/
│   └── og.png                          # generated by scripts/make-og.mjs
├── scripts/
│   └── make-og.mjs                     # SVG → 1200×630 PNG via sharp
├── src/
│   ├── content.config.ts               # loaders + schemas → collections (D4)
│   ├── schemas.ts                      # plain Zod, importable by tests without Astro
│   ├── content/
│   │   ├── copy/site.yaml              # tagline, subline, CTAs, section prose
│   │   ├── copy/hero.yaml              # 15 hero elements: label, payload, href
│   │   ├── model-families/*.yaml       # 4 files, one per family (R25)
│   │   └── capabilities/*.yaml         # 8 files, one per capability
│   ├── assets/
│   │   ├── fonts/*.woff2               # 3 variable fonts, committed
│   │   └── figures/                    # supplied PNG (or SVG) — placeholders until owner drops real plots
│   ├── styles/
│   │   ├── tokens.css                  # THE single source of colour + type + space
│   │   ├── base.css                    # reset, landmarks, focus rings, measure
│   │   └── plate.css                   # §7 plate discipline
│   ├── components/
│   │   ├── ThemeToggle.astro
│   │   ├── SectionRule.astro           # heavy rule + §NN mono number
│   │   ├── Plate.astro                 # figure + caption + the §7.3 a11y contract
│   │   ├── Icon.astro
│   │   ├── icons/*.svg                 # 8 capability icons, capsule pen
│   │   ├── hero/
│   │   │   ├── Hero.astro              # composition + grid
│   │   │   ├── HeroElement.astro       # THE addressable/focusable/payload primitive
│   │   │   ├── HeroCore.astro          # 5 model tiles + the "+" tile
│   │   │   ├── HeroModules.astro       # 5 module tiles, straight row (decision F)
│   │   │   ├── HeroStreams.astro       # left flank
│   │   │   ├── HeroContribution.astro  # right flank
│   │   │   ├── hero.css
│   │   │   └── art/                    # tile cartoons, stream miniatures, paths
│   │   └── sections/
│   │       ├── PayoffBand.astro  FourStepChain.astro
│   │       ├── CapabilityGrid.astro  WorkedExample.astro  Credibility.astro
│   ├── layouts/BaseLayout.astro        # landmarks, head, theme script, canonical
│   └── pages/
│       ├── index.astro                 # the 6 sections
│       └── ecosystem.astro             # the reference sub-page (§13)
├── tests/
│   ├── helpers/{contrast.ts,css.ts,dom.ts}
│   ├── tokens.test.ts        colour-law.test.ts    spacing.test.ts
│   ├── typography.test.ts    theme.test.ts         plate.test.ts
│   ├── schemas.test.ts       copy-budget.test.ts   claims.test.ts
│   ├── hero.test.ts          sections.test.ts
│   └── build/{landmarks,links,counts}.test.ts      # run against dist/
└── .github/workflows/
    ├── ci.yml  deploy.yml  preview.yml  drift.yml
```

**Why the structure is shaped this way.** Presentational components take **props, never `getCollection()`** — pages do the data fetching and pass data down. That one rule is what makes every component testable through the Astro Container API without booting the content layer, and it is worth holding to even where inlining a fetch would be shorter.

`src/schemas.ts` holds plain Zod objects with no Astro import, so `tests/schemas.test.ts` can validate the real YAML files directly. `src/content.config.ts` imports those same schemas — one source of truth, validated twice (test time and build time).

---

## Task 1: Scaffold, pinned toolchain, and the build smoke test

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.nvmrc`, `vitest.config.ts`
- Create: `src/layouts/BaseLayout.astro`, `src/pages/index.astro`
- Create: `tests/helpers/dom.ts`, `tests/build/landmarks.test.ts`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `BaseLayout.astro` with props `{ title: string; description: string; canonicalPath: string }` and a default slot. Every page in every later task uses exactly this signature.
- Produces: `tests/helpers/dom.ts` exporting `renderComponent(Component, opts) => Promise<Document>` and `readDist(relPath) => Document`.
- Produces: npm scripts `dev`, `build`, `preview`, `test`, `check`.

- [ ] **Step 1: Write the failing test**

Create `tests/helpers/dom.ts`:

```ts
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parseHTML } from 'linkedom';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

/** Render a single .astro component to a Document, without booting the content layer. */
export async function renderComponent(
  Component: AstroComponentFactory,
  opts: { props?: Record<string, unknown>; slots?: Record<string, string> } = {},
): Promise<Document> {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Component, opts);
  return parseHTML(`<!doctype html><html><body>${html}</body></html>`).document;
}

/** Read a file produced by `astro build`. Fails loudly if the build was not run. */
export function readDist(relPath: string): Document {
  const abs = join(process.cwd(), 'dist', relPath);
  return parseHTML(readFileSync(abs, 'utf-8')).document;
}

export function readDistText(relPath: string): string {
  return readFileSync(join(process.cwd(), 'dist', relPath), 'utf-8');
}
```

Create `tests/build/landmarks.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readDist } from '../helpers/dom';

describe('built pages carry semantic landmarks (R14)', () => {
  it('index.html has a single main landmark, a header, a footer and a title', () => {
    const doc = readDist('index.html');
    expect(doc.querySelectorAll('main')).toHaveLength(1);
    expect(doc.querySelector('header')).not.toBeNull();
    expect(doc.querySelector('footer')).not.toBeNull();
    expect(doc.title.length).toBeGreaterThan(0);
  });

  it('index.html declares a language and a canonical URL (D11)', () => {
    const doc = readDist('index.html');
    expect(doc.documentElement.getAttribute('lang')).toBe('en');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toMatch(/^https?:\/\//);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/build/landmarks.test.ts`
Expected: FAIL — `Cannot find module 'vitest'` (nothing is installed yet).

- [ ] **Step 3: Create the toolchain files**

`.nvmrc`:

```
24
```

`package.json`:

```json
{
  "name": "hssm-ecosystem-site",
  "type": "module",
  "private": true,
  "engines": { "node": ">=22.12.0" },
  "scripts": {
    "dev": "astro dev",
    "check": "astro check",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@astrojs/sitemap": "3.7.3",
    "astro": "7.2.2"
  },
  "devDependencies": {
    "@astrojs/check": "0.9.10",
    "linkedom": "0.18.13",
    "typescript": "5.9.3",
    "vitest": "4.1.10"
  }
}
```

`astro.config.mjs` — `site` and `base` are environment-driven so the undecided domain (decision H) and the per-PR preview path (Task 17) both work without a retrofit:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Defaults describe the project-pages URL of the current remote. CI overrides both.
// When the institutional domain lands (R21), set SITE_URL and BASE_PATH='/' as repo
// variables and add public/CNAME — no source change.
const SITE = process.env.SITE_URL ?? 'https://krishnbera.github.io';
const BASE = process.env.BASE_PATH ?? '/HSSMEco_Webpage/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
```

`tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "src/**/*", "tests/**/*", "*.config.*"],
  "exclude": ["dist"]
}
```

`vitest.config.ts` — `getViteConfig` is what lets Vitest import `.astro` files:

```ts
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    // Build-output tests read ./dist, so they must not run before `astro build`.
    // `npm run test` in CI runs after the build step (Task 16).
  },
});
```

Append to `.gitignore`:

```
.astro/
```

- [ ] **Step 4: Create the layout and the index page**

`src/layouts/BaseLayout.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  /** Route-relative path, e.g. '/' or '/ecosystem/'. Passed explicitly rather than
      read from Astro.url so the canonical URL is identical in production and in a
      PR preview, which serves the same page from a deeper path prefix. */
  canonicalPath: string;
}
const { title, description, canonicalPath } = Astro.props;
const canonical = new URL(canonicalPath.replace(/^\//, ''), Astro.site).href;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <slot name="head" />
  </head>
  <body>
    <header><slot name="header" /></header>
    <main><slot /></main>
    <footer>
      <slot name="footer">
        <p class="caption">HSSM ecosystem — footer placeholder. Links to follow.</p>
      </slot>
    </footer>
  </body>
</html>
```

`src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout
  title="HSSM Ecosystem"
  description="Open Python tools for fitting neurocognitive process models to behaviour, neural, and eye-tracking data."
  canonicalPath="/"
>
  <h1>HSSM Ecosystem</h1>
</BaseLayout>
```

- [ ] **Step 5: Install, build, and run the test**

Run:

```bash
npm install && npm run build && npm test
```

Expected: `astro check` reports 0 errors, `astro build` writes `dist/index.html`, and both tests PASS.

- [ ] **Step 6: Commit**

```bash
git add .nvmrc package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts .gitignore src tests
git commit -m "feat: scaffold Astro site with pinned toolchain and build smoke test"
```

---

## Task 2: Design tokens, and the two guards that make the colour law enforceable

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/base.css`
- Create: `tests/helpers/contrast.ts`, `tests/helpers/css.ts`
- Create: `tests/tokens.test.ts`, `tests/colour-law.test.ts`
- Modify: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Produces: `src/styles/tokens.css` as **the single source of every colour, type size and spacing value in the project**. No other file may contain a colour literal or a bare px length (except `0`, `1px`, `1.5px`).
- Produces: `tests/helpers/contrast.ts` exporting `contrastRatio(hexA, hexB): number`.
- Produces: `tests/helpers/css.ts` exporting `readTokens(): { light: Record<string,string>; dark: Record<string,string> }` and `sourceStyleFiles(): {path: string; text: string}[]`.
- Consumes: nothing from Task 1 except `BaseLayout.astro`, which gains the stylesheet imports.

**Why this task exists as its own gate.** Design philosophy §2 argues the colour law survives non-designers because "a constraint makes the decision in advance". A constraint that lives only in a document does not make any decision — it gets violated by the third contributor. Encoding it as a test is the difference between a philosophy and a rule.

- [ ] **Step 1: Write the failing tests**

Create `tests/helpers/contrast.ts`:

```ts
function channel(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * channel((n >> 16) & 255)
       + 0.7152 * channel((n >> 8) & 255)
       + 0.0722 * channel(n & 255);
}

/** WCAG 2.x relative contrast ratio, 1..21. */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
```

Create `tests/helpers/css.ts`:

```ts
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const TOKENS = 'src/styles/tokens.css';

function block(css: string, selector: string): string {
  const i = css.indexOf(selector);
  if (i === -1) throw new Error(`selector not found in tokens.css: ${selector}`);
  const open = css.indexOf('{', i);
  const close = css.indexOf('}', open);
  return css.slice(open + 1, close);
}

function pairs(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of text.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

export function readTokens() {
  const css = readFileSync(join(process.cwd(), TOKENS), 'utf-8');
  return {
    light: pairs(block(css, ':root {')),
    dark: pairs(block(css, ':root[data-theme="dark"] {')),
  };
}

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (['.css', '.astro', '.svg'].includes(extname(p))) acc.push(p);
  }
  return acc;
}

/** Every style-bearing source file except the two allowlisted by the colour law. */
export function sourceStyleFiles() {
  const ALLOW = [TOKENS];
  return walk(join(process.cwd(), 'src'))
    .map((p) => p.replace(process.cwd() + '/', ''))
    .filter((p) => !ALLOW.includes(p))
    .map((path) => ({ path, text: readFileSync(join(process.cwd(), path), 'utf-8') }));
}
```

Create `tests/tokens.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { contrastRatio } from './helpers/contrast';
import { readTokens } from './helpers/css';

const { light, dark } = readTokens();

// design philosophy §11: "Every ink-on-ground and ink-on-plate pair must clear WCAG AA."
// AA = 4.5:1 for text under 18.66px. Caption is 12px and Label is 11px, so --ink-faint
// is small text and does NOT get the 3:1 large-text allowance.
describe('WCAG AA contrast audit (design philosophy §14 open item, closed here)', () => {
  const grounds = ['--ground', '--surface', '--surface-sunken'] as const;

  for (const [mode, t] of [['light', light], ['dark', dark]] as const) {
    for (const inkName of ['--ink', '--ink-muted', '--ink-faint'] as const) {
      for (const g of grounds) {
        it(`${mode}: ${inkName} on ${g} clears 4.5:1`, () => {
          expect(contrastRatio(t[inkName], t[g])).toBeGreaterThanOrEqual(4.5);
        });
      }
    }
    it(`${mode}: --border-strong clears 3:1 on --surface (SC 1.4.11, it is the button boundary)`, () => {
      expect(contrastRatio(t['--border-strong'], t['--surface'])).toBeGreaterThanOrEqual(3);
    });
  }

  it('light ink reads on the plate in BOTH modes — the board is paper either way (§9.1)', () => {
    expect(contrastRatio(light['--ink'], light['--plate'])).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(light['--ink'], dark['--plate'])).toBeGreaterThanOrEqual(4.5);
  });
});

describe('the data scale is complete and identical in both modes (§4.4)', () => {
  it('has exactly 8 stops in light', () => {
    const stops = Object.keys(light).filter((k) => /^--data-0\d$/.test(k));
    expect(stops).toHaveLength(8);
  });

  it('is NOT redefined in dark — one version only, because figures stay on paper', () => {
    const redefined = Object.keys(dark).filter((k) => /^--data-0\d$/.test(k));
    expect(redefined).toEqual([]);
  });
});
```

Create `tests/colour-law.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { sourceStyleFiles } from './helpers/css';

// design philosophy §2: "Chrome is monochrome. Colour appears only inside figures."
// §4.1 allows exactly two exceptions: the logo, and micro-figure icons that depict a
// quantity. The logo is allowlisted in the helper; micro-figures must reference
// var(--data-0N) rather than inventing a literal, so they need no exception here.
const COLOUR = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(|\bcolor-mix\(/g;

describe('the colour law is mechanically enforced', () => {
  for (const { path, text } of sourceStyleFiles()) {
    it(`${path} contains no colour literal — colours come from tokens.css only`, () => {
      const found = [...text.matchAll(COLOUR)].map((m) => m[0]);
      expect(found).toEqual([]);
    });
  }
});

describe('forbidden chrome treatments (§4.6, §12)', () => {
  for (const { path, text } of sourceStyleFiles()) {
    it(`${path} declares no gradient in chrome`, () => {
      expect(text).not.toMatch(/linear-gradient|radial-gradient|conic-gradient/);
    });

    it(`${path} has no hover-lift, scale or translate transform`, () => {
      // §12 forbids hover-lift/scale/translate outright; pass 1 ships no motion at all.
      expect(text).not.toMatch(/:hover[^{]*\{[^}]*transform\s*:/s);
    });
  }
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run tests/tokens.test.ts tests/colour-law.test.ts`
Expected: FAIL — `selector not found in tokens.css` / `ENOENT: src/styles/tokens.css`.

- [ ] **Step 3: Write the token file**

Create `src/styles/tokens.css`. Values are design philosophy §4.2, §4.3, §4.4, §5.3 and §6.1/§6.4 verbatim, **except** the three contrast corrections recorded in this plan's decisions section:

```css
/*
  THE single source of colour, type and space for this site.
  Nothing else in src/ may contain a colour literal or a bare px length
  (0, 1px and 1.5px excepted). tests/colour-law.test.ts and tests/spacing.test.ts
  enforce that. See docs/ecosystem-landing-page-design-philosophy.md §2.
*/
:root {
  /* --- chrome, light (§4.2) --- */
  --ground: #FCFBF8;
  --surface: #F5F3EE;
  --surface-sunken: #EFEDE6;
  --border: #E5E1D8;
  /* §4.2 published #C9C4B8 → 1.68:1 on ground. Corrected for SC 1.4.11 (3:1). */
  --border-strong: #908C84;
  --ink: #14130F;
  --ink-muted: #4B4740;
  /* §4.2 published #8A857B → 3.55:1 on ground. Corrected for AA small text (4.5:1). */
  --ink-faint: #706B63;
  --plate: #FCFBF8;

  /* --- the data scale, "Accumulation" (§4.4). One version only: figures sit on
         paper in both modes, so there is no dark variant to drift. --- */
  --data-01: #4C1D95;
  --data-02: #3730A3;
  --data-03: #2947C4;
  --data-04: #1D4ED8;
  --data-05: #0369A1;
  --data-06: #0891B2;
  --data-07: #0D9488;
  --data-08: #10B981;

  /* --- type scale (§5.3): size / line-height / tracking --- */
  --text-display-xl: 54px;   --lh-display-xl: 1.05;  --tr-display-xl: -0.025em;
  --text-display-l: 34px;    --lh-display-l: 1.10;   --tr-display-l: -0.022em;
  --text-display-m: 25px;    --lh-display-m: 1.12;   --tr-display-m: -0.020em;
  --text-display-s: 19px;    --lh-display-s: 1.20;   --tr-display-s: -0.015em;
  --text-body-l: 17px;       --lh-body-l: 1.60;
  --text-body: 15px;         --lh-body: 1.65;
  --text-body-s: 13.5px;     --lh-body-s: 1.60;
  --text-label: 11px;        --lh-label: 1.00;       --tr-label: 0.18em;
  --text-caption: 12px;      --lh-caption: 1.55;

  /* --- space (§6.4): 4px base, no arbitrary values --- */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 24px;  --space-6: 32px;  --space-7: 48px;  --space-8: 64px;
  --space-9: 96px;

  /* --- layout (§6.1) --- */
  --container: 1200px;
  --measure: 64ch;
  --measure-max: 68ch;
  --margin-page: 54px;
}

@media (max-width: 767px) {
  :root {
    /* §5.3: "Below 768px, Display XL drops to 34 and Display L to 26; body sizes hold." */
    --text-display-xl: 34px;
    --text-display-l: 26px;
    --margin-page: 24px;
  }
}

/* Dark mode is a second set of values for tokens that exist anyway — never a second
   stylesheet and never a second design (§9.3). Only chrome changes; the plate stays
   paper and the data scale is untouched. */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --ground: #131211;
    --surface: #1C1B18;
    --surface-sunken: #232019;
    --border: #2C2A26;
    --border-strong: #686661;   /* §4.3 published #413E38 → 1.76:1. Corrected to 3:1. */
    --ink: #F3F1EC;
    --ink-muted: #A8A298;
    --ink-faint: #8F8A80;
    --plate: #F2F0EB;           /* dimmed board — §9.2 glare control */
  }
}

:root[data-theme="dark"] {
  --ground: #131211;
  --surface: #1C1B18;
  --surface-sunken: #232019;
  --border: #2C2A26;
  --border-strong: #686661;
  --ink: #F3F1EC;
  --ink-muted: #A8A298;
  --ink-faint: #8F8A80;
  --plate: #F2F0EB;
}
```

> The dark values are written twice on purpose — once under the media query for the
> system default, once under `[data-theme="dark"]` so an explicit toggle wins in both
> directions. `readTokens()` parses the `[data-theme="dark"]` block, which is why that
> block must stay complete rather than relying on the media query.

- [ ] **Step 4: Write the base stylesheet**

Create `src/styles/base.css`:

```css
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--ground);
  color: var(--ink-muted);
  font-size: var(--text-body);
  line-height: var(--lh-body);
}
h1, h2, h3, p, figure, ul, ol { margin: 0; }
img, svg { max-width: 100%; }

/* §6.2: flush left, always. Centring is permitted only inside a plate. */
body, main, section, h1, h2, h3, p { text-align: left; }

.container {
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: var(--margin-page);
}
.measure { max-width: var(--measure); }

/* §11: focus rings are ink, never colour, and never removed. */
:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
}

.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Pass 1 ships no motion. This is belt-and-braces for anything a browser
   animates by default (§10.4, R10). */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Wire the stylesheets into the layout**

In `src/layouts/BaseLayout.astro`, add these two imports to the frontmatter, above `interface Props`:

```astro
---
import '../styles/tokens.css';
import '../styles/base.css';

interface Props {
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npx vitest run tests/tokens.test.ts tests/colour-law.test.ts`
Expected: PASS — 26 contrast assertions, 2 data-scale assertions, and one colour-literal assertion per source file.

- [ ] **Step 7: Commit**

```bash
git add src/styles tests/helpers/contrast.ts tests/helpers/css.ts tests/tokens.test.ts tests/colour-law.test.ts src/layouts/BaseLayout.astro
git commit -m "feat: design tokens with enforced colour law and WCAG AA contrast gate

Corrects three published token values that fail WCAG AA:
--ink-faint light #8A857B -> #706B63 (3.55:1 -> 5.11:1)
--border-strong light #C9C4B8 -> #908C84 (1.68:1 -> 3.24:1)
--border-strong dark #413E38 -> #686661 (1.76:1 -> 3.26:1)

Closes the contrast audit left open at design philosophy 14."
```

---

## Task 3: Typography — three self-hosted families and the type scale

**Files:**
- Create: `src/assets/fonts/SpaceGrotesk[wght].woff2`, `IBMPlexSans[wght].woff2`, `JetBrainsMono[wght].woff2`
- Create: `tests/typography.test.ts`
- Modify: `astro.config.mjs`, `src/styles/base.css`, `src/layouts/BaseLayout.astro`

**Interfaces:**
- Produces: CSS variables `--font-display`, `--font-text`, `--font-mono`, supplied by `astro:fonts` and usable in any stylesheet.
- Produces: utility classes `.display-xl`, `.display-l`, `.display-m`, `.display-s`, `.body-l`, `.body`, `.body-s`, `.label`, `.caption` — the nine steps of design philosophy §5.3. Later tasks apply these classes and never restate a font-size.
- Consumes: `--text-*` / `--lh-*` / `--tr-*` tokens from Task 2.

**Why the Astro Fonts API rather than hand-written `@font-face`.** D10 requires self-hosted, subset fonts and R17 requires they not block first paint. `fontProviders.local()` takes committed `.woff2` files (so the build stays network-free and reproducible, R18), emits hashed self-hosted assets, generates `unicode-range` subsets, and computes fallback metrics that prevent layout shift. Hand-writing that is strictly more work for a worse result.

- [ ] **Step 1: Write the failing test**

Create `tests/typography.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { readDistText } from './helpers/dom';

const html = () => readDistText('index.html');

describe('fonts are self-hosted, never from a CDN (§5.1, D10)', () => {
  it('the built page requests no third-party font host', () => {
    expect(html()).not.toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit|fontshare|cdn\.jsdelivr/);
  });

  it('the built page preloads woff2 from our own origin', () => {
    const preloads = [...html().matchAll(/<link[^>]+rel="preload"[^>]*>/g)].map((m) => m[0]);
    const fontPreloads = preloads.filter((l) => l.includes('as="font"'));
    expect(fontPreloads.length).toBeGreaterThan(0);
    for (const link of fontPreloads) {
      expect(link).toMatch(/href="\/[^"]*\.woff2"/);
    }
  });

  it('all three families are committed as variable woff2', () => {
    const dir = join(process.cwd(), 'src/assets/fonts');
    const files = readdirSync(dir);
    for (const family of ['SpaceGrotesk', 'IBMPlexSans', 'JetBrainsMono']) {
      expect(files.some((f) => f.startsWith(family) && f.endsWith('.woff2'))).toBe(true);
    }
  });
});

describe('the type scale exists as classes, not as scattered font-sizes (§5.3)', () => {
  const css = readFileSync(join(process.cwd(), 'src/styles/base.css'), 'utf-8');
  const steps = ['display-xl', 'display-l', 'display-m', 'display-s',
                 'body-l', 'body', 'body-s', 'label', 'caption'];

  for (const step of steps) {
    it(`.${step} is defined`, () => {
      expect(css).toMatch(new RegExp(`\\.${step}\\s*\\{`));
    });
  }

  it('uses at most two display weights (§5.4)', () => {
    const weights = new Set(
      [...css.matchAll(/\.display-[a-z]+\s*\{[^}]*font-weight:\s*(\d+)/gs)].map((m) => m[1]),
    );
    expect(weights.size).toBeLessThanOrEqual(2);
  });

  it('applies negative tracking to display only, never to body (§5.4)', () => {
    const bodyBlocks = [...css.matchAll(/\.body[a-z-]*\s*\{([^}]*)\}/gs)].map((m) => m[1]);
    for (const b of bodyBlocks) expect(b).not.toMatch(/letter-spacing:\s*-/);
  });

  it('letter-spaces the uppercase label only, never lowercase text (§5.4)', () => {
    const spaced = [...css.matchAll(/\.([a-z-]+)\s*\{[^}]*letter-spacing:\s*0\.\d+em/gs)].map((m) => m[1]);
    expect(spaced).toEqual(['label']);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run build && npx vitest run tests/typography.test.ts`
Expected: FAIL — `ENOENT: src/assets/fonts` and no `.display-xl` in `base.css`.

- [ ] **Step 3: Fetch and commit the three variable fonts**

All three are SIL Open Font Licence. Download the variable `.woff2` from Fontsource's CDN once, commit the files, and never fetch at build time:

```bash
mkdir -p src/assets/fonts
curl -fsSL -o src/assets/fonts/SpaceGrotesk.woff2 \
  https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk:vf@latest/latin-wght-normal.woff2
curl -fsSL -o src/assets/fonts/IBMPlexSans.woff2 \
  https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans:vf@latest/latin-wght-normal.woff2
curl -fsSL -o src/assets/fonts/JetBrainsMono.woff2 \
  https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono:vf@latest/latin-wght-normal.woff2
ls -la src/assets/fonts/
```

Expected: three files, each roughly 20–60 KB.

> **Also commit the OFL licence texts** alongside them as `src/assets/fonts/OFL-*.txt`, fetched from each family's repository. Redistribution requires the licence to travel with the font.

- [ ] **Step 4: Declare the families in `astro.config.mjs`**

Add the import and the `fonts` block:

```js
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = process.env.SITE_URL ?? 'https://krishnbera.github.io';
const BASE = process.env.BASE_PATH ?? '/HSSMEco_Webpage/';

const local = fontProviders.local();

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  fonts: [
    {
      provider: local,
      name: 'Space Grotesk',
      cssVariable: '--font-display',
      variants: [{ src: ['./src/assets/fonts/SpaceGrotesk.woff2'], weight: '300 700', style: 'normal' }],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      subsets: ['latin'],
    },
    {
      provider: local,
      name: 'IBM Plex Sans',
      cssVariable: '--font-text',
      variants: [{ src: ['./src/assets/fonts/IBMPlexSans.woff2'], weight: '100 700', style: 'normal' }],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      subsets: ['latin'],
    },
    {
      provider: local,
      // Shared with matplotlib (§5.2, D10): generated figures set svg.fonttype:'none'
      // and reference this family by name, so the browser must have it.
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      variants: [{ src: ['./src/assets/fonts/JetBrainsMono.woff2'], weight: '100 800', style: 'normal' }],
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      subsets: ['latin'],
    },
  ],
});
```

- [ ] **Step 5: Emit the font links from the layout**

In `src/layouts/BaseLayout.astro`, add to the frontmatter:

```astro
import { Font } from 'astro:fonts';
```

and inside `<head>`, immediately before `<slot name="head" />`:

```astro
    <Font cssVariable="--font-display" preload />
    <Font cssVariable="--font-text" preload />
    <Font cssVariable="--font-mono" preload />
```

- [ ] **Step 6: Add the nine type-scale classes**

Append to `src/styles/base.css`:

```css
/* --- the type scale (§5.3). Apply these classes; never restate a font-size. --- */
body { font-family: var(--font-text); }

.display-xl, .display-l, .display-m, .display-s {
  font-family: var(--font-display);
  color: var(--ink);
}
.display-xl { font-size: var(--text-display-xl); line-height: var(--lh-display-xl); letter-spacing: var(--tr-display-xl); font-weight: 700; }
.display-l  { font-size: var(--text-display-l);  line-height: var(--lh-display-l);  letter-spacing: var(--tr-display-l);  font-weight: 700; }
.display-m  { font-size: var(--text-display-m);  line-height: var(--lh-display-m);  letter-spacing: var(--tr-display-m);  font-weight: 700; }
.display-s  { font-size: var(--text-display-s);  line-height: var(--lh-display-s);  letter-spacing: var(--tr-display-s);  font-weight: 600; }

.body-l { font-family: var(--font-text); font-size: var(--text-body-l); line-height: var(--lh-body-l); font-weight: 400; }
.body   { font-family: var(--font-text); font-size: var(--text-body);   line-height: var(--lh-body);   font-weight: 400; }
.body-s { font-family: var(--font-text); font-size: var(--text-body-s); line-height: var(--lh-body-s); font-weight: 400; }

/* Mono carries metadata about the content — it labels, it does not narrate (§5.1). */
.label {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  line-height: var(--lh-label);
  letter-spacing: var(--tr-label);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--ink-faint);
}
.caption {
  font-family: var(--font-mono);
  font-size: var(--text-caption);
  line-height: var(--lh-caption);
  font-weight: 400;
  color: var(--ink-faint);
}
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm run build && npx vitest run tests/typography.test.ts tests/colour-law.test.ts`
Expected: PASS. The colour-law test must still pass — `base.css` introduced no literal, only `var()` references.

- [ ] **Step 8: Commit**

```bash
git add src/assets/fonts astro.config.mjs src/styles/base.css src/layouts/BaseLayout.astro tests/typography.test.ts
git commit -m "feat: three self-hosted variable families and the nine-step type scale"
```

---

## Task 4: Theme — system preference, persisted toggle, no flash of wrong theme

**Files:**
- Create: `src/components/ThemeToggle.astro`, `tests/theme.test.ts`
- Modify: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Produces: `ThemeToggle.astro`, no props. Renders a `<button id="theme-toggle" aria-pressed="…">`.
- Produces: the pre-paint inline script contract — reads `localStorage.getItem('hssm-theme')`, and if it is `'dark'` or `'light'` sets `document.documentElement.dataset.theme` before first paint.
- Consumes: the `:root[data-theme="dark"]` block from Task 2.

**The one piece of JavaScript on the page.** D1 buys zero-JS-by-default and Task 4 spends a few hundred bytes of it. §9.3 requires the script be inline and in `<head>` — an external or deferred script paints the wrong theme first, which is the exact defect it exists to prevent.

- [ ] **Step 1: Write the failing test**

Create `tests/theme.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readDist, readDistText } from './helpers/dom';

describe('theme is applied before first paint (§9.3)', () => {
  it('an inline script in <head> runs before any stylesheet link', () => {
    const head = readDistText('index.html').split('</head>')[0];
    const scriptAt = head.search(/<script[^>]*>(?![^<]*src=)/);
    const styleAt = head.search(/<link[^>]+rel="stylesheet"/);
    expect(scriptAt).toBeGreaterThan(-1);
    if (styleAt > -1) expect(scriptAt).toBeLessThan(styleAt);
  });

  it('the inline script reads the persisted key and sets data-theme', () => {
    const head = readDistText('index.html').split('</head>')[0];
    expect(head).toMatch(/hssm-theme/);
    expect(head).toMatch(/data-theme|dataset\.theme/);
  });

  it('the theme script is inline, not an external request', () => {
    const head = readDistText('index.html').split('</head>')[0];
    const inline = [...head.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)];
    expect(inline.some((m) => m[1].includes('hssm-theme'))).toBe(true);
  });
});

describe('the toggle is an accessible control (R14)', () => {
  it('has an accessible name and a pressed state', () => {
    const btn = readDist('index.html').querySelector('#theme-toggle');
    expect(btn).not.toBeNull();
    expect(btn!.getAttribute('aria-pressed')).toMatch(/^(true|false)$/);
    const name = btn!.getAttribute('aria-label') ?? btn!.textContent?.trim() ?? '';
    expect(name.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run build && npx vitest run tests/theme.test.ts`
Expected: FAIL — no inline script matching `hssm-theme`, and `#theme-toggle` is null.

- [ ] **Step 3: Add the pre-paint script to the layout**

In `src/layouts/BaseLayout.astro`, immediately after `<meta name="viewport" …>` inside `<head>`, add — `is:inline` is required, or Astro would hoist it into a bundled module and lose the pre-paint guarantee:

```astro
    <script is:inline>
      // Applies the stored preference before first paint (§9.3). Without an explicit
      // choice we fall through to the prefers-color-scheme media query in tokens.css.
      try {
        var t = localStorage.getItem('hssm-theme');
        if (t === 'dark' || t === 'light') document.documentElement.dataset.theme = t;
      } catch (e) { /* private mode: fall through to the system preference */ }
    </script>
```

- [ ] **Step 4: Write the toggle component**

Create `src/components/ThemeToggle.astro`:

```astro
---
// No props. State lives on <html data-theme> and in localStorage.
---
<button id="theme-toggle" type="button" class="label" aria-pressed="false" aria-label="Use dark theme">
  <span data-theme-label>Dark</span>
</button>

<script>
  const btn = document.getElementById('theme-toggle')!;
  const root = document.documentElement;

  const isDark = () =>
    root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;

  function sync() {
    const dark = isDark();
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? 'Use light theme' : 'Use dark theme');
    btn.querySelector('[data-theme-label]')!.textContent = dark ? 'Light' : 'Dark';
  }

  btn.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('hssm-theme', next); } catch { /* ignore */ }
    sync();
  });

  sync();
</script>

<style>
  /* §4.6: state is never conveyed by hue. Weight and background only. */
  #theme-toggle {
    background: transparent;
    border: 1px solid var(--border-strong);
    color: var(--ink-muted);
    padding: var(--space-2) var(--space-3);
    cursor: pointer;
  }
  #theme-toggle:hover { background: var(--surface); color: var(--ink); }
  #theme-toggle[aria-pressed='true'] { font-weight: 500; }
</style>
```

- [ ] **Step 5: Render the toggle in the header**

In `src/pages/index.astro`, add a header slot:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ThemeToggle from '../components/ThemeToggle.astro';
---
<BaseLayout
  title="HSSM Ecosystem"
  description="Open Python tools for fitting neurocognitive process models to behaviour, neural, and eye-tracking data."
  canonicalPath="/"
>
  <div slot="header" class="container"><ThemeToggle /></div>
  <h1 class="display-xl">HSSM Ecosystem</h1>
</BaseLayout>
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm run build && npx vitest run`
Expected: PASS, all suites. The colour-law test must still pass — the toggle's styles use only `var()`.

- [ ] **Step 7: Verify by eye, in both themes**

Run: `npm run dev` and open the page. Toggle, then reload: the theme must persist with **no flash** of the wrong theme. Then set the OS to dark with no stored preference and reload: the page must open dark.

- [ ] **Step 8: Commit**

```bash
git add src/components/ThemeToggle.astro src/layouts/BaseLayout.astro src/pages/index.astro tests/theme.test.ts
git commit -m "feat: light/dark theming with persisted toggle and no flash of wrong theme"
```

---

## Task 5: Layout primitives — section rhythm, the spacing guard, and the plate

**Files:**
- Create: `src/components/SectionRule.astro`, `src/components/Plate.astro`, `src/styles/plate.css`
- Create: `tests/spacing.test.ts`, `tests/plate.test.ts`
- Modify: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Produces: `SectionRule.astro` with props `{ number: string; title: string }`. Renders the 1.5px `--ink` heavy rule plus a `§ NN — Title` mono eyebrow. Every one of the six sections opens with it.
- Produces: `Plate.astro` with props `{ figure: number; title: string; desc: string; caption: string; fullBleed?: boolean }` and a default slot for the artwork. Renders the complete §7.3 accessibility contract so no later task has to restate it.
- Produces: `tests/helpers` unchanged; `spacing.test.ts` enforces §6.4 across all source.

**The plate is the only element allowed to break the measure, carry colour, and take a number (§7.1).** Building it once, with the accessibility contract baked in, is what stops four separate figures from each inventing their own `aria` wiring.

- [ ] **Step 1: Write the failing tests**

Create `tests/spacing.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { sourceStyleFiles } from './helpers/css';

// §6.4: "4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96. No arbitrary values."
// 0, 1px and 1.5px are the hairline and heavy-rule widths from §6.3 and are exempt.
const ALLOWED_BARE_PX = new Set(['0', '1', '1.5', '2']); // 2px = icon stroke (§8.2)

describe('the spacing scale is mechanically enforced (§6.4)', () => {
  for (const { path, text } of sourceStyleFiles()) {
    it(`${path} uses no arbitrary px length`, () => {
      const offenders = [...text.matchAll(/(?<![\w-])(\d+(?:\.\d+)?)px/g)]
        .map((m) => m[1])
        .filter((v) => !ALLOWED_BARE_PX.has(v));
      expect(offenders).toEqual([]);
    });
  }
});
```

Create `tests/plate.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { renderComponent } from './helpers/dom';
import Plate from '../src/components/Plate.astro';

const props = {
  figure: 2,
  title: 'Posterior distributions for drift rate and boundary separation',
  desc: 'Two density curves per parameter, one per conflict condition. The boundary '
      + 'separation densities are clearly separated; the drift rate densities overlap.',
  caption: 'Colour encodes posterior mass; the two conditions are distinguished by position, not hue alone.',
};

describe('Plate carries the §7.3 accessibility contract', () => {
  it('exposes the figure as an image with a title and desc', async () => {
    const doc = await renderComponent(Plate, { props, slots: { default: '<svg viewBox="0 0 10 10"></svg>' } });
    const fig = doc.querySelector('[role="img"]')!;
    expect(fig).not.toBeNull();

    const ids = fig.getAttribute('aria-labelledby')!.split(/\s+/);
    expect(ids).toHaveLength(2);
    for (const id of ids) expect(doc.getElementById(id)).not.toBeNull();

    expect(doc.getElementById(ids[0])!.textContent).toBe(props.title);
    expect(doc.getElementById(ids[1])!.textContent).toBe(props.desc);
  });

  it('numbers the caption in mono and states how to read the figure (§7.2)', async () => {
    const doc = await renderComponent(Plate, { props, slots: { default: '<svg/>' } });
    const cap = doc.querySelector('figcaption')!;
    expect(cap.className).toContain('caption');
    expect(cap.textContent).toContain('Figure 2.');
    expect(cap.textContent).toContain(props.caption);
  });

  it('gives distinct ids to distinct plates, so two on one page do not collide', async () => {
    const a = await renderComponent(Plate, { props, slots: { default: '<svg/>' } });
    const b = await renderComponent(Plate, { props: { ...props, figure: 3 }, slots: { default: '<svg/>' } });
    expect(a.querySelector('[role="img"]')!.getAttribute('aria-labelledby'))
      .not.toBe(b.querySelector('[role="img"]')!.getAttribute('aria-labelledby'));
  });
});

describe('SectionRule opens a section (§6.3)', () => {
  it('renders the mono section number and the title', async () => {
    const SectionRule = (await import('../src/components/SectionRule.astro')).default;
    const doc = await renderComponent(SectionRule, { props: { number: '03', title: 'Worked example' } });
    const eyebrow = doc.querySelector('.label')!;
    expect(eyebrow.textContent).toContain('§ 03');
    expect(eyebrow.textContent).toContain('Worked example');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run tests/spacing.test.ts tests/plate.test.ts`
Expected: FAIL — `Cannot find module '../src/components/Plate.astro'`.

- [ ] **Step 3: Write the section rule**

Create `src/components/SectionRule.astro`:

```astro
---
interface Props { number: string; title: string }
const { number, title } = Astro.props;
---
<div class="section-rule">
  <p class="label">§ {number} — {title}</p>
</div>

<style>
  /* §6.3: heavy rule opens a section; the hairline (1px --border) subdivides within
     one. The distinction is what makes six sections read as six. */
  .section-rule {
    border-top: 1.5px solid var(--ink);
    padding-top: var(--space-3);
    margin-bottom: var(--space-6);
  }
</style>
```

- [ ] **Step 4: Write the plate**

Create `src/components/Plate.astro`:

```astro
---
import '../styles/plate.css';

interface Props {
  figure: number;
  title: string;       // what the figure shows — becomes <title>
  desc: string;        // how to read it — becomes <desc>, the long text alternative
  caption: string;     // the visible caption; states the encoding, not the subject (§7.2)
  fullBleed?: boolean; // §9.2: ignored in dark mode, where plates never run full-bleed
}
const { figure, title, desc, caption, fullBleed = false } = Astro.props;
const titleId = `plate-${figure}-title`;
const descId = `plate-${figure}-desc`;
---
<figure class:list={['plate', { 'plate--full': fullBleed }]}>
  <div class="plate__board" role="img" aria-labelledby={`${titleId} ${descId}`}>
    <p id={titleId} class="visually-hidden">{title}</p>
    <p id={descId} class="visually-hidden">{desc}</p>
    <slot />
  </div>
  <figcaption class="caption">
    <span class="plate__num">Figure {figure}.</span> {caption}
  </figcaption>
</figure>
```

Create `src/styles/plate.css`:

```css
/* §7.1 — a plate is a figure plus its frame and caption, treated as a distinct
   object. Plates are the only elements permitted to break the measure, carry
   colour, and take a number. */
.plate {
  margin: var(--space-7) 0;
  max-width: var(--container);
}

.plate__board {
  background: var(--plate);
  border-top: 1.5px solid var(--ink);
  border-bottom: 1px solid var(--border);
  padding: var(--space-5);
  /* §6.2: centring is permitted only inside a plate. */
  text-align: center;
}

.plate figcaption { margin-top: var(--space-3); }
.plate__num { color: var(--ink); font-weight: 500; }

/* §9.2 glare control, all three mitigations:
   the board dims via --plate; plates never run full-bleed in dark mode; and they
   keep a radius so they read as objects rather than as a flashlight. */
:root[data-theme='dark'] .plate__board,
:root[data-theme='dark'] .plate--full .plate__board {
  border-radius: 6px;
  margin-inline: 0;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) .plate__board,
  :root:not([data-theme='light']) .plate--full .plate__board {
    border-radius: 6px;
    margin-inline: 0;
  }
}

/* Icons and text sitting on a board follow LIGHT ink in both modes, because the
   board is paper (§4.5, "On plate"). */
.plate__board { color: #14130F; }
```

> **The one deliberate colour literal outside `tokens.css`.** `.plate__board { color: #14130F }` is `--ink`'s *light* value, needed in **both** themes because the board is paper either way. It cannot use `var(--ink)`, which inverts. Add `src/styles/plate.css` to the `ALLOW` list in `tests/helpers/css.ts`, with this comment beside it:
>
> ```ts
> const ALLOW = [
>   TOKENS,
>   'src/styles/plate.css',         // §4.5 "on plate": light ink in BOTH modes,
>                                   // so it cannot be var(--ink), which inverts
> ];
> ```

- [ ] **Step 5: Add the 6px radius token**

`6px` is not on the spacing scale but §7.1 mandates it as the plate corner radius. Add to `:root` in `src/styles/tokens.css`:

```css
  --radius-plate: 6px;             /* §7.1 — the only radius in the system */
```

and replace both `border-radius: 6px;` occurrences in `plate.css` with `border-radius: var(--radius-plate);`. This keeps `tests/spacing.test.ts` green without weakening it.

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npx vitest run tests/spacing.test.ts tests/plate.test.ts tests/colour-law.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/SectionRule.astro src/components/Plate.astro src/styles tests/spacing.test.ts tests/plate.test.ts tests/helpers/css.ts
git commit -m "feat: section rhythm, plate discipline, and the spacing-scale guard"
```

---

## Task 6: Content collections, schemas, and the copy

**Files:**
- Create: `src/schemas.ts`, `src/content.config.ts`
- Create: `src/content/copy/site.yaml`, `src/content/copy/hero.yaml`
- Create: `src/content/model-families/{diffusion,race-accumulator,attention,rlssm}.yaml`
- Create: `src/content/capabilities/*.yaml` (8 files)
- Create: `tests/schemas.test.ts`, `tests/copy-budget.test.ts`
- Modify: `astro.config.mjs` (nothing) — no change needed

**Interfaces:**
- Produces: `src/schemas.ts` exporting `siteCopySchema`, `heroElementSchema`, `modelFamilySchema`, `capabilitySchema` as plain Zod objects with **no Astro import**, so tests can validate the real YAML directly.
- Produces: collections `siteCopy`, `heroCopy`, `modelFamilies`, `capabilities`. Pages call `getCollection` / `getEntry`; components take props.
- Produces: the anchor contract — every `modelFamilies` entry id is the anchor slug on `/ecosystem/`, and every hero model tile's `href` points at one of them. Task 15 must honour these exact ids: `diffusion`, `race-accumulator`, `attention`, `rlssm`.

**Copy status.** Everything below is **draft copy written to the spec's briefs and budgets**, not signed-off text. Content spec §11 assigns final wording to Copy. It lives in YAML precisely so sign-off is a data diff. The word budgets are tested, so a rewrite that breaks the budget fails CI rather than shipping.

- [ ] **Step 1: Write the failing tests**

Create `tests/schemas.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'js-yaml';
import { siteCopySchema, heroElementSchema, modelFamilySchema, capabilitySchema } from '../src/schemas';

const read = (p: string) => load(readFileSync(join(process.cwd(), p), 'utf-8'));
const dir = (p: string) =>
  readdirSync(join(process.cwd(), p)).filter((f) => f.endsWith('.yaml'))
    .map((f) => ({ file: f, data: read(join(p, f)) }));

describe('site copy validates', () => {
  it('parses against the schema', () => {
    expect(() => siteCopySchema.parse(read('src/content/copy/site.yaml'))).not.toThrow();
  });
  it('keeps the tagline at or under 8 words (content spec §7)', () => {
    const { tagline } = siteCopySchema.parse(read('src/content/copy/site.yaml'));
    expect(tagline.trim().split(/\s+/)).toHaveLength(4);
  });
});

describe('hero copy validates (§6.1a)', () => {
  const hero = read('src/content/copy/hero.yaml') as Record<string, unknown>;

  it('every element parses', () => {
    for (const [id, el] of Object.entries(hero)) {
      expect(() => heroElementSchema.parse(el), `element ${id}`).not.toThrow();
    }
  });

  it('every model tile links into a model family that exists', () => {
    const families = readdirSync(join(process.cwd(), 'src/content/model-families'))
      .map((f) => f.replace(/\.yaml$/, ''));
    for (const [id, el] of Object.entries(hero)) {
      const e = heroElementSchema.parse(el);
      if (e.kind !== 'model') continue;
      const anchor = e.href!.split('#')[1];
      expect(families, `hero tile ${id} points at #${anchor}`).toContain(anchor);
    }
  });

  it('every payload is one line (§6.1a constraint 3)', () => {
    for (const [id, el] of Object.entries(hero)) {
      const { payload } = heroElementSchema.parse(el);
      expect(payload.includes('\n'), `element ${id}`).toBe(false);
      expect(payload.split(/\s+/).length, `element ${id}`).toBeLessThanOrEqual(12);
    }
  });
});

describe('model families and capabilities validate', () => {
  it('there are exactly four families (R25, D4)', () => {
    const families = dir('src/content/model-families');
    expect(families).toHaveLength(4);
    for (const { file, data } of families) {
      expect(() => modelFamilySchema.parse(data), file).not.toThrow();
    }
  });

  it('there are eight capabilities (content spec §6.5)', () => {
    const caps = dir('src/content/capabilities');
    expect(caps).toHaveLength(8);
    for (const { file, data } of caps) {
      expect(() => capabilitySchema.parse(data), file).not.toThrow();
    }
  });
});
```

Create `tests/copy-budget.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'js-yaml';

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

function countDeep(value: unknown, skipKeys: string[] = []): number {
  if (typeof value === 'string') return words(value);
  if (Array.isArray(value)) return value.reduce<number>((n, v) => n + countDeep(v, skipKeys), 0);
  if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .filter(([k]) => !skipKeys.includes(k))
      .reduce((n, [, v]) => n + countDeep(v, skipKeys), 0);
  }
  return 0;
}

const read = (p: string) => load(readFileSync(join(process.cwd(), p), 'utf-8'));

describe('the word budget is a hard constraint, not an aspiration (content spec §2)', () => {
  // hrefs, ids and package names are structure, not body copy.
  const SKIP = ['href', 'id', 'anchor', 'package', 'icon', 'kind'];

  it('hero hover payloads stay within ~120 words (§6.1a)', () => {
    const hero = read('src/content/copy/hero.yaml') as Record<string, { payload: string }>;
    const total = Object.values(hero).reduce((n, e) => n + words(e.payload), 0);
    expect(total).toBeLessThanOrEqual(120);
  });

  it('total body copy stays within ~550 words (§2)', () => {
    const body =
      countDeep(read('src/content/copy/site.yaml'), SKIP) +
      readdirSync(join(process.cwd(), 'src/content/capabilities'))
        .reduce((n, f) => n + countDeep(read(`src/content/capabilities/${f}`), SKIP), 0);
    // Hero hover payloads are excluded by §6.1a; model-family copy lives on the
    // reference sub-page, which has no word budget (§1).
    expect(body).toBeLessThanOrEqual(580); // ~550 with the spec's own tolerance
    expect(body).toBeGreaterThan(400);     // guards against copy silently going missing
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm i -D js-yaml @types/js-yaml && npx vitest run tests/schemas.test.ts tests/copy-budget.test.ts`
Expected: FAIL — `Cannot find module '../src/schemas'`.

- [ ] **Step 3: Write the schemas**

Create `src/schemas.ts` — plain Zod, importable without Astro:

```ts
import { z } from 'astro/zod';

/** One addressable element in the hero (content spec §6.1a). */
export const heroElementSchema = z.object({
  kind: z.enum(['model', 'contribute', 'module', 'stream', 'return']),
  label: z.string().min(1),
  /** One line. Reachable by hover, focus AND tap — never hover-only (R23). */
  payload: z.string().min(1),
  /** Model tiles, the "+" tile and module tiles link out; streams and returns do not. */
  href: z.string().url().or(z.string().startsWith('/')).optional(),
  /** Exactly one model tile is the highlighted "model currently in use" (§6.1). */
  active: z.boolean().default(false),
});

export const modelFamilySchema = z.object({
  title: z.string().min(1),
  /** One line each (§13). */
  summary: z.string().min(1),
  links: z.array(z.object({
    label: z.string().min(1),
    href: z.string().url(),
    /** R26: the canonical targets do not exist upstream yet. State what this
        actually is, so a visitor is not surprised by where they land. */
    note: z.string().min(1),
  })).min(1),
  order: z.number().int(),
});

export const capabilitySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  /** Filename in src/components/icons/, without extension. */
  icon: z.string().regex(/^[a-z0-9-]+$/),
  order: z.number().int(),
});

export const siteCopySchema = z.object({
  tagline: z.string(),
  subline: z.string(),
  ctaPrimary: z.object({ label: z.string(), href: z.string().url(), hook: z.string() }),
  ctaSecondary: z.object({ label: z.string(), href: z.string(), hook: z.string() }),
  heroCaptions: z.object({ left: z.string(), right: z.string() }),
  payoff: z.object({
    heading: z.string(),
    columns: z.array(z.object({
      field: z.string(),   // the field-level claim
      me: z.string(),      // the me-level cash-out — §4's governing content rule
      links: z.array(z.object({ label: z.string(), href: z.string() })),
    })).length(2),
  }),
  workedExample: z.object({
    heading: z.string(),
    intro: z.string(),
    formulaChip: z.string(),
    panels: z.array(z.object({ title: z.string(), caption: z.string() })).length(4),
    recovery: z.object({ text: z.string(), href: z.string().url() }),
  }),
  chain: z.object({
    heading: z.string(),
    steps: z.array(z.object({ label: z.string(), package: z.string(), href: z.string().url() })).length(4),
    caption: z.string(),
    referenceLink: z.object({ label: z.string(), href: z.string() }),
  }),
  capabilities: z.object({ heading: z.string(), selectionNote: z.string() }),
  credibility: z.object({
    lineage: z.string(),
    institutions: z.string(),
    funding: z.string(),
    paper: z.object({ text: z.string(), href: z.string().url() }),
    builtOn: z.array(z.string()),
    community: z.string(),
  }),
});
```

- [ ] **Step 4: Wire the collections**

Create `src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { heroElementSchema, modelFamilySchema, capabilitySchema } from './schemas';

// One file, edited as a unit — the ~120-word budget is a whole-file property (§6.1a).
const heroCopy = defineCollection({
  loader: file('src/content/copy/hero.yaml'),
  schema: heroElementSchema,
});

// NOTE: site.yaml is deliberately NOT a collection. The file loader expects an array
// of entries or an object keyed by id, and site.yaml is a single nested document —
// wrapping it in a synthetic collection buys nothing. Pages import it directly:
//
//   import raw from '../content/copy/site.yaml?raw';
//   const copy = siteCopySchema.parse(load(raw));
//
// The schema is the contract either way, and tests/schemas.test.ts validates the file
// independently of how it is loaded.

// One file per entry — the scverse contribution model D4 adopts: schema-validated,
// submitted by PR, with a clean per-entry diff. The filename becomes the anchor id.
const modelFamilies = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/model-families' }),
  schema: modelFamilySchema,
});

const capabilities = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/capabilities' }),
  schema: capabilitySchema,
});

export const collections = { heroCopy, modelFamilies, capabilities };
```

- [ ] **Step 5: Write the hero copy** (~110 words of payload, under the 120 ceiling)

Create `src/content/copy/hero.yaml`:

```yaml
# 15 addressable hero elements (content spec §6.1a). Payloads are ONE LINE each and
# total ~110 words against a ~120 ceiling. They are supplementary: the hero must be
# complete without them (§6.1a constraint 2).
#
# DRAFT copy. Content spec §11 assigns final wording to Copy — edit here, not in the
# components. tests/copy-budget.test.ts fails the build if the ceiling is breached.

model-ddm:
  kind: model
  label: Drift diffusion
  payload: Evidence accumulates to one of two boundaries.
  href: /ecosystem/#diffusion

model-angle:
  kind: model
  label: Collapsing bound
  payload: Boundaries narrow over time as urgency builds.
  href: /ecosystem/#diffusion
  active: true

model-race:
  kind: model
  label: Race accumulator
  payload: Independent accumulators race; first past threshold wins.
  href: /ecosystem/#race-accumulator

model-attention:
  kind: model
  label: Attentional drift
  payload: Where you look gates what the model accumulates.
  href: /ecosystem/#attention

model-rlssm:
  kind: model
  label: Learning and deciding
  payload: Learning updates decision parameters trial by trial.
  href: /ecosystem/#rlssm

model-contribute:
  kind: contribute
  label: Your model
  payload: Bring a model. Train once, share forever.
  href: https://lnccbrown.github.io/ssm-simulators/

module-simulation:
  kind: module
  label: Simulation
  payload: ssm-simulators — the generative models themselves.
  href: https://lnccbrown.github.io/ssm-simulators/

module-sbi:
  kind: module
  label: SBI
  payload: LANfactory — trains likelihood networks on simulated data.
  href: https://lnccbrown.github.io/LANfactory/

module-sampling:
  kind: module
  label: Sampling
  payload: HSSM — hierarchical Bayesian inference on PyMC.
  href: https://lnccbrown.github.io/HSSM/

module-validation:
  kind: module
  label: Validation
  payload: Predictive checks, model comparison, parameter recovery.
  href: https://lnccbrown.github.io/HSSM/

module-plots:
  kind: module
  label: Plots
  payload: Posteriors, quantile-probability plots, model cartoons.
  href: https://lnccbrown.github.io/HSSM/

stream-behaviour:
  kind: stream
  label: Behaviour
  payload: Choices and response times — the primary observation.

stream-neural:
  kind: stream
  label: Neural
  payload: Trial-wise EEG or fMRI enters the generative model.

stream-gaze:
  kind: stream
  label: Eye-tracking
  payload: Fixations and dwell time drive evidence accumulation.

return-insight:
  kind: return
  label: Insight
  payload: Posteriors over mechanism, not over summary statistics.

return-adoption:
  kind: return
  label: Adoption
  payload: Your model reaches people who never train networks.
```

- [ ] **Step 6: Write the site copy** (~545 body words)

Create `src/content/copy/site.yaml`:

```yaml
# DRAFT copy against the content spec's briefs and budgets. Final wording is Copy's
# (content spec §11). Budgets are tested — see tests/copy-budget.test.ts.
#
# Tagline: content spec §7 recommendation. Subline: §7 draft 3.
tagline: Model what you mean.
subline: >-
  Open Python tools for fitting neurocognitive process models to behaviour,
  neural, and eye-tracking data.

ctaPrimary:
  label: Get started
  href: https://lnccbrown.github.io/HSSM/
  hook: get-started          # R20: stable instrumentation hook, one line to activate
ctaSecondary:
  label: See it work
  href: "#worked-example"
  hook: see-it-work

heroCaptions:
  left: bring data, gain insight
  right: bring a model, gain adoption

payoff:
  heading: What this changes for you
  columns:
    - field: Contributions are amortised across the community.
      me: >-
        Which is why a growing bank of models is ready to fit, and you never
        simulate or train a network yourself. Bring behaviour, neural signals,
        or gaze; read mechanism off the posterior.
      links:
        - { label: Quickstart, href: "https://lnccbrown.github.io/HSSM/" }
        - { label: Tutorials, href: "https://lnccbrown.github.io/HSSM/" }
    - field: Theorists publish models as shared artifacts.
      me: >-
        Which is why your model reaches researchers who would never train one
        themselves — it installs like a dependency, not a collaboration.
        Simulate, train, share, fit: four commands, not four codebases.
      links:
        - { label: Contribute a model, href: "https://lnccbrown.github.io/ssm-simulators/" }
        - { label: The four steps, href: "#chain" }

workedExample:
  heading: One dataset, four panels
  intro: >-
    Two conditions, near-identical mean response times. Summary statistics say
    nothing happened. The model says otherwise.
  formulaChip: "a ~ conf + (1|participant_id)"
  panels:
    - title: The problem
      caption: >-
        Response-time densities for high- and low-conflict trials. The means differ
        by milliseconds; the distributions differ in shape.
    - title: The model
      caption: >-
        Three lines fit a hierarchical drift-diffusion model. The formula puts the
        conflict effect on boundary separation, with a random intercept per participant.
    - title: The answer
      caption: >-
        Posteriors for the conflict coefficient. Boundary separation shifts;
        drift rate does not. Position, not hue, separates the two parameters.
    - title: The check
      caption: >-
        Posterior predictive densities over the observed data. The fitted model
        reproduces both conditions, including the tails the means hid.
  recovery:
    text: Parameter recovery is checked the same way, on simulated data.
    href: https://lnccbrown.github.io/HSSM/

chain:
  heading: The chain in four steps
  steps:
    - { label: Simulate and define the model, package: ssm-simulators, href: "https://lnccbrown.github.io/ssm-simulators/" }
    - { label: Train the likelihood network, package: LANfactory, href: "https://lnccbrown.github.io/LANfactory/" }
    - { label: Share the artifact, package: HuggingFace, href: "https://huggingface.co/franklab/HSSM" }
    - { label: Infer hierarchically, package: HSSM, href: "https://lnccbrown.github.io/HSSM/" }
  caption: >-
    Fitting models to your data? You only ever touch step four — the first three
    happened before you arrived. Contributing a model? The other three are one
    command each.
  referenceLink:
    label: How the pieces connect
    href: "/ecosystem/"

capabilities:
  heading: What's in the box
  # R25/§10 discipline: families, never numbers, and never a catalogue.
  selectionNote: A selection, not a catalogue. Each family links onward to the full list.

credibility:
  lineage: From the lab behind HDDM — used in over 1,000 published studies.
  institutions: >-
    Brown University · Carney Institute for Brain Science · Center for Computation
    and Visualization · BRAINSTORM
  funding: Funded by NIMH and ONR.
  paper:
    text: >-
      Fengler, Xu, Bera, Paniagua, Omar and Frank. HSSM: A Widely Applicable Toolbox
      for Hierarchical Bayesian Neurocognitive Modeling. bioRxiv, 2026.
    href: https://doi.org/10.64898/2026.06.05.730398
  builtOn: [PyMC, Bambi, ArviZ, JAX, ONNX, HuggingFace]
  community: >-
    Questions and modeling advice go to GitHub Discussions. Cite the preprint and the
    per-package Zenodo DOIs.
```

- [ ] **Step 7: Write the four model families**

Create `src/content/model-families/diffusion.yaml`:

```yaml
title: Diffusion variants
summary: >-
  Evidence accumulates toward one of two boundaries — the drift-diffusion model and
  its extensions, including collapsing bounds, urgency signals, and full parameter
  trial-to-trial variability.
order: 1
links:
  - label: Fittable models in HSSM
    href: https://lnccbrown.github.io/HSSM/
    # R26 — no upstream page enumerates the models yet. Say what this actually is.
    note: HSSM documentation. Call hssm.modelconfig.list_models() for the current list.
  - label: Simulator configurations
    href: https://lnccbrown.github.io/ssm-simulators/
    note: ssm-simulators documentation; the configuration tutorials cover what is available.
```

Create `race-accumulator.yaml`, `attention.yaml` and `rlssm.yaml` on exactly this shape, with `order` 2, 3, 4 and these summaries:

```yaml
# race-accumulator.yaml
title: Race and accumulator models
summary: >-
  Independent accumulators race to threshold — linear ballistic accumulators, leaky
  competing accumulators, and race models over two or more alternatives.
```

```yaml
# attention.yaml
title: Attention models
summary: >-
  Fixations gate the evidence: attentional drift-diffusion and related models in which
  where a participant looks changes what accumulates.
```

```yaml
# rlssm.yaml
title: Reinforcement-learning SSMs
summary: >-
  A learning process drives the decision parameters, so choice, response time, and
  trial-by-trial learning are fitted jointly rather than in two separate stages.
```

Each keeps the same two `links` entries with the same `note` discipline.

- [ ] **Step 8: Write the eight capabilities**

Create eight files in `src/content/capabilities/`, taking `title` and `description` **verbatim** from content spec §6.5 — that table is already final copy:

| file | title | icon | order |
|---|---|---|---|
| `model-families.yaml` | Model families | `families` | 1 |
| `hierarchical.yaml` | Hierarchical Bayesian inference | `hierarchy` | 2 |
| `sbi.yaml` | Simulation-based inference | `surrogate` | 3 |
| `mixed-effects.yaml` | Full mixed-effects models | `formula` | 4 |
| `covariates.yaml` | Trial-wise covariates | `trace` | 5 |
| `rlssm.yaml` | Learning and deciding jointly | `learning` | 6 |
| `workflow.yaml` | Complete inference workflow | `check` | 7 |
| `scale.yaml` | Scale and interoperability | `exchange` | 8 |

For example, `src/content/capabilities/covariates.yaml`:

```yaml
title: Trial-wise covariates
description: >-
  EEG, fMRI, pupil, skin conductance, and fixations enter the generative model itself,
  not a post-hoc correlation.
icon: trace
order: 5
```

- [ ] **Step 9: Run the tests to verify they pass**

Run: `npx vitest run tests/schemas.test.ts tests/copy-budget.test.ts && npm run build`
Expected: PASS, and `astro build` validates the same schemas a second time through the content layer.

If the body-word assertion fails high, trim `payoff.columns[*].me` first — the spec budgets §6.2 at ~90 words and it is the easiest section to overrun.

- [ ] **Step 10: Commit**

```bash
git add src/schemas.ts src/content.config.ts src/content tests/schemas.test.ts tests/copy-budget.test.ts package.json package-lock.json
git commit -m "feat: schema-validated content collections with draft copy and tested budgets"
```

---

## Task 7: Payoff band and Credibility — the two prose sections

**Files:**
- Create: `src/components/sections/PayoffBand.astro`, `src/components/sections/Credibility.astro`
- Create: `tests/sections.test.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `PayoffBand.astro` with props `{ copy: SiteCopy['payoff'] }`.
- Produces: `Credibility.astro` with props `{ copy: SiteCopy['credibility'] }`.
- Consumes: `siteCopySchema` from Task 6; `SectionRule.astro` from Task 5; the type-scale classes from Task 3.

**Why these two ship together.** Both are pure prose over Task 6 data, both are ~90 and ~60 words, and a reviewer would read them in one pass. Neither carries a figure, which is deliberate: §6.2 says "light iconography only — no substantial visual, to protect the budget for §6.3".

- [ ] **Step 1: Write the failing test**

Create `tests/sections.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'js-yaml';
import { renderComponent } from './helpers/dom';
import { siteCopySchema } from '../src/schemas';
import PayoffBand from '../src/components/sections/PayoffBand.astro';
import Credibility from '../src/components/sections/Credibility.astro';

const copy = siteCopySchema.parse(
  load(readFileSync(join(process.cwd(), 'src/content/copy/site.yaml'), 'utf-8')),
);

describe('PayoffBand gives both roles equal billing (§6.2)', () => {
  it('renders exactly two columns', async () => {
    const doc = await renderComponent(PayoffBand, { props: { copy: copy.payoff } });
    expect(doc.querySelectorAll('[data-payoff-column]')).toHaveLength(2);
  });

  it('pairs a field-level claim with a me-level cash-out in each column (§4 governing rule)', async () => {
    const doc = await renderComponent(PayoffBand, { props: { copy: copy.payoff } });
    for (const col of doc.querySelectorAll('[data-payoff-column]')) {
      expect(col.querySelector('[data-claim="field"]')?.textContent?.trim()).toBeTruthy();
      expect(col.querySelector('[data-claim="me"]')?.textContent?.trim()).toBeTruthy();
    }
  });

  it('gives the two columns identical markup, so neither can outweigh the other', async () => {
    const doc = await renderComponent(PayoffBand, { props: { copy: copy.payoff } });
    const [a, b] = [...doc.querySelectorAll('[data-payoff-column]')];
    expect(a.className).toBe(b.className);
  });
});

describe('Credibility carries trust signals without dominating (§6.6)', () => {
  it('states the HDDM lineage as studies, not citations (content spec §10)', async () => {
    const doc = await renderComponent(Credibility, { props: { copy: copy.credibility } });
    const text = doc.body.textContent ?? '';
    expect(text).toContain('published studies');
    expect(text).not.toContain('citations');
  });

  it('links the preprint by DOI and never calls it "under review" (§10)', async () => {
    const doc = await renderComponent(Credibility, { props: { copy: copy.credibility } });
    expect(doc.querySelector('a[href*="doi.org"]')).not.toBeNull();
    expect(doc.body.textContent).not.toMatch(/under review|in preparation/i);
  });

  it('names Paniagua in the author list (§10 required correction)', async () => {
    const doc = await renderComponent(Credibility, { props: { copy: copy.credibility } });
    expect(doc.body.textContent).toContain('Paniagua');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/sections.test.ts`
Expected: FAIL — `Cannot find module '../src/components/sections/PayoffBand.astro'`.

- [ ] **Step 3: Write the payoff band**

Create `src/components/sections/PayoffBand.astro`:

```astro
---
import SectionRule from '../SectionRule.astro';
import type { z } from 'astro/zod';
import type { siteCopySchema } from '../../schemas';

interface Props { copy: z.infer<typeof siteCopySchema>['payoff'] }
const { copy } = Astro.props;
---
<section id="payoff" class="container">
  <SectionRule number="02" title="Payoff" />
  <h2 class="display-l measure">{copy.heading}</h2>

  <div class="payoff">
    {copy.columns.map((col) => (
      <div class="payoff__col" data-payoff-column>
        <p class="body-l" data-claim="field">{col.field}</p>
        <p class="body" data-claim="me">{col.me}</p>
        <p class="label payoff__links">
          {col.links.map((l, i) => (
            <>{i > 0 && ' · '}<a href={l.href}>{l.label}</a></>
          ))}
        </p>
      </div>
    ))}
  </div>
</section>

<style>
  /* §6.2 of the content spec: two columns, EQUAL visual weight. The grid is
     1fr 1fr precisely so neither role can be made to dominate by a later edit. */
  .payoff {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-7);
    margin-top: var(--space-5);
  }
  .payoff__col > * + * { margin-top: var(--space-3); }
  .payoff__col [data-claim='field'] { color: var(--ink); }
  .payoff__links a { color: var(--ink); text-decoration-thickness: 1px; text-underline-offset: 2px; }
  .payoff__links a:hover { text-decoration-thickness: 2px; }  /* weight, never hue (§4.6) */

  @media (max-width: 767px) {
    .payoff { grid-template-columns: 1fr; gap: var(--space-6); }
  }
</style>
```

- [ ] **Step 4: Write the credibility section**

Create `src/components/sections/Credibility.astro`:

```astro
---
import SectionRule from '../SectionRule.astro';
import type { z } from 'astro/zod';
import type { siteCopySchema } from '../../schemas';

interface Props { copy: z.infer<typeof siteCopySchema>['credibility'] }
const { copy } = Astro.props;
---
<section id="credibility" class="container">
  <SectionRule number="06" title="Credibility, citation, community" />

  <!-- §6.6: one quiet line. No banner, no comparison block. -->
  <p class="display-s measure">{copy.lineage}</p>

  <dl class="cred">
    <div><dt class="label">Built at</dt><dd class="body-s">{copy.institutions}</dd></div>
    <div><dt class="label">Funding</dt><dd class="body-s">{copy.funding}</dd></div>
    <div>
      <dt class="label">Paper</dt>
      <dd class="body-s"><a href={copy.paper.href}>{copy.paper.text}</a></dd>
    </div>
    <div>
      <dt class="label">Built on</dt>
      <dd class="body-s">{copy.builtOn.join(' · ')}</dd>
    </div>
    <div><dt class="label">Community</dt><dd class="body-s">{copy.community}</dd></div>
  </dl>
</section>

<style>
  .cred {
    margin-top: var(--space-6);
    display: grid;
    gap: var(--space-4);
  }
  .cred dt { margin-bottom: var(--space-1); }
  .cred dd { margin: 0; max-width: var(--measure); }
  .cred a { color: var(--ink); }
</style>
```

> **Package and institutional logos** come from `assets/logos/` (`hssm.png`, `LANFactory.png`, `ssm_simulators.png`, `carney_brainstorm.gif`). Use those in the header and credibility block. The PyMC / Bambi / ArviZ / JAX / ONNX / HuggingFace row still ships as **names** — those wordmarks are not in the folder.

- [ ] **Step 5: Render both on the page**

Rewrite `src/pages/index.astro`:

```astro
---
import { load } from 'js-yaml';
import BaseLayout from '../layouts/BaseLayout.astro';
import ThemeToggle from '../components/ThemeToggle.astro';
import PayoffBand from '../components/sections/PayoffBand.astro';
import Credibility from '../components/sections/Credibility.astro';
import { siteCopySchema } from '../schemas';
import raw from '../content/copy/site.yaml?raw';

const copy = siteCopySchema.parse(load(raw));
---
<BaseLayout title="HSSM Ecosystem" description={copy.subline} canonicalPath="/">
  <div slot="header" class="container"><ThemeToggle /></div>

  <h1 class="container display-xl measure">{copy.tagline}</h1>
  <p class="container body-l measure">{copy.subline}</p>

  <PayoffBand copy={copy.payoff} />
  <Credibility copy={copy.credibility} />
</BaseLayout>
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm run build && npx vitest run`
Expected: PASS, all suites including the colour-law and spacing guards.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections src/pages/index.astro tests/sections.test.ts
git commit -m "feat: payoff band and credibility sections"
```

---

## Task 8: The chain in four steps

**Files:**
- Create: `src/components/sections/FourStepChain.astro`
- Modify: `tests/sections.test.ts`, `src/pages/index.astro`

**Interfaces:**
- Produces: `FourStepChain.astro` with props `{ copy: SiteCopy['chain'] }`.
- Consumes: `SectionRule.astro`, the type scale, `siteCopySchema`.

**No SVG at all.** Tech spec R7's table is explicit: the four-step chain is "an Astro component in HTML/CSS — likely no SVG at all… Responsive, themeable, translatable for free". An ordered list with CSS connectors gets the semantics for free too — a screen reader reads four numbered steps rather than a picture.

- [ ] **Step 1: Write the failing test**

Append to `tests/sections.test.ts`:

```ts
import FourStepChain from '../src/components/sections/FourStepChain.astro';

describe('FourStepChain supports the double reading (§6.4)', () => {
  it('renders four steps as an ordered list, not as a picture', async () => {
    const doc = await renderComponent(FourStepChain, { props: { copy: copy.chain } });
    const items = doc.querySelectorAll('ol li');
    expect(items).toHaveLength(4);
    expect(doc.querySelector('svg')).toBeNull();
  });

  it('names the owning package on every step', async () => {
    const doc = await renderComponent(FourStepChain, { props: { copy: copy.chain } });
    const packages = [...doc.querySelectorAll('[data-package]')].map((n) => n.textContent?.trim());
    expect(packages).toEqual(['ssm-simulators', 'LANfactory', 'HuggingFace', 'HSSM']);
  });

  it('makes both readings explicit in the caption — the point of the section', async () => {
    const doc = await renderComponent(FourStepChain, { props: { copy: copy.chain } });
    const caption = doc.querySelector('[data-chain-caption]')!.textContent!;
    expect(caption).toMatch(/only ever touch step four/i);   // the experimentalist reading
    expect(caption).toMatch(/contributing a model/i);        // the theorist reading
  });

  it('links to the reference sub-page exactly once (§6.4: "linked once from here")', async () => {
    const doc = await renderComponent(FourStepChain, { props: { copy: copy.chain } });
    const internal = [...doc.querySelectorAll('a')].filter((a) => a.getAttribute('href') === '/ecosystem/');
    expect(internal).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/sections.test.ts -t FourStepChain`
Expected: FAIL — `Cannot find module '../src/components/sections/FourStepChain.astro'`.

- [ ] **Step 3: Write the component**

Create `src/components/sections/FourStepChain.astro`:

```astro
---
import SectionRule from '../SectionRule.astro';
import type { z } from 'astro/zod';
import type { siteCopySchema } from '../../schemas';

interface Props { copy: z.infer<typeof siteCopySchema>['chain'] }
const { copy } = Astro.props;
const base = import.meta.env.BASE_URL;
const href = (p: string) => (p.startsWith('/') ? `${base.replace(/\/$/, '')}${p}` : p);
---
<section id="chain" class="container">
  <SectionRule number="04" title="The chain in four steps" />
  <h2 class="display-l measure">{copy.heading}</h2>

  <ol class="chain">
    {copy.steps.map((step, i) => (
      <li class="chain__step">
        <span class="label chain__num">{String(i + 1).padStart(2, '0')}</span>
        <span class="body chain__label">{step.label}</span>
        <a class="caption" href={step.href} data-package>{step.package}</a>
      </li>
    ))}
  </ol>

  <p class="body measure" data-chain-caption>{copy.caption}</p>
  <p class="label">
    <a href={href(copy.referenceLink.href)}>{copy.referenceLink.label} →</a>
  </p>
</section>

<style>
  .chain {
    list-style: none;
    padding: 0;
    margin: var(--space-5) 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
  }

  .chain__step {
    display: grid;
    gap: var(--space-2);
    align-content: start;
    padding-top: var(--space-3);
    /* The connector IS the top rule: four rules in a row read as one chain,
       and it costs no extra markup. */
    border-top: 1px solid var(--border);
  }
  .chain__step:first-child { border-top-color: var(--ink); }

  .chain__label { color: var(--ink); }
  .chain__step a { color: var(--ink-faint); }
  .chain__step a:hover { color: var(--ink); }   /* ink-to-ink, no hue shift (§4.6) */

  @media (max-width: 767px) {
    .chain { grid-template-columns: 1fr; gap: var(--space-3); }
  }
</style>
```

- [ ] **Step 4: Render it on the page**

In `src/pages/index.astro`, import `FourStepChain` and place it between `PayoffBand` and `Credibility`:

```astro
  <FourStepChain copy={copy.chain} />
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm run build && npx vitest run`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/FourStepChain.astro src/pages/index.astro tests/sections.test.ts
git commit -m "feat: four-step chain as semantic HTML, no SVG"
```

---

## Task 9: Capability grid and the eight icons

**Files:**
- Create: `src/components/Icon.astro`, `src/components/icons/*.svg` (8 files)
- Create: `src/components/sections/CapabilityGrid.astro`
- Modify: `tests/sections.test.ts`, `src/pages/index.astro`

**Interfaces:**
- Produces: `Icon.astro` with props `{ name: string; class?: string }`. Inlines the SVG so page CSS can theme it (R6) and marks it `aria-hidden="true"` — the adjacent title is the accessible text.
- Produces: eight icons on the 24×24 grid, 2px stroke, round caps and joins (§8.2), **stroke `currentColor` and no fill**, so the colour-law guard passes and dark mode is free.
- Produces: `CapabilityGrid.astro` with props `{ items: CollectionEntry<'capabilities'>[]; copy: SiteCopy['capabilities'] }`.

**The capsule pen (§8.1).** One drawing rule governs every non-type mark: *uniform stroke, round caps, round joins*. This is the logo's own construction. Following it means eight icons drawn by different hands still look like one set, without anyone exercising taste.

**§8.3 is the real constraint:** the eight must be **mutually distinguishable at 24px**. Test them small and together, never large and alone. Step 6 is that test and it is not optional.

- [ ] **Step 1: Write the failing test**

Append to `tests/sections.test.ts`:

```ts
import { readdirSync } from 'node:fs';
import CapabilityGrid from '../src/components/sections/CapabilityGrid.astro';
import { capabilitySchema } from '../src/schemas';

const capabilities = readdirSync(join(process.cwd(), 'src/content/capabilities'))
  .filter((f) => f.endsWith('.yaml'))
  .map((f) => ({
    id: f.replace(/\.yaml$/, ''),
    data: capabilitySchema.parse(load(readFileSync(join(process.cwd(), 'src/content/capabilities', f), 'utf-8'))),
  }))
  .sort((a, b) => a.data.order - b.data.order);

describe('the icon set follows the capsule pen (§8.1, §8.2)', () => {
  const files = readdirSync(join(process.cwd(), 'src/components/icons')).filter((f) => f.endsWith('.svg'));

  it('has one icon per capability, and no orphans', () => {
    const needed = capabilities.map((c) => `${c.data.icon}.svg`).sort();
    expect(files.sort()).toEqual(needed);
  });

  for (const f of files) {
    const svg = readFileSync(join(process.cwd(), 'src/components/icons', f), 'utf-8');

    it(`${f} is drawn on the 24x24 grid`, () => {
      expect(svg).toMatch(/viewBox="0 0 24 24"/);
    });

    it(`${f} uses round caps and joins, 2px stroke, no fill`, () => {
      expect(svg).toMatch(/stroke-linecap="round"/);
      expect(svg).toMatch(/stroke-linejoin="round"/);
      expect(svg).toMatch(/stroke-width="2"/);
      expect(svg).toMatch(/fill="none"/);
    });

    it(`${f} takes its colour from CSS, never from a literal (§4.5)`, () => {
      expect(svg).toMatch(/stroke="currentColor"/);
      expect(svg).not.toMatch(/#[0-9a-fA-F]{3,8}/);
    });
  }
});

describe('CapabilityGrid reads as a selection, not a catalogue (R25, §10)', () => {
  const props = { items: capabilities, copy: copy.capabilities };

  it('renders all eight capabilities', async () => {
    const doc = await renderComponent(CapabilityGrid, { props });
    expect(doc.querySelectorAll('[data-capability]')).toHaveLength(8);
  });

  it('carries the selection note prominently, not as a footnote', async () => {
    const doc = await renderComponent(CapabilityGrid, { props });
    expect(doc.querySelector('[data-selection-note]')?.textContent)
      .toContain('A selection, not a catalogue');
  });

  it('states no model count anywhere (R13)', async () => {
    const doc = await renderComponent(CapabilityGrid, { props });
    expect(doc.body.textContent ?? '')
      .not.toMatch(/\b\d[\d,]*\+?\s*(models|simulators|configurations|networks)\b/i);
  });

  it('marks icons decorative — the title is the accessible text', async () => {
    const doc = await renderComponent(CapabilityGrid, { props });
    for (const svg of doc.querySelectorAll('[data-capability] svg')) {
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/sections.test.ts -t capsule`
Expected: FAIL — `ENOENT: src/components/icons`.

- [ ] **Step 3: Draw the eight icons**

Create `src/components/icons/`. Every file follows this exact skeleton — only the paths inside change:

```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- paths, inset 2px from the grid edge (§8.2 optical padding) -->
</svg>
```

The eight, each chosen so it stays legible and *distinct* at 24px:

| File | Mark | Why it is distinguishable |
|---|---|---|
| `families.svg` | Four capsules of differing length, stacked | The only stacked-bars mark; reads as the logo's atom |
| `hierarchy.svg` | One dot above, three dots below, joined by two short strokes | The only branching mark |
| `surrogate.svg` | A dashed curve tracing over a solid curve | The only mark using a dash array — a surrogate following the truth |
| `formula.svg` | A tilde between two dots, on a baseline | The only mark with a horizontal baseline rule |
| `trace.svg` | A single jagged accumulation trace crossing a horizontal boundary | The only zig-zag |
| `learning.svg` | An arrow curving back on itself over a rising step | The only closed loop |
| `check.svg` | Two overlapping density humps | The only paired curves |
| `exchange.svg` | Two arrows in opposite directions between two capsules | The only bidirectional arrow pair |

Concretely, `src/components/icons/families.svg`:

```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <line x1="4" y1="6"  x2="16" y2="6"  />
  <line x1="4" y1="11" x2="20" y2="11" />
  <line x1="4" y1="16" x2="12" y2="16" />
  <line x1="4" y1="21" x2="18" y2="21" />
</svg>
```

and `src/components/icons/trace.svg`:

```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <line x1="3" y1="4" x2="21" y2="4" />
  <path d="M3 18 L6 14 L9 17 L12 11 L15 14 L18 7 L21 9" />
</svg>
```

Draw the remaining six on the same skeleton, following the table.

- [ ] **Step 4: Write the Icon component**

Create `src/components/Icon.astro`. Astro's native SVG import inlines the file as a component, so page CSS can theme it (R6):

```astro
---
interface Props { name: string; class?: string }
const { name, class: className } = Astro.props;

// Eager glob so an unknown icon name is a build error, not a blank space.
const icons = import.meta.glob<{ default: any }>('./icons/*.svg', { eager: true });
const entry = icons[`./icons/${name}.svg`];
if (!entry) throw new Error(`Unknown icon "${name}". Add src/components/icons/${name}.svg`);
const Svg = entry.default;
---
<Svg class={className} width={24} height={24} aria-hidden="true" focusable="false" />
```

- [ ] **Step 5: Write the grid**

Create `src/components/sections/CapabilityGrid.astro`:

```astro
---
import SectionRule from '../SectionRule.astro';
import Icon from '../Icon.astro';
import type { z } from 'astro/zod';
import type { siteCopySchema, capabilitySchema } from '../../schemas';

interface Props {
  items: { id: string; data: z.infer<typeof capabilitySchema> }[];
  copy: z.infer<typeof siteCopySchema>['capabilities'];
}
const { items, copy } = Astro.props;
const ordered = [...items].sort((a, b) => a.data.order - b.data.order);
---
<section id="capabilities" class="container">
  <SectionRule number="05" title="What's in the box" />
  <h2 class="display-l measure">{copy.heading}</h2>
  <!-- R25: labelled as a selection, prominently — not a footnote. -->
  <p class="body measure" data-selection-note>{copy.selectionNote}</p>

  <ul class="caps">
    {ordered.map((item) => (
      <li class="caps__item" data-capability>
        <Icon name={item.data.icon} class="caps__icon" />
        <h3 class="display-s">{item.data.title}</h3>
        <p class="body-s">{item.data.description}</p>
      </li>
    ))}
  </ul>
</section>

<style>
  .caps {
    list-style: none; padding: 0;
    margin: var(--space-6) 0 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-6) var(--space-5);
  }
  /* §12 forbids card grids with shadows and rounded corners as a layout device.
     A hairline above each cell is the publication equivalent. */
  .caps__item {
    border-top: 1px solid var(--border);
    padding-top: var(--space-3);
    display: grid;
    gap: var(--space-2);
    align-content: start;
  }
  .caps__icon { color: var(--ink); }

  @media (max-width: 1023px) { .caps { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 599px)  { .caps { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 6: Test the icons small and together (§8.3) — do not skip this**

In `src/pages/index.astro`, import and render the grid:

```astro
import { getCollection } from 'astro:content';
const capabilities = await getCollection('capabilities');
```

```astro
  <CapabilityGrid items={capabilities} copy={copy.capabilities} />
```

Then run `npm run dev`, open the capabilities section, and **zoom the browser to 100% at the narrowest breakpoint** so the icons render at their true 24px. Check both themes.

The pass condition is not "do they look nice" — it is **can you name each one without reading its title**. If two read alike, redraw the weaker of the pair. §8.3: "if two read alike the grid looks broken rather than clever."

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm run build && npx vitest run`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/components/Icon.astro src/components/icons src/components/sections/CapabilityGrid.astro src/pages/index.astro tests/sections.test.ts
git commit -m "feat: capability grid with eight capsule-pen icons"
```

---

## Task 10: Worked-example figures — supplied PNG, placeholders until they land

**Files:**
- Create: `src/assets/figures/panel-0-problem.svg`, `panel-2-posteriors.svg`, `panel-3-ppc.svg` (placeholders)
- Create: `tests/figures.test.ts`

**Interfaces:**
- Produces: three committed images whose filenames Task 11 hard-codes: `panel-0-problem`, `panel-2-posteriors`, `panel-3-ppc`. Task 11 renders them with `<img>`, so swapping a placeholder for a real PNG is a file replacement, not a component change.
- Consumes: nothing from HSSM, Python, or matplotlib.

**C13.** This repository never installs Python or HSSM. The owner will supply real plots as PNG files. Until they arrive, these placeholders ship. Panel narrative may be generic — the Cavanagh / boundary-separation story is **not** a blocker.

When the real PNGs land, drop them in `src/assets/figures/` under the same basenames (`.png` is fine; update the `<img src>` extensions in Task 11 if they are not SVG) and leave the tests passing.

- [ ] **Step 1: Write the failing test**

Create `tests/figures.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'src/assets/figures');
const PANELS = ['panel-0-problem', 'panel-2-posteriors', 'panel-3-ppc'];

describe('worked-example figure slots (C13)', () => {
  it('the figures directory exists', () => {
    expect(existsSync(DIR)).toBe(true);
  });

  for (const name of PANELS) {
    it(`${name} is committed as png or svg`, () => {
      const files = existsSync(DIR) ? readdirSync(DIR) : [];
      expect(
        files.some((f) => f.startsWith(name) && (f.endsWith('.png') || f.endsWith('.svg'))),
        `missing ${name}.png or ${name}.svg`,
      ).toBe(true);
    });
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/figures.test.ts`
Expected: FAIL — `src/assets/figures` does not exist.

- [ ] **Step 3: Commit three placeholder SVGs**

Each is a labelled plate-sized board in paper + ink, so it reads as a figure slot rather than a broken image. Real PNGs replace these files later.

`src/assets/figures/panel-0-problem.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 240" role="img">
  <title>Placeholder: two overlapping response-time densities</title>
  <rect width="560" height="240" fill="#FCFBF8"/>
  <text x="24" y="36" font-family="JetBrains Mono, monospace" font-size="12" fill="#706B63">PLACEHOLDER · panel 0 · the problem</text>
  <path d="M40 200 C 80 40, 160 40, 200 200" fill="none" stroke="#3730A3" stroke-width="2"/>
  <path d="M80 200 C 140 60, 240 60, 280 200" fill="none" stroke="#0D9488" stroke-width="2"/>
  <line x1="40" y1="200" x2="520" y2="200" stroke="#E5E1D8"/>
</svg>
```

`src/assets/figures/panel-2-posteriors.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 240" role="img">
  <title>Placeholder: two posterior densities</title>
  <rect width="560" height="240" fill="#FCFBF8"/>
  <text x="24" y="36" font-family="JetBrains Mono, monospace" font-size="12" fill="#706B63">PLACEHOLDER · panel 2 · the answer</text>
  <path d="M60 200 C 90 40, 150 40, 180 200" fill="none" stroke="#3730A3" stroke-width="2"/>
  <path d="M320 200 C 360 80, 420 80, 460 200" fill="none" stroke="#0D9488" stroke-width="2"/>
  <line x1="40" y1="200" x2="520" y2="200" stroke="#E5E1D8"/>
</svg>
```

`src/assets/figures/panel-3-ppc.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 240" role="img">
  <title>Placeholder: posterior predictive overlay</title>
  <rect width="560" height="240" fill="#FCFBF8"/>
  <text x="24" y="36" font-family="JetBrains Mono, monospace" font-size="12" fill="#706B63">PLACEHOLDER · panel 3 · the check</text>
  <path d="M40 200 C 100 50, 200 50, 280 200 S 460 200, 520 200" fill="none" stroke="#2947C4" stroke-width="2"/>
  <path d="M40 200 C 110 70, 210 70, 280 200 S 450 190, 520 200" fill="none" stroke="#14130F" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="40" y1="200" x2="520" y2="200" stroke="#E5E1D8"/>
</svg>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run tests/figures.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/assets/figures tests/figures.test.ts
git commit -m "feat: placeholder worked-example figures (supplied PNG will replace these)

No Python or HSSM in this repo (C13). Real plots drop in as files."
```

---
## Task 11: The worked example — the spine of the page

**Files:**
- Create: `src/components/sections/WorkedExample.astro`
- Modify: `tests/sections.test.ts`, `src/pages/index.astro`

**Interfaces:**
- Produces: `WorkedExample.astro` with props `{ copy: SiteCopy['workedExample'] }`, rendering four panels inside one `Plate` (Figure 1).
- Consumes: `Plate.astro` (Task 5), the three figure files from Task 10, `siteCopySchema` (Task 6).

**This section carries the primary success criterion.** Content spec §6.3: it must convince a researcher unfamiliar with process modeling that this class of models fits their data — *by demonstration, not assertion* — and close the "can I trust an approximated likelihood?" objection in the same breath. Panel 3 does the closing, visually.

The four panels are **one continuous visual**, so they live in one plate with one figure number and one caption apiece, not four plates.

- [ ] **Step 1: Write the failing test**

Append to `tests/sections.test.ts`:

```ts
import WorkedExample from '../src/components/sections/WorkedExample.astro';

describe('WorkedExample carries the primary success criterion (§6.3)', () => {
  const props = { copy: copy.workedExample };

  it('renders four panels in order', async () => {
    const doc = await renderComponent(WorkedExample, { props });
    const panels = [...doc.querySelectorAll('[data-panel]')];
    expect(panels.map((p) => p.getAttribute('data-panel'))).toEqual(['0', '1', '2', '3']);
  });

  it('carries exactly one code block, of exactly three lines (R11, §2)', async () => {
    const doc = await renderComponent(WorkedExample, { props });
    const blocks = doc.querySelectorAll('pre code');
    expect(blocks).toHaveLength(1);
    const lines = blocks[0].textContent!.trim().split('\n').filter((l) => l.trim());
    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe('import hssm');
  });

  it('shows the formula chip alongside the snippet (§6.3)', async () => {
    const doc = await renderComponent(WorkedExample, { props });
    expect(doc.querySelector('[data-formula-chip]')?.textContent)
      .toContain('(1|participant_id)');
  });

  it('answers the trust objection twice — panel 3 visually, recovery in one sentence', async () => {
    const doc = await renderComponent(WorkedExample, { props });
    expect(doc.querySelector('[data-panel="3"]')).not.toBeNull();
    const recovery = doc.querySelector('[data-recovery]')!;
    expect(recovery.textContent).toMatch(/parameter recovery/i);
    expect(recovery.querySelector('a')).not.toBeNull();
  });

  it('is one plate with one figure number, not four (§7.1)', async () => {
    const doc = await renderComponent(WorkedExample, { props });
    expect(doc.querySelectorAll('figure.plate')).toHaveLength(1);
    expect(doc.querySelector('figcaption')!.textContent).toContain('Figure 1.');
  });

  it('gives every panel caption an encoding, not just a subject (§7.2)', async () => {
    const doc = await renderComponent(WorkedExample, { props });
    for (const cap of doc.querySelectorAll('[data-panel-caption]')) {
      expect(cap.textContent!.trim().split(/\s+/).length).toBeGreaterThan(8);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/sections.test.ts -t WorkedExample`
Expected: FAIL — `Cannot find module '../src/components/sections/WorkedExample.astro'`.

- [ ] **Step 3: Write the component**

Create `src/components/sections/WorkedExample.astro`:

```astro
---
import SectionRule from '../SectionRule.astro';
import Plate from '../Plate.astro';
import { Code } from 'astro:components';
import type { z } from 'astro/zod';
import type { siteCopySchema } from '../../schemas';

interface Props { copy: z.infer<typeof siteCopySchema>['workedExample'] }
const { copy } = Astro.props;

const figures = import.meta.glob<{ default: ImageMetadata }>(
  '../../assets/figures/panel-*',
  { eager: true },
);
const src = (name: string) => {
  const hit = Object.entries(figures).find(([k]) => k.includes(name));
  if (!hit) throw new Error(`missing figure ${name}`);
  return hit[1].default;
};

// The only code on the page (R11, content spec §2): three lines, verbatim from §6.3.
const snippet = `import hssm
model = hssm.HSSM(data=my_data, model="ddm")
model.sample()`;

const [p0, p1, p2, p3] = copy.panels;
---
<section id="worked-example" class="container">
  <SectionRule number="03" title="Worked example" />
  <h2 class="display-l measure">{copy.heading}</h2>
  <p class="body-l measure">{copy.intro}</p>

  <Plate
    figure={1}
    title="A hierarchical drift-diffusion model fitted to Cavanagh and Frank frontal theta data."
    desc={
      "Four panels in sequence. First, response-time densities for high- and low-conflict "
      + "trials whose means are nearly identical but whose shapes differ. Second, the three "
      + "lines of code that specify the model, with a mixed-effects formula placing the "
      + "conflict effect on boundary separation. Third, posterior densities for the conflict "
      + "coefficient on boundary separation and on drift rate: the boundary separation "
      + "posterior is shifted away from zero while the drift rate posterior is centred on it. "
      + "Fourth, posterior predictive densities laid over the observed response times, "
      + "matching in both conditions."
    }
    caption={
      "Reading left to right: the problem, the model, the answer, the check. Colour encodes "
      + "the two conflict conditions, which are also separated by position and by direct "
      + "labelling."
    }
  >
    <div class="panels">
      <div class="panel" data-panel="0">
        <p class="label">{p0.title}</p>
        <img src={src('panel-0-problem').src} alt="" />
        <p class="caption" data-panel-caption>{p0.caption}</p>
      </div>

      <div class="panel" data-panel="1">
        <p class="label">{p1.title}</p>
        <div class="panel__code">
          <Code code={snippet} lang="python" themes={{ light: 'github-light', dark: 'github-light' }} />
          <p class="caption" data-formula-chip>{copy.formulaChip}</p>
        </div>
        <p class="caption" data-panel-caption>{p1.caption}</p>
      </div>

      <div class="panel" data-panel="2">
        <p class="label">{p2.title}</p>
        <img src={src('panel-2-posteriors').src} alt="" />
        <p class="caption" data-panel-caption>{p2.caption}</p>
      </div>

      <div class="panel" data-panel="3">
        <p class="label">{p3.title}</p>
        <img src={src('panel-3-ppc').src} alt="" />
        <p class="caption" data-panel-caption>{p3.caption}</p>
      </div>
    </div>
  </Plate>

  <p class="body-s measure" data-recovery>
    {copy.recovery.text} <a href={copy.recovery.href}>See parameter recovery →</a>
  </p>
</section>

<style>
  .panels {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6) var(--space-5);
    /* §6.2: the plate is the one place centring is allowed, but the panels'
       own text is still flush left. */
    text-align: left;
  }
  .panel { display: grid; gap: var(--space-2); align-content: start; }
  .panel :global(svg) { width: 100%; height: auto; }

  .panel__code :global(pre) {
    background: var(--surface-sunken);
    padding: var(--space-3);
    margin: 0;
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: var(--text-caption);
  }

  @media (max-width: 767px) { .panels { grid-template-columns: 1fr; } }
</style>
```

> **The syntax-highlighting theme is pinned to a light theme in both modes on purpose.**
> The code block sits on `--surface-sunken`, which inverts — but §4.5's "on plate" rule
> and §9.1's Plate decision mean the *plate* stays paper. If `astro check` or the eye
> shows the code block reading badly in dark mode, move the `<Code>` block outside the
> plate rather than introducing a second Shiki theme; two themes is the drift D5 exists
> to prevent.

- [ ] **Step 4: Render it on the page, in the right order**

In `src/pages/index.astro`, import `WorkedExample` and place it so the six sections run in spec order (content spec §5): hero, payoff band, worked example, chain, capabilities, credibility.

```astro
  <PayoffBand copy={copy.payoff} />
  <WorkedExample copy={copy.workedExample} />
  <FourStepChain copy={copy.chain} />
  <CapabilityGrid items={capabilities} copy={copy.capabilities} />
  <Credibility copy={copy.credibility} />
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm run build && npx vitest run`
Expected: PASS.

- [ ] **Step 6: Check the screenshot test by hand (§8 animation policy)**

Run `npm run dev`, screenshot the worked example, and read the screenshot cold. The four panels must make the argument — problem, model, answer, check — with no interaction and no motion. If the sequence is not legible from the picture alone, the panel captions are doing too much work and the figures too little.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/WorkedExample.astro src/pages/index.astro tests/sections.test.ts
git commit -m "feat: worked example — four panels, one plate, one three-line snippet"
```

---

## Task 12: `HeroElement` — the addressable, focusable, payload-carrying primitive

**Files:**
- Create: `src/components/hero/HeroElement.astro`, `src/components/hero/hero.css`
- Create: `tests/hero.test.ts`

**Interfaces:**
- Produces: `HeroElement.astro` with props:
  ```ts
  {
    id: string;                                            // stable — the R24 contract
    kind: 'model' | 'contribute' | 'module' | 'stream' | 'return';
    label: string;
    payload: string;
    href?: string;
    active?: boolean;
  }
  ```
  Renders `<a>` when `href` is present, `<div tabindex="0">` when it is not, always carrying `data-hero-el={id}`, `data-hero-kind={kind}` and `aria-describedby` pointing at its own payload node. Default slot takes the artwork.
- Produces: `hero.css`, which every later hero component imports rather than restyling.

**This is the single most load-bearing component in the plan.** R24 makes hero elements individually addressable because pass-1 interactivity needs it *and* pass-2 animation reuses exactly the same targets; §2 names it one of two things that must not be deferred. Every id chosen here is a contract with pass 2.

**Three hard rules it implements, all from R23 / §6.1a:**

1. **The payload is always in the DOM.** It is never injected on hover, never fetched, never conditional. Visibility is a CSS concern; presence is not.
2. **`:hover` and `:focus-visible` are always the same selector list.** Writing them apart is how hover-only content gets shipped by accident.
3. **On a touch pointer the payload is simply visible** (decision D). `@media (hover: none)` reveals it permanently, so tap follows the link with no gesture conflict and no JS.

- [ ] **Step 1: Write the failing test**

Create `tests/hero.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderComponent } from './helpers/dom';
import HeroElement from '../src/components/hero/HeroElement.astro';

const linked = { id: 'model-ddm', kind: 'model', label: 'Drift diffusion',
                 payload: 'Evidence accumulates to one of two boundaries.', href: '/ecosystem/#diffusion' };
const plain  = { id: 'stream-neural', kind: 'stream', label: 'Neural',
                 payload: 'Trial-wise EEG or fMRI enters the generative model.' };

describe('HeroElement is individually addressable (R24)', () => {
  it('carries a stable id and kind as data attributes', async () => {
    const doc = await renderComponent(HeroElement, { props: linked });
    const el = doc.querySelector('[data-hero-el]')!;
    expect(el.getAttribute('data-hero-el')).toBe('model-ddm');
    expect(el.getAttribute('data-hero-kind')).toBe('model');
  });
});

describe('HeroElement satisfies hover/focus/tap parity (R23, WCAG 2.1 SC 1.4.13)', () => {
  it('renders the payload into the DOM unconditionally — never injected on hover', async () => {
    const doc = await renderComponent(HeroElement, { props: linked });
    expect(doc.querySelector('[data-hero-payload]')!.textContent!.trim()).toBe(linked.payload);
  });

  it('associates the payload with the element for assistive technology', async () => {
    const doc = await renderComponent(HeroElement, { props: linked });
    const el = doc.querySelector('[data-hero-el]')!;
    const described = el.getAttribute('aria-describedby')!;
    expect(doc.getElementById(described)!.textContent!.trim()).toBe(linked.payload);
  });

  it('is keyboard reachable whether or not it links anywhere', async () => {
    const a = await renderComponent(HeroElement, { props: linked });
    expect(a.querySelector('[data-hero-el]')!.tagName.toLowerCase()).toBe('a');

    const d = await renderComponent(HeroElement, { props: plain });
    const el = d.querySelector('[data-hero-el]')!;
    expect(el.tagName.toLowerCase()).not.toBe('a');
    expect(el.getAttribute('tabindex')).toBe('0');
  });

  it('gives every element an accessible name, not merely a title (R23)', async () => {
    for (const props of [linked, plain]) {
      const doc = await renderComponent(HeroElement, { props });
      const el = doc.querySelector('[data-hero-el]')!;
      const name = el.getAttribute('aria-label') ?? el.textContent ?? '';
      expect(name).toContain(props.label);
    }
  });

  it('marks the artwork decorative — the label and payload are the text (§7.3)', async () => {
    const doc = await renderComponent(HeroElement, { props: linked, slots: { default: '<svg viewBox="0 0 10 10"/>' } });
    expect(doc.querySelector('[data-hero-art]')!.getAttribute('aria-hidden')).toBe('true');
  });
});

describe('the reveal rules cannot drift apart (R23)', () => {
  const css = readFileSync(join(process.cwd(), 'src/components/hero/hero.css'), 'utf-8');

  it('every :hover reveal rule also lists a focus selector', () => {
    const hoverRules = [...css.matchAll(/([^{}]*:hover[^{}]*)\{/g)].map((m) => m[1]);
    expect(hoverRules.length).toBeGreaterThan(0);
    for (const selector of hoverRules) {
      expect(selector, `hover rule without focus parity: ${selector.trim()}`)
        .toMatch(/:focus-visible|:focus-within/);
    }
  });

  it('reveals payloads permanently on touch pointers (decision D)', () => {
    expect(css).toMatch(/@media\s*\(hover:\s*none\)/);
  });

  it('applies no transform on hover — pass 1 ships no motion (§10.2, §12)', () => {
    expect(css).not.toMatch(/:hover[^{]*\{[^}]*transform\s*:/s);
  });

  it('changes no hue on hover (§4.6)', () => {
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/hero.test.ts`
Expected: FAIL — `Cannot find module '../src/components/hero/HeroElement.astro'`.

- [ ] **Step 3: Write the component**

Create `src/components/hero/HeroElement.astro`:

```astro
---
import './hero.css';

interface Props {
  /** Stable across pass 1 and pass 2. Changing it breaks the R24 animation contract. */
  id: string;
  kind: 'model' | 'contribute' | 'module' | 'stream' | 'return';
  label: string;
  /** One line (§6.1a). Always rendered — visibility is CSS's problem, presence is not. */
  payload: string;
  href?: string;
  active?: boolean;
}
const { id, kind, label, payload, href, active = false } = Astro.props;
const payloadId = `hero-payload-${id}`;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const resolved = href?.startsWith('/') ? `${base}${href}` : href;

// Linked elements are anchors; unlinked ones still take focus, because R23 makes
// keyboard reach non-negotiable even where there is nowhere to go.
const Tag = resolved ? 'a' : 'div';
const interactive = resolved ? { href: resolved } : { tabindex: '0', role: 'group' };
---
<div class="hero-el__wrap">
  <Tag
    class:list={['hero-el', `hero-el--${kind}`, { 'is-active': active }]}
    data-hero-el={id}
    data-hero-kind={kind}
    aria-describedby={payloadId}
    {...interactive}
  >
    <span class="hero-el__art" data-hero-art aria-hidden="true"><slot /></span>
    <span class="hero-el__label label">{label}</span>
  </Tag>
  <p class="hero-el__payload caption" id={payloadId} data-hero-payload>{payload}</p>
</div>
```

- [ ] **Step 4: Write the parity stylesheet**

Create `src/components/hero/hero.css`:

```css
/*
  Hover / focus / tap parity — tech spec R23, content spec §6.1a, WCAG 2.1 SC 1.4.13.

  Three rules hold this together, and breaking any one ships hover-only content:
    1. the payload is always in the DOM; only its visibility is conditional
    2. :hover and :focus-visible appear in the SAME selector list, always
    3. on a touch pointer the payload is simply visible — no tap gesture is consumed,
       so tap follows the link (decision D of the implementation plan)

  tests/hero.test.ts fails the build if rule 2 or 3 is broken.
*/

.hero-el__wrap { position: relative; display: grid; gap: var(--space-1); }

.hero-el {
  display: grid;
  gap: var(--space-2);
  justify-items: start;
  padding: var(--space-2);
  border: 1px solid var(--border);
  color: var(--ink-muted);
  text-decoration: none;
  background: transparent;
}

/* State by weight and background, never by hue (§4.6). No transform (§10.2). */
.hero-el:hover,
.hero-el:focus-visible {
  background: var(--surface);
  border-color: var(--border-strong);
  color: var(--ink);
}

/* §6.1: one tile is highlighted as the model currently in use. On a monochrome
   page that is a heavier rule, not a warm accent. */
.hero-el.is-active { border-color: var(--ink); border-width: 1.5px; }

.hero-el--contribute { border-style: dashed; }

.hero-el__art { display: block; width: 100%; color: var(--ink); }
.hero-el__label { color: inherit; }

/* --- the payload -------------------------------------------------------- */

.hero-el__payload {
  /* Present, not painted. `visibility` rather than `display:none` keeps it in the
     accessibility tree for aria-describedby while hiding it visually. */
  visibility: hidden;
  min-height: calc(var(--text-caption) * var(--lh-caption) * 2);
  margin: 0;
}

.hero-el__wrap:hover .hero-el__payload,
.hero-el__wrap:focus-within .hero-el__payload {
  visibility: visible;
}

/*
  Touch pointers: reveal permanently.

  Tap-to-reveal and tap-to-follow-link compete for one gesture (content spec §11).
  Rather than arbitrating, we remove the conflict: on touch the payload is always
  visible, so the single tap always means "follow the link". This is also the third
  of R23's three reachability paths, and it needs no JavaScript.
*/
@media (hover: none) {
  .hero-el__payload { visibility: visible; }
}

/* Reserving the payload's height in the flow means revealing it shifts nothing
   (future-features §1.2 constraint 3, and a pass-2 prerequisite). */
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npx vitest run tests/hero.test.ts`
Expected: PASS — 11 assertions.

- [ ] **Step 6: Commit**

```bash
git add src/components/hero tests/hero.test.ts
git commit -m "feat: HeroElement primitive with enforced hover/focus/tap parity

Payload is always in the DOM; :hover and :focus-visible share every selector
list; touch pointers reveal permanently so tap follows the link (R23, R24)."
```

---

## Task 13: Hero composition — core, modules, flanks, and the mobile layout

**Files:**
- Create: `src/components/hero/HeroCore.astro`, `HeroModules.astro`, `HeroStreams.astro`, `HeroContribution.astro`, `Hero.astro`
- Create: `src/components/hero/art/{tile-ddm,tile-angle,tile-race,tile-attention,tile-rlssm,tile-plus}.svg`
- Create: `src/components/hero/art/{stream-behaviour,stream-neural,stream-gaze}.svg`
- Create: `src/components/hero/art/paths.svg`
- Modify: `src/components/hero/hero.css`, `tests/hero.test.ts`

**Interfaces:**
- Produces: `Hero.astro` with props `{ copy: SiteCopy; elements: Record<string, HeroElementData> }`, where `elements` is keyed by the ids in `src/content/copy/hero.yaml`.
- Consumes: `HeroElement.astro` (Task 12) for every one of the 16 addressable parts.

**Composition, from content spec §6.1 and the Appendix A wireframe:**

```
 behaviour ─┐                                    ┌─ your model
 neural ────┼──▶  [ 5 model tiles + "+" tile ]  ◀┤   → trained artifact → docks at "+"
 gaze ──────┘     [ sim·SBI·samp·valid·plots ]   └─ ← adoption
 ◀── insight
 bring data, gain insight            bring a model, gain adoption
```

**Three composition decisions this plan takes** (recorded in full at the top): modules are a **straight row** (F); the insight return path **exits the core's lower-left edge and runs beneath the stream panels**, fixing the crossing the mockup had (G); mobile is a **single column over identical DOM** (E).

**Do not generate the composition programmatically.** D8: "Laying out flanks, arrows, and captions in code means writing a bespoke layout engine for a single image: high effort, worse result, never looks art-directed. Generate the data; author the design."

- [ ] **Step 1: Write the failing test**

Append to `tests/hero.test.ts`:

```ts
import { load } from 'js-yaml';
import Hero from '../src/components/hero/Hero.astro';
import { siteCopySchema, heroElementSchema } from '../src/schemas';

const site = siteCopySchema.parse(
  load(readFileSync(join(process.cwd(), 'src/content/copy/site.yaml'), 'utf-8')),
);
const elements = Object.fromEntries(
  Object.entries(load(readFileSync(join(process.cwd(), 'src/content/copy/hero.yaml'), 'utf-8')) as any)
    .map(([id, el]) => [id, { id, ...heroElementSchema.parse(el) }]),
);
const heroProps = { copy: site, elements };

describe('the hero composition (§6.1)', () => {
  it('renders every element in hero.yaml, and no others', async () => {
    const doc = await renderComponent(Hero, { props: heroProps });
    const rendered = [...doc.querySelectorAll('[data-hero-el]')].map((e) => e.getAttribute('data-hero-el'));
    expect(rendered.sort()).toEqual(Object.keys(elements).sort());
  });

  it('puts six tiles in the core: five models and one contribution slot', async () => {
    const doc = await renderComponent(Hero, { props: heroProps });
    const core = doc.querySelector('[data-hero-region="core"]')!;
    expect(core.querySelectorAll('[data-hero-kind="model"]')).toHaveLength(5);
    expect(core.querySelectorAll('[data-hero-kind="contribute"]')).toHaveLength(1);
  });

  it('highlights exactly one model tile as the one in use', async () => {
    const doc = await renderComponent(Hero, { props: heroProps });
    expect(doc.querySelectorAll('[data-hero-kind="model"].is-active')).toHaveLength(1);
  });

  it('places five module tiles beneath the core, subordinate to it', async () => {
    const doc = await renderComponent(Hero, { props: heroProps });
    expect(doc.querySelectorAll('[data-hero-region="modules"] [data-hero-el]')).toHaveLength(5);
  });

  it('carries the two flank captions, and never labels the flanks by role (§6.1)', async () => {
    const doc = await renderComponent(Hero, { props: heroProps });
    const text = doc.body.textContent ?? '';
    expect(text).toContain('bring data, gain insight');
    expect(text).toContain('bring a model, gain adoption');
    expect(text).not.toMatch(/\bTHEORIST\b|\bANALYST\b/);
  });

  it('docks the contribution arrow at the "+" tile specifically (§6.1)', async () => {
    const doc = await renderComponent(Hero, { props: heroProps });
    const path = doc.querySelector('[data-hero-path="contribution"]')!;
    expect(path.getAttribute('data-docks-at')).toBe('model-contribute');
  });

  it('routes the insight return beneath the streams so it crosses nothing (decision G)', async () => {
    const doc = await renderComponent(Hero, { props: heroProps });
    expect(doc.querySelector('[data-hero-path="insight"]')!.getAttribute('data-route'))
      .toBe('below-streams');
  });
});

describe('the hero has a defined mobile composition, not a squeeze (R9)', () => {
  const css = readFileSync(join(process.cwd(), 'src/components/hero/hero.css'), 'utf-8');

  it('declares an explicit mobile grid template', () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*767px\)/);
    expect(css).toMatch(/grid-template-areas/);
  });

  it('hides the connective paths on mobile rather than reflowing them', () => {
    // The single-column stack makes the arrows meaningless; the captions carry the
    // relationship instead (§6.1: "flanks stack beneath the core, or degrade to captions").
    expect(css).toMatch(/@media[^{]*max-width:\s*767px[^{]*\{[\s\S]*\.hero__paths[\s\S]*display:\s*none/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/hero.test.ts -t composition`
Expected: FAIL — `Cannot find module '../src/components/hero/Hero.astro'`.

- [ ] **Step 3: Draw the six model tiles**

Content spec §6.1: "a legible thin line-art model cartoon (boundaries plus stochastic trajectory)". These are hand-authored for pass 1; D8 replaces them with `hssm.plotting.plot_model_cartoon` output at pass 2. Every tile shares this skeleton — **stroke `currentColor`, no colour literal**, so the colour-law guard passes and both themes are free:

`src/components/hero/art/tile-ddm.svg`:

```svg
<svg viewBox="0 0 64 40" fill="none" stroke="currentColor" stroke-width="1"
     stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <!-- two boundaries -->
  <line x1="4" y1="6"  x2="60" y2="6"  />
  <line x1="4" y1="34" x2="60" y2="34" />
  <!-- one stochastic trajectory, terminating at the upper boundary -->
  <path d="M4 20 L10 18 L15 22 L21 17 L26 21 L32 14 L38 17 L44 11 L50 13 L55 7" />
</svg>
```

The other five differ only in their geometry, and each difference is the model's defining feature — which is the whole point of showing six rather than twenty:

| File | Difference from `tile-ddm` |
|---|---|
| `tile-angle.svg` | The two boundaries converge toward the right edge — a collapsing bound |
| `tile-race.svg` | No boundaries; two trajectories rising from a shared baseline to one threshold line at the top |
| `tile-attention.svg` | The DDM skeleton, with two short vertical fixation marks below the lower boundary, and the trajectory's slope changing at each |
| `tile-rlssm.svg` | Three miniature trajectories in a row, each steeper than the last — learning across trials |
| `tile-plus.svg` | `stroke-dasharray="3 3"` rectangle with a centred `+`, and nothing else |

`src/components/hero/art/tile-plus.svg`:

```svg
<svg viewBox="0 0 64 40" fill="none" stroke="currentColor" stroke-width="1"
     stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="4" width="56" height="32" stroke-dasharray="3 3" />
  <line x1="32" y1="14" x2="32" y2="26" />
  <line x1="26" y1="20" x2="38" y2="20" />
</svg>
```

- [ ] **Step 4: Draw the three data streams**

Each is "a real miniature plot" (§6.1), on the same skeleton and viewBox `0 0 72 32`:

- `stream-behaviour.svg` — a right-skewed response-time density: `<path d="M4 28 Q14 4 26 14 T44 26 L68 28" />` plus a baseline.
- `stream-neural.svg` — three stacked trial-wise traces, each a short jagged polyline at `y=8`, `16`, `24`.
- `stream-gaze.svg` — a scanpath: four `<circle r="2">` fixations joined by straight saccade lines.

- [ ] **Step 5: Write the four region components**

`src/components/hero/HeroCore.astro`:

```astro
---
import HeroElement from './HeroElement.astro';
import type { HeroElementData } from './types';

const TILES = ['model-ddm', 'model-angle', 'model-race', 'model-attention', 'model-rlssm', 'model-contribute'] as const;
const art = import.meta.glob<{ default: any }>('./art/tile-*.svg', { eager: true });
const ART: Record<string, string> = {
  'model-ddm': 'ddm', 'model-angle': 'angle', 'model-race': 'race',
  'model-attention': 'attention', 'model-rlssm': 'rlssm', 'model-contribute': 'plus',
};

interface Props { elements: Record<string, HeroElementData> }
const { elements } = Astro.props;
---
<div class="hero__core" data-hero-region="core">
  {TILES.map((id) => {
    const Art = art[`./art/tile-${ART[id]}.svg`].default;
    return (
      <HeroElement {...elements[id]}>
        <Art />
      </HeroElement>
    );
  })}
</div>
```

Create `src/components/hero/types.ts` so every region shares one shape:

```ts
import type { z } from 'astro/zod';
import type { heroElementSchema } from '../../schemas';

export type HeroElementData = z.infer<typeof heroElementSchema> & { id: string };
```

`HeroModules.astro` is the same shape over `['module-simulation', 'module-sbi', 'module-sampling', 'module-validation', 'module-plots']`, with `data-hero-region="modules"` and no artwork slot — module tiles are label-only, "visually subordinate" to the core (§6.1).

`HeroStreams.astro` renders `['stream-behaviour', 'stream-neural', 'stream-gaze']` with their miniature plots, `data-hero-region="streams"`, plus the left caption.

`HeroContribution.astro` renders `model-contribute`'s flank counterpart — the "your model" dashed tile and the "trained once, shared" artifact caption — with `data-hero-region="contribution"` and the right caption. It renders **no** `HeroElement` of its own; the `+` tile in the core is the single addressable contribution element, and the arrow docks at it.

- [ ] **Step 6: Author the connective paths**

Create `src/components/hero/art/paths.svg` — one overlay SVG sized to the hero grid, carrying the arrows. The two return paths take the data attributes the test asserts:

```svg
<svg class="hero__paths" viewBox="0 0 900 420" fill="none" stroke="currentColor"
     stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
     aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <!-- three data streams converging into the core's left edge -->
  <path d="M180 90  C240 90  260 170 320 190" />
  <path d="M180 170 C250 170 260 185 320 195" />
  <path d="M180 250 C240 250 260 220 320 205" />

  <!-- insight return: exits the core's LOWER-LEFT edge and runs BENEATH the stream
       panels, so it crosses no incoming arrow (content spec §6.1 design note;
       decision G of the implementation plan) -->
  <path data-hero-path="insight" data-route="below-streams"
        d="M320 260 C250 300 200 320 120 320" />

  <!-- contribution: your model -> trained artifact -> docks AT the "+" tile,
       not at the wall generally (§6.1) -->
  <path data-hero-path="contribution" data-docks-at="model-contribute"
        d="M720 150 C650 150 620 175 585 185" />

  <!-- adoption return -->
  <path data-hero-path="adoption" data-route="right"
        d="M585 235 C630 260 680 280 740 280" />
</svg>
```

> Coordinates are illustrative of the *routing*, not final. Tune them against the
> rendered grid — the assertions that matter are the two `data-` attributes and that
> **no path visually crosses another**, which is the defect §6.1 flags in the mockup.

- [ ] **Step 7: Assemble the hero**

Create `src/components/hero/Hero.astro`:

```astro
---
import './hero.css';
import HeroCore from './HeroCore.astro';
import HeroModules from './HeroModules.astro';
import HeroStreams from './HeroStreams.astro';
import HeroContribution from './HeroContribution.astro';
import Paths from './art/paths.svg';
import type { HeroElementData } from './types';
import type { z } from 'astro/zod';
import type { siteCopySchema } from '../../schemas';

interface Props {
  copy: z.infer<typeof siteCopySchema>;
  elements: Record<string, HeroElementData>;
}
const { copy, elements } = Astro.props;
---
<div class="hero__figure">
  <Paths />
  <div class="hero__grid">
    <div class="hero__left">
      <HeroStreams elements={elements} />
      <p class="hero__caption caption">{copy.heroCaptions.left}</p>
    </div>

    <div class="hero__centre">
      <HeroCore elements={elements} />
      <HeroModules elements={elements} />
    </div>

    <div class="hero__right">
      <HeroContribution elements={elements} />
      <p class="hero__caption caption">{copy.heroCaptions.right}</p>
    </div>
  </div>
</div>
```

- [ ] **Step 8: Write the two grid templates**

Append to `src/components/hero/hero.css`:

```css
/* --- desktop composition (content spec Appendix A) ---------------------- */

.hero__figure { position: relative; margin-top: var(--space-7); }

.hero__paths {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: var(--border-strong);
  pointer-events: none;   /* the paths are decoration; the tiles take the pointer */
}

.hero__grid {
  position: relative;
  display: grid;
  grid-template-areas: 'left centre right';
  grid-template-columns: 1fr 1.6fr 1fr;   /* the core dominates; flanks are equal */
  gap: var(--space-6);
  align-items: center;
}
.hero__left { grid-area: left; }
.hero__centre { grid-area: centre; }
.hero__right { grid-area: right; }

.hero__core {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}

/* §6.1: "a straight row of module tiles beneath the core, visually subordinate to it" */
.hero__modules {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-2);
  margin-top: var(--space-4);
}
.hero__modules .hero-el { border-color: transparent; border-bottom-color: var(--border); }

.hero__caption { margin-top: var(--space-3); color: var(--ink-faint); }

/* --- mobile composition (R9, decision E) --------------------------------
   A DEFINED composition, not a squeezed desktop one: the same DOM, restacked
   into one column so every R24 element id survives the breakpoint. */

@media (max-width: 767px) {
  .hero__grid {
    grid-template-areas: 'centre' 'left' 'right';
    grid-template-columns: 1fr;
    gap: var(--space-7);
  }

  /* The arrows described relationships between columns that no longer exist.
     §6.1 permits the flanks to "degrade to captions" — the captions carry it. */
  .hero__paths { display: none; }

  .hero__core { grid-template-columns: repeat(2, 1fr); }
  .hero__modules { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 9: Run the tests to verify they pass**

Run: `npx vitest run tests/hero.test.ts`
Expected: PASS.

- [ ] **Step 10: Verify the composition by eye, at both breakpoints and in both themes**

Run `npm run dev`. Check, in order:
1. **No path crosses another** — the defect §6.1 flags in the mockup.
2. The contribution arrow **terminates at the `+` tile**, not near it.
3. Tab through the hero: focus order runs left flank → core → modules → right flank, and every stop reveals its payload.
4. At 375px the single column reads as a composition, not as debris.

- [ ] **Step 11: Commit**

```bash
git add src/components/hero tests/hero.test.ts
git commit -m "feat: hero composition — core, modules, flanks, and a defined mobile layout"
```

---

## Task 14: Hero integration — text equivalent, CTAs, and the screenshot test

**Files:**
- Modify: `src/pages/index.astro`, `src/components/hero/Hero.astro`, `tests/hero.test.ts`

**Interfaces:**
- Produces: the two CTAs carrying `data-cta="get-started"` and `data-cta="see-it-work"` — the R20 instrumentation hooks, so analytics is a one-line addition if D7 closes yes.
- Consumes: everything from Tasks 12 and 13.

**The visually-hidden text equivalent is not optional.** §7.3 and D8: "The hero carries the page's central argument and needs more than a `<desc>` string — give it a visually-hidden text equivalent adjacent to the figure." A screen-reader user who cannot see the composition must still get the argument, not a list of 16 disconnected labels.

- [ ] **Step 1: Write the failing test**

Append to `tests/hero.test.ts`:

```ts
import { readDist } from './helpers/dom';

describe('the hero is complete without interaction and without sight', () => {
  it('carries a visually-hidden text equivalent adjacent to the figure (§7.3)', async () => {
    const doc = await renderComponent(Hero, { props: heroProps });
    const alt = doc.querySelector('[data-hero-equivalent]')!;
    expect(alt.className).toContain('visually-hidden');
    // Long enough to be an argument, not a label.
    expect(alt.textContent!.trim().split(/\s+/).length).toBeGreaterThan(40);
  });

  it('states the flywheel in both directions in that equivalent', async () => {
    const doc = await renderComponent(Hero, { props: heroProps });
    const text = doc.querySelector('[data-hero-equivalent]')!.textContent!.toLowerCase();
    expect(text).toMatch(/data/);
    expect(text).toMatch(/contribut|model/);
  });
});

describe('the CTAs carry stable instrumentation hooks (R20)', () => {
  it('both hooks are present on the built page', () => {
    const doc = readDist('index.html');
    expect(doc.querySelector('[data-cta="get-started"]')).not.toBeNull();
    expect(doc.querySelector('[data-cta="see-it-work"]')).not.toBeNull();
  });

  it('the secondary CTA scrolls to the worked example, which exists', () => {
    const doc = readDist('index.html');
    const href = doc.querySelector('[data-cta="see-it-work"]')!.getAttribute('href')!;
    expect(href.startsWith('#')).toBe(true);
    expect(doc.getElementById(href.slice(1))).not.toBeNull();
  });

  it('neither CTA is a coloured button (§4.6, §12)', () => {
    const doc = readDist('index.html');
    for (const cta of doc.querySelectorAll('[data-cta]')) {
      expect(cta.getAttribute('style') ?? '').not.toMatch(/background|color/);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run build && npx vitest run tests/hero.test.ts -t equivalent`
Expected: FAIL — `[data-hero-equivalent]` is null.

- [ ] **Step 3: Add the text equivalent**

In `src/components/hero/Hero.astro`, add immediately inside `.hero__figure`, before `<Paths />`:

```astro
  <p class="visually-hidden" data-hero-equivalent>
    A diagram of the HSSM ecosystem as a commons. At the centre sit six model tiles —
    drift diffusion, collapsing bound, race accumulator, attentional drift, and
    learning-and-deciding models, plus one empty slot marked with a plus sign. Beneath
    them runs a row of supporting modules: simulation, simulation-based inference,
    sampling, validation, and plots. From the left, three streams of data — behaviour,
    neural recordings, and eye-tracking — flow into the models, and a return path
    carries posterior distributions over mechanism back out. From the right, a
    contributed model is trained once into a shared artifact and docks at the empty
    slot, and a return path carries it outward to wider community adoption.
  </p>
```

- [ ] **Step 4: Add the tagline, subline and CTAs**

Add at the top of `Hero.astro`'s template, above `.hero__figure`:

```astro
<section id="hero" class="container">
  <SectionRule number="01" title="Hero" />
  <h1 class="display-xl measure">{copy.tagline}</h1>
  <p class="body-l measure hero__subline">{copy.subline}</p>

  <p class="hero__ctas">
    <a class="cta cta--primary" href={copy.ctaPrimary.href} data-cta={copy.ctaPrimary.hook}>
      {copy.ctaPrimary.label}
    </a>
    <a class="cta" href={copy.ctaSecondary.href} data-cta={copy.ctaSecondary.hook}>
      {copy.ctaSecondary.label} ↓
    </a>
  </p>
```

and close the `</section>` after `.hero__figure`. Import `SectionRule` in the frontmatter.

Append to `hero.css`:

```css
.hero__subline { margin-top: var(--space-4); color: var(--ink-muted); }
.hero__ctas { margin-top: var(--space-5); display: flex; gap: var(--space-3); }

/* §4.6 and §12: no coloured button, badge or call-to-action. The primary CTA
   earns its emphasis from a heavier ink rule, which is the monochrome equivalent. */
.cta {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--border-strong);
  color: var(--ink);
  text-decoration: none;
  font-family: var(--font-text);
  font-size: var(--text-body);
}
.cta:hover, .cta:focus-visible { background: var(--surface); border-color: var(--ink); }
.cta--primary { border-color: var(--ink); border-width: 1.5px; font-weight: 500; }
```

- [ ] **Step 5: Render the hero on the page**

In `src/pages/index.astro`, load the hero copy and render `Hero` first:

```astro
import Hero from '../components/hero/Hero.astro';
import heroRaw from '../content/copy/hero.yaml?raw';
import { heroElementSchema } from '../schemas';

const elements = Object.fromEntries(
  Object.entries(load(heroRaw) as Record<string, unknown>)
    .map(([id, el]) => [id, { id, ...heroElementSchema.parse(el) }]),
);
```

```astro
  <Hero copy={copy} elements={elements} />
```

and delete the placeholder `<h1>`/`<p>` added in Task 7 — the hero owns them now.

- [ ] **Step 6: Run the whole suite**

Run: `npm run build && npx vitest run`
Expected: PASS, every suite. The `copy-budget` test now covers a complete page, so if the body count is over, this is where it surfaces.

- [ ] **Step 7: Run the three manual checks the automated gates cannot make**

1. **The screenshot test (§8, R10).** Screenshot the hero. It must communicate fully — nothing required to understand the pitch may live behind an interaction (§6.1a constraint 2).
2. **Keyboard-only pass.** Unplug the mouse. Tab through the whole hero. Every payload reachable by hover must appear on focus. This is R23 and it is the one thing Lighthouse cannot check for you.
3. **Touch pass.** Open at 375px in a touch-emulating viewport. Every payload must already be visible, and a single tap on a linked tile must navigate rather than reveal (decision D).

- [ ] **Step 8: Commit**

```bash
git add src/components/hero src/pages/index.astro tests/hero.test.ts
git commit -m "feat: hero integration — text equivalent, CTAs with instrumentation hooks"
```

---

## Task 15: The Ecosystem reference sub-page

**Files:**
- Create: `src/pages/ecosystem.astro`
- Create: `src/content/reference/*.md` (nine sections migrated from HSSM docs)
- Modify: `src/content.config.ts`, `src/schemas.ts`, `tests/build/links.test.ts`

**Interfaces:**
- Produces: `/ecosystem/` with **anchor ids exactly matching the model-family collection ids** — `#diffusion`, `#race-accumulator`, `#attention`, `#rlssm`. Task 6's hero `href`s point here and `tests/schemas.test.ts` already asserts the correspondence; this task is where the anchors become real.
- Consumes: the `modelFamilies` collection (Task 6), `SectionRule.astro`, `BaseLayout.astro`.

**This page exists so that replacing `HSSM/ecosystem/` orphans nothing** (content spec §13). Its content is migrated, not written: `repos/HSSM/docs/ecosystem/index.md` is the source, and it currently lives in HSSMSpine. Content spec §1 requires coordinating that ownership transfer before launch — that is a human step, tracked in the launch checklist at the end of this plan, not something this task can do.

**No word budget** (content spec §1) — but the R25 honesty constraint still binds: the model families must read as a selection, and the "for the complete list, see…" links must be prominent rather than footnotes.

- [ ] **Step 1: Write the failing test**

Create `tests/build/links.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readDist, readDistText } from '../helpers/dom';

const BASE = process.env.BASE_PATH ?? '/HSSMEco_Webpage/';

describe('the reference sub-page exists and is anchorable (R2, R5)', () => {
  it('builds to /ecosystem/', () => {
    expect(() => readDist('ecosystem/index.html')).not.toThrow();
  });

  it('carries one anchor per model family, matching the collection ids', () => {
    const doc = readDist('ecosystem/index.html');
    const families = readdirSync(join(process.cwd(), 'src/content/model-families'))
      .filter((f) => f.endsWith('.yaml'))
      .map((f) => f.replace(/\.yaml$/, ''));
    for (const id of families) {
      expect(doc.getElementById(id), `missing anchor #${id}`).not.toBeNull();
    }
  });

  it('labels the families as a selection, not a catalogue (R25)', () => {
    const text = readDist('ecosystem/index.html').body.textContent ?? '';
    expect(text).toMatch(/selection, not a catalogue/i);
  });

  it('states what each outbound link actually is, because the canonical target does not exist yet (R26)', () => {
    const doc = readDist('ecosystem/index.html');
    const notes = doc.querySelectorAll('[data-link-note]');
    expect(notes.length).toBeGreaterThanOrEqual(8); // 4 families x 2 links
    for (const n of notes) expect(n.textContent!.trim().length).toBeGreaterThan(10);
  });
});

describe('every internal link respects the configured base path', () => {
  for (const page of ['index.html', 'ecosystem/index.html']) {
    it(`${page} has no root-absolute link that skips the base`, () => {
      const hrefs = [...readDist(page).querySelectorAll('a[href]')]
        .map((a) => a.getAttribute('href')!)
        .filter((h) => h.startsWith('/'));
      for (const h of hrefs) {
        expect(h.startsWith(BASE), `"${h}" does not start with base "${BASE}"`).toBe(true);
      }
    });
  }

  it('the hero model tiles resolve to anchors that exist on the reference page', () => {
    const home = readDist('index.html');
    const ref = readDist('ecosystem/index.html');
    const tiles = [...home.querySelectorAll('[data-hero-kind="model"]')]
      .map((t) => t.getAttribute('href')!)
      .filter((h) => h.includes('#'));
    expect(tiles.length).toBe(5);
    for (const href of tiles) {
      expect(ref.getElementById(href.split('#')[1])).not.toBeNull();
    }
  });
});

describe('no model count reaches the build output (R13)', () => {
  for (const page of ['index.html', 'ecosystem/index.html']) {
    it(`${page} states no count of models, simulators or networks`, () => {
      const text = readDist(page).body.textContent ?? '';
      expect(text).not.toMatch(/\b\d[\d,]*\+?\s*(models|simulators|configurations|networks)\b/i);
    });
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run build && npx vitest run tests/build/links.test.ts`
Expected: FAIL — `ENOENT: dist/ecosystem/index.html`.

- [ ] **Step 3: Migrate the reference prose**

Add a `reference` collection. In `src/schemas.ts`:

```ts
export const referenceSectionSchema = z.object({
  title: z.string().min(1),
  order: z.number().int(),
});
```

In `src/content.config.ts`:

```ts
const reference = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/reference' }),
  schema: referenceSectionSchema,
});
```
and add `reference` to the exported `collections`.

Create one Markdown file per section in `src/content/reference/`, migrating from `repos/HSSM/docs/ecosystem/index.md` (local clone; 160 lines). The nine sections content spec §13 lists, in this order:

| file | `title` | `order` |
|---|---|---|
| `packages.md` | The packages you install | 1 |
| `connections.md` | How the pieces connect | 2 |
| `questions.md` | Which package answers your question | 3 |
| `onnx.md` | The ONNX likelihood contract | 4 |
| `supporting.md` | Supporting components | 5 |
| `development.md` | Development and coordination | 6 |
| `mlflow.md` | Tracking runs with MLflow | 7 |
| `versions.md` | Version compatibility | 8 |
| `asking.md` | Where to ask | 9 |

Migrate the prose **verbatim** except for three edits:

1. Drop the "This page is the map… maintained in HSSMSpine" paragraph — this page is now canonical (content spec §1), and that sentence would point readers back at the page being replaced.
2. Add `LAN_pipeline_minimal` and the future `HSSMCortex`/`HSSMeister` repositories to `development.md`, per content spec §13's "Additions".
3. Leave every version number and install floor exactly as found. They are facts with an upstream source of truth and this page is not it.

- [ ] **Step 4: Write the page**

Create `src/pages/ecosystem.astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionRule from '../components/SectionRule.astro';
import ThemeToggle from '../components/ThemeToggle.astro';

const families = (await getCollection('modelFamilies')).sort((a, b) => a.data.order - b.data.order);
const sections = (await getCollection('reference')).sort((a, b) => a.data.order - b.data.order);
const rendered = await Promise.all(sections.map(async (s) => ({ ...s, Content: (await render(s)).Content })));
---
<BaseLayout
  title="Ecosystem reference — HSSM"
  description="How the HSSM ecosystem fits together: the packages, the handoffs, the model families, and where to ask."
  canonicalPath="/ecosystem/"
>
  <div slot="header" class="container"><ThemeToggle /></div>

  <div class="container">
    <h1 class="display-l measure">Ecosystem reference</h1>

    <SectionRule number="01" title="Model families" />
    <!-- R25: the honesty constraint, stated up front rather than as a footnote. -->
    <p class="body-l measure">
      A selection, not a catalogue. Each family links onward to the packages, where the
      complete lists live.
    </p>

    {families.map((f) => (
      <section class="family" id={f.id}>
        <h2 class="display-s">{f.data.title}</h2>
        <p class="body measure">{f.data.summary}</p>
        <ul class="family__links">
          {f.data.links.map((l) => (
            <li>
              <a class="body-s" href={l.href}>{l.label}</a>
              {/* R26: the canonical target does not exist upstream yet — say where
                  this actually lands, so nobody is surprised. */}
              <span class="caption" data-link-note>{l.note}</span>
            </li>
          ))}
        </ul>
      </section>
    ))}

    {rendered.map((s, i) => (
      <>
        <SectionRule number={String(i + 2).padStart(2, '0')} title={s.data.title} />
        <div class="prose measure"><s.Content /></div>
      </>
    ))}
  </div>
</BaseLayout>

<style>
  .family { margin-bottom: var(--space-6); scroll-margin-top: var(--space-6); }
  .family__links { list-style: none; padding: 0; margin-top: var(--space-3); display: grid; gap: var(--space-2); }
  .family__links a { color: var(--ink); }
  .family__links span { display: block; }

  .prose { margin-bottom: var(--space-8); }
  .prose :global(p), .prose :global(li) { font-size: var(--text-body); line-height: var(--lh-body); }
  .prose :global(a) { color: var(--ink); }
  .prose :global(table) { width: 100%; border-collapse: collapse; font-size: var(--text-body-s); }
  .prose :global(th), .prose :global(td) {
    border-bottom: 1px solid var(--border);
    padding: var(--space-2);
    text-align: left;
  }
  .prose :global(pre) {
    background: var(--surface-sunken);
    padding: var(--space-3);
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: var(--text-caption);
  }
</style>
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm run build && npx vitest run`
Expected: PASS. If the hero-anchor assertion fails, the mismatch is between a `href` in `src/content/copy/hero.yaml` and a filename in `src/content/model-families/` — fix the YAML, never the test.

- [ ] **Step 6: Commit**

```bash
git add src/pages/ecosystem.astro src/content/reference src/content.config.ts src/schemas.ts tests/build/links.test.ts
git commit -m "feat: ecosystem reference sub-page with model families and migrated prose"
```

---

## Task 16: CI gates — build, tests, link integrity, accessibility, performance

**Files:**
- Create: `.github/workflows/ci.yml`, `.lycheeignore`, `lighthouserc.json`
- Modify: `package.json`

**Interfaces:**
- Produces: a single `ci.yml` running on every PR and every push to `main`, with all four D6 gates.
- Consumes: `npm run build` and `npm test` from Task 1.

**The four gates, and why each one is a gate rather than a review item:**

| Gate | Tool | Why it cannot be a review item |
|---|---|---|
| Link integrity | **lychee** | R19 — the reference page is a map of links (C5), so link rot is the primary way this site silently degrades. Nobody notices by reading. |
| Accessibility | **Lighthouse CI**, `accessibility = 1.0` | R14 says "enforced as a CI gate, not a review item" in those words. |
| Collection schemas | **Astro/Zod**, inside `npm run build` | D4 — a malformed entry must fail CI, not render broken. |
| Performance budget | **Lighthouse CI** | R17 — a slow first paint defeats a pitch page, and payload creeps invisibly. |

**Lighthouse CI carries the accessibility gate rather than a separate axe run.** D6 permits either. Lighthouse runs axe internally in a real browser, which is where contrast and focus order are actually decidable; adding `@axe-core/playwright` would mean a second browser download for a strictly weaker check. The parity rules Lighthouse *cannot* see — hover/focus symmetry, payload presence — are already covered by `tests/hero.test.ts`.

- [ ] **Step 1: Write the lychee configuration**

Create `.lycheeignore`, reusing the packages' convention (`repos/HSSM/.lycheeignore`) verbatim, plus one addition:

```
# doi.org resolvers habitually 403 automated checkers; real DOI targets are stable
https://doi.org/.*
# huggingface.co rate-limits unauthenticated automated requests
https://huggingface.co/.*
```

- [ ] **Step 2: Write the Lighthouse budget**

Create `lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "url": ["http://localhost/index.html", "http://localhost/ecosystem/index.html"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:accessibility": ["error", { "minScore": 1 }],
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1500 }],
        "total-byte-weight": ["error", { "maxNumericValue": 1048576 }],
        "unused-javascript": ["warn", { "maxNumericValue": 10240 }],
        "uses-responsive-images": "off"
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

> **`total-byte-weight` is set to 1 MB deliberately.** Three self-hosted variable fonts
> plus four inlined SVG compositions is the whole payload; if a change pushes past 1 MB,
> something has been added that R17 should be asked about.

- [ ] **Step 3: Write the workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build-and-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc     # R18: pinned runtime
          cache: npm

      # R18: reproducible install against the committed lockfile. A contributor's
      # copy-edit PR must never fail for reasons unrelated to their change.
      - run: npm ci

      # Includes `astro check`, which is where the D4 collection schemas are enforced.
      - name: Build
        run: npm run build

      # Runs after the build because tests/build/*.test.ts read ./dist.
      - name: Tests
        run: npm test

      # R19 — the primary way this site silently degrades.
      - name: Link integrity
        uses: lycheeverse/lychee-action@v2
        with:
          args: >-
            --cache --max-cache-age 1d --no-progress
            './dist/**/*.html' './docs/**/*.md' 'README.md'
          fail: true

      # R14 (accessibility = 1.0) and R17 (performance budget).
      - name: Lighthouse
        run: npx --yes @lhci/cli@0.15.1 autorun
```

- [ ] **Step 4: Verify the gates locally before pushing**

Run each gate the way CI will, so a red build is not the first time you see it:

```bash
npm ci && npm run build && npm test
```

```bash
npx --yes @lhci/cli@0.15.1 autorun
```

Expected: `npm test` all green; Lighthouse asserts pass. **If accessibility is below 1.0, fix the page, not the threshold** — R14 makes this a gate precisely so the threshold is not the negotiable part.

- [ ] **Step 5: Commit**

```bash
git add .github/workflows/ci.yml .lycheeignore lighthouserc.json
git commit -m "ci: build, tests, link integrity, accessibility and performance gates"
```

---

## Task 17: Deploy, PR previews, drift detection, and citability

**Files:**
- Create: `.github/workflows/deploy.yml`, `.github/workflows/preview.yml`, `.github/workflows/drift.yml`
- Create: `CITATION.cff`, `LICENSE`, `LICENSE-CONTENT`, `scripts/make-og.mjs`, `public/og.png`
- Modify: `src/layouts/BaseLayout.astro`, `README.md`

**Interfaces:**
- Produces: production at the `gh-pages` branch root; PR previews at `gh-pages/pr-preview/pr-<N>/`.
- Consumes: `SITE_URL` and `BASE_PATH` from `astro.config.mjs` (Task 1) — this is where the env-driven base pays for itself.

**Both deploy paths use one mechanism, per the decision recorded at the top of this plan.** A branch-based deploy and an artifact-based deploy cannot both drive one Pages site, and previews are a C6 requirement, so the branch wins.

- [ ] **Step 1: Write the production deploy**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write     # publishing to the gh-pages branch

concurrency:
  group: pages-deploy
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci

      - name: Build
        env:
          # Repo variables. When the institutional domain lands (R21, D2), set
          # SITE_URL to it and BASE_PATH to '/', and add public/CNAME. No code change.
          SITE_URL: ${{ vars.SITE_URL }}
          BASE_PATH: ${{ vars.BASE_PATH }}
        run: npm run build

      - name: Publish to gh-pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
          clean: true
          # Preserve live PR previews when production redeploys.
          clean-exclude: pr-preview/
```

- [ ] **Step 2: Write the preview workflow**

Create `.github/workflows/preview.yml`. C6 requires contributors to "deploy and verify" unaided; this is what makes that true:

```yaml
name: PR preview

on:
  pull_request:
    types: [opened, synchronize, reopened, closed]

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: preview-${{ github.event.number }}
  cancel-in-progress: true

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm

      - if: github.event.action != 'closed'
        run: npm ci

      - if: github.event.action != 'closed'
        name: Build at the preview's own base path
        env:
          SITE_URL: ${{ vars.SITE_URL }}
          # The preview lives under a deeper prefix than production, which is exactly
          # why base is environment-driven rather than hard-coded.
          BASE_PATH: ${{ vars.BASE_PATH }}pr-preview/pr-${{ github.event.number }}/
        run: npm run build

      - uses: rossjrw/pr-preview-action@v1
        with:
          source-dir: dist
          preview-branch: gh-pages
          umbrella-dir: pr-preview
          action: auto      # deploys on open/sync, removes on close
```

- [ ] **Step 3: Write the drift workflow**

Create `.github/workflows/drift.yml`, on the packages' existing pattern (`repos/HSSM/.github/workflows/drift.yml`). The deliberate divergence D6 records: the default build is **pinned** for reproducibility, and drift runs **unpinned** on a schedule, so both properties are had at once.

```yaml
name: Drift

# Scheduled drift detection, on the pattern the three packages already run (C9).
# The default build is pinned (npm ci against a committed lockfile) so a contributor's
# copy-edit PR never fails for an unrelated reason. This job does the opposite: a
# fresh, unpinned resolve, so an upstream break surfaces here as ONE deduped
# `drift`-labelled issue for the healing queue rather than in someone's PR.
on:
  schedule:
    - cron: "0 6 * * 1"     # weekly, Mondays
  workflow_dispatch:

permissions:
  contents: read

jobs:
  unpinned:
    runs-on: ubuntu-latest
    outputs:
      result: ${{ job.status }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version-file: .nvmrc }

      - name: Resolve dependencies fresh
        run: rm -f package-lock.json && npm install

      - run: npm run build
      - run: npm test

      - uses: lycheeverse/lychee-action@v2
        with:
          args: "--no-progress './dist/**/*.html' './docs/**/*.md' 'README.md'"
          fail: true

  report:
    needs: [unpinned]
    if: always()
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: write
    concurrency:
      group: drift-issue-${{ github.repository }}
      cancel-in-progress: false
    steps:
      - name: Create, update, or close the deduped drift issue
        env:
          GH_TOKEN: ${{ github.token }}
          RESULT: ${{ needs.unpinned.result }}
        run: |
          set -euo pipefail
          KEY="drift-key: HSSMEco_Webpage-scheduled"
          TITLE="drift: HSSMEco_Webpage scheduled checks failing"
          RUN_URL="$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"

          EXISTING=$(gh issue list --label drift --state open --limit 50 \
            --json number,body --jq ".[] | select(.body | contains(\"$KEY\")) | .number" | head -1)

          if [ "$RESULT" = "success" ]; then
            if [ -n "$EXISTING" ]; then
              gh issue comment "$EXISTING" --body "Green again: $RUN_URL"
              gh issue close "$EXISTING"
            fi
            exit 0
          fi

          BODY=$(printf '%s\n\n%s\n\nRun: %s\n' \
            "An unpinned dependency resolve broke the build, the tests or the link check." \
            "<!-- $KEY -->" "$RUN_URL")

          if [ -n "$EXISTING" ]; then
            gh issue comment "$EXISTING" --body "Still failing: $RUN_URL"
          else
            gh issue create --title "$TITLE" --label drift --body "$BODY"
          fi
```

- [ ] **Step 4: Add the citability artifacts (D11)**

`CITATION.cff`:

```yaml
cff-version: 1.2.0
message: If you refer to the HSSM ecosystem, please cite the paper below.
title: The HSSM Ecosystem
abstract: >-
  Landing page and reference for the HSSM ecosystem — hierarchical Bayesian
  inference for neurocognitive process models.
type: software
authors:
  - family-names: Fengler
    given-names: Alexander
  - family-names: Xu
    given-names: Paul
  - family-names: Bera
    given-names: Krishn
  - family-names: Paniagua
    given-names: Carlos
  - family-names: Omar
    given-names: Aisulu
  - family-names: Frank
    given-names: Michael J.
license: MIT
preferred-citation:
  type: article
  title: >-
    HSSM: A Widely Applicable Toolbox for Hierarchical Bayesian Neurocognitive
    Modeling
  authors:
    - family-names: Fengler
      given-names: Alexander
    - family-names: Xu
      given-names: Paul
    - family-names: Bera
      given-names: Krishn
    - family-names: Paniagua
      given-names: Carlos
    - family-names: Omar
      given-names: Aisulu
    - family-names: Frank
      given-names: Michael J.
  journal: bioRxiv
  year: 2026
  doi: 10.64898/2026.06.05.730398
```

> **Verify the given names against the preprint before committing.** They are not in
> the local metadata this plan could check, only the family names are (content spec
> §10). Open `HSSM-preprint/HSSM_Ecosystem_paper.pdf` and correct any that are wrong —
> a citation file with a wrong initial is worse than none.

Add `LICENSE` (MIT, © Brown University) and `LICENSE-CONTENT` (CC-BY 4.0 full text, covering prose and figures). Note in `README.md` which covers what — D11 makes the split deliberate, and an unexplained split reads as an accident.

- [ ] **Step 5: Generate the Open Graph image**

Create `scripts/make-og.mjs`. `sharp` already ships with Astro's image service, so this adds no dependency:

```js
// Renders the social card once. Run by hand; commit public/og.png.
//   node scripts/make-og.mjs
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

// Monochrome, flush left, Display XL — the page's own system at card size (§6.2).
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#FCFBF8"/>
  <rect x="80" y="150" width="1040" height="1.5" fill="#14130F"/>
  <text x="80" y="120" font-family="JetBrains Mono" font-size="22"
        letter-spacing="4" fill="#706B63">HSSM ECOSYSTEM</text>
  <text x="80" y="290" font-family="Space Grotesk" font-weight="700" font-size="86"
        letter-spacing="-2" fill="#14130F">Model what you mean.</text>
  <text x="80" y="360" font-family="IBM Plex Sans" font-size="30" fill="#4B4740">
    Hierarchical Bayesian inference for neurocognitive process models.
  </text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync('public/og.png', png);
console.log('wrote public/og.png');
```

Run it:

```bash
node scripts/make-og.mjs
```

> The three families must be installed **on the machine running this script** for the
> text to render in them — `sharp` uses the system font stack, not the site's
> self-hosted files. Install them locally first, or accept the fallback and redo the
> card in a vector editor. Check the output before committing; a card with fallback
> typography is the most-shared image the project has.

Then add to `<head>` in `src/layouts/BaseLayout.astro`, after the canonical link:

```astro
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={new URL('og.png', Astro.site).href} />
    <meta name="twitter:card" content="summary_large_image" />
```

- [ ] **Step 6: Configure the repository (human steps — the agent cannot do these)**

These need repository-settings access:

1. **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `(root)`.**
2. **Settings → Secrets and variables → Actions → Variables**, add:
   - `SITE_URL` = `https://<org>.github.io` (or the custom domain once D2 closes)
   - `BASE_PATH` = `/HSSMEco_Webpage/` (or `/` on a custom domain)
3. **Settings → Actions → General → Workflow permissions: Read and write**, so `deploy.yml` and `preview.yml` can push to `gh-pages`.
4. Create the `drift` label if it does not exist.

- [ ] **Step 7: Verify the deployment end to end**

Push a branch, open a PR, and confirm:
- CI runs all four gates and passes.
- `preview.yml` comments a preview URL on the PR, and **the preview's internal links work** — this is what the environment-driven `BASE_PATH` exists to prove.
- Merging deploys to production and the preview is removed.

- [ ] **Step 8: Commit**

```bash
git add .github/workflows CITATION.cff LICENSE LICENSE-CONTENT scripts public/og.png src/layouts/BaseLayout.astro README.md
git commit -m "ci: deploy to gh-pages with PR previews, drift detection, and citability artifacts"
```

---

## Launch checklist — the human steps this plan cannot do

Every item below is blocking for launch and none is an engineering task. They are listed here because tech spec §7 tracks them as open dependencies and a finished build with an unregistered domain is not a launched site.

| # | Item | Owner | Why it blocks |
|---|---|---|---|
| 1 | **Register the domain institutionally** (Brown, Carney, or CCV) with auto-renew | Owner | R21, D2. A lapsed personal card 404-ing a paper-cited URL is the single likeliest long-term failure of the whole site, and it is not a technical one |
| 2 | Set `SITE_URL` / `BASE_PATH` repo variables and add `public/CNAME` | Owner | Depends on 1 |
| 3 | **HSSMSpine content ownership handoff** | Owner | Content spec §1. Until it happens there are two maintained descriptions of the ecosystem, which is the drift this page exists to end |
| 4 | Add `mkdocs-redirects` from `HSSM/ecosystem/` to this page | Owner | R4. Implemented on the HSSM docs side, not here |
| 5 | **Copy sign-off** — tagline, subline, hero payloads, section prose | Copy | Everything shipped is draft, written to the spec's briefs. All of it is YAML |
| 6 | Supply real worked-example PNGs when ready | Owner | Placeholders ship in pass 1 (C13). Drop files into `src/assets/figures/` |
| 7 | Verify author given names in `CITATION.cff` against the preprint | Owner | Family names are verified (content spec §10); given names are not |
| 8 | Confirm MIT is acceptable to Brown for the site code | Owner | Decision I. HSSM itself carries a Brown custom licence |
| 9 | Archival snapshot on publication (Software Heritage or Wayback) | Owner | D11 — so a 2029 reader of the preprint finds what was cited |
| 10 | **Upstream**: generated model-listing pages in HSSM and `ssm-simulators` docs | Infra | R26. Until these exist the reference page's outbound links are weak, and it says so on the page |
| 11 | Fix the stale citation in the HSSM docs `index.md` (omits Paniagua, says "in preparation") | Infra | Content spec §10. This page links to both; they should not disagree |
| 12 | Decide D7 (instrumentation) before launch, not after | Owner | Deferring past launch forfeits the launch-window baseline, which is the most informative data the page will ever produce. R20's hooks are already in place, so saying yes is one line |

---

## What this plan deliberately does not build

Recorded so it is not mistaken for an oversight.

| Item | Why | Where it lives |
|---|---|---|
| Animation of any kind | Pass 2, D3 open by decision. Pass 1 owes it only addressable elements (R24), which Tasks 12–13 deliver | Tech spec D3; future-features §1.2 |
| The asset generation pipeline | Never in this repo (C13). Figures are supplied as PNG/SVG files | Tech spec D8, C13 |
| Generated model cartoons via `plot_model_cartoon` | Generated outside this repo if at all. Task 13's tiles are hand-authored SVG; swapping them is a file replacement | Tech spec R7, C13 |
| Domain application showcase | Tier 1 backlog, and a dedicated page rather than a landing-page section | Future-features §1.1 |
| Analytics | D7 open. R20's hooks ship, so activation is one line | Tech spec D7 |
| Site search, i18n, a component library | Explicitly skipped | Tech spec §6 |
| Third-party *stack* logo strip in §6.6 (PyMC, Bambi, …) | Those wordmarks are not in `assets/logos/`. Names ship. Package and BRAINSTORM marks from `assets/logos/` **are** in scope | Task 7; decision J |

---

## Self-review

**Spec coverage.** Every numbered requirement maps to a task:

| Requirement | Task | | Requirement | Task |
|---|---|---|---|---|
| R1 static output | 1 | | R14 accessibility gate | 5, 12, 14, 16 |
| R2 two pages | 1, 15 | | R15 theming before artwork | 2, 4 |
| R4 own a redirect | Launch #4 | | R16 low maintenance | 6 (YAML), 17 |
| R5 stable URLs | 15, 17 | | R17 fast | 3, 16 |
| R6 inlined SVG | 9, 11, 13 | | R18 reproducible builds | 1, 16 |
| R7 editable source | 10, 13 | | R19 link integrity gate | 16 |
| R8 clickable tiles | 12, 13, 15 | | R20 instrumentation hooks | 14 |
| R9 mobile composition | 13 | | R21 no personal billing | Launch #1 |
| R10 static-first | 11, 13, 14 | | R22 hover reveals detail | 12 |
| R11 one code block | 11 | | R23 hover/focus/tap parity | 12 |
| R13 no model counts | 6, 9, 15 | | R24 addressable elements | 12, 13 |
| R25 selection not catalogue | 6, 9, 15 | | R26 weak link targets named | 6, 15 |

Design philosophy: colour law → Task 2; typography → 3; layout and rhythm → 5; plates → 5, 11; iconography → 9; light/dark → 2, 4; motion (pass-1 prohibition) → 2, 12; accessibility → throughout.

Content spec: §6.1/§6.1a → Tasks 12–14; §6.2 → 7; §6.3 → 10, 11; §6.4 → 8; §6.5 → 9; §6.6 → 7; §13 → 15.

**Two spec statements this plan contradicts, both recorded above rather than silently:**
1. Three design philosophy token values fail WCAG AA and are corrected in Task 2, with measured before/after ratios.
2. D6's implied `withastro/action` deploy is replaced by a branch deploy, because it cannot coexist with the PR previews C6 requires.

**Six open items decided rather than deferred** (A–I at the top), each stored in one file so sign-off is a data diff.

---

## Execution

**Plan saved to `docs/superpowers/plans/2026-08-14-ecosystem-landing-page-pass-1.md`.**

All 17 tasks are Node-only. Task 10 commits placeholder figures; real PNGs are a file drop, not a Python step (C13).
