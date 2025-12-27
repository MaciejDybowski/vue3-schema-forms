// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { SchemaField } from '../../types/schema/elements';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { playWrapper } from '../editable-fields/utils';





export default {
  title: 'Features/Exposed functions',
  ...formStoryWrapperTemplate,
};

export const Validate: Story = {
  name: 'Case: validate',
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Field B');
    await userEvent.type(field, 'This is standard text field...', { delay: 100 });

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });

    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  }),

  args: {
    formModel: {},
    schema: {
      properties: {
        fieldA: {
          label: 'Field A',
          defaultValue: 'Random text',
          layout: {
            component: 'text-field',
          },
        } as SchemaField,
        fieldB: {
          label: 'Field B',
          layout: {
            component: 'text-field',
          },
        } as SchemaField,
      },
      required: ['fieldA'],
    } as Schema,
  },
};

export const ResetForm: Story = {
  name: 'Case: reset form',
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Field B');
    await userEvent.type(field, 'This is standard text field...', { delay: 100 });

    const Reset = canvas.getByText('Reset Form');
    await userEvent.click(Reset, { delay: 200 });

    await expect(context.args.formModel).toEqual({
      fieldA: null,
      fieldB: null,
    });
  }),

  args: {
    formModel: {},
    schema: {
      properties: {
        fieldA: {
          label: 'Field A',
          defaultValue: 'Random text',
          layout: {
            component: 'text-field',
          },
        } as SchemaField,
        fieldB: {
          label: 'Field B',
          layout: {
            component: 'text-field',
          },
        } as SchemaField,
      },
    } as Schema,
  },
};

export const ResetValidation: Story = {
  name: 'Case: reset validation',
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Field B');
    await userEvent.type(field, 'This is standard text field...', { delay: 100 });

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });

    const validationText = canvas.getByText('Field is required.');
    await expect(validationText).toBeInTheDocument();

    const ResetValidation = canvas.getByText('Reset Validation');
    await userEvent.click(ResetValidation, { delay: 200 });

    await expect(validationText).not.toBeInTheDocument();
  }),

  args: {
    formModel: {},
    schema: {
      properties: {
        fieldA: {
          label: 'Field A',
          layout: {
            component: 'text-field',
          },
        } as SchemaField,
        fieldB: {
          label: 'Field B',
          layout: {
            component: 'text-field',
          },
        } as SchemaField,
      },
      required: ['fieldA'],
    } as Schema,
  },
};
