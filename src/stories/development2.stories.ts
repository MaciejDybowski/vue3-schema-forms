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
