// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";
import { VueSchemaForms } from "@/components";
import { conditionSchema } from "@/stories/schemas";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Schema } from "@/vocabulary/schema";
import { SchemaField, SchemaTextField } from "@/vocabulary/schema/elements";
import { StoryTemplateWithValidation } from "@/stories/templates/story-template";

const meta = {
  title: "Forms/Features/ConditionalRendering",
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
 * #### Conditional Rendering
 * The library is capable of resolving dependencies between fields based on the library https://www.npmjs.com/package/expr-eval
 *
 * `if: string` - a value defined in the `Layout` object
 */
export const ConditionStory: Story = {
  name: "if",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const login = canvas.getByLabelText("Login");
    const password = canvas.getByLabelText("Password");

    await userEvent.type(login, "admin", { delay: 100 });
    await userEvent.type(password, "admin", { delay: 300 });

    const rendered = canvas.getByLabelText("Result");
    expect(rendered).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: conditionSchema,
  },
};

export const ConditionalWithDuplicatedSection: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Test");
    await userEvent.type(field, "root", { delay: 100 });

    const ifField = canvas.getByLabelText("Some field with if");
    await userEvent.type(ifField, "Test", { delay: 100 });

    console.debug(context.args.modelValue);
    await expect(context.args.modelValue).toEqual({
      data: {
        test: "root",
      },
      invoice: {
        items: [{ someFieldWithIf: "Test" }],
      },
    });
  },
  args: {
    modelValue: {},
    schema: {
      properties: {
        data: {
          properties: {
            test: {
              label: "Test",
              layout: {
                component: "text-field",
                cols: 3,
              },
            } as SchemaTextField,
          },
        },
        invoice: {
          properties: {
            items: {
              layout: {
                component: "duplicated-section",
                schema: {
                  properties: {
                    someField: {
                      label: "Item",
                      layout: { component: "text-field", cols: 3 },
                    },
                    someFieldWithIf: {
                      label: "Some field with if",
                      layout: { component: "text-field", cols: 3, if: "data.test=='root'" },
                    },
                  },
                },
              },
            } as SchemaField,
          },
        },
      },
    } as Schema,
  },
};
