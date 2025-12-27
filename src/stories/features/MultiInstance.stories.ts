// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import MultipleFormStoryWrapper from '../../../.storybook/components/MultipleFormStoryWrapper.vue';
import { expect, userEvent, within } from 'storybook/test';
import { playWrapper } from '../editable-fields/utils';

export default {
  title: 'Features/Multi Instance',
  component: MultipleFormStoryWrapper,
  args: {
    formModelOne: {},
    schemaOne: {},
    formModelTwo: {},
    schemaOneTwo: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
    },
  },
} satisfies Meta<typeof MultipleFormStoryWrapper>;

type Story = StoryObj<typeof MultipleFormStoryWrapper>;

export const Example1: Story = {
  name: "Example 1: Check if 2 forms with same variables have separated models",
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Field A - form 1');
    await userEvent.type(field, 'Form 1', { delay: 100 });

    const field2 = canvas.getByLabelText('Field A - form 2');
    await userEvent.type(field2, 'Form 2', { delay: 100 });

    await expect(context.args.formModelOne).toEqual({ fieldA: 'Form 1' });
    await expect(context.args.formModelTwo).toEqual({ fieldA: 'Form 2' });
  }),
  args: {
    formModelOne: {},
    schemaOne: {
      type: 'object',
      properties: {
        fieldA: {
          label: 'Field A - form 1',
          layout: {
            component: 'text-field',
          },
        },
        fieldB: {
          label: 'Field {fieldA} with extra',
          layout: {
            component: 'text-field',
          },
        },
      },
    },
    formModelTwo: {},
    schemaTwo: {
      type: 'object',
      properties: {
        fieldA: {
          label: 'Field A - form 2',
          layout: {
            component: 'text-field',
          },
        },
        fieldB: {
          label: 'Field {fieldA} with extra',
          layout: {
            component: 'text-field',
          },
        },
      },
    },
  },
};
