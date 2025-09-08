// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';





export default {
  title: 'Development Area 2',
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

export const task2 = {
  args: {
    formModel: {},
    schema: {
      properties: {
        switch: {
          label: 'switch',
          layout: {
            component: 'switch',
          },
        },
        item2: {
          label: 'item2',
          layout: {
            component: 'number-field',
            if: 'nata(switch)',
          },
        },
        item1: {
          label: 'item1',
          layout: {
            component: 'number-field',
            if: 'nata(switch)',
          },
          calculation: '2+2',
        },
        item3: {
          label: 'item3',
          layout: {
            component: 'number-field',
            if: 'nata(switch)',
          },
          expression: 'JSONATA(2+2)',
        },
        static:{
          content:"test",
          layout: {
            component: 'static-content',
            tag: "span",
            if: 'nata(switch)',
          }
        }
      },
    },
  },
};

export const task1 = {
  args: {
    formModel: {
      rodzajDelegacji: [
        {
          value: 'krajowa',
          title: 'Podróż  krajowa',
        },
        {
          value: 'zagraniczna',
          title: 'Podróż  zagraniczna',
        },
      ],
      layoutCelDelegacjiZagr: [
        {
          podrozDelegacjiZagr: [
            {
              dataWyjazduZagr: '2025-08-22T00:00:00.000+02:00',
              dataPrzyjazduZagr: '2025-08-22T01:00:00.000+02:00',
            },
            {
              dataWyjazduZagr: '2025-08-22T02:01:00.000+02:00',
              dataPrzyjazduZagr: '2025-08-24T22:00:00.000+02:00',
              liczbaKmZagr: 1500,
            },
            {
              dataWyjazduZagr: '2025-08-27T00:00:00.000+02:00',
              dataPrzyjazduZagr: '2025-08-29T00:00:00.000+02:00',
              liczbaKmZagr: 900,
            },
          ],
        },
      ],
    },
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
                        podrozDelegacjiZagr: {
                          layout: {
                            component: 'duplicated-section',
                            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                            schema: {
                              type: 'object',
                              properties: {
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
                                czasPrzejazduZagr: {
                                  label: 'Czas przejazdu',
                                  layout: {
                                    component: 'number-field',
                                    props: { suffix: 'ms', 'persistent-hint': true },
                                  },
                                  type: 'int',
                                  expression:
                                    'JSONATA(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].($dataWyjazdu := $toMillis(dataWyjazduZagr);$dataPrzyjazdu := $toMillis($exists(dataPrzyjazduZagr) ? dataPrzyjazduZagr : 0);$dataPrzyjazdu - $dataWyjazdu))',
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
                            cols: { xs: 6, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
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
                            cols: { xs: 6, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                            component: 'number-field',
                            props: { suffix: 'ms', 'persistent-hint': false },
                            hide: true,
                          },
                          type: 'int',
                          expression:
                            'JSONATA(($minPodrozy := layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej ? layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej : 0; $maxPodrozy := layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej ? layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej : 0; $sum(layoutCelDelegacjiZagr[].layoutEtapPrywatnyZagr.($privateStartMillis := dataEtapPrywatnyStartZagr ? $toMillis(dataEtapPrywatnyStartZagr) : 0; $privateEndMillis := dataEtapPrywatnyKoniecZagr ? $toMillis(dataEtapPrywatnyKoniecZagr) : 0; ($privateStartMillis > 0 and $privateEndMillis > 0 and $minPodrozy > 0 and $maxPodrozy > 0) ? ($effectiveStart := $max([$minPodrozy, $privateStartMillis]); $effectiveEnd := $min([$maxPodrozy, $privateEndMillis]); $duration := $effectiveEnd - $effectiveStart; $duration > 0 ? $duration : 0) : 0))))',
                        },
                        czasPrzejazduDelegacjiZagr: {
                          label: 'Czas przejazdu',
                          layout: {
                            cols: { xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                            component: 'number-field',
                            hide: true,
                          },
                          type: 'int',
                          expression:
                            'JSONATA($sum(layoutCelDelegacjiZagr[].podrozDelegacjiZagr.(czasPrzejazduZagr ? $number(czasPrzejazduZagr) : 0)))',
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
              },
            },
            props: {},
            options: { showDivider: false, addBtnText: 'Add' },
            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
            if: "nata('zagraniczna' in rodzajDelegacji.value)",
          },
        },
      },
      required: ['rodzajDelegacji', 'celPodrozy', 'miejsceDocelowePodrozy', 'cbZobowiazanie'],
    },
  },
};

export const dataczasnieTruggerie = {
  args: {
    formModel: {},
    schema: {"type":"object","properties":{"htmlWniosek":{"content":"Wniosek o podróż służbową nr {numerDelegacji: Brak danych}","layout":{"component":"static-content","tag":"h2","cols":{"xs":12,"sm":12,"md":12,"lg":8,"xl":8,"xxl":8}}},"htmlPracownik":{"content":"Wniosek złożony w imieniu pracownika<b> {pracownik.firstName: Brak danych} {pracownik.lastName: Brak danych} </b>","layout":{"component":"static-content","tag":"p","if":"nata(wniosekWImieniu=true)","cols":{"xs":12,"sm":12,"md":12,"lg":8,"xl":8,"xxl":8}}},"htmlDanePodstawowe":{"content":"Wniosek złożony dnia:<b> {dataZlozenia: Brak danych} </b>przez:<b> {zglaszajacy.firstName: Brak danych} {zglaszajacy.lastName:Brak danych}</b>","layout":{"component":"static-content","tag":"p","cols":{"xs":12,"sm":12,"md":12,"lg":8,"xl":8,"xxl":8}}},"alertDelegacja":{"memorable":true,"content":"Na tym etapie wybierz rodzaj podróży służbowej, oraz uzupełnij wymagane dane według poniższych wskazań: <br><br> Podróż służbowa - krajowa powinna zostać uzupełniona w trzech przypadkach: <br> \n1. W przypadku gdy podróż służbowa pracownika odbywa się wyłącznie na terytorium Polski. <br>2. W przypadku podróży służbowej zagranicznej do momentu startu samolotu, wypłynięcia statku lub przekroczenia granicy lądowej.<br>3. W przypadku powrotu z podróży służbowej zagranicznej od momentu wylądowania samolotu, wpłynięcia statku do portu lub przekroczenia granicy lądowej<br><br> Podróż służbowa - zagraniczna dotyczy okresu czasu od:<br>1. Wylotu samolotu z polskiego lotniska do przylotu samolotu na polskie lotnisko.\n<br>2. Wypłynięcia statku z polskiego portu do przypłynięcia statku do polskiego portu. <br>3. Opuszczenia terytorium polski drogą lądową do jej ponownego przekroczenia.","layout":{"component":"alert","cols":{"xs":12,"sm":12,"md":12,"lg":8,"xl":8,"xxl":8},"fillRow":true}},"stawkiKilometrowki":{"label":"Stawki kilometrówki","config":[{"title":"kod","valueMapping":"kilometrowka.kod"},{"title":"Nazwa","valueMapping":"kilometrowka.nazwa"},{"title":"Stawka za KM","valueMapping":"kilometrowka.stawkaZaKm"}],"layout":{"component":"key-value-list","cols":{"xs":12,"sm":8,"md":8,"lg":8,"xl":8,"xxl":8},"hide":true}},"rodzajDelegacji":{"label":"Rodzaj podróży służbowej","layout":{"component":"checkbox","props":{"multiple":true},"fillRow":true},"source":{"items":[{"value":"krajowa","title":"Podróż  krajowa"},{"value":"zagraniczna","title":"Podróż  zagraniczna"}],"returnObject":true},"validations":[]},"celPodrozy":{"label":"Cel podróży","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":4,"xl":4,"xxl":4},"component":"text-field"}},"miejsceDocelowePodrozy":{"label":"Miejsce docelowe podróży","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":4,"xl":4,"xxl":4},"component":"text-field"}},"divider1":{"layout":{"component":"divider","cols":{"xs":12,"sm":12,"md":12,"lg":8,"xl":8,"xxl":8}},"opacity":"100","thickness":2},"grupaKraj":{"layout":{"component":"fields-group","cols":{"xs":12,"sm":12,"md":12,"lg":8,"xl":8,"xxl":8},"schema":{"type":"object","properties":{"htmlDelegacjaKraj":{"content":"Informacje o podróży krajowej","layout":{"component":"static-content","tag":"h3"}},"layoutCelDelegacjiKraj":{"layout":{"component":"duplicated-section","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"schema":{"type":"object","properties":{"srodekTransportuKraj":{"label":"Środek transportu","layout":{"fillRow":true,"component":"dictionary"},"source":{"url":"/api/dictionaries?feature-id=slownik-srodkow-transportu&lm=nazwa&vm=kod&customAttributes=czyWymagaKilometrowki%2C%7BczyWymagaKilometrowki%7D","title":"label","value":"id","returnObject":true,"lazy":true,"singleOptionAutoSelect":true,"multiple":false,"maxSelection":0}},"alertKilometrowkaKraj":{"memorable":false,"content":"Rozliczenie przejazdu prywatnym środkiem transportu wymaga podania liczby kilometrów – zgodnie z § 3 ust. 2 Rozp. Min. Infrastruktury z 25.03.2002 r. (Dz.U. 2002 nr 27 poz. 271).","layout":{"component":"alert","props":{"type":"info","variant":"flat"},"if":"nata(layoutCelDelegacjiKraj[].srodekTransportuKraj.czyWymagaKilometrowki=true)"}},"htmlWyjazdKraj":{"content":"<b>Wyjazd","layout":{"component":"static-content","tag":"p","cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6}}},"htmlPrzyjazdKraj":{"content":"<b>Przyjazd","layout":{"component":"static-content","tag":"p","cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"fillRow":true}},"miejscowoscWyjazduKraj":{"label":"Miejscowość wyjazdu","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"component":"text-field"},"expression":""},"miejscowoscPrzyjazduKraj":{"label":"Miejscowość przyjazdu","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"component":"text-field","fillRow":true}},"dataWyjazduKraj":{"label":"Data i godzina wyjazdu","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"component":"date-time-picker"},"validations":[{"name":"NieWczesniejsze","rule":"($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutCelDelegacjiKraj[].dataWyjazduKraj, layoutCelDelegacjiKraj[].dataPrzyjazduKraj))","message":"Podróż nie może kończyć się wcześniej niż zaczynać!"}]},"dataPrzyjazduKraj":{"label":"Data i godzina przyjazdu","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"component":"date-time-picker"},"validations":[{"name":"NieWczesniejsze","rule":"($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutCelDelegacjiKraj[].dataWyjazduKraj, layoutCelDelegacjiKraj[].dataPrzyjazduKraj))","message":"Podróż nie może kończyć się wcześniej niż zaczynać!"}]},"liczbaKmKraj":{"label":"Liczba km","layout":{"component":"number-field","if":"nata(layoutCelDelegacjiKraj[].srodekTransportuKraj.czyWymagaKilometrowki=true)","props":{"suffix":"KM","persistent-hint":false}},"type":"int","validations":[{"name":"NieUjemne","rule":"layoutCelDelegacjiKraj[].liczbaKmKraj > 0","message":"Wartość musi być większa od 0!"}]},"czasPrzejazduKraj":{"label":"Czas przejazdu","layout":{"component":"number-field","props":{"suffix":"ms","persistent-hint":true},"hide":true},"type":"int","expression":"JSONATA(layoutCelDelegacjiKraj[].($toMillis(dataPrzyjazduKraj) - $toMillis(dataWyjazduKraj)))"}},"required":["srodekTransportuKraj","miejscowoscWyjazduKraj","miejscowoscPrzyjazduKraj","dataWyjazduKraj","dataPrzyjazduKraj","liczbaKmKraj"]},"options":{"addBtnText":"Dodaj","showDivider":true,"ordinalNumberInModel":false,"showFirstInitRow":true,"addBtnMode":"add"},"props":{},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0}},"editable":true,"showElements":true,"sectionKey":"grupaKraj"},"minimalnaDataPodrozyKrajowej":{"label":"Minimalna data podróży krajowej","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"component":"number-field","props":{"suffix":"ms","hint":"","persistent-hint":false},"hide":true},"type":"int","expression":"JSONATA($min(layoutCelDelegacjiKraj.dataWyjazduKraj ? layoutCelDelegacjiKraj.dataWyjazduKraj.$toMillis() : 0))"},"maksymalnaDataPodrozyKrajowej":{"label":"Maksymalna data podróży krajowej","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"fillRow":true,"component":"number-field","props":{"suffix":"ms","hint":"","persistent-hint":false},"hide":true},"type":"int","expression":"JSONATA($max(layoutCelDelegacjiKraj.dataPrzyjazduKraj ? layoutCelDelegacjiKraj.dataPrzyjazduKraj.$toMillis() : 0))","defaultValue":null},"switchEtapPrywatnyKraj":{"label":"Etap prywatny","layout":{"component":"switch","if":""}},"alertEtapPrywatnyKraj":{"memorable":false,"content":"W przypadku wskazania etapu prywatnego czas ten zostanie automatycznie odliczony przy przeliczeniach.","layout":{"component":"alert","if":"nata(switchEtapPrywatnyKraj=true)"}},"layoutEtapPrywatnyKraj":{"layout":{"component":"duplicated-section","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"schema":{"type":"object","properties":{"dataEtapPrywatnyStartKraj":{"label":"Początek etapu prywatnego","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":6,"xl":6,"xxl":6},"component":"date-time-picker","if":""},"validations":[{"name":"NieUjemne","rule":"($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutEtapPrywatnyKraj[].dataEtapPrywatnyStartKraj, layoutEtapPrywatnyKraj[].dataEtapPrywatnyKoniecKraj))","message":"Podróż nie może kończyć się wcześniej niż zaczynać!"}]},"dataEtapPrywatnyKoniecKraj":{"label":"Koniec etapu prywatnego","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":6,"xl":6,"xxl":6},"fillRow":true,"component":"date-time-picker","if":""},"validations":[{"name":"NieUjemne","rule":"($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutEtapPrywatnyKraj[].dataEtapPrywatnyStartKraj, layoutEtapPrywatnyKraj[].dataEtapPrywatnyKoniecKraj))","message":"Podróż nie może kończyć się wcześniej niż zaczynać!"}]},"alertPokrycia":{"memorable":false,"content":"Wyznaczony okres etapu prywatnego nie zawiera się w pełni w ramach zadeklarowanego okresu podróży służbowej. Proszę zweryfikować daty rozpoczęcia i zakończenia etapu prywatnego.","layout":{"component":"alert","props":{"type":"warning"},"if":"nata(($startPrywatny := $toMillis(layoutEtapPrywatnyKraj[].dataEtapPrywatnyStartKraj); $endPrywatny := $toMillis(layoutEtapPrywatnyKraj[].dataEtapPrywatnyKoniecKraj); ($exists($startPrywatny) and $exists($endPrywatny) and $exists(minimalnaDataPodrozyKrajowej) and $exists(maksymalnaDataPodrozyKrajowej)) and ($startPrywatny < minimalnaDataPodrozyKrajowej or $endPrywatny > maksymalnaDataPodrozyKrajowej)))"}}},"required":["dataEtapPrywatnyStartKraj","dataEtapPrywatnyKoniecKraj"]},"options":{"addBtnText":"Dodaj","showDivider":true,"ordinalNumberInModel":false,"showFirstInitRow":true,"addBtnMode":"add"},"props":{},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0},"if":"nata(switchEtapPrywatnyKraj=true)"},"editable":true,"showElements":true,"sectionKey":"grupaKraj"},"divider-965":{"layout":{"component":"divider"},"thickness":2,"opacity":"100"},"htmlCzasPodrozyKraj":{"content":"Planowany czas podróży","layout":{"component":"static-content","tag":"h3"}},"calkowityCzasDelegacjiKrajowej":{"label":"calkowityCzasDelegacjiKrajowej","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"number-field","hide":true},"type":"int","expression":"JSONATA(((maksymalnaDataPodrozyKrajowej ? maksymalnaDataPodrozyKrajowej : 0) - (minimalnaDataPodrozyKrajowej ? minimalnaDataPodrozyKrajowej : 0)))","defaultValue":0},"calkowityCzasPrywatnyDelegacjiKrajowej":{"label":"calkowityCzasPrywatnyDelegacjiKrajowej","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"number-field","hide":true},"type":"int","expression":"JSONATA(($minPodrozy := minimalnaDataPodrozyKrajowej ? minimalnaDataPodrozyKrajowej : 0; $maxPodrozy := maksymalnaDataPodrozyKrajowej ? maksymalnaDataPodrozyKrajowej : 0; $sum(layoutEtapPrywatnyKraj.($privateStartMillis := dataEtapPrywatnyStartKraj ? $toMillis(dataEtapPrywatnyStartKraj) : 0; $privateEndMillis := dataEtapPrywatnyKoniecKraj ? $toMillis(dataEtapPrywatnyKoniecKraj) : 0; ($privateStartMillis > 0 and $privateEndMillis > 0 and $minPodrozy > 0 and $maxPodrozy > 0) ? ($effectiveStart := $max([$minPodrozy, $privateStartMillis]); $effectiveEnd := $min([$maxPodrozy, $privateEndMillis]); $duration := $effectiveEnd - $effectiveStart; $duration > 0 ? $duration : 0) : 0))))","defaultValue":0},"calkowityCzasPrzejazduDelegacjiKrajowej":{"label":"Całkowity czas przejazdu","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"number-field","props":{"suffix":"ms","persistent-hint":false},"hide":true},"type":"int","expression":"JSONATA($sum(layoutCelDelegacjiKraj[].czasPrzejazduKraj))"},"czasPodrozyDniKraj":{"label":"Dni","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"number-field","props":{"hint":"","persistent-hint":false,"readonly":true}},"type":"int","expression":"JSONATA($floor(((calkowityCzasDelegacjiKrajowej ? calkowityCzasDelegacjiKrajowej : 0) -(calkowityCzasPrywatnyDelegacjiKrajowej ? calkowityCzasPrywatnyDelegacjiKrajowej : 0))/ (1000 * 60 * 60 * 24)))","defaultValue":0,"validations":[{"name":"NieUjemne","rule":"$ >= 0","message":"Liczba dni podróży nie może być ujemna!"}]},"czasPodrozyGodzinyKraj":{"label":"Godziny","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"number-field","props":{"hint":"","persistent-hint":false,"readonly":true}},"type":"int","expression":"JSONATA($floor(((calkowityCzasDelegacjiKrajowej ? calkowityCzasDelegacjiKrajowej : 0) - (calkowityCzasPrywatnyDelegacjiKrajowej ? calkowityCzasPrywatnyDelegacjiKrajowej : 0)) % 86400000 / 3600000))","defaultValue":0},"czasPodrozyMinutyKraj":{"label":"Minuty","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"number-field","props":{"hint":"","persistent-hint":false,"readonly":true}},"type":"int","expression":"JSONATA($floor(((calkowityCzasDelegacjiKrajowej ? calkowityCzasDelegacjiKrajowej : 0) -(calkowityCzasPrywatnyDelegacjiKrajowej ? calkowityCzasPrywatnyDelegacjiKrajowej : 0))%(1000 * 60 * 60 * 24)) % (1000 * 60 * 60) / (1000 * 60))","defaultValue":0},"divider2":{"layout":{"component":"divider"},"opacity":"100","thickness":2},"htmlOswiadczenieKraj":{"content":"Oświadczenie w sprawie pokrycia kosztów podróży","layout":{"component":"static-content","tag":"h3"}},"pokrycieKosztowKraj":{"label":"Organizator pokrywa część kosztów związanych z wyjazdem","layout":{"component":"switch"}},"htmlZaproszenieKraj":{"content":"Podróż służbowa odbędzie się na zaproszenie:","layout":{"component":"static-content","tag":"p","cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"if":"nata(pokrycieKosztowKraj=true)"}},"zaproszenieKraj":{"label":"","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"text-field","props":{"persistent-hint":true,"hint":""},"if":"nata(pokrycieKosztowKraj=true)"}},"htmlOswiadczenieKosztyKraj":{"content":"<b>Oświadczam, że w/w organizator pokrywa następujące koszty związane z wyjazdem:","layout":{"component":"static-content","tag":"p","if":"nata(pokrycieKosztowKraj=true)"}},"cbOswiadczeniaKosztowKraj":{"label":"","layout":{"component":"checkbox","props":{"multiple":true},"if":"nata(pokrycieKosztowKraj=true)"},"source":{"items":[{"value":1,"title":"koszty zakwaterowania w miejscu podróży,"},{"value":2,"title":"koszty przejazdu do miejsca docelowego, w tym koszty powrotu,"},{"value":3,"title":"koszty przejazdów w miejscu docelowym,"},{"value":"changeMe","title":"koszty wyżywienia w czasie podróży."}]}},"divider3":{"layout":{"component":"divider"},"thickness":2,"opacity":"100"},"htmlZaliczkaKraj":{"content":"Zaliczka","layout":{"component":"static-content","tag":"h3","cols":{"xs":12,"sm":12,"md":12,"lg":3,"xl":3,"xxl":3}}},"czyZaliczkaKraj":{"label":"Wnioskuję o zaliczkę","layout":{"component":"switch","props":{"true-value":true,"false-value":false},"cols":{"xs":12,"sm":12,"md":12,"lg":9,"xl":9,"xxl":9},"fillRow":true}},"dietyKraj":{"label":"Diety","layout":{"component":"switch","cols":{"xs":6,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"if":"nata(czyZaliczkaKraj=true)","fillRow":true}},"dietyGroup":{"sectionKey":"grupaKraj","layout":{"component":"fields-group","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0},"schema":{"type":"object","properties":{"sniadaniaKraj":{"label":"Liczba śniadań","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","if":""},"type":"int","expression":"","calculation":"0","defaultValue":null},"obiadyKraj":{"label":"Liczba obiadów","layout":{"component":"number-field","cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"if":""},"type":"int","expression":"","calculation":"0","defaultValue":null},"kolacjeKraj":{"label":"Liczba kolacji","layout":{"component":"number-field","cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"if":""},"type":"int","expression":"","calculation":"0","defaultValue":null},"dietyKwotaKraj":{"label":"Kwota","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","if":"","fillRow":true,"props":{"hint":"","suffix":"PLN","persistent-hint":false}},"type":"float","precision":"2","precisionMin":"2","calculation":"($dni := czasPodrozyDniKraj; $godz := czasPodrozyGodzinyKraj; $min :=  czasPodrozyMinutyKraj; $pelnaDieta := 45; $czyJednodniowa := $dni = 0; $dieta := $czyJednodniowa ? ($godz < 8 ? 0 : ($godz < 12 ? 22.5 : ($godz > 12 or ($godz = 12 and $min > 0) ? 45 : 22.5) )) : ($dni * $pelnaDieta + ($godz >= 8 ? 45 : ($godz > 0 ? 22.5 : 0))); $odliczenia := ($exists(sniadaniaKraj) ? sniadaniaKraj : 0) * 11.25 + ($exists(obiadyKraj) ? obiadyKraj : 0) * 22.5 + ($exists(kolacjeKraj) ? kolacjeKraj : 0) * 11.25; $dieta - $odliczenia)","expression":"","roundOption":"round","validations":[{"name":"NieMniejszeOdZera","rule":"(dietyKwotaKraj >= 0)","message":"Kwota nie może być mniejsza od zera!"}]}}},"if":"nata(dietyKraj=true)","props":{},"options":{"showDivider":false,"addBtnText":"Add"}}},"hotelKraj":{"label":"Ryczałt za nocleg","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"component":"switch","if":"nata(czyZaliczkaKraj=true)","fillRow":true}},"fields-group-206":{"sectionKey":"grupaKraj","layout":{"component":"fields-group","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0},"schema":{"type":"object","properties":{"liczbaNoclegowKraj":{"label":"Liczba noclegów","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","if":""},"type":"int","expression":"","calculation":"($max([$floor((((calkowityCzasDelegacjiKrajowej ? $number(calkowityCzasDelegacjiKrajowej) : 0) - (calkowityCzasPrzejazduDelegacjiKrajowej ? $number(calkowityCzasPrzejazduDelegacjiKrajowej) : 0) - (calkowityCzasPrywatnyDelegacjiKrajowej ? $number(calkowityCzasPrywatnyDelegacjiKrajowej) : 0))/(1000*60*60))/24)  + (((((calkowityCzasDelegacjiKrajowej ? $number(calkowityCzasDelegacjiKrajowej) : 0) - (calkowityCzasPrzejazduDelegacjiKrajowej ? $number(calkowityCzasPrzejazduDelegacjiKrajowej) : 0) - (calkowityCzasPrywatnyDelegacjiKrajowej ? $number(calkowityCzasPrywatnyDelegacjiKrajowej) : 0))/(1000*60*60)) % 24) >= 6 ? 1 : 0), 0]))"},"hotelKwotaKraj":{"label":"Kwota","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","if":"","fillRow":true,"props":{"suffix":"PLN","hint":"","persistent-hint":false}},"type":"float","precision":"2","precisionMin":"2","expression":"","calculation":"$round(liczbaNoclegowKraj * 67.5, 2)"}}},"if":"nata(hotelKraj=true)","props":{},"options":{"showDivider":false,"addBtnText":"Add"}}},"ryczaltyNaDojazdKraj":{"label":"Ryczałt na dojazdy","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"component":"switch","if":"nata(czyZaliczkaKraj=true)","fillRow":true}},"ryczaltGroup":{"sectionKey":"grupaKraj","layout":{"component":"fields-group","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0},"schema":{"type":"object","properties":{"ryczaltyNaDojazdDniKraj":{"label":"Liczba Dni","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","props":{"hint":"","persistent-hint":false},"if":""},"type":"int","defaultValue":1,"expression":"","calculation":"($dni := czasPodrozyDniKraj; $godz := czasPodrozyGodzinyKraj + czasPodrozyMinutyKraj/60; $dni + ($godz > 0 ? 1 : 0))"},"ryczaltyNaDojazdKwotaKraj":{"label":"Kwota","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","props":{"suffix":"PLN","hint":"","persistent-hint":false},"if":"","fillRow":true},"type":"float","precision":"2","precisionMin":"2","expression":"","calculation":"($dni := czasPodrozyDniKraj; $godz := czasPodrozyGodzinyKraj + czasPodrozyMinutyKraj/60; $stawka := 45 * 0.2; ($dni + ($godz > 0 ? 1 : 0)) * $stawka)"}}},"if":"nata(ryczaltyNaDojazdKraj=true)","props":{},"options":{"showDivider":false,"addBtnText":"Add"}}},"divider-760":{"layout":{"component":"divider","if":"nata(czyZaliczkaKraj=true)"},"thickness":2,"opacity":"100"},"wysokoscZaliczkiKraj":{"label":"Wysokość zaliczki","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","if":"nata(czyZaliczkaKraj=true)","props":{"suffix":"PLN","hint":"","persistent-hint":false}},"type":"float","calculation":"","precision":"2","precisionMin":"2","expression":"JSONATA((dietyKraj and $exists(dietyKwotaKraj) and dietyKwotaKraj != null ? $number(dietyKwotaKraj) : 0) + (hotelKraj and $exists(hotelKwotaKraj) and hotelKwotaKraj != null ? $number(hotelKwotaKraj) : 0) + (kosztyPrzejazduKraj and $exists(kosztyPrzejazduKwotaKraj) and kosztyPrzejazduKwotaKraj != null ? $number(kosztyPrzejazduKwotaKraj) : 0) + (ryczaltyNaDojazdKraj and $exists(ryczaltyNaDojazdKwotaKraj) and ryczaltyNaDojazdKwotaKraj != null ? $number(ryczaltyNaDojazdKwotaKraj) : 0))"},"formaWyplatyKraj":{"label":"Forma wypłaty","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"select","if":"nata(czyZaliczkaKraj=true)"},"source":{"items":[{"value":1,"title":"Konto osobiste"},{"value":2,"title":"Gotówka"}],"returnObject":true},"defaultValue":{"value":1,"title":"Konto osobiste"}},"numerKontaBankowegoKraj":{"label":"Numer konta bankowego","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":6,"xl":6,"xxl":6},"component":"text-field","if":"nata(formaWyplatyKraj.value=1)","props":{"hint":"","persistent-hint":false}},"validations":[]}},"required":["formaWyplatyKraj","numerKontaBankowegoKraj"]},"props":{},"options":{"showDivider":false,"addBtnText":"Add"},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0},"if":"nata('krajowa' in rodzajDelegacji.value)"},"sectionKey":null},"grupaZagr":{"layout":{"component":"fields-group","cols":{"xs":12,"sm":10,"md":10,"lg":8,"xl":8,"xxl":8},"schema":{"type":"object","properties":{"divider-863":{"layout":{"component":"divider","if":"nata('krajowa' in rodzajDelegacji.value)"},"thickness":2,"opacity":"100"},"htmlDelegacjaZagr":{"content":"Informacje o podróży zagranicznej","layout":{"component":"static-content","tag":"h3"}},"layoutCelDelegacjiZagr":{"layout":{"component":"duplicated-section","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"schema":{"type":"object","properties":{"krajZagr":{"label":"Kraj","layout":{"cols":{"xs":12,"sm":8,"md":8,"lg":8,"xl":8,"xxl":8},"component":"dictionary","if":""},"source":{"url":"/api/dictionaries?feature-id=slownik-lokalizacji-delegacji&lm=nazwa&vm=kodKraju&customAttributes=kwotaDiety%2C%7BkwotaDiety%7D%2ClimitNoclegu%2C%7BlimitNoclegu%7D%2CkwotaRyczaltDojazd%2C%7Bkalkulacja.kwotaRyczaltDojazd%7D%2CkwotaRyczaltNocleg%2C%7Bkalkulacja.kwotaRyczaltNocleg%7D%2CkwotaOdliczenieSniadanie%2C%7Bkalkulacja.kwotaOdliczenieSniadanie%7D%2CkwotaOdliczenieObiad%2C%7Bkalkulacja.kwotaOdliczenieObiad%7D%2CkwotaOdliczenieKolacja%2C%7Bkalkulacja.kwotaOdliczenieKolacja%7D%2CkodWaluty%2C%7BkodWaluty%7D","title":"label","value":"id","returnObject":true,"lazy":true,"singleOptionAutoSelect":true},"onChange":{"mode":null},"null":{}},"walutaZagr":{"label":"Waluta","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"dictionary","if":""},"source":{"url":"/api/dictionaries?feature-id=slownik-walut&lm=nazwa&vm=kod&value-filter={layoutCelDelegacjiZagr[].krajZagr.kodWaluty}&customAttributes=symbol%2C%7Bsymbol%7D%2CmiejscaDziesietne%2C%7BmiejscaDz","title":"label","value":"id","returnObject":true,"lazy":true,"singleOptionAutoSelect":true},"defaultValue":null},"rozdzielaczPrzejazdu":{"layout":{"component":"divider"},"thickness":1,"opacity":"100"},"infoPodrozDelegacjiZagr":{"content":"<b>Przejazdy</b>","layout":{"tag":"span","component":"static-content"}},"podrozDelegacjiZagr":{"sectionKey":"layoutCelDelegacjiZagr","layout":{"component":"duplicated-section","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0},"schema":{"type":"object","properties":{"srodekTransportuZagr":{"label":"Środek transportu","layout":{"fillRow":true,"component":"dictionary"},"source":{"url":"/api/dictionaries?feature-id=slownik-srodkow-transportu&lm=nazwa&vm=kod&customAttributes=czyWymagaKilometrowki%2C%7BczyWymagaKilometrowki%7D","title":"label","value":"id","returnObject":true,"lazy":true,"singleOptionAutoSelect":true,"multiple":false,"maxSelection":0}},"alerKilometrowkaZagr":{"memorable":false,"content":"Rozliczenie przejazdu prywatnym środkiem transportu wymaga podania liczby kilometrów – zgodnie z § 3 ust. 2 Rozp. Min. Infrastruktury z 25.03.2002 r. (Dz.U. 2002 nr 27 poz. 271).","layout":{"component":"alert","props":{"type":"info"},"if":"nata(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].srodekTransportuZagr.czyWymagaKilometrowki=true)"}},"htmlWyjazdZagr":{"content":"<b>Wyjazd","layout":{"component":"static-content","tag":"p","cols":{"xs":12,"sm":12,"md":12,"lg":6,"xl":6,"xxl":6}}},"htmlPrzyjazdZagr":{"content":"<b>Przyjazd","layout":{"component":"static-content","tag":"p","cols":{"xs":12,"sm":12,"md":12,"lg":6,"xl":6,"xxl":6},"fillRow":true}},"miejscowoscWyjazduZagr":{"label":"Miejscowość wyjazdu","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":6,"xl":6,"xxl":6},"component":"text-field"}},"miejscowoscPrzyjazduZagr":{"label":"Miejscowość przyjazdu","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":6,"xl":6,"xxl":6},"fillRow":true,"component":"text-field"}},"dataWyjazduZagr":{"label":"Data i godzina wyjazdu","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":6,"xl":6,"xxl":6},"component":"date-time-picker"},"validations":[{"name":"NieWczesniejsze","rule":"($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].dataWyjazduZagr, layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].dataPrzyjazduZagr))","message":"Podróż nie może kończyć się wcześniej niż zaczynać!"}]},"dataPrzyjazduZagr":{"label":"Data i godzina przyjazdu","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":6,"xl":6,"xxl":6},"fillRow":true,"component":"date-time-picker"},"validations":[{"name":"NieWczesniejsze","rule":"($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].dataWyjazduZagr, layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].dataPrzyjazduZagr))","message":"Podróż nie może kończyć się wcześniej niż zaczynać!"}]},"liczbaKmZagr":{"label":"Liczba km","layout":{"component":"number-field","if":"nata(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].srodekTransportuZagr.czyWymagaKilometrowki=true)","hide":false,"props":{"suffix":"KM","persistent-hint":false}},"type":"int","validations":[{"name":"NieUjemne","rule":"layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].liczbaKmZagr > 0","message":"Wartość musi być większa od 0!"}]},"czasPrzejazduZagr":{"label":"Czas przejazdu","layout":{"component":"number-field","props":{"suffix":"ms","persistent-hint":true},"hide":true},"type":"int","expression":"JSONATA(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].($dataWyjazdu := $toMillis(dataWyjazduZagr);$dataPrzyjazdu := $toMillis($exists(dataPrzyjazduZagr) ? dataPrzyjazduZagr : 0);$dataPrzyjazdu - $dataWyjazdu))"}},"required":["srodekTransportuZagr","miejscowoscWyjazduZagr","miejscowoscPrzyjazduZagr","dataWyjazduZagr","dataPrzyjazduZagr","liczbaKmZagr"]},"options":{"addBtnText":"Dodaj przejazd","showDivider":true,"ordinalNumberInModel":false,"showFirstInitRow":true},"props":{}},"editable":true,"showElements":true},"minimalnaDataPodrozyZagranicznej":{"label":"Minimalna data podróży zagranicznej","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"component":"number-field","props":{"suffix":"ms","hint":"","persistent-hint":false},"hide":true},"type":"int","expression":"JSONATA($min(layoutCelDelegacjiZagr[].podrozDelegacjiZagr.dataWyjazduZagr ? layoutCelDelegacjiZagr[].podrozDelegacjiZagr.dataWyjazduZagr.$toMillis() : 0))"},"maksymalnaDataPodrozyZagranicznej":{"label":"Maksymalna data podróży zagranicznej","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"fillRow":true,"component":"number-field","props":{"suffix":"ms","hint":"","persistent-hint":false},"hide":true},"type":"int","expression":"JSONATA($max(layoutCelDelegacjiZagr[].podrozDelegacjiZagr.dataPrzyjazduZagr ? layoutCelDelegacjiZagr[].podrozDelegacjiZagr.dataPrzyjazduZagr .$toMillis() : 0))"},"rozdzielaczPrywatny":{"layout":{"component":"divider"},"thickness":1,"opacity":"100"},"infoPrywatnyEtapDelegacjiZagr":{"content":"<b>Etapy prywatne</b>","layout":{"tag":"span","component":"static-content","cols":{"xs":6,"sm":4,"md":4,"lg":3,"xl":3,"xxl":3}}},"switchEtapPrywatnyZagr":{"label":"Etap prywatny","layout":{"component":"switch","props":{"false-value":false,"true-value":true,"color":""},"cols":{"xs":6,"sm":8,"md":8,"lg":9,"xl":9,"xxl":9},"fillRow":true},"mode":false},"alertEtapPrywatnyZagr":{"memorable":false,"content":"W przypadku wskazania etapu prywatnego czas ten zostanie automatycznie odliczony przy przeliczeniach.","layout":{"component":"alert","if":"nata(layoutCelDelegacjiZagr[].switchEtapPrywatnyZagr=true)"}},"layoutEtapPrywatnyZagr":{"layout":{"component":"duplicated-section","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"schema":{"type":"object","properties":{"dataEtapPrywatnyStartZagr":{"label":"Początek etapu prywatnego","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":6,"xl":6,"xxl":6},"component":"date-time-picker","if":""},"validations":[{"name":"NieUjemne","rule":"($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutCelDelegacjiZagr[].layoutEtapPrywatnyZagr[].dataEtapPrywatnyStartZagr, layoutCelDelegacjiZagr[].layoutEtapPrywatnyZagr[].dataEtapPrywatnyKoniecZagr))","message":"Podróż nie może kończyć się wcześniej niż zaczynać!"}]},"dataEtapPrywatnyKoniecZagr":{"label":"Koniec etapu prywatnego","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"fillRow":true,"component":"date-time-picker","if":""},"validations":[{"name":"NieUjemne","rule":"($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutEtapPrywatnyZagr[].dataEtapPrywatnyStartZagr, layoutEtapPrywatnyZagr[].dataEtapPrywatnyKoniecZagr))","message":"Podróż nie może kończyć się wcześniej niż zaczynać!"}]},"alertPokryciaZagr":{"memorable":false,"content":"Wyznaczony okres etapu prywatnego nie zawiera się w pełni w ramach zadeklarowanego okresu podróży służbowej. Proszę zweryfikować daty rozpoczęcia i zakończenia etapu prywatnego.","layout":{"component":"alert","props":{"type":"warning"},"if":"nata(($startPrywatny := $toMillis(layoutCelDelegacjiZagr[].layoutEtapPrywatnyZagr[].dataEtapPrywatnyStartZagr); $endPrywatny := $toMillis(layoutCelDelegacjiZagr[].layoutEtapPrywatnyZagr[].dataEtapPrywatnyKoniecZagr); ($exists($startPrywatny) and $exists($endPrywatny) and $exists(layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej) and $exists(layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej)) and ($startPrywatny < layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej or $endPrywatny > layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej)))"}}},"required":["dataEtapPrywatnyStartZagr"]},"options":{"addBtnText":"Dodaj etap prywatny","showDivider":true,"ordinalNumberInModel":false,"showFirstInitRow":true,"addBtnMode":"add"},"props":{},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0},"if":"nata(layoutCelDelegacjiZagr[].switchEtapPrywatnyZagr=true)"},"editable":true,"showElements":true,"sectionKey":"layoutCelDelegacjiZagr"},"rozdzielaczCzasu":{"layout":{"component":"divider"},"thickness":1,"opacity":"100"},"infoCzasDelegacjiZagr":{"content":"<b>Planowany czas podróży zagranicznej</b>","layout":{"tag":"span","component":"static-content"}},"czasDelegacjiZagranicznej":{"label":"Czas delegacji zagranicznej","layout":{"cols":{"xs":6,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"number-field","props":{"suffix":"ms","readonly":true,"persistent-hint":false},"hide":true},"type":"int","expression":"JSONATA(((layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej ? layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej : 0) - (layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej ? layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej : 0)))"},"czasPrywatnyDelegacjiZagranicznej":{"label":"Czas prywatny delegacji zagranicznej","layout":{"cols":{"xs":6,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"number-field","props":{"suffix":"ms","persistent-hint":false},"hide":true},"type":"int","expression":"JSONATA(($minPodrozy := layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej ? layoutCelDelegacjiZagr[].minimalnaDataPodrozyZagranicznej : 0; $maxPodrozy := layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej ? layoutCelDelegacjiZagr[].maksymalnaDataPodrozyZagranicznej : 0; $sum(layoutCelDelegacjiZagr[].layoutEtapPrywatnyZagr.($privateStartMillis := dataEtapPrywatnyStartZagr ? $toMillis(dataEtapPrywatnyStartZagr) : 0; $privateEndMillis := dataEtapPrywatnyKoniecZagr ? $toMillis(dataEtapPrywatnyKoniecZagr) : 0; ($privateStartMillis > 0 and $privateEndMillis > 0 and $minPodrozy > 0 and $maxPodrozy > 0) ? ($effectiveStart := $max([$minPodrozy, $privateStartMillis]); $effectiveEnd := $min([$maxPodrozy, $privateEndMillis]); $duration := $effectiveEnd - $effectiveStart; $duration > 0 ? $duration : 0) : 0))))"},"czasPrzejazduDelegacjiZagr":{"label":"Czas przejazdu","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"number-field","hide":true},"type":"int","expression":"JSONATA($sum(layoutCelDelegacjiZagr[].podrozDelegacjiZagr.(czasPrzejazduZagr ? $number(czasPrzejazduZagr) : 0)))"},"czasPodrozyDniZagr":{"label":"Dni","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":4,"xl":4,"xxl":4},"component":"number-field","props":{"readonly":true}},"type":"int","expression":"JSONATA($floor(((layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej ? layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej : 0) -(layoutCelDelegacjiZagr[].czasPrywatnyDelegacjiZagranicznej ? layoutCelDelegacjiZagr[].czasPrywatnyDelegacjiZagranicznej : 0))/ (1000 * 60 * 60 * 24)))"},"czasPodrozyGodzinyZagr":{"label":"Godziny","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"number-field","props":{"readonly":true}},"type":"int","expression":"JSONATA($floor(((layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej ? layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej : 0) - (layoutCelDelegacjiZagr[].czasPrywatnyDelegacjiZagranicznej ? layoutCelDelegacjiZagr[].czasPrywatnyDelegacjiZagranicznej : 0)) % 86400000 / 3600000))"},"czasPodrozyMinutyZagr":{"label":"Minuty","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"number-field","props":{"readonly":true}},"type":"int","expression":"JSONATA($floor(((layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej ? layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej : 0) -(layoutCelDelegacjiZagr[].czasPrywatnyDelegacjiZagranicznej ? layoutCelDelegacjiZagr[].czasPrywatnyDelegacjiZagranicznej : 0))%(1000 * 60 * 60 * 24)) % (1000 * 60 * 60) / (1000 * 60))"},"rozdzielaczZaliczki":{"layout":{"component":"divider","if":"nata(layoutCelDelegacjiZagr[].czasDelegacjiZagranicznej > 0 and $exists(layoutCelDelegacjiZagr[].krajZagr))"},"thickness":1,"opacity":"100"},"infoZaliczkaDelegacjiZagr":{"content":"<b>Zaliczki</b>","layout":{"tag":"span","component":"static-content","if":""}},"dietyZagr":{"label":"Diety","layout":{"component":"switch","if":"","props":{"true-value":true,"false-value":false}}},"grpDietyZagr":{"sectionKey":"layoutCelDelegacjiZagr","layout":{"component":"fields-group","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0},"schema":{"type":"object","properties":{"sniadaniaZagr":{"label":"Liczba śniadań","layout":{"component":"number-field","cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"if":""},"type":"int","expression":"","calculation":"0","defaultValue":null},"obiadyZagr":{"label":"Liczba obiadów","layout":{"component":"number-field","cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"if":""},"type":"int","expression":"","calculation":"0","defaultValue":0},"kolacjeZagr":{"label":"Liczba kolacji","layout":{"component":"number-field","cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"if":""},"type":"int","expression":"","calculation":"0","defaultValue":0},"dietyKwotaZagr":{"label":"Kwota","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","if":"","props":{"suffix":"{layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }","hint":"Kwota diety: {layoutCelDelegacjiZagr[].krajZagr.kwotaDiety: -} {layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }","persistent-hint":true}},"type":"float","precision":"2","precisionMin":"2","calculation":"($dni := layoutCelDelegacjiZagr[].czasPodrozyDniZagr ? layoutCelDelegacjiZagr[].czasPodrozyDniZagr : 0;$godz := layoutCelDelegacjiZagr[].czasPodrozyGodzinyZagr ? layoutCelDelegacjiZagr[].czasPodrozyGodzinyZagr : 0;$pelnaDieta := layoutCelDelegacjiZagr[].krajZagr.kwotaDiety ? layoutCelDelegacjiZagr[].krajZagr.kwotaDiety : 0;$dietaJednaTrzecia := $pelnaDieta * 1 / 3;$dietaPolowa := $pelnaDieta * 0.5;$czyJednodniowa := $dni = 0;$dieta := $czyJednodniowa ? ($godz < 8 ? $dietaJednaTrzecia : ($godz < 12 ? $dietaPolowa : $pelnaDieta)) : ($dni * $pelnaDieta + ($godz >= 12 ? $pelnaDieta : ($godz >= 8 ? $dietaPolowa : $dietaJednaTrzecia)));$odliczenia := ($exists(layoutCelDelegacjiZagr[].sniadaniaZagr) ? layoutCelDelegacjiZagr[].sniadaniaZagr : 0) * layoutCelDelegacjiZagr[].krajZagr.kwotaOdliczenieSniadanie + ($exists(layoutCelDelegacjiZagr[].obiadyZagr) ? layoutCelDelegacjiZagr[].obiadyZagr : 0) * layoutCelDelegacjiZagr[].krajZagr.kwotaOdliczenieObiad + ($exists(layoutCelDelegacjiZagr[].kolacjeZagr) ? layoutCelDelegacjiZagr[].kolacjeZagr : 0) * layoutCelDelegacjiZagr[].krajZagr.kwotaOdliczenieKolacja;$dieta - $odliczenia)","validations":[]}}},"if":"nata(layoutCelDelegacjiZagr[].dietyZagr=true)","props":{},"options":{"showDivider":false,"addBtnText":"Add"}}},"hotelZagr":{"label":"Ryczałt za nocleg","layout":{"component":"switch","if":"","fillRow":true,"props":{"true-value":true,"false-value":false}}},"grpHotelZagr":{"sectionKey":"layoutCelDelegacjiZagr","layout":{"component":"fields-group","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0},"schema":{"type":"object","properties":{"liczbaNoclegowZagr":{"label":"Liczba noclegów","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","if":""},"type":"int","expression":"JSONATA($max([layoutCelDelegacjiZagr[].($floor((((czasDelegacjiZagranicznej ? $number(czasDelegacjiZagranicznej) : 0) - (czasPrzejazduDelegacjiZagr ? $number(czasPrzejazduDelegacjiZagr) : 0) - (czasPrywatnyDelegacjiZagranicznej ? $number(czasPrywatnyDelegacjiZagranicznej) : 0))/(1000*60*60))/24)  + (((((czasDelegacjiZagranicznej ? $number(czasDelegacjiZagranicznej) : 0) - (czasPrzejazduDelegacjiZagr ? $number(czasPrzejazduDelegacjiZagr) : 0) - (czasPrywatnyDelegacjiZagranicznej ? $number(czasPrywatnyDelegacjiZagranicznej) : 0))/(1000*60*60)) % 24) >= 6 ? 1 : 0)), 0]))"},"hotelKwotaZagr":{"label":"Kwota","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"fillRow":true,"component":"number-field","props":{"suffix":"{layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }","hint":"Kwota noclegu: {layoutCelDelegacjiZagr[].krajZagr.kwotaRyczaltNocleg: -} {layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }","persistent-hint":true},"if":""},"type":"float","expression":"","precision":"2","precisionMin":"2","roundOption":"round","calculation":"(layoutCelDelegacjiZagr[].(liczbaNoclegowZagr* (krajZagr.kwotaRyczaltNocleg ? krajZagr.kwotaRyczaltNocleg : 0)))"}}},"if":"nata(layoutCelDelegacjiZagr[].hotelZagr=true)","props":{},"options":{"showDivider":false,"addBtnText":"Add"}}},"przejazdyZagr":{"label":"Koszty dojazdu z i do lotniska, dworca lub portu","layout":{"component":"switch","if":""}},"grpPrzejazdZagr":{"sectionKey":"layoutCelDelegacjiZagr","layout":{"component":"fields-group","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0},"schema":{"type":"object","properties":{"liczbaOgolemKmZagr":{"label":"Pokonany dystans","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","props":{"readonly":true},"if":"nata($count($filter(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[], function($v){$v.srodekTransportuZagr.czyWymagaKilometrowki = true})) > 0)"},"type":"int","expression":"JSONATA($sum(layoutCelDelegacjiZagr[].podrozDelegacjiZagr[].(($exists(liczbaKmZagr) and liczbaKmZagr!=null) ? $number(liczbaKmZagr) : 0)))"},"kosztyPrzejazduKwotaZagr":{"label":"Kwota","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","props":{"suffix":"{layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }","persistent-hint":true}},"props":{"suffix":"{layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }"},"type":"float","precision":"2","precisionMin":"2","roundOption":"round","calculation":"layoutCelDelegacjiZagr[].krajZagr.kwotaDiety"}}},"if":"nata(layoutCelDelegacjiZagr[].przejazdyZagr=true)","props":{},"options":{"showDivider":false,"addBtnText":"Add"}}},"dojazdyZagr":{"label":"Ryczałt na przejazdy środkami komunikacji miejscowej","layout":{"component":"switch","if":"","props":{"true-value":true,"false-value":false}}},"grpDojazdZagr":{"sectionKey":"layoutCelDelegacjiZagr","layout":{"component":"fields-group","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0},"schema":{"type":"object","properties":{"liczbaDniDojazdowZagr":{"label":"Liczba dni","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","if":""},"type":"int","expression":"JSONATA(layoutCelDelegacjiZagr[].(czasPodrozyDniZagr + ((czasPodrozyGodzinyZagr+czasPodrozyMinutyZagr / 60) > 0 ? 1 : 0)))"},"kosztyDojazduKwotaZagr":{"label":"Kwota","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","if":"","props":{"suffix":"{layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }","hint":"Kwota dojazdu: {layoutCelDelegacjiZagr[].krajZagr.kwotaRyczaltDojazd: -}  {layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }","persistent-hint":true}},"type":"float","precision":"2","precisionMin":"2","calculation":"layoutCelDelegacjiZagr[].liczbaDniDojazdowZagr*layoutCelDelegacjiZagr[].krajZagr.kwotaRyczaltDojazd"}}},"props":{},"options":{"showDivider":false,"addBtnText":"Add"},"if":"nata(layoutCelDelegacjiZagr[].dojazdyZagr=true)"}},"divider-520":{"layout":{"component":"divider"},"thickness":2,"opacity":"100"},"wysokoscZaliczkiZagr":{"label":"Wysokość zaliczki","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"number-field","if":"","props":{"suffix":"{layoutCelDelegacjiZagr[].krajZagr.kodWaluty: }","hint":"","persistent-hint":false}},"type":"float","precision":"2","precisionMin":"2","calculation":"","expression":"JSONATA((layoutCelDelegacjiZagr[].dietyKwotaZagr ? layoutCelDelegacjiZagr[].dietyKwotaZagr : 0)+(layoutCelDelegacjiZagr[].hotelKwotaZagr ? layoutCelDelegacjiZagr[].hotelKwotaZagr : 0)+(layoutCelDelegacjiZagr[].kosztyDojazduKwotaZagr ? layoutCelDelegacjiZagr[].kosztyDojazduKwotaZagr : 0)+(layoutCelDelegacjiZagr[].kosztyPrzejazduKwotaZagr ? layoutCelDelegacjiZagr[].kosztyPrzejazduKwotaZagr : 0))"},"formaWyplatyZagr":{"label":"Forma wypłaty","layout":{"cols":{"xs":12,"sm":3,"md":3,"lg":3,"xl":3,"xxl":3},"component":"select","if":""},"source":{"items":[{"value":1,"title":"Konto osobiste"},{"value":2,"title":"Gotówka"}],"returnObject":true},"defaultValue":{"value":1,"title":"Konto osobiste"}},"numerKontaBankowegoZagr":{"label":"Numer konta bankowego","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"component":"text-field","if":"nata(layoutCelDelegacjiZagr[].formaWyplatyZagr.value=1)","props":{"hint":"","persistent-hint":false}},"validations":[]}},"required":["krajZagr","walutaZagr","formaWyplatyZagr","numerKontaBankowegoZagr"]},"options":{"addBtnText":"Dodaj kraj","showDivider":true,"ordinalNumberInModel":false,"showFirstInitRow":true,"addBtnMode":"add"},"editable":true,"showElements":true,"props":{},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0}},"sectionKey":"grupaZagr","editable":true,"showElements":true},"minimalnaDataWszystkichPodrozyZagranicznej":{"label":"Minimalna data wszystkich podróży zagranicznej","layout":{"cols":{"xs":6,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"component":"number-field","hide":true},"type":"int","expression":"JSONATA($min($map($filter(layoutCelDelegacjiZagr.podrozDelegacjiZagr[].dataWyjazduZagr, $exists), function($v) { $toMillis($v) })))"},"maksymalnaDataWszystkichPodrozyZagranicznej":{"label":"Maksymalna data wszystkich podróży zagranicznej","layout":{"cols":{"xs":6,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"fillRow":true,"component":"number-field","props":{"persistent-hint":true},"hide":true},"type":"int","expression":"JSONATA($max($map($filter(layoutCelDelegacjiZagr.podrozDelegacjiZagr[].dataPrzyjazduZagr, $exists), function($v) { $toMillis($v) })))"},"divider6":{"layout":{"component":"divider","if":"nata($count(layoutCelDelegacjiZagr) > 1)"},"opacity":"100","thickness":2,"label":"divider1197_cloned"},"htmlCzasPodrozyZagr":{"content":"Planowany całkowity czas podróży zagranicznej","layout":{"component":"static-content","tag":"h3","if":"nata($count(layoutCelDelegacjiZagr) > 1)"}},"calkowityCzasDelegacjiZagranicznej":{"label":"calkowityCzasDelegacjiZagranicznej","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"component":"number-field","hide":true,"props":{"suffix":"ms","hint":"","persistent-hint":false}},"type":"int","expression":"JSONATA(((maksymalnaDataWszystkichPodrozyZagranicznej ? maksymalnaDataWszystkichPodrozyZagranicznej : 0) - (minimalnaDataWszystkichPodrozyZagranicznej ? minimalnaDataWszystkichPodrozyZagranicznej : 0)))","defaultValue":0},"calkowityCzasPrywatnyDelegacjiZagranicznej":{"label":"calkowityCzasPrywatnyDelegacjiZagranicznej","layout":{"cols":{"xs":12,"sm":6,"md":6,"lg":6,"xl":6,"xxl":6},"component":"number-field","hide":true,"props":{"suffix":"ms","hint":"","persistent-hint":false}},"type":"int","expression":"JSONATA($sum($map(layoutCelDelegacjiZagr[], function($v){($exists($v.czasPrywatnyDelegacjiZagranicznej) and $v.czasPrywatnyDelegacjiZagranicznej!=null) ? $number($v.czasPrywatnyDelegacjiZagranicznej) : 0})))"},"calkowityCzasPodrozyDniZagr":{"label":"Dni","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":4,"xl":4,"xxl":4},"component":"number-field","props":{"readonly":"true","hint":"","persistent-hint":false},"if":"nata($count(layoutCelDelegacjiZagr) > 1)"},"type":"int","expression":"JSONATA($floor(((calkowityCzasDelegacjiZagranicznej ? calkowityCzasDelegacjiZagranicznej : 0) -(calkowityCzasPrywatnyDelegacjiZagranicznej ? calkowityCzasPrywatnyDelegacjiZagranicznej : 0))/ (1000 * 60 * 60 * 24)))"},"calkowityCzasPodrozyGodzinyZagr":{"label":"Godziny","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":4,"xl":4,"xxl":4},"component":"number-field","props":{"readonly":true,"hint":"","persistent-hint":false},"hide":false,"if":"nata($count(layoutCelDelegacjiZagr) > 1)"},"type":"int","expression":"JSONATA($floor(((calkowityCzasDelegacjiZagranicznej ? calkowityCzasDelegacjiZagranicznej : 0) - (calkowityCzasPrywatnyDelegacjiZagranicznej ? calkowityCzasPrywatnyDelegacjiZagranicznej : 0)) % 86400000 / 3600000))"},"calkowityCzasPodrozyMinutyZagr":{"label":"Minuty","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":4,"xl":4,"xxl":4},"fillRow":true,"component":"number-field","props":{"readonly":true,"hint":"","persistent-hint":false},"if":"nata($count(layoutCelDelegacjiZagr) > 1)"},"type":"int","expression":"JSONATA($floor(((calkowityCzasDelegacjiZagranicznej ? calkowityCzasDelegacjiZagranicznej : 0) -(calkowityCzasPrywatnyDelegacjiZagranicznej ? calkowityCzasPrywatnyDelegacjiZagranicznej : 0))%(1000 * 60 * 60 * 24)) % (1000 * 60 * 60) / (1000 * 60))"},"divider7":{"layout":{"component":"divider"},"opacity":"100","thickness":2,"label":"divider5577_cloned"},"htmlOswiadczenieZagr":{"content":"Oświadczenie w sprawie pokrycia kosztów podróży","layout":{"component":"static-content","tag":"h3"}},"pokrycieKosztowZagr":{"label":"Organizator pokrywa część kosztów związanych z wyjazdem","layout":{"component":"switch"}},"htmlZaproszenieZagr":{"content":"Podróż służbowa odbędzie się na zaproszenie:","layout":{"component":"static-content","tag":"p","cols":{"xs":12,"sm":12,"md":12,"lg":6,"xl":6,"xxl":6},"if":"nata(pokrycieKosztowZagr=true)"}},"zaproszenieZagr":{"label":"","layout":{"cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4},"component":"text-field","props":{"persistent-hint":true},"if":"nata(pokrycieKosztowZagr=true)"}},"htmlOswiadczenieKosztyZagr":{"content":"<b>Oświadczam, że w/w organizator pokrywa następujące koszty związane z wyjazdem:","layout":{"component":"static-content","tag":"p","if":"nata(pokrycieKosztowZagr=true)"}},"cbOswiadczeniaKosztowZagr":{"label":"","layout":{"component":"checkbox","props":{"multiple":true},"if":"nata(pokrycieKosztowZagr=true)"},"source":{"items":[{"value":1,"title":"koszty zakwaterowania w miejscu podróży,"},{"value":2,"title":"koszty przejazdu do miejsca docelowego, w tym koszty powrotu,"},{"value":3,"title":"koszty przejazdów w miejscu docelowym,"},{"value":"4","title":"koszty wyżywienia w czasie podróży."}]}}}},"props":{},"options":{"showDivider":false,"addBtnText":"Add"},"offset":{"xs":0,"sm":0,"md":0,"lg":0,"xl":0,"xxl":0},"if":"nata('zagraniczna' in rodzajDelegacji.value)"},"sectionKey":null},"divider5":{"layout":{"component":"divider","cols":{"xs":12,"sm":12,"md":12,"lg":8,"xl":8,"xxl":8},"if":"nata(techCzyZaliczka=1)"},"opacity":"100","thickness":2},"techCzyZaliczka":{"label":"Czy jest zaliczka?","layout":{"component":"number-field","hide":true,"cols":{"xs":12,"sm":8,"md":8,"lg":8,"xl":8,"xxl":8}},"type":"int","expression":"JSONATA(('zagraniczna' in rodzajDelegacji.value or czyZaliczkaKraj=true) ? 1 : 0)"},"czyDyrektor":{"label":"Czy wniosek dyrektora?","layout":{"component":"select","if":"1=0","cols":{"xs":12,"sm":8,"md":8,"lg":8,"xl":8,"xxl":8}},"source":{"items":[{"value":"tak","title":"Tak"},{"value":"nie","title":"Nie"}]}},"cbZobowiazanie":{"label":"Oświadczenia","layout":{"component":"checkbox","props":{"multiple":true},"cols":{"xs":12,"sm":12,"md":12,"lg":8,"xl":8,"xxl":8},"if":"nata(techCzyZaliczka=1)"},"source":{"items":[{"value":1,"title":"Zobowiązuję się do rozliczenia z otrzymanej zaliczki w ciągu 14 dni kalendarzowych od daty zakończenia podróży służbowej. Przyjmuję do wiadomości, że w przypadku niedotrzymania terminu rozliczenia zaliczki przekazana kwota zostanie w całości potrącona z najbliższego wynagrodzenia. Wyrażam zgodę na potrącenie przez pracodawcę z mojego wynagrodzenia należności z tytułu nierozliczonej kwoty zaliczki otrzymanej w związku z podróżą służbową."}],"returnObject":true}}},"required":["rodzajDelegacji","celPodrozy","miejsceDocelowePodrozy","cbZobowiazanie"]}
  }
}
