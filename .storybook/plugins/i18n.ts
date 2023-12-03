import { createI18n } from 'vue-i18n';
import pl from '../../src/locales/pl.json';
import en from '../../src/locales/en.json';


export const i18nConfig = {
  locale: localStorage.locale || 'en',
  runtimeOnly: false,
  legacy: false,
  messages: {
    pl: pl,
    en: en,
  },
};

export default createI18n(i18nConfig);
