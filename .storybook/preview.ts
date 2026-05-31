import type { Preview } from '@storybook/vue3-vite';
import { setup } from '@storybook/vue3-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';

import i18n, { i18nConfig } from './plugins/i18n';
import vuetify from './plugins/vuetify';
import { withVuetifyTheme } from './withVuetifyTheme.decorator';
import MermaidWrapper from './components/MermaidWrapper';


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

  tags: ['!autodocs'],
};

setup((app) => {
  // Registers your app's plugins into Storybook
  app.use(vuetify);
  app.use(i18n);
});

const basePath = import.meta.env.PROD
  ? import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`
  : '/';

initialize({
  onUnhandledRequest: 'bypass', // 👈 suppresses the warning
  serviceWorker: {
    url: `${basePath}mockServiceWorker.js`,
  },
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
        { value: 'en', left: 'EN', title: 'English' },
        { value: 'pl', left: 'PL', title: 'Polski' },
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
        { value: 'light', title: 'Light', left: 'Light' },
        { value: 'dark', title: 'Dark', left: 'Dark' },
      ],
      dynamicTitle: true,
    },
  },
};

export default preview;
