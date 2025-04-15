// @ts-nocheck
import { expect, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { SchemaTextField } from "../../types/schema/elements";
import { commonMetadata, formStoryWrapperTemplate } from "../templates/shared-blocks";
import { StoryTemplateWithValidation } from "../templates/story-template";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Controls/TextField",
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
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
