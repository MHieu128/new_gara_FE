import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import { cloudflare } from "@cloudflare/vite-plugin";

const enableCloudflare = process.env.ENABLE_CLOUDFLARE_PLUGIN === 'true';

export default defineConfig({
  plugins: [vue(), ...(enableCloudflare ? [cloudflare()] : [])],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
