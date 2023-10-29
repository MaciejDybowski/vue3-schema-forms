import SchemaEngine from '../components/app/SchemaEngine.vue';
import { Meta, StoryObj } from '@storybook/vue3';
import {
  aLotOfTranslationsSchema,
  conditionSchema,
  duplicatedSectionSchema,
  heavy_schema,
  offsetSchema,
} from './schemas';
import { ArgTypes } from '@storybook/types';

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
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
    },
  },
} satisfies Meta<typeof SchemaEngine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Table1: Story = {
  name: "Zależności pól",
  args: {
    model: { textField: 'Pole tekstowe' },
    schema: conditionSchema,
  },
};


export const Table2: Story = {
  name: "Offset/wypełnianie",
  args: {
    model: {},
    schema: offsetSchema,
  },
};

export const Table3: Story = {
  name:"Kalkulacje/duplikowana",
  args: {
    model: {},
    schema: heavy_schema,
  },
};

export const Table4: Story = {
  name:"Tłumaczenia",
  args: {
    model: {},
    schema: aLotOfTranslationsSchema,
  },
};
export const Table5: Story = {
  name:"Duplikowana",
  args: {
    model: {
      users: [
        { field1: "Test" },
        { field1: "Test2" },
        { field1: "Test3" },
        { field1: "Test4" },
      ]
    },
    schema: duplicatedSectionSchema,
  },
};
