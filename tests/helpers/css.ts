import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const TOKENS = 'src/styles/tokens.css';

function block(css: string, selector: string): string {
  const i = css.indexOf(selector);
  if (i === -1) throw new Error(`selector not found in tokens.css: ${selector}`);
  const open = css.indexOf('{', i);
  const close = css.indexOf('}', open);
  return css.slice(open + 1, close);
}

function pairs(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of text.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

export function readTokens() {
  const css = readFileSync(join(process.cwd(), TOKENS), 'utf-8');
  return {
    light: pairs(block(css, ':root {')),
    dark: pairs(block(css, ':root[data-theme="dark"] {')),
  };
}

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (['.css', '.astro', '.svg'].includes(extname(p))) acc.push(p);
  }
  return acc;
}

/** Every style-bearing source file except the two allowlisted by the colour law. */
export function sourceStyleFiles() {
  const ALLOW = [
    TOKENS,
    'src/styles/plate.css',         // §4.5 "on plate": light ink in BOTH modes,
                                    // so it cannot be var(--ink), which inverts
  ];
  return walk(join(process.cwd(), 'src'))
    .map((p) => p.replace(process.cwd() + '/', ''))
    .filter((p) => !ALLOW.includes(p))
    .map((path) => ({ path, text: readFileSync(join(process.cwd(), path), 'utf-8') }));
}
