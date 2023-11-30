import { createI18n } from "vue-i18n"
import { rulesMessages } from '@/core/composables/useRules';



export const i18nConfig = {
  locale: localStorage.locale || "en",
  runtimeOnly: false,
  legacy: false,
  messages: rulesMessages
}

export default createI18n(i18nConfig)
