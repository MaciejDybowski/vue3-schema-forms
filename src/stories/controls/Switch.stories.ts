// @ts-nocheck
import { expect, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { commonMetadata } from "../templates/shared-blocks";
import { waitForMountedAsync } from "./utils";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Controls/Switch",
  ...commonMetadata,
};

export const Standard: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Change it!");
    //await userEvent.type(field, "This is standard text area...", { delay: 100 });
    await expect(context.args.modelValue).toEqual({ switch: false });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        switch: {
          label: "Change it!",
          layout: {
            component: "switch",
          },
        },
      },
    } as Schema,
  },
};

export const Default: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Change it!");
    //await userEvent.type(field, "This is standard text area...", { delay: 100 });
    await expect(context.args.modelValue).toEqual({ switchDefault: true });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        switchDefault: {
          defaultValue: true,
          label: "Change it!",
          layout: {
            component: "switch",
          },
        },
      },
    } as Schema,
  },
};

export const Colorful: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Change it!");
    //await userEvent.type(field, "This is standard text area...", { delay: 100 });
    await expect(context.args.modelValue).toEqual({ switchDefault: true });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        switchDefault: {
          defaultValue: true,
          label: "Change it!",
          layout: {
            component: "switch",
            props: {
              color: "red",
            },
          },
        },
      },
    } as Schema,
  },
};

export const ChangeValueTest: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Change it!");
    await userEvent.click(field, { delay: 200 });
    await expect(context.args.modelValue).toEqual({ switchValueTest: true });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        switchValueTest: {
          label: "Change it!",
          layout: {
            component: "switch",
          },
        },
      },
    } as Schema,
  },
};

export const CustomMappingValues: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Change it!");

    await expect(context.args.modelValue).toEqual({ customSwitchDefault: "No" });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        customSwitchDefault: {
          label: "Change it!",
          layout: {
            component: "switch",
            props: {
              "false-value": "No",
              "true-value": "Yes",
            },
          },
        },
      },
    } as Schema,
  },
};

export const CustomMappingValuesChangeTest: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Change it!");
    await userEvent.click(field, { delay: 200 });
    await expect(context.args.modelValue).toEqual({ customSwitchTest: "Yes" });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        customSwitchTest: {
          label: "Change it!",
          layout: {
            component: "switch",
            props: {
              "false-value": "No",
              "true-value": "Yes",
            },
          },
        },
      },
    } as Schema,
  },
};

export const MultipleConfiguration: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Change it! - custom");
    await userEvent.click(field, { delay: 200 });
    await expect(context.args.modelValue).toEqual({ switch1: false, switch2: "Yes" });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        switch1: {
          label: "Change it! - boolean",
          layout: {
            component: "switch",
          },
        },
        switch2: {
          label: "Change it! - custom",
          layout: {
            component: "switch",
            props: {
              "false-value": "No",
              "true-value": "Yes",
            },
          },
        },
      },
    } as Schema,
  },
};
