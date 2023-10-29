import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import { fileURLToPath, URL } from "node:url"
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"
import * as path from 'path';

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    vuetify({ autoImport: true }),
    VueI18nPlugin({}),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: "src/install.ts",
      name: 'vue3-schema-forms',
      formats: ["es", "cjs", "umd"],
      fileName: format => `vue3-schema-forms.${format}.js`
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/install.ts")
      },
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'main.css') return 'vue3-schema-forms.css';
          return assetInfo.name;
        },
        exports: "named",
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
