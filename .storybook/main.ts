import { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vitest/config';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['./static'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-vitest'
  ],
  core: {},
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  managerHead: (head: string) => `
    ${head}
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <style>
      .sidebar-header a[title] img {
        max-width: 210px !important;
        max-height: 80px !important;
        width: auto !important;
        object-fit: contain !important;
      }
      
      /* Wycentrowanie przycisku settings względem logo */
      .sidebar-header {
        display: flex !important;
        align-items: center !important;
      }
      
      .sidebar-header > button {
        margin-top: 5px !important;
      }
    </style>
  `,
  previewHead: (head: string) => `
    ${head}
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  `,
  //docs: {},
  async viteFinal(config) {
    // Set base path for GitHub Pages
    const isProduction = process.env.STORYBOOK === 'true';
    if (isProduction) {
      config.base = '/vue3-schema-forms/';
    }

    // Merge custom configuration into the default config
    return mergeConfig(config, {
      optimizeDeps: {
        include: [],
        exclude: ['node_modules/.cache/storybook'],
      },
      server: {
        proxy: {
          '/auth': {
            target: "https://aureadev.tecna.pl/",
            changeOrigin: true,
            secure: false,
          },
          '/api': {
            target: "https://aureadev.tecna.pl/",
            changeOrigin: true,
            secure: false,
          },
        },
      },
    });
  },
};
export default config;
