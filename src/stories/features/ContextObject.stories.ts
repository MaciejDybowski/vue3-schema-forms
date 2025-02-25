// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  title: "Forms/Features/Context object",
  component: VueSchemaForms,
  tags: ["autodocs"],
  argTypes: {
    schema: {
      control: "object",
      description: "Schema u" /*table: { disable: true }*/,
    },
    modelValue: {
      control: "object",
      description: "Model" /*table: { disable: true }*/,
    },
    options: {
      control: "object",
      description: "Opcje" /*table: { disable: true }*/,
    },
    "update:modelValue": { table: { disable: true } },
  },
  args: {
    modelValue: {},
    options: {},
  },
  parameters: {
    controls: { hideNoControlsWarning: true }, //https://github.com/storybookjs/storybook/issues/24422
  },
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      properties: {
        description: {
          content: "We have access for `context` object in model for resolve variables. Context variables: userInfo, workspaceId, menuFeatureId",
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
        menuFeatureId: "test"
      },
    },
  },
};

export const StandardWithDefaultMapping: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
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
        menuFeatureId: "test"
      },
    },
  },
};
