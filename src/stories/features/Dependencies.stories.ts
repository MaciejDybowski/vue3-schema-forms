// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3';
import { VueSchemaForms } from '@/components';
import { StoryTemplateWithValidation } from '@/stories/templates/story-template';
import { Schema, SchemaOptions } from '@/vocabulary/schema';
import { DictionarySource, SchemaSourceField, SchemaTextField } from '@/vocabulary/schema/elements';
import { REQUEST_PAGE_0_1, REQUEST_SEARCH_DOLAR_AUSTRALIJSKI } from '@/stories/controls/Dictionary/responses';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  title: 'Forms/Features/Dependencies',
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


export const UseFormVariablesInFieldProps: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const currency = canvas.getByLabelText('Currency');

    await context.step('Resolve dependency', async () => {
      await userEvent.click(currency, { pointerEventsCheck: 0, delay: 200 });
      const items = document.getElementsByClassName('v-list-item');
      await userEvent.click(items[0], { delay: 200 });

      const querySuffix = await canvas.findAllByText('AFN');
      let queryHint = await canvas.findAllByText('Digits after decimal = 2');

      await expect(querySuffix.length).toEqual(2);
      await expect(queryHint.length).toEqual(2);
    });

    await context.step('Dynamic changed already resolved', async () => {
      const items = document.getElementsByClassName('v-list-item');

      await userEvent.click(currency, { pointerEventsCheck: 0, delay: 200 });
      await userEvent.click(items[1], { delay: 200 });

      const queryHint = await canvas.findAllByText('Digits after decimal = 3');
      await expect(queryHint.length).toEqual(2);
    });
  },
  render: StoryTemplateWithValidation,
  args: {
    modelValue: {
      amount: 32,
      items: [
        { item: 'Item 1', quantity: 3, price: 32.21 },
      ],
    },
    schema: {
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
            cols: 3,
          },
          source: {
            url: '/api/currencies',
            title: 'label',
            value: 'id',
          } as DictionarySource,
        } as SchemaSourceField,
        amount: {
          label: 'Amount (outside)',
          type: 'number',
          layout: {
            component: 'text-field',
            cols: 3,
            props: {
              suffix: '{currency.id}',
              hint: 'Digits after decimal = {currency.digitsAfterDecimal}',
              'persistent-hint': true,
            },
          },
        } as SchemaTextField,
        items: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                item: {
                  label: 'Item',
                  layout: { component: 'text-field', cols: 3 },
                },
                quantity: {
                  label: 'Quantity',
                  type: 'number',
                  default: 1,
                  layout: { component: 'text-field', cols: 3 },
                },
                price: {
                  label: 'Price',
                  type: 'number',
                  layout: { component: 'text-field', cols: 3 },
                  props: {
                    suffix: '{currency.id}',
                    'persistent-hint': true,
                  },
                },
                summary: {
                  label: 'Amount',
                  type: 'number',
                  layout: {
                    component: 'text-field',
                    cols: 3,
                    props: {
                      suffix: '{currency.id}',
                      hint: 'Digits after decimal = {currency.digitsAfterDecimal}',
                      'persistent-hint': true,
                    },
                  },
                  calculation: 'quantity * price',
                } as SchemaTextField,
              },
            },
          },
        },
      },
    } as Schema,
    options: {
      digitsAfterDecimal: '{currency.digitsAfterDecimal}',
    } as SchemaOptions,
  },
  parameters: {
    mockData: [
      REQUEST_PAGE_0_1,
      REQUEST_SEARCH_DOLAR_AUSTRALIJSKI,
    ],
  },
};
