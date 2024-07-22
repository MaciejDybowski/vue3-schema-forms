// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";
import { SchemaTextField } from "../../types/schema/elements";
import { StoryTemplateWithValidation } from "../templates/story-template";

const meta = {
  title: "Forms/Controls/Phone",
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
    const field = canvas.getByLabelText("Phone Input");
    await expect(field).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        phoneInput: {
          label: "Phone Input",
          layout: {
            component: "phone",
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
    await expect(context.args.modelValue).toEqual({ phoneInput: "+48510333202" });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        phoneInput: {
          label: "Phone Input",
          default: "+48510333202",
          layout: {
            component: "phone",
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
  name: "PhoneInput with Vuetify Props",
  args: {
    schema: {
      type: "object",
      properties: {
        phoneInput: {
          label: "Phone Input",
          layout: {
            component: "phone",
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

export const WithPhoneInputPropsProps: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Phone Input");
    await userEvent.click(field);

    await expect(canvas.getByText("Only valid phone numbers...")).toBeInTheDocument();
  },
  name: "PhoneInput with VPhoneInputProps",
  args: {
    schema: {
      type: "object",
      properties: {
        description: {
          layout: {
            component: "static-content",
            tag: "span",
          },
          content:
            "To modify the settings for the v-phone-input itself, you need to pass your own settings to the phoneInputProps object in schema definition",
        },
        phoneInput: {
          label: "Phone Input",
          layout: {
            component: "phone",
            props: {
              variant: "outlined",
              density: "compact",
            },
          },
          phoneInputProps: {
            hint: "Only valid phone numbers...",
            placeholder: "Type your number",
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
  name: "PhoneInput with required annotation",
  render: StoryTemplateWithValidation,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const exampleElement = canvas.getByLabelText("Phone input");
    await userEvent.type(exampleElement, "510333", {
      delay: 100,
    });

    await expect(canvas.getByText("The number provided is incorrect. (Ex: 12 345 67 89)")).toBeInTheDocument();

    await userEvent.type(exampleElement, "202");
    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit);

    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        phoneInput: {
          label: "Phone input",
          layout: {
            component: "phone",
          },
        },
      },
      required: ["phoneInput"],
    } as Schema,
  },
};
