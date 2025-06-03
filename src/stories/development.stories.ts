// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3';


import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';


export default {
  title: 'Development Stories',
  component: FormStoryWrapper,
  args: {
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact'
      }
    }
  }
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;


export const Table: Story = {

  args: {
    formModel: {
      'pozycjeDokumentu': [
        {
          'kwotaNetto': 13.23,
          'kwotaBrutto': 16.27,
          'ordinalNumber': 1,
          'kwotaVat': 3.05,
          'stawkaVat': {
            'mnoznik': 23,
            'id': '23',
            'label': '23%'
          },
          'nazwa': 'Usługi pocztowe i kurier. PKWiU',
          'aureaSectionId': 'zuiAy',
          'predykcje': {
            'aureaSectionId': 'zuiAy',
            'akronim': {
              'prediction': 1,
              'title': '00NONE00',
              'value': '00NONE00'
            },
            'miejscePowstaniaKosztu': {
              'prediction': 0.9922,
              'id': 'GR606',
              'label': 'GR606 - Części i osprzęt',
              'labels': 'bm-ai-prediction'
            },
            'rodzajKosztu': {
              'czyPoleNrProjektu': false,
              'czyPoleRodzinaEl5': false,
              'czyPoleRodzinaEl4': false,
              'czyPoleOsobaDoRefatkury': false,
              'czyPoleNrRejestracyjny': false,
              'czyPoleNrZleceniaSerwisowegoDbs': false,
              'czyPoleNazwaKlienta': false,
              'czyPoleAkronim': false,
              'label': '4020100 - Transport części',
              'czyPoleOpisDokumentu': true,
              'czyPoleDataPrzyjeciaPrzyjazdu': false,
              'labels': 'bm-ai-prediction',
              'czyPoleCelSpotkania': false,
              'czyPoleDealDbs': false,
              'czyPoleNosnik': false,
              'prediction': 0.9845,
              'id': '4020100',
              'czyPoleLiczbaOsob': false
            }
          },
          'rodzajKosztu': {
            'id': '4020100',
            'description': '',
            'label': '4020100 - Transport części',
            'czyPoleNrProjektu': false,
            'czyPoleRodzinaEl5': false,
            'czyPoleRodzinaEl4': false,
            'czyPoleOsobaDoRefatkury': false,
            'czyPoleNrRejestracyjny': false,
            'czyPoleNrZleceniaSerwisowegoDbs': false,
            'czyPowiadomicDzialZakupow': false,
            'czyPoleNazwaKlienta': false,
            'czyPoleAkronim': false,
            'czyPoleOpisDokumentu': true,
            'czyPoleDataPrzyjeciaPrzyjazdu': false,
            'labels': 'bm-ai-prediction',
            'czyPoleCelSpotkania': false,
            'czyPoleDealDbs': false,
            'powiadomienieDzialZakupowProgKowtyPln': 0,
            'czyPoleNosnik': false,
            'czyPoleLiczbaOsob': false
          },
          'miejscePowstaniaKosztu': {
            'prediction': 0.9922,
            'id': 'GR606',
            'label': 'GR606 - Części i osprzęt',
            'labels': 'bm-ai-prediction'
          },
          'kwotaNettoPln': 13.23,
          'kwotaVatPln': 3.04,
          'kwotaBruttoPln': 16.27,
          'kwotaVAT': 3.04,
          'osobyWybraneDoAutoryzacji': null
        },
        {
          'kwotaNetto': 46.88,
          'kwotaBrutto': 57.66,
          'ordinalNumber': 2,
          'kwotaVat': 10.78,
          'stawkaVat': {
            'mnoznik': 23,
            'id': '23',
            'label': '23%'
          },
          'nazwa': 'Usługi transp. krajowe PKWiU',
          'aureaSectionId': 'ypRg3',
          'predykcje': {
            'aureaSectionId': 'ypRg3',
            'akronim': {
              'prediction': 1,
              'title': '00NONE00',
              'value': '00NONE00'
            },
            'miejscePowstaniaKosztu': {
              'prediction': 0.9922,
              'id': 'GR606',
              'label': 'GR606 - Części i osprzęt',
              'labels': 'bm-ai-prediction'
            },
            'rodzajKosztu': {
              'czyPoleNrProjektu': false,
              'czyPoleRodzinaEl5': false,
              'czyPoleRodzinaEl4': false,
              'czyPoleOsobaDoRefatkury': false,
              'czyPoleNrRejestracyjny': false,
              'czyPoleNrZleceniaSerwisowegoDbs': false,
              'czyPoleNazwaKlienta': false,
              'czyPoleAkronim': false,
              'label': '4020100 - Transport części',
              'czyPoleOpisDokumentu': true,
              'czyPoleDataPrzyjeciaPrzyjazdu': false,
              'labels': 'bm-ai-prediction',
              'czyPoleCelSpotkania': false,
              'czyPoleDealDbs': false,
              'czyPoleNosnik': false,
              'prediction': 0.9845,
              'id': '4020100',
              'czyPoleLiczbaOsob': false
            }
          },
          'rodzajKosztu': {
            'czyPoleNrProjektu': false,
            'czyPoleRodzinaEl5': false,
            'czyPoleRodzinaEl4': false,
            'czyPoleOsobaDoRefatkury': false,
            'czyPoleNrRejestracyjny': false,
            'czyPoleNrZleceniaSerwisowegoDbs': false,
            'czyPoleNazwaKlienta': false,
            'czyPoleAkronim': false,
            'label': '4020100 - Transport części',
            'czyPoleOpisDokumentu': true,
            'czyPoleDataPrzyjeciaPrzyjazdu': false,
            'labels': 'bm-ai-prediction',
            'czyPoleCelSpotkania': false,
            'czyPoleDealDbs': false,
            'czyPoleNosnik': false,
            'prediction': 0.9845,
            'id': '4020100',
            'czyPoleLiczbaOsob': false
          },
          'miejscePowstaniaKosztu': {
            'prediction': 0.9922,
            'id': 'GR606',
            'label': 'GR606 - Części i osprzęt',
            'labels': 'bm-ai-prediction'
          },
          'kwotaNettoPln': 46.88,
          'kwotaVatPln': 10.78,
          'kwotaBruttoPln': 57.66,
          'kwotaVAT': 10.78
        }
      ]
    },
    schema: {
      type: 'object',
      properties: {
        duplicated: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                textField: {
                  label: 'Test',
                  layout: {
                    component: 'text-field',
                    props: {
                      "bg-color": "nata(pozycjeDokumentu[].rodzajKosztu.labels = 'bm-ai-prediction' ? '#FFB74D':'')"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

};
