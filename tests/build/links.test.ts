import { describe, it, expect } from 'vitest';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { readDist } from '../helpers/dom';

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
