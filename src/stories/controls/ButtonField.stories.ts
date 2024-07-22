// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";
import { Schema } from "../../types/schema/Schema";
import { VueSchemaForms } from "@/components";

const meta = {
  title: "Forms/Controls/Button",
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
          label: "Click it!",
          layout: {
            component: "button",
          },
        },
      },
    } as Schema,
  },
};

export const WithProps: Story = {
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
          label: "Click it!",
          layout: {
            component: "button",
            props: {
              "prepend-icon": "mdi-plus",
            },
          },
        },
      },
    } as Schema,
  },
};
