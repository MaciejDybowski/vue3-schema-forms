// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import {
  MOCK_REQUEST_CURRENCY,
  TABLE_PAGE_WITHOUT_AGGREGATES,
  UPDATE_TABLE_ROW,
} from './mock-responses';





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
      buttonProps: {
        size: 'small',
        variant: 'elevated',
        rounded: '',
      },
    },
  },
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;

export const Story3: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
          },
        },
        textField: {
          label: 'Currency label editor',
          layout: {
            component: 'text-field',
          },
          dependency: 'currency.label',
          dependencyTriggers: ['currency'],
        },

        panelA: {
          layout: {
            component: 'expansion-panels',
          },
          panels: [
            {
              title: '<i class="mdi mdi-briefcase-edit-outline mr-2"></i>Dane projektu',
              schema: {
                properties: {
                  currency2: {
                    label: 'Currency',
                    layout: {
                      component: 'dictionary',
                    },
                    source: {
                      url: '/mocks/currencies',
                      title: 'label',
                      value: 'id',
                    },
                  },
                  textField2: {
                    label: 'Currency label editor',
                    layout: {
                      component: 'text-field',
                    },
                    dependency: 'currency.label',
                    dependencyTriggers: ['currency'],
                  },
                },
              },
            },
            {
              titleIcon: 'mdi-briefcase-edit-outline',
              titleIconSize: 20,
              titleCssDecorator: 'text-h6',
              title: '{textField2:Default Title}',
              schema: {
                properties: {
                  textFieldTest: {
                    label: 'Pole3',
                    layout: {
                      component: 'text-field',
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...MOCK_REQUEST_CURRENCY],
    },
  },
};

export const Story2: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        alert: {
          content: 'Lorem ipsum...',
          layout: {
            component: 'alert',
            props: {},
          },
        },
        items: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                product: {
                  label: 'Product',
                  layout: { component: 'text-field', cols: 12 },
                },
              },
            },
            options: {
              addBtnText: 'Add',
            },
            cols: 12,
          },
        },
        textField2: {
          label: 'Text field',
          layout: {
            component: 'text-field',
            cols: 6,
          },
        },
        textField: {
          label: 'Text field',
          layout: {
            component: 'text-field',
            cols: 6,
          },
        },
      },
      required: ['textField2'],
    },
  },
  parameters: {
    msw: {
      handlers: [],
    },
  },
};

export const TableInDuplicated: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        /*select: {
          label: 'Simple select',
          layout: {
            component: 'select',
          },
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        },
        tableOfProducts: {
          layout: {
            component: 'table-view',
          },
          triggers: ['select'],
          source: {
            data: '/mock-data/table-view-mock',
            headers: [
              {
                title: 'Id',
                key: 'id',
                valueMapping: 'dataId',
                type: 'TEXT',
              },
              {
                title: 'Location',
                key: 'location',
                valueMapping: 'location',
                type: 'TEXT',
              },
              {
                title: 'Base',
                key: 'base',
                valueMapping: 'base',
                type: 'TEXT',
              },
            ],
          },
        },*/
        items: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                select: {
                  label: 'Simple select',
                  layout: {
                    component: 'select',
                  },
                  source: {
                    items: [
                      { value: 1, title: 'Option 1' },
                      { value: 2, title: 'Option 2' },
                      { value: 3, title: 'Option 3' },
                    ],
                  },
                },
                tableOfProducts: {
                  layout: {
                    component: 'table-view',
                  },
                  triggers: ['items[].select'],
                  source: {
                    data: '/mock-data/table-view-mock',
                    headers: [
                      {
                        title: 'Id',
                        key: 'id',
                        valueMapping: 'dataId',
                        type: 'TEXT',
                      },
                      {
                        title: 'Location',
                        key: 'location',
                        valueMapping: 'location',
                        type: 'TEXT',
                      },
                      {
                        title: 'Base',
                        key: 'base',
                        valueMapping: 'base',
                        type: 'TEXT',
                      },
                    ],
                  },
                },
              },
            },
            options: {
              addBtnText: 'Add',
            },
            cols: 12,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...UPDATE_TABLE_ROW, ...TABLE_PAGE_WITHOUT_AGGREGATES],
    },
  },
};
