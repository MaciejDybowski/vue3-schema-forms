// @ts-nocheck
import { REQUEST_NOT_LAZY, REQUEST_PAGE_0_1, REQUEST_SEARCH_DOL } from "@/stories/controls/Dictionary/responses";
import { ArgTypes } from "@storybook/types";
import { Meta, StoryObj } from "@storybook/vue3";

import DevelopmentTable from "../components/app/DevelopmentTable.vue";
import { Schema } from "../types/schema/Schema";
import { DictionarySource } from "../types/shared/Source";

const meta = {
  title: "Development Page",
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

export const Table1: Story = {
  args: {
    model: {
      currency: "Dol",
    },
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/api/currencies",
            title: "label",
            value: "id",
            description: "label",
            returnObject: true,
            singleOptionAutoSelect: true,
          } as DictionarySource,
        } as SchemaSourceField,
      },
      required: [],
    } as Schema,
  },
  parameters: {
    mockData: [REQUEST_PAGE_0_1, REQUEST_SEARCH_DOL],
  },
};
