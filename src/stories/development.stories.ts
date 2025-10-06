// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import { Schema } from '../types/schema/Schema';
import { TABLE_PAGE_WITH_AGGREGATES, TABLE_PAGE_WITHOUT_AGGREGATES, UPDATE_TABLE_ROW } from "./mock-responses";





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
        field1: {
          label: "field1",
          layout: {
            component: 'text-field'
          }
        },
        sw: {
          label: "field1",
          layout: {
            component: 'switch'
          }
        },
        field2: {
          label: "field1",
          layout: {
            component: 'text-field'
          }
        }
      },
    },
  },
  parameters: {},
};
