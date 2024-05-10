import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
          html: 'index.html',
      },
  },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/constants.scss";',
      },
    },
  },
  server: {
    port: 3000,
  },
});
