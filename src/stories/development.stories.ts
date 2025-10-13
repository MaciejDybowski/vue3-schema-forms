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
        test: {
          label: 'Etykieta test',
          layout: { component: 'text-field' },
          expression: 'JSONATA(2+2)',
        },
        textField770: {
          label: 'Etykieta test 2',
          layout: { component: 'text-field' },
          expression: 'JSONATA(\n    2\n    +\n    2 +\n    2\n)',
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...MOCK_FOR_FILE_INPUT],
    },
  },
};
