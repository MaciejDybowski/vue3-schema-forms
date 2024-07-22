// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";
import { VueSchemaForms } from "@/components";
import { StoryTemplateWithValidation } from "@/stories/templates/story-template";
import { Schema } from "../../types/schema/Schema";
import { SchemaField } from "../../types/schema/elements";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta = {
  title: "Forms/Features/Reset Form",
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
          default: "Random text",
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
