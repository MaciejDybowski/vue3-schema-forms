// @ts-nocheck
import { expect, userEvent, within } from '@storybook/test';

import { EngineSourceField } from '../../types/engine/controls';
import { Schema } from '../../types/schema/Schema';
import { Source } from '../../types/schema/elements';
import { MOCK_REQUEST_CURRENCY } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';

export default {
  title: 'Elements/Editable/RadioButton',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    await expect(context.args.formModel).toEqual({ radioButton: 1 });
    const option2 = canvas.getByLabelText('Option 2');
    await userEvent.click(option2, { delay: 200 });
    await expect(context.args.formModel).toEqual({ radioButton: 2 });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        radioButton: {
          label: 'Choose option',
          layout: {
            component: 'radio-button',
          },
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

/**
 * You can set the default value of field from schema
 */
export const DefaultValue: Story = {
  name: 'Default value',
  play: async (context) => {
    await expect(context.args.formModel).toEqual({ radioButtonWithDefault: 3 });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        radioButtonWithDefault: {
          label: 'Choose option',
          layout: {
            component: 'radio-button',
          },
          defaultValue: 3,
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
export const Required: Story = {
  name: 'Required',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const exampleElement = canvas.getByLabelText('Option 3');
    await userEvent.click(exampleElement, 'Required field', {
      delay: 500,
    });
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        radioButtonRequired: {
          label: 'Choose option',
          layout: {
            component: 'radio-button',
          },
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        } as EngineSourceField,
      },
      required: ['radioButtonRequired'],
    } as Schema,
  },
};

export const CustomMapping: Story = {
  name: 'Mapper: title/value',
  play: async (context) => {
    await waitForMountedAsync();
    await expect(context.args.formModel).toEqual({ radioButtonCustomMapping: 1 });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        radioButtonCustomMapping: {
          label: 'Choose option',
          layout: {
            component: 'radio-button',
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
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMappingReturnObject: Story = {
  name: 'Mapper: title/value/returnObject',
  play: async (context) => {
    await waitForMountedAsync();
    await expect(context.args.formModel).toEqual({
      radioButtonCustomMappingObject: { id: 1, text: 'Option 1' },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        radioButtonCustomMappingObject: {
          label: 'Choose option',
          layout: {
            component: 'radio-button',
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
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMappingReturnObjectDefault: Story = {
  name: 'Mapper: title/value/returnObject/default',
  play: async (context) => {
    await waitForMountedAsync();
    await expect(context.args.formModel).toEqual({
      radioButtonCustomMappingObjectDefault: {
        id: 2,
        text: 'Option 2',
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        radioButtonCustomMappingObjectDefault: {
          label: 'Choose option',
          layout: {
            component: 'radio-button',
          },
          defaultValue: { id: 2, text: 'Option 2' },
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
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const NoInitValue: Story = {
  name: 'Case: No value on init',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    await expect(context.args.formModel).toEqual({});
    const option2 = canvas.getByLabelText('Option 2');
    await userEvent.click(option2, { delay: 200 });
    await expect(context.args.formModel).toEqual({ radioButton: 2 });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        radioButton: {
          initValue: false,
          label: 'Choose option',
          layout: {
            component: 'radio-button',
          },
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const GetOptionsFromAPI: Story = {
  name: 'Case: Items from API',
  play: async (context) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // <- wait for api call
    await expect(context.args.formModel).toEqual({
      radioButtonOptionsFromAPI: {
        id: 'AFN',
        label: 'Afgani',
        digitsAfterDecimal: '2',
        labels: 'the-best',
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        radioButtonOptionsFromAPI: {
          label: 'Options',
          layout: {
            component: 'radio-button',
            props: {
              inline: true,
            },
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
            returnObject: true,
          } as Source,
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};
