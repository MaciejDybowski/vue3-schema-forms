// @ts-nocheck
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import {MOCK_REQUEST_CURRENCY} from "../mock-responses"
export default {
  title: 'Elements/Editable/Checkbox ✅',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const option2 = canvas.getByLabelText('Option 2');
    await userEvent.click(option2, { delay: 200 });
    await expect(context.args.formModel).toEqual({ checkboxStandard: [2] });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        checkboxStandard: {
          label: 'Choose option',
          layout: {
            component: 'checkbox',
          },
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        },
      },
    },
  },
};

export const HorizontalLayout: Story = {
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const option2 = canvas.getByLabelText('Option 2');
    await userEvent.click(option2, { delay: 200 });
    await expect(context.args.formModel).toEqual({ checkboxStandard: [2] });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        checkboxStandard: {
          label: 'Choose option',
          layout: {
            component: 'checkbox',
            props: {
              inline: true,
            },
          },
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        },
      },
    },
  },
};

export const WithDefault: Story = {
  name: 'Default value',
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    await expect(context.args.formModel).toEqual({ checkboxWithDefault: [3] });
    const option2 = canvas.getByLabelText('Option 2');
    await userEvent.click(option2, { delay: 200 });
    await expect(context.args.formModel).toEqual({ checkboxWithDefault: [3, 2] });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        checkboxWithDefault: {
          label: 'Choose option',
          layout: {
            component: 'checkbox',
          },
          defaultValue: [3],
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        },
      },
    },
  },
};

export const CustomMapping: Story = {
  name: 'Case: response/option mapping',
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const option2 = canvas.getByLabelText('Option 2');
    await expect(option2).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        checkboxWithCustomMapping: {
          label: 'Choose option',
          layout: {
            component: 'checkbox',
          },
          source: {
            items: [
              { id: 1, text: 'Option 1' },
              { id: 2, text: 'Option 2' },
              { id: 3, text: 'Option 3' },
            ],
            value: 'id',
            title: 'text',
          },
        },
      },
    },
  },
};

export const CustomMappingReturnObject: Story = {
  name: 'Case: return object/option mapping',
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const option2 = canvas.getByLabelText('Option 2');
    await userEvent.click(option2, { delay: 200 });
    await expect(context.args.formModel).toEqual({
      checkboxWithCustomMappingObj: [{ id: 2, text: 'Option 2' }],
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        checkboxWithCustomMappingObj: {
          label: 'Choose option',
          layout: {
            component: 'checkbox',
          },
          source: {
            items: [
              { id: 1, text: 'Option 1' },
              { id: 2, text: 'Option 2' },
              { id: 3, text: 'Option 3' },
            ],
            value: 'id',
            title: 'text',
            returnObject: true,
          },
        },
      },
    },
  },
};

export const CustomMappingReturnObjectDefault: Story = {
  name: 'Case: return object/option mapping/default',
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const option3 = canvas.getByLabelText('Option 3');
    await userEvent.click(option3, { delay: 200 });
    await expect(context.args.formModel).toEqual({
      checkboxWithCustomMappingObjDefault: [
        { id: 2, text: 'Option 2' },
        { id: 3, text: 'Option 3' },
      ],
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        checkboxWithCustomMappingObjDefault: {
          label: 'Choose option',
          layout: {
            component: 'checkbox',
          },
          defaultValue: [{ id: 2, text: 'Option 2' }],
          source: {
            items: [
              { id: 1, text: 'Option 1' },
              { id: 2, text: 'Option 2' },
              { id: 3, text: 'Option 3' },
            ],
            value: 'id',
            title: 'text',
            returnObject: true,
          },
        },
      },
    },
  },
};

export const GetOptionsFromAPI: Story = {
  name: 'Case: options from API',
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for API call
    await expect(canvas.getByText('Dram')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        checkboxFromAPI: {
          label: 'Options',
          layout: {
            component: 'checkbox',
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
            returnObject: true,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const SimpleValidation: Story = {
  name: 'Required',
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 600 });
    const exampleElement = canvas.getByLabelText('Option 3');
    await userEvent.click(exampleElement, { delay: 600 });
    await userEvent.click(Submit, { delay: 600 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        checkboxButtonRequired: {
          label: 'Choose option',
          layout: {
            component: 'checkbox',
          },
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        },
      },
      required: ['checkboxButtonRequired'],
    },
  },
};
