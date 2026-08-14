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
