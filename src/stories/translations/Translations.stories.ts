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
 * #### Tłumaczenia dowolnego tekstu w formularzu
 * ` label: { $ref: '#/i18n/~$locale~/your_i18n_key' }` - definicja tłumaczenia opiera się o plugin i18n
 *
 * `i18n : object` - do definicji schematu formularza nalezy dołączyć obiekt z tłumaczeniami.
 * ##### !!! Schemat jest tłumaczony na samym początku procesu renderowania, zmiana języka 'live" może być kosztowna i wymaga przerenderowania całego formularza. !!!
 */
export const TranslationWithI18n: Story = {
  name: "Translations with i18n",
  args: {
    schema: schemaWithTranslation,
  },
}
