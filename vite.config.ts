import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import * as path from 'path';
import typescript2 from 'rollup-plugin-typescript2';

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    vuetify({ autoImport: true }),
    VueI18nPlugin({}),
    typescript2({
      check: false,
      include: ['src/**/*.vue', "src/**/*.ts"],
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
        exclude: [
          'vite.config.ts',
        ],
      },

    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: './src/VueSchemaForms.ts',
      name: 'vue3-schema-forms',
      formats: ['es', 'cjs'],
      fileName: format => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
