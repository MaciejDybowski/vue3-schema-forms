// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";

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

export const CopyToClipboard: Story = {
  args: {
    modelValue: {
      input: "Lorem ipsum...",
    },
    schema: {
      type: "object",
      properties: {
        input: {
          label: "Input",
          layout: {
            component: "text-area",
          },
        },
        button: {
          label: "Copy above",
          layout: {
            component: "button",
            props: {
              "append-icon": "mdi-content-copy",
            },
          },
          mode: "copy",
          config: {
            modelReference: "input",
          },
        },
      },
    },
  },
};

export const DialogWithInjectedForm: Story = {
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        button: {
          label: "Open dialog!",
          layout: {
            component: "button",
          },
          mode: "form-and-action",
          config: {
            code: "update_csv",
            modelReference: "popupModel",
            title: "Title of the dialog - static text without deps",
            acceptText: "Import",
          },
          schema: {
            properties: {
              csvBody: {
                label: "CsvBody",
                layout: {
                  component: "text-field",
                  cols: 9,
                },
              },
              button: {
                label: "Copy CSV",
                layout: {
                  component: "button",
                  props: {
                    "append-icon": "mdi-content-copy",
                  },
                  cols: 3,
                },
                mode: "copy",
                config: {
                  modelReference: "csvBody",
                },
              },
            },
          },
        },
      },
    },
  },
};
