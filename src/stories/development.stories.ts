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
    model: {"email":"2024-06-05T15:25:00.000+02:00"},
    schema: {
      type: 'object',
      properties: {
        email: {
          label: 'Adres e-mail',
          layout: {
            component: 'date-time-picker',
            class: "au-test"
          },
        } as SchemaField,
      },
    } as Schema,
  },
};

export const Table2: Story = {
  args: {
    model: {

    },
    schema: {
      type: 'object',
      properties: {
        stages: {
          layout: {
            component:  "duplicated-section",
            schema: {
              properties: {
                simpleDate: {
                  label: 'DateTime',
                  layout: {
                    component: 'date-time-picker',
                  },
                },
              }
            }
          }
        },
        stages2: {
          layout: {
            component:  "duplicated-section",
            schema: {
              properties: {
                simpleDate: {
                  label: 'DateTime',
                  layout: {
                    component: 'date-time-picker',
                  },
                },
              }
            }
          }
        },
        minimum: {
          label: "Minimum",
          layout: {
            component: "text-field"
          },
          expression: "MIN(simpleDate, stages)"
        },
        maximum: {
          label: "Maximum",
          layout: {
            component: "text-field"
          },
          expression: "MAX(simpleDate, stages2)"
        },
        dni: {
          label: "Dni",
          layout: {
            component: "text-field"
          },
          expression: "CALC_DATE_DIFF_RETURN_DAY(maximum, minimum)"
        },
        godziny: {
          label: "Godziny",
          layout: {
            component: "text-field"
          },
          expression: "CALC_DATE_DIFF_RETURN_HOURS(maximum, minimum)"
        },
        minuty: {
          label: "Minuty",
          layout: {
            component: "text-field"
          },
          expression: "CALC_DATE_DIFF_RETURN_MINUTES(maximum, minimum)"
        }
      },
    } as Schema,
  }
}
