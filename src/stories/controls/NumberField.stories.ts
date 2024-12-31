// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect, fireEvent, userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";

const meta = {
  title: "Forms/Controls/NumberField",
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

export const Integer: Story = {
  play: async (context) => {
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

export const FloatWithTextOtherThanRight: Story = {
  play: async (context) => {

  },
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
