import { h, ref } from "vue"
// @ts-ignore
import StoryWrapper from "./StoryWrapper.vue"
import { Decorator, StoryContext } from "@storybook/vue3"
import { i18nConfig } from "./plugins/i18n"

export const DEFAULT_THEME = "light"
const themeName = ref(DEFAULT_THEME)
const localeName = ref(i18nConfig.locale)

export const withVuetifyTheme: Decorator = (storyFn, context: StoryContext) => {
  const story = storyFn()
  themeName.value = context.globals.theme
  localeName.value = context.globals.locale
  return () => {
    return h(
      StoryWrapper,
      {
        themeName,
        localeName,
      }, // Props for StoryWrapper
      {
        // Puts your story into StoryWrapper's "story" slot with your story args
        story: () => h(story, { ...context.args }),
      }
    )
  }
}
