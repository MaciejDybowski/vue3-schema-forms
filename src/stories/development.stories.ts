// @ts-nocheck
import SchemaEngine from '../components/app/SchemaEngine.vue';
import { Meta, StoryObj } from '@storybook/vue3';
import { ArgTypes } from '@storybook/types';
import { Schema } from '@/vocabulary/schema';
import { EngineSourceField } from '@/vocabulary/engine/controls';

const meta = {
  title: 'Development Table',
  component: SchemaEngine,
  argTypes: {
    schema: { control: 'object', description: 'Schema u' },
    model: { control: 'object', description: 'Model' },
    options: { control: 'object', description: 'Opcje' },
  } as Partial<ArgTypes<any>>,
  args: {
    options: {
      textFieldProps: {
        variant: 'outlined',
        density: 'comfortable',
      },
    },
    model: {},
  },
} satisfies Meta<typeof SchemaEngine>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Table1: Story = {
  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {
        invoiceData: {
          properties: {
            field1: { label: 'Test', layout: { component: 'text-field' } },
            field2: { label: 'Test 2', layout: { component: 'text-field' } },
            field3: { label: 'Test 3', layout: { component: 'text-field' } },
          },
        },
        qwe: { label: 'qwe', layout: { component: 'text-field' } },
        invoiceData: {
          properties: {
            field4: { label: 'Test 4', layout: { component: 'text-field' } },
          },
        },
      },
      company: {
        properties: {

        }
      }
    } as Schema,
  },
};

export const Table2: Story = {
  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {
        item: {
          label: "Item 1",
          layout: {component: "text-field"}
        },
        basicData: {
          layout: {
            component: 'editable-section',
            schema: {
              type: 'object',
              properties: {
                name: {
                  label: 'Imię',
                  layout: {
                    component: 'text-field',
                  },
                },
                lastname: {
                  layout: {component: "text-field"}
                }
              },
            },
          },
        },
        company: {
          properties: {
            test: {
              properties: {
                basicData: {
                  layout: {
                    component: 'editable-section',
                    schema: {
                      type: 'object',
                      properties: {
                        name: {
                          label: 'Imię',
                          layout: { component: 'text-field' },
                        },
                      },
                    },
                  },
                },
              }
            }
          }
        },
        test: {
          label: "asd",
          layout: {component:'text-field', if:"company.test.basicData.name=='test'"}
        }
      },
      required: ['textArea'],
    } as Schema,
  },
};
