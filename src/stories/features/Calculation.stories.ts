// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3"
import { VueSchemaForms } from "@/components"
import {
  calculationSchemaInDuplicatedSection,
  simpleCalculationSchema,
  simpleCalculationWithDynamicDigits,
} from "@/stories/schemas"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import { invoicePositionsSchema } from "@/tests/test-schemas"

const meta = {
  title: "Forms/Features/Calculations",
  component: VueSchemaForms,
  tags: ["autodocs"],
  argTypes: {
    schema: {
      control: "object",
      description: "Schema u" /*table: { disable: true }*/,
    },
    modelValue: {
      control: "object",
      description: "Model" /*table: { disable: true }*/,
    },
    options: {
      control: "object",
      description: "Opcje" /*table: { disable: true }*/,
    },
    "update:modelValue": { table: { disable: true } },
  },
  args: {
    modelValue: {},
    options: {},
  },
  parameters: {
    controls: { hideNoControlsWarning: true }, //https://github.com/storybookjs/storybook/issues/24422
  },
} satisfies Meta<typeof VueSchemaForms>

export default meta

type Story = StoryObj<typeof meta>

/**
 * #### Performing calculations based on form fields
 * `calculation: string` - an expression based on form fields, utilizing the expression parser from the library https://www.npmjs.com/package/expr-eval
 *
 * ##### We know that rounding is an important aspect when working with numbers :)
 * The form allows adjusting the number of decimal places using the parameter `digitsAfterDecimal`, which can be set in two ways:
 *  * statically, using the form option `options.digitsAfterDecimal: number` (max = 10)
 *  * dynamically, by providing the path to the value stored in the model `{currency.digitsAfterDecimal}` (e.g., a currency, which is an object and has the number of decimal places as a parameter). This will be demonstrated in the following examples.
 */
export const SimpleCalculation: Story = {
  args: {
    schema: simpleCalculationSchema,
  },
}

/**
 *  ```options.digitsAfterDecimal: 3 ``` static version
 */
export const WithStaticDigitsOptions: Story = {
  args: {
    schema: simpleCalculationSchema,
    options: {
      digitsAfterDecimal: 3,
    },
  },
}

/**
 *  ```options.digitsAfterDecimal: {currency.digitsAfterDecimal} ``` Value set dynamically (max = 10) based on another value in the model.
 */
export const WithDynamicDigitsOptions: Story = {
  args: {
    modelValue: {
      currency: {
        digitsAfterDecimal: 3,
      },
      field1: 0.25,
      field2: 0.125,
    },
    schema: simpleCalculationWithDynamicDigits,
    options: {
      digitsAfterDecimal: "{currency.digitsAfterDecimal}",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const digitsAfterDecimal = canvas.getByLabelText("Digits after decimal")
    const resultSquare = canvas.getByLabelText("Result ^2")

    await userEvent.clear(digitsAfterDecimal, { delay: 300 })
    await userEvent.type(digitsAfterDecimal, "2", { delay: 300 })
    expect(resultSquare).toHaveValue("0.14")
    await userEvent.clear(digitsAfterDecimal, { delay: 300 })
    await userEvent.type(digitsAfterDecimal, "4", { delay: 300 })
    expect(resultSquare).toHaveValue("0.1406")
  },
}

/**
 * Heavy calculations
 */
export const calculationInDuplicatedSchema: Story = {
  args: {
    modelValue: {
      digitsAfterDecimal: 4,
      items: [
        {
          field1: 0.12544,
          field2: 2.45644,
        },
      ],
    },
    schema: calculationSchemaInDuplicatedSection,
    options: {
      digitsAfterDecimal: "{digitsAfterDecimal}",
    },
  },
}

/**
 * Calculations have been designed with the intention of being used in duplicated sections, such as invoice items.
 */
export const invoiceItems: Story = {
  args: {
    modelValue: {
      invoiceItems: [
        { product: "Item 1", quantity: 2, netPrice: 90.5, tax: 0.18 },
        { product: "Item 2", quantity: 5, netPrice: 88.3, tax: 0.07 },
        { product: "Item 3", quantity: 6, netPrice: 113.55, tax: 0.23 },
      ],
    },
    schema: invoicePositionsSchema,
  },
}
