// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import {
  MOCK_REQUEST_CURRENCY,
  TABLE_PAGE_WITH_AGGREGATES,
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

export const zagniezdzenie2PoziomyIObliczenia: Story = {
  args: {
    formModel: {},
    schema: {
      properties: {
        button: {
          label: 'Emit action object!',
          layout: {
            component: 'button',
          },
          mode: 'action',
          config: {
            code: 'my_action_code',
            params: {
              script: 'temp',
            },
          },
        },
        items: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
              /*  costs: {
                  layout: {
                    component: 'duplicated-section',
                    schema: {
                        properties: {
                        currency: {
                          label: 'Currency',
                          layout: {
                            cols:4,
                            component: 'dictionary',
                          },
                          source: {
                            url: '/mocks/currencies',
                            title: 'label',
                            value: 'id',
                          },
                        },
                        field1: {
                          label: 'Field 1',
                          layout: { component: 'number-field', cols: 4 },
                        },
                        field2: {
                          label: 'Field 2',
                          layout: { component: 'number-field', cols: 4 },
                          calculation: 'items[].costs[].field1 + 100',
                        },

                      },
                    },
                    options: {
                      addBtnText: 'Add',
                    },
                    cols: 12,
                  },
                },*/
                sthElse: {
                  label: 'Field else',
                  layout: { component: 'text-field', cols: 3 },
                },
                field1: {
                  label: 'Field 1',
                  layout: { component: 'number-field', cols: 4 },
                },
                field2: {
                  label: 'Field 2',
                  layout: { component: 'number-field', cols: 4 },
                  calculation: 'items[].field1 + 100',
                },
              },
            },
            options: {
              addBtnText: 'Add',
            },
            cols: 12,
          },
        },
        sum1: {
          label: 'Sum 1',
          layout: { component: 'number-field', cols: 4 },
          calculation: '$sum(items.field1)',
        },
        sum2: {
          label: 'Sum 2',
          layout: { component: 'number-field', cols: 4 },
          calculation: '$sum(items.field2)',
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...MOCK_REQUEST_CURRENCY, ...TABLE_PAGE_WITH_AGGREGATES, ...UPDATE_TABLE_ROW],
    },
  },
};

export const tabelaIAgregaty: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        items: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                product: {
                  label: 'Product',
                  layout: { component: 'text-field', cols: 12 },
                },
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
                tableOfProducts: {
                  layout: {
                    component: 'table-view',
                  },
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
                        title: 'Editable height',
                        key: 'height-collection',
                        type: 'COLLECTION',
                        editable: [
                          {
                            type: 'TEXTAREA',
                            title: 'Height',
                            key: 'height',
                            valueMapping: 'height:0:NUMBER:decimalPlaces',
                          },
                        ],
                        footerMapping: '<b>Summary of:</b> {height}',
                        properties: { minWidth: '200px', maxWidth: '200px', width: '100px' },
                      },
                      {
                        title: 'Base',
                        key: 'base',
                        valueMapping: 'base',
                        type: 'TEXT',
                      },
                      {
                        title: 'Volume',
                        key: 'volume',
                        valueMapping: 'volume',
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
      handlers: [...MOCK_REQUEST_CURRENCY, ...TABLE_PAGE_WITH_AGGREGATES, ...UPDATE_TABLE_ROW],
    },
  },
};
