// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";
import { VueSchemaForms } from "@/components";
import { offsetSchema } from "@/stories/schemas";

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
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * #### Arranging form fields using the "fill to end" function and offsets
 * `fillRow: boolean` - the space after the field is filled to the end of the row (completing to 12)
 *
 * `offset`: number - specifies the number of "empty" columns before the field that will be generated
 *
 * `cols: number | Cols` - specifies the column width in the grid system. It can be a number or an object that meets the structure of the `Cols` interface.
 */
export const FillRowAndOffsets: Story = {
  args: {
    schema: offsetSchema,
  },
};
