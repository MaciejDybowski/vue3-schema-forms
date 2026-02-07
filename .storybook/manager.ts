import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"

// Determine base path for GitHub Pages deployment
const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/vue3-schema-forms' : '';

const customTheme = create({
  base: 'light',
  brandTitle: 'Vue3 Schema Forms',
  brandUrl: 'https://maciejdybowski.github.io/vue3-schema-forms/',
  brandImage: `${basePath}/st-logo.png`,
  brandTarget: '_self',
})

addons.setConfig({
  theme: customTheme,
  sidebar: {
    showRoots: true,
  },
})
