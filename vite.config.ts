import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-ui': ['react-toastify'],
        },
      },
    },
    cssMinify: true,
    minify: 'esbuild',
    assetsInlineLimit: 10240,
    chunkSizeWarningLimit: 600,
  },
});
