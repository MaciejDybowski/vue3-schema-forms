// @ts-nocheck
import { calculationSchemaInDuplicatedSection, simpleCalculationSchema } from "@/stories/schemas";
import { invoicePositionsSchema } from "@/tests/test-schemas";
import { expect, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { Layout, SchemaTextField } from "../../types/schema/elements";
import { waitForMountedAsync } from "../controls/utils";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Features/Calculations",
  ...formStoryWrapperTemplate,
};

/**
 * #### Performing calculations based on form fields
 * `calculation: string` - an expression based on form fields, utilizing the expression parser from the library https://www.npmjs.com/package/expr-eval
 *
 * ##### We know that rounding is an important aspect when working with numbers :)
 * The form allows adjusting the number of decimal places using the parameter `digitsAfterDecimal`, which can be set in two ways:
 *  * statically, using the form option `options.digitsAfterDecimal: number`
 *  * dynamically, by providing the path to the value stored in the model `{currency.digitsAfterDecimal}` (e.g., a currency, which is an object and has the number of decimal places as a parameter). This will be demonstrated in the following examples.
 */
export const SimpleCalculation: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field1 = canvas.getByLabelText("Field 1");
    const field2 = canvas.getByLabelText("Field 2");
    await userEvent.type(field1, "2", { delay: 200 });
    await userEvent.type(field2, "13.25", { delay: 200 });

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
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field1 = canvas.getByLabelText("Field 1");
    const field2 = canvas.getByLabelText("Field 2");
    await userEvent.type(field1, "2");
    await userEvent.type(field2, "13.25");

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
    options: {
      digitsAfterDecimal: 3,
    },
  },
};

/**
 *  ```options.digitsAfterDecimal: {currency.digitsAfterDecimal} ``` Value set dynamically based on another value in the model.
 */
/*export const WithDynamicDigitsOptions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const digitsAfterDecimal = canvas.getByLabelText('Digits after decimal');
    const resultSquare = canvas.getByLabelText('Result ^2');

    await userEvent.clear(digitsAfterDecimal, { delay: 300 });
    await userEvent.type(digitsAfterDecimal, '2', { delay: 300 });
    expect(resultSquare).toHaveValue('0.14');
    await userEvent.clear(digitsAfterDecimal, { delay: 300 });
    await userEvent.type(digitsAfterDecimal, '4', { delay: 300 });
    expect(resultSquare).toHaveValue('0.1406');
  },
  args: {
    formModel: {
      currency: {
        digitsAfterDecimal: 3,
      },
      field1: 0.25,
      field2: 0.125,
    },
    schema: simpleCalculationWithDynamicDigits,
    options: {
      digitsAfterDecimal: '{currency.digitsAfterDecimal}',
    },
  },
};*/

/**
 * Heavy calculations
 */
export const calculationInDuplicatedSchema: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const addButton = await canvas.findByRole("button", { name: "Add" });
    await userEvent.click(addButton);

    const duplicatedSections = document.getElementsByClassName("duplicated-section-item");
    await expect(duplicatedSections[1]).toBeInTheDocument();

    const field1 = await within(duplicatedSections[1]).findByLabelText("Field 1");
    const field2 = await within(duplicatedSections[1]).findByLabelText("Field 2");
    await userEvent.type(field1, "3", { delay: 100 });
    await userEvent.type(field2, "7.5", { delay: 100 });

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

/**
 * Calculations have been designed with the intention of being used in duplicated sections, such as invoice items.
 */
export const invoiceItems: Story = {
  args: {
    formModel: {
      invoiceItems: [
        { product: "Item 1", quantity: 2, netPrice: 90.5, tax: 0.18 },
        { product: "Item 2", quantity: 5, netPrice: 88.3, tax: 0.07 },
        { product: "Item 3", quantity: 6, netPrice: 113.55, tax: 0.23 },
      ],
    },
    schema: invoicePositionsSchema,
  },
};

export const SUM_function: Story = {
  play: async (context) => {
    await new Promise((r) => setTimeout(r, 100));
    await expect(context.args.formModel).toEqual({
      data: {
        items: [
          {
            product: "Computer",
            quantity: 1,
            price: 3200,
            value: 3200,
          },
          {
            product: "Laptop",
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
            product: "Computer",
            quantity: 1,
            price: 3200,
          },
          {
            product: "Laptop",
            quantity: 2,
            price: 1334.23,
          },
        ],
      },
    },
    schema: {
      type: "object",
      properties: {
        description: {
          layout: {
            component: "static-content",
            tag: "span",
          },
          content:
            'In order for there to be a summation option along with the operation of other calculation functions, "precalculations" were added when preparing the final expression. <br> The function accepts two parameters: <br> 1. Path to the variable to be summed <br>  2. Path to the variable, which is an array of data',
        },
        data: {
          properties: {
            items: {
              layout: {
                component: "duplicated-section",
                schema: {
                  properties: {
                    product: { label: "Product", layout: { component: "text-field", cols: 4 } },
                    quantity: {
                      label: "Quantity",
                      defaultValue: 1,
                      layout: { component: "number-field", cols: 2 },
                    },
                    price: { label: "Price", layout: { component: "number-field", cols: 3 } },
                    value: {
                      label: "Value",
                      layout: { component: "number-field", cols: 3 },
                      calculation: "data.items[].quantity * data.items[].price",
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
              label: "SUM(Value)-300",
              layout: {
                component: "number-field",
                cols: 4,
              },
              calculation: "$sum(data.items.value) - 300",
            } as SchemaTextField,
          },
        },
      },
    } as Schema,
  },
};
