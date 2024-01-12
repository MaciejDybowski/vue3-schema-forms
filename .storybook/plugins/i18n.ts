import { createI18n } from 'vue-i18n';

export const i18nConfig = {
  locale: localStorage.locale || 'en',
  runtimeOnly: false,
  legacy: false
};

export default createI18n(i18nConfig);
