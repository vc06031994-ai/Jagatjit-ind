import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure the base path is set for clean URLs
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true, // Enable SPA fallback for React Router
  },
  resolve: {
    alias: {
      'react-pdf': 'react-pdf/dist/esm/entry.webpack',
    },
  },
  optimizeDeps: {
    include: ['react-pdf/dist/esm/entry.webpack'],
  },
});
