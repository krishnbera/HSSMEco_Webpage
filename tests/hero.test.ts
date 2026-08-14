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
