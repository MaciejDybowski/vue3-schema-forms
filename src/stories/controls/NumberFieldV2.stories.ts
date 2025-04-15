// @ts-nocheck
import { expect, fireEvent, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { commonMetadata, formStoryWrapperTemplate } from "../templates/shared-blocks";
import { waitForMountedAsync } from "./utils";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Controls/NumberFieldV2",
  ...formStoryWrapperTemplate,
};

export const Integer: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        numberInt: {
          label: "Number (int)",
          type: "int",
          layout: {
            component: "number-field-v2",
          },
        },
      },
    } as Schema,
  },
};

export const Required: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        numberInt: {
          label: "Number (int) required",
          type: "int",
          layout: {
            component: "number-field-v2",
          },
        },
      },
      required: ["numberInt"],
    } as Schema,
  },
};



export const ModelDependencyDefaultValue: Story = {
  play: async (context) => {},
  args: {
    formModel: {
      temp: 3
    },
    schema: {
      type: "object",
      properties: {
        numberInt: {
          label: "Number (int) required",
          defaultValue: "{temp}",
          type: "int",
          layout: {
            component: "number-field-v2",
          },
        },
      },
      required: ["numberInt"],
    } as Schema,
  },
};