import { h } from "vue"
// @ts-ignore
import StoryWrapper from "./components/StoryWrapper.vue"
import { Decorator, StoryContext } from "@storybook/vue3-vite"
import { i18nConfig } from "./plugins/i18n"

export const DEFAULT_THEME = "light"

export const withVuetifyTheme: Decorator = (storyFn, context: StoryContext) => {
  const story = storyFn()
  return () => {
    return h(
      StoryWrapper,
      {
        themeName: context.globals.theme ?? DEFAULT_THEME,
        localeName: context.globals.locale ?? i18nConfig.locale,
      },
      {
        story: () => h(story, { ...context.args }),
      }
    )
  }
}
