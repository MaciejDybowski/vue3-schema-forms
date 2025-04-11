// @ts-nocheck
import { expect, fireEvent, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { commonMetadata } from "../templates/shared-blocks";
import { waitForMountedAsync } from "./utils";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Controls/NumberField",
  ...commonMetadata,
};

export const Integer: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Number (int)");
    await userEvent.type(field, "1", { delay: 300 });
    await expect(context.args.modelValue).toEqual({ numberInt: 1 });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        numberInt: {
          label: "Number (int)",
          type: "int",
          layout: {
            component: "number-field",
          },
        },
      },
    } as Schema,
  },
};

export const Required: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        numberInt: {
          label: "Number (int) required",
          type: "int",
          layout: {
            component: "number-field",
          },
        },
      },
      required: ["numberInt"],
    } as Schema,
  },
};

export const FloatWithTextOtherThanRight: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        numberInt: {
          label: "Number (float)",
          type: "float",
          precision: 2,
          layout: {
            component: "number-field",
            class: "content-center",
            cols: 4,
          },
        },
      },
    } as Schema,
  },
};

export const FloatStandard2DecimalPlaces: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Number (float)");
    await userEvent.type(field, "1.346", { delay: 300 });
    await expect(context.args.modelValue).toEqual({ numberFloat2: 1.35 });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        numberFloat2: {
          label: "Number (float)",
          type: "float",
          layout: {
            component: "number-field",
          },
        },
      },
    } as Schema,
  },
};

export const FloatStandard4DecimalPlaces: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Number (float)");
    await userEvent.type(field, "1.34632", { delay: 300 });
    await expect(context.args.modelValue).toEqual({ numberFloat4: 1.3463 });
  },
  args: {
    modelValue: {},
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

/* TODO - osobne pole na waluty
export const CurrencyMode: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Currency default");
    await userEvent.type(field, "1.34632", { delay: 300 });
    await expect(context.args.modelValue).toEqual({ currencyLocale: 1.3463 });
    fireEvent.focusOut(field);
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        currencyLocale: {
          label: "Currency default",
          type: "float",
          formatType: "currency",
          precision: 4,
          layout: {
            component: "number-field",
          },
        },
      },
    } as Schema,
  },
};


export const CurrencyModeProps: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Currency props");
    await userEvent.type(field, "1.34632", { delay: 300 });
    await expect(context.args.modelValue).toEqual({ currencyProps: 1.346 });
    fireEvent.focusOut(field);
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        currencyProps: {
          label: "Currency props",
          type: "float",
          formatType: "currency",
          currency: "USD",
          precision: 3,
          layout: {
            component: "number-field",
          },
        },
      },
    } as Schema,
  },
};
 */
export const PercentMode: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Percent");
    await userEvent.type(field, "4.34", { delay: 300 });
    await expect(context.args.modelValue).toEqual({ percent: 4.34 });
    fireEvent.focusOut(field);
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        percent: {
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

export const DependenciesInDefaultValue: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText("Percent");
    await expect(context.args.modelValue).toEqual({ percent: 32, number: 32 });
    fireEvent.focusOut(field);
  },
  args: {
    modelValue: {
      number: 32,
      percent: 32,
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
