// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import { Schema } from '../types/schema/Schema';
import { TABLE_PAGE_WITH_AGGREGATES, UPDATE_TABLE_ROW } from './mock-responses';





export default {
  title: 'Development Area',
  component: FormStoryWrapper,
  args: {
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
    },
  },
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;

export const Story1: Story = {
  args: {
    formModel: {
      zglaszajacy: {
        firstName: 'tecna',
        lastName: 'tecna',
        id: '6ec86987-65b4-46ae-a81e-b4611c50130d',
        email: 'tecna@tecna.pl',
        username: 'TECNA',
      },
      dataZlozenia: '2025-08-05',
      wniosekWImieniu: false,
      numerDelegacji: '2025/0085',
      techCzyZaliczka: 1,
      rodzajDelegacji: [
        {
          value: 'zagraniczna',
          title: 'Podróż  zagraniczna',
        },
      ],
      layoutCelDelegacjiZagr: [
        {
          formaWyplatyZagr: {
            value: 1,
            title: 'Konto osobiste',
          },
          switchEtapPrywatnyZagr: true,
          dietyZagr: true,
          hotelZagr: false,
          przejazdyZagr: false,
          dojazdyZagr: true,
          minimalnaDataPodrozyZagranicznej: 1754388240000,
          maksymalnaDataPodrozyZagranicznej: 1754932740000,
          czasDelegacjiZagranicznej: 544500000,
          czasPrywatnyDelegacjiZagranicznej: 18060000,
          czasPodrozyGodzinyZagr: 2,
          czasPodrozyDniZagr: 6,
          wysokoscZaliczkiZagr: 262,
          czasPodrozyMinutyZagr: 14,
          krajZagr: {
            id: 'GR',
            description: '',
            label: 'Grecja',
            kwotaOdliczenieSniadanie: 7.5,
            kodWaluty: 'EUR',
            kwotaOdliczenieKolacja: 15,
            kwotaDiety: 50,
            kwotaRyczaltDojazd: 5,
            limitNoclegu: 160,
            kwotaRyczaltNocleg: 40,
            kwotaOdliczenieObiad: 15,
          },
          walutaZagr: {
            id: 'EUR',
            description: '',
            label: 'Euro',
            symbol: '€',
            miejscaDziesietne: '{miejscaDz',
          },
          podrozDelegacjiZagr: [
            {
              srodekTransportuZagr: {
                id: 'SAMOLOT',
                description: '',
                label: 'Samolot',
                czyWymagaKilometrowki: false,
              },
              miejscowoscWyjazduZagr: 'Warszawa',
              miejscowoscPrzyjazduZagr: 'Ateny',
              dataWyjazduZagr: '2025-08-05T12:04:00.000+02:00',
              dataPrzyjazduZagr: '2025-08-05T15:05:00.000+02:00',
            },
            {
              srodekTransportuZagr: {
                id: 'SAMOLOT',
                description: '',
                label: 'Samolot',
                czyWymagaKilometrowki: false,
              },
              miejscowoscWyjazduZagr: 'Ateny',
              miejscowoscPrzyjazduZagr: 'Warszawa',
              dataWyjazduZagr: '2025-08-11T16:05:00.000+02:00',
              dataPrzyjazduZagr: '2025-08-11T19:19:00.000+02:00',
            },
          ],
          layoutEtapPrywatnyZagr: [
            {
              dataEtapPrywatnyStartZagr: '2025-08-11T10:00:00.000+02:00',
              dataEtapPrywatnyKoniecZagr: '2025-08-11T14:00:00.000+02:00',
            },
            {
              dataEtapPrywatnyStartZagr: '2025-08-11T14:00:00.000+02:00',
              dataEtapPrywatnyKoniecZagr: '2025-08-11T15:01:00.000+02:00',
            },
          ],
          sniadaniaZagr: 1,
          obiadyZagr: 3,
          kolacjeZagr: 1,
          dietyKwotaZagr: 232,
          sniadaniaZagrManuallyChanged: true,
          obiadyZagrManuallyChanged: true,
          kolacjeZagrManuallyChanged: true,
          liczbaOgolemKmZagr: null,
          kosztyPrzejazduKwotaZagr: null,
          kosztyDojazduKwotaZagr: 30,
          liczbaDniDojazdowZagr: 6,
          numerKontaBankowegoZagr: 'PL12123412341234123412341234',
        },
      ],
      pokrycieKosztowZagr: true,
      calkowityCzasDelegacjiZagranicznej: 544500000,
      minimalnaDataWszystkichPodrozyZagranicznej: 1754388240000,
      maksymalnaDataWszystkichPodrozyZagranicznej: 1754932740000,
      calkowityCzasPodrozyGodzinyZagr: 2,
      calkowityCzasPrywatnyDelegacjiZagranicznej: 18060000,
      calkowityCzasPodrozyDniZagr: 6,
      calkowityCzasPodrozyMinutyZagr: 14,
      cbPodrozPoPracy: [1],
      htmlZaproszenieZagr: null,
      zaproszenieZagr: 'Andrzej',
      htmlOswiadczenieKosztyZagr: null,
      cbOswiadczeniaKosztowZagr: [1],
      cbZobowiazanie: [
        {
          value: 1,
          title:
            'Zobowiązuję się do rozliczenia z otrzymanej zaliczki w ciągu 14 dni kalendarzowych od daty zakończenia podróży służbowej. Przyjmuję do wiadomości, że w przypadku niedotrzymania terminu rozliczenia zaliczki przekazana kwota zostanie w całości potrącona z najbliższego wynagrodzenia. Wyrażam zgodę na potrącenie przez pracodawcę z mojego wynagrodzenia należności z tytułu nierozliczonej kwoty zaliczki otrzymanej w związku z podróżą służbową.',
        },
      ],
      czyZatwierdzono: 'zatwierdz',
      czyWniosekPoprawny: 'tak',
      grupaZaliczkaZagr: [
        {
          walutaZagr: 'Euro',
          symbolWaluty: '€',
          kodWaluty: 'EUR',
          kwotaDewizZagr: 262,
          walutaKursZagr: 1,
          wysokoscZaliczkiZagr: 262,
          formaWyplatyZagr: {
            value: 1,
            title: 'Konto osobiste',
          },
          numerKontaBankowegoZagr: 'PL12123412341234123412341234',
        },
      ],
      zaliczkaZagranicznaPrzeliczonaNaPln: 262,
      kwotaZaliczkiSuma: 262,
    },
    schema: {
      type: 'object',
      properties: {
        grupaZagr: {
          layout: {
            component: 'fields-group',
            cols: 12,
            schema: {
              type: 'object',
              properties: {
                layoutCelDelegacjiZagr: {
                  layout: {
                    component: 'duplicated-section',
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 12,
                      xl: 12,
                      xxl: 12,
                    },
                    schema: {
                      type: 'object',
                      properties: {
                        delegacjaInformacjeKraj: {
                          content:
                            'Kraj:<b> {layoutCelDelegacjiZagr[].krajZagr.label:Brak danych} </b> <br> Waluta:<b> {layoutCelDelegacjiZagr[].walutaZagr.label: Brak danych}',
                          layout: {
                            component: 'static-content',
                            tag: 'p',
                            if: '',
                          },
                        },
                        rozdzielaczPrzejazdu: {
                          layout: {
                            component: 'divider',
                          },
                          thickness: 1,
                          opacity: '100',
                        },
                        infoPodrozDelegacjiZagr: {
                          content: '<b>Przejazdy</b>',
                          layout: {
                            tag: 'p',
                            component: 'static-content',
                          },
                        },
                        podrozDelegacjiZagr: {
                          layout: {
                            component: 'duplicated-section',
                            cols: {
                              xs: 12,
                              sm: 12,
                              md: 12,
                              lg: 12,
                              xl: 12,
                              xxl: 12,
                            },
                            offset: {
                              xs: 0,
                              sm: 0,
                              md: 0,
                              lg: 0,
                              xl: 0,
                              xxl: 0,
                            },
                            schema: {
                              type: 'object',
                              properties: {
                                delegacjaTransportZagr: {
                                  content:
                                    'Środek transportu:<b> {layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].srodekTransportuZagr.label: Brak danych}  ',
                                  layout: {
                                    component: 'static-content',
                                    tag: 'p',
                                  },
                                },
                                delegacjaWyjazdZagr: {
                                  content:
                                    'Wyjazd z miejscowości: <b>{layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].miejscowoscWyjazduZagr: Brak danych}</b>, dnia<b> {layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].dataWyjazduZagr: Brak danych:DATETIME}',
                                  layout: {
                                    component: 'static-content',
                                    tag: 'p',
                                  },
                                },
                                delegacjaPrzyjazdZagr: {
                                  content:
                                    'Przyjazd do miejscowości: <b>{layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].miejscowoscPrzyjazduZagr:Brak danych}</b>, dnia <b>{layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].dataPrzyjazduZagr: Brak danych:DATETIME}',
                                  layout: {
                                    component: 'static-content',
                                    tag: 'p',
                                  },
                                },
                                htmlLiczbaKmZagr: {
                                  content:
                                    'Liczba kilometrów:<b> {layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].liczbaKmZagr:Brak danych} </b> km',
                                  layout: {
                                    tag: 'p',
                                    component: 'static-content',
                                    if: 'nata(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].srodekTransportuZagr.czyWymagaKilometrowki=true)',
                                  },
                                },
                              },
                            },
                            options: {
                              addBtnText: 'Dodaj przejazd',
                              showDivider: true,
                              ordinalNumberInModel: false,
                              showFirstInitRow: true,
                            },
                            props: {},
                          },
                          editable: false,
                          showElements: false,
                        },
                        htmlEtapPrywatnyZagr: {
                          content: 'Etap prywatny:',
                          layout: {
                            component: 'static-content',
                            tag: 'p',
                            if: 'nata(switchEtapPrywatnyZagr=true)',
                          },
                        },
                      },
                    },
                    options: {
                      addBtnText: 'Dodaj',
                      showDivider: true,
                      ordinalNumberInModel: false,
                      showFirstInitRow: true,
                      addBtnMode: 'add',
                    },
                    props: {},
                    offset: {
                      xs: 0,
                      sm: 0,
                      md: 0,
                      lg: 0,
                      xl: 0,
                      xxl: 0,
                    },
                  },
                  editable: false,
                  showElements: false,
                },
              },
            },
            props: {},
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
          },
        },
      },
    },
  },
  parameters: {},
};

export const Story2: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        switch: { label: 'Switch', layout: { component: 'switch' } },
        foreignGroup: {
          layout: {
            component: 'fields-group',
            cols: 12,
            offset: 0,
            schema: {
              type: 'object',
              properties: {
                stages: {
                  layout: {
                    component: 'duplicated-section',
                    cols: 12,
                    offset: 0,
                    schema: {
                      type: 'object',
                      properties: {
                        sthOne: {
                          label: 'Sth One',
                          layout: {
                            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                            component: 'text-field',
                          },
                        },
                        sthTwo: {
                          label: 'Sth Two',
                          layout: {
                            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                            component: 'text-field',
                          },
                        },
                        showInternal: { label: 'Show internal', layout: { component: 'switch' } },
                        internalGroup: {
                          layout: {
                            component: 'fields-group',
                            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                            schema: {
                              type: 'object',
                              properties: {
                                item1: {
                                  label: 'Item 1',
                                  layout: {
                                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                                    component: 'number-field',
                                  },
                                  type: 'int',
                                },
                                item2: {
                                  label: 'Item 2',
                                  layout: {
                                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                                    component: 'number-field',
                                  },
                                  type: 'int',
                                },
                                item3: {
                                  label: 'Item 3',
                                  layout: {
                                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                                    component: 'number-field',
                                  },
                                  type: 'int',
                                },
                              },
                            },
                            if: 'nata(stages[].showInternal=true)',
                          },
                        },
                      },
                    },
                    options: {
                      addBtnText: 'Add element',
                      showDivider: false,
                      ordinalNumberInModel: false,
                      showFirstInitRow: true,
                    },
                  },
                  editable: true,
                  showElements: true,
                },
              },
            },
            if: 'nata(switch=true)',
          },
        },
      },
    },
  },
};

export const Story: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        options: {
          label: 'Options',
          layout: { component: 'radio-button' },
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              {
                value: 3,
                title: 'Option 3',
              },
            ],
            returnObject: true,
          },
        },
        item: {
          label: 'Item',
          layout: { component: 'select', if: 'nata(options.value=1)' },
          source: {
            items: [
              { value: 'option1', title: 'Option 1' },
              {
                value: 'option2',
                title: 'Option 2',
              },
              { value: 'option3', title: 'Option 3' },
            ],
            returnObject: true,
          },
        },
        projectName: {
          label: 'Project Name',
          layout: { component: 'text-field' },
          dependency: 'item.value',
          dependencyTriggers: ['item'],
        },
      },
      required: ['projectName'],
    },
  },
  parameters: {},
};

export const Story5 = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        htmlWniosek: {
          content: 'Wniosek o podróż służbową nr {numerDelegacji: Brak danych}',
          layout: {
            component: 'static-content',
            tag: 'h2',
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
          },
        },
        htmlPracownik: {
          content:
            'Wniosek złożony w imieniu pracownika<b> {pracownik.firstName: Brak danych} {pracownik.lastName: Brak danych} </b>',
          layout: {
            component: 'static-content',
            tag: 'p',
            if: 'nata(wniosekWImieniu=true)',
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
          },
        },
        htmlDanePodstawowe: {
          content:
            'Wniosek złożony dnia:<b> {dataZlozenia: Brak danych} </b>przez:<b> {zglaszajacy.firstName: Brak danych} {zglaszajacy.lastName:Brak danych}</b>',
          layout: {
            component: 'static-content',
            tag: 'p',
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
          },
        },
        alertDelegacja: {
          memorable: true,
          content:
            'Na tym etapie wybierz rodzaj podróży służbowej, oraz uzupełnij wymagane dane według poniższych wskazań: <br><br> Podróż służbowa - krajowa powinna zostać uzupełniona w trzech przypadkach: <br> \n1. W przypadku gdy podróż służbowa pracownika odbywa się wyłącznie na terytorium Polski. <br>2. W przypadku podróży służbowej zagranicznej do momentu startu samolotu, wypłynięcia statku lub przekroczenia granicy lądowej.<br>3. W przypadku powrotu z podróży służbowej zagranicznej od momentu wylądowania samolotu, wpłynięcia statku do portu lub przekroczenia granicy lądowej<br><br> Podróż służbowa - zagraniczna dotyczy okresu czasu od:<br>1. Wylotu samolotu z polskiego lotniska do przylotu samolotu na polskie lotnisko.\n<br>2. Wypłynięcia statku z polskiego portu do przypłynięcia statku do polskiego portu. <br>3. Opuszczenia terytorium polski drogą lądową do jej ponownego przekroczenia.',
          layout: { component: 'alert', cols: { xs: 8, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 } },
        },
        stawkiKilometrowki: {
          label: 'Stawki kilometrówki',
          config: [
            { title: 'kod', valueMapping: 'kilometrowka.kod' },
            {
              title: 'Nazwa',
              valueMapping: 'kilometrowka.nazwa',
            },
            { title: 'Stawka za KM', valueMapping: 'kilometrowka.stawkaZaKm' },
          ],
          layout: {
            component: 'key-value-list',
            cols: { xs: 12, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 },
            hide: true,
          },
        },
        rodzajDelegacji: {
          label: 'Rodzaj podróży służbowej',
          layout: { component: 'checkbox', props: { multiple: true }, fillRow: true },
          source: {
            items: [
              { value: 'krajowa', title: 'Podróż  krajowa' },
              {
                value: 'zagraniczna',
                title: 'Podróż  zagraniczna',
              },
            ],
            returnObject: true,
          },
          validations: [],
        },
        divider1: {
          layout: {
            component: 'divider',
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
          },
          opacity: '100',
          thickness: 2,
        },
        grupaZagr: {
          layout: {
            component: 'fields-group',
            cols: { xs: 12, sm: 10, md: 10, lg: 8, xl: 8, xxl: 8 },
            schema: {
              type: 'object',
              properties: {
                'divider-863': {
                  layout: { component: 'divider', if: "nata('krajowa' in rodzajDelegacji.value)" },
                  thickness: 2,
                  opacity: '100',
                },
                htmlDelegacjaZagr: {
                  content: 'Informacje o podróży zagranicznej',
                  layout: { component: 'static-content', tag: 'h3' },
                },
                layoutCelDelegacjiZagr: {
                  layout: {
                    component: 'duplicated-section',
                    cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                    schema: {
                      type: 'object',
                      properties: {
                        krajZagr: {
                          label: 'Kraj',
                          layout: {
                            cols: { xs: 6, sm: 3, md: 3, lg: 8, xl: 8, xxl: 8 },
                            component: 'dictionary',
                            if: '',
                          },
                          source: {
                            url: '/api/dictionaries?feature-id=slownik-lokalizacji-delegacji&lm=nazwa&vm=kodKraju&customAttributes=kwotaDiety%2C%7BkwotaDiety%7D%2ClimitNoclegu%2C%7BlimitNoclegu%7D%2CkwotaRyczaltDojazd%2C%7Bkalkulacja.kwotaRyczaltDojazd%7D%2CkwotaRyczaltNocleg%2C%7Bkalkulacja.kwotaRyczaltNocleg%7D%2CkwotaOdliczenieSniadanie%2C%7Bkalkulacja.kwotaOdliczenieSniadanie%7D%2CkwotaOdliczenieObiad%2C%7Bkalkulacja.kwotaOdliczenieObiad%7D%2CkwotaOdliczenieKolacja%2C%7Bkalkulacja.kwotaOdliczenieKolacja%7D%2CkodWaluty%2C%7BkodWaluty%7D',
                            title: 'label',
                            value: 'id',
                            returnObject: true,
                            lazy: true,
                            singleOptionAutoSelect: true,
                          },
                          onChange: { mode: null },
                          null: {},
                        },
                        walutaZagr: {
                          label: 'Waluta',
                          layout: {
                            cols: { xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                            component: 'dictionary',
                            if: '',
                          },
                          source: {
                            url: '/api/dictionaries?feature-id=slownik-walut&lm=nazwa&vm=kod&value-filter={layoutCelDelegacjiZagr[].krajZagr.kodWaluty}&customAttributes=symbol%2C%7Bsymbol%7D%2CmiejscaDziesietne%2C%7BmiejscaDz',
                            title: 'label',
                            value: 'id',
                            returnObject: true,
                            lazy: true,
                            singleOptionAutoSelect: true,
                          },
                          defaultValue: null,
                        },
                        rozdzielaczPrzejazdu: {
                          layout: { component: 'divider' },
                          thickness: 1,
                          opacity: '100',
                        },
                        infoPodrozDelegacjiZagr: {
                          content: '<b>Przejazdy</b>',
                          layout: { tag: 'span', component: 'static-content' },
                        },
                        podrozDelegacjiZagr: {
                          sectionKey: 'layoutCelDelegacjiZagr',
                          layout: {
                            component: 'duplicated-section',
                            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                            schema: {
                              type: 'object',
                              properties: {
                                srodekTransportuZagr: {
                                  label: 'Środek transportu',
                                  layout: { fillRow: true, component: 'dictionary' },
                                  source: {
                                    url: '/api/dictionaries?feature-id=slownik-srodkow-transportu&lm=nazwa&vm=kod&customAttributes=czyWymagaKilometrowki%2C%7BczyWymagaKilometrowki%7D',
                                    title: 'label',
                                    value: 'id',
                                    returnObject: true,
                                    lazy: true,
                                    singleOptionAutoSelect: true,
                                    multiple: false,
                                    maxSelection: 0,
                                  },
                                },
                                alerKilometrowkaZagr: {
                                  memorable: false,
                                  content:
                                    'Rozliczenie przejazdu prywatnym środkiem transportu wymaga podania liczby kilometrów – zgodnie z § 3 ust. 2 Rozp. Min. Infrastruktury z 25.03.2002 r. (Dz.U. 2002 nr 27 poz. 271).',
                                  layout: {
                                    component: 'alert',
                                    props: { type: 'info' },
                                    if: 'nata(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].srodekTransportuZagr.czyWymagaKilometrowki=true)',
                                  },
                                },
                                htmlWyjazdZagr: {
                                  content: '<b>Wyjazd',
                                  layout: {
                                    component: 'static-content',
                                    tag: 'p',
                                    cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                                  },
                                },
                                htmlPrzyjazdZagr: {
                                  content: '<b>Przyjazd',
                                  layout: {
                                    component: 'static-content',
                                    tag: 'p',
                                    cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                                    fillRow: true,
                                  },
                                },
                                miejscowoscWyjazduZagr: {
                                  label: 'Miejscowość wyjazdu',
                                  layout: {
                                    cols: { xs: 4, sm: 4, md: 4, lg: 6, xl: 6, xxl: 6 },
                                    component: 'text-field',
                                  },
                                },
                                miejscowoscPrzyjazduZagr: {
                                  label: 'Miejscowość przyjazdu',
                                  layout: {
                                    cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                                    fillRow: true,
                                    component: 'text-field',
                                  },
                                },
                                dataWyjazduZagr: {
                                  label: 'Data i godzina wyjazdu',
                                  layout: {
                                    cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                                    component: 'date-time-picker',
                                  },
                                  validations: [
                                    {
                                      name: 'NieWczesniejsze',
                                      rule: '($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].dataWyjazduZagr, layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].dataPrzyjazduZagr))',
                                      message:
                                        'Podróż nie może kończyć się wcześniej niż zaczynać!',
                                    },
                                  ],
                                },
                                dataPrzyjazduZagr: {
                                  label: 'Data i godzina przyjazdu',
                                  layout: {
                                    cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                                    fillRow: true,
                                    component: 'date-time-picker',
                                  },
                                  validations: [
                                    {
                                      name: 'NieWczesniejsze',
                                      rule: '($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].dataWyjazduZagr, layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].dataPrzyjazduZagr))',
                                      message:
                                        'Podróż nie może kończyć się wcześniej niż zaczynać!',
                                    },
                                  ],
                                },
                                liczbaKmZagr: {
                                  label: 'Liczba km',
                                  layout: {
                                    component: 'number-field',
                                    if: 'nata(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].srodekTransportuZagr.czyWymagaKilometrowki=true)',
                                    hide: false,
                                    props: { suffix: 'KM', 'persistent-hint': false },
                                  },
                                  type: 'int',
                                  validations: [
                                    {
                                      name: 'NieUjemne',
                                      rule: 'layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].liczbaKmZagr > 0',
                                      message: 'Wartość musi być większa od 0!',
                                    },
                                  ],
                                },
                              },
                              required: [
                                'srodekTransportuZagr',
                                'miejscowoscWyjazduZagr',
                                'miejscowoscPrzyjazduZagr',
                                'dataWyjazduZagr',
                                'dataPrzyjazduZagr',
                                'liczbaKmZagr',
                              ],
                            },
                            options: {
                              addBtnText: 'Dodaj przejazd',
                              showDivider: true,
                              ordinalNumberInModel: false,
                              showFirstInitRow: true,
                            },
                            props: {},
                          },
                          editable: true,
                          showElements: true,
                        },
                        minimalnaDataPodrozyZagranicznej: {
                          label: 'Minimalna data podróży zagranicznej',
                          layout: {
                            cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                            component: 'number-field',
                            props: { suffix: 'ms', hint: '', 'persistent-hint': false },
                            hide: true,
                          },
                          type: 'int',
                          expression:
                            'JSONATA($min(layoutCelDelegacjiZagr[].podrozDelegacjiZagr.dataWyjazduZagr ? layoutCelDelegacjiZagr[].podrozDelegacjiZagr.dataWyjazduZagr.$toMillis() : 0))',
                        },
                        maksymalnaDataPodrozyZagranicznej: {
                          label: 'Maksymalna data podróży zagranicznej',
                          layout: {
                            cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                            fillRow: true,
                            component: 'number-field',
                            props: { suffix: 'ms', hint: '', 'persistent-hint': false },
                            hide: true,
                          },
                          type: 'int',
                          expression:
                            'JSONATA($max(layoutCelDelegacjiZagr[].podrozDelegacjiZagr.dataPrzyjazduZagr ? layoutCelDelegacjiZagr[].podrozDelegacjiZagr.dataPrzyjazduZagr .$toMillis() : 0))',
                        },
                        rozdzielaczPrywatny: {
                          layout: { component: 'divider' },
                          thickness: 1,
                          opacity: '100',
                        },
                        infoPrywatnyEtapDelegacjiZagr: {
                          content: '<b>Etapy prywatne</b>',
                          layout: {
                            tag: 'span',
                            component: 'static-content',
                            cols: { xs: 6, sm: 4, md: 4, lg: 3, xl: 3, xxl: 3 },
                          },
                        },
                        switchEtapPrywatnyZagr: {
                          label: 'Etap prywatny',
                          layout: {
                            component: 'switch',
                            props: { 'false-value': false, 'true-value': true, color: '' },
                            cols: { xs: 6, sm: 8, md: 8, lg: 9, xl: 9, xxl: 9 },
                            fillRow: true,
                          },
                          mode: false,
                        },
                        alertEtapPrywatnyZagr: {
                          memorable: false,
                          content:
                            'W przypadku wskazania etapu prywatnego czas ten zostanie automatycznie odliczony przy przeliczeniach.',
                          layout: {
                            component: 'alert',
                            if: 'nata(layoutCelDelegacjiZagr[].switchEtapPrywatnyZagr=true)',
                          },
                        },
                        layoutEtapPrywatnyZagr: {
                          layout: {
                            component: 'duplicated-section',
                            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                            schema: {
                              type: 'object',
                              properties: {
                                dataEtapPrywatnyStartZagr: {
                                  label: 'Początek etapu prywatnego',
                                  layout: {
                                    cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                                    component: 'date-time-picker',
                                    if: '',
                                  },
                                  validations: [
                                    {
                                      name: 'NieUjemne',
                                      rule: '($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutCelDelegacjiZagr[].layoutEtapPrywatnyZagr[].dataEtapPrywatnyStartZagr, layoutCelDelegacjiZagr[].layoutEtapPrywatnyZagr[].dataEtapPrywatnyKoniecZagr))',
                                      message:
                                        'Podróż nie może kończyć się wcześniej niż zaczynać!',
                                    },
                                  ],
                                },
                                dataEtapPrywatnyKoniecZagr: {
                                  label: 'Koniec etapu prywatnego',
                                  layout: {
                                    cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                                    fillRow: true,
                                    component: 'date-time-picker',
                                    if: '',
                                  },
                                  validations: [
                                    {
                                      name: 'NieUjemne',
                                      rule: '($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutEtapPrywatnyZagr[].dataEtapPrywatnyStartZagr, layoutEtapPrywatnyZagr[].dataEtapPrywatnyKoniecZagr))',
                                      message:
                                        'Podróż nie może kończyć się wcześniej niż zaczynać!',
                                    },
                                  ],
                                },
                                alertPokryciaZagr: {
                                  memorable: false,
                                  content:
                                    'Wyznaczony okres etapu prywatnego nie zawiera się w pełni w ramach zadeklarowanego okresu podróży służbowej. Proszę zweryfikować daty rozpoczęcia i zakończenia etapu prywatnego.',
                                  layout: {
                                    component: 'alert',
                                    props: { type: 'warning' },
                                    if: 'nata(($startPrywatny := $toMillis(layoutCelDelegacjiZagr[].layoutEtapPrywatnyZagr[].dataEtapPrywatnyStartZagr); $endPrywatny := $toMillis(layoutCelDelegacjiZagr[].layoutEtapPrywatnyZagr[].dataEtapPrywatnyKoniecZagr); ($exists($startPrywatny) and $exists($endPrywatny) and $exists(layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej) and $exists(layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej)) and ($startPrywatny < layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej or $endPrywatny > layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej)))',
                                  },
                                },
                              },
                              required: ['dataEtapPrywatnyStartZagr'],
                            },
                            options: {
                              addBtnText: 'Dodaj etap prywatny',
                              showDivider: true,
                              ordinalNumberInModel: false,
                              showFirstInitRow: true,
                              addBtnMode: 'add',
                            },
                            props: {},
                            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                            if: 'nata(layoutCelDelegacjiZagr[].switchEtapPrywatnyZagr=true)',
                          },
                          editable: true,
                          showElements: true,
                          sectionKey: 'layoutCelDelegacjiZagr',
                        },
                        rozdzielaczCzasu: {
                          layout: { component: 'divider' },
                          thickness: 1,
                          opacity: '100',
                        },
                        infoCzasDelegacjiZagr: {
                          content: '<b>Planowany czas podróży zagranicznej</b>',
                          layout: { tag: 'span', component: 'static-content' },
                        },
                        czasDelegacjiZagranicznej: {
                          label: 'Czas delegacji zagranicznej',
                          layout: {
                            cols: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                            component: 'number-field',
                            props: { suffix: 'ms', readonly: true, 'persistent-hint': false },
                            hide: true,
                          },
                          type: 'int',
                          expression:
                            'JSONATA(((layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej ? layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej : 0) - (layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej ? layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej : 0)))',
                        },
                        czasPrywatnyDelegacjiZagranicznej: {
                          label: 'Czas prywatny delegacji zagranicznej',
                          layout: {
                            cols: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                            component: 'number-field',
                            props: { suffix: 'ms', 'persistent-hint': false },
                            hide: true,
                          },
                          type: 'int',
                          expression:
                            'JSONATA(($minPodrozy := layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej ? layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej : 0; $maxPodrozy := layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej ? layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej : 0; $sum(layoutCelDelegacjiZagr[].layoutEtapPrywatnyZagr.($privateStartMillis := dataEtapPrywatnyStartZagr ? $toMillis(dataEtapPrywatnyStartZagr) : 0; $privateEndMillis := dataEtapPrywatnyKoniecZagr ? $toMillis(dataEtapPrywatnyKoniecZagr) : 0; ($privateStartMillis > 0 and $privateEndMillis > 0 and $minPodrozy > 0 and $maxPodrozy > 0) ? ($effectiveStart := $max([$minPodrozy, $privateStartMillis]); $effectiveEnd := $min([$maxPodrozy, $privateEndMillis]); $duration := $effectiveEnd - $effectiveStart; $duration > 0 ? $duration : 0) : 0))))',
                        },
                        czasPodrozyDniZagr: {
                          label: 'Dni',
                          layout: {
                            cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                            component: 'number-field',
                            props: { readonly: true },
                          },
                          type: 'int',
                          expression:
                            'JSONATA($floor(((layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej ? layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej : 0) -(layoutCelDelegacjiZagr[].czasPrywatnyDelegacjiZagranicznej ? layoutCelDelegacjiZagr[].czasPrywatnyDelegacjiZagranicznej : 0))/ (1000 * 60 * 60 * 24)))',
                        },
                        czasPodrozyGodzinyZagr: {
                          label: 'Godziny',
                          layout: {
                            cols: { xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                            component: 'number-field',
                            props: { readonly: true },
                          },
                          type: 'int',
                          expression:
                            'JSONATA($floor(((layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej ? layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej : 0) - (layoutCelDelegacjiZagr[].czasPrywatnyDelegacjiZagranicznej ? layoutCelDelegacjiZagr[].czasPrywatnyDelegacjiZagranicznej : 0)) % 86400000 / 3600000))',
                        },
                        czasPodrozyMinutyZagr: {
                          label: 'Minuty',
                          layout: {
                            cols: { xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                            component: 'number-field',
                            props: { readonly: true },
                          },
                          type: 'int',
                          expression:
                            'JSONATA($floor(((layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej ? layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej : 0) -(layoutCelDelegacjiZagr[].czasPrywatnyDelegacjiZagranicznej ? layoutCelDelegacjiZagr[].czasPrywatnyDelegacjiZagranicznej : 0))%(1000 * 60 * 60 * 24)) % (1000 * 60 * 60) / (1000 * 60))',
                        },
                        rozdzielaczZaliczki: {
                          layout: {
                            component: 'divider',
                            if: 'nata(layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej > 0 and $exists(layoutCelDelegacjiZagr[].krajZagr))',
                          },
                          thickness: 1,
                          opacity: '100',
                        },
                        infoZaliczkaDelegacjiZagr: {
                          content: '<b>Zaliczki</b>',
                          layout: { tag: 'span', component: 'static-content', if: '' },
                        },
                        dietyZagr: {
                          label: 'Diety',
                          layout: {
                            component: 'switch',
                            if: '',
                            props: { 'true-value': true, 'false-value': false },
                          },
                        },
                        grpDietyZagr: {
                          sectionKey: 'layoutCelDelegacjiZagr',
                          layout: {
                            component: 'fields-group',
                            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                            schema: {
                              type: 'object',
                              properties: {
                                sniadaniaZagr: {
                                  label: 'Liczba śniadań',
                                  layout: {
                                    component: 'number-field',
                                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                                    if: '',
                                  },
                                  type: 'int',
                                  expression: '',
                                  calculation: '0',
                                  defaultValue: null,
                                },
                                obiadyZagr: {
                                  label: 'Liczba obiadów',
                                  layout: {
                                    component: 'number-field',
                                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                                    if: '',
                                  },
                                  type: 'int',
                                  expression: '',
                                  calculation: '0',
                                  defaultValue: 0,
                                },
                                kolacjeZagr: {
                                  label: 'Liczba kolacji',
                                  layout: {
                                    component: 'number-field',
                                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                                    if: '',
                                  },
                                  type: 'int',
                                  expression: '',
                                  calculation: '0',
                                  defaultValue: 0,
                                },
                                dietyKwotaZagr: {
                                  label: 'Kwota',
                                  layout: {
                                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                                    component: 'number-field',
                                    if: '',
                                    props: {
                                      suffix: '{layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }',
                                      hint: 'Kwota diety: {layoutCelDelegacjiZagr[].krajZagr.kwotaDiety: -} {layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }',
                                      'persistent-hint': true,
                                    },
                                  },
                                  type: 'float',
                                  precision: '2',
                                  precisionMin: '2',
                                  calculation:
                                    '$floor(($dni := layoutCelDelegacjiZagr[].czasPodrozyDniZagr; $godz := layoutCelDelegacjiZagr[].czasPodrozyGodzinyZagr; $pelnaDieta := layoutCelDelegacjiZagr[].krajZagr.kwotaDiety; $czyJednodniowa := $dni = 0; $dieta := $czyJednodniowa ? ($godz < 8 ? 0 : ($godz < 12 ? layoutCelDelegacjiZagr[].krajZagr.kwotaOdliczenieSniadanie : layoutCelDelegacjiZagr[].krajZagr.kwotaDiety)) : ($dni * $pelnaDieta + ($godz >= 12 ? layoutCelDelegacjiZagr[].krajZagr.kwotaDiety: ($godz >= 8 ? layoutCelDelegacjiZagr[].krajZagr.kwotaOdliczenieObiad : 0))); $odliczenia := ($exists(layoutCelDelegacjiZagr[].sniadaniaZagr) ? layoutCelDelegacjiZagr[].sniadaniaZagr : 0) * layoutCelDelegacjiZagr[].krajZagr.kwotaOdliczenieSniadanie + ($exists(layoutCelDelegacjiZagr[].obiadyZagr) ? layoutCelDelegacjiZagr[].obiadyZagr : 0) * layoutCelDelegacjiZagr[].krajZagr.kwotaOdliczenieObiad + ($exists(layoutCelDelegacjiZagr[].kolacjeZagr) ? layoutCelDelegacjiZagr[].kolacjeZagr : 0) * layoutCelDelegacjiZagr[].krajZagr.kwotaOdliczenieKolacja; $dieta - $odliczenia))',
                                },
                              },
                            },
                            if: 'nata(layoutCelDelegacjiZagr[].dietyZagr=true)',
                            props: {},
                            options: { showDivider: false, addBtnText: 'Add' },
                          },
                        },
                        hotelZagr: {
                          label: 'Hotel',
                          layout: {
                            component: 'switch',
                            if: '',
                            fillRow: true,
                            props: { 'true-value': true, 'false-value': false },
                          },
                        },
                        grpHotelZagr: {
                          sectionKey: 'layoutCelDelegacjiZagr',
                          layout: {
                            component: 'fields-group',
                            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                            schema: {
                              type: 'object',
                              properties: {
                                liczbaNoclegowZagr: {
                                  label: 'Liczba noclegów',
                                  layout: {
                                    cols: { xs: 4, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                                    component: 'number-field',
                                    if: '',
                                    props: { readonly: true },
                                  },
                                  type: 'int',
                                  expression:
                                    'JSONATA(($dni := layoutCelDelegacjiZagr[].czasPodrozyDniZagr; $godz := layoutCelDelegacjiZagr[].czasPodrozyGodzinyZagr + layoutCelDelegacjiZagr[].czasPodrozyMinutyZagr / 60; $dni + ($godz >= 6 ? 1 : 0)))',
                                },
                                hotelKwotaZagr: {
                                  label: 'Kwota',
                                  layout: {
                                    cols: { xs: 8, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                                    fillRow: true,
                                    component: 'number-field',
                                    props: {
                                      suffix: '{layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }',
                                      hint: 'Kwota noclegu: {layoutCelDelegacjiZagr[].krajZagr.kwotaRyczaltNocleg: -} {layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }',
                                      'persistent-hint': true,
                                    },
                                    if: '',
                                  },
                                  type: 'float',
                                  expression: '',
                                  precision: '2',
                                  precisionMin: '2',
                                  roundOption: 'round',
                                  calculation:
                                    'layoutCelDelegacjiZagr[].liczbaNoclegowZagr * layoutCelDelegacjiZagr[].krajZagr.kwotaRyczaltNocleg',
                                },
                              },
                            },
                            if: 'nata(layoutCelDelegacjiZagr[].hotelZagr=true)',
                            props: {},
                            options: { showDivider: false, addBtnText: 'Add' },
                          },
                        },
                        przejazdyZagr: {
                          label: 'Koszty przejazdu',
                          layout: { component: 'switch' },
                        },
                        grpPrzejazdZagr: {
                          sectionKey: 'layoutCelDelegacjiZagr',
                          layout: {
                            component: 'fields-group',
                            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                            schema: {
                              type: 'object',
                              properties: {
                                liczbaOgolemKmZagr: {
                                  label: 'Pokonany dystans',
                                  layout: {
                                    cols: { xs: 12, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                                    component: 'number-field',
                                    props: { readonly: true },
                                    if: 'nata($count($filter(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[], function($v){$v.srodekTransportuZagr.czyWymagaKilometrowki = true})) > 0)',
                                  },
                                  type: 'int',
                                  expression:
                                    'JSONATA($sum($map(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[], function($v){($exists($v.liczbaKmZagr) and $v.liczbaKmZagr!=null) ? $number($v.liczbaKmZagr) : 0})))',
                                },
                                kosztyPrzejazduKwotaZagr: {
                                  label: 'Kwota',
                                  layout: {
                                    cols: { xs: 12, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                                    component: 'number-field',
                                    props: {
                                      suffix: '{layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }',
                                      'persistent-hint': true,
                                    },
                                  },
                                  props: {
                                    suffix: '{layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }',
                                  },
                                  type: 'float',
                                  precision: '2',
                                  precisionMin: '2',
                                  roundOption: 'round',
                                },
                              },
                            },
                            if: 'nata(layoutCelDelegacjiZagr[].przejazdyZagr=true)',
                            props: {},
                            options: { showDivider: false, addBtnText: 'Add' },
                          },
                        },
                        dojazdyZagr: {
                          label: 'Koszty dojazdu',
                          layout: {
                            component: 'switch',
                            if: '',
                            props: { 'true-value': true, 'false-value': false },
                          },
                        },
                        grpDojazdZagr: {
                          sectionKey: 'layoutCelDelegacjiZagr',
                          layout: {
                            component: 'fields-group',
                            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                            schema: {
                              type: 'object',
                              properties: {
                                liczbaDniDojazdowZagr: {
                                  label: 'Liczba dni',
                                  layout: {
                                    cols: { xs: 4, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                                    component: 'number-field',
                                    props: { readonly: true },
                                    if: '',
                                  },
                                  type: 'int',
                                  expression:
                                    'JSONATA(($dni := layoutCelDelegacjiZagr[].czasPodrozyDniZagr; $godz := layoutCelDelegacjiZagr[].czasPodrozyGodzinyZagr + layoutCelDelegacjiZagr[].czasPodrozyMinutyZagr / 60; $dni + ($godz >= 6 ? 1 : 0)))',
                                },
                                kosztyDojazduKwotaZagr: {
                                  label: 'Kwota',
                                  layout: {
                                    cols: { xs: 8, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                                    component: 'number-field',
                                    if: '',
                                    props: {
                                      suffix: '{layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }',
                                      hint: 'Kwota dojazdu: {layoutCelDelegacjiZagr[].krajZagr.kwotaRyczaltDojazd: -}  {layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }',
                                      'persistent-hint': true,
                                    },
                                  },
                                  type: 'float',
                                  precision: '2',
                                  precisionMin: '2',
                                  calculation:
                                    'layoutCelDelegacjiZagr[].liczbaDniDojazdowZagr*layoutCelDelegacjiZagr[].krajZagr.kwotaRyczaltDojazd',
                                },
                              },
                            },
                            props: {},
                            options: { showDivider: false, addBtnText: 'Add' },
                            if: 'nata(layoutCelDelegacjiZagr[].dojazdyZagr=true)',
                          },
                        },
                        'divider-520': {
                          layout: { component: 'divider' },
                          thickness: 2,
                          opacity: '100',
                        },
                        wysokoscZaliczkiZagr: {
                          label: 'Wysokość zaliczki',
                          layout: {
                            cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                            component: 'number-field',
                            if: '',
                            props: {
                              suffix: '{layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }',
                              hint: '',
                              'persistent-hint': false,
                            },
                          },
                          type: 'float',
                          precision: '2',
                          precisionMin: '2',
                          calculation: '',
                          expression:
                            'JSONATA((layoutCelDelegacjiZagr[].dietyKwotaZagr ? layoutCelDelegacjiZagr[].dietyKwotaZagr : 0)+(layoutCelDelegacjiZagr[].hotelKwotaZagr ? layoutCelDelegacjiZagr[].hotelKwotaZagr : 0)+(layoutCelDelegacjiZagr[].kosztyDojazduKwotaZagr ? layoutCelDelegacjiZagr[].kosztyDojazduKwotaZagr : 0)+(layoutCelDelegacjiZagr[].kosztyPrzejazduKwotaZagr ? layoutCelDelegacjiZagr[].kosztyPrzejazduKwotaZagr : 0))',
                        },
                        formaWyplatyZagr: {
                          label: 'Forma wypłaty',
                          layout: {
                            cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                            component: 'select',
                            if: '',
                          },
                          source: {
                            items: [
                              { value: 1, title: 'Konto osobiste' },
                              {
                                value: 2,
                                title: 'Gotówka',
                              },
                            ],
                            returnObject: true,
                          },
                          defaultValue: { value: 1, title: 'Konto osobiste' },
                        },
                        numerKontaBankowegoZagr: {
                          label: 'Numer konta bankowego',
                          layout: {
                            cols: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                            component: 'text-field',
                            if: 'nata(layoutCelDelegacjiZagr[].formaWyplatyZagr.value=1)',
                            props: {
                              hint: 'Przykład: PL12123412341234123412341234',
                              'persistent-hint': true,
                            },
                          },
                          validations: [
                            {
                              name: 'WalidatorIBAN',
                              rule: "(layoutCelDelegacjiZagr[].numerKontaBankowegoZagr and $length(layoutCelDelegacjiZagr[].numerKontaBankowegoZagr) = 28 and $substring(layoutCelDelegacjiZagr[].numerKontaBankowegoZagr, 0, 2) = 'PL' and $match($substring(layoutCelDelegacjiZagr[].numerKontaBankowegoZagr, 2), /^[0-9]{26}$/))",
                              message: 'Błędny numer konta bankowego!',
                            },
                          ],
                        },
                      },
                      required: [
                        'krajZagr',
                        'walutaZagr',
                        'formaWyplatyZagr',
                        'numerKontaBankowegoZagr',
                      ],
                    },
                    options: {
                      addBtnText: 'Dodaj kraj',
                      showDivider: true,
                      ordinalNumberInModel: false,
                      showFirstInitRow: true,
                      addBtnMode: 'add',
                    },
                    editable: true,
                    showElements: true,
                    props: {},
                    offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                  },
                  sectionKey: 'grupaZagr',
                  editable: true,
                  showElements: true,
                },
                minimalnaDataWszystkichPodrozyZagranicznej: {
                  label: 'Minimalna data wszystkich podróży zagranicznej',
                  layout: {
                    cols: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    component: 'number-field',
                    hide: true,
                  },
                  type: 'int',
                  expression:
                    'JSONATA($min($map($filter(layoutCelDelegacjiZagr.podrozDelegacjiZagr[].dataWyjazduZagr, $exists), function($v) { $toMillis($v) })))',
                },
                maksymalnaDataWszystkichPodrozyZagranicznej: {
                  label: 'Maksymalna data wszystkich podróży zagranicznej',
                  layout: {
                    cols: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    fillRow: true,
                    component: 'number-field',
                    props: { 'persistent-hint': true },
                    hide: true,
                  },
                  type: 'int',
                  expression:
                    'JSONATA($max($map($filter(layoutCelDelegacjiZagr.podrozDelegacjiZagr[].dataPrzyjazduZagr, $exists), function($v) { $toMillis($v) })))',
                },
                divider6: {
                  layout: { component: 'divider' },
                  opacity: '100',
                  thickness: 2,
                  label: 'divider1197_cloned',
                },
                htmlCzasPodrozyZagr: {
                  content: 'Planowany całkowity czas podróży zagranicznej',
                  layout: { component: 'static-content', tag: 'h3' },
                },
                calkowityCzasDelegacjiZagranicznej: {
                  label: 'calkowityCzasDelegacjiZagranicznej',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    component: 'number-field',
                    hide: true,
                    props: { suffix: 'ms', hint: '', 'persistent-hint': false },
                  },
                  type: 'int',
                  expression:
                    'JSONATA(((maksymalnaDataWszystkichPodrozyZagranicznej ? maksymalnaDataWszystkichPodrozyZagranicznej : 0) - (minimalnaDataWszystkichPodrozyZagranicznej ? minimalnaDataWszystkichPodrozyZagranicznej : 0)))',
                  defaultValue: 0,
                },
                calkowityCzasPrywatnyDelegacjiZagranicznej: {
                  label: 'calkowityCzasPrywatnyDelegacjiZagranicznej',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    component: 'number-field',
                    hide: true,
                    props: { suffix: 'ms', hint: '', 'persistent-hint': false },
                  },
                  type: 'int',
                  expression:
                    'JSONATA($sum($map(layoutCelDelegacjiZagr[], function($v){($exists($v.czasPrywatnyDelegacjiZagranicznej) and $v.czasPrywatnyDelegacjiZagranicznej!=null) ? $number($v.czasPrywatnyDelegacjiZagranicznej) : 0})))',
                },
                calkowityCzasPodrozyDniZagr: {
                  label: 'Dni',
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: 'number-field',
                    props: { readonly: 'true', hint: '', 'persistent-hint': false },
                  },
                  type: 'int',
                  expression:
                    'JSONATA($floor(((calkowityCzasDelegacjiZagranicznej ? calkowityCzasDelegacjiZagranicznej : 0) -(calkowityCzasPrywatnyDelegacjiZagranicznej ? calkowityCzasPrywatnyDelegacjiZagranicznej : 0))/ (1000 * 60 * 60 * 24)))',
                },
                calkowityCzasPodrozyGodzinyZagr: {
                  label: 'Godziny',
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: 'number-field',
                    props: { readonly: true, hint: '', 'persistent-hint': false },
                    hide: false,
                  },
                  type: 'int',
                  expression:
                    'JSONATA($floor(((calkowityCzasDelegacjiZagranicznej ? calkowityCzasDelegacjiZagranicznej : 0) - (calkowityCzasPrywatnyDelegacjiZagranicznej ? calkowityCzasPrywatnyDelegacjiZagranicznej : 0)) % 86400000 / 3600000))',
                },
                calkowityCzasPodrozyMinutyZagr: {
                  label: 'Minuty',
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'number-field',
                    props: { readonly: true, hint: '', 'persistent-hint': false },
                  },
                  type: 'int',
                  expression:
                    'JSONATA($floor(((calkowityCzasDelegacjiZagranicznej ? calkowityCzasDelegacjiZagranicznej : 0) -(calkowityCzasPrywatnyDelegacjiZagranicznej ? calkowityCzasPrywatnyDelegacjiZagranicznej : 0))%(1000 * 60 * 60 * 24)) % (1000 * 60 * 60) / (1000 * 60))',
                },
                divider7: {
                  layout: { component: 'divider' },
                  opacity: '100',
                  thickness: 2,
                  label: 'divider5577_cloned',
                },
                htmlOswiadczenieZagr: {
                  content: 'Oświadczenie w sprawie pokrycia kosztów podróży',
                  layout: { component: 'static-content', tag: 'h3' },
                },
                pokrycieKosztowZagr: {
                  label: 'Organizator pokrywa część kosztów związanych z wyjazdem',
                  layout: { component: 'switch' },
                },
                htmlZaproszenieZagr: {
                  content: 'Podróż służbowa odbędzie się na zaproszenie:',
                  layout: {
                    component: 'static-content',
                    tag: 'p',
                    cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                    if: 'nata(pokrycieKosztowZagr=true)',
                  },
                },
                zaproszenieZagr: {
                  label: '',
                  layout: {
                    cols: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                    component: 'text-field',
                    props: { 'persistent-hint': true },
                    if: 'nata(pokrycieKosztowZagr=true)',
                  },
                },
                htmlOswiadczenieKosztyZagr: {
                  content:
                    '<b>Oświadczam, że w/w organizator pokrywa następujące koszty związane z wyjazdem:',
                  layout: {
                    component: 'static-content',
                    tag: 'p',
                    if: 'nata(pokrycieKosztowZagr=true)',
                  },
                },
                cbOswiadczeniaKosztowZagr: {
                  label: '',
                  layout: {
                    component: 'checkbox',
                    props: { multiple: true },
                    if: 'nata(pokrycieKosztowZagr=true)',
                  },
                  source: {
                    items: [
                      {
                        value: 1,
                        title: 'koszty zakwaterowania w miejscu podróży,',
                      },
                      {
                        value: 2,
                        title: 'koszty przejazdu do miejsca docelowego, w tym koszty powrotu,',
                      },
                      { value: 3, title: 'koszty przejazdów w miejscu docelowym,' },
                      {
                        value: '4',
                        title: 'koszty wyżywienia w czasie podróży.',
                      },
                    ],
                  },
                },
              },
            },
            props: {},
            options: { showDivider: false, addBtnText: 'Add' },
            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
            if: "nata('zagraniczna' in rodzajDelegacji.value)",
          },
        },
        divider5: {
          layout: {
            component: 'divider',
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
            if: 'nata(techCzyZaliczka=1)',
          },
          opacity: '100',
          thickness: 2,
        },
        techCzyZaliczka: {
          label: 'Czy jest zaliczka?',
          layout: { component: 'number-field', hide: true },
          type: 'int',
          expression:
            "JSONATA(('zagraniczna' in rodzajDelegacji.value or czyZaliczkaKraj=true) ? 1 : 0)",
        },
        czyDyrektor: {
          label: 'Czy wniosek dyrektora?',
          layout: { component: 'select', if: '1=0' },
          source: {
            items: [
              { value: 'tak', title: 'Tak' },
              { value: 'nie', title: 'Nie' },
            ],
          },
        },
        cbZobowiazanie: {
          label: 'Oświadczenia',
          layout: {
            component: 'checkbox',
            props: { multiple: true },
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
            if: 'nata(techCzyZaliczka=1)',
          },
          source: {
            items: [
              {
                value: 1,
                title:
                  'Zobowiązuję się do rozliczenia z otrzymanej zaliczki w ciągu 14 dni kalendarzowych od daty zakończenia podróży służbowej. Przyjmuję do wiadomości, że w przypadku niedotrzymania terminu rozliczenia zaliczki przekazana kwota zostanie w całości potrącona z najbliższego wynagrodzenia. Wyrażam zgodę na potrącenie przez pracodawcę z mojego wynagrodzenia należności z tytułu nierozliczonej kwoty zaliczki otrzymanej w związku z podróżą służbową.',
              },
            ],
            returnObject: true,
          },
        },
      },
      required: ['rodzajDelegacji', 'cbZobowiazanie'],
    },
  },
};

export const TextEditableField: Story = {
  name: 'Editable field: Text',
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        span: {
          content: '',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        tableOfProducts: {
          layout: {
            component: 'table-view',
          },
          source: {
            data: '/mock-data/table-view-mock',
            headers: [
              {
                title: 'Id',
                key: 'id',
                valueMapping: 'dataId',
                type: 'TEXT',
              },
              {
                title: 'Location Collection',
                key: 'location-collection',
                editable: [
                  {
                    type: 'TEXT',
                    title: 'Location',
                    key: 'location',
                    valueMapping: 'location',
                    validations: [
                      {
                        name: 'valid-sth',
                        rule: 'location="Brazil"',
                        message: 'For some reason this value is not allowed.',
                      },
                    ],
                  },
                ],
                properties: { minWidth: '200px', maxWidth: '200px', width: '100px' },
                key: 'height-collection',
                type: 'COLLECTION',
              },
              {
                title: 'Height',
                key: 'height',
                valueMapping: 'height',
                type: 'TEXT',
              },
              {
                title: 'Base',
                key: 'base',
                valueMapping: 'base',
                type: 'TEXT',
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

export const StoryPath: Story = {
  args: {
    formModel: {
      zglaszajacy: {
        mobilePhoneNumber: null,
        firstName: 'tecna',
        lastName: 'tecna',
        phoneNumber: null,
        manager: null,
        jobTitle: null,
        id: '6ec86987-65b4-46ae-a81e-b4611c50130d',
        department: null,
        email: 'tecna@tecna.pl',
        username: 'TECNA',
      },
      dataZlozenia: '2025-08-08',
      wniosekWImieniu: false,
      zglaszajacyNazwaPrzelozonego: null,
      czyDyrektor: 'tak',
      numerDelegacji: '2025/0139',
      techCzyZaliczka: 1,
      rodzajDelegacji: [
        {
          value: 'zagraniczna',
          title: 'Podróż  zagraniczna',
        },
      ],
      switchEtapPrywatnyKraj: null,
      pokrycieKosztowKraj: null,
      czyZaliczkaKraj: null,
      minimalnaDataPodrozyKrajowej: null,
      maksymalnaDataPodrozyKrajowej: null,
      calkowityCzasDelegacjiKrajowej: null,
      calkowityCzasPrywatnyDelegacjiKrajowej: null,
      czasPodrozyGodzinyKraj: null,
      czasPodrozyDniKraj: null,
      czasPodrozyMinutyKraj: null,
      htmlDelegacjaKraj: null,
      layoutCelDelegacjiKraj: null,
      alertEtapPrywatnyKraj: null,
      layoutEtapPrywatnyKraj: null,
      'divider-965': null,
      htmlCzasPodrozyKraj: null,
      divider2: null,
      htmlOswiadczenieKraj: null,
      htmlZaproszenieKraj: null,
      zaproszenieKraj: null,
      htmlOswiadczenieKosztyKraj: null,
      cbOswiadczeniaKosztowKraj: null,
      divider3: null,
      htmlZaliczkaKraj: null,
      dietyKraj: null,
      dietyGroup: null,
      hotelKraj: null,
      'fields-group-206': null,
      kosztyPrzejazduKraj: null,
      kosztyPrzejazduKwotaKraj: null,
      ryczaltyNaDojazdKraj: null,
      ryczaltGroup: null,
      'divider-760': null,
      wysokoscZaliczkiKraj: null,
      formaWyplatyKraj: null,
      numerKontaBankowegoKraj: null,
      layoutCelDelegacjiZagr: [
        {
          formaWyplatyZagr: {
            value: 1,
            title: 'Konto osobiste',
          },
          switchEtapPrywatnyZagr: false,
          dietyZagr: true,
          hotelZagr: true,
          przejazdyZagr: true,
          dojazdyZagr: false,
          minimalnaDataPodrozyZagranicznej: 1754650980000,
          maksymalnaDataPodrozyZagranicznej: 1755208800000,
          czasDelegacjiZagranicznej: 557820000,
          czasPrywatnyDelegacjiZagranicznej: null,
          czasPodrozyGodzinyZagr: 10,
          czasPodrozyDniZagr: 6,
          wysokoscZaliczkiZagr: 0,
          czasPodrozyMinutyZagr: 57,
          krajZagr: {
            id: 'AZ',
            description: '',
            label: 'Azerbejdżan',
            kwotaOdliczenieSniadanie: 6.45,
            kodWaluty: 'EUR',
            kwotaOdliczenieKolacja: 12.9,
            kwotaDiety: 43,
            kwotaRyczaltDojazd: 4.3,
            limitNoclegu: 150,
            kwotaRyczaltNocleg: 37.5,
            kwotaOdliczenieObiad: 12.9,
          },
          walutaZagr: {
            id: 'EUR',
            description: '',
            label: 'Euro',
            symbol: '€',
            miejscaDziesietne: '{miejscaDz',
          },
          podrozDelegacjiZagr: [
            {
              srodekTransportuZagr: {
                id: 'POCIAG',
                description: '',
                label: 'Pociąg',
                czyWymagaKilometrowki: false,
              },
              miejscowoscWyjazduZagr: '1',
              miejscowoscPrzyjazduZagr: '2',
              dataWyjazduZagr: '2025-08-08T13:03:00.000+02:00',
              dataPrzyjazduZagr: '2025-08-15T00:00:00.000+02:00',
            },
          ],
          obiadyZagr: 0,
          kolacjeZagr: 0,
          sniadaniaZagr: 0,
          dietyKwotaZagr: 0,
          hotelKwotaZagr: 0,
          liczbaNoclegowZagr: 6,
          liczbaOgolemKmZagr: null,
          kosztyPrzejazduKwotaZagr: null,
          kosztyDojazduKwotaZagr: null,
          liczbaDniDojazdowZagr: null,
        },
      ],
      pokrycieKosztowZagr: false,
      calkowityCzasDelegacjiZagranicznej: 557820000,
      minimalnaDataWszystkichPodrozyZagranicznej: 1754650980000,
      maksymalnaDataWszystkichPodrozyZagranicznej: 1755208800000,
      calkowityCzasPodrozyGodzinyZagr: 10,
      calkowityCzasPrywatnyDelegacjiZagranicznej: 0,
      calkowityCzasPodrozyDniZagr: 6,
      calkowityCzasPodrozyMinutyZagr: 57,
    },
    schema: {
      type: 'object',
      properties: {
        stawkiKilometrowki: {
          label: 'Stawki kilometrówki',
          config: [
            { title: 'kod', valueMapping: 'kilometrowka.kod' },
            {
              title: 'Nazwa',
              valueMapping: 'kilometrowka.nazwa',
            },
            { title: 'Stawka za KM', valueMapping: 'kilometrowka.stawkaZaKm' },
          ],
          layout: {
            component: 'key-value-list',
            cols: { xs: 12, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 },
            hide: true,
          },
        },
        rodzajDelegacji: {
          label: 'Rodzaj podróży służbowej',
          layout: { component: 'checkbox', props: { multiple: true }, fillRow: true },
          source: {
            items: [
              { value: 'krajowa', title: 'Podróż  krajowa' },
              {
                value: 'zagraniczna',
                title: 'Podróż  zagraniczna',
              },
            ],
            returnObject: true,
          },
          validations: [],
        },
        divider1: {
          layout: {
            component: 'divider',
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
          },
          opacity: '100',
          thickness: 2,
        },

        grupaZagr: {
          layout: {
            component: 'fields-group',
            cols: { xs: 12, sm: 10, md: 10, lg: 8, xl: 8, xxl: 8 },
            schema: {
              type: 'object',
              properties: {
                layoutCelDelegacjiZagr: {
                  layout: {
                    component: 'duplicated-section',
                    cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                    schema: {
                      type: 'object',
                      properties: {

                        grpHotelZagr: {
                          layout: {
                            component: 'fields-group',
                            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                            schema: {
                              type: 'object',
                              properties: {
                                liczbaNoclegowZagr: {
                                  label: 'Liczba noclegów',
                                  layout: {
                                    cols: { xs: 4, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                                    component: 'number-field',
                                    if: '',
                                    props: { readonly: true },
                                  },
                                  type: 'int',
                                  expression:
                                    'JSONATA(((layoutCelDelegacjiZagr[].czasPodrozyGodzinyZagr ? layoutCelDelegacjiZagr[].czasPodrozyGodzinyZagr : 0) + (layoutCelDelegacjiZagr[].czasPodrozyMinutyZagr ? layoutCelDelegacjiZagr[].czasPodrozyMinutyZagr : 0)))',
                                },

                              },
                            },

                            props: {},
                            options: { showDivider: false, addBtnText: 'Add' },
                          },
                        },
                      },
                      required: [],
                    },
                    options: {
                      addBtnText: 'Dodaj kraj',
                      showDivider: true,
                      ordinalNumberInModel: false,
                      showFirstInitRow: true,
                      addBtnMode: 'add',
                    },
                    editable: true,
                    showElements: true,
                    props: {},
                    offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                  },
                  sectionKey: 'grupaZagr',
                  editable: true,
                  showElements: true,
                },
              },
            },
            props: {},
            options: { showDivider: false, addBtnText: 'Add' },
            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },

          },
        },
      },
    },
  },
  parameters: {},
};

export const level3th = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        'text-field-352': { label: 'Item-text-field-352', layout: { component: 'text-field' } },
        section1: {
          sectionKey: 'duplicated-section-447',
          layout: {
            component: 'duplicated-section',
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
            schema: {
              type: 'object',
              properties: {
                section2: {
                  sectionKey: 'section1',
                  layout: {
                    component: 'duplicated-section',
                    cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                    offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                    schema: {
                      type: 'object',
                      properties: {
                        section3: {
                          sectionKey: 'section2',
                          layout: {
                            component: 'duplicated-section',
                            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                            schema: {
                              type: 'object',
                              properties: {
                                show: {
                                  label: 'Item-switch-473',
                                  layout: {
                                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                                    component: 'switch',
                                  },
                                },
                                'text-field-080': {
                                  label: 'Item-text-field-080',
                                  layout: {
                                    cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                                    component: 'text-field',
                                    if: 'nata(section1[].section2[].section3[].show=true)',
                                  },
                                  defaultValue: null,
                                },
                              },
                            },
                            options: {
                              addBtnText: 'Add element',
                              showDivider: false,
                              ordinalNumberInModel: false,
                              showFirstInitRow: true,
                            },
                          },
                          editable: true,
                          showElements: true,
                        },
                      },
                    },
                    options: {
                      addBtnText: 'Add element',
                      showDivider: false,
                      ordinalNumberInModel: false,
                      showFirstInitRow: true,
                    },
                  },
                  editable: true,
                  showElements: true,
                },
              },
            },
            options: {
              addBtnText: 'Add element',
              showDivider: false,
              ordinalNumberInModel: false,
              showFirstInitRow: true,
            },
            props: {},
          },
          editable: true,
          showElements: true,
        },
        'text-field-788': { label: 'Item-text-field-788', layout: { component: 'text-field' } },
      },
    },
  },
};
