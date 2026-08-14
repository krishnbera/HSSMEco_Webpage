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
