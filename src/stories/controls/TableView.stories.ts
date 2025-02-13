// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";

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
    options: {},
  },
  parameters: {
    controls: { hideNoControlsWarning: true }, //https://github.com/storybookjs/storybook/issues/24422
  },
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;

const REQUEST_PAGE_0_1 = {
  url: "/mock-data/table-view-mock?page=0&size=20",
  method: "GET",
  status: 200,
  response: (request) => {
    const { body, searchParams } = request;
    if (searchParams.page === "0" && searchParams.size === "10") {
      return PAGE_0;
    }
    if (searchParams.page === "1" && searchParams.size === "10") {
      return PAGE_1;
    }
    return "no data";
  },
};

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
            volume: "0.0001",
            alerts: {
              warning: ["no package quantity defined for product, using one package for calculations", "other message"],
            },
          },
          {
            name: "🍎 Apple",
            location: "Washington",
            height: "0.1",
            base: "0.07",
            volume: "0.0001",
            alerts: {
              info: ["information about row text"],
              error: ["error about text"],
            },
          },
          {
            name: "🍎 Apple",
            location: "Washington",
            height: "0.1",
            base: "0.07",
            volume: "0.0001",
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

const PAGE_0 = {
  content: [
    {
      name: "🍎 Apple",
      location: "Washington",
      height: "0.1",
      base: 70,
      volume: "0.0001",
    },
    {
      name: "🍌 Banana",
      location: "Ecuador",
      height: "0.2",
      base: 50,
      volume: "0.0002",
    },
    {
      name: "🍇 Grapes",
      location: "Italy",
      height: "0.02",
      base: 20,
      volume: "0.00001",
    },
    {
      name: "🍉 Watermelon",
      location: "China",
      height: "0.4",
      base: 300,
      volume: "0.03",
    },
    {
      name: "🍍 Pineapple",
      location: "Thailand",
      height: "0.3",
      base: 200,
      volume: "0.005",
    },
    {
      name: "🍒 Cherries",
      location: "Turkey",
      height: "0.02",
      base: 20,
      volume: "0.00001",
    },
    {
      name: "🥭 Mango",
      location: "India",
      height: "0.15",
      base: 100,
      volume: "0.0005",
    },
    {
      name: "🍓 Strawberry",
      location: "Poland",
      height: "0.03",
      base: 30,
      volume: "0.00002",
    },
    {
      name: "🍑 Peach",
      location: "China",
      height: "0.09",
      base: 80,
      volume: "0.0004",
    },
    {
      name: "🥝 Kiwi",
      location: "New Zealand",
      height: "0.05",
      base: 50,
      volume: "0.0001",
    },
  ]
};

const PAGE_1 = {
  content: [
    {
      name: "🍊 Orange",
      location: "Spain",
      height: "0.12",
      base: "0.09",
      volume: "0.0006",
    },
    {
      name: "🍋 Lemon",
      location: "Mexico",
      height: "0.1",
      base: "0.07",
      volume: "0.0004",
    },
    {
      name: "🍈 Melon",
      location: "Iran",
      height: "0.35",
      base: "0.25",
      volume: "0.02",
    },
    {
      name: "🍐 Pear",
      location: "Argentina",
      height: "0.13",
      base: "0.1",
      volume: "0.0005",
    },
    {
      name: "🍏 Green Apple",
      location: "France",
      height: "0.1",
      base: "0.07",
      volume: "0.0001",
    },
    {
      name: "🍌 Plantain",
      location: "Colombia",
      height: "0.22",
      base: "0.06",
      volume: "0.00025",
    },
    {
      name: "🫐 Blueberry",
      location: "Canada",
      height: "0.015",
      base: "0.015",
      volume: "0.000005",
    },
    {
      name: "🥥 Coconut",
      location: "Indonesia",
      height: "0.3",
      base: "0.2",
      volume: "0.006",
    },
    {
      name: "🍅 Tomato",
      location: "Italy",
      height: "0.06",
      base: "0.05",
      volume: "0.00015",
    },
    {
      name: "🍆 Eggplant",
      location: "India",
      height: "0.18",
      base: 0.07,
      volume: "0.0008",
    },
  ],
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
    mockData: [REQUEST_PAGE_0_1],
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
    mockData: [REQUEST_PAGE_0_1],
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
                valueMapping: "alerts",
                type: "ALERT",
                properties: {
                  minWidth: 32,
                  width: 32,
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
    mockData: [REQUEST_PAGE_0_1_ALERT],
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
    mockData: [REQUEST_PAGE_0_1],
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
    mockData: [REQUEST_PAGE_0_1],
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
                valueMapping: "<b>{name}</b>, location: {location}",
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
    mockData: [REQUEST_PAGE_0_1],
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
    mockData: [REQUEST_PAGE_0_1],
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
    mockData: [REQUEST_PAGE_0_1],
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
    mockData: [REQUEST_PAGE_0_1],
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
    mockData: [REQUEST_PAGE_0_1],
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
    mockData: [REQUEST_PAGE_0_1],
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
    mockData: [REQUEST_PAGE_0_1],
  },
};
