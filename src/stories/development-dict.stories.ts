// @ts-nocheck
import { ArgTypes } from "@storybook/types";
import { Meta, StoryObj } from "@storybook/vue3";

import DevelopmentTable from "../components/app/DevelopmentTable.vue";

const meta = {
  title: "Development Dictionary",
  component: DevelopmentTable,
  argTypes: {
    schema: { control: "object", description: "Schema u" },
    model: { control: "object", description: "Model" },
    options: { control: "object", description: "Opcje" },
  } as Partial<ArgTypes<any>>,
  args: {
    options: {
      fieldProps: {
        variant: "outlined",
        density: "comfortable",
      },
    },
    model: {},
  },
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        dict: {
          label: "Country",
          layout: {
            component: "dictionary",
            cols: 12,
          },
          source: {
            url: "/api/dictionaries?feature-id=countries&lm=basicData.name&vm=dataId",
            title: "label",
            value: "id",
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
      },
      required: [],
    },
  },
};

export const WithModelAsObject: Story = {
  args: {
    model: {
      dict: {
        id: "PL",
        label: "Poland",
      },
    },
    schema: {
      type: "object",
      properties: {
        dict: {
          label: "Country",
          layout: {
            component: "dictionary",
            cols: 12,
          },
          source: {
            url: "/api/dictionaries?feature-id=countries&lm=basicData.name&vm=dataId",
            title: "label",
            value: "id",
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
      },
      required: [],
    },
  },
};

export const WithQueryAndAutoSelect: Story = {
  args: {
    model: {
    },
    schema: {
      type: "object",
      properties: {
        dict: {
          label: "Country",
          layout: {
            component: "dictionary",
            cols: 12,
          },
          source: {
            url: "/api/dictionaries?feature-id=countries&lm=basicData.name&vm=dataId&query=Poland",
            title: "label",
            value: "id",
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
      },
      required: [],
    },
  },
};
