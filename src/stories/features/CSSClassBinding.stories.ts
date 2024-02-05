// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3';
import { VueSchemaForms } from '@/components';
import { expect } from '@storybook/jest';

const meta = {
  title: 'Forms/Features/CSS Class binding',
  component: VueSchemaForms,
  tags: ['autodocs'],
  argTypes: {
    schema: {
      control: 'object',
      description: 'Schema u' /*table: { disable: true }*/,
    },
    modelValue: {
      control: 'object',
      description: 'Model' /*table: { disable: true }*/,
    },
    options: {
      control: 'object',
      description: 'Opcje' /*table: { disable: true }*/,
    },
    'update:modelValue': { table: { disable: true } },
  },
  args: {
    modelValue: {},
    options: {},
  },
  parameters: {
    controls: { hideNoControlsWarning: true }, //https://github.com/storybookjs/storybook/issues/24422
  },
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Story1: Story = {
  name: 'Bind class',
  play: async (context) => {
    const field = document.getElementsByClassName('text-h4');
    await expect(field[0]).not.toEqual(null);
  },
  args: {
    schema: {
      type: 'object',
      properties: {
        span: {
          content: 'Text with class',
          layout: {
            component: 'static-content',
            tag: 'span',
            class: 'text-subtitle-4 text-h4',
          },
        },
        textField: {
          label: 'Text',
          layout: {
            component: 'text-field',
          },
        },
      },
    },
  },
};
