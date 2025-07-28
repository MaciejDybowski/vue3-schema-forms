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
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        items: {
          sectionKey: 'duplicated-section-593',
          layout: {
            component: 'duplicated-section',
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
            schema: {
              type: 'object',
              properties: {
                item: {
                  label: 'Item',
                  layout: { component: 'select' },
                  source: {
                    items: [
                      { value: 'PL', title: '45' },
                      {
                        value: 'DE',
                        title: '22',
                      },
                      { value: 'RU', title: '33' },
                    ],
                    returnObject: true,
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
        group: {
          layout: {
            component: 'fields-group',
            schema: {
              properties: {
                items: {
                  label: 'Pole do pokazania listy klucz wartosc',
                  config: [
                    { title: 'Pole', valueMapping: 'item.value' },
                    { title: 'Wartość', valueMapping: 'item.title' },
                  ],
                  layout: {
                    component: 'key-value-list',
                    cols: 6,
                  },
                },
              },
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
    formModel: {
      etapy: [
        {
          select: {
            value: 1,
            title: 'Option 1',
            item: { sniadanie: 15, obiad: 35, kolacja: 23 },
          },
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        etapy: {
          layout: {
            component: 'duplicated-section',
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
            schema: {
              type: 'object',
              properties: {
                select: {
                  label: 'Simple select',
                  layout: {
                    component: 'select',
                    cols: 6,
                  },
                  source: {
                    items: [
                      {
                        value: 1,
                        title: 'Option 1',
                        item: { sniadanie: 15, obiad: 35, kolacja: 23 },
                      },
                      {
                        value: 2,
                        title: 'Option 2',
                        item: { sniadanie: 0, obiad: 23, kolacja: 99 },
                      },
                      {
                        value: 3,
                        title: 'Option 3',
                        item: { sniadanie: 30, obiad: 135, kolacja: 40 },
                      },
                    ],
                    returnObject: true,
                  },
                },
                sthElse: {
                  label: 'SthElse',
                  layout: {
                    component: 'text-field',
                    cols: 6
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
        divider: {
          layout: {
            component: 'divider',
          },
          thickness: 20,
        },
        diety: {
          sourcePath: 'etapy',
          updateTriggers: ["select"],
          layout: {
            component: 'duplicated-section',
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
            schema: {
              type: 'object',
              properties: {
                select: {
                  properties: {
                    item: {
                      properties: {
                        sniadanie: {
                          label: 'sniadanie',
                          layout: {
                            component: 'number-field',
                            cols: 4,
                          },
                        },
                        obiad: {
                          label: 'obiad',
                          layout: {
                            component: 'number-field',
                            cols: 4,
                          },
                        },
                        kolacja: {
                          label: 'kolacja',
                          layout: {
                            component: 'number-field',
                            cols: 4,
                          },
                        },
                      },
                    },
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
          showElements: false,
        },
      },
    },
  },
};

export const Story4: Story = {
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
        htmlDanePodstawowe: {
          content:
            'Wniosek złożony dnia:<b> {dataZlozenia: Brak danych} </b>przez:<b> {zglaszajacy.firstName: Brak danych} {zglaszajacy.lastName:Brak danych}</b>',
          layout: {
            component: 'static-content',
            tag: 'p',
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
        cbPodrozPoPracy: {
          label: '',
          layout: {
            component: 'checkbox',
            props: { multiple: true },
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
          },
          source: {
            items: [
              {
                value: 1,
                title:
                  'Podróż służbowa rozpoczyna się w trakcie godzin pracy lub po zakończeniu pracy (w ramach godzin uwzględnionych w harmonogramie)',
              },
            ],
          },
        },
        grupaKraj: {
          layout: {
            component: 'fields-group',
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
            schema: {
              type: 'object',
              properties: {
                divider1: { layout: { component: 'divider' }, opacity: '100', thickness: 2 },
                htmlDelegacjaKraj: {
                  content: 'Informacje o podróży krajowej',
                  layout: { component: 'static-content', tag: 'h3' },
                },
                layoutCelDelegacjiKraj: {
                  layout: {
                    component: 'duplicated-section',
                    cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                    schema: {
                      type: 'object',
                      properties: {
                        srodekTransportuKraj: {
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
                        alertKilometrowkaKraj: {
                          memorable: false,
                          content:
                            'Rozliczenie przejazdu prywatnym środkiem transportu wymaga podania liczby kilometrów – zgodnie z § 3 ust. 2 Rozp. Min. Infrastruktury z 25.03.2002 r. (Dz.U. 2002 nr 27 poz. 271).',
                          layout: {
                            component: 'alert',
                            props: { type: 'info', variant: 'flat' },
                            if: 'nata(layoutCelDelegacjiKraj[].srodekTransportuKraj.czyWymagaKilometrowki=true)',
                          },
                        },
                        htmlWyjazdKraj: {
                          content: '<b>Wyjazd',
                          layout: {
                            component: 'static-content',
                            tag: 'p',
                            cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                          },
                        },
                        htmlPrzyjazdKraj: {
                          content: '<b>Przyjazd',
                          layout: {
                            component: 'static-content',
                            tag: 'p',
                            cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                            fillRow: true,
                          },
                        },
                        miejscowoscWyjazduKraj: {
                          label: 'Miejscowość wyjazdu',
                          layout: {
                            cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                            component: 'text-field',
                          },
                          expression: '',
                        },
                        miejscowoscPrzyjazduKraj: {
                          label: 'Miejscowość przyjazdu',
                          layout: {
                            cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                            component: 'text-field',
                            fillRow: true,
                          },
                        },
                        dataWyjazduKraj: {
                          label: 'Data i godzina wyjazdu',
                          layout: {
                            cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                            component: 'date-time-picker',
                          },
                          validations: [
                            {
                              name: 'NieWczesniejsze',
                              rule: '($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutCelDelegacjiKraj[].dataWyjazduKraj, layoutCelDelegacjiKraj[].dataPrzyjazduKraj))',
                              message: 'Podróż nie może kończyć się wcześniej niż zaczynać!',
                            },
                          ],
                        },
                        dataPrzyjazduKraj: {
                          label: 'Data i godzina przyjazdu',
                          layout: {
                            cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                            component: 'date-time-picker',
                          },
                          validations: [
                            {
                              name: 'NieWczesniejsze',
                              rule: '($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutCelDelegacjiKraj[].dataWyjazduKraj, layoutCelDelegacjiKraj[].dataPrzyjazduKraj))',
                              message: 'Podróż nie może kończyć się wcześniej niż zaczynać!',
                            },
                          ],
                        },
                        liczbaKmKraj: {
                          label: 'Liczba km',
                          layout: {
                            component: 'number-field',
                            if: 'nata(layoutCelDelegacjiKraj[].srodekTransportuKraj.czyWymagaKilometrowki=true)',
                          },
                          type: 'int',
                          validations: [
                            {
                              name: 'NieUjemne',
                              rule: 'layoutCelDelegacjiKraj[].liczbaKmKraj > 0',
                              message: 'Wartość musi być większa od 0!',
                            },
                          ],
                        },
                      },
                      required: [
                        'srodekTransportuKraj',
                        'miejscowoscWyjazduKraj',
                        'miejscowoscPrzyjazduKraj',
                        'dataWyjazduKraj',
                        'dataPrzyjazduKraj',
                        'liczbaKmKraj',
                      ],
                    },
                    options: {
                      addBtnText: 'Dodaj',
                      showDivider: true,
                      ordinalNumberInModel: false,
                      showFirstInitRow: true,
                      addBtnMode: 'add',
                    },
                    props: {},
                    offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                  },
                  editable: true,
                  showElements: true,
                  sectionKey: 'grupaKraj',
                },
                switchEtapPrywatnyKraj: {
                  label: 'Etap prywatny',
                  layout: { component: 'switch', if: '' },
                },
                alertEtapPrywatnyKraj: {
                  memorable: false,
                  content:
                    'W przypadku wskazania etapu prywatnego czas ten zostanie automatycznie odliczony przy przeliczeniach.',
                  layout: { component: 'alert', if: 'nata(switchEtapPrywatnyKraj=true)' },
                },
                layoutEtapPrywatnyKraj: {
                  layout: {
                    component: 'duplicated-section',
                    cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
                    schema: {
                      type: 'object',
                      properties: {
                        dataEtapPrywatnyStartKraj: {
                          label: 'Początek etapu prywatnego',
                          layout: {
                            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                            component: 'date-time-picker',
                            if: '',
                          },
                          validations: [
                            {
                              name: 'NieUjemne',
                              rule: '($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutEtapPrywatnyKraj[].dataEtapPrywatnyStartKraj, layoutEtapPrywatnyKraj[].dataEtapPrywatnyKoniecKraj))',
                              message: 'Podróż nie może kończyć się wcześniej niż zaczynać!',
                            },
                          ],
                        },
                        dataEtapPrywatnyKoniecKraj: {
                          label: 'Koniec etapu prywatnego',
                          layout: {
                            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                            fillRow: true,
                            component: 'date-time-picker',
                            if: '',
                          },
                          validations: [
                            {
                              name: 'NieUjemne',
                              rule: '($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutEtapPrywatnyKraj[].dataEtapPrywatnyStartKraj, layoutEtapPrywatnyKraj[].dataEtapPrywatnyKoniecKraj))',
                              message: 'Podróż nie może kończyć się wcześniej niż zaczynać!',
                            },
                          ],
                        },
                        alertPokrycia: {
                          memorable: false,
                          content:
                            'Wyznaczony okres etapu prywatnego nie zawiera się w pełni w ramach zadeklarowanego okresu podróży służbowej. Proszę zweryfikować daty rozpoczęcia i zakończenia etapu prywatnego.',
                          layout: {
                            component: 'alert',
                            props: { type: 'warning' },
                            if: 'nata(($etap := layoutEtapPrywatnyKraj[]; $count($filter(layoutCelDelegacjiKraj, function($delegacja) {( $etapStart := $toMillis($etap.dataEtapPrywatnyStartKraj); $etapEnd := $toMillis($etap.dataEtapPrywatnyKoniecKraj); $delegacjaStart := $toMillis($delegacja.dataWyjazduKraj); $delegacjaEnd := $toMillis($delegacja.dataPrzyjazduKraj); $etapStart >= $delegacjaStart and $etapEnd <= $delegacjaEnd)})) != 0))',
                          },
                        },
                      },
                      required: ['dataEtapPrywatnyStartKraj', 'dataEtapPrywatnyKoniecKraj'],
                    },
                    options: {
                      addBtnText: 'Dodaj',
                      showDivider: true,
                      ordinalNumberInModel: false,
                      showFirstInitRow: true,
                      addBtnMode: 'add',
                    },
                    props: {},
                    offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                    if: 'nata(switchEtapPrywatnyKraj=true)',
                  },
                  editable: true,
                  showElements: true,
                  sectionKey: 'grupaKraj',
                },
                'divider-965': { layout: { component: 'divider' }, thickness: 2, opacity: '100' },
                htmlCzasPodrozyKraj: {
                  content: 'Planowany czas podróży',
                  layout: { component: 'static-content', tag: 'h3' },
                },
                alertUjemnyCzasKrajowejPodrozy: {
                  memorable: false,
                  content:
                    'Data zakończenia podróży nie może być wcześniejsza niż data jej rozpoczęcia. Proszę zweryfikować wprowadzone wartości.',
                  layout: {
                    component: 'alert',
                    props: { type: 'error' },
                    if: 'nata(calkowityCzasDelegacjiKrajowej < 0 or calkowityCzasPrywatnyDelegacjiKrajowej < 0)',
                  },
                },
                calkowityCzasDelegacjiKrajowej: {
                  label: 'calkowityCzasDelegacjiKrajowej',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    component: 'number-field',
                    hide: true,
                  },
                  type: 'int',
                  expression:
                    'JSONATA($sum(layoutCelDelegacjiKraj.(dataWyjazduKraj and dataPrzyjazduKraj ? ($toMillis(dataPrzyjazduKraj) - $toMillis(dataWyjazduKraj)) : 0)))',
                  defaultValue: 0,
                },
                calkowityCzasPrywatnyDelegacjiKrajowej: {
                  label: 'calkowityCzasPrywatnyDelegacjiKrajowej',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    component: 'number-field',
                    hide: true,
                  },
                  type: 'int',
                  expression:
                    'JSONATA($sum($map(layoutEtapPrywatnyKraj, function($etap) {($from := $toMillis($etap.dataEtapPrywatnyStartKraj); $to := $toMillis($etap.dataEtapPrywatnyKoniecKraj); $sum($map(layoutCelDelegacjiKraj, function($delegacja) {($start := $toMillis($delegacja.dataWyjazduKraj); $end := $toMillis($delegacja.dataPrzyjazduKraj); ($min([$to, $end]) > $max([$from, $start])) ? ($min([$to, $end]) - $max([$from, $start])) : 0 )})))})))',
                  defaultValue: 0,
                },
                czasPodrozyDniKraj: {
                  label: 'Dni',
                  layout: {
                    cols: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                    component: 'number-field',
                    props: { hint: '', 'persistent-hint': false, readonly: true },
                  },
                  type: 'int',
                  expression:
                    'JSONATA($floor(((calkowityCzasDelegacjiKrajowej ? calkowityCzasDelegacjiKrajowej : 0) -(calkowityCzasPrywatnyDelegacjiKrajowej ? calkowityCzasPrywatnyDelegacjiKrajowej : 0))/ (1000 * 60 * 60 * 24)))',
                  defaultValue: 0,
                  validations: [
                    {
                      name: 'NieUjemne',
                      rule: '$ >= 0',
                      message: 'Liczba dni podróży nie może być ujemna!',
                    },
                  ],
                },
                czasPodrozyGodzinyKraj: {
                  label: 'Godziny',
                  layout: {
                    cols: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                    component: 'number-field',
                    props: { hint: '', 'persistent-hint': false, readonly: true },
                  },
                  type: 'int',
                  expression:
                    'JSONATA($floor(((calkowityCzasDelegacjiKrajowej ? calkowityCzasDelegacjiKrajowej : 0) -(calkowityCzasPrywatnyDelegacjiKrajowej ? calkowityCzasPrywatnyDelegacjiKrajowej : 0))% (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))',
                  defaultValue: 0,
                },
                czasPodrozyMinutyKraj: {
                  label: 'Minuty',
                  layout: {
                    cols: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                    component: 'number-field',
                    props: { hint: '', 'persistent-hint': false, readonly: true },
                  },
                  type: 'int',
                  expression:
                    'JSONATA($floor(((calkowityCzasDelegacjiKrajowej ? calkowityCzasDelegacjiKrajowej : 0) -(calkowityCzasPrywatnyDelegacjiKrajowej ? calkowityCzasPrywatnyDelegacjiKrajowej : 0))%(1000 * 60 * 60 * 24)) % (1000 * 60 * 60) / (1000 * 60))',
                  defaultValue: 0,
                },
                divider2: { layout: { component: 'divider' }, opacity: '100', thickness: 2 },
                htmlOswiadczenieKraj: {
                  content: 'Oświadczenie w sprawie pokrycia kosztów podróży',
                  layout: { component: 'static-content', tag: 'h3' },
                },
                pokrycieKosztowKraj: {
                  label: 'Organizator pokrywa część kosztów związanych z wyjazdem',
                  layout: { component: 'switch' },
                },
                htmlZaproszenieKraj: {
                  content: 'Podróż służbowa odbędzie się na zaproszenie:',
                  layout: {
                    component: 'static-content',
                    tag: 'p',
                    cols: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    if: 'nata(pokrycieKosztowKraj=true)',
                  },
                },
                zaproszenieKraj: {
                  label: '',
                  layout: {
                    cols: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                    component: 'text-field',
                    props: { 'persistent-hint': true, hint: '' },
                    if: 'nata(pokrycieKosztowKraj=true)',
                  },
                },
                htmlOswiadczenieKosztyKraj: {
                  content:
                    '<b>Oświadczam, że w/w organizator pokrywa następujące koszty związane z wyjazdem:',
                  layout: {
                    component: 'static-content',
                    tag: 'p',
                    if: 'nata(pokrycieKosztowKraj=true)',
                  },
                },
                cbOswiadczeniaKosztowKraj: {
                  label: '',
                  layout: {
                    component: 'checkbox',
                    props: { multiple: true },
                    if: 'nata(pokrycieKosztowKraj=true)',
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
                        value: 'changeMe',
                        title: 'koszty wyżywienia w czasie podróży.',
                      },
                    ],
                  },
                },
                divider3: { layout: { component: 'divider' }, thickness: 2, opacity: '100' },
                htmlZaliczkaKraj: {
                  content: 'Zaliczka',
                  layout: {
                    component: 'static-content',
                    tag: 'h3',
                    cols: { xs: 12, sm: 12, md: 12, lg: 3, xl: 3, xxl: 3 },
                  },
                },
                czyZaliczkaKraj: {
                  label: 'Wnioskuję o zaliczkę',
                  layout: {
                    component: 'switch',
                    props: { 'true-value': true, 'false-value': false },
                    cols: { xs: 12, sm: 12, md: 12, lg: 9, xl: 9, xxl: 9 },
                    fillRow: true,
                  },
                },
                dietyKraj: {
                  label: 'Diety',
                  layout: {
                    component: 'switch',
                    cols: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    if: 'nata(czyZaliczkaKraj=true)',
                    fillRow: true,
                  },
                },
                sniadaniaKraj: {
                  label: 'Liczba śniadań',
                  layout: {
                    cols: { xs: 12, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'number-field',
                    if: 'nata(dietyKraj=true)',
                  },
                  type: 'int',
                  expression: '',
                  calculation:
                    '$floor(($dni := czasPodrozyDniKraj; $godz := czasPodrozyGodzinyKraj; $czyJednodniowa := $dni = 0; $czyJednodniowa ? ($godz < 8 ? 0 : 1) : $dni + ($godz > 8 ? 1 : ($godz > 0 ? 0.5 : 0))))',
                },
                obiadyKraj: {
                  label: 'Liczba obiadów',
                  layout: {
                    component: 'number-field',
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    if: 'nata(dietyKraj=true)',
                  },
                  type: 'int',
                  expression: '',
                  calculation:
                    '$floor(($dni := czasPodrozyDniKraj; $godz := czasPodrozyGodzinyKraj; $czyJednodniowa := $dni = 0; $czyJednodniowa ? ($godz < 8 ? 0 : 1) : $dni + ($godz > 8 ? 1 : ($godz > 0 ? 0.5 : 0))))',
                },
                kolacjeKraj: {
                  label: 'Liczba kolacji',
                  layout: {
                    component: 'number-field',
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    if: 'nata(dietyKraj=true)',
                  },
                  type: 'int',
                  expression: '',
                  calculation:
                    '$floor(($dni := czasPodrozyDniKraj; $godz := czasPodrozyGodzinyKraj; $czyJednodniowa := $dni = 0; $czyJednodniowa ? ($godz < 8 ? 0 : 1) : $dni + ($godz > 8 ? 1 : ($godz > 0 ? 0.5 : 0))))',
                },
                dietyKwotaKraj: {
                  label: 'Kwota',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'number-field',
                    if: 'nata(dietyKraj=true)',
                    fillRow: true,
                    props: { hint: 'PLN', 'persistent-hint': true },
                  },
                  type: 'float',
                  precision: '2',
                  precisionMin: '2',
                  calculation:
                    '$floor(($dni := czasPodrozyDniKraj; $godz := czasPodrozyGodzinyKraj; $pelnaDieta := 45; $czyJednodniowa := $dni = 0; $dieta := $czyJednodniowa ? ($godz < 8 ? 0 : ($godz < 12 ? 22.5 : 45)) : ($dni * $pelnaDieta + ($godz >= 12 ? 45 : ($godz >= 8 ? 22.5 : 0))); $odliczenia := ($exists(sniadaniaKraj) ? sniadaniaKraj : 0) * 11.25 + ($exists(obiadyKraj) ? obiadyKraj : 0) * 22.5 + ($exists(kolacjeKraj) ? kolacjeKraj : 0) * 11.25; $dieta - $odliczenia))',
                  expression: '',
                  roundOption: 'round',
                },
                hotelKraj: {
                  label: 'Hotel',
                  layout: {
                    cols: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    component: 'switch',
                    if: 'nata(czyZaliczkaKraj=true)',
                    fillRow: true,
                  },
                },
                liczbaNoclegowKraj: {
                  label: 'Liczba noclegów',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'number-field',
                    if: 'nata(hotelKraj=true)',
                  },
                  type: 'int',
                  expression: '',
                  calculation:
                    '($dni := czasPodrozyDniKraj; $godz := czasPodrozyGodzinyKraj + czasPodrozyMinutyKraj / 60; $dni + ($godz >= 6 ? 1 : 0))',
                },
                hotelKwotaKraj: {
                  label: 'Kwota',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'number-field',
                    if: 'nata(hotelKraj=true)',
                    fillRow: true,
                    props: { hint: 'PLN', 'persistent-hint': true },
                  },
                  type: 'float',
                  precision: '2',
                  precisionMin: '2',
                  expression: '',
                  calculation: '$round(liczbaNoclegowKraj * 67.5, 2)',
                },
                kosztyPrzejazduKraj: {
                  label: 'Koszty przejazdu',
                  layout: {
                    cols: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    component: 'switch',
                    if: 'nata(czyZaliczkaKraj=true)',
                    fillRow: true,
                  },
                },
                kosztyPrzejazduKwotaKraj: {
                  label: 'Kwota',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    fillRow: true,
                    component: 'number-field',
                    props: { hint: 'PLN', 'persistent-hint': true },
                    if: 'nata(kosztyPrzejazduKraj=true)',
                  },
                  type: 'float',
                  precision: '2',
                  precisionMin: '2',
                  expression: '',
                  calculation:
                    '$reduce(layoutCelDelegacjiKraj,function($s,$r){($id := $string($r.srodekTransportuKraj.id); $km := $number($r.liczbaKmKraj ? $r.liczbaKmKraj : "0"); $val := $id = "PRYW_AUTO_DO_900" ? $km * 0.5214 : $id = "PRYW_AUTO_PONAD_900" ? $km * 0.8358 : $id = "PRYW_MOTOCYKL" ? $km * 0.2302 : $id = "PRYW_MOTOROWER" ? $km * 0.1382 : $id = "POCIAG" ? 100 : $id = "SAMOLOT" ? 300 : $id = "AUTOBUS" ? 50 : $id = "KOMUNIKACJA_MIEJSKA" ? 20 : $id = "TAXI" ? 70 : 0; $s + $round($val, 2) )}, 0)',
                },
                ryczaltyNaDojazdKraj: {
                  label: 'Ryczałty na dojazdy',
                  layout: {
                    cols: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    component: 'switch',
                    if: 'nata(czyZaliczkaKraj=true)',
                    fillRow: true,
                  },
                },
                ryczaltyNaDojazdDniKraj: {
                  label: 'Liczba Dni',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'number-field',
                    props: { hint: '', 'persistent-hint': false },
                    if: 'nata(ryczaltyNaDojazdKraj=true)',
                  },
                  type: 'int',
                  defaultValue: 1,
                  expression: '',
                  calculation:
                    '($dni := czasPodrozyDniKraj; $godz := czasPodrozyGodzinyKraj + czasPodrozyMinutyKraj/60; $dni + ($godz > 0 ? 1 : 0))',
                },
                ryczaltyNaDojazdKwotaKraj: {
                  label: 'Kwota',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'number-field',
                    props: { hint: 'PLN', 'persistent-hint': true },
                    if: 'nata(ryczaltyNaDojazdKraj=true)',
                    fillRow: true,
                  },
                  type: 'float',
                  precision: '2',
                  precisionMin: '2',
                  expression: '',
                  calculation:
                    '$dni := czasPodrozyDniKraj; $godz := czasPodrozyGodzinyKraj + czasPodrozyMinutyKraj/60; $stawka := 45 * 0.2; ($dni + ($godz > 0 ? 1 : 0)) * $stawka',
                },
                wysokoscZaliczkiKraj: {
                  label: 'Wysokość zaliczki',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'number-field',
                    if: 'nata(czyZaliczkaKraj=true)',
                    props: { hint: 'PLN', 'persistent-hint': true },
                  },
                  type: 'float',
                  calculation: '',
                  precision: '2',
                  precisionMin: '2',
                  expression:
                    'JSONATA((dietyKraj and $exists(dietyKwotaKraj) and dietyKwotaKraj != null ? $number(dietyKwotaKraj) : 0) + (hotelKraj and $exists(hotelKwotaKraj) and hotelKwotaKraj != null ? $number(hotelKwotaKraj) : 0) + (kosztyPrzejazduKraj and $exists(kosztyPrzejazduKwotaKraj) and kosztyPrzejazduKwotaKraj != null ? $number(kosztyPrzejazduKwotaKraj) : 0) + (ryczaltyNaDojazdKraj and $exists(ryczaltyNaDojazdKwotaKraj) and ryczaltyNaDojazdKwotaKraj != null ? $number(ryczaltyNaDojazdKwotaKraj) : 0))',
                },
                formaWyplatyKraj: {
                  label: 'Forma wypłaty',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'select',
                    if: 'nata(czyZaliczkaKraj=true)',
                  },
                  source: {
                    items: [
                      { value: 1, title: 'Konto osobiste' },
                      { value: 2, title: 'Gotówka' },
                    ],
                    returnObject: true,
                  },
                  defaultValue: { value: 1, title: 'Konto osobiste' },
                },
                numerKontaBankowegoKraj: {
                  label: 'Numer konta bankowego',
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                    component: 'text-field',
                    if: 'nata(formaWyplatyKraj.value=1)',
                    props: {
                      hint: 'Przykład: PL12123412341234123412341234',
                      'persistent-hint': true,
                    },
                  },
                  validations: [
                    {
                      name: 'WalidatorIBAN',
                      rule: "(numerKontaBankowegoKraj and $length(numerKontaBankowegoKraj) = 28 and $substring(numerKontaBankowegoKraj, 0, 2) = 'PL' and $match($substring(numerKontaBankowegoKraj, 2), /^[0-9]{26}$/))",
                      message: 'Błędny numer konta bankowego!',
                    },
                  ],
                },
              },
            },
            props: {},
            options: { showDivider: false, addBtnText: 'Add' },
            offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
            if: "nata('krajowa' in rodzajDelegacji.value)",
          },
        },
        grupaZagr: {
          layout: {
            component: 'fields-group',
            cols: { xs: 12, sm: 10, md: 10, lg: 8, xl: 8, xxl: 8 },
            schema: {
              type: 'object',
              properties: {
                divider9: {
                  layout: { component: 'divider' },
                  opacity: '100',
                  thickness: 2,
                  label: 'divider5822_cloned',
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
                            url: '/api/dictionaries?feature-id=slownik-walut&lm=nazwa&vm=kod&filter=kod=={layoutCelDelegacjiZagr.krajZagr.kodWaluty}&customAttributes=symbol%2C%7Bsymbol%7D%2CmiejscaDziesietne%2C%7BmiejscaDz',
                            title: 'label',
                            value: 'id',
                            returnObject: true,
                            lazy: true,
                            singleOptionAutoSelect: true,
                          },
                          defaultValue: null,
                        },
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
                            if: 'nata(layoutCelDelegacjiZagr[].srodekTransportuZagr.czyWymagaKilometrowki=true)',
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
                              rule: '($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutCelDelegacjiZagr[].dataWyjazduZagr, layoutCelDelegacjiZagr[].dataPrzyjazduZagr))',
                              message: 'Podróż nie może kończyć się wcześniej niż zaczynać!',
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
                              rule: '($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(layoutCelDelegacjiZagr[].dataWyjazduZagr, layoutCelDelegacjiZagr[].dataPrzyjazduZagr))',
                              message: 'Podróż nie może kończyć się wcześniej niż zaczynać!',
                            },
                          ],
                        },
                        liczbaKmZagr: {
                          label: 'Liczba km',
                          layout: {
                            component: 'number-field',
                            if: 'nata(layoutCelDelegacjiZagr[].srodekTransportuZagr.czyWymagaKilometrowki=true)',
                            hide: false,
                          },
                          type: 'int',
                          validations: [
                            {
                              name: 'NieUjemne',
                              rule: 'layoutCelDelegacjiZagr[].liczbaKmZagr > 0',
                              message: 'Wartość musi być większa od 0!',
                            },
                          ],
                        },
                        czasSluzbowyDelegacjiZagranicznej: {
                          label: 'Czas służbowy delegacji zagranicznej',
                          layout: {
                            component: 'number-field',
                            hide: true,
                            props: { hint: 'ms', 'persistent-hint': true },
                          },
                          type: 'int',
                          expression:
                            'JSONATA(($dataStart := $toMillis(layoutCelDelegacjiZagr[].dataWyjazduZagr); $dataEnd := $toMillis(layoutCelDelegacjiZagr[].dataPrzyjazduZagr); $overlaps := layoutEtapPrywatnyZagr.($from := $toMillis(dataEtapPrywatnyStartZagr); $to := $toMillis(dataEtapPrywatnyKoniecZagr); $start := $max([$from, $dataStart]); $end := $min([$to, $dataEnd]); ($end > $start) ? ($end - $start) : 0); ($dataEnd - $dataStart) - $sum($overlaps ? $overlaps : [])))',
                        },
                      },
                      required: [
                        'krajZagr',
                        'walutaZagr',
                        'srodekTransportuZagr',
                        'miejscowoscWyjazduZagr',
                        'miejscowoscPrzyjazduZagr',
                        'dataWyjazduZagr',
                        'dataPrzyjazduZagr',
                        'liczbaKmZagr',
                      ],
                    },
                    options: {
                      addBtnText: 'Dodaj',
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
                switchEtapPrywatnyZagr: {
                  label: 'Etap prywatny',
                  layout: {
                    component: 'switch',
                    props: { 'false-value': false, 'true-value': true },
                  },
                },
                alertEtapPrywatnyZagr: {
                  memorable: false,
                  content:
                    'W przypadku wskazania etapu prywatnego czas ten zostanie automatycznie odliczony przy przeliczeniach.',
                  layout: { component: 'alert', if: 'nata(switchEtapPrywatnyZagr=true)' },
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
                        },
                        dataEtapPrywatnyKoniecZagr: {
                          label: 'Koniec etapu prywatnego',
                          layout: {
                            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
                            component: 'date-time-picker',
                            if: '',
                          },
                        },
                      },
                      required: ['dataEtapPrywatnyStartZagr', 'dataEtapPrywatnyKoniecZagr'],
                    },
                    options: {
                      addBtnText: 'Dodaj',
                      showDivider: true,
                      ordinalNumberInModel: false,
                      showFirstInitRow: true,
                      addBtnMode: 'add',
                    },
                    props: {},
                    offset: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 },
                    if: 'nata(switchEtapPrywatnyZagr=true)',
                  },
                  editable: true,
                  showElements: true,
                  sectionKey: 'grupaZagr',
                },
                divider6: {
                  layout: { component: 'divider' },
                  opacity: '100',
                  thickness: 2,
                  label: 'divider1197_cloned',
                },
                htmlCzasPodrozyZagr: {
                  content: 'Planowany czas podróży',
                  layout: { component: 'static-content', tag: 'h3' },
                },
                alertUjemnyCzasZagranicznejPodrozy: {
                  memorable: false,
                  content:
                    'Data zakończenia podróży nie może być wcześniejsza niż data jej rozpoczęcia. Proszę zweryfikować wprowadzone wartości.',
                  layout: {
                    component: 'alert',
                    props: { type: 'error' },
                    if: 'nata(calkowityCzasDelegacjiZagranicznej < 0 or calkowityCzasPrywatnyDelegacjiZagranicznej < 0)',
                  },
                },
                calkowityCzasDelegacjiZagranicznej: {
                  label: 'calkowityCzasDelegacjiZagranicznej',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    component: 'number-field',
                    hide: true,
                    props: { hint: 'ms', 'persistent-hint': true },
                  },
                  type: 'int',
                  expression:
                    'JSONATA($sum(layoutCelDelegacjiZagr.($toMillis(dataPrzyjazduZagr) - $toMillis(dataWyjazduZagr))))',
                  defaultValue: 0,
                },
                calkowityCzasPrywatnyDelegacjiZagranicznej: {
                  label: 'calkowityCzasPrywatnyDelegacjiZagranicznej',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    component: 'number-field',
                    hide: true,
                    props: { hint: 'ms', 'persistent-hint': true },
                  },
                  type: 'int',
                  expression:
                    'JSONATA($exists(layoutEtapPrywatnyZagr) ? $sum(layoutEtapPrywatnyZagr.($toMillis(dataEtapPrywatnyKoniecZagr) - $toMillis(dataEtapPrywatnyStartZagr))) : 0)',
                },
                czasPodrozyDniZagr: {
                  label: 'Dni',
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: 'number-field',
                    props: { readonly: 'true', hint: '', 'persistent-hint': false },
                  },
                  type: 'int',
                  expression:
                    'JSONATA($floor((calkowityCzasDelegacjiZagranicznej-calkowityCzasPrywatnyDelegacjiZagranicznej)/ (1000 * 60 * 60 * 24)))',
                },
                czasPodrozyGodzinyZagr: {
                  label: 'Godziny',
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    component: 'number-field',
                    props: { readonly: true, hint: '', 'persistent-hint': false },
                    hide: false,
                  },
                  type: 'int',
                  expression:
                    'JSONATA($floor((calkowityCzasDelegacjiZagranicznej - calkowityCzasPrywatnyDelegacjiZagranicznej) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))',
                },
                czasPodrozyMinutyZagr: {
                  label: 'Minuty',
                  layout: {
                    cols: { xs: 12, sm: 12, md: 12, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'number-field',
                    props: { readonly: true, hint: '', 'persistent-hint': false },
                  },
                  type: 'int',
                  expression:
                    'JSONATA(($floor((calkowityCzasDelegacjiZagranicznej - calkowityCzasPrywatnyDelegacjiZagranicznej) % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60))',
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
                divider8: {
                  layout: { component: 'divider' },
                  opacity: '100',
                  thickness: 2,
                  label: 'divider5615_cloned',
                },
                htmlZaliczkaZagr: {
                  content: 'Zaliczka',
                  layout: {
                    component: 'static-content',
                    tag: 'h3',
                    cols: { xs: 6, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                  },
                },
                czyZaliczkaZagr: {
                  label: 'Wnioskuję o zaliczkę',
                  layout: {
                    component: 'switch',
                    props: { 'false-value': false, 'true-value': true },
                    cols: { xs: 6, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    fillRow: true,
                  },
                },
                dietyZagr: { label: 'Diety', layout: { component: 'switch' } },
                grpDietyZagr: {
                  sectionKey: 'grupaZagr',
                  layout: {
                    component: 'duplicated-section',
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
                          },
                          type: 'int',
                          expression:
                            'JSONATA($floor(($dni := czasPodrozyDniZagr; $godz := czasPodrozyGodzinyZagr; $czyDelegacjaJednodniowa := $dni = 0; $czyDelegacjaJednodniowa ? ($godz < 8 ? 0 : ($godz < 12 ? 0 : 1)) : $dni + ($godz > 8 ? 1 : ($godz > 0 ? 0.5 : 0)))))',
                        },
                        obiadyZagr: {
                          label: 'Liczba obiadów',
                          layout: {
                            component: 'number-field',
                            cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                          },
                          type: 'int',
                          expression:
                            'JSONATA($floor(($dni := czasPodrozyDniZagr; $godz := czasPodrozyGodzinyZagr; $czyJednodniowa := $dni = 0; $czyJednodniowa ? ($godz < 8 ? 0 : 1) : $dni + ($godz > 8 ? 1 : ($godz > 0 ? 0.5 : 0)))))',
                        },
                        kolacjeZagr: {
                          label: 'Liczba kolacji',
                          layout: {
                            component: 'number-field',
                            cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                          },
                          type: 'int',
                          expression:
                            'JSONATA($floor(($dni := czasPodrozyDniZagr; $godz := czasPodrozyGodzinyZagr; $czyJednodniowa := $dni = 0; $czyJednodniowa ? ($godz < 8 ? 0 : 1) : $dni + ($godz > 8 ? 1 : ($godz > 0 ? 0.5 : 0)))))',
                        },
                        dietyKwotaZagr: {
                          label: 'Kwota',
                          layout: {
                            cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                            component: 'number-field',
                            if: 'nata(dietyZagr=true)',
                          },
                          type: 'float',
                          precision: '2',
                          precisionMin: '2',
                          calculation:
                            '($number(czasPodrozyDni) * 45) + (\n $number(czasPodrozyGodziny) > 8 and $number(czasPodrozyGodziny)  < 12 ? 22.50 :\n  $number(czasPodrozyGodziny)  >= 12 ? 45 :\n  0\n)\n',
                        },
                      },
                    },
                    options: {
                      addBtnText: 'Add element',
                      showDivider: false,
                      ordinalNumberInModel: false,
                      showFirstInitRow: true,
                      addBtnMode: null,
                    },
                    props: {},
                  },
                  editable: true,
                  showElements: false,
                },
                hotelZagr: {
                  label: 'Hotel',
                  layout: {
                    cols: { xs: 6, sm: 6, md: 6, lg: 3, xl: 3, xxl: 3 },
                    component: 'switch',
                    if: 'nata(czyZaliczkaZagr=true)',
                    fillRow: true,
                  },
                },
                liczbaNoclegowZagr: {
                  label: 'Liczba noclegów',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'number-field',
                    if: 'nata(hotelZagr=true)',
                  },
                  type: 'int',
                  expression:
                    'JSONATA(($dni := czasPodrozyDniZagr; $godz := czasPodrozyGodzinyZagr + czasPodrozyMinutyZagr / 60; $dni + ($godz >= 6 ? 1 : 0)))',
                },
                hotelKwotaZagr: {
                  label: 'Kwota',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'number-field',
                    if: 'nata(hotelZagr=true)',
                    fillRow: true,
                  },
                  type: 'float',
                  precision: '2',
                  precisionMin: '2',
                },
                kosztyPrzejazduZagr: {
                  label: 'Koszty przejazdu',
                  layout: {
                    cols: { xs: 6, sm: 6, md: 6, lg: 3, xl: 3, xxl: 3 },
                    component: 'switch',
                    if: 'nata(czyZaliczkaZagr=true)',
                    fillRow: true,
                  },
                },
                kosztyPrzejazduKwotaZagr: {
                  label: 'Kwota',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'number-field',
                    if: 'nata(kosztyPrzejazduZagr=true)',
                  },
                  type: 'float',
                  precision: '2',
                  precisionMin: '2',
                },
                kwotaDewizZagr: {
                  label: 'Kwota dewiz',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'number-field',
                    props: { readonly: true },
                    if: '',
                    fillRow: true,
                  },
                  type: 'float',
                  precision: '2',
                  precisionMin: '2',
                  calculation:
                    '($exists(dietyKwota) and dietyKwota != null ? $number(dietyKwota) : 0) +\n($exists(hotelKwota) and hotelKwota != null ? $number(hotelKwota) : 0) +\n($exists(kosztyPrzejazduKwota) and kosztyPrzejazduKwota != null ? $number(kosztyPrzejazduKwota) : 0) +\n($exists(ryczaltyNaDojazdKwota) and ryczaltyNaDojazdKwota != null ? $number(ryczaltyNaDojazdKwota) : 0)',
                },
                wysokoscZaliczkiZagr: {
                  label: 'Wysokość zaliczki',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'number-field',
                    if: 'nata(czyZaliczkaZagr=true)',
                  },
                  type: 'float',
                  precision: '2',
                  precisionMin: '2',
                  calculation:
                    '(($exists(dietyKwotaZagr) and dietyKwotaZagr != null ? $number(dietyKwotaZagr) : 0) +\n($exists(hotelKwotaZagr) and hotelKwotaZagr != null ? $number(hotelKwotaZagr) : 0) +\n($exists(kosztyPrzejazduKwotaZagr) and kosztyPrzejazduKwotaZagr != null ? $number(kosztyPrzejazduKwotaZagr) : 0) +\n($exists(ryczaltyNaDojazdKwotaZagr) and ryczaltyNaDojazdKwotaZagr != null ? $number(ryczaltyNaDojazdKwotaZagr) : 0 ))* ($exists(walutaKurs) ? walutaKurs : 1)',
                },
                formaWyplatyZagr: {
                  label: 'Forma wypłaty',
                  layout: {
                    cols: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 },
                    component: 'select',
                    if: 'nata(czyZaliczkaZagr=true)',
                  },
                  source: {
                    items: [
                      { value: 1, title: 'Konto osobiste' },
                      {
                        value: 2,
                        title: 'Gotówka',
                      },
                    ],
                  },
                  defaultValue: { value: 1, title: 'Konto osobiste' },
                },
                numerKontaBankowegoZagr: {
                  label: 'Numer konta bankowego',
                  layout: {
                    cols: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    component: 'text-field',
                    if: 'nata(formaWyplatyZagr.value=1)',
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
          },
          opacity: '100',
          thickness: 2,
        },
        cbZobowiazanie: {
          label: 'Oświadczenia',
          layout: {
            component: 'checkbox',
            props: { multiple: true },
            cols: { xs: 12, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 },
          },
          source: {
            items: [
              {
                value: 1,
                title:
                  'Zobowiązuję się do rozliczenia z otrzymanej zaliczki w ciągu 14 dni kalendarzowych od daty zakończenia podróży służbowej. Przyjmuję do wiadomości, że w przypadku niedotrzymania terminu rozliczenia zaliczki przekazana kwota zostanie w całości potrącona z najbliższego wynagrodzenia. Wyrażam zgodę na potrącenie przez pracodawcę z mojego wynagrodzenia należności z tytułu nierozliczonej kwoty zaliczki otrzymanej w związku z podróżą służbową.',
              },
            ],
          },
        },
      },
      required: ['rodzajDelegacji', 'cbZobowiazanie'],
    },
  },
};
