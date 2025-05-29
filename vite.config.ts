import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { exec } from 'node:child_process';

export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({}),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
      include: ['src/components/**/*.vue', 'src/components/**/*.ts', 'src/core/**/*.ts', 'src/types/**/*.ts'],
    }),
    {
      name: 'include-global-components-types',
      closeBundle: async () => {
        exec('cat src/global-components.d.ts >> dist/main.d.ts');
        console.log('✅ Added global component types to output');
      },
    },
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'Vue3SchemaForms',
      fileName: (format) => `main.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['vue', 'vue-i18n', 'vuetify', 'vuedraggable', 'axios', 'dayjs'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-i18n': 'VueI18n',
          vuetify: 'Vuetify',
          vuedraggable: 'vuedraggable',
          axios: 'axios',
          dayjs: 'dayjs',
        },
        assetFileNames: 'style.css',
        exports: 'named',
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'immer': path.resolve(__dirname, 'node_modules/immer/dist/immer.cjs.production.min.js')
    },
  },
});
