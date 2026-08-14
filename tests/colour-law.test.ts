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
