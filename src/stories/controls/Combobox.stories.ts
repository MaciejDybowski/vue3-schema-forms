// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect, userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";

import { initialize, mswLoader } from "msw-storybook-addon";
import { http, HttpResponse } from "msw";
initialize();

const meta = {
  title: "Forms/Controls/Combobox",
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
  loaders: [mswLoader],
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;


 const MOCK_REQUEST = [
  http.get("/api/combo-mock", async (req, res, ctx) => {

    return HttpResponse.json({
      content: [{
        id:27,
        label: "Test"
      }],
    });
  }),
];


/*
export const Standard: Story = {
  play: async (context) => {
    // const canvas = within(context.canvasElement);
    // const field = canvas.getByLabelText("Text area");
    // await userEvent.type(field, "This is standard text area...", { delay: 100 });
    // await expect(context.args.modelValue).toEqual({ textArea: "This is standard text area..." });
  },
  args: {
    schema: {
      type: "object",
      properties: {
        textArea: {
          label: "Combobox",
          layout: {
            component: "combobox",
          },
          source: {
            url: "/api/combo-mock",
            title: "label",
            value: "id",
            lazy: true,
            returnObject: false,
            singleOptionAutoSelect: true
          }
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST
    },
  },
};
*/
