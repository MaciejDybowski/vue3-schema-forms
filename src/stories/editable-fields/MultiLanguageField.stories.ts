// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Editable/MultiLanguageField',
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
  name: 'Schema Countries with Empty Model',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('Name of sth');
    await userEvent.type(field, 'Poland power!');

    await expect(context.args.formModel).toEqual({
      multiLanguage: {
        en: 'Poland power!',
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
    const field2 = await canvas.getByLabelText('Name of sth');
    await userEvent.type(field2, 'Polska siła!');
    await expect(context.args.formModel).toEqual({
      multiLanguage: {
        pl: 'Polska siła!',
        en: 'Poland power!',
      },
    });
  }),
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
  name: 'Schema Countries with Object Model',
  play: playForm(async (context) => {
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
    await userEvent.type(field, 'Poland power!');
    await expect(context.args.formModel).toEqual({
      multiLanguage: {
        pl: 'Polska siła!',
        en: 'Poland power!',
      },
    });
  }),
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
  name: 'Options Countries with Object Model',
  play: playForm(async (context) => {
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
    await userEvent.type(field, 'Poland power!');
    await expect(context.args.formModel).toEqual({
      multiLanguage: {
        pl: 'Polska siła!',
        en: 'Poland power!',
      },
    });
  }),
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

export const Required = {
  name: 'Required',
  play: playForm(async (context) => {
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
    await userEvent.type(field, 'Poland power!');
    await expect(context.args.formModel).toEqual({
      multiLanguage: {
        en: 'Poland power!',
      },
    });

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  }),
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
      required: ['multiLanguage'],
    },
  },
};
