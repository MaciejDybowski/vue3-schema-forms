// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";
import { Schema } from "@/vocabulary/schema";
import { StoryTemplateWithValidation } from "../templates/story-template";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { VueSchemaForms } from "@/components";
import { EngineSourceField } from "@/vocabulary/engine/controls";
import { Source } from "@/vocabulary/schema/elements";

const meta = {
  title: "Forms/Controls/RadioButton",
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
    await expect(context.args.modelValue).toEqual({ radioButton: 1 });
    const option2 = canvas.getByLabelText("Option 2");
    await userEvent.click(option2, { delay: 200 });
    await expect(context.args.modelValue).toEqual({ radioButton: 2 });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        radioButton: {
          label: "Choose option",
          layout: {
            component: "radio-button",
          },
          source: {
            items: [
              { value: 1, title: "Option 1" },
              { value: 2, title: "Option 2" },
              { value: 3, title: "Option 3" },
            ],
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};
/**
 * You can set the default value of field from schema
 */
export const WithDefault: Story = {
  name: "With default (value)",
  play: async (context) => {
    await expect(context.args.modelValue).toEqual({ radioButtonWithDefault: 3 });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        radioButtonWithDefault: {
          label: "Choose option",
          layout: {
            component: "radio-button",
          },
          default: 3,
          source: {
            items: [
              { value: 1, title: "Option 1" },
              { value: 2, title: "Option 2" },
              { value: 3, title: "Option 3" },
            ],
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMapping: Story = {
  name: "Custom mapping",
  play: async (context) => {
    await expect(context.args.modelValue).toEqual({ radioButtonCustomMapping: 1 });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        radioButtonCustomMapping: {
          label: "Choose option",
          layout: {
            component: "radio-button",
          },
          source: {
            items: [
              { id: 1, text: "Option 1" },
              { id: 2, text: "Option 2" },
              { id: 3, text: "Option 3" },
            ],
            value: "id",
            title: "text",
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMappingReturnObject: Story = {
  name: "Custom mapper + return obj",
  play: async (context) => {
    await expect(context.args.modelValue).toEqual({ radioButtonCustomMappingObject: { id: 1, text: "Option 1" } });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        radioButtonCustomMappingObject: {
          label: "Choose option",
          layout: {
            component: "radio-button",
          },
          source: {
            items: [
              { id: 1, text: "Option 1" },
              { id: 2, text: "Option 2" },
              { id: 3, text: "Option 3" },
            ],
            value: "id",
            title: "text",
            returnObject: true,
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMappingReturnObjectDefault: Story = {
  name: "Custom mapper + obj + default",
  play: async (context) => {
    await expect(context.args.modelValue).toEqual({
      radioButtonCustomMappingObjectDefault: {
        id: 2,
        text: "Option 2",
      },
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        radioButtonCustomMappingObjectDefault: {
          label: "Choose option",
          layout: {
            component: "radio-button",
          },
          default: { id: 2, text: "Option 2" },
          source: {
            items: [
              { id: 1, text: "Option 1" },
              { id: 2, text: "Option 2" },
              { id: 3, text: "Option 3" },
            ],
            value: "id",
            title: "text",
            returnObject: true,
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const GetOptionsFromAPI: Story = {
  play: async (context) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // <- wait for api call
    await expect(context.args.modelValue).toEqual({ radioButtonOptionsFromAPI: { id: 1, label: "Option 1" } });
  },
  parameters: {
    mockData: [
      {
        url: "/api/v1/options",
        method: "GET",
        status: 200,
        response: [
          { id: 1, label: "Option 1" },
          { id: 2, label: "Option 2" },
          { id: 3, label: "Option 3" },
          { id: 4, label: "Option 4" },
        ],
      },
    ],
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        radioButtonOptionsFromAPI: {
          label: "Options",
          layout: {
            component: "radio-button",
            props: {
              inline: true,
            },
          },
          source: {
            url: "/api/v1/options",
            title: "label",
            value: "id",
            returnObject: true,
          } as Source,
        },
      },
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
export const SimpleValidation: Story = {
  name: "RadioButton with required annotation",
  render: StoryTemplateWithValidation,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const exampleElement = canvas.getByLabelText("Option 3");
    await userEvent.click(exampleElement, "Required field", {
      delay: 500,
    });
    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit);
    // 👇 Assert DOM structure
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        radioButtonRequired: {
          label: "Choose option",
          layout: {
            component: "radio-button",
          },
          source: {
            items: [
              { value: 1, title: "Option 1" },
              { value: 2, title: "Option 2" },
              { value: 3, title: "Option 3" },
            ],
          },
        } as EngineSourceField,
      },
      required: ["radioButtonRequired"],
    } as Schema,
  },
};
