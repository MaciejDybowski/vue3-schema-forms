import SchemaEngine from "../components/app/SchemaEngine.vue"
import { Meta, StoryObj } from "@storybook/vue3"
import {
  duplicatedSectionSchema,
} from "./schemas"
import { ArgTypes } from "@storybook/types"

const meta = {
  title: "Development Table",
  component: SchemaEngine,
  argTypes: {
    schema: { control: "object", description: "Schema u" },
    modelValue: { control: "object", description: "Model" },
    options: { control: "object", description: "Opcje" },
  } as Partial<ArgTypes<any>>,
  args: {
    options: {
      fieldProps: {
        variant: "outlined",
        density: "compact",
      },
    },
  },
} satisfies Meta<typeof SchemaEngine>

export default meta
type Story = StoryObj<typeof meta>

export const Table5: Story = {
  name: "Duplikowana",
  args: {
    model: {
      users: [
        { field1: "Test" },
        { field1: "Test2" },
        { field1: "Test3" },
        { field1: "Test4" },
      ],
    },
    schema: duplicatedSectionSchema,
  },
}
