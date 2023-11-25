import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { createVuetify } from 'vuetify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { en } from 'vuetify/locale';

// @ts-ignore
import colors from 'vuetify/lib/util/colors';

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: { en },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: colors.indigo.darken4,
          secondary: colors.indigo.darken1,
        },
      },
    },
  },
});

// Export for test.
export { components, directives };
