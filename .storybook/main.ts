import type { StorybookConfig } from "@storybook/vue3-vite"
import { mergeConfig } from "vitest/config";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    'storybook-addon-mock',
    "@storybook/addon-mdx-gfm"
  ],
  core: {},
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {},
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
      server: {
        proxy: {
          '/api': {
            target: "http://localhost:8081",
            changeOrigin: false,
            secure: false,
          },
        },
      },
    });

  }
}
export default config
