// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect } from "@storybook/test";
import { userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";
import { SchemaTextField } from "../../types/schema/elements";
import { StoryTemplateWithValidation } from "../templates/story-template";

const meta = {
  title: "Forms/Controls/TextField",
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
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Text field");
    await userEvent.type(field, "This is standard text field...", { delay: 100 });
    await expect(context.args.modelValue).toEqual({ textField: "This is standard text field..." });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        textField: {
          label: "Text field",
          layout: {
            component: "text-field",
          },
        },
      },
    } as Schema,
  },
};
/**
 * You can set the default value of field from schema
 */
export const WithDefault: Story = {
  play: async (context) => {
    await expect(context.args.modelValue).toEqual({ textFieldWithDefault: "Item 1" });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        textFieldWithDefault: {
          label: "Text field",
          defaultValue: "Item 1",
          layout: {
            component: "text-field",
          },
        },
      },
    } as Schema,
  },
};
/**
 * You can personalize the form controls according to the options available in vuetify
 */
export const WithVuetifyProps: Story = {
  name: "TextField with Vuetify Props",
  args: {
    schema: {
      type: "object",
      properties: {
        textField: {
          label: "Text field",
          layout: {
            component: "text-field",
            props: {
              variant: "outlined",
              density: "compact",
            },
          },
        } as SchemaTextField,
      },
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
export const SimpleValidation: Story = {
  name: "TextField with required annotation",
  render: StoryTemplateWithValidation,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const exampleElement = canvas.getByLabelText("Text field");
    await userEvent.type(exampleElement, "Required field", {
      delay: 100,
    });
    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit);

    // 👇 Assert DOM structure
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        textField: {
          label: "Text field",
          layout: {
            component: "text-field",
          },
        },
      },
      required: ["textField"],
    } as Schema,
  },
};
