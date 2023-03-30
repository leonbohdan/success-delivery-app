import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; 
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    eslint({
      fix: true,
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
