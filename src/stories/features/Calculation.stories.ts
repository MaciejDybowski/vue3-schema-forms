// @ts-nocheck
import { expect, userEvent, within } from '@storybook/test';

import { calculationSchemaInDuplicatedSection, simpleCalculationSchema } from '@/stories/schemas';

import { Schema } from '../../types/schema/Schema';
import { Layout, SchemaTextField } from '../../types/schema/elements';
import { waitForMountedAsync } from '../editable-fields/utils';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Features/Internal calculations',
  ...formStoryWrapperTemplate,
};

export const SimpleCalculation: Story = {
  name: 'Case: simple math',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field1 = canvas.getByLabelText('Field 1');
    const field2 = canvas.getByLabelText('Field 2');
    await userEvent.type(field1, '2', { delay: 200 });
    await userEvent.type(field2, '13.25', { delay: 200 });

    await expect(context.args.formModel).toEqual({
      field1: 2,
      field2: 13.25,
      field3: 15.25,
      field4: 232.56,
    });
  },
  args: {
    formModel: {},
    schema: simpleCalculationSchema,
  },
};

/**
 *
 */
export const DefaultPrecisionIsRoundTo0DecimalPlaces: Story = {
  name: 'Case: float decimal places is 2 by default',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field1 = canvas.getByLabelText('Field 1');
    const field2 = canvas.getByLabelText('Field 2');
    await userEvent.type(field1, '2');
    await userEvent.type(field2, '13.25');

    await expect(context.args.formModel).toEqual({
      field1: 2,
      field2: 13.25,
      field3: 15.25,
      field4: 232.56,
    });
  },
  args: {
    formModel: {},
    schema: simpleCalculationSchema,
  },
};

export const calculationInDuplicatedSchema: Story = {
  name: 'Case: heavy calculations in duplicated section',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const addButton = await canvas.findByRole('button', { name: 'Add' });
    await userEvent.click(addButton);

    const duplicatedSections = document.getElementsByClassName('duplicated-section-item');
    await expect(duplicatedSections[1]).toBeInTheDocument();

    const field1 = await within(duplicatedSections[1]).findByLabelText('Field 1');
    const field2 = await within(duplicatedSections[1]).findByLabelText('Field 2');
    await userEvent.type(field1, '3', { delay: 100 });
    await userEvent.type(field2, '7.5', { delay: 100 });

    const expectedModel = {
      items: [
        {
          field1: 0.1254,
          field2: 2.4564,
          field3: 2.5818,
          field4: 6.6657,
          field5: 6.5403,
          field6: 2.7072,
        },
        {
          field3: 10.5,
          field4: 110.25,
          field5: 107.25,
          field6: 13.5,
          field1: 3,
          field2: 7.5,
        },
      ],
    };
    await expect(context.args.formModel).toEqual(expectedModel);
  },
  args: {
    formModel: {
      items: [
        {
          field1: 0.1254,
          field2: 2.4564,
        },
      ],
    },
    schema: calculationSchemaInDuplicatedSection,
  },
};

export const SUM_function: Story = {
  name: 'Case: $sum(path.to.values)',
  play: async (context) => {
    await new Promise((r) => setTimeout(r, 100));
    await expect(context.args.formModel).toEqual({
      data: {
        items: [
          {
            product: 'Computer',
            quantity: 1,
            price: 3200,
            value: 3200,
          },
          {
            product: 'Laptop',
            quantity: 2,
            price: 1334.23,
            value: 2668.46,
          },
        ],
      },
      summary: {
        sumValue: 5568.46,
      },
    });
  },
  args: {
    formModel: {
      data: {
        items: [
          {
            product: 'Computer',
            quantity: 1,
            price: 3200,
          },
          {
            product: 'Laptop',
            quantity: 2,
            price: 1334.23,
          },
        ],
      },
    },
    schema: {
      type: 'object',
      properties: {
        data: {
          properties: {
            items: {
              layout: {
                component: 'duplicated-section',
                schema: {
                  properties: {
                    product: { label: 'Product', layout: { component: 'text-field', cols: 4 } },
                    quantity: {
                      label: 'Quantity',
                      defaultValue: 1,
                      layout: { component: 'number-field', cols: 2 },
                    },
                    price: { label: 'Price', layout: { component: 'number-field', cols: 3 } },
                    value: {
                      label: 'Value',
                      layout: { component: 'number-field', cols: 3 },
                      calculation: 'data.items[].quantity * data.items[].price',
                    } as SchemaTextField,
                  },
                },
              } as Layout,
            },
          },
        },
        summary: {
          properties: {
            sumValue: {
              label: 'SUM(Value)-300',
              layout: {
                component: 'number-field',
                cols: 4,
              },
              calculation: '$sum(data.items.value) - 300',
            } as SchemaTextField,
          },
        },
      },
    } as Schema,
  },
};
