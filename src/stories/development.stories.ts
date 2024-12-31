// @ts-nocheck
import { ArgTypes } from "@storybook/types";
import { Meta, StoryObj } from "@storybook/vue3";

import DevelopmentTable from "../components/app/DevelopmentTable.vue";
import { expect, userEvent, within } from "@storybook/test";
import { Schema } from "../types/schema/Schema";

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


export const Table0: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        fieldA: {
          label: "Field A",
          layout: {
            component: "text-field",
            cols:4,
          },
        },
        fieldB: {
          label: "Field B",
          layout: {
            component: "text-field",
            cols:4,
            if: "nata(fieldA='test')"
          },
        },
      },
    } as Schema,
  },
};

export const TableView: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        textArea: {
          layout: {
            component: "table",
          },
        },
      },
    } as Schema,
  },
};