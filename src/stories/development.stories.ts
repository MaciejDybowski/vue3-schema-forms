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

export const BMProcess: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        htmlDaneDost: { content: "Dane dostawcy", layout: { component: "static-content", tag: "h3" } },
        tech: {
          properties: {
            oddzial: {
              label: "Oddział",
              layout: { component: "dictionary", props: { clearable: true } },
              source: {
                url: "/api/dictionaries?feature-id=oddzialy&lm=nazwa&vm=id",
                title: "label",
                value: "id",
                lazy: true,
                returnObject: true,
                singleOptionAutoSelect: true,
              },
            },
            czyPominacOcr: {
              label: "",
              layout: { component: "checkbox", props: { multiple: false } },
              source: { items: [{ value: true, title: "Pomiń OCR" }] },
            },
          },
          required: ["oddzial"],
        },
        dostawca: {
          label: "Wybierz dostawcę",
          layout: { component: "dictionary", if: "nata(tech.czyPominacOcr=true)" },
          source: {
            url: "/api/dictionaries?feature-id=dostawcy-rejestr&lm=nazwa&vm=id&customAttributes=nazwa%2C%7Bnazwa%7D%2Ckod%2C%7Bkod%7D%2Cnip%2C%7Bnip%7D%2Cadres%2C%7Badres%7D%2CkodPocztowy%2C%7BkodPocztowy%7D%2Cmiejscowosc%2C%7Bmiejscowosc%7D%2Ckraj%2C%7Bkraj%7D%2CnazwaWyswietlana%2C%7Bnazwa%7D%20-%20%7Bkod%7D%20-%20%7Bnip%7D",
            title: "nazwaWyswietlana",
            value: "id",
            returnObject: true,
            singleOptionAutoSelect: true,
            lazy: true,
          },
        },
        kod: {
          label: "Kod dostawcy",
          layout: { component: "data-viewer", if: "nata($exists(dostawca))" },
          valueMapping: "{dostawca.kod}",
          type: "text",
        },
        nazwa: {
          label: "Nazwa dostawcy",
          layout: {
            component: "data-viewer",
            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
            if: "nata($exists(dostawca))",
          },
          valueMapping: "{dostawca.label}",
          type: "text",
        },
        nip: {
          label: "NIP",
          layout: {
            component: "data-viewer",
            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
            if: "nata($exists(dostawca))",
          },
          valueMapping: "{dostawca.nip}",
          type: "text",
        },
        adres: {
          content:
            "{dostawca.adres:Brak danych} <br>{dostawca.kodPocztowy:Brak danych} {dostawca.miejscowosc:Brak danych}, {dostawca.kraj:Brak danych} <br><br>Saldo: {dostawca.saldo:Brak danych}",
          layout: { component: "static-content", tag: "p", if: "nata($exists(dostawca))" },
        },
      },
      required: ["dostawca"],
    },
  },
};

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
          content:
            "Description of datatable, lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        tableOfProducts: {
          aggregates: {
            url: "/api/table-views/{viewId}/aggregates",
          },
          source: {
            headers: "/api/table-views/{viewId}/headers?fields=id,name,location,height:editable,base,volume",
            url: "/api/table-views/{viewId}/data",
            updateRow: "/api/v1/update/row/api/{id}",
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
                cols: 2,
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
                  },
                },
              },
            },
          },
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
