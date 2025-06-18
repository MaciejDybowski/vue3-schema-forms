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
        item: {
          label: 'Text-field',
          layout: {
            component: 'text-field',

            cols: {
              xs: 6,
              sm: 6,
              md: 6,
              lg: 4,
              xl: 2,
              xxl: 2,
            },
            offset: {
              xs: 0,
              sm: 0,
              md: 0,
              lg: 4,
              xl: 2,
              xxl: 2,
            },
          },
        },
        item2: {
          label: 'Text-field',
          layout: {
            component: 'text-field',
            cols: {
              xs: 0,
              sm: 0,
              md: 2,
              lg: 4,
              xl: 2,
              xxl: 2,
            },
          },
        },
      },
    },
  },
  parameters: {},
};
