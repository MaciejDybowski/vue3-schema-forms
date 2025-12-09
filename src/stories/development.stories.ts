// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import { MOCK_REQUEST_CURRENCY } from './mock-responses';





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

        items: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                currencyInside: {
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
                description: {
                  content: '<b>{items[].currencyInside.label:No data}</b>, this span was generated as v-html content.',
                  layout: {
                    component: 'static-content',
                    tag: 'span',
                  } ,
                },
                panelA: {
                  layout: {
                    component: 'expansion-panels',
                  },
                  panels: [
                    {
                      titleIcon: 'mdi-briefcase-edit-outline',
                      titleIconSize: 20,
                      titleCssDecorator: 'text-h6',
                      title: 'Sth panel',
                      schema: {
                        properties: {
                          descriptionInPanel: {
                            content: '<b>{items[].currencyInside.label:No data}</b>, this span was generated as v-html content.',
                            layout: {
                              component: 'static-content',
                              tag: 'span',
                            } ,
                          },

                          textFieldInside: {
                            label: 'Currency label editor',
                            layout: {
                              component: 'text-field',
                            },
                            dependency: 'items[].currencyInside.label',
                            dependencyTriggers: ['items[].currencyInside'],
                          },
                        },
                      },
                    },
                  ],
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
