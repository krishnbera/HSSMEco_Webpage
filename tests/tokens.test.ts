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
