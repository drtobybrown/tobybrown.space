// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Use root base (custom domain tobybrown.space is served from domain root)
const base = '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://tobybrown.space',
  base,
  integrations: [sitemap()],
});
