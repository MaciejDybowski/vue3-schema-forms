// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';



import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';






























export default {
  title: 'Development Area',
  component: FormStoryWrapper,
  args: {
    emittedObject: {},
    signals: {},
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
      buttonProps: {
        size: 'small',
        variant: 'elevated',
        rounded: '',
      },
    },
  },
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;

export const TableOne: Story = {
  args: {
    formModel: {
      dataId: 9123,
      nazwaLubNazwisko: 'HYZ',
      imie: 'TOMASZ',
      nip: '9181981436',
      regon: null,
      pesel: '83091909898',
      nrEp: '074381746',
      krs: null,
      nrPaszportuLubInnegoDokToz: null,
      adresPodstawowyMiejscowoscSymbol: '0894316',
      adresPodstawowyMiejscowoscNazwa: 'ŁUKOWA',
      adresPodstawowyUlica: null,
      adresPodstawowyNrDomu: '27',
      adresPodstawowyNrMieszkania: null,
      adresPodstawowyNrSkrytkiPocztowej: null,
      adresPodstawowyKodPocztowy: '23-412',
      adresPodstawowyPoczta: 'ŁUKOWA',
      adresPodstawowyGminaSymbol: '0602092',
      adresPodstawowyGminaNazwa: 'ŁUKOWA',
      adresPodstawowyPowiatSymbol: '0602',
      adresPodstawowyPowiatNazwa: 'BIŁGORAJSKI',
      adresPodstawowyWojewodztwoSymbol: '06',
      adresPodstawowyWojewodztwoNazwa: 'LUBELSKIE',
      adresPodstawowyTelefon: '693588680',
      adresPodstawowyFaks: null,
      adresPodstawowyEmail: null,
      adresKorespondencyjny: null,
      dataRejestracji: '2018-06-08',
      otKod: 'LU',
      dodanoWnioskiemDnia: '2018-06-11',
      ostatnioZaktualizowanoWnioskiemDnia: '2025-06-17',
      wykreslonoWnioskiemDnia: null,
      status: 'Zatwierdzony',
      statusKod: 'prz_zatwierdzony',
      przechowywanieSurowca: [
        {
          id: 7881,
          producentId: 9123,
          typMiejscaKod: 'GR',
          typMiejscaNazwa: 'GOSPODARSTWO ROLNE',
          adresMiejscowoscSymbol: '0894316',
          adresMiejscowoscNazwa: 'ŁUKOWA',
          adresUlica: null,
          adresNumer: '27a',
          adresKodPocztowy: '23-412',
          adresPoczta: 'Poczta Łukowa koło Biłgoraja',
          adresGminaSymbol: '0602092',
          adresGminaNazwa: 'ŁUKOWA',
          adresPowiatSymbol: '0602',
          adresPowiatNazwa: 'BIŁGORAJSKI',
          adresWojewodztwoSymbol: '06',
          adresWojewodztwoNazwa: 'LUBELSKIE',
          telefon: null,
          uwagi: null,
        },
      ],
      listaWnioskow: [
        {
          id: 39324,
          typWnioskuNazwa: 'Nowa informacja',
          rodzajWnioskuKod: 'MTY_INFO',
          rodzajWnioskuNazwa: 'Informacja roczna',
          sygnaturaWniosku: '2025/05/19/LU/PR/0002113/A',
          dataWplywuWniosku: '2025-05-13',
          dataZmiany: null,
          status: 'Zatwierdzona do wpisu',
        },
        {
          id: 35352,
          typWnioskuNazwa: 'Aktualizacja informacji',
          rodzajWnioskuKod: 'MTY_INFO',
          rodzajWnioskuNazwa: 'Informacja roczna',
          sygnaturaWniosku: '2024/11/28/LU/PR/0003236/A',
          dataWplywuWniosku: '2024-11-25',
          dataZmiany: null,
          status: 'Zatwierdzona do aktualizacji',
        },
        {
          id: 34745,
          typWnioskuNazwa: 'Aktualizacja informacji',
          rodzajWnioskuKod: 'MTY_INFO',
          rodzajWnioskuNazwa: 'Informacja roczna',
          sygnaturaWniosku: '2024/06/13/LU/PR/0002732/A',
          dataWplywuWniosku: '2024-06-12',
          dataZmiany: null,
          status: 'Zaktualizowana',
        },
        {
          id: 34409,
          typWnioskuNazwa: 'Nowa informacja',
          rodzajWnioskuKod: 'MTY_INFO',
          rodzajWnioskuNazwa: 'Informacja roczna',
          sygnaturaWniosku: '2024/05/21/LU/PR/0002467/A',
          dataWplywuWniosku: '2024-05-15',
          dataZmiany: null,
          status: 'Zaktualizowana',
        },
        {
          id: 29269,
          typWnioskuNazwa: 'Nowa informacja',
          rodzajWnioskuKod: 'MTY_INFO',
          rodzajWnioskuNazwa: 'Informacja roczna',
          sygnaturaWniosku: '2023/05/18/LU/PR/0002403/A',
          dataWplywuWniosku: '2023-05-12',
          dataZmiany: null,
          status: 'Zatwierdzona do wpisu',
        },
        {
          id: 23955,
          typWnioskuNazwa: 'Korekta informacji',
          rodzajWnioskuKod: 'MTY_INFO',
          rodzajWnioskuNazwa: 'Informacja roczna',
          sygnaturaWniosku: '2022/06/27/LU/PR/0002867/A',
          dataWplywuWniosku: '2022-06-22',
          dataZmiany: null,
          status: 'Zatwierdzona do wpisu',
        },
        {
          id: 23193,
          typWnioskuNazwa: 'Nowa informacja',
          rodzajWnioskuKod: 'MTY_INFO',
          rodzajWnioskuNazwa: 'Informacja roczna',
          sygnaturaWniosku: '2022/05/19/LU/PR/0002387/A',
          dataWplywuWniosku: '2022-05-16',
          dataZmiany: null,
          status: 'Skorygowana',
        },
        {
          id: 18422,
          typWnioskuNazwa: 'Aktualizacja informacji',
          rodzajWnioskuKod: 'MTY_INFO',
          rodzajWnioskuNazwa: 'Informacja roczna',
          sygnaturaWniosku: '2021/07/02/LU/PR/0002891/A',
          dataWplywuWniosku: '2021-06-30',
          dataZmiany: null,
          status: 'Zatwierdzona do aktualizacji',
        },
        {
          id: 17554,
          typWnioskuNazwa: 'Nowa informacja',
          rodzajWnioskuKod: 'MTY_INFO',
          rodzajWnioskuNazwa: 'Informacja roczna',
          sygnaturaWniosku: '2021/05/19/LU/PR/0002347/A',
          dataWplywuWniosku: '2021-05-15',
          dataZmiany: null,
          status: 'Zaktualizowana',
        },
        {
          id: 13935,
          typWnioskuNazwa: 'Aktualizacja informacji',
          rodzajWnioskuKod: 'MTY_INFO',
          rodzajWnioskuNazwa: 'Informacja roczna',
          sygnaturaWniosku: '2021/04/13/LU/PR/0000381/A',
          dataWplywuWniosku: '2021-04-09',
          dataZmiany: null,
          status: 'Zatwierdzona do aktualizacji',
        },
        {
          id: 12697,
          typWnioskuNazwa: 'Nowa informacja',
          rodzajWnioskuKod: 'MTY_INFO',
          rodzajWnioskuNazwa: 'Informacja roczna',
          sygnaturaWniosku: '2020/06/03/LU/PR/0003475/A',
          dataWplywuWniosku: '2020-05-20',
          dataZmiany: null,
          status: 'Zaktualizowana',
        },
        {
          id: 4473,
          typWnioskuNazwa: 'Nowa informacja',
          rodzajWnioskuKod: 'MTY_INFO',
          rodzajWnioskuNazwa: 'Informacja roczna',
          sygnaturaWniosku: '2019/05/22/LU/PR/0002188/A',
          dataWplywuWniosku: '2019-05-14',
          dataZmiany: null,
          status: 'Zatwierdzona do wpisu',
        },
        {
          id: 12917,
          typWnioskuNazwa: 'Nowy wniosek',
          rodzajWnioskuKod: 'MTY_WPIS',
          rodzajWnioskuNazwa: 'Wniosek o wpis',
          sygnaturaWniosku: '2018/06/04/LU/PR/0002602/A',
          dataWplywuWniosku: '2018-05-14',
          dataZmiany: null,
          status: 'Zatwierdzony do wpisu',
        },
      ],
      informacjeRoczne: {
        dostawy: [
          {
            content: [
              {
                uwagi: 'ZMIANA PODMIOTU',
                pozycja: 1,
                rokZbioru: 2024,
                numerUmowy: '426/2/24',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 112847.4,
                nabywcaSurowca: {
                  id: 381,
                  nip: '9182164030',
                  adres: 'ŁUKOWA 608, 23-412 ŁUKOWA',
                  label: 'ŁUKOWA TOBACCO  SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
                  regon: '361781153',
                },
                dataZawarciaUmowy: '2024-03-15',
              },
            ],
            rokSprawozdawczy: '2024/2025',
          },
          {
            content: [
              {
                uwagi: null,
                pozycja: 1,
                rokZbioru: 2023,
                numerUmowy: '469/2/23',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 96909.5,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2023-03-15',
              },
            ],
            rokSprawozdawczy: '2023/2024',
          },
          {
            content: [
              {
                uwagi: null,
                pozycja: 1,
                rokZbioru: 2022,
                numerUmowy: '236/2/22',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 121433.4,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2022-03-15',
              },
            ],
            rokSprawozdawczy: '2022/2023',
          },
          {
            content: [
              {
                uwagi: null,
                pozycja: 1,
                rokZbioru: 2021,
                numerUmowy: '103/2/21',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 124966.2,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2021-03-15',
              },
            ],
            rokSprawozdawczy: '2021/2022',
          },
          {
            content: [
              {
                uwagi: 'ANEKS',
                pozycja: 1,
                rokZbioru: 2020,
                numerUmowy: '292/2/20',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 40354,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2020-03-13',
              },
            ],
            rokSprawozdawczy: '2020/2021',
          },
          {
            content: [
              {
                uwagi: null,
                pozycja: 1,
                rokZbioru: 2019,
                numerUmowy: '378/2/19',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 11200,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2019-03-15',
              },
            ],
            rokSprawozdawczy: '2019/2020',
          },
          {
            content: [
              {
                uwagi: null,
                pozycja: 1,
                rokZbioru: 2018,
                numerUmowy: '302/2/18',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 12030,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2018-03-15',
              },
            ],
            rokSprawozdawczy: '2018/2019',
          },
        ],
        stanMagazynowy: [
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                szacunkowyStanMagazynowySurowca: 0,
              },
            ],
            rokSprawozdawczy: '2024/2025',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                szacunkowyStanMagazynowySurowca: 0,
              },
            ],
            rokSprawozdawczy: '2023/2024',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                szacunkowyStanMagazynowySurowca: 0,
              },
            ],
            rokSprawozdawczy: '2022/2023',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                szacunkowyStanMagazynowySurowca: 0,
              },
            ],
            rokSprawozdawczy: '2021/2022',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2020,
                grupaOdmian: {
                  label: 'I',
                },
                szacunkowyStanMagazynowySurowca: 0,
              },
            ],
            rokSprawozdawczy: '2020/2021',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2019,
                grupaOdmian: {
                  label: 'I',
                },
                szacunkowyStanMagazynowySurowca: 0,
              },
            ],
            rokSprawozdawczy: '2019/2020',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2018,
                grupaOdmian: {
                  label: 'I',
                },
                szacunkowyStanMagazynowySurowca: 0,
              },
            ],
            rokSprawozdawczy: '2018/2019',
          },
        ],
        umowyRokBiezacy: [
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2025,
                numerUmowy: '223/2/25',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 140000,
                nabywcaSurowca: {
                  id: 381,
                  nip: '9182164030',
                  adres: 'ŁUKOWA 608, 23-412 ŁUKOWA',
                  label: 'ŁUKOWA TOBACCO  SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
                  regon: '361781153',
                },
                dataZawarciaUmowy: '2025-03-15',
              },
              {
                uwagi: null,
                rokZbioru: 2025,
                numerUmowy: '231/2/25',
                grupaOdmian: {
                  label: 'V',
                },
                masaSurowca: 3000,
                nabywcaSurowca: {
                  id: 381,
                  nip: '9182164030',
                  adres: 'ŁUKOWA 608, 23-412 ŁUKOWA',
                  label: 'ŁUKOWA TOBACCO  SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
                  regon: '361781153',
                },
                dataZawarciaUmowy: '2025-03-15',
              },
            ],
            rokSprawozdawczy: '2024/2025',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2024,
                numerUmowy: '426/2/24',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 140000,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2024-03-15',
              },
            ],
            rokSprawozdawczy: '2023/2024',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2023,
                numerUmowy: '469/2/23',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 136000,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2023-03-15',
              },
            ],
            rokSprawozdawczy: '2022/2023',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2022,
                numerUmowy: '236/2/22',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 130000,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2022-03-15',
              },
            ],
            rokSprawozdawczy: '2021/2022',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2021,
                numerUmowy: '103/2/21',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 125000,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2021-03-15',
              },
            ],
            rokSprawozdawczy: '2020/2021',
          },
          {
            content: [
              {
                uwagi: 'ANEKS',
                rokZbioru: 2020,
                numerUmowy: '292/2/20',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 41000,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2020-03-13',
              },
            ],
            rokSprawozdawczy: '2019/2020',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2019,
                numerUmowy: '378/2/19',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 12000,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2019-03-15',
              },
            ],
            rokSprawozdawczy: '2018/2019',
          },
        ],
        uprawyRokBiezacy: [
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '337',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.78,
                identyfikatorDzialki: '060209_2.0003.337',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.35,
                identyfikatorDzialki: '060209_2.0003.36/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.06,
                identyfikatorDzialki: '060209_2.0003.35/2',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '81',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.83,
                identyfikatorDzialki: '060210_2.0001.81',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3680/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.21,
                identyfikatorDzialki: '060209_2.0003.3680/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '264',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.19,
                identyfikatorDzialki: '060209_2.0003.264',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '263',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2,
                identyfikatorDzialki: '060209_2.0003.263',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '262',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.75,
                identyfikatorDzialki: '060209_2.0003.262',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '261',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.75,
                identyfikatorDzialki: '060209_2.0003.261',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '260/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.05,
                identyfikatorDzialki: '060209_2.0003.260/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '260/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.3,
                identyfikatorDzialki: '060209_2.0003.260/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '260/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.17,
                identyfikatorDzialki: '060209_2.0003.260/1',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '150/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.53,
                identyfikatorDzialki: '060210_2.0001.150/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3699',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.6,
                identyfikatorDzialki: '060209_2.0003.3699',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '182',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.43,
                identyfikatorDzialki: '060209_2.0002.182',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '172',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.44,
                identyfikatorDzialki: '060209_2.0002.172',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '208',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0002.208',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3682',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.16,
                identyfikatorDzialki: '060209_2.0003.3682',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.45,
                identyfikatorDzialki: '060209_2.0003.35/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.52,
                identyfikatorDzialki: '060209_2.0003.36/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.53,
                identyfikatorDzialki: '060209_2.0003.37/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1072',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.65,
                identyfikatorDzialki: '060209_2.0003.1072',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '414',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.76,
                identyfikatorDzialki: '060209_2.0003.414',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '415',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.61,
                identyfikatorDzialki: '060209_2.0003.415',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.05,
                identyfikatorDzialki: '060209_2.0002.281/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.52,
                identyfikatorDzialki: '060209_2.0002.281/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0002.281/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '227/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.21,
                identyfikatorDzialki: '060209_2.0002.227/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '227/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.24,
                identyfikatorDzialki: '060209_2.0002.227/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'V',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '4/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.21,
                identyfikatorDzialki: '060209_2.0003.4/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'V',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '414',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.06,
                identyfikatorDzialki: '060209_2.0003.414',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'V',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '415',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.13,
                identyfikatorDzialki: '060209_2.0003.415',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'V',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.27,
                identyfikatorDzialki: '060209_2.0003.3/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'V',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '4/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.26,
                identyfikatorDzialki: '060209_2.0003.4/2',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '164',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.24,
                identyfikatorDzialki: '060210_2.0001.164',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.24,
                identyfikatorDzialki: '060209_2.0003.35/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2025,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.27,
                identyfikatorDzialki: '060209_2.0003.37/1',
              },
            ],
            rokSprawozdawczy: '2024/2025',
          },
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1492',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.13,
                identyfikatorDzialki: '060209_2.0003.1492',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1093',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.49,
                identyfikatorDzialki: '060209_2.0003.1093',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1094',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0003.1094',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '406',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0003.406',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '363',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.363',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '364',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.364',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '400',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.400',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '401',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.401',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.32,
                identyfikatorDzialki: '060209_2.0003.36/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.32,
                identyfikatorDzialki: '060209_2.0003.37/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.32,
                identyfikatorDzialki: '060209_2.0003.35/3',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '164',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.25,
                identyfikatorDzialki: '060210_2.0001.164',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '105',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.51,
                identyfikatorDzialki: '060209_2.0003.105',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '260/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.16,
                identyfikatorDzialki: '060209_2.0003.260/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '260/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.3,
                identyfikatorDzialki: '060209_2.0003.260/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '260/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.05,
                identyfikatorDzialki: '060209_2.0003.260/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '261',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.72,
                identyfikatorDzialki: '060209_2.0003.261',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '262',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.72,
                identyfikatorDzialki: '060209_2.0003.262',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '263',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2,
                identyfikatorDzialki: '060209_2.0003.263',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3680',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.04,
                identyfikatorDzialki: '060209_2.0003.3680',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3682',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.16,
                identyfikatorDzialki: '060209_2.0003.3682',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3699',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.6,
                identyfikatorDzialki: '060209_2.0003.3699',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3201',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3201',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3104',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.3104',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '2489',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.7,
                identyfikatorDzialki: '060209_2.0003.2489',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3100',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.68,
                identyfikatorDzialki: '060209_2.0003.3100',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/6',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.26,
                identyfikatorDzialki: '060209_2.0003.474/6',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.27,
                identyfikatorDzialki: '060209_2.0003.474/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '461',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.461',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '462',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.462',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '459`',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.459',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '460',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.460',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '457',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.457',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '458',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.458',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '455',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.455',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '456',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.456',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.43,
                identyfikatorDzialki: '060209_2.0002.474/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.05,
                identyfikatorDzialki: '060209_2.0002.281/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.52,
                identyfikatorDzialki: '060209_2.0002.281/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0002.281/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '227/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.21,
                identyfikatorDzialki: '060209_2.0002.227/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '227/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.24,
                identyfikatorDzialki: '060209_2.0002.227/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '264',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.19,
                identyfikatorDzialki: '060209_2.0003.264',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '172',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.44,
                identyfikatorDzialki: '060209_2.0002.172',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '182',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.43,
                identyfikatorDzialki: '060209_2.0002.182',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '208',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0002.208',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '337',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.78,
                identyfikatorDzialki: '060209_2.0003.337',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1072',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.65,
                identyfikatorDzialki: '060209_2.0003.1072',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '368',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.35,
                identyfikatorDzialki: '060209_2.0003.368',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '396',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.35,
                identyfikatorDzialki: '060209_2.0003.396',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '2487',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.14,
                identyfikatorDzialki: '060209_2.0003.2487',
              },
            ],
            rokSprawozdawczy: '2023/2024',
          },
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '364',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.364',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '363',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.363',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '406',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0003.406',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1094',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0003.1094',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1093',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.49,
                identyfikatorDzialki: '060209_2.0003.1093',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '415',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.86,
                identyfikatorDzialki: '060209_2.0003.415',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '414',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.02,
                identyfikatorDzialki: '060209_2.0003.414',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3201',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3201',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3104',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.3104',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.29,
                identyfikatorDzialki: '060209_2.0002.281/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.28,
                identyfikatorDzialki: '060209_2.0002.281/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '172',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.44,
                identyfikatorDzialki: '060209_2.0002.172',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '182',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.43,
                identyfikatorDzialki: '060209_2.0002.182',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '208',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0002.208',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.52,
                identyfikatorDzialki: '060209_2.0003.36/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3100',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.68,
                identyfikatorDzialki: '060209_2.0003.3100',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/6',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.26,
                identyfikatorDzialki: '060209_2.0003.474/6',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.27,
                identyfikatorDzialki: '060209_2.0003.474/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '461',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.461',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '462',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.462',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '459',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.459',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '460',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.460',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '457',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.457',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '458',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.458',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '455',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.455',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '456',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.456',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.43,
                identyfikatorDzialki: '060209_2.0003.474/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.99,
                identyfikatorDzialki: '060209_2.0002.281/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3680',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.35,
                identyfikatorDzialki: '060209_2.0003.3680',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '105',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.51,
                identyfikatorDzialki: '060209_2.0003.105',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '164',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 4.47,
                identyfikatorDzialki: '060210_2.0001.164',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '150/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.53,
                identyfikatorDzialki: '060210_2.0001.150/2',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '81',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.83,
                identyfikatorDzialki: '060210_2.0001.81',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.52,
                identyfikatorDzialki: '060209_2.0003.37/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.55,
                identyfikatorDzialki: '060209_2.0003.35/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.74,
                identyfikatorDzialki: '060209_2.0003.36/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.07,
                identyfikatorDzialki: '060209_2.0003.35/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.5,
                identyfikatorDzialki: '060209_2.0003.37/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.44,
                identyfikatorDzialki: '060209_2.0003.35/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '401',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.401',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '400',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.400',
              },
            ],
            rokSprawozdawczy: '2022/2023',
          },
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3100',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.68,
                identyfikatorDzialki: '060209_2.0003.3100',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '227/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.25,
                identyfikatorDzialki: '060209_2.0002.227/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '227/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.22,
                identyfikatorDzialki: '060209_2.0002.227/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0002.281/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.52,
                identyfikatorDzialki: '060209_2.0002.281/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.05,
                identyfikatorDzialki: '060209_2.0002.281/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '264',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.5,
                identyfikatorDzialki: '060209_2.0003.264',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '263',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1,
                identyfikatorDzialki: '060209_2.0003.263',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '364',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.364',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '363',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.363',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '401',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.401',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '400',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.400',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '406',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0003.406',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1094',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0003.1094',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1093',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.49,
                identyfikatorDzialki: '060209_2.0003.1093',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '415',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.82,
                identyfikatorDzialki: '060209_2.0003.415',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '414',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.81,
                identyfikatorDzialki: '060209_2.0003.414',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.42,
                identyfikatorDzialki: '060209_2.0003.474/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '462',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.462',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '461',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.461',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '460',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.460',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '459',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.459',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '458',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.458',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '456',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.456',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '457',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.457',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '455',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.455',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/6',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.27,
                identyfikatorDzialki: '060209_2.0003.474/6',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.28,
                identyfikatorDzialki: '060209_2.0003.474/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3104',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.3,
                identyfikatorDzialki: '060209_2.0003.3104',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3201',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3201',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.45,
                identyfikatorDzialki: '060209_2.0003.35/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.53,
                identyfikatorDzialki: '060209_2.0003.36/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.5,
                identyfikatorDzialki: '060209_2.0003.37/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.6,
                identyfikatorDzialki: '060209_2.0003.35/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.86,
                identyfikatorDzialki: '060209_2.0003.35/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.53,
                identyfikatorDzialki: '060209_2.0003.36/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.29,
                identyfikatorDzialki: '060209_2.0003.37/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '105',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.51,
                identyfikatorDzialki: '060209_2.0003.105',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3682',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.19,
                identyfikatorDzialki: '060209_2.0003.3682',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3699',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.56,
                identyfikatorDzialki: '060209_2.0003.3699',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '81',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.83,
                identyfikatorDzialki: '060210_2.0001.81',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '150/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.53,
                identyfikatorDzialki: '060210_2.0001.150/2',
              },
            ],
            rokSprawozdawczy: '2021/2022',
          },
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1093',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.49,
                identyfikatorDzialki: '060209_2.0003.1093',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '414',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.81,
                identyfikatorDzialki: '060209_2.0003.414',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '400',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.400',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3945',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3,
                identyfikatorDzialki: '060209_2.0003.3945',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '164',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.15,
                identyfikatorDzialki: '060210_2.0001.164',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '150/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.53,
                identyfikatorDzialki: '060210_2.0001.150/2',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '81',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.83,
                identyfikatorDzialki: '060210_2.0001.81',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3699',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.56,
                identyfikatorDzialki: '060209_2.0003.3699',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3682',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.19,
                identyfikatorDzialki: '060209_2.0003.3682',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '105',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.51,
                identyfikatorDzialki: '060209_2.0003.105',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.29,
                identyfikatorDzialki: '060209_2.0003.37/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.53,
                identyfikatorDzialki: '060209_2.0003.36/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.86,
                identyfikatorDzialki: '060209_2.0003.35/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.6,
                identyfikatorDzialki: '060209_2.0003.35/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.5,
                identyfikatorDzialki: '060209_2.0003.37/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.53,
                identyfikatorDzialki: '060209_2.0003.36/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.45,
                identyfikatorDzialki: '060209_2.0003.35/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3201',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3201',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3104',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.3,
                identyfikatorDzialki: '060209_2.0003.3104',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.28,
                identyfikatorDzialki: '060209_2.0003.474/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/6',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.27,
                identyfikatorDzialki: '060209_2.0003.474/6',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '455',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.455',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '457',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.457',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '456',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.456',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '458',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.458',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '459',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.459',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '460',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.460',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '461',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.461',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '462',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.462',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.42,
                identyfikatorDzialki: '060209_2.0003.474/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '415',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.82,
                identyfikatorDzialki: '060209_2.0003.415',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1094',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0003.1094',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '406',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0003.406',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '401',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.401',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '363',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.363',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '364',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.364',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3100',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.68,
                identyfikatorDzialki: '060209_2.0003.3100',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3681',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.3,
                identyfikatorDzialki: '060209_2.0003.3681',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3202',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3202',
              },
            ],
            rokSprawozdawczy: '2020/2021',
          },
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2020,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3201',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3201',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2020,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3699',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.56,
                identyfikatorDzialki: '060209_2.0003.3699',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2020,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3104',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.3104',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2020,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3945',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.93,
                identyfikatorDzialki: '060209_2.0003.3945',
              },
            ],
            rokSprawozdawczy: '2019/2020',
          },
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2019,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3699',
                obrebEwidencyjny: {
                  id: '0602092003',
                  label: 'ŁUKOWA',
                },
                powierzchniaUprawy: 2.56,
                identyfikatorDzialki: '060209_2.0003.3699',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2019,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3201',
                obrebEwidencyjny: {
                  id: '0602092003',
                  label: 'ŁUKOWA',
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3201',
              },
            ],
            rokSprawozdawczy: '2018/2019',
          },
        ],
        umowyRokPoprzedni: [
          {
            content: [
              {
                uwagi: 'ZMIANA PODMIOTU',
                rokZbioru: 2024,
                numerUmowy: '426/2/24',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 140000,
                nabywcaSurowca: {
                  id: 381,
                  nip: '9182164030',
                  adres: 'ŁUKOWA 608, 23-412 ŁUKOWA',
                  label: 'ŁUKOWA TOBACCO  SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
                  regon: '361781153',
                },
                dataZawarciaUmowy: '2024-03-15',
              },
            ],
            rokSprawozdawczy: '2024/2025',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2023,
                numerUmowy: '469/2/23',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 136000,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2023-03-15',
              },
            ],
            rokSprawozdawczy: '2023/2024',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2022,
                numerUmowy: '236/2/22',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 130000,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2022-03-15',
              },
            ],
            rokSprawozdawczy: '2022/2023',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2021,
                numerUmowy: '103/2/21',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 125000,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2021-03-15',
              },
            ],
            rokSprawozdawczy: '2021/2022',
          },
          {
            content: [
              {
                uwagi: 'ANEKS',
                rokZbioru: 2020,
                numerUmowy: '292/2/20',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 41000,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2020-03-13',
              },
            ],
            rokSprawozdawczy: '2020/2021',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2019,
                numerUmowy: '378/2/19',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 12000,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2019-03-15',
              },
            ],
            rokSprawozdawczy: '2019/2020',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2018,
                numerUmowy: '302/2/18',
                grupaOdmian: {
                  label: 'I',
                },
                masaSurowca: 12100,
                nabywcaSurowca: {
                  id: 9,
                  nip: '9182161327',
                  adres: '23-412 Łukowa, Łukowa 608',
                  label: 'ŁUKOWA TOBACCO COMPANY SP. Z O.O.',
                  regon: '061413393',
                },
                dataZawarciaUmowy: '2018-03-15',
              },
            ],
            rokSprawozdawczy: '2018/2019',
          },
        ],
        uprawyRokPoprzedni: [
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.43,
                identyfikatorDzialki: '060209_2.0002.474/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.52,
                identyfikatorDzialki: '060209_2.0002.281/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0002.281/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '227/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.21,
                identyfikatorDzialki: '060209_2.0002.227/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '227/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.24,
                identyfikatorDzialki: '060209_2.0002.227/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '260/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.16,
                identyfikatorDzialki: '060209_2.0003.260/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '260/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.3,
                identyfikatorDzialki: '060209_2.0003.260/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '260/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.05,
                identyfikatorDzialki: '060209_2.0003.260/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '261',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.72,
                identyfikatorDzialki: '060209_2.0003.261',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '262',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.72,
                identyfikatorDzialki: '060209_2.0003.262',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '263',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2,
                identyfikatorDzialki: '060209_2.0003.263',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '264',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.19,
                identyfikatorDzialki: '060209_2.0003.264',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3680',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.04,
                identyfikatorDzialki: '060209_2.0003.3680',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3682',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.16,
                identyfikatorDzialki: '060209_2.0003.3682',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3699',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.6,
                identyfikatorDzialki: '060209_2.0003.3699',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3201',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3201',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3104',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.3104',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '2489',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.7,
                identyfikatorDzialki: '060209_2.0003.2489',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3100',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.68,
                identyfikatorDzialki: '060209_2.0003.3100',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/6',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.26,
                identyfikatorDzialki: '060209_2.0003.474/6',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.27,
                identyfikatorDzialki: '060209_2.0003.474/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '461',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.461',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '462',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.462',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '459`',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.459',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '460',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.460',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '457',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.457',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '458',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.458',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '172',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.44,
                identyfikatorDzialki: '060209_2.0002.172',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '182',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.43,
                identyfikatorDzialki: '060209_2.0002.182',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '208',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0002.208',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '337',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.78,
                identyfikatorDzialki: '060209_2.0003.337',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1072',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.65,
                identyfikatorDzialki: '060209_2.0003.1072',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '368',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.35,
                identyfikatorDzialki: '060209_2.0003.368',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '396',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.35,
                identyfikatorDzialki: '060209_2.0003.396',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '2487',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.14,
                identyfikatorDzialki: '060209_2.0003.2487',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1492',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.13,
                identyfikatorDzialki: '060209_2.0003.1492',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '455',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.455',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.32,
                identyfikatorDzialki: '060209_2.0003.35/3',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '164',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.25,
                identyfikatorDzialki: '060210_2.0001.164',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '105',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.51,
                identyfikatorDzialki: '060209_2.0003.105',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '456',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.456',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.05,
                identyfikatorDzialki: '060209_2.0002.281/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1093',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.49,
                identyfikatorDzialki: '060209_2.0003.1093',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1094',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0003.1094',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '406',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0003.406',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '363',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.363',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '364',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.364',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '400',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.400',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '401',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.401',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.32,
                identyfikatorDzialki: '060209_2.0003.36/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.32,
                identyfikatorDzialki: '060209_2.0003.37/1',
              },
            ],
            rokSprawozdawczy: '2024/2025',
          },
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '457',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.457',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '455',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.455',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '456',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.456',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.27,
                identyfikatorDzialki: '060209_2.0003.474/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '461',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.461',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '462',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.462',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '459',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.459',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '460',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.460',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '458',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.458',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '81',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.83,
                identyfikatorDzialki: '060210_2.0001.81',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.55,
                identyfikatorDzialki: '060209_2.0003.35/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.52,
                identyfikatorDzialki: '060209_2.0003.37/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.74,
                identyfikatorDzialki: '060209_2.0003.36/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.07,
                identyfikatorDzialki: '060209_2.0003.35/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.5,
                identyfikatorDzialki: '060209_2.0003.37/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.44,
                identyfikatorDzialki: '060209_2.0003.35/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '401',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.401',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '400',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.400',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '364',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.364',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '363',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.363',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '406',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0003.406',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1094',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0003.1094',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1093',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.49,
                identyfikatorDzialki: '060209_2.0003.1093',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '415',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.86,
                identyfikatorDzialki: '060209_2.0003.415',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '414',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.02,
                identyfikatorDzialki: '060209_2.0003.414',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.52,
                identyfikatorDzialki: '060209_2.0003.36/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '208',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0002.208',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '182',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.43,
                identyfikatorDzialki: '060209_2.0002.182',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '172',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.44,
                identyfikatorDzialki: '060209_2.0002.172',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.28,
                identyfikatorDzialki: '060209_2.0002.281/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.29,
                identyfikatorDzialki: '060209_2.0002.281/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.99,
                identyfikatorDzialki: '060209_2.0002.281/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.43,
                identyfikatorDzialki: '060209_2.0003.474/2',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '150/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.53,
                identyfikatorDzialki: '060210_2.0001.150/2',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '164',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 4.47,
                identyfikatorDzialki: '060210_2.0001.164',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '105',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.51,
                identyfikatorDzialki: '060209_2.0003.105',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3680',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.35,
                identyfikatorDzialki: '060209_2.0003.3680',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3201',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3201',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3104',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.3104',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3100',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.68,
                identyfikatorDzialki: '060209_2.0003.3100',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/6',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.26,
                identyfikatorDzialki: '060209_2.0003.474/6',
              },
            ],
            rokSprawozdawczy: '2023/2024',
          },
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '456',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.456',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '227/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.25,
                identyfikatorDzialki: '060209_2.0002.227/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '227/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.22,
                identyfikatorDzialki: '060209_2.0002.227/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0002.281/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.52,
                identyfikatorDzialki: '060209_2.0002.281/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '281/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.05,
                identyfikatorDzialki: '060209_2.0002.281/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '264',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.5,
                identyfikatorDzialki: '060209_2.0003.264',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '263',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1,
                identyfikatorDzialki: '060209_2.0003.263',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3100',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.68,
                identyfikatorDzialki: '060209_2.0003.3100',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '364',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.364',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '363',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.363',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '401',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.401',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '400',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.400',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '406',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0003.406',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1094',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0003.1094',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1093',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.49,
                identyfikatorDzialki: '060209_2.0003.1093',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '415',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.82,
                identyfikatorDzialki: '060209_2.0003.415',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '414',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.81,
                identyfikatorDzialki: '060209_2.0003.414',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.42,
                identyfikatorDzialki: '060209_2.0003.474/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '462',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.462',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '461',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.461',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '460',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.460',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '459',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.459',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '458',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.458',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '457',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.457',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '455',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.455',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/6',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.27,
                identyfikatorDzialki: '060209_2.0003.474/6',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.28,
                identyfikatorDzialki: '060209_2.0003.474/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3104',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.3,
                identyfikatorDzialki: '060209_2.0003.3104',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3201',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3201',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.45,
                identyfikatorDzialki: '060209_2.0003.35/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.53,
                identyfikatorDzialki: '060209_2.0003.36/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.5,
                identyfikatorDzialki: '060209_2.0003.37/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.6,
                identyfikatorDzialki: '060209_2.0003.35/3',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.86,
                identyfikatorDzialki: '060209_2.0003.35/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.53,
                identyfikatorDzialki: '060209_2.0003.36/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.29,
                identyfikatorDzialki: '060209_2.0003.37/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '105',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.51,
                identyfikatorDzialki: '060209_2.0003.105',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3682',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.19,
                identyfikatorDzialki: '060209_2.0003.3682',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3699',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.56,
                identyfikatorDzialki: '060209_2.0003.3699',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '81',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.83,
                identyfikatorDzialki: '060210_2.0001.81',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '150/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.53,
                identyfikatorDzialki: '060210_2.0001.150/2',
              },
            ],
            rokSprawozdawczy: '2022/2023',
          },
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1094',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.47,
                identyfikatorDzialki: '060209_2.0003.1094',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '415',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.82,
                identyfikatorDzialki: '060209_2.0003.415',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '414',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.81,
                identyfikatorDzialki: '060209_2.0003.414',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3202',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3202',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3681',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.3,
                identyfikatorDzialki: '060209_2.0003.3681',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3945',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3,
                identyfikatorDzialki: '060209_2.0003.3945',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3100',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.68,
                identyfikatorDzialki: '060209_2.0003.3100',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '364',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.364',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '363',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.363',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '401',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.401',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '400',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.400',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '406',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.78,
                identyfikatorDzialki: '060209_2.0003.406',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '1093',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.49,
                identyfikatorDzialki: '060209_2.0003.1093',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.5,
                identyfikatorDzialki: '060209_2.0003.37/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.53,
                identyfikatorDzialki: '060209_2.0003.36/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.45,
                identyfikatorDzialki: '060209_2.0003.35/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3201',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3201',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3104',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.3,
                identyfikatorDzialki: '060209_2.0003.3104',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/5',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.28,
                identyfikatorDzialki: '060209_2.0003.474/5',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/6',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.27,
                identyfikatorDzialki: '060209_2.0003.474/6',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '455',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.455',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '457',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.457',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '456',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.456',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '458',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.11,
                identyfikatorDzialki: '060209_2.0003.458',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '459',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.459',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '460',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.460',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '461',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.461',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '462',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.16,
                identyfikatorDzialki: '060209_2.0003.462',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '474/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.42,
                identyfikatorDzialki: '060209_2.0003.474/2',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '164',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.15,
                identyfikatorDzialki: '060210_2.0001.164',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '150/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.53,
                identyfikatorDzialki: '060210_2.0001.150/2',
              },
              {
                gmina: {
                  id: '0602102',
                  label: 'OBSZA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '81',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.83,
                identyfikatorDzialki: '060210_2.0001.81',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3699',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.56,
                identyfikatorDzialki: '060209_2.0003.3699',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3682',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 3.19,
                identyfikatorDzialki: '060209_2.0003.3682',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '105',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.51,
                identyfikatorDzialki: '060209_2.0003.105',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '37/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.29,
                identyfikatorDzialki: '060209_2.0003.37/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '36/1',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.53,
                identyfikatorDzialki: '060209_2.0003.36/1',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/2',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.86,
                identyfikatorDzialki: '060209_2.0003.35/2',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '35/3',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 1.6,
                identyfikatorDzialki: '060209_2.0003.35/3',
              },
            ],
            rokSprawozdawczy: '2021/2022',
          },
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2020,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3699',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.56,
                identyfikatorDzialki: '060209_2.0003.3699',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2020,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3104',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.37,
                identyfikatorDzialki: '060209_2.0003.3104',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2020,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3945',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.93,
                identyfikatorDzialki: '060209_2.0003.3945',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2020,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3201',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3201',
              },
            ],
            rokSprawozdawczy: '2020/2021',
          },
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2019,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3201',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 0.38,
                identyfikatorDzialki: '060209_2.0003.3201',
              },
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2019,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3699',
                obrebEwidencyjny: {
                  id: null,
                  label: null,
                },
                powierzchniaUprawy: 2.56,
                identyfikatorDzialki: '060209_2.0003.3699',
              },
            ],
            rokSprawozdawczy: '2019/2020',
          },
          {
            content: [
              {
                gmina: {
                  id: '0602092',
                  label: 'ŁUKOWA',
                },
                uwagi: null,
                powiat: {
                  id: '0602',
                  label: 'BIŁGORAJSKI',
                },
                rokZbioru: 2018,
                grupaOdmian: {
                  label: 'I',
                },
                wojewodztwo: {
                  id: '06',
                  label: 'LUBELSKIE',
                },
                numerDzialki: '3945',
                obrebEwidencyjny: {
                  id: '0602092003',
                  label: 'ŁUKOWA',
                },
                powierzchniaUprawy: 2.99,
                identyfikatorDzialki: '060209_2.0003.3945',
              },
            ],
            rokSprawozdawczy: '2018/2019',
          },
        ],
        zniszczenieSurowca: [
          {
            content: [
              {
                uwagi: null,
                grupaOdmian: {
                  label: 'I',
                },
                masaZniszczonegoSurowca: 0,
              },
            ],
            rokSprawozdawczy: '2024/2025',
          },
          {
            content: [
              {
                uwagi: null,
                grupaOdmian: {
                  label: 'I',
                },
                masaZniszczonegoSurowca: 0,
              },
            ],
            rokSprawozdawczy: '2023/2024',
          },
          {
            content: [
              {
                uwagi: null,
                grupaOdmian: {
                  label: 'I',
                },
                masaZniszczonegoSurowca: 0,
              },
            ],
            rokSprawozdawczy: '2022/2023',
          },
          {
            content: [
              {
                uwagi: null,
                grupaOdmian: {
                  label: 'I',
                },
                masaZniszczonegoSurowca: 0,
              },
            ],
            rokSprawozdawczy: '2021/2022',
          },
          {
            content: [
              {
                uwagi: null,
                grupaOdmian: {
                  label: 'I',
                },
                masaZniszczonegoSurowca: 0,
              },
            ],
            rokSprawozdawczy: '2020/2021',
          },
          {
            content: [
              {
                uwagi: null,
                grupaOdmian: {
                  label: 'I',
                },
                masaZniszczonegoSurowca: 0,
              },
            ],
            rokSprawozdawczy: '2019/2020',
          },
          {
            content: [
              {
                uwagi: null,
                grupaOdmian: {
                  label: 'I',
                },
                masaZniszczonegoSurowca: 0,
              },
            ],
            rokSprawozdawczy: '2018/2019',
          },
        ],
        szacunkowaProdukcja: [
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2024,
                grupaOdmian: {
                  label: 'I',
                },
                masaWyprodukowanegoSurowca: 112847.4,
              },
            ],
            rokSprawozdawczy: '2024/2025',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2023,
                grupaOdmian: {
                  label: 'I',
                },
                masaWyprodukowanegoSurowca: 96909.5,
              },
            ],
            rokSprawozdawczy: '2023/2024',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2022,
                grupaOdmian: {
                  label: 'I',
                },
                masaWyprodukowanegoSurowca: 121433.4,
              },
            ],
            rokSprawozdawczy: '2022/2023',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2021,
                grupaOdmian: {
                  label: 'I',
                },
                masaWyprodukowanegoSurowca: 124966.2,
              },
            ],
            rokSprawozdawczy: '2021/2022',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2020,
                grupaOdmian: {
                  label: 'I',
                },
                masaWyprodukowanegoSurowca: 40354,
              },
            ],
            rokSprawozdawczy: '2020/2021',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2019,
                grupaOdmian: {
                  label: 'I',
                },
                masaWyprodukowanegoSurowca: 11200,
              },
            ],
            rokSprawozdawczy: '2019/2020',
          },
          {
            content: [
              {
                uwagi: null,
                rokZbioru: 2018,
                grupaOdmian: {
                  label: 'I',
                },
                masaWyprodukowanegoSurowca: 12030,
              },
            ],
            rokSprawozdawczy: '2018/2019',
          },
        ],
      },
    },
    schema: {
      type: 'object',
      properties: {
        grupaProducent: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                staticContent297: {
                  content:
                    '<div style="background:var(--v-surface-base,#fafafa);border-radius:12px;padding:18px 20px;border:1px solid var(--v-surface-border,#e0e0e0);font-size:0.875rem;">\n  <div style="font-size:1.125rem;font-weight:600;margin-bottom:12px;color:var(--v-text-primary,#111);">\n    <span class="mdi mdi-card-account-details" style="vertical-align:middle;margin-right:8px;color:var(--v-primary-base,#1976d2);"></span>\n    Dane identyfikacyjne\n  </div>\n\n  <!-- Nazwa -->\n  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);">\n      <span class="mdi mdi-account" style="margin-right:4px;"></span> Nazwa / Nazwisko\n    </span>\n    <span style="color:var(--v-text-primary,#111);">{nazwaLubNazwisko ? $uppercase(nazwaLubNazwisko) : }</span>\n  </div>\n\n  <!-- Imię -->\n  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);">\n      <span class="mdi mdi-account-outline" style="margin-right:4px;"></span> Imię\n    </span>\n    <span style="color:var(--v-text-primary,#111);">{imie ? $uppercase(imie): }</span>\n  </div>\n\n  <!-- EP -->\n  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);">\n      <span class="mdi mdi-card-account-details-outline" style="margin-right:4px;"></span> EP\n    </span>\n    <span style="color:var(--v-text-primary,#111);">{nrEp: }</span>\n  </div>\n\n  <!-- NIP -->\n  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);">\n      <span class="mdi mdi-file-document-outline" style="margin-right:4px;"></span> NIP\n    </span>\n    <span style="color:var(--v-text-primary,#111);">{nip: }</span>\n  </div>\n\n  <!-- PESEL -->\n  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);">\n      <span class="mdi mdi-fingerprint" style="margin-right:4px;"></span> PESEL\n    </span>\n    <span style="color:var(--v-text-primary,#111);">{pesel: }</span>\n  </div>\n\n  <!-- REGON -->\n  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);">\n      <span class="mdi mdi-office-building-outline" style="margin-right:4px;"></span> REGON\n    </span>\n    <span style="color:var(--v-text-primary,#111);">{regon: }</span>\n  </div>\n\n  <!-- KRS -->\n  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);">\n      <span class="mdi mdi-file-cabinet" style="margin-right:4px;"></span> KRS\n    </span>\n    <span style="color:var(--v-text-primary,#111);">{krs ? $uppercase(krs) : }</span>\n  </div>\n\n  <!-- NR PASZPORTU -->\n  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);">\n      <span class="mdi mdi-passport" style="margin-right:4px;"></span> Nr paszportu / inny dok. toż.\n    </span>\n    <span style="color:var(--v-text-primary,#111);">{nrPaszportuLubInnegoDokToz ? $uppercase(nrPaszportuLubInnegoDokToz) : }</span>\n  </div>\n  \n    <!-- DATA WPISU -->\n  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);">\n      <span class="mdi mdi-calendar-plus" style="margin-right:4px;"></span> Data wpisu\n    </span>\n    <span style="color:var(--v-text-primary,#111);">{dodanoWnioskiemDnia: }</span>\n  </div>\n\n  <!-- DATA OSTATNIEJ AKTUALIZACJI -->\n  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);">\n      <span class="mdi mdi-calendar-refresh" style="margin-right:4px;"></span> Data ostatniej aktualizacji\n    </span>\n    <span style="color:var(--v-text-primary,#111);">{ostatnioZaktualizowanoWnioskiemDnia: }</span>\n  </div>\n\n  <!-- DATA WYKREŚLENIA -->\n  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);">\n      <span class="mdi mdi-calendar-remove" style="margin-right:4px;"></span> Data wykreślenia\n    </span>\n    <span style="color:var(--v-text-primary,#111);">{wykreslonoWnioskiemDnia: }</span>\n  </div>\n\n  <!-- STATUS -->\n  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);">\n      <span class="mdi mdi-information-outline" style="margin-right:4px;"></span> Status\n    </span>\n    <span style="color:var(--v-text-primary,#111);">{status ? $uppercase(status) : }</span>\n  </div>\n\n</div>\n',
                  layout: {
                    tag: 'span',
                    component: 'static-content',
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                    fillRow: true,
                  },
                },
                producent: {
                  properties: {
                    divider798: {
                      thickness: 1,
                      layout: {
                        component: 'divider',
                        cols: {
                          xs: 12,
                          sm: 12,
                          md: 12,
                          lg: 8,
                          xl: 8,
                          xxl: 8,
                        },
                        fillRow: true,
                      },
                      opacity: '100',
                    },
                  },
                },
                staticContent786: {
                  content:
                    '<!-- KARTA ADRES -->\n<div style="font-size:0.875rem;flex:1;min-width:300px;background:var(--v-surface-base,#fafafa);border-radius:12px;padding:18px 20px;border:1px solid var(--v-surface-border,#e0e0e0);">\n  <div style="font-size:1.125rem;font-weight:600;margin-bottom:12px;color:var(--v-text-primary,#111);">\n    <span class="mdi mdi-home" style="vertical-align:middle;margin-right:8px;color:var(--v-primary-base,#1976d2);"></span>\n    Adres\n  </div>\n\n  <!-- Miejscowość -->\n  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);white-space:nowrap;">Miejscowość</span>\n    <span style="flex:1;text-align:right;color:var(--v-text-primary,#111);word-break:break-word;">{adresPodstawowyMiejscowoscNazwa ? $uppercase(adresPodstawowyMiejscowoscNazwa): }</span>\n  </div>\n\n  <!-- Ulica / Nr -->\n  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);white-space:nowrap;">Ulica / Nr</span>\n    <span style="flex:1;text-align:right;color:var(--v-text-primary,#111);word-break:break-word;">\n      {adresPodstawowyUlica ? $uppercase(adresPodstawowyUlica): }\n      {adresPodstawowyNrDomu: }\n      {adresPodstawowyNrMieszkania ? " / " & adresPodstawowyNrMieszkania : }\n    </span>\n  </div>\n\n  <!-- Kod pocztowy / Poczta -->\n  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);white-space:nowrap;">Kod pocztowy / Poczta</span>\n    <span style="flex:1;text-align:right;color:var(--v-text-primary,#111);word-break:break-word;">\n      {adresPodstawowyKodPocztowy: }\n      {adresPodstawowyPoczta ? $uppercase(adresPodstawowyPoczta): }\n    </span>\n  </div>\n\n  <!-- Województwo -->\n  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);white-space:nowrap;">Województwo</span>\n    <span style="flex:1;text-align:right;color:var(--v-text-primary,#111);word-break:break-word;">{adresPodstawowyWojewodztwoNazwa ? $uppercase(adresPodstawowyWojewodztwoNazwa): }</span>\n  </div>\n\n  <!-- Powiat -->\n  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);white-space:nowrap;">Powiat</span>\n    <span style="flex:1;text-align:right;color:var(--v-text-primary,#111);word-break:break-word;">{adresPodstawowyPowiatNazwa ? $uppercase(adresPodstawowyPowiatNazwa) : }</span>\n  </div>\n\n  <!-- Gmina -->\n  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);white-space:nowrap;">Gmina</span>\n    <span style="flex:1;text-align:right;color:var(--v-text-primary,#111);word-break:break-word;">{adresPodstawowyGminaNazwa ? $uppercase(adresPodstawowyGminaNazwa) : }</span>\n  </div>\n\n  <!-- Skrytka pocztowa -->\n  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:6px;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);white-space:nowrap;">Skrytka pocztowa</span>\n    <span style="flex:1;text-align:right;color:var(--v-text-primary,#111);word-break:break-word;">{adresPodstawowyNrSkrytkiPocztowej ? $uppercase(adresPodstawowyNrSkrytkiPocztowej): }</span>\n  </div>\n\n  <!-- Adres korespondencyjny -->\n  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:0;">\n    <span style="font-weight:500;color:var(--v-text-secondary,#555);white-space:nowrap;">Adres korespondencyjny</span>\n    <span style="flex:1;text-align:right;color:var(--v-text-primary,#111);white-space:normal;word-break:keep-all;">{adresKorespondencyjny ? $uppercase(adresKorespondencyjny): }</span>\n  </div>\n</div>\n',
                  layout: {
                    tag: 'span',
                    component: 'static-content',
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                  },
                },
                staticContent498: {
                  content:
                    ' <!-- KARTA KONTAKT -->\n  <div style="font-size:0.875rem;flex:1;min-width:300px;background:var(--v-surface-base,#fafafa);border-radius:12px;padding:18px 20px;border:1px solid var(--v-surface-border,#e0e0e0);">\n    <div style="font-size:1.125rem;font-weight:600;margin-bottom:12px;color:var(--v-text-primary,#111);">\n      <span class="mdi mdi-phone" style="vertical-align:middle;margin-right:8px;color:var(--v-primary-base,#1976d2);"></span>\n      Kontakt\n    </div>\n\n    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">\n      <span style="font-weight:500;color:var(--v-text-secondary,#555);">Telefon</span>\n      <span style="color:var(--v-text-primary,#111);">{adresPodstawowyTelefon: }</span>\n    </div>\n\n    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">\n      <span style="font-weight:500;color:var(--v-text-secondary,#555);">Faks</span>\n      <span style="color:var(--v-text-primary,#111);">{adresPodstawowyFaks ? $uppercase(adresPodstawowyFaks) : }</span>\n    </div>\n\n    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0;">\n      <span style="font-weight:500;color:var(--v-text-secondary,#555);">E-mail</span>\n      <span style="color:var(--v-text-primary,#111);">{adresPodstawowyEmail ? $uppercase(adresPodstawowyEmail) : }</span>\n    </div>\n  </div>',
                  layout: {
                    tag: 'p',
                    component: 'static-content',
                    cols: {
                      xs: 12,
                      sm: 12,
                      md: 12,
                      lg: 4,
                      xl: 4,
                      xxl: 4,
                    },
                  },
                },
              },
            },
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            if: '',
            props: {
              readonly: true,
            },
          },
        },
        divider230: {
          thickness: 2,
          layout: {
            component: 'divider',
          },
          opacity: '100',
        },
        zakladkiRejestrProducentow: {
          label: 'Zakładki',
          layout: {
            fillRow: true,
            component: 'bookmark',
          },
          source: {
            items: [
              {
                value: 'przechowywanieSurowca',
                title: 'Przechowywanie',
                icon: 'mdi-home-silo',
              },
              {
                value: 'uprawyRokPoprzedni',
                title: 'Uprawy rok poprzedni',
                icon: 'mdi-home-silo',
              },
              {
                value: 'umowyRokPoprzedni',
                title: 'Umowy rok poprzedni',
                icon: 'mdi-file-document-multiple',
              },
              {
                value: 'szacunkowaProdukcja',
                title: 'Szacunkowa produkcja',
                icon: 'mdi-leaf',
              },
              {
                value: 'dostawy',
                title: 'Dostawy',
                icon: 'mdi-truck',
              },
              {
                value: 'stanMagazynowy',
                title: 'Stan magazynowy',
                icon: 'mdi-warehouse',
              },
              {
                value: 'zniszczenieSurowca',
                title: 'Zniszczenie surowca',
                icon: 'mdi-leaf-off',
              },
              {
                value: 'uprawyRokBiezacy',
                title: 'Uprawy rok bieżący',
                icon: 'mdi-home-silo',
              },
              {
                value: 'umowyRokBiezacy',
                title: 'Umowy rok bieżący',
                icon: 'mdi-file-document-multiple',
              },
              {
                value: 'listaDokumentow',
                title: 'Lista dokumentów',
                icon: 'mdi-file',
              },
            ],
          },
          onChange: [],
          'bg-color': '#EEEEEE',
          color: '#005E4F',
          direction: 'horizontal',
        },
        grupaPrzechowywanieSurowca: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                przechowywanieSurowca: {
                  layout: {
                    component: 'table-internal',
                  },
                  source: {
                    headers: [
                      {
                        title: 'Rodzaj',
                        key: 'typMiejscaNazwa',
                        type: 'TEXT',
                        valueMapping: 'typMiejscaNazwa',
                      },
                      {
                        title: 'Województwo',
                        key: 'adresWojewodztwoNazwa',
                        type: 'TEXT',
                        valueMapping: 'adresWojewodztwoNazwa',
                      },
                      {
                        title: 'Powiat',
                        key: 'adresPowiatNazwa',
                        type: 'TEXT',
                        valueMapping: 'adresPowiatNazwa',
                      },
                      {
                        title: 'Gmina',
                        key: 'adresGminaNazwa',
                        type: 'TEXT',
                        valueMapping: 'adresGminaNazwa',
                      },
                      {
                        title: 'Miejscowość',
                        key: 'adresMiejscowoscNazwa',
                        type: 'TEXT',
                        valueMapping: 'adresMiejscowoscNazwa',
                      },
                      {
                        title: 'Ulica',
                        key: 'adresUlica',
                        type: 'TEXT',
                        valueMapping: 'adresUlica',
                      },
                      {
                        title: 'Numer',
                        key: 'adresNumer',
                        type: 'TEXT',
                        valueMapping: 'adresNumer',
                      },
                      {
                        title: 'Kod pocztowy',
                        key: 'adresKodPocztowy',
                        type: 'TEXT',
                        valueMapping: 'adresKodPocztowy',
                      },
                      {
                        title: 'Poczta',
                        key: 'adresPoczta',
                        type: 'TEXT',
                        valueMapping: 'adresPoczta',
                      },
                      {
                        title: 'Telefon',
                        key: 'telefon',
                        type: 'TEXT',
                        valueMapping: 'telefon',
                      },
                      {
                        title: 'Uwagi',
                        key: 'uwagi',
                        type: 'TEXT',
                        valueMapping: 'uwagi',
                      },
                    ],
                    buttons: [],
                  },
                  actions: {},
                  onChange: [],
                },
              },
            },
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            hide: "nata(zakladkiRejestrProducentow!='przechowywanieSurowca')",
            props: {
              readonly: true,
            },
          },
        },
        grupaUprawyRokPoprzedni: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                empty: {
                  content: '<center><b>Brak danych</b></center>',
                  layout: {
                    tag: 'span',
                    component: 'static-content',
                    if: 'nata(informacjeRoczne.uprawyRokPoprzedni = null or $count(informacjeRoczne.uprawyRokPoprzedni) = 0)',
                  },
                },
                informacjeRoczne: {
                  type: 'object',
                  properties: {
                    uprawyRokPoprzedni: {
                      layout: {
                        component: 'duplicated-section',
                        schema: {
                          type: 'object',
                          properties: {
                            uprawyRokPoprzedniYear: {
                              layout: {
                                component: 'expansion-panels',
                                if: '',
                              },
                              panels: [
                                {
                                  title:
                                    'Informacja za rok {informacjeRoczne.uprawyRokPoprzedni[].rokSprawozdawczy: }',
                                  titleIcon: '',
                                  titleIconSize: 12,
                                  schema: {
                                    type: 'object',
                                    properties: {
                                      content: {
                                        layout: {
                                          component: 'table-internal',
                                        },
                                        source: {
                                          data: '',
                                          headers: [
                                            {
                                              title: 'Grupa odmian',
                                              type: 'TEXT',
                                              editable: false,
                                              color: '',
                                              key: 'grupaOdmian',
                                              properties: {},
                                              valueMapping: 'grupaOdmian.label',
                                            },
                                            {
                                              title: 'Rok zbioru',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'rokZbioru',
                                              valueMapping: 'rokZbioru',
                                            },
                                            {
                                              title: 'Województwo',
                                              type: 'TEXT',
                                              key: 'wojewodztwo',
                                              editable: false,
                                              properties: {},
                                              valueMapping: '{wojewodztwo.label:}',
                                            },
                                            {
                                              title: 'Powiat',
                                              type: 'TEXT',
                                              key: 'powiat',
                                              editable: false,
                                              properties: {},
                                              valueMapping: '{powiat.label:}',
                                            },
                                            {
                                              title: 'Gmina',
                                              type: 'TEXT',
                                              key: 'gmina',
                                              editable: false,
                                              properties: {},
                                              valueMapping: '{gmina.label:}',
                                            },
                                            {
                                              title: 'Obręb ewidencyjny',
                                              type: 'TEXT',
                                              editable: false,
                                              key: 'obrebEwidencyjny',
                                              properties: {},
                                              valueMapping: '{obrebEwidencyjny.label: }',
                                            },
                                            {
                                              title: 'Nr działki ewiden.',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'numerDzialki',
                                              valueMapping: 'numerDzialki',
                                            },
                                            {
                                              title: 'Identyfikator działki ewiden.',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'identyfikatorDzialki',
                                              valueMapping: 'identyfikatorDzialki',
                                            },
                                            {
                                              title: 'Pow. uprawy na działce ewiden (ha)',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'powierzchniaUprawy',
                                              valueMapping: 'powierzchniaUprawy',
                                            },
                                            {
                                              title: 'Uwagi',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'uwagi',
                                              valueMapping: 'uwagi',
                                            },
                                          ],
                                          buttons: [],
                                        },
                                        actions: {},
                                        onChange: [],
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                        options: {
                          addBtnText: 'Add element',
                          showDivider: false,
                          ordinalNumberInModel: false,
                          showFirstInitRow: false,
                        },
                        if: 'nata($count(informacjeRoczne.uprawyRokPoprzedni) > 0)',
                        cellClass: '',
                      },
                      editable: false,
                      showElements: false,
                      onChange: [],
                    },
                  },
                },
              },
            },
            hide: "nata(zakladkiRejestrProducentow!='uprawyRokPoprzedni')",
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            if: '',
            props: {
              readonly: true,
            },
            cellClass: '',
          },
        },
        grupaUmowyRokPoprzedni: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                empty: {
                  content: '<center><b>Brak danych</b></center>',
                  layout: {
                    tag: 'span',
                    component: 'static-content',
                    if: 'nata(informacjeRoczne.umowyRokPoprzedni = null or $count(informacjeRoczne.umowyRokPoprzedni) = 0)',
                  },
                  label: 'empty-1565c723-10-clone',
                },
                informacjeRoczne: {
                  type: 'object',
                  properties: {
                    umowyRokPoprzedni: {
                      layout: {
                        component: 'duplicated-section',
                        schema: {
                          type: 'object',
                          properties: {
                            umowyRokPoprzedniYear: {
                              layout: {
                                component: 'expansion-panels',
                              },
                              panels: [
                                {
                                  title:
                                    'Informacja za rok {informacjeRoczne.umowyRokPoprzedni[].rokSprawozdawczy: }',
                                  titleIcon: '',
                                  titleIconSize: 20,
                                  schema: {
                                    type: 'object',
                                    properties: {
                                      content: {
                                        layout: {
                                          component: 'table-internal',
                                        },
                                        source: {
                                          data: '',
                                          headers: [
                                            {
                                              title: 'Nazwa nabywcy',
                                              key: 'nazwaNabywcy',
                                              valueMapping: '{nabywcaSurowca.label:-}',
                                              type: 'TEXT',
                                              properties: {},
                                            },
                                            {
                                              title: 'Adres nabywcy',
                                              type: 'TEXT',
                                              key: 'adresNabywcy',
                                              valueMapping: '{nabywcaSurowca.adres:-}',
                                              properties: {},
                                            },
                                            {
                                              title: 'NIP nabywcy',
                                              key: 'nipNabywcy',
                                              valueMapping: '{nabywcaSurowca.nip:-}',
                                              type: 'TEXT',
                                            },
                                            {
                                              title: 'REGON nabywcy',
                                              key: 'regonNabywcy',
                                              valueMapping: '{nabywcaSurowca.regon:-}',
                                              type: 'TEXT',
                                            },
                                            {
                                              title: 'Nr umowy',
                                              key: 'numerUmowy',
                                              valueMapping: 'numerUmowy',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                            },
                                            {
                                              title: 'Data zawarcia umowy',
                                              key: 'dataZawarciaUmowy',
                                              valueMapping: 'dataZawarciaUmowy',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                            },
                                            {
                                              title: 'Grupa odmian',
                                              key: 'grupaOdmian',
                                              type: 'TEXT',
                                              editable: false,
                                              valueMapping: 'grupaOdmian.label',
                                              properties: {},
                                            },
                                            {
                                              title: 'Rok zbioru',
                                              key: 'rokZbioru',
                                              valueMapping: 'rokZbioru',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                            },
                                            {
                                              title: 'Masa surowca (kg)',
                                              properties: {},
                                              key: 'masaSurowca',
                                              valueMapping: 'masaSurowca',
                                              type: 'TEXT',
                                              editable: false,
                                            },
                                            {
                                              title: 'Uwagi',
                                              properties: {},
                                              key: 'uwagi',
                                              valueMapping: 'uwagi',
                                              type: 'TEXT',
                                              editable: false,
                                            },
                                          ],
                                          buttons: [],
                                        },
                                        actions: {},
                                        onChange: [],
                                        label: 'uprawyRokPoprzedni475Clone',
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                        options: {
                          addBtnText: 'Add element',
                          showDivider: false,
                          ordinalNumberInModel: false,
                          showFirstInitRow: false,
                        },
                        if: 'nata($count(informacjeRoczne.umowyRokPoprzedni) > 0)',
                        cellClass: '',
                      },
                      editable: false,
                      showElements: false,
                      onChange: [],
                    },
                  },
                },
              },
            },
            if: '',
            hide: "nata(zakladkiRejestrProducentow!='umowyRokPoprzedni')",
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            props: {
              readonly: true,
            },
          },
        },
        grupaSzacunkowaProdukcja: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                empty: {
                  content: '<center><b>Brak danych</b></center>',
                  layout: {
                    tag: 'span',
                    component: 'static-content',
                    if: 'nata(informacjeRoczne.szacunkowaProdukcja = null or $count(informacjeRoczne.szacunkowaProdukcja) = 0)',
                  },
                  label: 'empty-1565c723-10-clone',
                },
                informacjeRoczne: {
                  type: 'object',
                  properties: {
                    szacunkowaProdukcja: {
                      layout: {
                        component: 'duplicated-section',
                        schema: {
                          type: 'object',
                          properties: {
                            szacunkowaProdukcjaYear: {
                              layout: {
                                component: 'expansion-panels',
                              },
                              panels: [
                                {
                                  title:
                                    'Informacja za rok {informacjeRoczne.szacunkowaProdukcja[].rokSprawozdawczy: }',
                                  titleIcon: '',
                                  titleIconSize: 20,
                                  schema: {
                                    type: 'object',
                                    properties: {
                                      content: {
                                        layout: {
                                          component: 'table-internal',
                                        },
                                        source: {
                                          data: '',
                                          headers: [
                                            {
                                              title: 'Grupa odmian',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'grupaOdmian',
                                              valueMapping: 'grupaOdmian.label',
                                            },
                                            {
                                              title: 'Rok zbioru',
                                              type: 'NUMBER',
                                              editable: false,
                                              properties: {},
                                              key: 'rokZbioru',
                                              valueMapping: 'rokZbioru',
                                            },
                                            {
                                              title: 'Masa wyprodukowanego surowca (kg)',
                                              type: 'NUMBER',
                                              editable: false,
                                              properties: {},
                                              key: 'masaWyprodukowanegoSurowca',
                                              valueMapping: 'masaWyprodukowanegoSurowca',
                                            },
                                            {
                                              title: 'Uwagi',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'uwagi',
                                              valueMapping: 'uwagi',
                                            },
                                          ],
                                          buttons: [],
                                        },
                                        actions: {},
                                        onChange: [],
                                        label: 'umowyRokPoprzedni392Clone',
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                        options: {
                          addBtnText: 'Add element',
                          showDivider: false,
                          ordinalNumberInModel: false,
                          showFirstInitRow: false,
                        },
                        if: 'nata($count(informacjeRoczne.szacunkowaProdukcja) > 0)',
                        cellClass: '',
                      },
                      editable: false,
                      showElements: false,
                      onChange: [],
                    },
                  },
                },
              },
            },
            if: '',
            hide: "nata(zakladkiRejestrProducentow!='szacunkowaProdukcja')",
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            props: {
              readonly: true,
            },
          },
        },
        grupaDostawy: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                empty: {
                  content: '<center><b>Brak danych</b></center>',
                  layout: {
                    tag: 'span',
                    component: 'static-content',
                    if: 'nata(informacjeRoczne.dostawy = null or $count(informacjeRoczne.dostawy) = 0)',
                  },
                },
                informacjeRoczne: {
                  type: 'object',
                  properties: {
                    dostawy: {
                      layout: {
                        component: 'duplicated-section',
                        schema: {
                          type: 'object',
                          properties: {
                            dostawyYear: {
                              layout: {
                                component: 'expansion-panels',
                                if: '',
                              },
                              panels: [
                                {
                                  title:
                                    'Informacja za rok {informacjeRoczne.dostawy[].rokSprawozdawczy: }',
                                  titleIcon: '',
                                  titleIconSize: 12,
                                  schema: {
                                    type: 'object',
                                    properties: {
                                      content: {
                                        layout: {
                                          component: 'table-internal',
                                        },
                                        source: {
                                          data: '',
                                          headers: [
                                            {
                                              title: 'Nazwa nabywcy',
                                              key: 'nazwaNabywcy',
                                              type: 'TEXT',
                                              properties: {},
                                              valueMapping: '{nabywcaSurowca.label:-}',
                                            },
                                            {
                                              title: 'Nr umowy',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'numerUmowy',
                                              valueMapping: 'numerUmowy',
                                            },
                                            {
                                              title: 'Data zawarcia umowy',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'dataZawarciaUmowy',
                                              valueMapping: 'dataZawarciaUmowy',
                                            },
                                            {
                                              title: 'Grupa odmian',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'grupaOdmian',
                                              valueMapping: 'grupaOdmian.label',
                                            },
                                            {
                                              title: 'Rok zbioru',
                                              type: 'NUMBER',
                                              editable: false,
                                              properties: {},
                                              key: 'rokZbioru',
                                              valueMapping: 'rokZbioru',
                                            },
                                            {
                                              title: 'Masa surowca (kg)',
                                              type: 'NUMBER',
                                              editable: false,
                                              properties: {},
                                              key: 'masaSurowca',
                                              valueMapping: 'masaSurowca',
                                            },
                                            {
                                              title: 'Uwagi',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'uwagi',
                                              valueMapping: 'uwagi',
                                            },
                                          ],
                                          buttons: [],
                                        },
                                        actions: {},
                                        onChange: [],
                                        label: 'umowyRokPoprzedni885Clone',
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                        options: {
                          addBtnText: 'Add element',
                          showDivider: false,
                          ordinalNumberInModel: false,
                          showFirstInitRow: false,
                        },
                        if: 'nata($count(informacjeRoczne.dostawy) > 0)',
                        cellClass: '',
                      },
                      editable: false,
                      showElements: false,
                      onChange: [],
                    },
                  },
                },
              },
            },
            hide: "nata(zakladkiRejestrProducentow!='dostawy')",
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            if: '',
            props: {
              readonly: true,
            },
            cellClass: '',
          },
        },
        grupaStanMagazynowy: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                empty: {
                  content: '<center><b>Brak danych</b></center>',
                  layout: {
                    tag: 'span',
                    component: 'static-content',
                    if: 'nata(informacjeRoczne.stanMagazynowy = null or $count(informacjeRoczne.stanMagazynowy) = 0)',
                  },
                },
                informacjeRoczne: {
                  type: 'object',
                  properties: {
                    stanMagazynowy: {
                      layout: {
                        component: 'duplicated-section',
                        schema: {
                          type: 'object',
                          properties: {
                            stanMagazynowyYear: {
                              layout: {
                                component: 'expansion-panels',
                                if: '',
                              },
                              panels: [
                                {
                                  title:
                                    'Informacja za rok {informacjeRoczne.stanMagazynowy[].rokSprawozdawczy: }',
                                  titleIcon: '',
                                  titleIconSize: 12,
                                  schema: {
                                    type: 'object',
                                    properties: {
                                      content: {
                                        layout: {
                                          component: 'table-internal',
                                        },
                                        source: {
                                          data: '',
                                          headers: [
                                            {
                                              title: 'Grupa odmian',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'grupaOdmian',
                                              valueMapping: 'grupaOdmian.label',
                                            },
                                            {
                                              title: 'Rok zbioru',
                                              type: 'NUMBER',
                                              editable: false,
                                              properties: {},
                                              key: 'rokZbioru',
                                              valueMapping: 'rokZbioru',
                                            },
                                            {
                                              title: 'Szacunkowy stan magazynowy surowca (kg)',
                                              type: 'NUMBER',
                                              editable: false,
                                              properties: {},
                                              key: 'szacunkowyStanMagazynowySurowca',
                                              valueMapping: 'szacunkowyStanMagazynowySurowca',
                                            },
                                            {
                                              title: 'Uwagi',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'uwagi',
                                              valueMapping: 'uwagi',
                                            },
                                          ],
                                          buttons: [],
                                        },
                                        actions: {},
                                        onChange: [],
                                        label: 'szacunkowaProdukcja922Clone',
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                        options: {
                          addBtnText: 'Add element',
                          showDivider: false,
                          ordinalNumberInModel: false,
                          showFirstInitRow: false,
                        },
                        if: 'nata($count(informacjeRoczne.stanMagazynowy) > 0)',
                        cellClass: '',
                      },
                      editable: false,
                      showElements: false,
                      onChange: [],
                    },
                  },
                },
              },
            },
            hide: "nata(zakladkiRejestrProducentow!='stanMagazynowy')",
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            if: '',
            props: {
              readonly: true,
            },
            cellClass: '',
          },
        },
        grupaZniszczenieSurowca: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                empty: {
                  content: '<center><b>Brak danych</b></center>',
                  layout: {
                    tag: 'span',
                    component: 'static-content',
                    if: 'nata(informacjeRoczne.zniszczenieSurowca = null or $count(informacjeRoczne.zniszczenieSurowca) = 0)',
                  },
                },
                informacjeRoczne: {
                  type: 'object',
                  properties: {
                    zniszczenieSurowca: {
                      layout: {
                        component: 'duplicated-section',
                        schema: {
                          type: 'object',
                          properties: {
                            zniszczenieSurowcaYear: {
                              layout: {
                                component: 'expansion-panels',
                                if: '',
                              },
                              panels: [
                                {
                                  title:
                                    'Informacja za rok {informacjeRoczne.zniszczenieSurowca[].rokSprawozdawczy: }',
                                  titleIcon: '',
                                  titleIconSize: 12,
                                  schema: {
                                    type: 'object',
                                    properties: {
                                      content: {
                                        layout: {
                                          component: 'table-internal',
                                        },
                                        source: {
                                          data: '',
                                          headers: [
                                            {
                                              title: 'Grupa odmian',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'grupaOdmian',
                                              valueMapping: 'grupaOdmian.label',
                                            },
                                            {
                                              title: 'Masa surowca zniszczonego (kg)',
                                              type: 'NUMBER',
                                              editable: false,
                                              properties: {},
                                              key: 'masaZniszczonegoSurowca',
                                              valueMapping: 'masaZniszczonegoSurowca',
                                            },
                                            {
                                              title: 'Uwagi',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'uwagi',
                                              valueMapping: 'uwagi',
                                            },
                                          ],
                                          buttons: [],
                                        },
                                        actions: {},
                                        onChange: [],
                                        label: 'stanMagazynowy167Clone',
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                        options: {
                          addBtnText: 'Add element',
                          showDivider: false,
                          ordinalNumberInModel: false,
                          showFirstInitRow: false,
                        },
                        if: 'nata($count(informacjeRoczne.zniszczenieSurowca) > 0)',
                        cellClass: '',
                      },
                      editable: false,
                      showElements: false,
                      onChange: [],
                    },
                  },
                },
              },
            },
            hide: "nata(zakladkiRejestrProducentow!='zniszczenieSurowca')",
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            if: '',
            props: {
              readonly: true,
            },
            cellClass: '',
          },
        },
        GrupaUprawyRokBiezacy: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                empty: {
                  content: '<center><b>Brak danych</b></center>',
                  layout: {
                    tag: 'span',
                    component: 'static-content',
                    if: 'nata(informacjeRoczne.uprawyRokBiezacy = null or $count(informacjeRoczne.uprawyRokBiezacy) = 0)',
                  },
                },
                informacjeRoczne: {
                  type: 'object',
                  properties: {
                    uprawyRokBiezacy: {
                      layout: {
                        component: 'duplicated-section',
                        schema: {
                          type: 'object',
                          properties: {
                            uprawyRokBiezacyYear: {
                              layout: {
                                component: 'expansion-panels',
                                if: '',
                              },
                              panels: [
                                {
                                  title:
                                    'Informacja za rok {informacjeRoczne.uprawyRokBiezacy[].rokSprawozdawczy: }',
                                  titleIcon: '',
                                  titleIconSize: 12,
                                  schema: {
                                    type: 'object',
                                    properties: {
                                      content: {
                                        layout: {
                                          component: 'table-internal',
                                        },
                                        source: {
                                          data: '',
                                          headers: [
                                            {
                                              title: 'Grupa odmian',
                                              type: 'TEXT',
                                              editable: false,
                                              color: '',
                                              key: 'grupaOdmian',
                                              properties: {},
                                              valueMapping: 'grupaOdmian.label',
                                            },
                                            {
                                              title: 'Rok zbioru',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'rokZbioru',
                                              valueMapping: 'rokZbioru',
                                            },
                                            {
                                              title: 'Województwo',
                                              type: 'TEXT',
                                              key: 'wojewodztwo',
                                              editable: false,
                                              properties: {},
                                              valueMapping: '{wojewodztwo.label:}',
                                            },
                                            {
                                              title: 'Powiat',
                                              type: 'TEXT',
                                              key: 'powiat',
                                              editable: false,
                                              properties: {},
                                              valueMapping: '{powiat.label:}',
                                            },
                                            {
                                              title: 'Gmina',
                                              type: 'TEXT',
                                              key: 'gmina',
                                              editable: false,
                                              properties: {},
                                              valueMapping: '{gmina.label:}',
                                            },
                                            {
                                              title: 'Obręb ewidencyjny',
                                              type: 'TEXT',
                                              editable: false,
                                              key: 'obrebEwidencyjny',
                                              properties: {},
                                              valueMapping: '{obrebEwidencyjny.label: }',
                                            },
                                            {
                                              title: 'Nr działki ewiden.',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'numerDzialki',
                                              valueMapping: 'numerDzialki',
                                            },
                                            {
                                              title: 'Identyfikator działki ewiden.',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'identyfikatorDzialki',
                                              valueMapping: 'identyfikatorDzialki',
                                            },
                                            {
                                              title: 'Pow. uprawy na działce ewiden (ha)',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'powierzchniaUprawy',
                                              valueMapping: 'powierzchniaUprawy',
                                            },
                                            {
                                              title: 'Uwagi',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                              key: 'uwagi',
                                              valueMapping: 'uwagi',
                                            },
                                          ],
                                          buttons: [],
                                        },
                                        actions: {},
                                        onChange: [],
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                        options: {
                          addBtnText: 'Add element',
                          showDivider: false,
                          ordinalNumberInModel: false,
                          showFirstInitRow: false,
                        },
                        if: 'nata($count(informacjeRoczne.uprawyRokBiezacy) > 0)',
                        cellClass: '',
                      },
                      editable: false,
                      showElements: false,
                      onChange: [],
                    },
                  },
                },
              },
            },
            hide: "nata(zakladkiRejestrProducentow!='uprawyRokBiezacy')",
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            if: '',
            props: {
              readonly: true,
            },
            cellClass: '',
          },
        },
        grupaUmowyRokBiezacy: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                empty: {
                  content: '<center><b>Brak danych</b></center>',
                  layout: {
                    tag: 'span',
                    component: 'static-content',
                    if: 'nata(informacjeRoczne.umowyRokBiezacy = null or $count(informacjeRoczne.umowyRokBiezacy) = 0)',
                  },
                },
                informacjeRoczne: {
                  type: 'object',
                  properties: {
                    umowyRokBiezacy: {
                      layout: {
                        component: 'duplicated-section',
                        schema: {
                          type: 'object',
                          properties: {
                            umowyRokBiezacyYear: {
                              layout: {
                                component: 'expansion-panels',
                                if: '',
                              },
                              panels: [
                                {
                                  title:
                                    'Informacja za rok {informacjeRoczne.umowyRokBiezacy[].rokSprawozdawczy: }',
                                  titleIcon: '',
                                  titleIconSize: 12,
                                  schema: {
                                    type: 'object',
                                    properties: {
                                      content: {
                                        layout: {
                                          component: 'table-internal',
                                        },
                                        source: {
                                          data: '',
                                          headers: [
                                            {
                                              title: 'Nazwa nabywcy',
                                              key: 'nazwaNabywcy',
                                              valueMapping: '{nabywcaSurowca.label:-}',
                                              type: 'TEXT',
                                              properties: {},
                                            },
                                            {
                                              title: 'Adres nabywcy',
                                              type: 'TEXT',
                                              key: 'adresNabywcy',
                                              valueMapping: '{nabywcaSurowca.adres:-}',
                                              properties: {},
                                            },
                                            {
                                              title: 'NIP nabywcy',
                                              key: 'nipNabywcy',
                                              valueMapping: '{nabywcaSurowca.nip:-}',
                                              type: 'TEXT',
                                            },
                                            {
                                              title: 'REGON nabywcy',
                                              key: 'regonNabywcy',
                                              valueMapping: '{nabywcaSurowca.regon:-}',
                                              type: 'TEXT',
                                            },
                                            {
                                              title: 'Nr umowy',
                                              key: 'numerUmowy',
                                              valueMapping: 'numerUmowy',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                            },
                                            {
                                              title: 'Data zawarcia umowy',
                                              key: 'dataZawarciaUmowy',
                                              valueMapping: 'dataZawarciaUmowy',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                            },
                                            {
                                              title: 'Grupa odmian',
                                              key: 'grupaOdmian',
                                              type: 'TEXT',
                                              editable: false,
                                              valueMapping: 'grupaOdmian.label',
                                              properties: {},
                                            },
                                            {
                                              title: 'Rok zbioru',
                                              key: 'rokZbioru',
                                              valueMapping: 'rokZbioru',
                                              type: 'TEXT',
                                              editable: false,
                                              properties: {},
                                            },
                                            {
                                              title: 'Masa surowca (kg)',
                                              properties: {},
                                              key: 'masaSurowca',
                                              valueMapping: 'masaSurowca',
                                              type: 'TEXT',
                                              editable: false,
                                            },
                                            {
                                              title: 'Uwagi',
                                              properties: {},
                                              key: 'uwagi',
                                              valueMapping: 'uwagi',
                                              type: 'TEXT',
                                              editable: false,
                                            },
                                          ],
                                          buttons: [],
                                        },
                                        actions: {},
                                        onChange: [],
                                        label: 'uprawyRokPoprzedni475Clone',
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                        options: {
                          addBtnText: 'Add element',
                          showDivider: false,
                          ordinalNumberInModel: false,
                          showFirstInitRow: false,
                        },
                        if: 'nata($count(informacjeRoczne.umowyRokBiezacy) > 0)',
                        cellClass: '',
                      },
                      editable: false,
                      showElements: false,
                      onChange: [],
                    },
                  },
                },
              },
            },
            hide: "nata(zakladkiRejestrProducentow!='umowyRokBiezacy')",
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
            if: '',
            props: {
              readonly: true,
            },
            cellClass: '',
          },
        },
        grupaListaDokumentów: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                listaWnioskow: {
                  layout: {
                    component: 'table-internal',
                  },
                  source: {
                    data: '',
                    headers: [
                      {
                        title: 'Rodzaj wniosku',
                        key: 'rodzajWnioskuNazwa',
                        type: 'TEXT',
                        valueMapping:
                          "<span style='text-transform: uppercase'>{rodzajWnioskuNazwa}</span>",
                      },
                      {
                        title: 'Sygnatura',
                        key: 'sygnaturaWniosku',
                        valueMapping:
                          "<a href=\"{rodzajWnioskuKod = 'MTY_INFO' ? '/workspaces/mty/features/szczegoly-rejestru-informacje-roczne?dataId=' : /workspaces/mty/features/szczegoly-wniosku-o-wpiswykreslenie?dataId=}{id}\" style='color:inherit; text-decoration:underline;'>{sygnaturaWniosku}</a>",
                        type: 'TEXT',
                      },
                      {
                        title: 'Data zmiany',
                        key: 'dataZmiany',
                        valueMapping: 'dataZmiany',
                        type: 'TEXT',
                      },
                      {
                        title: 'Status',
                        key: 'status',
                        valueMapping: "<span style='text-transform: uppercase'>{status}</span>",
                        type: 'TEXT',
                      },
                    ],
                    buttons: [],
                  },
                  actions: {},
                  onChange: [],
                },
              },
            },
            hide: "nata(zakladkiRejestrProducentow!='listaDokumentow')",
            options: {
              showDivider: false,
              addBtnText: 'Add',
            },
          },
        },
      },
    },
    options: {},
  },
};
