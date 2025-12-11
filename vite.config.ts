import { defineConfig } from 'vite';
import { vitePlugin as remixVitePlugin } from '@remix-run/dev';
import UnoCSS from 'unocss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  ssr: {
    external: ['undici', 'wrangler', '@cloudflare/workers-types'],
  },
  plugins: [
    nodePolyfills({
      include: ['path', 'buffer', 'process'],
    }),
    remixVitePlugin({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
      },
      serverModuleFormat: 'esm',
    }),
    UnoCSS(),
    tsconfigPaths(),
  ],
  envPrefix: [
    'VITE_',
    'OPENAI_LIKE_API_BASE_URL',
    'OPENAI_LIKE_API_MODELS',
    'OLLAMA_API_BASE_URL',
    'LMSTUDIO_API_BASE_URL',
    'TOGETHER_API_BASE_URL',
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});