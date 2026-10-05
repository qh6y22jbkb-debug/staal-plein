import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { host: true, port: 5200 },
  build: { chunkSizeWarningLimit: 1000 }, // Three.js is groot; dat is prima
});
