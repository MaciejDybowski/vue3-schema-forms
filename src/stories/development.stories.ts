// @ts-nocheck
import { ArgTypes } from "@storybook/types";
import { Meta, StoryObj } from "@storybook/vue3";

import DevelopmentTable from "../components/app/DevelopmentTable.vue";
import { DictionarySource } from "../types/shared/Source";

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

export const onChangeAction: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        actionOnChange_1: {
          label: "Action on change value",
          layout: {
            component: "text-field",
          },
          onChange: {
            mode: "request",
            url: "/api/v1/tasks/{dataId}/scripts/sprawdz_czy_duplikat", // lub ogólny endpoint lub uzależniony od zmiennych w modelu,
            method: "POST",
            body: {
              nip: "{daneDostawcy.nip}",
              numerFaktury: "{faktura.nrFaktury}"
            }
          }
        },

        actionOnChange_2: {
          label: "Action on change value",
          layout: {
            component: "text-field",
          },
          onChange: {
            mode: "request",
            url: "/api/v1/sprawdz-czy-aktywny-vatowiec?nip?{daneDostawcy.nip}",
            method: "GET",
          }
        },

        actionOnChange_3: {
          label: "Action on change value",
          layout: {
            component: "text-field",
          },
          onChange: {
            mode: "action",
            code: "sprawdz_czy_duplikat" // cała logika spada na akcje
           }
        },
      },
    },
  },
};

export const Dialog_Table_Integration: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        items: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                product: {
                  label: 'Item',
                  layout: { component: 'text-field', cols: 12 },
                },
              },
            },
            options: {
              showDivider: true,
              addBtnMode: "feature",
            },
          },
        },
      },
    },
  },
};

export const Images: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        field: {
          label: "text",
          layout: {
            component: "text-field",
            cols: 11
          }
        },
        productImg: {
          source: {
            thumbnail: "/qwert",
            preview: ""
          },
          layout: {
            component: "image-preview",
            cols: 1,
            props: {
              rounded: 0
            }
          }
        }
      } as any,
    },
  },
};

export const Dictionaries: Story = {
  args: {
    model: {

    },
    schema: {
      type: "object",
      properties: {
        slownik: {
          label: "Słownik",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/api/v1/rodzaje-kosztow",
            title: "nazwa",
            value: "kod",
            description: "kod",
            singleOptionAutoSelect: true,
            returnObject: false,
          } as DictionarySource,
        },
        slownik2: {
          label: "Słownik",
          layout: {
            component: "combobox",
          },
          source: {
            url: "/api/v1/rodzaje-kosztow",
            title: "nazwa",
            value: "kod",
            singleOptionAutoSelect: false,
            returnObject: false,
          } as DictionarySource,
        },
      },
    },
  },
};

export const OrdinalNumber: Story = {
  args: {
    model: {
      invoiceItems: [
        {product: "Maciej"}, {product: "Karol"}
      ]
    },
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                product: {
                  label: 'Product',
                  layout: { component: 'text-field', cols: 12 },
                },
              },
            },
            options: {
              showDivider: true,
              ordinalNumberInModel: true
            },
          },
        },
      } as any,
    },
  },
};

export const Table3: Story = {
  args: {
    model: {
      faktura: { kurs: 3.2321, waluta: { id: "USD", label: "USD" } },
      pozycjeDokumentu: [
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
        {
          stawkaVat: { id: 23, label: "23%" },
          aureaSectionId: "wS4Hr",
          czystyVat: 0,
          kwotaBrutto: 0,
          kwotaNettoPln: 0,
          kwotaBruttoPln: 0,
        },
      ],
    },
    schema: {
      type: "object",
      properties: {
        faktura: {
          properties: {
            kurs: {
              label: "kurs",
              default: 3.2321,
              layout: {
                component: "number-field",
                cols: 2,
              },
            },
            waluta: {
              label: "Waluta",
              default: { id: "USD", label: "USD" },
              layout: {
                cols: 4,
                component: "select",
              },
              source: {
                items: [
                  { id: "PLN", label: "PLN" },
                  { id: "USD", label: "USD" },
                ],
                title: "label",
                value: "id",
                returnObject: true,
              },
            },
          },
        },
        pozycjeDokumentu: {
          layout: {
            component: "duplicated-section",
            schema: {
              type: "object",
              properties: {
                aureaSectionId: {
                  label: "Identyfiaktor sekcji powielanej",
                  layout: {
                    component: "text-field",
                    hide: true,
                    cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 },
                  },
                  expression: "HASH_GENERATOR(5)",
                },
                czystyVat: {
                  label: "Czysty Vat",
                  layout: {
                    component: "number-field",
                    hide: true,
                    cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 },
                  },
                  type: "float",
                  calculation: "stawkaVat.id/100*kwotaNetto",
                },
                opis: {
                  label: "W jakim celu usługa towar zostały zakupione",
                  layout: { component: "text-area" },
                },
                kwotaNetto: {
                  label: "Kwota netto",
                  layout: {
                    cols: 4,
                    component: "number-field",
                    props: {
                      hint: "Kwota netto PLN: {kwotaNettoPln}",
                      "persistent-hint": "if(faktura.waluta.id!='PLN',true,false)",
                    },
                  },
                  type: "float",
                  precision: "2",
                },
                stawkaVat: {
                  label: "Stawka VAT",
                  default: { id: 23, label: "23%" },
                  layout: {
                    cols: 4,
                    component: "select",
                  },
                  source: {
                    items: [
                      { id: 23, label: "23%" },
                      { id: 0, label: "0%" },
                    ],
                    title: "label",
                    value: "id",
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                  },
                },
                kwotaBrutto: {
                  label: "Kwota brutto",
                  layout: {
                    cols: 4,
                    component: "number-field",
                    props: {
                      hint: "Kwota brutto PLN: {kwotaBruttoPln}",
                      "persistent-hint": "if(faktura.waluta.id!='PLN',true,false)",
                      readonly: true,
                    },
                  },
                  type: "float",
                  calculation: "kwotaNetto+(stawkaVat.id/100*kwotaNetto)",
                  precision: "2",
                },
                kwotaNettoPln: {
                  label: "Kwota netto PLN ( ukryta )",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 4, xxl: 4 },
                    component: "number-field",

                    hide: true,
                  },
                  type: "float",
                  precision: "2",
                  calculation: "kwotaNetto*faktura.kurs",
                },
                kwotaBruttoPln: {
                  label: "Kwota brutto przeliczona na PLN (ukryte)",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 4, xxl: 4 },
                    component: "number-field",

                    hide: true,
                  },
                  type: "float",
                  precision: "2",
                  calculation: "kwotaBrutto*faktura.kurs",
                },
                rodzajKosztu: {
                  label: "rodzajKosztu",
                  layout: {
                    component: "select",
                    cols: 4,
                    fillRow: true,
                  },
                  source: {
                    items: [
                      {
                        id: 1,
                        label: "Option1",
                        fieldA: true,
                        fieldB: true,
                        fieldC: true,
                        fieldD: false,
                        fieldE: false,
                      },
                      {
                        id: 1,
                        label: "Option2",
                        fieldA: false,
                        fieldB: false,
                        fieldC: true,
                        fieldD: false,
                        fieldE: false,
                      },
                      {
                        id: 1,
                        label: "Option3",
                        fieldA: true,
                        fieldB: false,
                        fieldC: true,
                        fieldD: true,
                        fieldE: true,
                      },
                    ],
                    title: "label",
                    value: "id",
                    returnObject: true,
                  },
                },
                fieldA: {
                  label: "fieldA",
                  layout: { component: "text-field", cols: 6, if: "rodzajKosztu.fieldA==true" },
                },
                fieldB: {
                  label: "fieldB",
                  layout: { component: "text-field", cols: 6, if: "rodzajKosztu.fieldB==true" },
                },
                fieldC: {
                  label: "fieldC",
                  layout: { component: "text-field", cols: 6, if: "rodzajKosztu.fieldC==true" },
                },
                fieldD: {
                  label: "fieldD",
                  layout: { component: "text-field", cols: 6, if: "rodzajKosztu.fieldD==true" },
                },
                fieldE: {
                  label: "fieldE",
                  layout: { component: "text-field", cols: 6, if: "rodzajKosztu.fieldE==true" },
                },
              },
            } as any,
            options: {
              showDivider: true,
            },
          },
        },
      },
    },
  },
};
