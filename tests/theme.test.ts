import { describe, it, expect } from 'vitest';
import { readDist, readDistText } from './helpers/dom';

describe('theme is applied before first paint (§9.3)', () => {
  it('an inline script in <head> runs before any stylesheet link', () => {
    const head = readDistText('index.html').split('</head>')[0];
    const scriptAt = head.search(/<script[^>]*>(?![^<]*src=)/);
    const styleAt = head.search(/<link[^>]+rel="stylesheet"/);
    expect(scriptAt).toBeGreaterThan(-1);
    if (styleAt > -1) expect(scriptAt).toBeLessThan(styleAt);
  });

  it('the inline script reads the persisted key and sets data-theme', () => {
    const head = readDistText('index.html').split('</head>')[0];
    expect(head).toMatch(/hssm-theme/);
    expect(head).toMatch(/data-theme|dataset\.theme/);
  });

  it('the theme script is inline, not an external request', () => {
    const head = readDistText('index.html').split('</head>')[0];
    const inline = [...head.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)];
    expect(inline.some((m) => m[1].includes('hssm-theme'))).toBe(true);
  });
});

describe('the toggle is an accessible control (R14)', () => {
  it('has an accessible name and a pressed state', () => {
    const btn = readDist('index.html').querySelector('#theme-toggle');
    expect(btn).not.toBeNull();
    expect(btn!.getAttribute('aria-pressed')).toMatch(/^(true|false)$/);
    const name = btn!.getAttribute('aria-label') ?? btn!.textContent?.trim() ?? '';
    expect(name.length).toBeGreaterThan(0);
  });
});
