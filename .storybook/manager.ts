import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"

const customTheme = create({
  base: 'light',
  brandTitle: 'Vue3 Schema Forms',
  brandUrl: 'https://maciejdybowski.github.io/vue3-schema-forms/',
  brandImage: '/st-logo.png',
  brandTarget: '_self',
})

addons.setConfig({
  theme: customTheme,
  sidebar: {
    showRoots: true,
  },
})
