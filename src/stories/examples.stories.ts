import { Meta, StoryObj } from '@storybook/vue3-vite';
import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import { Schema } from '../types/schema/Schema';

export default {
  title: 'Examples ',
  component: FormStoryWrapper,
  args: {
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact'
      }
    }
  }
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;


export const HugeForm: Story = {
  name: "Case: 100 text-fields",
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: Object.fromEntries(
        Array.from({ length: 100 }, (_, i) => {
          const index = i + 1;
          return [
            `field${index}`,
            {
              label: `Field ${index}`,
              layout: { component: 'text-field' }
            }
          ];
        })
      )
    }
  }
};

