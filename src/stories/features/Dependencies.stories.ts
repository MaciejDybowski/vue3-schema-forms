// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";
import { VueSchemaForms } from "@/components";
import { StoryTemplateWithValidation } from "@/stories/templates/story-template";
import { Schema, SchemaOptions } from "../../types/schema";
import { DictionarySource, Layout, SchemaSourceField, SchemaTextField, SimpleSource } from "../../types/schema/elements";
import { REQUEST_PAGE_0_1, REQUEST_SEARCH_DOLAR_AUSTRALIJSKI } from "@/stories/controls/Dictionary/responses";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { EngineSourceField } from "../../types/engine/controls";

const meta = {
  title: "Forms/Features/Dependencies",
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
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UseFormVariablesInFieldProps: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const currency = canvas.getByLabelText("Currency");

    await context.step("Resolve dependency", async () => {
      await userEvent.click(currency, { pointerEventsCheck: 0, delay: 200 });
      const items = document.getElementsByClassName("v-list-item");
      await userEvent.click(items[0], { delay: 200 });

      const querySuffix = await canvas.findAllByText("AFN");
      let queryHint = await canvas.findAllByText("Digits after decimal = 2");

      await expect(querySuffix.length).toEqual(2);
      await expect(queryHint.length).toEqual(2);
    });

    await context.step("Dynamic changed already resolved", async () => {
      const items = document.getElementsByClassName("v-list-item");

      await userEvent.click(currency, { pointerEventsCheck: 0, delay: 200 });
      await userEvent.click(items[1], { delay: 200 });

      const queryHint = await canvas.findAllByText("Digits after decimal = 3");
      await expect(queryHint.length).toEqual(2);
    });
  },
  render: StoryTemplateWithValidation,
  args: {
    modelValue: {
      amount: 32,
      items: [{ item: "Item 1", quantity: 3, price: 32.21 }],
    },
    schema: {
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
            cols: 3,
          },
          source: {
            url: "/api/currencies",
            title: "label",
            value: "id",
          } as DictionarySource,
        } as SchemaSourceField,
        amount: {
          label: "Amount (outside)",
          type: "number",
          layout: {
            component: "text-field",
            cols: 3,
            props: {
              suffix: "{currency.id}",
              hint: "Digits after decimal = {currency.digitsAfterDecimal}",
              "persistent-hint": true,
            },
          },
        } as SchemaTextField,
        items: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                item: {
                  label: "Item",
                  layout: { component: "text-field", cols: 3 },
                },
                quantity: {
                  label: "Quantity",
                  type: "number",
                  default: 1,
                  layout: { component: "text-field", cols: 3 },
                },
                price: {
                  label: "Price",
                  type: "number",
                  layout: { component: "text-field", cols: 3 },
                  props: {
                    suffix: "{currency.id}",
                    "persistent-hint": true,
                  },
                },
                summary: {
                  label: "Amount",
                  type: "number",
                  layout: {
                    component: "text-field",
                    cols: 3,
                    props: {
                      suffix: "{currency.id}",
                      hint: "Digits after decimal = {currency.digitsAfterDecimal}",
                      "persistent-hint": true,
                    },
                  },
                  calculation: "quantity * price",
                } as SchemaTextField,
              },
            },
          },
        },
      },
    } as Schema,
    options: {
      digitsAfterDecimal: "{currency.digitsAfterDecimal}",
    } as SchemaOptions,
  },
  parameters: {
    mockData: [REQUEST_PAGE_0_1, REQUEST_SEARCH_DOLAR_AUSTRALIJSKI],
  },
};

export const UseDependenciesInLabel: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    await context.step("Resolved deps on load", async () => {
      let labelResolved = await canvas.findAllByText("Price (net)");
      await expect(labelResolved.length).toEqual(4); // 2 visible and 2 not visible
    });

    await context.step("Resolved when variable changed", async () => {
      const gross = canvas.getByLabelText("at gross prices");
      await userEvent.click(gross, { delay: 200 });

      let labelResolved = await canvas.findAllByText("Price (gross)");
      await expect(labelResolved.length).toEqual(4); // 2 visible and 2 not visible
    });
  },
  args: {
    modelValue: {
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
        invoiceMetadata: {
          properties: {
            pricing: {
              label: "The invoice is issued:",
              layout: { component: "radio-button", cols: 3, fillRow: true } as Layout,
              default: { value: "net", title: "at net prices", formatted: "net" },
              source: {
                items: [
                  { value: "net", title: "at net prices", formatted: "net" },
                  { value: "gross", title: "at gross prices", formatted: "gross" },
                ],
                returnObject: true,
              } as SimpleSource,
            } as EngineSourceField,
          },
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
                      type: "number",
                      default: 1,
                      layout: { component: "text-field", cols: 2 },
                    },
                    price: {
                      label: "Price ({invoiceMetadata.pricing.formatted})",
                      type: "number",
                      layout: { component: "text-field", cols: 3 },
                    },
                    value: {
                      label: "Value",
                      type: "number",
                      layout: { component: "text-field", cols: 3 },
                      calculation: "quantity * price",
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
              label: "SUM(Value)",
              layout: {
                component: "text-field",
                cols: 4,
              },
              calculation: "SUM(value, data.items) - 300",
              type: "number",
            } as SchemaTextField,
          },
        },
      },
    } as Schema,
  },
};

export const UseVariableDependencyWithFallbackMessage: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    await context.step("Check default label with fallback message", async () => {
      let labelResolved = await canvas.findAllByText("Telephone with your country prefix");
      await expect(labelResolved.length).toEqual(2); // 1 visible and 1 not visible
    });

    await context.step("Check default label after variable set in model", async () => {
      const select = canvas.getByLabelText("Country");
      await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

      const items = document.getElementsByClassName("v-list-item");
      await userEvent.click(items[0], { delay: 200 });

      let labelResolved = await canvas.findAllByText("Telephone with PL prefix");
      await expect(labelResolved.length).toEqual(2); // 1 visible and 1 not visible
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        description: {
          content:
            "If we want to have dependencies and a default value when this value is not yet in the model then we do it as follows: <b>path_to_variable:value_default</b>",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        country: {
          label: "Country",
          layout: {
            component: "select",
            cols: 3,
            fillRow: true,
          },
          source: {
            items: [{ value: "PL", title: "Poland" }],
          } as SimpleSource,
        },
        textField: {
          label: "Telephone with {country:your country} prefix",
          layout: {
            component: "text-field",
            cols: 3,
          },
        },
      },
    } as Schema,
  },
};
