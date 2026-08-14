import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'js-yaml';
import { renderComponent } from './helpers/dom';
import { siteCopySchema, capabilitySchema } from '../src/schemas';
import PayoffBand from '../src/components/sections/PayoffBand.astro';
import Credibility from '../src/components/sections/Credibility.astro';
import FourStepChain from '../src/components/sections/FourStepChain.astro';
import CapabilityGrid from '../src/components/sections/CapabilityGrid.astro';

const copy = siteCopySchema.parse(
  load(readFileSync(join(process.cwd(), 'src/content/copy/site.yaml'), 'utf-8')),
);

const capabilities = readdirSync(join(process.cwd(), 'src/content/capabilities'))
  .filter((f) => f.endsWith('.yaml'))
  .map((f) => ({
    id: f.replace(/\.yaml$/, ''),
    data: capabilitySchema.parse(load(readFileSync(join(process.cwd(), 'src/content/capabilities', f), 'utf-8'))),
  }))
  .sort((a, b) => a.data.order - b.data.order);

describe('PayoffBand gives both roles equal billing (§6.2)', () => {
  it('renders exactly two columns', async () => {
    const doc = await renderComponent(PayoffBand, { props: { copy: copy.payoff } });
    expect(doc.querySelectorAll('[data-payoff-column]')).toHaveLength(2);
  });

  it('pairs a field-level claim with a me-level cash-out in each column (§4 governing rule)', async () => {
    const doc = await renderComponent(PayoffBand, { props: { copy: copy.payoff } });
    for (const col of doc.querySelectorAll('[data-payoff-column]')) {
      expect(col.querySelector('[data-claim="field"]')?.textContent?.trim()).toBeTruthy();
      expect(col.querySelector('[data-claim="me"]')?.textContent?.trim()).toBeTruthy();
    }
  });

  it('gives the two columns identical markup, so neither can outweigh the other', async () => {
    const doc = await renderComponent(PayoffBand, { props: { copy: copy.payoff } });
    const [a, b] = [...doc.querySelectorAll('[data-payoff-column]')];
    expect(a.className).toBe(b.className);
  });
});

describe('Credibility carries trust signals without dominating (§6.6)', () => {
  it('states the HDDM lineage as studies, not citations (content spec §10)', async () => {
    const doc = await renderComponent(Credibility, { props: { copy: copy.credibility } });
    const text = doc.body.textContent ?? '';
    expect(text).toContain('published studies');
    expect(text).not.toContain('citations');
  });

  it('links the preprint by DOI and never calls it "under review" (§10)', async () => {
    const doc = await renderComponent(Credibility, { props: { copy: copy.credibility } });
    expect(doc.querySelector('a[href*="doi.org"]')).not.toBeNull();
    expect(doc.body.textContent).not.toMatch(/under review|in preparation/i);
  });

  it('names Paniagua in the author list (§10 required correction)', async () => {
    const doc = await renderComponent(Credibility, { props: { copy: copy.credibility } });
    expect(doc.body.textContent).toContain('Paniagua');
  });
});

describe('FourStepChain supports the double reading (§6.4)', () => {
  it('renders four steps as an ordered list, not as a picture', async () => {
    const doc = await renderComponent(FourStepChain, { props: { copy: copy.chain } });
    const items = doc.querySelectorAll('ol li');
    expect(items).toHaveLength(4);
    expect(doc.querySelector('svg')).toBeNull();
  });

  it('names the owning package on every step', async () => {
    const doc = await renderComponent(FourStepChain, { props: { copy: copy.chain } });
    const packages = [...doc.querySelectorAll('[data-package]')].map((n) => n.textContent?.trim());
    expect(packages).toEqual(['ssm-simulators', 'LANfactory', 'HuggingFace', 'HSSM']);
  });

  it('makes both readings explicit in the caption — the point of the section', async () => {
    const doc = await renderComponent(FourStepChain, { props: { copy: copy.chain } });
    const caption = doc.querySelector('[data-chain-caption]')!.textContent!;
    expect(caption).toMatch(/only ever touch step four/i);   // the experimentalist reading
    expect(caption).toMatch(/contributing a model/i);        // the theorist reading
  });

  it('links to the reference sub-page exactly once (§6.4: "linked once from here")', async () => {
    const doc = await renderComponent(FourStepChain, { props: { copy: copy.chain } });
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const expected = `${base}/ecosystem/`;
    const internal = [...doc.querySelectorAll('a')].filter((a) => {
      const href = a.getAttribute('href') ?? '';
      return href.endsWith('/ecosystem/') && href === expected;
    });
    expect(internal).toHaveLength(1);
  });
});

describe('the icon set follows the capsule pen (§8.1, §8.2)', () => {
  const files = readdirSync(join(process.cwd(), 'src/components/icons')).filter((f) => f.endsWith('.svg'));

  it('has one icon per capability, and no orphans', () => {
    const needed = capabilities.map((c) => `${c.data.icon}.svg`).sort();
    expect(files.sort()).toEqual(needed);
  });

  for (const f of files) {
    const svg = readFileSync(join(process.cwd(), 'src/components/icons', f), 'utf-8');

    it(`${f} is drawn on the 24x24 grid`, () => {
      expect(svg).toMatch(/viewBox="0 0 24 24"/);
    });

    it(`${f} uses round caps and joins, 2px stroke, no fill`, () => {
      expect(svg).toMatch(/stroke-linecap="round"/);
      expect(svg).toMatch(/stroke-linejoin="round"/);
      expect(svg).toMatch(/stroke-width="2"/);
      expect(svg).toMatch(/fill="none"/);
    });

    it(`${f} takes its colour from CSS, never from a literal (§4.5)`, () => {
      expect(svg).toMatch(/stroke="currentColor"/);
      expect(svg).not.toMatch(/#[0-9a-fA-F]{3,8}/);
    });
  }
});

describe('CapabilityGrid reads as a selection, not a catalogue (R25, §10)', () => {
  const props = { items: capabilities, copy: copy.capabilities };

  it('renders all eight capabilities', async () => {
    const doc = await renderComponent(CapabilityGrid, { props });
    expect(doc.querySelectorAll('[data-capability]')).toHaveLength(8);
  });

  it('carries the selection note prominently, not as a footnote', async () => {
    const doc = await renderComponent(CapabilityGrid, { props });
    expect(doc.querySelector('[data-selection-note]')?.textContent)
      .toContain('A selection, not a catalogue');
  });

  it('states no model count anywhere (R13)', async () => {
    const doc = await renderComponent(CapabilityGrid, { props });
    expect(doc.body.textContent ?? '')
      .not.toMatch(/\b\d[\d,]*\+?\s*(models|simulators|configurations|networks)\b/i);
  });

  it('marks icons decorative — the title is the accessible text', async () => {
    const doc = await renderComponent(CapabilityGrid, { props });
    for (const svg of doc.querySelectorAll('[data-capability] svg')) {
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    }
  });
});
