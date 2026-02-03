import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js and related libraries into separate chunks
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          // Split motion/animation libraries
          'motion-vendor': ['motion', 'maath'],
          // Split other large dependencies
          'vendor': ['react', 'react-dom', 'react-responsive'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
