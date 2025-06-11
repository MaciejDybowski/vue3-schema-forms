// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';





export default {
  title: 'Elements/Editable/MultiLanguageField',
  ...formStoryWrapperTemplate,
};

const availableLanguages = [
  {
    code: 'en-GB',
    name: 'English',
  },
  {
    code: 'de',
    name: 'Deutsch',
  },
  {
    code: 'pl',
    name: 'Polski',
  },
];

export const ListOfCountriesFromSchem = {
  name: 'Case 1: list of countries from schema / model = null',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('Name of sth');
    await userEvent.type(field, 'Poland power!');

    await expect(context.args.formModel).toEqual({
      multiLanguage: {
        'en': 'Poland power!',
      },
    });
    const select = await canvas.getByLabelText('Lang');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 400 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[2], { delay: 200 });
    await waitForMountedAsync(400);
    const field2 = await canvas.getByLabelText('Name of sth');
    await waitForMountedAsync(400);
    await userEvent.type(field2, 'Polska siła!');
    await expect(context.args.formModel).toEqual({
      multiLanguage: {
        pl: 'Polska siła!',
        'en': 'Poland power!',
      },
    });
  },
  args: {
    formModel: {
      multiLanguage: null,
    },
    schema: {
      type: 'object',
      properties: {
        multiLanguage: {
          label: 'Name of sth',
          availableLanguages: availableLanguages,
          layout: {
            component: 'multi-language-control',
          },
        },
      },
    },
  },
};

export const ListOfCountriesFromSchemaType2 = {
  name: 'Case 2: list of countries from schema / model = object',
  play: async (context) => {
    await waitForMountedAsync();
    await expect(context.args.formModel).toEqual({
      multiLanguage: {
        pl: 'Polska siła!',
      },
    });
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('Name of sth');

    const select = await canvas.getByLabelText('Lang');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 400 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 400 });
    await waitForMountedAsync(100);
    await userEvent.type(field, 'Poland power!');
    await expect(context.args.formModel).toEqual({
      multiLanguage: {
        pl: 'Polska siła!',
        'en': 'Poland power!',
      },
    });
  },
  args: {
    formModel: {
      multiLanguage: {
        pl: 'Polska siła!',
      },
    },
    schema: {
      type: 'object',
      properties: {
        multiLanguage: {
          label: 'Name of sth',
          availableLanguages: availableLanguages,
          layout: {
            component: 'multi-language-control',
          },
        },
      },
    },
  },
};

export const ListOfCountriesFromOptionsType1 = {
  name: 'Case 3: list of countries from options / model = object',
  play: async (context) => {
    await waitForMountedAsync();
    await expect(context.args.formModel).toEqual({
      multiLanguage: {
        pl: 'Polska siła!',
      },
    });
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('Name of sth');

    const select = await canvas.getByLabelText('Lang');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 400 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 400 });
    await waitForMountedAsync(100);
    await userEvent.type(field, 'Poland power!');
    await expect(context.args.formModel).toEqual({
      multiLanguage: {
        pl: 'Polska siła!',
        'en': 'Poland power!',
      },
    });
  },
  args: {
    formModel: {
      multiLanguage: {
        pl: 'Polska siła!',
      },
    },
    schema: {
      type: 'object',
      properties: {
        multiLanguage: {
          label: 'Name of sth',
          layout: {
            component: 'multi-language-control',
          },
        },
      },
    },
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
      availableLanguages: availableLanguages,
    },
  },
};
