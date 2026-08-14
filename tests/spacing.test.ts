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
