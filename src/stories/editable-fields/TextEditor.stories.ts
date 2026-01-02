// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';





export default {
  title: 'Elements/Editable/TextEditor',
  ...formStoryWrapperTemplate,
};

function getTextEditor(canvas: HTMLElement) {
  return canvas.querySelector('[contenteditable="true"]') as HTMLElement;
}

export const Standard: Story = {
  play: async (context) => {},
  args: {
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          layout: {
            component: 'text-editor',
          },
        },
      },
    },
  },
};

export const ReducedOptions: Story = {
  play: async (context) => {},
  args: {
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          editorFeatures: ["bold", "italic"],
          layout: {
            component: 'text-editor',
          },
        },
      },
    },
  },
};

export const WithDefault: Story = {
  name: 'Default value',
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          label: 'Description',
          defaultValue: 'Lorem ipsum...',
          layout: {
            component: 'text-editor',
          },
        },
      },
    } as Schema,
  },
};

export const SimpleValidation: Story = {
  name: 'Required',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    let editor: HTMLElement | null = null;
    await waitFor(() => {
      editor = getTextEditor(canvasElement);
      if (!editor) throw new Error('TextEditor not found yet');
    });

    await userEvent.type(editor!, 'Required field', { delay: 100 });

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton);

    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          layout: {
            component: 'text-editor',
          },
        },
      },
      required: ['textEditor'],
    } as Schema,
  },
};

export const RequiredAncCounter: Story = {
  name: 'Counter',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    let editor: HTMLElement | null = null;
    await waitFor(() => {
      editor = getTextEditor(canvasElement);
      if (!editor) throw new Error('TextEditor not found yet');
    });

    await userEvent.type(editor!, 'Required field with counter', { delay: 100 });

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 400 });

    await expect(canvas.getAllByText(/Max/)[0]).toBeInTheDocument();
    await expect(canvas.getByText('Max 20 characters.')).toBeInTheDocument();

    await userEvent.clear(editor!, { delay: 400 });
    await userEvent.type(editor!, 'Counter pass', { delay: 100 });
    await userEvent.click(submitButton);

    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          layout: {
            component: 'text-editor',
            props: {
              counter: '20',
            },
          },
        },
      },
      required: ['textEditor'],
    } as Schema,
  },
};
