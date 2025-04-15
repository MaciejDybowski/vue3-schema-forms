// @ts-nocheck
import { initialize, mswLoader } from "msw-storybook-addon";

import { Meta, StoryObj } from "@storybook/vue3";

import FormStoryWrapper from "../components/app/FormStoryWrapper.vue";
import meta from "./development-old.stories";

initialize();

export default {
  title: "Development Stories",
  component: FormStoryWrapper,
  args: {
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: "outlined",
        density: "comfortable",
      },
    },
  },
  loaders: [mswLoader],
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof meta>;

export const Story1: Story = {
  args: {
    formModel: {
      textField: "Input 1",
    },
    schema: {
      type: "object",
      properties: {
        textField: {
          label: "test",
          layout: {
            component: "key-value-list",
            cols: 6
          },
        },
      },
      i18n: {},
    },
  },
  parameters: {},
};
