// @ts-nocheck
import SchemaForm from '../../components/engine/vue-schema-forms.vue';
import { Meta, StoryObj } from '@storybook/vue3';
import { Schema } from '../../vocabulary/schema';
import { StoryTemplateWithValidation } from '../templates/story-template';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';


const meta = {
  title: 'Forms/Pole tekstowe [TextField]',
  component: SchemaForm,
  tags: ['autodocs'],
  argTypes: {
    schema: { control: 'object', description: 'Schema u' /*table: { disable: true }*/ },
    modelValue: { control: 'object', description: 'Model' /*table: { disable: true }*/ },
    options: { control: 'object', description: 'Opcje' /*table: { disable: true }*/ },
    'update:modelValue': { table: { disable: true } },
  },
  args: {
    model: {},
    options: {},
  },
  parameters: {
    controls: { hideNoControlsWarning: true }, //https://github.com/storybookjs/storybook/issues/24422
  },
} satisfies Meta<typeof SchemaForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        textField: {
          label: 'Pole tekstowe',
          layout: {
            component: 'text-field',
          },
        },
      },
    } as Schema,
  },
};


/**
 * #### Wymagane pole tekstowe
 * This is the primary button
 */
export const SimpleValidation: Story = {
  name: 'Prosta walidacja',
  render: StoryTemplateWithValidation,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const exampleElement = canvas.getByLabelText('Pole tekstowe');
    await userEvent.type(exampleElement, 'Wymagane pole', {
      delay: 100,
    });
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);

    // 👇 Assert DOM structure
    await expect(canvas.getByText('Walidacja zakończona sukcesem')).toBeInTheDocument();

  },
  args: {
    modelValue: {},
    schema: {
      type: 'object',
      properties: {
        textField: {
          label: 'Pole tekstowe',
          layout: {
            component: 'text-field',
          },
        },
      },
      required: ['textField'],
    } as Schema,
  },
};

