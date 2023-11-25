// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3';
import { Schema } from '@/vocabulary/schema';
import { StoryTemplateWithValidation } from '../templates/story-template';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { VueSchemaForms } from '@/components';
import { EngineSourceField } from '@/vocabulary/engine/controls';
import { Source } from '@/vocabulary/schema/elements';

const meta = {
  title: 'Forms/Controls/Checkbox',
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

type Story = StoryObj<typeof meta>


export const Standard: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        radioButton: {
          label: 'Choose option',
          layout: {
            component: 'checkbox',
          },
          source: {
            items: [
              { value: 1, label: 'Option 1' },
              { value: 2, label: 'Option 2' },
              { value: 3, label: 'Option 3' },
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
export const WithDefault: Story = {
  name: 'With default (id)',
  args: {
    schema: {
      type: 'object',
      properties: {
        radioButton1: {
          label: 'Choose option',
          layout: {
            component: 'checkbox',
          },
          default: 3,
          source: {
            items: [
              { value: 1, label: 'Option 1' },
              { value: 2, label: 'Option 2' },
              { value: 3, label: 'Option 3' },
            ],
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMapping: Story = {
  name: 'Custom mapping',
  args: {
    schema: {
      type: 'object',
      properties: {
        radioButton2: {
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
            itemValue: 'id',
            itemText: 'text',
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMappingReturnObject: Story = {
  name: 'Custom mapper + return obj',
  args: {
    schema: {
      type: 'object',
      properties: {
        radioButton3: {
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
            itemValue: 'id',
            itemText: 'text',
            returnObject: true,
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMappingReturnObjectDefault: Story = {
  name: 'Custom mapper + obj + default',
  args: {
    schema: {
      type: 'object',
      properties: {
        radioButton4: {
          label: 'Choose option',
          layout: {
            component: 'checkbox',
          },
          default: [{ id: 2, text: 'Option 2' }],
          source: {
            items: [
              { id: 1, text: 'Option 1' },
              { id: 2, text: 'Option 2' },
              { id: 3, text: 'Option 3' },
            ],
            itemValue: 'id',
            itemText: 'text',
            returnObject: true,
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};


export const GetOptionsFromAPI: Story = {
  parameters: {
    mockData: [
      {
        url: '/api/v1/options',
        method: 'GET',
        status: 200,
        response: [
          { id: 1, label: 'Option 1' },
          { id: 2, label: 'Option 2' },
          { id: 3, label: 'Option 3' },
          { id: 4, label: 'Option 4' },
        ],
      },
    ],
  },
  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {
        radio: {
          label: 'Options',
          layout: {
            component: 'checkbox',
            props: {
              inline: true,
            },
          },
          source: {
            api: '/api/v1/options',
            itemText: 'label',
            itemValue: 'id',
            returnObject: true,
          } as Source,
        },
      },
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
export const SimpleValidation: Story = {
  name: 'Checkbox with required annotation',
  render: StoryTemplateWithValidation,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, {delay: 600});

    const exampleElement = canvas.getByLabelText('Option 3');
    await userEvent.click(exampleElement, 'Required field', {
      delay: 600,
    });

    await userEvent.click(Submit, {delay: 600});
    // 👇 Assert DOM structure
    await expect(
      canvas.getByText('Walidacja zakończona sukcesem'),
    ).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: 'object',
      properties: {
        radioButtonRequired: {
          label: 'Choose option',
          layout: {
            component: 'checkbox',
          },
          source: {
            items: [
              { value: 1, label: 'Option 1' },
              { value: 2, label: 'Option 2' },
              { value: 3, label: 'Option 3' },
            ],
          },
        } as EngineSourceField,
      },
      required: ['radioButtonRequired'],
    } as Schema,
  },
};
