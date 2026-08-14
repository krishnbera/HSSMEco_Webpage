import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Defaults describe the project-pages URL of the current remote. CI overrides both.
// When the institutional domain lands (R21), set SITE_URL and BASE_PATH='/' as repo
// variables and add public/CNAME — no source change.
const SITE = process.env.SITE_URL ?? 'https://krishnbera.github.io';
const BASE = process.env.BASE_PATH ?? '/HSSMEco_Webpage/';
const local = fontProviders.local();

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  fonts: [
    {
      provider: local,
      name: 'Space Grotesk',
      cssVariable: '--font-display',
      options: {
        variants: [{ src: ['./src/assets/fonts/SpaceGrotesk.woff2'], weight: '300 700', style: 'normal' }],
      },
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      subsets: ['latin'],
    },
    {
      provider: local,
      name: 'IBM Plex Sans',
      cssVariable: '--font-text',
      options: {
        variants: [{ src: ['./src/assets/fonts/IBMPlexSans.woff2'], weight: '100 700', style: 'normal' }],
      },
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      subsets: ['latin'],
    },
    {
      provider: local,
      // Shared with matplotlib (§5.2, D10): generated figures set svg.fonttype:'none'
      // and reference this family by name, so the browser must have it.
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      options: {
        variants: [{ src: ['./src/assets/fonts/JetBrainsMono.woff2'], weight: '100 800', style: 'normal' }],
      },
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      subsets: ['latin'],
    },
  ],
});
