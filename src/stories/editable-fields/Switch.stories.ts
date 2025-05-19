// @ts-nocheck
import { expect, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";
import { waitForMountedAsync } from "./utils";

export default {
  title: "Elements/Editable/Switch",
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Change it!");
    await expect(context.args.formModel).toEqual({ switch: false });
    await userEvent.click(field, { delay: 200 });
    await expect(context.args.formModel).toEqual({ switch: true });
  },
  args: {
    formModel: {},
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
  name: "Default Value",
  play: async (context) => {
    await waitForMountedAsync();
    await expect(context.args.formModel).toEqual({ switchDefault: true });
  },
  args: {
    formModel: {},
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
  name: "Props: color",
  play: async (context) => {
    await waitForMountedAsync();
    await expect(context.args.formModel).toEqual({ switchDefault: true });
  },
  args: {
    formModel: {},
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

export const CustomMappingValues: Story = {
  name: "Mapper: custom values",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Change it!");

    await expect(context.args.formModel).toEqual({ customSwitchDefault: "No" });
    await userEvent.click(field, { delay: 200 });
    await expect(context.args.formModel).toEqual({ customSwitchDefault: "Yes" });
  },
  args: {
    formModel: {},
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

export const MultipleConfiguration: Story = {
  name: "Case: multiple configuration",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Change it! - custom");
    await userEvent.click(field, { delay: 200 });
    await expect(context.args.formModel).toEqual({ switch1: false, switch2: "Yes" });
  },
  args: {
    formModel: {},
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

export const VisibilityMode: Story = {
  name: "Mode: visibility",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Change it!");
    await userEvent.click(field, { delay: 200 });

    const fieldDependent = canvas.getByLabelText("Textfield (readonly)");
    await expect(context.args.formModel).toEqual({});
    await expect(fieldDependent).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content:
            "Switch with mode='visibility' does not emit an event outside the form. It only works internally and allows in readonly mode for show/hide interactions",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        textFieldAbove: {
          label: "Textfield (above)",
          layout: {
            component: "text-field",
          },
        },
        switchDefault: {
          mode: "visibility",
          label: "Change it!",
          layout: {
            component: "switch",
          },
        },
        textField: {
          label: "Textfield (readonly)",
          layout: {
            component: "text-field",
            if: "nata(switchDefault)",
          },
        },
      },
    } as Schema,
    options: {
      fieldProps: {
        variant: "outlined",
      },
    },
  },
};
