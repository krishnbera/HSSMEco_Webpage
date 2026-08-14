import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parseHTML } from 'linkedom';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

/** Render a single .astro component to a Document, without booting the content layer. */
export async function renderComponent(
  Component: AstroComponentFactory,
  opts: { props?: Record<string, unknown>; slots?: Record<string, string> } = {},
): Promise<Document> {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Component, opts);
  return parseHTML(`<!doctype html><html><body>${html}</body></html>`).document;
}

/** Read a file produced by `astro build`. Fails loudly if the build was not run. */
export function readDist(relPath: string): Document {
  const abs = join(process.cwd(), 'dist', relPath);
  return parseHTML(readFileSync(abs, 'utf-8')).document;
}

export function readDistText(relPath: string): string {
  return readFileSync(join(process.cwd(), 'dist', relPath), 'utf-8');
}
