import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Defaults describe the project-pages URL of the current remote. CI overrides both.
// When the institutional domain lands (R21), set SITE_URL and BASE_PATH='/' as repo
// variables and add public/CNAME — no source change.
const SITE = process.env.SITE_URL ?? 'https://krishnbera.github.io';
const BASE = process.env.BASE_PATH ?? '/HSSMEco_Webpage/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
