// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3"
import { VueSchemaForms } from "@/components"
import { conditionSchema } from "@/stories/schemas"

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
} satisfies Meta<typeof VueSchemaForms>

export default meta

type Story = StoryObj<typeof meta>

/**
 * #### Warunkowe renderowanie
 *  Biblioteka potrafi rozwiązać zależności pomiędzy polami bazując na bibliotece https://www.npmjs.com/package/expr-eval
 *
 * ` if: string` - wartość definiowana w obiekcie `Layout`
 *
 */
export const TranslationWithI18n: Story = {
  name: "Conditional rendering [if]",
  args: {
    schema: conditionSchema,
  },
}
