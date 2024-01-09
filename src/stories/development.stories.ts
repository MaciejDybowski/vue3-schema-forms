// @ts-nocheck
import DevelopmentTable from '../components/app/DevelopmentTable.vue';
import { Meta, StoryObj } from '@storybook/vue3';
import { ArgTypes } from '@storybook/types';
import { Schema } from '@/vocabulary/schema';
import { Layout, SchemaTextField } from '../vocabulary/schema/elements';

const meta = {
  title: 'Development Page',
  component: DevelopmentTable,
  argTypes: {
    schema: { control: 'object', description: 'Schema u' },
    model: { control: 'object', description: 'Model' },
    options: { control: 'object', description: 'Opcje' },
  } as Partial<ArgTypes<any>>,
  args: {
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'comfortable',
      },
    },
    model: {},
  },
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Table1: Story = {
  args: {
    model: {
      data: {
        items: [
          {
            product: 'Computer',
            quantity: 1,
            price: 3200,
          },
          {
            product: 'Laptop',
            quantity: 2,
            price: 1334.23,
          },
        ],
      },
    },
    schema: {
      type: 'object',
      properties: {
        data: {
          properties: {
            items: {
              layout: {
                component: 'duplicated-section',
                schema: {
                  properties: {
                    product: { label: 'Product', layout: { component: 'text-field', cols: 4 } },
                    quantity: {
                      label: 'Quantity',
                      type: 'number',
                      default: 1,
                      layout: { component: 'text-field', cols: 2 },
                    },
                    price: { label: 'Price', type: 'number', layout: { component: 'text-field', cols: 3 } },
                    value: {
                      label: 'Value',
                      type: 'number',
                      layout: { component: 'text-field', cols: 3 },
                      calculation: 'quantity * price',
                    } as SchemaTextField,
                  },
                },
              } as Layout,
            },
          },
        },
        summary: {
          properties: {
            sumValue: {
              label: 'SUM(Value)',
              layout: {
                component: 'text-field',
                cols: 4,
              },
              calculation: 'SUM(value, data.items) - 300',
            } as SchemaTextField,
          },
        },
      },
    } as Schema,
  },
};


