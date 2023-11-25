// @ts-nocheck
import SchemaEngine from '../components/app/SchemaEngine.vue';
import { Meta, StoryObj } from '@storybook/vue3';
import { ArgTypes } from '@storybook/types';
import { Schema } from '@/vocabulary/schema';


const meta = {
  title: 'Development Table',
  component: SchemaEngine,
  argTypes: {
    schema: { control: 'object', description: 'Schema u' },
    modelValue: { control: 'object', description: 'Model' },
    options: { control: 'object', description: 'Opcje' },
  } as Partial<ArgTypes<any>>,
  args: {
    options: {
      textFieldProps: {
        variant: 'outlined',
        density: 'comfortable',
      },
    },
  },
} satisfies Meta<typeof SchemaEngine>;

export default meta;
type Story = StoryObj<typeof meta>

export const Table1: Story = {
  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {},
    } as Schema,
  },
};
