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
    model: { firstName: "Maciej" },
    schema: {
      "type": "object",
      "properties": {
        "conditional": {
          "label": "Editable",
          "layout": {
            "cols": { "xs": 12, "sm": 12, "md": 12, "lg": 12, "xl": 12, "xxl": 12 },
            "offset": 0,
            "fillRow": false,
            "component": "radio-button",
            "props": {}
          },
          "source": { "items": [{ "value": false, "title": "Tak" }, { "value": true, "title": "Nie" }] }
        },
        firstName: {
          label: "Imię",
          layout: {
            component: "text-field",
            cols: 12,
            props: {
              test: `if(conditional==false,"true","false")`
            }
          }
        }
      },
      "required": []
    } as Schema
  }
};
