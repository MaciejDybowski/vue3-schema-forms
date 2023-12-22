// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3';
import { Schema } from '@/vocabulary/schema';
import { fireEvent, userEvent, within } from '@storybook/testing-library';
import { VueSchemaForms } from '@/components';
import { DictionarySource, SchemaSourceField } from '@/vocabulary/schema/elements';
import {
  PAGE_0,
  PAGE_1,
  PAGE_SEARCH_DOL,
  REQUEST_NOT_LAZY,
  REQUEST_PAGE_0_1,
  REQUEST_SEARCH_DOL,
} from '@/stories/controls/Dictionary/responses';
import { StoryTemplateWithValidation } from '@/stories/templates/story-template';
import { expect } from '@storybook/jest';

const meta = {
  title: 'Forms/Controls/Dictionary [autocomplete]',
  component: VueSchemaForms,
  tags: ['autodocs'],
  argTypes: {
    schema: {
      control: 'object',
      description: 'Schema u' /*table: { disable: true }*/,
    },
    modelValue: {
      control: 'object',
      description: 'Model' /*table: { disable: true }*/,
    },
    options: {
      control: 'object',
      description: 'Opcje' /*table: { disable: true }*/,
    },
    'update:modelValue': { table: { disable: true } },
  },
  args: {
    modelValue: {},
    options: {},
  },
  parameters: {
    controls: { hideNoControlsWarning: true }, //https://github.com/storybookjs/storybook/issues/24422
  },
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const list = document.getElementsByClassName('v-list');
    fireEvent.scroll(list[0], { target: { scrollTop: 900 } });

    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[19], { delay: 200 });
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await userEvent.click(items[21], { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      currency: {
        'id': 'BWP',
        'label': 'Pula',
        'digitsAfterDecimal': '2',
      },
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/api/currencies',
            title: 'label',
            value: 'id',
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    mockData: [
      REQUEST_PAGE_0_1,
    ],
  },
};

export const WithSearch: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await userEvent.type(select, 'Dol', { delay: 200 });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.modelValue).toEqual({
      currency: {
        'id': 'AUD',
        'label': 'Dolar australijski',
        'digitsAfterDecimal': '2',
      },
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/api/currencies',
            title: 'label',
            value: 'id',
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    mockData: [
      REQUEST_PAGE_0_1,
      REQUEST_SEARCH_DOL,
    ],
  },
};

export const ReturnValue: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      currency: 'AFN',
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/api/currencies',
            title: 'label',
            value: 'id',
            returnObject: false,
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    mockData: [
      REQUEST_PAGE_0_1,
    ],
  },
};


export const Required: Story = {
  render: StoryTemplateWithValidation,
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
    await expect(context.args.modelValue).toEqual({
      currency: {
        'id': 'AFN',
        'label': 'Afgani',
        'digitsAfterDecimal': '2',
      },
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/api/currencies',
            title: 'label',
            value: 'value',
          } as DictionarySource,
        } as SchemaSourceField,
      },
      required: ['currency'],
    } as Schema,
  },
  parameters: {
    mockData: [
      {
        url: '/api/currencies?page=0&size=20',
        method: 'GET',
        status: 200,
        response: (request) => {
          const { body, searchParams } = request;
          if (searchParams.page === '0' && searchParams.size === '20') {
            return PAGE_0;
          }
          if (searchParams.page === '0' && searchParams.size === '20' && searchParams.query === 'Dol') {
            return PAGE_1;
          }
          return 'no data';
        },
      },
      {
        url: '/api/currencies?page=0&size=20&query=Dol',
        method: 'GET',
        status: 200,
        response: PAGE_SEARCH_DOL,
      },
    ],
  },
};


export const LazyLoadingDisabled: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      currency: {
        'id': 'BTN',
        'label': 'Ngultrum',
        'digitsAfterDecimal': '2',
      },
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/api/currencies',
            title: 'label',
            value: 'id',
            lazy: false,
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    mockData: [
      REQUEST_NOT_LAZY,
    ],
  },
};
