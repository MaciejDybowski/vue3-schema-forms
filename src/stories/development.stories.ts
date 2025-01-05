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
    model: {
      faktura: {
        kurs: 1,
        waluta: {
          label:"Polski złoty",
          id: "PLN",
        }
      },
      podsumowanie: {
        kwotaNetto: 100,
        kwotaVat: 23,
        kwotaBrutto: 123
      }
    },
    schema: {
      type: "object",
      properties: {
        pozycjeDokumentu: {
          layout: {
            component: "duplicated-section",
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
            schema: {
              type: "object",
              properties: {
                aureaSectionId: {
                  label: "Identyfiaktor sekcji powielanej",
                  layout: {
                    component: "text-field",
                    hide: true,
                    cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                  },
                  expression: "HASH_GENERATOR(5)",
                  sectionKey: "pozycjeDokumentu",
                },
                kwotaNetto: {
                  label: "Kwota netto",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "number-field",
                    props: {
                      hint: "Kwota PLN: {pozycjeDokumentu[].kwotaNettoPln}, Kurs: {faktura.kurs}",
                      "persistent-hint": "nata(faktura.waluta.id!='PLN')",
                    },
                  },
                  type: "float",
                  precision: "2",
                  sectionKey: "pozycjeDokumentu",
                  precisionMin: "2",
                },
                stawkaVat: {
                  defaultValue: {
                    "mnoznik": 23,
                    id: "23",
                    label: "23%"
                  },
                  label: "Stawka VAT",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 2, xl: 2, xxl: 2 },
                    component: "dictionary",
                    props: { clearable: true },
                  },
                  source: {
                    url: "/api/dictionaries?feature-id=stawki-podatkowe&lm=nazwa&vm=kod&customAttributes=mnoznik%2C%7Bmnoznik%7D",
                    title: "label",
                    value: "id",
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                  },
                  sectionKey: "pozycjeDokumentu",
                },
                kwotaVAT: {
                  label: "Kwota VAT",
                  layout: {
                    component: "number-field",
                    hide: false,
                    cols: { xs: 12, sm: 12, md: 12, lg: 2, xl: 2, xxl: 2 },
                    props: {
                      hint: "Kwota PLN: {pozycjeDokumentu[].kwotaVatPln:0}",
                      "persistent-hint": "nata(faktura.waluta.id!='PLN')",
                    },
                  },
                  type: "float",
                  calculation: "$number(pozycjeDokumentu[].stawkaVat.mnoznik)/100*pozycjeDokumentu[].kwotaNetto",
                  sectionKey: "pozycjeDokumentu",
                  precision: "2",
                  roundOption: "ceil",
                  precisionMin: "2",
                },
                kwotaBrutto: {
                  label: "Kwota brutto",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "number-field",
                    props: {
                      hint: "Kwota PLN: {pozycjeDokumentu[].kwotaBruttoPln:0}, Kurs: {faktura.kurs:0}",
                      "persistent-hint": "nata(faktura.waluta.id!='PLN')",
                    },
                  },
                  type: "float",
                  calculation: "pozycjeDokumentu[].kwotaNetto+pozycjeDokumentu[].kwotaVAT",
                  precision: "2",
                  sectionKey: "pozycjeDokumentu",
                  onChange: {
                    mode: "change-model",
                    variables: [{ path: "osobyWybraneDoAutoryzacji", value: null }],
                  },
                  precisionMin: "2",
                },
                kwotaNettoPln: {
                  label: "Kwota netto PLN",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "number-field",
                    props: { hint: "" },
                    hide: true,
                    if: "",
                  },
                  type: "float",
                  precision: "2",
                  calculation: "pozycjeDokumentu[].kwotaNetto*faktura.kurs",
                  sectionKey: "pozycjeDokumentu",
                  precisionMin: "2",
                },
                kwotaVatPln: {
                  label: "Kwota VAT PLN",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "number-field",
                    hide: true,
                  },
                  type: "int",
                  calculation: "pozycjeDokumentu[].kwotaVAT*faktura.kurs",
                  sectionKey: "pozycjeDokumentu",
                },
                kwotaBruttoPln: {
                  label: "Kwota brutto PLN",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "number-field",
                    props: { hint: "" },
                    hide: true,
                    if: "",
                  },
                  type: "float",
                  precision: "2",
                  calculation: "pozycjeDokumentu[].kwotaBrutto*faktura.kurs",
                  sectionKey: "pozycjeDokumentu",
                },
              },
            },
            props: {},
            options: {
              showDivider: true,
              addBtnText: "Dodaj pozycję",
              ordinalNumberInModel: true,
              addBtnMode: "copy",
            },
          },
          editable: true,
          showElements: true,
        },
        sumy: {
          properties: {
            kwotaNetto: {
              label: "Kwota netto",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                component: "number-field",
                props: {
                  hint: "Kwota netto PLN: {sumy.kwotaNettoPln}",
                  "persistent-hint": 'nata(faktura.waluta.id!="PLN")',
                  readonly: true,
                },
              },
              type: "float",
              calculation: "$sum(pozycjeDokumentu.kwotaNetto)",
              precision: "2",
              precisionMin: "2",
            },
            kwotaVat: {
              label: "Kwota VAT",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                component: "number-field",
                props: {
                  readonly: true,
                  hint: "Kwota VAT PLN: {sumy.kwotaVatPln}",
                  "persistent-hint": 'nata(faktura.waluta.id!="PLN")',
                },
              },
              type: "float",
              calculation: "$sum(pozycjeDokumentu.kwotaVAT)",
              precision: "2",
              precisionMin: "2",
            },
            kwotaBrutto: {
              label: "Kwota brutto",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                component: "number-field",
                props: {
                  hint: "Kwota brutto PLN: {sumy.kwotaBruttoPln}",
                  "persistent-hint": 'nata(faktura.waluta.id!="PLN")',
                  readonly: true,
                },
              },
              type: "float",
              calculation: "$sum(pozycjeDokumentu.kwotaBrutto)",
              precision: "2",
              precisionMin: "2",
            },
            alert: {
              content: "Niezgodność kwot podsumowania faktury z kwotami sumami opisu merytorycznego",
              layout: {
                component: "static-content",
                tag: "v-alert",
                props: { variant: "outlined", type: "warning", density: "compact" },
                if: "nata(podsumowanie.kwotaNetto != sumy.kwotaNetto or podsumowanie.kwotaVat != sumy.kwotaVat or podsumowanie.kwotaBrutto != sumy.kwotaBrutto)",
              },
            },
          },
          required: [],
        },
      },
      required: [],
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
