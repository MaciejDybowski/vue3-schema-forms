// @ts-nocheck
import { HttpResponse, http } from "msw";
import { initialize, mswLoader } from "msw-storybook-addon";

import { VueSchemaForms } from "@/components";
import { StoryTemplateWithValidation } from "@/stories/templates/story-template";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";


const meta = {
  title: "Forms/Features/Ref JSON Blocks",
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
  loaders: [mswLoader],
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;

initialize();

const JSON_SCHEMA_BLOCK = [
  http.get("/json-mock/forte-table-offer-standard", async (req, res, ctx) => {
    return HttpResponse.json({
      label: "Input fetched from API static.json",
      layout: { component: "text-field" },
    });
  }),
];

export const SchemaWithReference: Story = {
  render: StoryTemplateWithValidation,
  args: {
    modelValue: {},
    schema: {
      properties: {
        fieldA: {
          label: "Field A",
          layout: {
            component: "text-field",
          },
        },
        fieldB: {
          label: "Field B",
          layout: {
            component: "text-field",
          },
        },
        fieldC: { $ref: "../json-mock/forte-table-offer-standard" },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: [...JSON_SCHEMA_BLOCK],
    },
  },
};
