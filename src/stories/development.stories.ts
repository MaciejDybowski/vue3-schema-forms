// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import { MOCK_FOR_FILE_INPUT } from './mock-responses';





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
        size: "small",
        variant: "elevated",
        rounded: "",
      }
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
        text: {
          label: "Text",
          layout: {
            component: "text-field",
            cols: 4
          }
        },
        text2: {
          label: "Text",
          layout: {
            component: "button",
            cols: 1
          }
        },
        text3: {
          label: "Text",
          layout: {
            component: "text-field",
            cols: 4
          }
        }
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...MOCK_FOR_FILE_INPUT],
    },
  },
};
