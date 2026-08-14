import { z } from 'astro/zod';

/** One addressable element in the hero (content spec §6.1a). */
export const heroElementSchema = z.object({
  kind: z.enum(['model', 'contribute', 'module', 'stream', 'return']),
  label: z.string().min(1),
  /** One line. Reachable by hover, focus AND tap — never hover-only (R23). */
  payload: z.string().min(1),
  /** Model tiles, the "+" tile and module tiles link out; streams and returns do not. */
  href: z.string().url().or(z.string().startsWith('/')).optional(),
  /** Exactly one model tile is the highlighted "model currently in use" (§6.1). */
  active: z.boolean().default(false),
});

export const modelFamilySchema = z.object({
  title: z.string().min(1),
  /** One line each (§13). */
  summary: z.string().min(1),
  links: z.array(z.object({
    label: z.string().min(1),
    href: z.string().url(),
    /** R26: the canonical targets do not exist upstream yet. State what this
        actually is, so a visitor is not surprised by where they land. */
    note: z.string().min(1),
  })).min(1),
  order: z.number().int(),
});

export const capabilitySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  /** Filename in src/components/icons/, without extension. */
  icon: z.string().regex(/^[a-z0-9-]+$/),
  order: z.number().int(),
});

/** One section of the Ecosystem reference sub-page (§13). */
export const referenceSectionSchema = z.object({
  title: z.string().min(1),
  order: z.number().int(),
});

export const siteCopySchema = z.object({
  tagline: z.string(),
  subline: z.string(),
  ctaPrimary: z.object({ label: z.string(), href: z.string().url(), hook: z.string() }),
  ctaSecondary: z.object({ label: z.string(), href: z.string(), hook: z.string() }),
  heroCaptions: z.object({ left: z.string(), right: z.string() }),
  payoff: z.object({
    heading: z.string(),
    columns: z.array(z.object({
      field: z.string(),   // the field-level claim
      me: z.string(),      // the me-level cash-out — §4's governing content rule
      links: z.array(z.object({ label: z.string(), href: z.string() })),
    })).length(2),
  }),
  workedExample: z.object({
    heading: z.string(),
    intro: z.string(),
    formulaChip: z.string(),
    panels: z.array(z.object({ title: z.string(), caption: z.string() })).length(4),
    recovery: z.object({ text: z.string(), href: z.string().url() }),
  }),
  chain: z.object({
    heading: z.string(),
    steps: z.array(z.object({ label: z.string(), package: z.string(), href: z.string().url() })).length(4),
    caption: z.string(),
    referenceLink: z.object({ label: z.string(), href: z.string() }),
  }),
  capabilities: z.object({ heading: z.string(), selectionNote: z.string() }),
  credibility: z.object({
    lineage: z.string(),
    institutions: z.string(),
    funding: z.string(),
    paper: z.object({ text: z.string(), href: z.string().url() }),
    builtOn: z.array(z.string()),
    community: z.string(),
  }),
});
