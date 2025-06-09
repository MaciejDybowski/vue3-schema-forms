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
      multiLanguage: null,
    },
    schema: {
      type: 'object',
      properties: {
        multiLanguage: {
          availableLanguages: [
            {
              code: 'en-GB',
              name: 'English',
            },
            {
              code: 'en-US',
              name: 'United States',
            },
            {
              code: 'de',
              name: 'Deutsch',
            },
            {
              code: 'pl',
              name: 'Polski',
            },
          ],
          label: 'Name of sth',
          layout: {
            component: 'multi-language-control',
          },
        },
      },
    },
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },

    },
  },
  parameters: {},
};
