// @ts-nocheck
import { VueSchemaForms } from '@/components';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { Meta, StoryObj } from '@storybook/vue3';

import { Schema } from '../../types/schema/Schema';
import { SchemaTextField } from '../../types/schema/elements';

const meta = {
  title: 'Forms/Features/Hide fields',
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

export const HideFields: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field1 = canvas.getByLabelText('Visible field');
    const field2 = canvas.getByLabelText('Visible field 2');
    const hideField = canvas.getByLabelText('Hide field');

    await userEvent.type(field1, '3', { delay: 100 });
    await userEvent.type(field2, '3', { delay: 300 });

    await expect(hideField.checkVisibility()).toEqual(false);
    await expect(context.args.modelValue).toEqual({
      field1: 3,
      field2: 3,
      field3: 6,
    });
  },
  args: {
    modelValue: {},
    schema: {
      properties: {
        field1: {
          label: 'Visible field',
          layout: { component: 'number-field', cols: 3 },
        },
        field2: {
          label: 'Visible field 2',
          layout: { component: 'number-field', cols: 3 },
        },
        field3: {
          label: 'Hide field',
          layout: { component: 'number-field', cols: 3, hide: true },
          calculation: 'field1 + field2',
        } as SchemaTextField,
        field4: {
          label: 'Visible field 3',
          layout: { component: 'number-field', cols: 3 },
        },
      },
    } as Schema,
  },
};
