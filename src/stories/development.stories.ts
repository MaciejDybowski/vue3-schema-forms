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

export const Forte: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        offerInfo: {
          properties: {
            number: {
              content: "Offer No: 2025/01/PLO/134",
              layout: {
                component: "static-content",
                tag: "h1",
                cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 }
              }
            },
            createdBy: {
              label: "Created by",
              layout: {
                component: "data-viewer",
                cols: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }
              },
              valueMapping: "{offerInfo.createdBy:Jan Kowalski}"
            },
            createdAt: {
              label: "Created at",
              layout: {
                component: "data-viewer",
                cols: { xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }
              },
              valueMapping: "{offerInfo.createdAt:21-01-2025}"
            }
          },
          required: []
        },
        customerData: {
          content:
            "<b>Customer:</b></br> \n{customer.name:No data}\n<br> {customer.shipCountry:No data}, {customer.salesRegion:No data}",
          layout: { component: "static-content", tag: "p" }
        },
        offerConditions: {
          properties: {
            currencyCode: {
              label: "Currency",
              layout: {
                cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                component: "dictionary",
                props: { clearable: false }
              },
              source: {
                url: "/api/dictionaries?feature-id=currencies&lm=name&vm=dataId",
                title: "label",
                value: "id",
                returnObject: true
              }
            },
            currencyRate: {
              label: "Currency rate",
              layout: {
                cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                component: "number-field",
                props: { readonly: true }
              },
              type: "float"
            },
            vatRate: {
              label: "VAT rate (%)",
              layout: {
                cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                component: "select",
                fillRow: true
              },
              source: {
                items: [
                  { value: "23", title: "23" },
                  { value: "22", title: "22" },
                  {
                    value: "25",
                    title: "25"
                  }
                ]
              }
            }
          },
          required: []
        },
        "static-content-953": {
          content: "Transport conditions",
          layout: { component: "static-content", tag: "h3" }
        },
        transportConditions: {
          properties: {
            incotermsRule: {
              label: "Incoterms® rule",
              layout: {
                cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                component: "dictionary"
              },
              source: {
                url: "/api/dictionaries?feature-id=incoterms-rules&lm=dataId&vm=dataId",
                title: "label",
                value: "id",
                returnObject: true,
                lazy: true,
                singleOptionAutoSelect: true
              }
            },
            transportRate: {
              label: "Transport rate",
              layout: {
                cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                component: "text-field"
              },
              defaultValue: null
            },
            "static-content-965": {
              content: "If the Incoterms are changed, the Transport Rate field must be completed.",
              layout: {
                component: "static-content",
                tag: "v-alert",
                cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
                props: { type: "warning", density: "compact", variant: "tonal" }
              }
            }
          },
          required: []
        },
        "static-content-413": {
          content: "Calculation rules",
          layout: { component: "static-content", tag: "h3" }
        },
        calculationRules: {
          properties: {
            discountPercent: {
              label: "Customer discount (%)",
              layout: {
                cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                component: "text-field",
                props: { hint: "", "persistent-hint": true }
              },
              defaultValue: null,
              expression: ""
            },
            "retailPriceFactor": {
              "label": "Retail price factor",
              "layout": {
                "cols": {
                  "xs": 12,
                  "sm": 12,
                  "md": 12,
                  "lg": 4,
                  "xl": 4,
                  "xxl": 4
                },
                "fillRow": true,
                "component": "number-field"
              },
              "type": "float",
              "precision": "2",
              "precisionMin": "2",
              onChange: {
                mode: "emit-event",
                "eventSignal": "table-refresh"
              }
            }
          },
          required: []
        },
        "static-content-678": {
          content: "Standard customer discounts retrieved from SAP. Retail price factor must be set to calculate retail price.",
          layout: {
            component: "static-content",
            tag: "v-alert",
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
            props: { variant: "text", type: "info", density: "compact" }
          }
        },
        "static-content-868": {
          content:
            "<b>Other costs:</b><br/>\n<ul style=\"margin-left:20px\">\n<li><b>Additional label</b>: 0,50 PLN per package</li>\n<li><b>Custom logistic service</b>: 5 PLN per product</li>\n</ul>",
          layout: { component: "static-content", tag: "p" }
        },
        "divider-212": { layout: { component: "divider" } },
        "static-content-963": { content: "Products", layout: { component: "static-content", tag: "h3" } },
        "table-view-831": {
          layout: { component: "table-view" },
          source: {
            data: "/api/v1/offers/{offer.id}/offer-items?feature-id=2",
            headers: [
              {
                title: "Image",
                key: "product.mainImageUrl",
                type: "IMAGE"
              },
              {
                title: "Product",
                key: "<b>{product.name: Product name}</b> </br>{product.number:1}\n<br/>\nProgram: {product.programName}",
                type: "TEXT"
              },
              {
                title: "Scale quantity",
                key: "scaleQuantity",
                type: "NUMBER",
                editable: true
              },
              {
                title: "Invoice price (NN)",
                key: "invoicePrice",
                type: "NUMBER",
                editable: true
              },
              { title: "MaT [%]", type: "TEXT", key: "details.marginPercent" },
              {
                title: "Recommended price",
                type: "TEXT",
                key: "{details.recommendedInvoicePrice} NN\n </br>{details.recommendedNnnPrice} NNN\n </br>{details.recommendedNnnExwPrice} NNN EXW"
              },
              {
                title: "Retail price",
                type: "TEXT",
                key: "{details.retailPriceNet:No value} net\n</br>\n{details.retailPriceGross: No value} gross"
              }
            ]
          },
          actions: {}
        },
        "divider-707": { layout: { component: "divider" } }
      },
      required: []
    }
  }
};

export const UserInput: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        textInput: {
          label: "Text",
          layout: {
            component: "text-field"
          }
        },
        userInput: {
          label: "Użytkownicy",
          layout: {
            component: "user-input"
          },
          source: {
            maxSelection: 1
          }
        }
      },
      required: []
    }
  }
};

export const BMProcess: Story = {
  args: {
    model: {
      metadane: {
        sciezkaPlikuFaktury: null,
        nazwaPlikuFaktury: null
      },
      tech: {
        czyPominacOcr: true,
        oddzial: {
          id: "fb01ef61-43c6-43c2-b0b1-918e8b72037d",
          label: "Rzeszów"
        },
        czyObiegSkrocony: false,
        czyDuplikat: true
      },
      dostawca: {
        id: "3c3466be-9e83-4863-9925-8c065076ee95",
        label: "HADEX GAZ SP ZOO",
        kod: "S011547",
        kraj: "PL",
        nip: "7811700284",
        nazwaWyswietlana: "HADEX GAZ SP ZOO - S011547 - 7811700284",
        kodPocztowy: "60-451",
        miejscowosc: "POZNAŃ",
        adres: "J.H. DĄBROWSKIEGO 536",
        nazwa: "HADEX GAZ SP ZOO",
        saldo:
          "Kl. 0311201 - Nieprzeterminowane: 23921.72; Przeterminowane: 0.00; Kl. 0311202 - Nieprzeterminowane: 6906.14; Przeterminowane: 2287.80"
      },
      kod: null,
      nazwa: null,
      nip: null,
      adres: null,
      rejestracja: {
        osobyWybraneDoOpisu: [
          {
            id: "05a4d8ec-3413-4b6e-bcf3-292ad61f8694",
            label: "05a4d8ec-3413-4b6e-bcf3-292ad61f8694",
            firstName: "Adam",
            lastName: "Dyszak",
            email: "adam.dyszak@b-m.pl",
            username: "adam.dyszak",
            labels: "dostawca_osoba_przypisana"
          }
        ],
        decyzjaRejestracja: {
          value: "zatwierdz",
          title: "Zatwierdź"
        },
        osobaRejestrujaca: {
          firstName: "Tecna",
          lastName: "Tecna",
          id: "1304370d-3d81-475b-8f34-7550e85ae491",
          email: "tecna12@tecna.pl",
          username: "TECNA"
        },
        dataRejestracji: "2025-01-05"
      },
      faktura: {
        nrReferencyjny: "DMS-100316",
        nrFaktury: "1",
        typDokumentu: {
          id: "VAT",
          label: "Faktura podstawowa"
        },
        dataWystawienia: "2025-01-05",
        dataWplywu: "2025-01-05",
        dataSprzedazy: "2025-01-05",
        waluta: {
          id: "PLN",
          label: "Polski złoty"
        },
        kurs: 1
      },
      dodajDostawce: false,
      podsumowanie: {
        lPozycji: 1,
        kwotaNetto: 100,
        kwotaVat: 23,
        kwotaBrutto: 123
      },
      pozycjeDokumentu: [
        {
          ordinalNumber: 1,
          aureaSectionId: "HBf4s",
          kwotaNettoPln: 100,
          kwotaVatPln: 23,
          kwotaBruttoPln: 123,
          kwotaBrutto: 123,
          kwotaVAT: 23,
          nazwa: "Maszyna",
          opis: "Test",
          kwotaNetto: 100,
          stawkaVat: {
            id: "23",
            label: "23%",
            mnoznik: "23"
          },
          rodzajKosztu: {
            id: "4025100",
            label: "4025100 - Remonty drobne biura",
            czyPoleNrProjektu: "false",
            czyPoleRodzinaEl5: "false",
            czyPoleRodzinaEl4: "false",
            czyPoleOsobaDoRefatkury: "false",
            czyPoleNrRejestracyjny: "false",
            czyPoleNrZleceniaSerwisowegoDbs: "false",
            czyPoleNazwaKlienta: "false",
            czyPoleAkronim: "false",
            czyPoleOpisDokumentu: "true",
            czyPoleDataPrzyjeciaPrzyjazdu: "false",
            czyPoleCelSpotkania: "false",
            czyPoleDealDbs: "false",
            czyPoleNosnik: "false",
            czyPoleLiczbaOsob: "false"
          },
          osobyWybraneDoAutoryzacji: null,
          miejscePowstaniaKosztu: {
            id: "CD820",
            label: "CD820 - CRS Refakturowanie Poznań"
          }
        }
      ],
      sumy: {
        fakturaOplacona: false,
        dyspozycjaWartosci: false,
        kwotaNetto: 0,
        kwotaVat: 0,
        kwotaBrutto: 0,
        kwotaNettoPln: 0,
        kwotaVatPln: 0,
        kwotaBruttoPln: 0,
        alert: null,
        doZaplatyNetto: null,
        doZaplatyVAT: null,
        doZaplatyKwotaBrutto: null
      },
      dekretacja: {
        nieZnamOsoby: false,
        decyzjaOpisMerytoryczny: {
          value: "zatwierdz",
          title: "Zatwierdź"
        },
        osobyWybraneDoKsiegowania: [
          {
            id: "4b2696da-8c73-4f92-ba39-399c430ad40e",
            label: "4b2696da-8c73-4f92-ba39-399c430ad40e",
            firstName: "Marta",
            lastName: "Gajda",
            email: "marta.gajda@b-m.pl",
            username: "marta.gajda",
            labels: ""
          }
        ]
      }
    },
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
                singleOptionAutoSelect: true
              }
            },
            czyPominacOcr: {
              label: "",
              layout: { component: "checkbox", props: { multiple: false } },
              source: { items: [{ value: true, title: "Pomiń OCR" }] }
            }
          },
          required: ["oddzial"]
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
            lazy: true
          }
        },
        kod: {
          label: "Kod dostawcy",
          layout: { component: "data-viewer", if: "nata(dostawca != null)" },
          valueMapping: "{dostawca.kod}",
          type: "text"
        },
        nazwa: {
          label: "Nazwa dostawcy",
          layout: {
            component: "data-viewer",
            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
            if: "nata(dostawca != null)"
          },
          valueMapping: "{dostawca.label}",
          type: "text"
        },
        nip: {
          label: "NIP",
          layout: {
            component: "data-viewer",
            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
            if: "nata(dostawca != null)"
          },
          valueMapping: "{dostawca.nip}",
          type: "text"
        },
        adres: {
          content:
            "{dostawca.adres:Brak danych} <br>{dostawca.kodPocztowy:Brak danych} {dostawca.miejscowosc:Brak danych}, {dostawca.kraj:Brak danych} <br><br>Saldo: {dostawca.saldo:Brak danych}",
          layout: { component: "static-content", tag: "p", if: "nata(dostawca != null)" }
        }
      },
      required: ["dostawca"]
    }
  }
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
            cols: 4
          }
        },
        description: {
          content:
            "Description of datatable, lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
          layout: {
            component: "static-content",
            tag: "span"
          }
        },
        tableOfProducts: {
          actions: {
            "partner.name": "redirectActionCode"
          },
          source: {
            data: "/api/v1/customers/000da22b-b305-459c-8876-34e39effd2aa/relationships?feature-id=customers",
            headers: [
              {
                title: "ID",
                key: "dataId",
                type: "TEXT"
              },
              {
                title: "Partner name",
                key: "partner.name",
                type: "TEXT"
              },
              {
                title: "Join variables",
                key: "<b>{partner.name}</b> oraz {partner.number}.",
                type: "TEXT"
              },
              /*  {
                  title: "Number",
                  key: "partner.number",
                  type: "TEXT",
                },
                {
                  title: "Function ID",
                  key: "function.id",
                  type: "TEXT",
                },
                {
                  title: "Function Name",
                  key: "function.name",
                  type: "TEXT",
                },*/
              {
                title: "Number",
                key: "number",
                type: "NUMBER",
                align: "end"
              },
              {
                title: "Image",
                key: "image",
                type: "IMAGE",
                properties: {
                  minWidth: 64,
                  maxWidth: 64,
                }
              }
            ]
          },
          layout: {
            component: "table-view"
          }
        },

        fieldA: {
          label: "Aggregate One",
          type: "float",
          precision: 2,
          layout: {
            component: "number-field",
            cols: 4
          }
        },
        fieldB: {
          label: "Aggregate Two",
          type: "float",
          precision: 2,
          layout: {
            component: "number-field",
            cols: 4
          }
        },
        fieldC: {
          label: "Aggregate Three",
          type: "float",
          precision: 2,
          layout: {
            component: "number-field",
            cols: 4
          }
        },
        fieldD: {
          properties: {
            fieldE: {
              label: "Aggregate Four",
              layout: {
                component: "text-field",
                cols: 2
              }
            }
          }
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
                    cols: 4
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
            if: "nata(fieldC > 500)"
          }
        }
      }
    } as Schema
  }
};
