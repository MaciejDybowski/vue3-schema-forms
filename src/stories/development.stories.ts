// @ts-nocheck
import { ArgTypes } from "@storybook/types";
import { Meta, StoryObj } from "@storybook/vue3";

import DevelopmentTable from "../components/app/DevelopmentTable.vue";
import { Schema } from "../types/schema/Schema";

const meta = {
  title: "Development Page",
  component: DevelopmentTable,
  argTypes: {
    schema: { control: "object", description: "Schema u" },
    model: { control: "object", description: "Model" },
    options: { control: "object", description: "Opcje" }
  } as Partial<ArgTypes<any>>,
  args: {
    options: {
      fieldProps: {
        variant: "outlined",
        density: "comfortable"
      }
    },
    model: {}
  }
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Table1: Story = {
  args: {
    model: { test: "5242594678" },
    schema: {
      type: "object",
      properties: {
        "numberInt": {
          "label": "Liczba całkowita",
          "precision": 2,
          "layout": {
            "component": "number-field",
            props: {
              "min": 0,
              "max": 5
            }
          }
        }
      }
    } as Schema
  }
};
