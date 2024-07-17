import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base:'/Wora-v1', // Replace with your GitHub repository name
  plugins: [
    react(),
  ],
  build: {
    outDir: 'build', // Specify the output directory where Vite will put the built files
    assetsDir: '.', // Ensure assets are correctly referenced relative to the base path
    sourcemap: false, // Disable source maps to optimize build size
  },
});