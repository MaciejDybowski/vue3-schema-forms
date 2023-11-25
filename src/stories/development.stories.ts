// @ts-nocheck
import SchemaEngine from '../components/app/SchemaEngine.vue';
import { Meta, StoryObj } from '@storybook/vue3';
import { ArgTypes } from '@storybook/types';
import { Schema } from '@/vocabulary/schema';
import { Layout, SchemaTextField, Source } from '@/vocabulary/schema/elements';
import { EngineDuplicatedSection } from '@/vocabulary/engine/controls';


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
type Story = StoryObj<typeof meta>

export const Radio: Story = {
  name: 'Radio',
  parameters: {
    mockData: [
      {
        url: '/api/v1/options',
        method: 'GET',
        status: 200,
        response: [
          { id: 1, label: 'Option 1' },
          { id: 2, label: 'Option 2' },
          { id: 3, label: 'Option 3' },
          { id: 4, label: 'Option 4' },
        ],
      },
    ],
  },
  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {
        radio: {
          label: 'Faktura w kwotach',
          layout: {
            component: 'radio-button',
            props: {
              inline: true,
            },
          },
          source: {
            api: '/api/v1/options',
            itemText: 'label',
            itemValue: 'id',
            //returnObject: true,
          } as Source,
        },
      },
      required: ['radio'],
    } as Schema,
  },
};

export const Table5: Story = {
  name: 'Statyczny kontent',
  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {
        h1: {
          content: 'Static form text content',
          layout: {
            component: 'static-content',
            tag: 'h1',
          } as Layout,
        },
        h2: {
          content: 'Static form text content',
          layout: {
            component: 'static-content',
            tag: 'h2',
          } as Layout,
        },
        h3: {
          content: 'Static form text content',
          layout: {
            component: 'static-content',
            tag: 'h3',
          } as Layout,
        },
        h4: {
          content: 'Static form text content',
          layout: {
            component: 'static-content',
            tag: 'h4',
          } as Layout,
        },
        h5: {
          content: 'Static form text content',
          layout: {
            component: 'static-content',
            tag: 'h5',
          } as Layout,
        },
        paragraph: {
          content: 'Static form text content',
          layout: {
            component: 'static-content',
            tag: 'p',
          } as Layout,
        },
        span: {
          content: 'Static form text content',
          layout: {
            component: 'static-content',
            tag: 'span',
          } as Layout,
        },
        textField: {
          label: 'Test',
          layout: {
            component: 'text-field',
          } as Layout,
        },
      },
    } as Schema,
    options: {
      buttonProps: {
        variant: 'outlined',
      },
      fieldProps: {
        variant: 'outlined',
      },
    },
  },
};

export const Table1: Story = {
  name: 'Edytowalna sekcja',
  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {
        test: {
          label: 'Test przed',
          layout: {
            component: 'text-field',
          },
        },
        danePodstawowe: {
          layout: {
            component: 'section',
            items: {
              imie: {
                label: 'Imię',
                layout: {
                  component: 'text-field',
                  cols: 4,
                },
              },
              nazwisko: {
                label: 'Nazwisko',
                layout: {
                  component: 'text-field',
                  cols: 4,
                },
              },
            },
          },
        },
      },
    } as Schema,
    options: {
      buttonProps: {
        variant: 'outlined',
      },
    },
  },
};


export const Table3: Story = {
  name: 'Defaults Values',
  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {
        poleZwykle: {
          default: 'Zwykłe',
          label: 'Zwykle',
          layout: {
            component: 'text-field',
          },
        },
        dupa: {
          properties: {
            dupa1: {
              label: 'pole zagniezdzone',
              default: 'Test',
              layout: {
                component: 'text-field',
              },
            },
          },
        },
        itemy: {
          default: [{ pole1: 2, pole2: 3 }, { pole1: 2, pole2: 21 }],
          layout: {
            component: 'duplicated-section',
            items: {
              pole1: {
                label: 'polekontener',
                type: 'number',
                layout: {
                  component: 'text-field',
                  cols: 4,
                },
              },
              pole2: {
                label: 'pole2',
                type: 'number',
                layout: {
                  component: 'text-field',
                  cols: 4,
                },
              },
              pole3: {
                label: 'pole2',
                layout: {
                  component: 'text-field',
                  cols: 4,
                },
                calculation: 'pole1+pole2',
              } as SchemaTextField,
            },
            cols: 6,
          },
        } as EngineDuplicatedSection,
        test: {
          properties: {
            test1: {
              label: 'Test1',
              layout: {
                component: 'text-field',
              },
            },
          },
        },
      },
    } as Schema,
    options: {
      buttonProps: {
        variant: 'outlined',
      },
    },
  },
};
