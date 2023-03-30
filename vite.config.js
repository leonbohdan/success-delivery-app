import * as path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; 
import eslint from 'vite-plugin-eslint';

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

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
      '@': resolve('./src'),
    },
  },
});
