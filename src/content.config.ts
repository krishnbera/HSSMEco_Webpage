import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { heroElementSchema, modelFamilySchema, capabilitySchema } from './schemas';

// One file, edited as a unit — the ~120-word budget is a whole-file property (§6.1a).
const heroCopy = defineCollection({
  loader: file('src/content/copy/hero.yaml'),
  schema: heroElementSchema,
});

// NOTE: site.yaml is deliberately NOT a collection. The file loader expects an array
// of entries or an object keyed by id, and site.yaml is a single nested document —
// wrapping it in a synthetic collection buys nothing. Pages import it directly:
//
//   import raw from '../content/copy/site.yaml?raw';
//   const copy = siteCopySchema.parse(load(raw));
//
// The schema is the contract either way, and tests/schemas.test.ts validates the file
// independently of how it is loaded.

// One file per entry — the scverse contribution model D4 adopts: schema-validated,
// submitted by PR, with a clean per-entry diff. The filename becomes the anchor id.
const modelFamilies = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/model-families' }),
  schema: modelFamilySchema,
});

const capabilities = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/capabilities' }),
  schema: capabilitySchema,
});

export const collections = { heroCopy, modelFamilies, capabilities };
