// @ts-nocheck
import DevelopmentTable from '../components/app/DevelopmentTable.vue';
import { Meta, StoryObj } from '@storybook/vue3';
import { ArgTypes } from '@storybook/types';
import { Schema } from '../vocabulary/schema';
import { SchemaDateField } from '../vocabulary/schema/elements';

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
      //"date": "2024-01-31T00:00:00.000+01:00"
    },
    schema: {
      type: 'object',
      properties: {
        date: {
          label: 'Data',
          layout: {
            component: 'date-picker',
          },
          formatInModel: "YYYY/DD/MM"
        } as SchemaDateField,
      },
      required: ["date"]
    } as Schema,
  },
};

