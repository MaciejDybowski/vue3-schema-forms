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

export const RuleWithJSONNataAndContext: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        fieldA: {
          label: "Field A",
          layout: {
            component: "text-field",
          },
          validations: [
            {
              name: "not-logged-user",
              rule: "fieldA != context.userInfo.id or $not($exists(fieldA))",
              message: "You can not."
            }
          ]
        },
      },
    },
    options: {
      context: {
        userInfo: {
          id: "maciek"
        }
      }
    }
  },
};

export const onChangeAction: Story = {
  args: {
    model: {
      czyDuplikat: false,
      daneDostawcy: {
        nip: "99912312",
      },
      faktura: {
        nrFaktury: "nr-123-123",
      },
    },
    schema: {
      type: "object",
      properties: {
        poleA: {
          label: "FieldA",
          layout: {
            component: "text-field",
            if: "czyDuplikat == true",
          },
        },
        poleB: {
          label: "FieldB",
          layout: {
            component: "text-field",
          },
        },
        actionOnChange_3: {
          label: "Action on change value",
          layout: {
            component: "text-field",
          },
          onChange: {
            mode: "action",
            code: "callScript", // cała logika spada na akcje
            params: {
              scriptName: "sprawdz_czy_duplikat",
            },
            body: {
              nip: "{daneDostawcy.nip}",
              numerFaktury: "{faktura.nrFaktury}",
            },
          },
        },
        items: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                nazwa: {
                  layout: {
                    component: "text-field",
                  },
                },
                fieldB: {
                  layout: {
                    component: "text-field",
                    if: "czyDuplikat == true",
                  },
                },
              },
            },
          },
        },
      },
    },
    options: {
      context: {
        token: "eftasd@#1Token",
        dataId: "#1",
        menuFeatureId: "task-handling",
      },
      fieldProps: {
        variant: "outlined",
        density: "comfortable",
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
            component: "duplicated-section",
            schema: {
              properties: {
                nazwa: {
                  label: "Item",
                  layout: { component: "text-field", cols: 12 },
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



export const Dialog_Table_Action: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        fieldA: {
          label: "Fiela D",
          layout: {
            component: "text-field",
          },
        },
        items: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                nazwa: {
                  label: "Item",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              showDivider: true,
              addBtnMode: "action",
              action: {
                code: "batchItemAdd",
              },
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
            cols: 11,
          },
        },
        productImg: {
          source: {
            thumbnail: "/api/images/{productImageId}?token={token}",
            preview: "/api/v1/features/test/images/test?Workspace-Id=test&width=500&height=500",
          },
          layout: {
            component: "image-preview",
            cols: 1,
            props: {
              rounded: 0,
            },
          },
        },
      } as any,
    },
    options: {
      context: {
        token: "eftasd@#1Token",
        dataId: "#1",
        menuFeatureId: "task-handling",
      },
    },
  },
};

export const Dictionaries: Story = {
  args: {
    model: {},
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
      "code": "0078-00",
      "category": {
        "id": "znicze",
        "label": "znicze"
      },
      "attributes": [
        {
          "definition": {
            "code": "ilosc-w-opakowaniu",
            "label": "Ilość w opakowaniu",
            "valueType": "NUMBER"
          },
          "textValue": null,
          "numberValue": "6",
          "dateValue": null,
          "dictionaryValue": null
        },
        {
          "definition": {
            "code": "czas-palenia",
            "label": "Czas Palenia",
            "valueType": "NUMBER"
          },
          "textValue": null,
          "numberValue": "26",
          "dateValue": null,
          "dictionaryValue": null
        },
        {
          "definition": {
            "code": "waga-calkowita-kg",
            "label": "Waga całkowita kg",
            "valueType": "NUMBER"
          },
          "textValue": null,
          "numberValue": "0.53",
          "dateValue": null,
          "dictionaryValue": null
        },
        {
          "definition": {
            "code": "wysokosc",
            "label": "Wysokosc",
            "valueType": "NUMBER"
          },
          "textValue": null,
          "numberValue": "25.5",
          "dateValue": null,
          "dictionaryValue": null
        },
      ],
      "prices": [
        {
          "priceType": {
            "id": "cena-c",
            "label": "Cena C"
          },
          "currency": {
            "id": "116",
            "label": "PLN",
            "digitsAfterDecimal": 2
          },
          "amount": 6.8
        },
        {
          "priceType": {
            "id": "cena-b",
            "label": "Cena B"
          },
          "currency": {
            "id": "116",
            "label": "PLN",
            "digitsAfterDecimal": 2
          },
          "amount": 6.1
        },
        {
          "priceType": {
            "id": "cena-a",
            "label": "Cena A"
          },
          "currency": {
            "id": "116",
            "label": "PLN",
            "digitsAfterDecimal": 2
          },
          "amount": 5.5
        },
      ],
      "basicData": {
        "productNumber": "0078#00",
        "name": "tq",
        "description": null,
        "catalogIndex": null,
        "barcode": null
      },
      "audit": {
        "createdBy": {
          "id": "migration",
          "username": null,
          "firstName": null,
          "lastName": "Migracja",
          "email": null
        },
        "createdAt": "2024-11-19T17:30:37.519918Z",
        "modifiedBy": {
          "id": "migration",
          "username": null,
          "firstName": null,
          "lastName": "Migracja",
          "email": null
        },
        "modifiedAt": "2024-11-19T17:30:37.519918Z"
      },
      "imageName": "main"
    },
    "schema": {
      "type": "object",
      "properties": {
        "extraText1": {
          "content": "Dane podstawowe:",
          "layout": {
            "component": "static-content",
            "tag": "h2"
          }
        },
        "basicData": {
          "properties": {
            "productNumber": {
              "label": "Numer produktu",
              "layout": {
                "component": "text-field"
              }
            },
            "name": {
              "label": " Nazwa",
              "layout": {
                "component": "text-field"
              }
            },
            "catalogIndex": {
              "label": "Indeks katalogowy",
              "layout": {
                "component": "text-field"
              }
            },
            "barcode": {
              "label": "Kod kreskowy (EAN)",
              "layout": {
                "component": "text-field"
              }
            },
            "description": {
              "label": "Opis",
              "layout": {
                "component": "text-area",
                "props": {
                  "counter": 4000
                }
              }
            }
          },
          "required": [
            "productNumber",
            "name"
          ]
        },
        "category": {
          "label": "Kategoria produktu",
          "layout": {
            "component": "dictionary"
          },
          "source": {
            "url": "/api/dictionaries?feature-id=product-categories&lm=basicData.name&vm=code",
            "title": "label",
            "value": "code",
            "singleOptionAutoSelect": true,
            "lazy": true,
            "returnObject": true
          }
        },
        "static-content-839": {
          "content": "Atrybuty dodatkowe:",
          "layout": {
            "component": "static-content",
            "tag": "h2"
          }
        },
        "attributes": {
          "layout": {
            "component": "duplicated-section",
            "cols": {
              "xs": 12,
              "sm": 12,
              "md": 12,
              "lg": 12,
              "xl": 12,
              "xxl": 12
            },
            "schema": {
              "type": "object",
              "properties": {
                "definition": {
                  "label": "Atrybut",
                  "layout": {
                    "component": "dictionary",
                    "cols": {
                      "xs": 12,
                      "sm": 12,
                      "md": 12,
                      "lg": 12,
                      "xl": 6,
                      "xxl": 6
                    }
                  },
                  "source": {
                    "url": "/api/dictionaries?feature-id=attribute-definitions&lm=basicData.name&vm=code&customAttributes=valueType%2C%7BbasicData.valueType%7D%2Cdictionary%2C%7Bdictionary.code%7D",
                    "title": "label",
                    "value": "code",
                    "lazy": true,
                    "singleOptionAutoSelect": true,
                    "returnObject": true
                  }
                },
                "dictionaryValue": {
                  "label": "Słownik",
                  "layout": {
                    "component": "dictionary",
                    "if": "definition.valueType=='DICTIONARY'",
                    "cols": {
                      "xs": 12,
                      "sm": 12,
                      "md": 12,
                      "lg": 12,
                      "xl": 6,
                      "xxl": 6
                    }
                  },
                  "source": {
                    "url": "/api/dictionaries?feature-id=dictionary-entries&lm=basicData.value&vm=basicData.value&filter=dictionary.code%3D%3D{definition.dictionary}",
                    "title": "label",
                    "value": "name",
                    "lazy": true,
                    "singleOptionAutoSelect": true
                  }
                },
                "dateValue": {
                  "label": "Data",
                  "layout": {
                    "component": "date-picker",
                    "if": "definition.valueType=='DATE'",
                    "cols": {
                      "xs": 12,
                      "sm": 12,
                      "md": 12,
                      "lg": 12,
                      "xl": 6,
                      "xxl": 6
                    }
                  }
                },
                "numberValue": {
                  "label": "Liczba",
                  "layout": {
                    "component": "number-field",
                    "if": "definition.valueType=='NUMBER'",
                    "cols": {
                      "xs": 12,
                      "sm": 12,
                      "md": 12,
                      "lg": 12,
                      "xl": 6,
                      "xxl": 6
                    }
                  },
                  "type": "float"
                },
                "textValue": {
                  "label": "Tekst",
                  "layout": {
                    "component": "text-field",
                    "if": "definition.valueType=='TEXT'",
                    "cols": {
                      "xs": 12,
                      "sm": 12,
                      "md": 12,
                      "lg": 12,
                      "xl": 6,
                      "xxl": 6
                    }
                  }
                }
              },
              "required": []
            },
            "options": {
              "addBtnText": "Dodaj atrybut",
              "showDivider": false,
              "ordinalNumberInModel": false
            },
            "editable": true,
            "showElements": true,
            "props": {}
          }
        },
        "divider-509": {
          "layout": {
            "component": "divider"
          }
        },
        "static-content-615": {
          "content": "Ceny:",
          "layout": {
            "component": "static-content",
            "tag": "h2"
          }
        },
        "prices": {
          "layout": {
            "component": "duplicated-section",
            "cols": {
              "xs": 12,
              "sm": 12,
              "md": 12,
              "lg": 12,
              "xl": 12,
              "xxl": 12
            },
            "schema": {
              "type": "object",
              "properties": {
                "priceType": {
                  "label": "Typ ceny",
                  "layout": {
                    "cols": {
                      "xs": 12,
                      "sm": 12,
                      "md": 12,
                      "lg": 12,
                      "xl": 4,
                      "xxl": 4
                    },
                    "component": "dictionary"
                  },
                  "source": {
                    "url": "/api/dictionaries?feature-id=price-types&lm=basicData.name&vm=code",
                    "title": "label",
                    "value": "code",
                    "returnObject": true,
                    "lazy": true,
                    "singleOptionAutoSelect": true
                  }
                },
                "amount": {
                  "label": "Wartość",
                  "layout": {
                    "cols": {
                      "xs": 12,
                      "sm": 12,
                      "md": 12,
                      "lg": 12,
                      "xl": 5,
                      "xxl": 5
                    },
                    "component": "number-field"
                  },
                  "type": "float",
                  "precision": "2"
                },
                "currency": {
                  "label": "Waluta",
                  "layout": {
                    "cols": {
                      "xs": 12,
                      "sm": 12,
                      "md": 12,
                      "lg": 12,
                      "xl": 3,
                      "xxl": 3
                    },
                    "component": "dictionary"
                  },
                  "source": {
                    "url": "/api/dictionaries?feature-id=currencies&lm=basicData.alphabeticCode&vm=id&customAttributes=digitsAfterDecimal%2C%7BbasicData.digitsAfterDecimal%7D",
                    "title": "label",
                    "value": "id"
                  }
                }
              },
              "required": []
            },
            "options": {
              "addBtnText": "Dodaj cenę",
              "showDivider": false,
              "ordinalNumberInModel": false
            },
            "editable": true,
            "showElements": true,
            "props": {}
          }
        }
      },
      "required": [
        "category"
      ]
    }
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

export const ConditionalRequired: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        fieldA: {
          label: "Czy wymagane pole?",
          layout: {
            component: "switch",
          },
        },
        fieldB: {
          label: "Pole z zależną wymagalnością",
          layout: {
            component: "text-field",
          },
          validations: [
            {
              name: "conditional-required",
              message: "Moje pole XD",
              rule: "fieldA=true",
            },
          ],
        },
      },
    },
  },
};
