// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3"
import { VueSchemaForms } from "@/components"
import { schemaWithTranslation } from "@/stories/schemas"

const meta = {
  title: "Forms/Features/Translations",
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
 * #### Translations for Any Text in the Form
 * `label: { $ref: '#/i18n/~$locale~/your_i18n_key' }` - the translation definition relies on the i18n plugin
 *
 * `i18n: object` - when defining the form schema, include an object with translations.
 * ##### !!! The schema is translated at the very beginning of the rendering process; changing the language "live" can be costly and requires re-rendering the entire form. !!!
 */
export const TranslationWithI18n: Story = {
  name: "Translations with i18n",
  args: {
    schema: schemaWithTranslation,
  },
}
