// @ts-nocheck
import SchemaEngine from "../components/app/SchemaEngine.vue"
import { Meta, StoryObj } from "@storybook/vue3"
import { ArgTypes } from "@storybook/types"
import { Schema } from "@/vocabulary/schema"
import { Layout } from "@/vocabulary/schema/elements"

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
  name: "Statyczny kontent",
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        h1: {
          content: "Static form text content",
          layout: {
            component: "static-content",
            tag: "h1",
          } as Layout,
        },
        h2: {
          content: "Static form text content",
          layout: {
            component: "static-content",
            tag: "h2",
          } as Layout,
        },
        h3: {
          content: "Static form text content",
          layout: {
            component: "static-content",
            tag: "h3",
          } as Layout,
        },
        h4: {
          content: "Static form text content",
          layout: {
            component: "static-content",
            tag: "h4",
          } as Layout,
        },
        h5: {
          content: "Static form text content",
          layout: {
            component: "static-content",
            tag: "h5",
          } as Layout,
        },
        paragraph: {
          content: "Static form text content",
          layout: {
            component: "static-content",
            tag: "p",
          } as Layout,
        },
        span: {
          content: "Static form text content",
          layout: {
            component: "static-content",
            tag: "span",
          } as Layout,
        },
        textField: {
          label: "Test",
          layout: {
            component: "text-field",
          } as Layout,
        },
      },
    } as Schema,
    options: {
      buttonProps: {
        variant: "outlined",
      },
      fieldProps: {
        variant: "outlined",
      },
    },
  },
}

export const Table1: Story = {
  name: "Edytowalna sekcja",
  args: {
    model: {},
    schema: {},
    options: {
      buttonProps: {
        variant: "outlined",
      },
    },
  },
}
