// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";
import { Schema } from "@/vocabulary/schema";
import { StoryTemplateWithValidation } from "../templates/story-template";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { VueSchemaForms } from "@/components";
import { SchemaTextField } from "@/vocabulary/schema/elements";

const meta = {
  title: "Forms/Controls/Date [experimental]",
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

export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Date");

    await userEvent.click(field);
    const dateButton = document.getElementsByClassName("v-btn__content");
    await userEvent.click(dateButton[4], { delay: 400 });

    await userEvent.click(field);
    await expect(context.args.modelValue.simpleDate).not.toEqual(null);
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        simpleDate: {
          label: "Date",
          layout: {
            component: "date-picker",
          },
        },
      },
    } as Schema,
  },
};
/**
 * You can set the default value of field from schema
 */
export const WithDefault: Story = {
  play: async (context) => {
    await expect(context.args.modelValue).toEqual({ dateWithDefault: "2023-12-31T23:00:00.000Z" });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        dateWithDefault: {
          label: "Date",
          default: "2023-12-31T23:00:00.000Z",
          layout: {
            component: "date-picker",
          },
        },
      },
    } as Schema,
  },
};
/**
 * You can personalize the form controls according to the options available in vuetify
 */
export const WithVuetifyProps: Story = {
  name: "DatePicker with Vuetify Props",
  args: {
    schema: {
      type: "object",
      properties: {
        textField: {
          label: "Date",
          layout: {
            component: "date-picker",
            props: {
              variant: "outlined",
              density: "compact",
            },
          },
        } as SchemaTextField,
      },
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
export const SimpleValidation: Story = {
  name: "DatePicker with required annotation",
  render: StoryTemplateWithValidation,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const Submit = canvas.getByText("Validate");

    await userEvent.click(Submit);
    // 👇 Assert DOM structure
    await expect(canvas.getByText("Field is required.")).toBeInTheDocument();

    const field = canvas.getByLabelText("Date");

    await userEvent.click(field);
    const dateButton = document.getElementsByClassName("v-btn__content");
    await userEvent.click(dateButton[10], { delay: 400 });
    await userEvent.click(field);

    await userEvent.click(Submit);
    // 👇 Assert DOM structure
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        requiredDate: {
          label: "Date",
          layout: {
            component: "date-picker",
          },
        },
      },
      required: ["requiredDate"],
    } as Schema,
  },
};
