import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'js-yaml';
import { renderComponent } from './helpers/dom';
import { siteCopySchema } from '../src/schemas';
import PayoffBand from '../src/components/sections/PayoffBand.astro';
import Credibility from '../src/components/sections/Credibility.astro';

const copy = siteCopySchema.parse(
  load(readFileSync(join(process.cwd(), 'src/content/copy/site.yaml'), 'utf-8')),
);

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
