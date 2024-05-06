import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/constants.scss";',
      },
    },
  },
});
