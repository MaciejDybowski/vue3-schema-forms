// @ts-nocheck
import { initialize } from "msw-storybook-addon";

import { expect, fireEvent, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";
import { waitForMountedAsync } from "./utils";



export default {
  title: "Elements/Editable/NumberField",
  ...formStoryWrapperTemplate,
};

export const TypeInteger: Story = {
  name: "Integer",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Number field");
    await userEvent.type(field, "{backspace}");
    await userEvent.type(field, "1", { delay: 300 });
    await expect(context.args.formModel).toEqual({ numberField: 1 });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        numberField: {
          label: "Number field",
          type: "int",
          layout: {
            component: "number-field",
          },
        },
      },
    } as Schema,
  },
};

export const TypeFloat: Story = {
  name: "Float",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Number field");
    await userEvent.type(field, "{backspace}");
    await userEvent.type(field, "1.25", { delay: 300 });
    await expect(context.args.formModel).toEqual({ numberField: 1.25 });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "If `type=float` precision is equal 2",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        numberField: {
          label: "Number field",
          type: "float",
          layout: {
            component: "number-field",
          },
        },
      },
    } as Schema,
  },
};

export const DefaultValue: Story = {
  name: "Default value",
  play: async (context) => {
    await waitForMountedAsync();
    await expect(context.args.formModel).toEqual({ numberInt: 1, numberFloat: 1.25 });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        numberInt: {
          defaultValue: 1,
          label: "Number int",
          type: "int",
          layout: {
            component: "number-field",
          },
        },
        numberFloat: {
          defaultValue: 1.25,
          label: "Number float",
          type: "float",
          layout: {
            component: "number-field",
          },
        },
      },
    } as Schema,
  },
};

export const Required: Story = {
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    const exampleElement = canvas.getByLabelText("Number field");
    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit);

    await userEvent.type(exampleElement, "1", {
      delay: 100,
    });

    await userEvent.click(Submit);
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        numberField: {
          label: "Number field",
          type: "int",
          layout: {
            component: "number-field",
          },
        },
      },
      required: ["numberField"],
    } as Schema,
  },
};

export const CenterTextInField: Story = {
  name: "Case: change alignment of field value",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Number field");
    await userEvent.type(field, "1.25", { delay: 300 });
    await expect(context.args.formModel).toEqual({ numberField: 1.25 });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        numberField: {
          label: "Number field",
          type: "float",
          layout: {
            component: "number-field",
            class: "content-center",
            cols: 12,
          },
        },
      },
    } as Schema,
  },
};
export const FloatStandard4DecimalPlaces: Story = {
  name: "Case: change precision",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Number (float)");
    await userEvent.type(field, "1.34632", { delay: 300 });
    await expect(context.args.formModel).toEqual({ numberFloat4: 1.3463 });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        numberFloat4: {
          label: "Number (float)",
          type: "float",
          precision: 4,
          layout: {
            component: "number-field",
          },
        },
      },
    } as Schema,
  },
};

export const DependencyDecimalPlaces: Story = {
  name: "Case: change precision with dependency",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Number (float)");
    await userEvent.type(field, "1.34632", { delay: 300 });
    await expect(context.args.formModel).toEqual({ decimalPlaces: 4, numberFloat4: 1.3463 });
  },
  args: {
    formModel: {
      decimalPlaces: 4,
    },
    schema: {
      type: "object",
      properties: {
        span: {
          content: "For static decimal places dependency we can pass a `path` for variable in model",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        numberFloat4: {
          label: "Number (float)",
          type: "float",
          precision: "decimalPlaces",
          layout: {
            component: "number-field",
          },
        },
      },
    } as Schema,
  },
};

export const DependenciesInDefaultValue: Story = {
  name: "Case: default value from model dependency",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Percent");
    await expect(context.args.formModel).toEqual({ percent: 32, number: 32 });
    fireEvent.focusOut(field);
  },
  args: {
    formModel: {
      number: 32,
    },
    schema: {
      type: "object",
      properties: {
        percent: {
          defaultValue: "{number}",
          label: "Percent",
          type: "float",
          formatType: "percent",
          layout: {
            component: "number-field",
          },
        },
      },
    } as Schema,
  },
};
