// @ts-nocheck
import DevelopmentTable from '../components/app/DevelopmentTable.vue';
import { Meta, StoryObj } from '@storybook/vue3';
import { ArgTypes } from '@storybook/types';
import { Schema } from '../vocabulary/schema';
import { SchemaField } from '../vocabulary/schema/elements';

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
    model: {},
    schema: {
      type: 'object',
      properties: {
        email: {
          label: 'Adres e-mail',
          layout: {
            component: 'text-field',
            class: "au-test"
          },
        } as SchemaField,
      },
    } as Schema,
  },
};

