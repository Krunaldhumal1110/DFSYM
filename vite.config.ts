import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteImageOptimization from 'vite-plugin-image-optimization';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimization({
      png: { quality: 70 },
      jpeg: { quality: 75 },
      jpg: { quality: 75 },
      webp: { quality: 75 },
    }),
  ],
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
