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
  //docs: {},
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      optimizeDeps: {
        include: [],
        exclude: ['node_modules/.cache/storybook'],
      },
      server: {
        proxy: {},
      },
    });
  },
};
export default config;
