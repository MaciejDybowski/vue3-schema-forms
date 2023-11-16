// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3"
import { VueSchemaForms } from "@/components"
import { offsetSchema } from "@/stories/schemas"

const meta = {
  title: "Forms/Features/Layouts",
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
 * #### Układanie pól formularza za pomocą funkcji "wypełnij do końca" oraz offsetów
 * `fillRow: boolean` - przestrzeń za polem zostaje wypełniona do końca wiersza (dopełnienie do 12)
 *
 * `offset`: number - określa liczbę kolumn "pustych" przed polem które zostanie wygenerowane
 *
 * `cols: number | Cols` - określa szerokość kolumny w systemie grid. Może być liczbą lub obiektem spełniającym strukturę interfejsu `Cols`
 */
export const FillRowAndOffsets: Story = {
  args: {
    schema: offsetSchema,
  },
}
