// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { SchemaField } from '../../types/schema/elements';
import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';
import { StoryTemplateWithCustomValidation } from '../templates/story-template';

export default {
  title: 'Features/Validation/Behaviour',
  ...formStoryWrapperTemplate,
};

const validationExample = {
  type: 'object',
  properties: {
    field1: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field2: { label: 'Identifier', layout: { component: 'text-field' } } as SchemaField,
    field3: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field4: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field5: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field6: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field7: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field8: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field9: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field10: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field11: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field12: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field13: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field14: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field15: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field16: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field17: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field18: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
  },
  required: ['field2'],
} as Schema;

export const ExposedValidationAndScroll: Story = {
  name: 'Scroll to First Error Mode',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 400 });

    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();
  }),
  args: {
    defaultFormActions: true,
    validationBehaviour: 'scroll',
    formModel: {},
    schema: validationExample,
  },
};

export const ExposedValidationAndMessages: Story = {
  name: 'Show Message with Link to Scroll to the Error Mode',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 400 });

    await expect(canvas.getByText(': Field is required.')).toBeInTheDocument();
  }),
  args: {
    defaultFormActions: true,
    validationBehaviour: 'messages',
    formModel: {},
    schema: validationExample,
  },
};

export const ExposedValidationAndScrollWithRules: Story = {
  name: 'Scroll to First Error with Custom Message',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 400 });

    await expect(canvas.getByText('Custom message')).toBeInTheDocument();
  }),
  args: {
    defaultFormActions: true,
    validationBehaviour: 'scroll',
    formModel: {},
    schema: {
      properties: {
        fieldA: {
          label: 'Field A',
          layout: {
            component: 'text-field',
          },
          validations: [
            {
              name: 'valid-sth',
              rule: 'fieldA != fieldB',
              message: 'Custom message',
            },
          ],
        },
        ...validationExample.properties,
      },
    },
  },
};

export const AddCustomSubmitWithBuiltInValidation: Story = {
  name: 'Inject Your Own Button for Validate',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Submit');
    await expect(Submit).toBeInTheDocument();
  }),
  render: StoryTemplateWithCustomValidation,
  args: {
    formModel: {},
    schema: validationExample,
  },
};

export const CombinedValidationBehaviour = {
  name: 'Combined Mode',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 400 });

    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();
  }),
  args: {
    defaultFormActions: true,
    validationBehaviour: 'combined',
    formModel: {},
    schema: validationExample,
  },
};
