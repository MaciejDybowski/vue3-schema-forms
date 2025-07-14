// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';





export default {
  title: 'Elements/Editable/Text-Switch-Field',
  ...formStoryWrapperTemplate,
};

export const Standard = {
  name: 'Standard',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByText('Add comment here');
    expect(field).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 500));
    await field.click();
    await new Promise((r) => setTimeout(r, 500));

    const input = canvas.getByLabelText('Item');
    await userEvent.type(input, 'This is standard text field...', { delay: 100 });
    await expect(context.args.formModel).toEqual({ item: 'This is standard text field...' });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        item: {
          label: 'Item',
          content: 'Add comment here',
          layout: {
            component: 'text-switch-field',
          },
        },
      },
    } as Schema,
  },
};

export const WithModel = {
  name: 'Case: with model',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const input = canvas.getByLabelText('Item');
    await expect(input).toHaveValue('Standard comment');
    await expect(context.args.formModel).toEqual({ item: 'Standard comment' });
  },
  args: {
    formModel: {
      item: 'Standard comment',
    },
    schema: {
      type: 'object',
      properties: {
        item: {
          label: 'Item',
          content: 'Add comment here',
          layout: {
            component: 'text-switch-field',
          },
        },
      },
    } as Schema,
  },
};


export const BackToTextModel = {
  name: 'Case: back to text mode by delete value',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const input = canvas.getByLabelText('Item');
    await new Promise((r) => setTimeout(r, 300));
    await userEvent.type(input, '{backspace}');
    await new Promise((r) => setTimeout(r, 300));
    await userEvent.type(input, '{backspace}');
    await new Promise((r) => setTimeout(r, 300));
    await userEvent.type(input, '{backspace}');
    await new Promise((r) => setTimeout(r, 300));
    await userEvent.type(input, '{backspace}');

    const field = canvas.getByText('Add comment here');
    expect(field).toBeInTheDocument();
  },
  args: {
    formModel: {
      item: 'Test',
    },
    schema: {
      type: 'object',
      properties: {
        item: {
          label: 'Item',
          content: 'Add comment here',
          layout: {
            component: 'text-switch-field',
          },
        },
      },
    } as Schema,
  },
};