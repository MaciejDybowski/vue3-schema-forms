// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect } from "@storybook/test";
import { userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { EngineSourceField } from "../../types/engine/controls";
import { Schema } from "../../types/schema/Schema";
import { SimpleSource, Source } from "../../types/schema/elements";
import { StoryTemplateWithValidation } from "../templates/story-template";

const meta = {
  title: "Forms/Controls/Checkbox",
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
    const option2 = canvas.getByLabelText("Option 2");
    await userEvent.click(option2, { delay: 200 });
    await expect(context.args.modelValue).toEqual({ checkboxStandard: [2] });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        checkboxStandard: {
          label: "Choose option",
          layout: {
            component: "checkbox",
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
    const canvas = within(context.canvasElement);
    await expect(context.args.modelValue).toEqual({ checkboxWithDefault: [3] });
    const option2 = canvas.getByLabelText("Option 2");
    await userEvent.click(option2, { delay: 200 });
    await expect(context.args.modelValue).toEqual({ checkboxWithDefault: [3, 2] });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        checkboxWithDefault: {
          label: "Choose option",
          layout: {
            component: "checkbox",
          },
          default: [3],
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
    const canvas = within(context.canvasElement);
    const option2 = canvas.getByLabelText("Option 2");
    await expect(option2).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        checkboxWithCustomMapping: {
          label: "Choose option",
          layout: {
            component: "checkbox",
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
    const canvas = within(context.canvasElement);
    const option2 = canvas.getByLabelText("Option 2");
    await userEvent.click(option2, { delay: 200 });
    await expect(context.args.modelValue).toEqual({ checkboxWithCustomMappingObj: [{ id: 2, text: "Option 2" }] });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        checkboxWithCustomMappingObj: {
          label: "Choose option",
          layout: {
            component: "checkbox",
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
    const canvas = within(context.canvasElement);
    const option3 = canvas.getByLabelText("Option 3");
    await userEvent.click(option3, { delay: 200 });
    await expect(context.args.modelValue).toEqual({
      checkboxWithCustomMappingObjDefault: [
        {
          id: 2,
          text: "Option 2",
        },
        { id: 3, text: "Option 3" },
      ],
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        checkboxWithCustomMappingObjDefault: {
          label: "Choose option",
          layout: {
            component: "checkbox",
          },
          default: [{ id: 2, text: "Option 2" }],
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // <- wait for api call
    await expect(canvas.getByText("Option 4")).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        checkboxFromAPI: {
          label: "Options",
          layout: {
            component: "checkbox",
            props: {
              inline: true,
            },
          },
          source: {
            url: "/api/v1/options",
            title: "label",
            value: "id",
            returnObject: true,
          } as SimpleSource,
        },
      },
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
export const SimpleValidation: Story = {
  name: "Checkbox with required annotation",
  render: StoryTemplateWithValidation,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit, { delay: 600 });

    const exampleElement = canvas.getByLabelText("Option 3");
    await userEvent.click(exampleElement, "Required field", {
      delay: 600,
    });

    await userEvent.click(Submit, { delay: 600 });
    // 👇 Assert DOM structure
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        checkboxButtonRequired: {
          label: "Choose option",
          layout: {
            component: "checkbox",
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
      required: ["checkboxButtonRequired"],
    } as Schema,
  },
};
