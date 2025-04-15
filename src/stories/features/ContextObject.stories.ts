// @ts-nocheck
import { commonMetadata, formStoryWrapperTemplate } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Features/Context object",
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      properties: {
        description: {
          content:
            "We have access for `context` object in model for resolve variables. Context variables: userInfo, workspaceId, menuFeatureId",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        item: {
          label: "Field with context dependency = {context.userInfo.username}",
          layout: {
            component: "text-field",
          },
        },
      },
    },
    options: {
      context: {
        userInfo: {
          username: "Maciej",
          firstName: "Maciej",
        },
        workspaceId: "test",
        menuFeatureId: "test",
      },
    },
  },
};

export const StandardWithDefaultMapping: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      properties: {
        item: {
          label: "Field with context dependency = {context.userInfo.username}",
          defaultValue: "{context.userInfo.firstName:defaultText} Super",
          layout: {
            component: "text-field",
          },
        },
      },
    },
    options: {
      context: {
        userInfo: {
          username: "MaciejDybowski",
        },
        workspaceId: "test",
        menuFeatureId: "test",
      },
    },
  },
};
