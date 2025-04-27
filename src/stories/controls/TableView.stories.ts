// @ts-nocheck
import { initialize } from "msw-storybook-addon";

import { Schema } from "../../types/schema/Schema";
import { TABLE_PAGE_WITHOUT_AGGREGATES, TABLE_PAGE_WITH_AGGREGATES, UPDATE_TABLE_ROW } from "../mock-responses";
import { formStoryWrapperTemplateWithMSW } from "../templates/shared-blocks";



export default {
  title: "Forms/Controls/TableView",
  ...formStoryWrapperTemplateWithMSW,
};

/**
 * Description here
 */
export const Standard: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
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
                type: "NUMBER",
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
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES,
    },
  },
};

export const ColorableCells: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
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
                type: "NUMBER",
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
                type: "TEXT",
                color: "base <= 50 ? 'table-cell-background-grey-light': ''",
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
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES,
    },
  },
};

export const DynamicAlerts: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
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
                type: "NUMBER",
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
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES,
    },
  },
};

export const NumberFields: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
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
                type: "NUMBER",
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
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES,
    },
  },
};

export const JoinValues: Story = {
  name: "Merge variables in column",
  play: async (context) => {},
  args: {
    formModel: {},
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
                type: "NUMBER",
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
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES,
    },
  },
};

export const JoinValuesWithHtmlAndExtraText: Story = {
  name: "Merge variables with HTML",
  play: async (context) => {},
  args: {
    formModel: {},
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
                type: "NUMBER",
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
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES,
    },
  },
};

export const ActionField: Story = {
  name: "Action mapping for field",
  play: async (context) => {},
  args: {
    formModel: {},
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
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES,
    },
  },
};

export const ActionFieldAdvanced: Story = {
  name: "Action mapping with extra HTML",
  play: async (context) => {},
  args: {
    formModel: {},
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
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES,
    },
  },
};

export const TopSlotAndButtons: Story = {
  name: "Slot: Top",
  play: async (context) => {},
  args: {
    formModel: {},
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
                type: "NUMBER",
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
              {
                label: "Import",
                btnProps: {
                  color: "primary",
                  rounded: false,
                },
                mode: "form-and-action",
                config: {
                  title: "Import products from csv",
                  code: "callScript",
                  scriptName: "import_products_from_csv",
                },
                schema: {
                  properties: {
                    csvBody: {
                      label: "Paste your csv file content",
                      layout: {
                        component: "text-area",
                      },
                    },
                  },
                  required: ["csvBody"],
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
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES,
    },
  },
};

export const ContextActions: Story = {
  name: "Slot: Context Actions",
  play: async (context) => {},
  args: {
    formModel: {},
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
                type: "NUMBER",
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
                    title: "Pallet shipping",
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
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES,
    },
  },
};

export const ContextActionsWithCondition: Story = {
  name: "Slot: Context Actions + condition",
  play: async (context) => {},
  args: {
    formModel: {},
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
                type: "NUMBER",
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
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES,
    },
  },
};

export const ContextActionWithSchemaIntegration: Story = {
  name: "Slot: Context Actions + schema",
  play: async (context) => {},
  args: {
    formModel: {},
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
                    title: "Update details",
                    icon: "mdi-file-edit-outline",
                    mode: "popup",
                    modelReference: "name",
                    schema: {
                      properties: {
                        factoryCost: {
                          label: "Factory cost",
                          layout: {
                            component: "number-field",
                          },
                        },
                      },
                      required: ["factoryCost"],
                    },
                    props: {
                      color: "black",
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
      handlers: TABLE_PAGE_WITHOUT_AGGREGATES,
    },
  },
};

export const SummaryAggregates: Story = {
  name: "Slot: Aggregates",
  play: async (context) => {},
  args: {
    formModel: {},
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
      handlers: TABLE_PAGE_WITH_AGGREGATES,
    },
  },
};

export const SummaryAggregatesUpdate: Story = {
  name: "Slot: Aggregates + update",
  play: async (context) => {},
  args: {
    formModel: {},
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
                    type: "NUMBER",
                    title: "Height",
                    key: "height",
                    valueMapping: "height:0:NUMBER:decimalPlaces",
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
      handlers: [...UPDATE_TABLE_ROW, ...TABLE_PAGE_WITH_AGGREGATES],
    },
  },
};

export const NumberEditableField: Story = {
  name: "Editable field: Number",
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "",
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
                    type: "NUMBER",
                    title: "Height",
                    key: "height",
                    valueMapping: "height:0:NUMBER:decimalPlaces",
                  },
                ],
                properties: { minWidth: "200px", maxWidth: "200px", width: "100px" },
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
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
      handlers: [...UPDATE_TABLE_ROW, ...TABLE_PAGE_WITH_AGGREGATES],
    },
  },
};

export const EditableSelect: Story = {
  name: "Editable field: Select",
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "",
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
                    type: "SELECT",
                    title: "Height",
                    key: "height",
                    valueMapping: "height:heightOptions:title:value",
                  },
                ],
                properties: { minWidth: "200px", maxWidth: "200px", width: "100px" },
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
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
      handlers: [...UPDATE_TABLE_ROW, ...TABLE_PAGE_WITH_AGGREGATES],
    },
  },
};

export const EditableSelectWithCondition: Story = {
  name: "Case: Condition on editable field",
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "",
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
                    type: "SELECT",
                    title: "Height",
                    key: "height",
                    valueMapping: "height:heightOptions:title:value",
                    condition: "base > 40",
                  },
                ],
                properties: { minWidth: "200px", maxWidth: "200px", width: "100px" },
              },
              {
                title: "Base",
                key: "base",
                valueMapping: "base",
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
      handlers: [...UPDATE_TABLE_ROW, ...TABLE_PAGE_WITH_AGGREGATES],
    },
  },
};


export const DefineModelVariablesForRefresh: Story = {
  name: "Case: Define model variable for refresh table",
  play: async (context) => {},
  args: {
    formModel: {
      numberInput: 1
    },
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Define field variable for refresh table",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        temp: {
          properties: {
            numberInput: {
              label: "Number",
              layout: {
                component: "number-field-v2",
                cols: 4
              }
            },
          }
        },
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          triggers: ["temp.numberInput"],
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
                title: "Base",
                key: "base",
                valueMapping: "base",
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
      handlers: [...UPDATE_TABLE_ROW, ...TABLE_PAGE_WITHOUT_AGGREGATES],
    },
  },
};