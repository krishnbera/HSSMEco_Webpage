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
