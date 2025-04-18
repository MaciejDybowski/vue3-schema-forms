// @ts-nocheck
import { initialize } from "msw-storybook-addon";

import { expect, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";



export default {
  title: "Forms/Controls/TextField",
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  name: "Standard",
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Text field");
    await userEvent.type(field, "This is standard text field...", { delay: 100 });
    await expect(context.args.formModel).toEqual({ textField: "This is standard text field..." });
  },
  args: {
    formModel: {},
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
  name: "Default value",
  play: async (context) => {
    await expect(context.args.formModel).toEqual({ textFieldWithDefault: "Item 1" });
  },
  args: {
    formModel: {},
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
 * Example shows how to define a "required" field on a form
 */
export const SimpleValidation: Story = {
  name: "Required",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const exampleElement = canvas.getByLabelText("Text field");
    await userEvent.type(exampleElement, "Required field", {
      delay: 100,
    });
    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit);
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    formModel: {},
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
