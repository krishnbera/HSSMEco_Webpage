import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'js-yaml';
import { renderComponent } from './helpers/dom';
import HeroElement from '../src/components/hero/HeroElement.astro';
import Hero from '../src/components/hero/Hero.astro';
import { siteCopySchema, heroElementSchema } from '../src/schemas';

const linked = { id: 'model-ddm', kind: 'model', label: 'Drift diffusion',
                 payload: 'Evidence accumulates to one of two boundaries.', href: '/ecosystem/#diffusion' };
const plain  = { id: 'stream-neural', kind: 'stream', label: 'Neural',
                 payload: 'Trial-wise EEG or fMRI enters the generative model.' };

const site = siteCopySchema.parse(
  load(readFileSync(join(process.cwd(), 'src/content/copy/site.yaml'), 'utf-8')),
);
const elements = Object.fromEntries(
  Object.entries(load(readFileSync(join(process.cwd(), 'src/content/copy/hero.yaml'), 'utf-8')) as any)
    .map(([id, el]) => [id, { id, ...heroElementSchema.parse(el) }]),
);
const heroProps = { copy: site, elements };

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
    const a = await renderComponent(HeroElement, { props: linked });
    const linkedEl = a.querySelector('[data-hero-el]')!;
    // Anchors get AccName from contents; do not require aria-* overrides.
    expect(linkedEl.textContent ?? '').toContain(linked.label);

    const d = await renderComponent(HeroElement, { props: plain });
    const unlinked = d.querySelector('[data-hero-el]')!;
    // role="group" AccName is author-provided only — not from contents.
    const labelledBy = unlinked.getAttribute('aria-labelledby');
    const ariaLabel = unlinked.getAttribute('aria-label');
    expect(labelledBy || ariaLabel).toBeTruthy();
    if (labelledBy) {
      expect(d.getElementById(labelledBy)!.textContent!.trim()).toBe(plain.label);
    } else {
      expect(ariaLabel).toBe(plain.label);
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
    // 48em aligns with the tokens mobile type band (Task 9 pattern; bare px fails §6.4).
    expect(css).toMatch(/@media\s*\(max-width:\s*48em\)/);
    expect(css).toMatch(/grid-template-areas/);
  });

  it('hides the connective paths on mobile rather than reflowing them', () => {
    // The single-column stack makes the arrows meaningless; the captions carry the
    // relationship instead (§6.1: "flanks stack beneath the core, or degrade to captions").
    expect(css).toMatch(/@media[^{]*max-width:\s*48em[^{]*\{[\s\S]*\.hero__paths[\s\S]*display:\s*none/);
  });
});
