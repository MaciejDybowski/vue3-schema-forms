// @ts-nocheck
import { expect, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { SchemaTextField } from "../../types/schema/elements";
import { commonMetadata } from "../templates/shared-blocks";
import { StoryTemplateWithValidation } from "../templates/story-template";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Controls/TextArea",
  ...commonMetadata,
};
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
          defaultValue: "Lorem ipsum...",
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
