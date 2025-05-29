// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import { MULTI_ORDERED_SELECT_MOCK } from './mock-responses';

export default {
  title: 'Development Area',
  component: FormStoryWrapper,
  args: {
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
    },
  },
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;



export const Story1: Story = {
  args: {
    formModel: {
      keyValueList: [
        { label: 'Nazwa', value: 'Bedframe + bedsides', temp: '123' },
        { label: 'EAN', value: '5904767831813' },
        { label: 'Program', value: 'ARYSTYDA' },
        { label: 'Funkcja', value: 'Sleeping' },
        { label: 'Typ mebla', value: 'Bedframes' },
        { label: 'Oznaczenie', value: '2SK' },
        { label: 'Oświetlenie', value: '0 [lm]' },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        keyValueList: {
          label: 'Pole do pokazania listy klucz wartosc',
          config: [
            { title: 'Pole', valueMapping: 'label' },
            { title: 'Wartość', valueMapping: 'value' },
            { title: 'Test', valueMapping: 'temp' },
          ],
          layout: {
            component: 'key-value-list',
            cols: 6,
          },
        },
      },
      i18n: {},
    },
  },
  parameters: {},
};

export const Story2: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        'text-field-438': {
          label: { $ref: '#/i18n/~$locale~/textField438' },
          layout: { component: 'text-field' },
        },
        'fields-group-078': {
          layout: {
            component: 'fields-group',
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
            schema: {
              type: 'object',
              properties: {
                'text-field-168': {
                  label: { $ref: '../i18n/~$locale~/textField168' },
                  layout: { component: 'text-field' },
                },
              },
              i18n: {
                pl: { textField168: '123' },
                en: { textField168: '123' },
                de: { textField168: '' },
              },
            },
          },
        },
      },
      i18n: {
        pl: { textField438: 'qwe' },
        en: { textField438: 'qwe' },
        de: { textField438: 'qwe' },
      },
    },
  },
  parameters: {},
};

export const Story3: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        typelistColumns: {
          label: '',
          variant: 'list',
          layout: {
            cols: {
              xs: 12,
              sm: 12,
              md: 12,
              lg: 12,
              xl: 12,
              xxl: 12,
            },
            component: 'ordered-multi-select',
          },
          source: {
            url: '/mocks/multi-ordered-items',
            title: 'label',
            value: 'id',
            returnObject: true,
          },
        },
        resetButton: {
          label: 'Reset to default',
          layout: {
            component: 'button',
          },
          mode: 'action',
          config: {
            code: 'callScript',
            params: {
              script: 'reset_typelist_settings',
            },
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: MULTI_ORDERED_SELECT_MOCK,
    },
  },
};

export const Table: Story = {
  name: 'ordered-multi-select',
  args: {
    model: {
      orderedMultiSelect: null,
    },
    schema: {
      type: 'object',
      properties: {
        orderedMultiSelect: {
          label: 'Wybierz elementy do generowania exclea',
          variant: 'list',
          layout: {
            cols: 12,
            component: 'ordered-multi-select',
          },
          source: {
            url: '/mocks/multi-ordered-items',
            title: 'label',
            value: 'id',
          },
        },
        /*   orderedMultiSelect2: {
             label: "Wybierz elementy do generowania exclea",
             variant: "combobox",
             layout: {
               cols: 6,
               component: "ordered-multi-select",
             },
             source: {
               url: "/mock/dictionaries/items-to-excel",
               title: "label",
               value: "id",
             },
           },*/
      },
      required: ['orderedMultiSelect'],
      i18n: {},
    },
  },
  parameters: {
    msw: {
      handlers: MULTI_ORDERED_SELECT_MOCK,
    },
  },
};

