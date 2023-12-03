// @ts-nocheck
import SchemaEngine from "../components/app/SchemaEngine.vue";
import { Meta, StoryObj } from "@storybook/vue3";
import { ArgTypes } from "@storybook/types";
import { Schema } from "@/vocabulary/schema";
import { EngineSourceField } from "@/vocabulary/engine/controls";

const meta = {
  title: "Development Table",
  component: SchemaEngine,
  argTypes: {
    schema: { control: "object", description: "Schema u" },
    model: { control: "object", description: "Model" },
    options: { control: "object", description: "Opcje" },
  } as Partial<ArgTypes<any>>,
  args: {
    options: {
      textFieldProps: {
        variant: "outlined",
        density: "comfortable",
      },
    },
    model: {},
  },
} satisfies Meta<typeof SchemaEngine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Table10: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        radioButtonWithDefault: {
          label: "Choose option",
          layout: {
            component: "radio-button",
          },
          default: 3,
          source: {
            items: [
              { value: 1, label: "Option 1" },
              { value: 2, label: "Option 2" },
              { value: 3, label: "Option 3" },
            ],
          },
        } as EngineSourceField,
        invoiceItems: {
          default: [{ product: "Item1" }, { product: "Item2" }],
          layout: {
            component: "duplicated-section",
            schema: {
              type: "object",
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
                },
                area: {
                  label: "Area",
                  layout: { component: "text-area", cols: 12 },
                }
              },
              required: ["product"]
            },
          },
          cols: 6,
        },
      },
    } as Schema,
  },
};

export const Table1: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        textArea: {
          label: "Description",
          layout: {
            component: "text-area",
          },
        },
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            items: {
              product: {
                label: "Product",
                layout: { component: "text-field", cols: 12 },
              },
            },
            cols: 6,
          },
        },
        textArea2: {
          label: "Description",
          layout: {
            component: "text-field",
          },
        },
        textA2rea2: {
          label: "Description",
          layout: {
            component: "text-field",
          },
        },
      },
    } as Schema,
  },
};

export const Table2: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        textArea: {
          label: "Description",
          layout: {
            component: "text-area",
            props: {
              counter: 15,
            },
          },
        },
      },
      required: ["textArea"],
    } as Schema,
  },
};
