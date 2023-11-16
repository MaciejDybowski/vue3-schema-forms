import type { Preview } from "@storybook/vue3"
import { setup } from "@storybook/vue3"
import vuetify from "./plugins/vuetify"
import { withVuetifyTheme } from "./withVuetifyTheme.decorator"
import i18n, { i18nConfig } from "./plugins/i18n"

const preview: Preview = {
  parameters: {
    locale: i18nConfig.locale,
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

setup(app => {
  // Registers your app's plugins into Storybook
  app.use(vuetify)
  app.use(i18n)
})

export const decorators = [withVuetifyTheme]

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: i18nConfig.locale,
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", left: "🇺🇸", title: "English" },
        { value: "pl", left: "🇵🇱", title: "Polski" },
      ],
      dynamicTitle: true,
    },
  },
  theme: {
    name: "Theme",
    description: "Global theme for components",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "light", title: "Light", left: "🌞" },
        { value: "dark", title: "Dark", left: "🌛" },
      ],
      dynamicTitle: true,
    },
  },
}

export default preview
