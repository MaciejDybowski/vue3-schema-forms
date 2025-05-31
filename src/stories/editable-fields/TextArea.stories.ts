// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Editable/TextArea',
  ...formStoryWrapperTemplate,
};
/**
 * The default settings for the text area are such that the ```auto-grow = enabled``` , and the field starts with a setting of ```rows = 3```.
 */
export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Text area');
    await userEvent.type(field, 'This is standard text area...', { delay: 100 });
    await expect(context.args.formModel).toEqual({ textArea: 'This is standard text area...' });
  },
  args: {
    schema: {
      type: 'object',
      properties: {
        textArea: {
          label: 'Text area',
          layout: {
            component: 'text-area',
          },
        },
      },
    } as Schema,
  },
};
/**
 * You can set the default value of field from schema
 */
export const WithDefault: Story = {
  name: 'Default value',
  play: async (context) => {
    await expect(context.args.formModel).toEqual({ textAreaWithDefault: 'Lorem ipsum...' });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        textAreaWithDefault: {
          label: 'Description',
          defaultValue: 'Lorem ipsum...',
          layout: {
            component: 'text-area',
          },
        },
      },
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
export const SimpleValidation: Story = {
  name: 'Required',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const exampleElement = canvas.getByLabelText('Text area');
    await userEvent.type(exampleElement, 'Required field', {
      delay: 100,
    });
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);

    // 👇 Assert DOM structure
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        textField: {
          label: 'Text area',
          layout: {
            component: 'text-area',
          },
        },
      },
      required: ['textField'],
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
export const RequiredAncCounter: Story = {
  name: 'Counter',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const exampleElement = canvas.getByLabelText('Text area');
    await userEvent.type(exampleElement, 'Required field with counter', { delay: 100 });
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 400 });

    await expect(canvas.getAllByText(/Max/)[0]).toBeInTheDocument();

    //await expect(canvas.getByText('Max 20 characters.')).toBeInTheDocument(); // TODO czemu po stronie serwera nie widzi 20 tylko {counter}

    await userEvent.clear(exampleElement, { delay: 400 });
    await userEvent.type(exampleElement, 'Counter pass', { delay: 100 });
    await userEvent.click(Submit);
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        textAreaRequiredAndCounter: {
          label: 'Text area',
          layout: {
            component: 'text-area',
            props: {
              counter: '20',
            },
          },
        },
      },
      required: ['textAreaRequiredAndCounter'],
    } as Schema,
  },
};
