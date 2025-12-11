import { defineConfig } from 'vite';

export default defineConfig({
  ssr: {
    external: ['undici', 'wrangler', '@cloudflare/workers-types'],
  },
});