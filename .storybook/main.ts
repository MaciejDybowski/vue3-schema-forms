import type { StorybookConfig } from "@storybook/vue3-vite"

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
}
export default config
