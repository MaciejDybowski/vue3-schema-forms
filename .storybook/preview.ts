import type { Preview } from '@storybook/vue3-vite';
import { setup } from '@storybook/vue3-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';

import i18n, { i18nConfig } from './plugins/i18n';
import vuetify from './plugins/vuetify';
import { withVuetifyTheme } from './withVuetifyTheme.decorator';
import { MermaidWrapper } from './components/MermaidWrapper';

const preview: Preview = {
  parameters: {
    locale: i18nConfig.locale,
    //actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      components: {
        code: MermaidWrapper
      }
    }
  },

  tags: ['autodocs'],
};

setup((app) => {
  // Registers your app's plugins into Storybook
  app.use(vuetify);
  app.use(i18n);
});

initialize({
  onUnhandledRequest: 'bypass', // 👈 suppresses the warning
});

export const loaders = [mswLoader];
export const decorators = [withVuetifyTheme];

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: i18nConfig.locale,
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', left: '🇺🇸', title: 'English' },
        { value: 'pl', left: '🇵🇱', title: 'Polski' },
        { value: 'de', left: '🇩🇪', title: 'Deutsch' },
        { value: 'ru', left: '🇷🇺', title: 'Русский' },
        { value: 'es', left: '🇪🇸', title: 'Español' },
        { value: 'fr', left: '🇫🇷', title: 'Français' }
      ],
      dynamicTitle: true,
    },
  },
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light', left: '🌞' },
        { value: 'dark', title: 'Dark', left: '🌛' },
      ],
      dynamicTitle: true,
    },
  },
};

export default preview;
