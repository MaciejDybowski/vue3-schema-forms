// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";
import { VueSchemaForms } from "@/components";
import { Schema } from "@/vocabulary/schema";
import { SchemaField } from "../../vocabulary/schema/elements";
import { StoryTemplateWithCustomValidation } from "../templates/story-template";

const meta = {
  title: "Forms/Features/Validations",
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
 * #### Required field with nested
 */
export const RequiredWithNested: Story = {
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        item1: {
          label: "Normal Item",
          layout: { component: "text-field" },
        },
        nested: {
          properties: {
            item2: {
              label: "Nested Item",
              layout: { component: "text-field" },
            },
          },
          required: ["item2"],
        },
      },
      required: ["item1"] as Schema,
    },
  },
};

const validationExample = {
  type: "object",
  properties: {
    field1: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field2: { label: "Identifier", layout: { component: "text-field" } } as SchemaField,
    field3: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field4: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field5: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field6: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field7: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field8: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field9: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field10: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field11: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field12: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field13: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field14: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field15: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field16: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field17: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field18: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
  },
  required: ["field2"],
} as Schema;
export const ExposedValidationAndScroll: Story = {
  args: {
    defaultFormActions: true,
    validationBehaviour: "scroll",
    modelValue: {},
    schema: validationExample,
  },
};

export const ExposedValidationAndMessages: Story = {
  args: {
    defaultFormActions: true,
    validationBehaviour: "messages",
    modelValue: {},
    schema: validationExample,
  },
};

export const AddCustomSubmitWithBuiltInValidation: Story = {
  render: StoryTemplateWithCustomValidation,
  args: {
    modelValue: {},
    schema: validationExample,
  },
};
