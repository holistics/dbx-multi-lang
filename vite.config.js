import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  build: {
    emptyOutDir: false, // Don't delete JSON files built by build-locales.cjs
    lib: {
      entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),
      name: 'DbxMultiLang',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      output: {
        // Preserve the module structure for better tree-shaking
        preserveModules: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  assetsInclude: ['**/*.yaml'],
});
