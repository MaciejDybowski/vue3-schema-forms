// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";
import { Schema } from "@/vocabulary/schema";
import { VueSchemaForms } from "@/components";
import { Layout } from "@/vocabulary/schema/elements";

const meta = {
  title: "Forms/Static content",
  component: VueSchemaForms,
  tags: ["autodocs"],
  argTypes: {
    schema: {
      control: "object",
      description: "Schema" /*table: { disable: true }*/,
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

export const Examples: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        h1: {
          content: "Static form text content <h1>",
          layout: {
            component: "static-content",
            tag: "h1",
          } as Layout,
        },
        h2: {
          content: "Static form text content <h2>",
          layout: {
            component: "static-content",
            tag: "h2",
          } as Layout,
        },
        h3: {
          content: "Static form text content <h3>",
          layout: {
            component: "static-content",
            tag: "h3",
          } as Layout,
        },
        h4: {
          content: "Static form text content <h4>",
          layout: {
            component: "static-content",
            tag: "h4",
          } as Layout,
        },
        h5: {
          content: "Static form text content <h5>",
          layout: {
            component: "static-content",
            tag: "h5",
          } as Layout,
        },
        paragraph: {
          content: "Static form text content <p> tag",
          layout: {
            component: "static-content",
            tag: "p",
          } as Layout,
        },
        span: {
          content: "Static form text content <span> tag",
          layout: {
            component: "static-content",
            tag: "span",
          } as Layout,
        },
        longText: {
          content:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          layout: {
            component: "static-content",
            tag: "span",
          } as Layout,
        },
      },
    } as Schema,
    options: {
      buttonProps: {
        variant: "outlined",
      },
      fieldProps: {
        variant: "outlined",
      },
    },
  },
};
