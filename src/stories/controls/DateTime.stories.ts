// @ts-nocheck
import { Schema } from "../../types/schema/Schema";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Controls/DateTime",
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
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
