// @ts-nocheck
import { StoryTemplateWithValidation } from "@/stories/templates/story-template";
import { expect, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { SchemaField } from "../../types/schema/elements";
import { commonMetadata } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Features/Reset Form",
  ...commonMetadata,
};

export const DefaultVariablesWhenReset: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Field B");
    await userEvent.type(field, "This is standard text field...", { delay: 100 });

    const Reset = canvas.getByText("Reset Form");
    await userEvent.click(Reset, { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      fieldA: null,
      fieldB: null,
    });
  },
  render: StoryTemplateWithValidation,
  args: {
    modelValue: {},
    schema: {
      properties: {
        fieldA: {
          label: "Field A",
          defaultValue: "Random text",
          layout: {
            component: "text-field",
          },
        } as SchemaField,
        fieldB: {
          label: "Field B",
          layout: {
            component: "text-field",
          },
        } as SchemaField,
      },
    } as Schema,
  },
};
