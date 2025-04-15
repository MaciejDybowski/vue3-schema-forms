// @ts-nocheck
import { expect } from "@storybook/test";

import { commonMetadata, formStoryWrapperTemplate } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Features/CSS Class binding",
  ...formStoryWrapperTemplate,
};

export const Story1: Story = {
  name: "Bind class",
  play: async (context) => {
    const field = document.getElementsByClassName("text-h4");
    await expect(field[0]).not.toEqual(null);
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
