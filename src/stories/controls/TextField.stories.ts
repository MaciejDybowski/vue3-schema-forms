// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3"
import { Schema } from "@/vocabulary/schema"
import { StoryTemplateWithValidation } from "../templates/story-template"
import { userEvent, within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import { VueSchemaForms } from "@/components"
import { SchemaTextField } from '@/vocabulary/schema/elements';

const meta = {
  title: "Forms/Controls/Pole tekstowe [TextField]",
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

export const Standard: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        textField: {
          label: "Pole tekstowe",
          layout: {
            component: "text-field",
          },
        },
      },
    } as Schema,
  },
}
/**
 * You can personalize the form controls according to the options available in vuetify
 */
export const WithVuetifyProps: Story = {
  name: "TextField with Vuetify Props",
  args: {
    schema: {
      type: "object",
      properties: {
        textField: {
          label: "Pole tekstowe",
          layout: {
            component: "text-field",
            props: {
              variant: "outlined",
              density: "compact"
            }
          },
        } as SchemaTextField,
      },
    } as Schema,
  },
}

/**
 * Example shows how to define a "required" field on a form
 */
export const SimpleValidation: Story = {
  name: "TextField with required annotation",
  render: StoryTemplateWithValidation,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const exampleElement = canvas.getByLabelText("Pole tekstowe")
    await userEvent.type(exampleElement, "Wymagane pole", {
      delay: 100,
    })
    const Submit = canvas.getByText("Validate")
    await userEvent.click(Submit)

    // 👇 Assert DOM structure
    await expect(
      canvas.getByText("Walidacja zakończona sukcesem")
    ).toBeInTheDocument()
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        textField: {
          label: "Pole tekstowe",
          layout: {
            component: "text-field",
          },
        },
      },
      required: ["textField"],
    } as Schema,
  },
}
