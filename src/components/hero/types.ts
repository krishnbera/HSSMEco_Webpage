import type { z } from 'astro/zod';
import type { heroElementSchema } from '../../schemas';

export type HeroElementData = z.infer<typeof heroElementSchema> & { id: string };
