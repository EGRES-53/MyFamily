import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    cors: true,
    hmr: {
      port: 5173,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'pdf-vendor': ['@react-pdf/renderer', 'react-pdf'],
          'media-vendor': ['photoswipe', 'react-photoswipe-gallery', 'react-dropzone'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});