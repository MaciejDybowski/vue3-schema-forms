// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';





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
