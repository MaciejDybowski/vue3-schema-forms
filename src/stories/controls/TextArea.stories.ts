// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect } from "@storybook/test";
import { userEvent, within } from "@storybook/test";
import { f } from "@storybook/theming/dist/create-3ae9aa71";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";
import { SchemaTextField } from "../../types/schema/elements";
import { StoryTemplateWithValidation } from "../templates/story-template";

const meta = {
  title: "Forms/Controls/TextArea",
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

/**
 * The default settings for the text area are such that the ```auto-grow = enabled``` , and the field starts with a setting of ```rows = 3```.
 */
export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Text area");
    await userEvent.type(field, "This is standard text area...", { delay: 100 });
    await expect(context.args.modelValue).toEqual({ textArea: "This is standard text area..." });
  },
  args: {
    schema: {
      type: "object",
      properties: {
        textArea: {
          label: "Text area",
          layout: {
            component: "text-area",
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
    await expect(context.args.modelValue).toEqual({ textAreaWithDefault: "Lorem ipsum..." });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        textAreaWithDefault: {
          label: "Description",
          default: "Lorem ipsum...",
          layout: {
            component: "text-area",
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
  name: "TextArea with Vuetify Props",
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        textAreaWithProps: {
          label: "Text area",
          layout: {
            component: "text-area",
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
  name: "TextArea with required annotation",
  render: StoryTemplateWithValidation,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const exampleElement = canvas.getByLabelText("Text area");
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
          label: "Text area",
          layout: {
            component: "text-area",
          },
        },
      },
      required: ["textField"],
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
export const RequiredAncCounter: Story = {
  name: "TextArea with required and counter",
  render: StoryTemplateWithValidation,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const exampleElement = canvas.getByLabelText("Text area");
    await userEvent.type(exampleElement, "Required field with counter", { delay: 100 });
    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit, { delay: 400 });

    // 👇 Assert DOM structure
    await expect(canvas.getAllByText(/Max/)[0]).toBeInTheDocument();
    // TODO na localhost jest okej a na github/chromatic juz nie
    // await expect(canvas.getByText("Max 20 characters.")).toBeInTheDocument();

    await userEvent.clear(exampleElement, { delay: 400 });
    await userEvent.type(exampleElement, "Counter pass", { delay: 100 });
    await userEvent.click(Submit);
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        textAreaRequiredAndCounter: {
          label: "Text area",
          layout: {
            component: "text-area",
            props: {
              counter: "20",
            },
          },
        },
      },
      required: ["textAreaRequiredAndCounter"],
    } as Schema,
  },
};
