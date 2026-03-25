// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';



import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';



















export default {
  title: 'Development Area',
  component: FormStoryWrapper,
  args: {
    emittedObject: {},
    signals: {},
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

export const TableOne: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        items: {
          layout: {
            component: 'duplicated-section',
            schema: {
              type: 'object',
              properties: {
                switch: {
                  label: 'Switch',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'switch',
                  },
                  onChange: [
                    {
                      type: 'onChange',
                      mode: 'change-model',
                      variables: [{ path: 'items[].number', value: 0, if: 'items[].switch=true' }],
                    },
                  ],
                },
                number: {
                  label: 'Number',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'number-field',
                  },
                  type: 'int',
                },
                numberTemp: {
                  label: 'Number temp',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'number-field',
                  },
                  type: 'int',
                  onChange: [],
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
          onChange: [],
        },
      },
    },
  },
};
