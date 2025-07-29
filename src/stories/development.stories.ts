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
        fieldA: {
          label: 'Field',
          layout: {
            component: 'text-field',
            cols: 6,

          },
        },
        fieldB: {
          label: 'Field comment',
          content: 'Add comment here',
          layout: {
            component: 'text-switch-field',
            cols: 6,
            cellClass: "d-flex align-center",
            fillRow: true,
          },
        },
        fieldC: {
          label: 'Field',
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
        fieldD: {
          label: 'Field',
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
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
      properties: {},
    },
  },
};
