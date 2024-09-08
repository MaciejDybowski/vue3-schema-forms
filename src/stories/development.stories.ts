// @ts-nocheck
import { ArgTypes } from '@storybook/types';
import { Meta, StoryObj } from '@storybook/vue3';

import DevelopmentTable from '../components/app/DevelopmentTable.vue';
import { Schema } from '../types/schema/Schema';
import { EngineSourceField } from '../types/engine/controls';

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
    model: { test: '5242594678' },
    schema: {
      type: 'object',
      properties: {
        'numberInt': {
          'type': 'int',
          'formatType': 'decimal',
          'label': 'Int number',
          'layout': {
            'component': 'number-field',
          },
        },
        'numberFloat': {
          'type': 'float',
          'formatType': 'decimal',
          'label': 'Float number',
          'layout': {
            'component': 'number-field',
          },
        },
        'numberFloatFourPlaces': {
          'type': 'float',
          'precision': 4,
          'formatType': 'decimal',
          'label': 'Float number with 4 decimal places',
          'layout': {
            'component': 'number-field',
          },
        },
        'currency': {
          'type': 'float',
          'precision': 4,
          'formatType': 'currency',
          'label': 'Currency (current locale)',
          'layout': {
            'component': 'number-field',
          },
        },
        'currencyOther': {
          'type': 'float',
          'precision': 3,
          'formatType': 'currency',
          'currency': 'USD',
          'label': 'Currency other than locale',
          'layout': {
            'component': 'number-field',
          },
        },
        'percent': {
          'type': 'float',
          'precision': 3,
          'formatType': 'percent',
          'label': 'percent',
          'layout': {
            'component': 'number-field',
          },
        },
        currencySelect: {
          label: 'Currency select',
          layout: {
            component: 'select',
          },
          source: {
            items: [
              { value: 'PLN', title: 'Polski złoty' },
              { value: 'USD', title: 'Dolar' },
              { value: 'EUR', title: 'Euro' },
            ],
          },
        } as EngineSourceField,
        'dynamicCurrency': {
          'type': 'float',
          'precision': 3,
          'formatType': 'currency',
          'currency': '{currencySelect}',
          'label': 'Currency selected from SELECT',
          'layout': {
            'component': 'number-field',
          },
        },
      },
    } as Schema,
  },
};
