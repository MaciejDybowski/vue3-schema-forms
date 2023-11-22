// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3"
import { VueSchemaForms } from "@/components"
import { Schema } from "@/vocabulary/schema"

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
} satisfies Meta<typeof VueSchemaForms>

export default meta

type Story = StoryObj<typeof meta>

/**
 * #### Required field with nested
 */
export const RequiredWithNested: Story = {
  args: {
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
}
