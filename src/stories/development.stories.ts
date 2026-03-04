// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';
import { HttpResponse, http } from 'msw';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';











export default {
  title: 'Development Area',
  component: FormStoryWrapper,
  args: {
    emittedObject: {},
    signals: {},
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
      buttonProps: {
        size: 'small',
        variant: 'elevated',
        rounded: '',
      },
    },
  },
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;

const JSON_TRANSLATIONS_BLOCK = [
  http.get('/json-mock/translations', async (req, res, ctx) => {
    return HttpResponse.json({
      pl: {
        firstName: 'Imię',
        lastName: 'Nazwisko',
        email: 'E-mail',
        password: 'Hasło',
      },
      en: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'E-mail',
        password: 'Password',
      },
    });
  }),
];

const JSON_FORM_BLOCK = [
  http.get('/json-mock/1/form-schema', async (req, res, ctx) => {
    return HttpResponse.json({
      type: 'object',
      properties: {
        test: {
          label: 'test',
          layout: {
            component: 'text-field',
          },
        },
      },
    });
  }),
];

export const TableOne: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        nestedBlock: {
          $ref: '#/nestedFormsPath',
          '0': '{context.project.id:1}',
          '1': 'test',
        },

        firstName: {
          label: { $ref: '#/i18n/~$locale~/firstName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
      },
    },
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'comfortable',
      },
      context: {
        project: {
          id: 1,
        },
      },
      i18n: {
        $ref: '../json-mock/translations',
      },
      nestedFormsPath: {
        $ref: '../json-mock/{0}/form-schema?formName={1}',
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK, ...JSON_FORM_BLOCK],
    },
  },
};
