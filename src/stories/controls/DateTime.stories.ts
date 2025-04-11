// @ts-nocheck
import { Schema } from "../../types/schema/Schema";
import { commonMetadata } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Controls/DateTime",
  ...commonMetadata,
};

export const Standard: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        simpleDate: {
          label: "DateTime",
          layout: {
            component: "date-time-picker",
          },
        },
      },
    } as Schema,
  },
};
