import { describe, it, expect } from 'vitest';
import { readDist } from '../helpers/dom';

describe('built pages carry semantic landmarks (R14)', () => {
  it('index.html has a single main landmark, a header, a footer and a title', () => {
    const doc = readDist('index.html');
    expect(doc.querySelectorAll('main')).toHaveLength(1);
    expect(doc.querySelector('header')).not.toBeNull();
    expect(doc.querySelector('footer')).not.toBeNull();
    expect(doc.title.length).toBeGreaterThan(0);
  });

  it('index.html declares a language and a canonical URL (D11)', () => {
    const doc = readDist('index.html');
    expect(doc.documentElement.getAttribute('lang')).toBe('en');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://krishnbera.github.io/HSSMEco_Webpage/',
    );
  });

  it('index.html carries Open Graph and Twitter card tags (D11)', () => {
    const doc = readDist('index.html');
    expect(doc.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('website');
    expect(doc.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBeTruthy();
    expect(doc.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBeTruthy();
    expect(doc.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
      'https://krishnbera.github.io/HSSMEco_Webpage/',
    );
    expect(doc.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://krishnbera.github.io/HSSMEco_Webpage/og.png',
    );
    expect(doc.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe(
      'summary_large_image',
    );
  });
});
