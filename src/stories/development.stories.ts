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
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        numberField: {
          label: 'Number',
          layout: {
            component: 'number-field',
            cols: 4,
          },
          type: 'float',
          precision: 2,
          expression: 'JSONATA(4.231321)',
        },
        textField: {
          label: 'Text',
          layout: {
            component: 'text-field',
            cols: 4,
          },
          expression: 'JSONATA(4.231321)',
        },
      },
    },
  },
  parameters: {},
};

export const Story2: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        switch: { label: 'Switch', layout: { component: 'switch' } },
        foreignGroup: {
          sectionKey: 'fields-group-151',
          layout: {
            component: 'fields-group',
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
            schema: {
              type: 'object',
              properties: {
                stages: {
                  sectionKey: 'foreignGroup',
                  layout: {
                    component: 'duplicated-section',
                    cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                    offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                    schema: {
                      type: 'object',
                      properties: {
                        sthOne: {
                          label: 'Sth One',
                          layout: {
                            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                            component: 'text-field',
                          },
                        },
                        sthTwo: {
                          label: 'Sth Two',
                          layout: {
                            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                            component: 'text-field',
                          },
                        },
                        showInternal: { label: 'Show internal', layout: { component: 'switch' } },
                        internalGroup: {
                          sectionKey: 'stages',
                          layout: {
                            component: 'fields-group',
                            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                            schema: {
                              type: 'object',
                              properties: {
                                item1: {
                                  label: 'Item 1',
                                  layout: {
                                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                                    component: 'number-field',
                                  },
                                  type: 'int',
                                },
                                item2: {
                                  label: 'Item 2',
                                  layout: {
                                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                                    component: 'number-field',
                                  },
                                  type: 'int',
                                },
                                item3: {
                                  label: 'Item 3',
                                  layout: {
                                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                                    component: 'number-field',
                                  },
                                  type: 'int',
                                },
                              },
                            },
                            if: 'nata(stages[].showInternal=true)',
                          },
                        },
                      },
                    },
                    options: {
                      addBtnText: 'Add element',
                      showDivider: false,
                      ordinalNumberInModel: false,
                      showFirstInitRow: true,
                    },
                  },
                  editable: true,
                  showElements: true,
                },
              },
            },
            if: 'nata(switch=true)',
          },
        },
      },
    },
  },
};
