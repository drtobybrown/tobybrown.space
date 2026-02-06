// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Use root base in dev to avoid favicon/public asset errors; use project path for GitHub Pages build
const isDev = process.env.NODE_ENV === 'development';
const base = isDev ? '/' : '/tobybrown.space/';

// https://astro.build/config
export default defineConfig({
  site: 'https://tobybrown.space',
  base,
  integrations: [sitemap()],
});
