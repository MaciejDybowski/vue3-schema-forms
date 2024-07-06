// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3';
import { Schema } from '../../types/schema';
import { StoryTemplateWithValidation } from '../templates/story-template';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { VueSchemaForms } from '@/components';
import { SchemaDateField, SchemaTextField } from '../../types/schema/elements';
import dayjs from '../../components/controls/date/dayjs';

const meta = {
  title: 'Forms/Controls/DateTime',
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

export const Standard: Story = {
  play: async (context) => {
  },
  args: {
    modelValue: {},
    schema: {
      type: 'object',
      properties: {
        simpleDate: {
          label: 'DateTime',
          layout: {
            component: 'date-time-picker',
          },
        },
      },
    } as Schema,
  },
};
