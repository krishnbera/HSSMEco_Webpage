// Renders the social card once. Run by hand; commit public/og.png.
//   node scripts/make-og.mjs
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

// Monochrome, flush left, Display XL — the page's own system at card size (§6.2).
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#FCFBF8"/>
  <rect x="80" y="150" width="1040" height="1.5" fill="#14130F"/>
  <text x="80" y="120" font-family="JetBrains Mono" font-size="22"
        letter-spacing="4" fill="#706B63">HSSM ECOSYSTEM</text>
  <text x="80" y="290" font-family="Space Grotesk" font-weight="700" font-size="86"
        letter-spacing="-2" fill="#14130F">Model what you mean.</text>
  <text x="80" y="360" font-family="IBM Plex Sans" font-size="30" fill="#4B4740">
    Hierarchical Bayesian inference for neurocognitive process models.
  </text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync('public/og.png', png);
console.log('wrote public/og.png');
