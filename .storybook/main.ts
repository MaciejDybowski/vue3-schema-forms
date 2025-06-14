import type { StorybookConfig } from "@storybook/vue3-vite"
import { mergeConfig } from "vitest/config";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["./static"],
  addons: [
    "@storybook/addon-links",
    'storybook-addon-mock',
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
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
        exclude: ['node_modules/.cache/storybook']
      },
      server: {
        proxy: {
          '/auth': {
            target: "https://dev-forte.int.tecna.pl/",
            changeOrigin: true,
            secure: false,
          },
          '/api': {
            target: "https://dev-forte.int.tecna.pl/",
            changeOrigin: true,
            secure: false,
          },
        },
      },
    });

  }
}
export default config
