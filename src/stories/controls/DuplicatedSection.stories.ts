// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3"
import { Schema } from "@/vocabulary/schema"
import { VueSchemaForms } from "@/components"
import { StoryTemplate } from "@/stories/templates/story-template"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"

const meta = {
  title: "Forms/Controls/DuplicatedSection",
  component: VueSchemaForms,
  tags: ["autodocs"],
  argTypes: {
    schema: {
      control: "object",
      description: "Schema" /*table: { disable: true }*/,
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

export const Standard: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            items: {
              product: {
                label: "Product",
                layout: { component: "text-field", cols: 6 },
              },
            },
          },
        },
      },
    },
  },
}

export const WithDivider: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            items: {
              product: {
                label: "Product",
                layout: { component: "text-field", cols: 12 },
              },
            },
            options: {
              showDivider: true,
            },
          },
        },
      },
    },
  },
}

export const WithBtnProps: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            items: {
              product: {
                label: "Product",
                layout: { component: "text-field", cols: 12 },
              },
            },
            options: {
              addBtnText: { $ref: "#/i18n/~$locale~/addAction" },
            },
          },
        },
      },
      i18n: {
        en: {
          addAction: "Add item",
        },
        pl: {
          addAction: "Dodaj pozycję",
        },
      },
    },
    options: {
      buttonProps: {
        variant: "outlined",
        rounded: "xl",
      },
    },
  },
}

export const Actions: Story = {
  name: "Actions",
  render: StoryTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const addBtn = canvas.queryAllByRole("button")[1]

    await userEvent.click(addBtn, { delay: 400 })
    const sections = canvas.getAllByLabelText("Product")
    await expect(sections[1]).toBeInTheDocument()

    await userEvent.hover(sections[1], { delay: 200 })
    const contextMenu = canvas.queryAllByRole("button")[1]
    await userEvent.click(contextMenu, { delay: 200 })

    //  console.debug(canvas)
    //  //TODO test for click context menu...?
    // const contextMenuDelete1 = canvas.findByTestId("delete")
    // console.debug(contextMenuDelete1)
    //console.debug(contextMenuDelete1)
    //await userEvent.click(contextMenuDelete, { delay: 200 });
  },
  args: {
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            items: {
              product: {
                label: "Product",
                layout: { component: "text-field", cols: 12 },
              },
            },
            options: {
              showDivider: true,
            },
          },
        },
      },
    },
    modelValue: {},
  },
}
