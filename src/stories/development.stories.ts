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
    formModel: {
      file: {
        id: '12345',
        name: 'Projekt MON 2.1.zip',
        size: 10360,
        type: 'application/zip',
      },
    },
    schema: {
      type: 'object',
      properties: {
        field1: {
          label: 'field1',
          layout: {
            component: 'text-field',
          },
        },
        file: {
          label: 'Plik z faktura',
          layout: {
            component: 'file-field',
          },
        },
        field2: {
          label: 'field1',
          layout: {
            component: 'text-field',
          },
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
