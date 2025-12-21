import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
// @ts-ignore
import colors from 'vuetify/lib/util/colors';
import { en } from 'vuetify/locale';
import 'vuetify/styles';

export default createVuetify({
  components: {
    ...components,
  },
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
