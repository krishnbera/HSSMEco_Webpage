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
