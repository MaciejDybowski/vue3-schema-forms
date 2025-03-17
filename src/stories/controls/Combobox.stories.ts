// @ts-nocheck
import { HttpResponse, http } from "msw";
import { initialize, mswLoader } from "msw-storybook-addon";

import { VueSchemaForms } from "@/components";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";
import DevelopmentTable from "../../components/app/DevelopmentTable.vue";

initialize();

const meta = {
  title: "Forms/Controls/Dictionary [combobox]",
  component: DevelopmentTable,
  tags: ["autodocs"],
  argTypes: {
    schema: { control: "object", description: "Schema u" },
    model: { control: "object", description: "Model" },
    options: { control: "object", description: "Opcje" },
  },
  args: {
    model: {},
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
      content: [
        {
          id: 27,
          label: "Test",
        },
      ],
    });
  }),
];

export const Standard: Story = {
  play: async (context) => {
    // const canvas = within(context.canvasElement);
    // const field = canvas.getByLabelText("Text area");
    // await userEvent.type(field, "This is standard text area...", { delay: 100 });
    // await expect(context.args.modelValue).toEqual({ textArea: "This is standard text area..." });
  },
  args: {
    model: {
      textField: "Maciej",
    },
    schema: {
      type: "object",
      properties: {
        textField: {
          label: "Textfield",
          layout: {
            component: "text-field",
          },
        },
        combobox: {
          label: "Combobox",
          layout: {
            component: "combobox",
          },
          source: {
            url: "/api/combo-mock?query={textField}",
            title: "label",
            value: "id",
            lazy: true,
            returnObject: false,
            singleOptionAutoSelect: true,
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST,
    },
  },
};
