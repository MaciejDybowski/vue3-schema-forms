// @ts-nocheck
import { ArgTypes } from "@storybook/types";
import { Meta, StoryObj } from "@storybook/vue3";

import DevelopmentTable from "../components/app/DevelopmentTable.vue";
import { OFFER_ITEMS_MOCK, RELATIONSHIP_RESPONSE } from "./responses";

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

export const ForteStart: Story = {
  args: {
    model: {},
    schema: {},
  },
};

export const Forte: Story = {
  args: {
    model: {
      offer: {
        id: "maciek-offer",
      },
    },
    schema: {},
  },
  parameters: {
    mockData: [OFFER_ITEMS_MOCK],
  },
};

export const Table1: Story = {
  parameters: {
    mockData: [RELATIONSHIP_RESPONSE],
  },
  args: {
    model: {
      dataId: 1,
    },
    schema: {
      type: "object",
      properties: {
        partners: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/api/v1/customers/{dataId}/relationships",
            headers: [
              {
                title: "Number",
                key: "number",
                type: "TEXT",
                valueMapping: "{partner.number}",
              },
              {
                title: "Name",
                key: "name",
                type: "TEXT",
                valueMapping: "{partner.name}",
              },
              {
                title: "Function",
                key: "function.name",
                type: "TEXT",
                valueMapping: "{function.name}",
              },
            ],
          },
          actions: {
            "partner.name": "redirectToCustomerDetails",
            "partner.number": "redirectToCustomerDetails",
          },
        },
      },
      required: [],
    },
  },
};

export const Table2: Story = {
  parameters: {
    mockData: [RELATIONSHIP_RESPONSE],
  },
  args: {
    model: {
      attributes: [

        {
          definition: {
            code: "wysokosc",
            label: "Wysokosc",
            valueType: "NUMBER",
            priority: 6,
          },
          numberValue: "10",
        },
        {
          definition: {
            code: "waga-calkowita-kg",
            label: "Waga całkowita kg",
            valueType: "NUMBER",
            priority: 5,
          },
          numberValue: 1,
        },
        {
          definition: {
            code: "gramatura",
            label: "Gramatura",
            valueType: "TEXT",
            priority: 4,
          },
          textValue: "test",
        },
        {
          definition: {
            code: "czas-palenia",
            label: "Czas Palenia",
            valueType: "TEXT",
            priority: 3,
          },
          textValue: "test123321312",
        },
        {
          definition: {
            code: "ilosc-w-opakowaniu",
            label: "Ilość w opakowaniu",
            valueType: "NUMBER",
            priority: 2,
          },
          numberValue: 3123,
        },

      ],
    },
    schema: {
      type: "object",
      properties: {
        attributes: {
          layout: {
            component: "duplicated-section",
            cols: {
              xs: 12,
              sm: 12,
              md: 12,
              lg: 12,
              xl: 12,
              xxl: 12,
            },
            schema: {
              type: "object",
              properties: {
                definition: {
                  label: "Atrybut",
                  layout: {
                    component: "dictionary",
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 6,
                      xl: 6,
                      xxl: 6,
                    },
                  },
                  source: {
                    url: "/api/dictionaries?feature-id=attribute-definitions&lm=basicData.name&vm=dataId&customAttributes=valueType%2C%7BbasicData.valueType%7D%2Cdictionary%2C%7Bdictionary.code%7D",
                    title: "label",
                    value: "code",
                    lazy: true,
                    singleOptionAutoSelect: true,
                    returnObject: true,
                  },
                },
                dateValue: {
                  label: "Data",
                  layout: {
                    component: "date-picker",
                    if: "nata(attributes[].definition.valueType='DATE'",
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 6,
                      xl: 6,
                      xxl: 6,
                    },
                  },
                },
                numberValue: {
                  label: "Liczba",
                  layout: {
                    component: "number-field",
                    if: "nata(attributes[].definition.valueType='NUMBER')",
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 6,
                      xl: 6,
                      xxl: 6,
                    },
                  },
                  type: "float",
                },
                textValue: {
                  label: "Tekst",
                  layout: {
                    component: "text-field",
                    if: "nata(attributes[].definition.valueType='TEXT')",
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 6,
                      xl: 6,
                      xxl: 6,
                    },
                  },
                },
              },
              required: [],
            },
            options: {
              addBtnText: "Dodaj atrybut",
              showDivider: false,
              ordinalNumberInModel: false,
            },
            editable: true,
            showElements: true,
            props: {},
          },
        },
      },
      required: [],
    },
  },
};
