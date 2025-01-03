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

export const TableView: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        field0: {
          label: "Field 0",
          type: "float",
          precision: 2,
          layout: {
            component: "number-field",
            cols: 4,
          },
        },
        description: {
          content: "Description of datatable, lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
          layout: {
            component: "static-content",
            tag: "span"
          }
        },
        tableOfProducts: {
          aggregates: {
            url: "/api/table-views/{viewId}/aggregates",
          },
          source: {
            headers: "/api/table-views/{viewId}/headers?fields=field0,field1,field2:editable,field3,field4",
            url: "/api/table-views/{viewId}/data",
            updateRow: "/api/v1/update/row/api/{field0}",
          },
          layout: {
            component: "table",
          },
        },

        fieldA: {
          label: "Aggregate One",
          type: "float",
          precision: 2,
          layout: {
            component: "number-field",
            cols: 4,
          },
        },
        fieldB: {
          label: "Aggregate Two",
          type: "float",
          precision: 2,
          layout: {
            component: "number-field",
            cols: 4,
          },
        },
        fieldC: {
          label: "Aggregate Three",
          type: "float",
          precision: 2,
          layout: {
            component: "number-field",
            cols: 4,
          },
        },
        fieldD: {
          properties: {
            fieldE: {
              label: "Aggregate Four",
              layout: {
                component: "text-field",
                cols: 2
              },
            },
          },
        },
        fieldF: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                fieldG: {
                  label: "Aggregate five",
                  layout: {
                    component: "text-field",
                    cols: 4,
                  }
                }
              }
            }
          }
        },

        hideField: {
          label: "Hide Field",
          layout: {
            component: "text-field",
            if: "nata(fieldC > 500)",
          },
        },
      },
    } as Schema,
  },
};
