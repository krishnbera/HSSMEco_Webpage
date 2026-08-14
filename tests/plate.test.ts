import { describe, it, expect } from 'vitest';
import { renderComponent } from './helpers/dom';
import Plate from '../src/components/Plate.astro';

const props = {
  figure: 2,
  title: 'Posterior distributions for drift rate and boundary separation',
  desc: 'Two density curves per parameter, one per conflict condition. The boundary '
      + 'separation densities are clearly separated; the drift rate densities overlap.',
  caption: 'Colour encodes posterior mass; the two conditions are distinguished by position, not hue alone.',
};

describe('Plate carries the §7.3 accessibility contract', () => {
  it('exposes the figure as an image with a title and desc', async () => {
    const doc = await renderComponent(Plate, { props, slots: { default: '<svg viewBox="0 0 10 10"></svg>' } });
    const fig = doc.querySelector('[role="img"]')!;
    expect(fig).not.toBeNull();

    const ids = fig.getAttribute('aria-labelledby')!.split(/\s+/);
    expect(ids).toHaveLength(2);
    for (const id of ids) expect(doc.getElementById(id)).not.toBeNull();

    expect(doc.getElementById(ids[0])!.textContent).toBe(props.title);
    expect(doc.getElementById(ids[1])!.textContent).toBe(props.desc);
  });

  it('numbers the caption in mono and states how to read the figure (§7.2)', async () => {
    const doc = await renderComponent(Plate, { props, slots: { default: '<svg/>' } });
    const cap = doc.querySelector('figcaption')!;
    expect(cap.className).toContain('caption');
    expect(cap.textContent).toContain('Figure 2.');
    expect(cap.textContent).toContain(props.caption);
  });

  it('gives distinct ids to distinct plates, so two on one page do not collide', async () => {
    const a = await renderComponent(Plate, { props, slots: { default: '<svg/>' } });
    const b = await renderComponent(Plate, { props: { ...props, figure: 3 }, slots: { default: '<svg/>' } });
    expect(a.querySelector('[role="img"]')!.getAttribute('aria-labelledby'))
      .not.toBe(b.querySelector('[role="img"]')!.getAttribute('aria-labelledby'));
  });
});

describe('SectionRule opens a section (§6.3)', () => {
  it('renders the mono section number and the title', async () => {
    const SectionRule = (await import('../src/components/SectionRule.astro')).default;
    const doc = await renderComponent(SectionRule, { props: { number: '03', title: 'Worked example' } });
    const eyebrow = doc.querySelector('.label')!;
    expect(eyebrow.textContent).toContain('§ 03');
    expect(eyebrow.textContent).toContain('Worked example');
  });
});
