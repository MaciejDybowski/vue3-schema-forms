// @ts-nocheck
import { commonMetadata } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Integrations",
  ...commonMetadata,
};

export const Dialog_Table_Integration: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        items: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                nazwa: {
                  label: "Item",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              showDivider: true,
              addBtnMode: "feature",
            },
          },
        },
      },
    },
  },
};

export const Dialog_Table_Action: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        fieldA: {
          label: "Fiela D",
          layout: {
            component: "text-field",
          },
        },
        items: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                nazwa: {
                  label: "Item",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              showDivider: true,
              addBtnMode: "action",
              action: {
                code: "batchItemAdd",
              },
            },
          },
        },
      },
    },
  },
};
