// @ts-nocheck
import { ArgTypes } from '@storybook/types';
import { Meta, StoryObj } from '@storybook/vue3';

import DevelopmentTable from '../components/app/DevelopmentTable.vue';
import { Schema } from '../types/schema/Schema';

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
      'properties': {
        'data': {
          'properties': {
            'test': {
              'label': 'Test',
              'layout': {
                'component': 'text-field',
                'cols': 3,
              },
            },
          },
        },
        'invoice': {
          'properties': {
            'items': {
              'layout': {
                'component': 'duplicated-section',
                'schema': {
                  'properties': {
                    dane: {
                      properties: {
                        'someField': {
                          'label': 'Item',
                          'layout': {
                            'component': 'text-field',
                            'cols': 3,
                          },
                        },
                        'someFieldWithIf': {
                          'label': 'Some field with if',
                          'layout': {
                            'component': 'text-field',
                            'cols': 3,
                            'if': 'dane.someField=="root"',
                          },
                        },
                        'someFieldWithIf2': {
                          'label': 'Some field with if',
                          'layout': {
                            'component': 'text-field',
                            'cols': 3,
                            'if': 'data.test=="root"',
                          },
                        },
                      }
                    }
                  },
                },
              },
            },
          },
        },
      },
      required: [],
    } as Schema,
  },
};
