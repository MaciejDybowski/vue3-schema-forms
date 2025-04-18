// @ts-nocheck
import { initialize } from "msw-storybook-addon";

import { expect } from "@storybook/test";

import { waitForMountedAsync } from "../controls/utils";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";



export default {
  title: "Forms/Features/Passing css classes",
  ...formStoryWrapperTemplate,
};

export const Story1: Story = {
  name: "Example 1",
  play: async (context) => {
    await waitForMountedAsync();
    const field = document.getElementsByClassName("text-h4");
    await expect(field[0]).toBeInTheDocument();
  },
  args: {
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Text with class",
          layout: {
            component: "static-content",
            tag: "span",
            class: "text-subtitle-4 text-h4",
          },
        },
        textField: {
          label: "Text",
          layout: {
            component: "text-field",
          },
        },
      },
    },
  },
};
