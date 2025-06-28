import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    tailwindcss(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Collaba Project'
        }
      }
    }),
  ],
  optimizeDeps: {
    include: ['gsap']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});