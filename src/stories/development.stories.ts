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
    model: { waluta: { value: "PLN", "title": "Polski złoty" } },
    schema: {
      "type": "object",
      "properties": {
        waluta: {
          "label": "Waluta",
          layout: {
            component: "radio-button"
          },
          "source": {
            "items": [
              { "value": "PLN", "title": "Polski złoty" },
              { "value": "EUR", "title": "Euro" }
            ],
            returnObject: true
          }
        },
        section: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                "kwotaNetto": {
                  "label": "Kwota netto",
                  "layout": {
                    "component": "text-field",
                    "props": {
                      "persistent-hint": "if(waluta.value!='PLN',true,false)",
                      "hint": "Kwota netto PLN: {kwotaNettoPln:0}"
                    }
                  },
                }
              }
            }
          }
        }
      },
      "required": []
    } as Schema
  }
};
