// @ts-nocheck
import { mswLoader } from "msw-storybook-addon";
import {UPDATE_TABLE_ROW, TABLE_PAGE_WITH_AGGREGATES, TABLE_PAGE_WITHOUT_AGGREGATES} from "@/stories/mock-responses"

import { VueSchemaForms } from "@/components";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";

import { initialize } from "msw-storybook-addon";
initialize();

const meta = {
  title: "Forms/Controls/TableView",
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
    options: {
      fieldProps: {
        variant: "outlined",
        density: "compact",
      },
    },
  },
  parameters: {
    controls: { hideNoControlsWarning: true }, //https://github.com/storybookjs/storybook/issues/24422
  },
  loaders: [mswLoader],
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;



const REQUEST_PAGE_0_1_ALERT = {
  url: "/mock-data/table-view-mock?page=0&size=20",
  method: "GET",
  status: 200,
  response: (request) => {
    const { body, searchParams } = request;
    if (searchParams.page === "0" && searchParams.size === "10") {
      return {
        content: [
          {
            name: "🍎 Apple",
            location: "Washington",
            height: "0.1",
            base: "0.07",
            volume: 0.0001,
            alerts: [
              {
                type: "warning",
                message: "no package quantity defined for product, using one package for calculations",
              },
              {
                type: "warning",
                message: "no retail price factor defined, cannot calculate customer margin and retail prices",
              },
              {
                type: "warning",
                message: "unknown product volume, cannot calculate transport cost",
              },
              {
                type: "info",
                message: "no package quantity defined for product, using one package for calculations",
              },
              {
                type: "error",
                message: "no retail price factor defined, cannot calculate customer margin and retail prices",
              },
            ],
          },
          {
            name: "🍎 Apple",
            location: "Washington",
            height: "0.1",
            base: "0.07",
            volume: 0.0001,
            alerts: [
              {
                type: "info",
                message: "no package quantity defined for product, using one package for calculations",
              },
              {
                type: "error",
                message: "no retail price factor defined, cannot calculate customer margin and retail prices",
              },
            ],
          },
          {
            name: "🍎 Apple",
            location: "Washington",
            height: "0.1",
            base: "0.07",
            volume: 0.3,
            alerts: [],
          },
        ],
      };
    }
    if (searchParams.page === "1" && searchParams.size === "10") {
      console.error("Brak danych");
    }
    return "no data";
  },
};




/**
 * Description here
 */
export const Standard: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Basic display all data as a text values",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name",
                key: "name",
                valueMapping: "name",
                type: "TEXT",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Height",
                key: "height",
                valueMapping: "height",
                type: "TEXT",
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
                type: "TEXT",
              },
              {
                title: "Volume",
                key: "volume",
                valueMapping: "volume",
                type: "TEXT",
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const ColorableCells: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "You can create color condition on table cells",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name",
                key: "name",
                valueMapping: "name",
                type: "TEXT",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Height",
                key: "height",
                valueMapping: "height",
                type: "TEXT",
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
                type: "TEXT",
                color: "base <= 50 ? '#EF5350' : '#81C784'",
              },
              {
                color: "base <= 50 ? '#EF5350' : '#81C784'",
                title: "Volume",
                key: "volume",
                valueMapping: "volume",
                type: "TEXT",
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const DynamicAlerts: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Basic display all data as a text values",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "",
                key: "alerts",
                color: "volume > 0.03 ? 'table-cell-background-grey-lighten-3': 'table-cell-background-red-lighten-4'",
                valueMapping: "alerts",
                type: "ALERT",
                properties: {
                  width: "24px",
                },
              },
              {
                title: "Name",
                key: "name",
                valueMapping: "name",
                type: "TEXT",
                class: "blue lighten-5",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Height",
                key: "height",
                valueMapping: "height",
                type: "TEXT",
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
                type: "TEXT",
              },
              {
                title: "Volume",
                key: "volume",
                valueMapping: "volume",
                type: "TEXT",
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const NumberFields: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Basic display all data as a text and number values which are align to right by default",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name",
                key: "name",
                valueMapping: "name",
                type: "TEXT",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Height",
                key: "height",
                valueMapping: "height",
                type: "TEXT",
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
                type: "NUMBER",
              },
              {
                title: "Volume",
                key: "volume",
                valueMapping: "volume",
                type: "NUMBER",
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const JoinValues: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Basic display all data as a text values",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name and location",
                key: "nameAndLocation",
                valueMapping: "{name}, {location}",
                type: "TEXT",
              },
              {
                title: "Height",
                key: "height",
                valueMapping: "height",
                type: "TEXT",
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
                type: "TEXT",
              },
              {
                title: "Volume",
                key: "volume",
                valueMapping: "volume",
                type: "TEXT",
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const JoinValuesWithHtmlAndExtraText: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Basic display all data as a text values",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name and location",
                key: "nameAndLocation",
                valueMapping: "<b>{name}</b>, location: {location} and base: {base:No data:NUMBER:4}",
                type: "TEXT",
              },
              {
                title: "Height",
                key: "height",
                valueMapping: "height",
                type: "TEXT",
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
                type: "TEXT",
              },
              {
                title: "Volume",
                key: "volume",
                valueMapping: "volume",
                type: "TEXT",
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const EditableField: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Basic display all data as a text values",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name",
                key: "name",
                valueMapping: "name",
                type: "TEXT",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Height",
                key: "height",
                valueMapping: "height",
                editable: true,
                type: "NUMBER",
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const ActionField: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Basic display all data as a text values",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          actions: {
            name: "redirectActionCode",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name",
                key: "name",
                valueMapping: "name",
                type: "TEXT",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Height",
                editable: true,
                valueMapping: "height",
                type: "NUMBER",
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const ActionFieldAdvanced: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Basic display all data as a text values",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          actions: {
            name: "redirectActionCode",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name",
                valueMapping: "{name} and extra text, other variable {base}",
                key: "name",
                type: "TEXT",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Height",
                editable: true,
                valueMapping: "height",
                type: "NUMBER",
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const TopSlotAndButtons: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Basic display all data as a text values",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name",
                key: "name",
                valueMapping: "name",
                type: "TEXT",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Height",
                key: "height",
                valueMapping: "height",
                type: "TEXT",
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
                type: "TEXT",
              },
              {
                title: "Volume",
                key: "volume",
                valueMapping: "volume",
                type: "TEXT",
              },
            ],
            buttons: [
              {
                label: "Add products",
                btnProps: {
                  color: "primary",
                  rounded: false,
                },
                mode: "action",
                config: {
                  code: "batchAdd", // na froncie jest sprawdzanie jak batchAdd to i tak woła skrypt bo w obsłudze zadanie jest tylko jedna uniwersalna akcja
                  featureId: "products",
                  viewId: "68304-tabela",
                  batchAddAttributePath: "dataId",
                  scriptName: "dodaj_produkty_do_oferty",
                },
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const ContextActions: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Basic display all data as a text values",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name",
                key: "name",
                valueMapping: "name",
                type: "TEXT",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Height",
                key: "height",
                valueMapping: "height",
                type: "TEXT",
              },
              {
                title: "Actions",
                key: "actions",
                actions: [
                  {
                    icon: "mdi-delete-outline",
                    mode: "action",
                    code: "callScript",
                    config: {
                      params: {
                        scriptName: "delete_product_from_offer",
                      },
                      body: {
                        name: "{name}",
                      },
                    },
                    props: {
                      color: "error",
                    },
                  },
                  {
                    icon: "mdi-shipping-pallet",
                    mode: "action",
                    code: "callScript",
                    config: {
                      params: {
                        scriptName: "add_pallet_price",
                      },
                      body: {
                        name: "{name}",
                      },
                    },
                    props: {
                      color: "primary",
                    },
                  },
                ],
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const ContextActionsWithCondition: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Use JSON nata expression to make condition on table context action",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name",
                key: "name",
                valueMapping: "name",
                type: "TEXT",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Height",
                key: "height",
                valueMapping: "height",
                type: "TEXT",
              },
              {
                title: "Actions",
                key: "actions",
                actions: [
                  {
                    title: "Delete",
                    icon: "mdi-delete-outline",
                    mode: "action",
                    code: "callScript",
                    condition: "location='Poland'",
                    config: {
                      params: {
                        scriptName: "delete_product_from_offer",
                      },
                      body: {
                        name: "{name}",
                      },
                    },
                    props: {
                      color: "error",
                    },
                  },
                  {
                    title: "Shipping pallet",
                    icon: "mdi-shipping-pallet",
                    mode: "action",
                    code: "callScript",
                    config: {
                      params: {
                        scriptName: "add_pallet_price",
                      },
                      body: {
                        name: "{name}",
                      },
                    },
                    props: {
                      color: "primary",
                    },
                  },
                ],
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const ContextActionWithSchemaIntegration: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content:
            "Zdefiniowanie akcji aktualizacji danych wiersza, polega na przygotowaniu wew. formularza, który po zatwierdzeniu uderza do API endpointu pobierania danych + /{id:id} jako POST i oczekuje zwrotu całego wiersza",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name",
                key: "name",
                valueMapping: "name",
                type: "TEXT",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Height",
                key: "height",
                valueMapping: "height",
                type: "TEXT",
              },
              {
                title: "Actions",
                key: "actions",
                actions: [
                  {
                    title: "Update factory cost",
                    icon: "mdi-cog",
                    mode: "popup",
                    modelReference: "name",
                    schema: {
                      properties: {
                        name: {
                          label: "Input 1",
                          layout: {
                            component: "text-field",
                          },
                        },
                      },
                      required: ["name"],
                    },
                    props: {
                      color: "error",
                    },
                  },
                ],
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const SummaryAggregates: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Basic display all data as a text values",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Name",
                key: "name",
                valueMapping: "name",
                type: "TEXT",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Height",
                key: "height",
                valueMapping: "height",
                type: "TEXT",
                footerMapping: "<b>Summary of:</b> {height}",
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
                type: "TEXT",
              },
              {
                title: "Volume",
                key: "volume",
                valueMapping: "volume",
                type: "TEXT",
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES
    },
  },
};

export const SummaryAggregatesUpdate: Story = {
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Basic display all data as a text values",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "Id",
                key: "id",
                valueMapping: "dataId",
                type: "TEXT",
              },
              {
                title: "Location",
                key: "location",
                valueMapping: "location",
                type: "TEXT",
              },
              {
                title: "Editable height",
                key: "height-collection",
                type: "COLLECTION",
                editable: [
                  {
                    title: "Height",
                    key: "height",
                    valueMapping: "height",
                  },
                ],
                footerMapping: "<b>Summary of:</b> {height}",
                properties: { minWidth: "200px", maxWidth: "200px", width: "100px" },
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
                type: "TEXT",
              },
              {
                title: "Volume",
                key: "volume",
                valueMapping: "volume",
                type: "TEXT",
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: [...UPDATE_TABLE_ROW, ...TABLE_PAGE_WITH_AGGREGATES]
    },
  },
};
