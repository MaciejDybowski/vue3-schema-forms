// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';





export default {
  title: 'Development Area',
  component: FormStoryWrapper,
  args: {
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
    },
  },
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;

export const Story1: Story = {
  args: {
    formModel: {
      numberField1: 1.0,
      numberField2: 123123.12,
      numberField3: 1000000.12,
      numberField4: -1.0,
      numberField5: -123123.12,
      numberField6: -1000000.12,
      numberField7: 0,
      numberField8: 0.0,
      numberField9: 0.12,
      numberField10: -0.12,
      numberField11: 999999.99,
      numberField12: -999999.99,
      numberField13: 1234567.89,
      numberField14: -1234567.89,
      numberField15: 10000000,
      numberField16: -100000,
      numberField17: 50000.5,
      numberField18: -50000.5,
      numberField19: 1.23,
      numberField20: -1.23,
      numberField21: 100.0,
      numberField22: -100.0,
      numberField23: 7500000.75,
      numberField24: -7500000.75,
      numberField25: 0.01,
      numberField26: -0.01,
      numberField27: 2500000,
      numberField28: -2500000,
      numberField29: 999.99,
      numberField30: -999.99,
    },
    schema: {
      properties: {
        numberField1: {
          label: 'Positive small (1.0)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField2: {
          label: 'Medium positive (123,123.12)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
            props: {
              'append-inner-icon': 'mdi-content-copy',
            },
          },
        },
        numberField3: {
          label: 'Large positive (1,000,000.12)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField4: {
          label: 'Negative small (-1.0)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField5: {
          label: 'Medium negative (-123,123.12)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField6: {
          label: 'Large negative (-1,000,000.12)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField7: {
          label: 'Zero integer (0)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField8: {
          label: 'Zero float (0.0)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField9: {
          label: 'Small positive decimal (0.12)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField10: {
          label: 'Small negative decimal (-0.12)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField11: {
          label: 'Max positive (999,999.99)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField12: {
          label: 'Max negative (-999,999.99)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField13: {
          label: 'Million+ positive (1,234,567.89)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField14: {
          label: 'Million+ negative (-1,234,567.89)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField15: {
          label: 'Ten million (10,000,000)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField16: {
          label: 'Hundred thousand negative (-100,000)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField17: {
          label: 'Fifty thousand positive (50,000.5)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField18: {
          label: 'Fifty thousand negative (-50,000.5)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField19: {
          label: 'Small decimal positive (1.23)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField20: {
          label: 'Small decimal negative (-1.23)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField21: {
          label: 'Hundred with zeros (100.00)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField22: {
          label: 'Hundred negative with zeros (-100.00)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField23: {
          label: 'Seven million+ (7,500,000.75)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField24: {
          label: 'Seven million+ negative (-7,500,000.75)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField25: {
          label: 'One cent (0.01)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField26: {
          label: 'Negative one cent (-0.01)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField27: {
          label: 'Two and half million (2,500,000)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField28: {
          label: 'Two and half million negative (-2,500,000)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField29: {
          label: 'Almost thousand (999.99)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        numberField30: {
          label: 'Almost thousand negative (-999.99)',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
      },
    },
  },
  parameters: {},
};
