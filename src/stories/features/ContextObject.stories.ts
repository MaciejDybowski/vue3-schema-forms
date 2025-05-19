// @ts-nocheck
import { expect, within } from "@storybook/test";

import { waitForMountedAsync } from "../editable-fields/utils";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";

export default {
  title: "Features/Context Object",
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  name: "Case: current user mapping",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field1 = canvas.getByLabelText("Field with context dependency = Maciej");
    await expect(field1).toBeInTheDocument();
  },
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
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field1 = canvas.getByLabelText("Field with context dependency = dkowalski");
    await expect(field1).toBeInTheDocument();
    await expect(context.args.formModel).toEqual({
      item: "defaultText Super",
    });
  },
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
          username: "dkowalski",
        },
        workspaceId: "test",
        menuFeatureId: "test",
      },
    },
  },
};
