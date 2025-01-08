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

export const UserInput: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        textInput: {
          label: "Text",
          layout: {
            component: "text-field",
          },
        },
        userInput: {
          label: "Użytkownicy",
          layout: {
            component: "user-input",
          },
          source: {
            maxSelection: 1,
          },
        },
      },
      required: [],
    },
  },
};

export const BMProcess: Story = {
  args: {
    model: {
      metadane: {
        sciezkaPlikuFaktury: null,
        nazwaPlikuFaktury: null,
      },
      tech: {
        czyPominacOcr: true,
        oddzial: {
          id: "fb01ef61-43c6-43c2-b0b1-918e8b72037d",
          label: "Rzeszów",
        },
        czyObiegSkrocony: false,
        czyDuplikat: true,
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
          "Kl. 0311201 - Nieprzeterminowane: 23921.72; Przeterminowane: 0.00; Kl. 0311202 - Nieprzeterminowane: 6906.14; Przeterminowane: 2287.80",
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
            labels: "dostawca_osoba_przypisana",
          },
        ],
        decyzjaRejestracja: {
          value: "zatwierdz",
          title: "Zatwierdź",
        },
        osobaRejestrujaca: {
          firstName: "Tecna",
          lastName: "Tecna",
          id: "1304370d-3d81-475b-8f34-7550e85ae491",
          email: "tecna12@tecna.pl",
          username: "TECNA",
        },
        dataRejestracji: "2025-01-05",
      },
      faktura: {
        nrReferencyjny: "DMS-100316",
        nrFaktury: "1",
        typDokumentu: {
          id: "VAT",
          label: "Faktura podstawowa",
        },
        dataWystawienia: "2025-01-05",
        dataWplywu: "2025-01-05",
        dataSprzedazy: "2025-01-05",
        waluta: {
          id: "PLN",
          label: "Polski złoty",
        },
        kurs: 1,
      },
      dodajDostawce: false,
      podsumowanie: {
        lPozycji: 1,
        kwotaNetto: 100,
        kwotaVat: 23,
        kwotaBrutto: 123,
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
            mnoznik: "23",
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
            czyPoleLiczbaOsob: "false",
          },
          osobyWybraneDoAutoryzacji: null,
          miejscePowstaniaKosztu: {
            id: "CD820",
            label: "CD820 - CRS Refakturowanie Poznań",
          },
        },
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
        doZaplatyKwotaBrutto: null,
      },
      dekretacja: {
        nieZnamOsoby: false,
        decyzjaOpisMerytoryczny: {
          value: "zatwierdz",
          title: "Zatwierdź",
        },
        osobyWybraneDoKsiegowania: [
          {
            id: "4b2696da-8c73-4f92-ba39-399c430ad40e",
            label: "4b2696da-8c73-4f92-ba39-399c430ad40e",
            firstName: "Marta",
            lastName: "Gajda",
            email: "marta.gajda@b-m.pl",
            username: "marta.gajda",
            labels: "",
          },
        ],
      },
    },
    schema: {
      type: "object",
      properties: {
        dostawca: {
          properties: {
            adresPelny: {
              content:
                "<b>{dostawca.nazwa:Brak danych} </b></br> {dostawca.adres:Brak danych} <br>{dostawca.kodPocztowy:Brak danych} {dostawca.miejscowosc:Brak danych}, {dostawca.kraj:Brak danych} <br>NIP: {dostawca.nip:Brak danych} <br>Numer dostawcy: {dostawca.kod:Brak danych}, Numer klienta: {dostawca.numerKlienta:Brak danych} <br><br>Saldo: {dostawca.saldo:Brak danych}",
              layout: { component: "static-content", tag: "p" },
            },
          },
          required: [],
        },
        "divider-1": { layout: { component: "divider" }, color: "#263238", opacity: "100", thickness: 2 },
        faktura: {
          properties: {
            typ: {
              content: "{faktura.typDokumentu.label:Brak danych} nr: {faktura.nrFaktury:Brak danych}",
              layout: { component: "static-content", tag: "h3" },
            },
            nrReferencyjny: {
              label: "Numer referencyjny",
              layout: {
                component: "data-viewer",
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
              },
              valueMapping: "",
            },
            dataWplywu: {
              label: "Data wpływu",
              layout: {
                component: "data-viewer",
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
              },
              valueMapping: "",
              type: "date",
            },
            numerKsef: {
              label: "Numer KSeF",
              layout: {
                component: "data-viewer",
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                if: "nata($exists(faktura.numerKsef))",
              },
              valueMapping: "",
            },
            dataWystawienia: {
              label: "Data wystawienia",
              layout: {
                component: "data-viewer",
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
              },
              type: null,
              valueMapping: "{faktura.dataWystawienia}",
            },
            dataPlatnosci: {
              label: "Data płatności",
              layout: {
                component: "data-viewer",
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
              },
              type: null,
              valueMapping: "{faktura.dataPlatnosci}",
            },
            dataSprzedazy: {
              label: "Data sprzedaży",
              layout: {
                component: "data-viewer",
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
              },
              type: null,
              valueMapping: "{faktura.dataSprzedazy}",
            },
            dataWpisuDoDa: {
              label: "Data wpisu do DA",
              layout: {
                component: "data-viewer",
                cols: { xs: 4, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
              },
              type: null,
              valueMapping: "{faktura.dataWpisuDoDa}",
            },
            waluta: {
              label: "Waluta",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                component: "dictionary",
                props: { clearable: true },
              },
              source: {
                url: "/api/dictionaries?feature-id=waluty&lm=nazwa&vm=kod",
                title: "label",
                value: "id",
                returnObject: true,
                lazy: true,
                singleOptionAutoSelect: true,
              },
            },
            kurs: {
              label: "Kurs",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                component: "number-field",
                if: "nata(faktura.waluta.id!='PLN')",
              },
              type: "float",
              defaultValue: 1,
              precision: "4",
            },
            alertDuplikat: {
              content: "Duplikat faktury",
              layout: {
                component: "static-content",
                tag: "v-alert",
                props: { variant: "outlined", type: "warning", density: "compact" },
                if: "nata(tech.czyDuplikat=true)",
              },
            },
          },
          required: ["waluta"],
        },
        "divider-2": {
          layout: { component: "divider" },
          color: "#263238",
          opacity: "100",
          thickness: 2,
          label: "divider-454665_cloned",
        },
        pozycjeDokumentuTytul: {
          content: "Pozycje dokumentu",
          layout: { component: "static-content", tag: "h3" },
        },
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
                nazwa: {
                  label: "#{pozycjeDokumentu[].ordinalNumber} Nazwa pozycji faktury",
                  layout: { component: "combobox", props: { clearable: true } },
                  source: {
                    url: "/api/dictionaries?feature-id=nazwy-pozycji-faktur&lm=nazwa&vm=nazwa",
                    title: "label",
                    value: "id",
                    returnObject: false,
                    lazy: true,
                    singleOptionAutoSelect: true,
                  },
                  sectionKey: "pozycjeDokumentu",
                },
                opis: {
                  label: "W jakim celu usługa towar zostały zakupione",
                  layout: { component: "text-area" },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy' or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
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
                rodzajKosztu: {
                  label: "Rodzaj kosztu",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "dictionary",
                    props: { clearable: true },
                  },
                  source: {
                    url: "/api/dictionaries?feature-id=rodzaje-kosztow&lm=nazwa&vm=kod&customAttributes=czyPoleCelSpotkania%2C%7BczyPoleCelSpotkania%7D%2CczyPoleNazwaKlienta%2C%7BczyPoleNazwaKlienta%7D%2CczyPoleLiczbaOsob%2C%7BczyPoleLiczbaOsob%7D%2CczyPoleOpisDokumentu%2C%7BczyPoleOpisDokumentu%7D%2CczyPoleDataPrzyjeciaPrzyjazdu%2C%7BczyPoleDataPrzyjeciaPrzyjazdu%7D%2CczyPoleAkronim%2C%7BczyPoleAkronim%7D%2CczyPoleNrRejestracyjny%2C%7BczyPoleNrRejestracyjny%7D%2CczyPoleNosnik%2C%7BczyPoleNosnik%7D%2CczyPoleRodzinaEl4%2C%7BczyPoleRodzinaEl4%7D%2CczyPoleRodzinaEl5%2C%7BczyPoleRodzinaEl5%7D%2CczyPoleDealDbs%2C%7BczyPoleDealDbs%7D%2CczyPoleNrProjektu%2C%7BczyPoleNrProjektu%7D%2CczyPoleNrZleceniaSerwisowegoDbs%2C%7BczyPoleNrZleceniaSerwisowegoDbs%7D%2CczyPoleOsobaDoRefatkury%2C%7BczyPoleOsobaDoRefaktury%7D",
                    title: "label",
                    value: "id",
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                    description: "",
                  },
                  sectionKey: "pozycjeDokumentu",
                  onChange: {
                    mode: "change-model",
                    variables: [{ path: "osobyWybraneDoAutoryzacji", value: null }],
                  },
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                miejscePowstaniaKosztu: {
                  label: "Miejsce powstania kosztu",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "dictionary",
                    props: { clearable: true },
                  },
                  source: {
                    url: "/api/dictionaries?feature-id=centra-kosztowe&lm=nazwa&vm=kod",
                    title: "label",
                    value: "id",
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                    description: "",
                  },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                numerZamowienia: {
                  label: "Numer zamówienia",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "text-field",
                    if: "",
                  },
                  sectionKey: "pozycjeDokumentu",
                },
                celSpotkania: {
                  label: "Cel spotkania",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "text-field",
                    if: "nata(pozycjeDokumentu[].rodzajKosztu.czyPoleCelSpotkania='true')",
                  },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'",
                      message: null,
                    },
                  ],
                },
                liczbaOsob: {
                  label: "Liczba osób",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "number-field",
                    if: "nata(pozycjeDokumentu[].rodzajKosztu.czyPoleLiczbaOsob='true')",
                  },
                  type: "int",
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                numerZlecenia: {
                  label: "Numer zlecenia",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "text-field",
                    if: "nata(pozycjeDokumentu[].rodzajKosztu.czyPoleNrZleceniaSerwisowegoDbs='true')",
                  },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                nazwaKlienta: {
                  label: "Nazwa klienta",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "text-field",
                    if: 'nata(pozycjeDokumentu[].rodzajKosztu.czyPoleNazwaKlienta="true")',
                  },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                element4: {
                  label: "Element 4",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "dictionary",
                    if: 'nata(pozycjeDokumentu[].rodzajKosztu.czyPoleRodzinaEl4="true")',
                  },
                  source: {
                    url: "/api/dictionaries?feature-id=rodzina-el4&lm=kod&vm=kod",
                    title: "label",
                    value: "id",
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                  },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                element5: {
                  label: "Element 5",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "text-field",
                    if: 'nata(pozycjeDokumentu[].rodzajKosztu.czyPoleRodzinaEl5="true")',
                  },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                numerProjektu: {
                  label: "Numer projektu",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "dictionary",
                    if: 'nata(pozycjeDokumentu[].rodzajKosztu.czyPoleNrProjektu="true")',
                    props: { clearable: true },
                  },
                  source: {
                    url: "/api/dictionaries?feature-id=numery-projektow&lm=nazwaProjektu&vm=numerProjektu",
                    title: "label",
                    value: "id",
                    returnObject: true,
                    lazy: true,
                    singleOptionAutoSelect: true,
                  },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                nosnik: {
                  label: "Nośnik",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "text-field",
                    if: "nata(pozycjeDokumentu[].rodzajKosztu.czyPoleNosnik='true' )",
                  },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                akronim: {
                  label: "Akronim",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "text-field",
                    if: "nata(pozycjeDokumentu[].rodzajKosztu.czyPoleAkronim='true')",
                  },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                dealDbs: {
                  label: "Deal-DBS",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "text-field",
                    if: "nata(pozycjeDokumentu[].rodzajKosztu.czyPoleDealDbs='true')",
                  },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                osDoRefaktur: {
                  label: "Osoba do refaktury",
                  layout: {
                    cols: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                    component: "user-input",
                    props: { multiple: false },
                    if: "nata(pozycjeDokumentu[].rodzajKosztu.czyOsobaDoRefaktury='true')",
                  },
                  filter: { group: null },
                  source: { url: "" },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                dataPrzyjecia: {
                  label: "Data przyjęcia/przyjazdu",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "date-picker",
                    if: 'nata(pozycjeDokumentu[].rodzajKosztu.czyPoleDataPrzyjeciaPrzyjazdu="true")',
                  },
                  formatInModel: "YYYY-MM-DD",
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                nrRejestracyjny: {
                  label: "Nr. rejestracyjny ",
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: "text-field",
                    if: 'nata(pozycjeDokumentu[].rodzajKosztu.czyPoleNrRejestracyjny="true")',
                  },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "conditional-required",
                      rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: null,
                    },
                  ],
                },
                osobyWybraneDoAutoryzacji: {
                  label: "Osoba autoryzująca",
                  layout: { component: "user-input", props: { multiple: true, maxSelection: 1 } },
                  filter: { group: null },
                  source: {
                    url: "/api/dictionaries?feature-id=uzytkownicy-autoryzujacy&lm=id.uzytkownikId&vm=id.uzytkownikId&customAttributes=czyPosiadaLimit%2Cexpression%3AlimitKosztowPln%20%21%3D%20null%20and%20new%20Float%28limitKosztowPln%29%3E{pozycjeDokumentu[].kwotaBruttoPln}%2Clabels%2Cexpression%3AlimitKosztowPln%20%21%3D%20null%20and%20new%20Float%28limitKosztowPln%29%3E{pozycjeDokumentu[].kwotaBruttoPln}%3F%20%22has-limit%22%20%3A%20%22no-limit%22%2ClimitKosztowPln%2C%7BlimitKosztowPln%7D%2CplaskaStruktura%2C%7BplaskaStruktura%7D%2Cusername%2C%7BuzytkownikNazwa%7D%2CfirstName%2C%7BuzytkownikImie%7D%2ClastName%2C%7BuzytkownikNazwisko%7D%2Cemail%2C%7BuzytkownikEmail%7D&filter=rodzajKosztuKod%3D%3D{pozycjeDokumentu[].rodzajKosztu.id}",
                  },
                  sectionKey: "pozycjeDokumentu",
                  validations: [
                    {
                      name: "check-current-user",
                      rule: "pozycjeDokumentu[].osobyWybraneDoAutoryzacji[0].username!=context.userInfo.username \nor pozycjeDokumentu[].osobyWybraneDoAutoryzacji[0].plaskaStruktura=\"true\"\nor $not($exists(pozycjeDokumentu[].osobyWybraneDoAutoryzacji[0].username))\nor \ndekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy' \n or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                      message: "Użytkownik opisuący nie może być osobą autoryzującą",
                    },
                  ],
                },
              },
              required: ["pozOpis", "selNazwa", "selRodzajKosztu", "pozSelOsobaAutoryzujaca", "osobaAutoryzujaca"],
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
        "divider-3": {
          layout: { component: "divider" },
          color: "#263238",
          opacity: "100",
          thickness: 2,
          label: "divider-454665_cloned192_cloned",
        },
        htmlpodsumowanie: {
          content: "Podsumowanie - kwoty otrzymane",
          layout: { component: "static-content", tag: "h3" },
        },
        podsumowanie: {
          properties: {
            lPozycji: {
              label: "Liczba pozycji",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                fillRow: true,
                component: "number-field",
                props: { readonly: true },
              },
              type: "int",
              expression: "ARRAY_SIZE(pozycjeDokumentu)",
            },
            kwotaNetto: {
              label: "Kwota netto",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                component: "number-field",
                props: { readonly: "nata(tech.czyPominacOcr=true)" },
                if: "",
              },
              type: "float",
              precision: "2",
              precisionMin: "2",
            },
            kwotaVat: {
              label: "Kwota VAT",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                component: "number-field",
                props: { readonly: "nata(tech.czyPominacOcr=true)" },
              },
              type: "float",
              precision: "2",
              precisionMin: "2",
            },
            kwotaBrutto: {
              label: "Kwota brutto",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                component: "number-field",
                props: { readonly: "nata(tech.czyPominacOcr=true)" },
              },
              type: "float",
              precision: "2",
              precisionMin: "2",
            },
          },
          required: [],
        },
        "divider-4": {
          layout: { component: "divider" },
          color: "#263238",
          opacity: "100",
          thickness: 2,
          label: "divider-454665_cloned192_cloned702_cloned",
        },
        htmlSumyOpisuMeryt: {
          content: "<b>Sumy opisu merytorycznego</b>",
          layout: { component: "static-content", tag: "p" },
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
            kwotaNettoPln: {
              label: "Przeliczona kwota netto na PLN (ukryte)",
              layout: {
                cols: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                component: "number-field",
                hide: true,
              },
              type: "float",
              calculation: "sumy.kwotaNetto*faktura.kurs",
              precision: "2",
            },
            kwotaVatPln: {
              label: "Ukryta kwota VAT w PLN",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                component: "number-field",
                hide: true,
              },
              type: "float",
              precision: "2",
              calculation: "sumy.kwotaVat*faktura.kurs",
            },
            kwotaBruttoPln: {
              label: "Przeliczona kwota brutto na PLN (ukryte)",
              layout: {
                cols: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                component: "number-field",
                hide: true,
              },
              type: "float",
              calculation: "sumy.kwotaBrutto*faktura.kurs",
              precision: "2",
            },
            fakturaOplacona: {
              label: "Faktura opłacona",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                component: "switch",
                fillRow: true,
              },
            },
            dyspozycjaWartosci: {
              label: "Dyspozycja wartości zapłaty faktury",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                component: "switch",
                fillRow: true,
                props: { "false-value": false, "true-value": true },
              },
            },
            doZaplatyNetto: {
              label: "Do zapłaty kwota netto",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                component: "text-field",
                if: "nata(sumy.dyspozycjaWartosci=true)",
              },
            },
            doZaplatyVAT: {
              label: "Kwota VAT",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                component: "text-field",
                if: "nata(sumy.dyspozycjaWartosci=true)",
              },
            },
            doZaplatyKwotaBrutto: {
              label: "Do zapłaty kwota brutto",
              layout: {
                cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                component: "text-field",
                if: "nata(sumy.dyspozycjaWartosci=true)",
              },
            },
          },
          required: [],
        },
        "divider-5": {
          layout: { component: "divider" },
          color: "#263238",
          opacity: "100",
          thickness: 2,
          label: "divider-4242_cloned",
        },
        htmlAdnotacja: {
          content: "Adnotacja",
          layout: { component: "static-content", tag: "h3", if: "nata($exists(faktura.numerKsef))" },
          label: "htmlRejestracja963_cloned",
        },
        adnotacje: {
          content: "{adnotacje:Brak danych}",
          layout: { component: "static-content", tag: "p", if: "nata($exists(faktura.numerKsef))" },
        },
        htmlRejestracja: { content: "Rejestracja", layout: { component: "static-content", tag: "h3" } },
        rejestracja: {
          content:
            "<b>Osoba rejestrująca:</b> {rejestracja.osobaRejestrujaca.firstName:Brak danych}&nbsp{rejestracja.osobaRejestrujaca.lastName:Brak danych} <b> Akceptacja: </b> {rejestracja.decyzjaRejestracja:Brak danych} &nbsp <b> Data akceptacji: </b> {rejestracja.dataRejestracji:Brak danych}",
          layout: { component: "static-content", tag: "p" },
        },
        htmldekretacja: { content: "Dekretacja", layout: { component: "static-content", tag: "h3" } },
        dekretacja: {
          properties: {
            decyzjaOpisMerytoryczny: {
              label: "Decyzja",
              layout: { component: "select" },
              source: {
                items: [
                  { value: "zatwierdz", title: "Zatwierdź" },
                  {
                    value: "anuluj",
                    title: "Anuluj",
                  },
                  { value: "doPoprawy", title: "Do poprawy" },
                ],
                returnObject: true,
              },
            },
            osobyWybraneDoKsiegowania: {
              label: "Osoba księgująca",
              layout: {
                component: "user-input",
                props: { multiple: true, maxSelection: 1 },
                if: "nata(dekretacja.nieZnamOsoby=false)",
              },
              filter: { group: null },
              source: {
                url: "/api/dictionaries?feature-id=uzytkownicy-przypisani-do-dostawcow&vm=uzytkownikId&customAttributes=username%2C%7BuzytkownikNazwa%7D%2CfirstName%2C%7BuzytkownikImie%7D%2ClastName%2C%7BuzytkownikNazwisko%7D%2Cemail%2C%7BuzytkownikEmail%7D%2Clabels%2C%7Betykiety%7D&filter=dostawcaId%3D%3D{dostawca.id}%3Brola%3D%3D%22ksiegujacy%22&sort=etykiety%2Casc&sort=uzytkownikNazwa%2Casc",
              },
              validations: [
                {
                  name: "conditional-required",
                  rule: "dekretacja.decyzjaOpisMerytoryczny.value != 'doPoprawy'  or $not($exists(dekretacja.decyzjaOpisMerytoryczny))",
                  message: null,
                },
              ],
            },
            nieZnamOsoby: {
              label: "Nie znam osoby księgującej, przypisz do ogólnej grupy księgowych",
              layout: { component: "switch" },
            },
          },
          required: ["decyzjaOpisMerytoryczny"],
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
          actions: {
            'nazwaKlienta': "redirectActionCode"
          },
          source: {
            data: "/api/customer-pricelists/{pricelistId}/details?fields=content,aggregates,pageable",
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
