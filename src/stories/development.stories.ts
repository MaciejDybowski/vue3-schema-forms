// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';



import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import { Schema } from '../types/schema/Schema';
import { MOCK_CALENDARS, TABLE_PAGE_WITHOUT_AGGREGATES, UPDATE_TABLE_ROW, WOJEWODZTWA } from './mock-responses';























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

export const newValidationViewer: Story = {
  args: {
    formModel: {
      invoice: {
        ksefNumber: '7732000919-20260120-0100E00D827D-61',
        issueDate: '2026-01-20',
        number: 'TEST1',
        createInKsefAt: '2026-01-20T18:16:42.119881200Z',
      },
      flowNumber: 'FK-00009',
      supplier: {
        countrySymbol: 'PL',
        supplierId: 12,
        phone: null,
        vatId: '7732000919',
        name: 'ROBERT WASZKOWSKI Tecna',
        addressLine1: 'ul. Wikingów 11',
        addressLine2: '03-030 WARSZAWA',
        supplierCode: 12,
        email: null,
      },
      supplierMessages: [],
      documentDuplicate: false,
      registryStepDecision: 'ok',
      documentDescription: 'test',
      accountingStepDecision: 'ok',
      accountingDate: '2026-01-21',
      invoiceDataMessages: [
        {
          severity: 'error',
          code: 'NOT_FOUND',
          message: 'Nie znaleziono pasującego dokumentu zakupowego w Wapro.',
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        infoMessage: {
          memorable: true,
          content:
            '<div class="w-100">\n  <div class="text-body-2">\n    W tym kroku dokonujesz <span class="font-weight-medium">księgowania faktury</span> na podstawie danych z procesu\n    oraz podglądu dokumentu. Przed zakończeniem upewnij się, że ujęcie jest wykonane we właściwym miejscu\n    (<span class="font-weight-medium">rejestr / okres</span>) i że wynik księgowania jest zgodny z fakturą.\n  </div>\n\n  <div class="mt-3 text-subtitle-2 font-weight-medium">\n    Co sprawdzić przed zatwierdzeniem\n  </div>\n\n  <div class="mt-2 d-flex flex-column ga-2 text-body-2">\n    <div class="d-flex align-start">\n      <span class="me-2 text-medium-emphasis">•</span>\n      <div>\n        <span class="font-weight-medium">Zgodność danych:</span>\n        numer KSeF, kontrahent, kwoty i VAT względem podglądu dokumentu.\n      </div>\n    </div>\n\n    <div class="d-flex align-start">\n      <span class="me-2 text-medium-emphasis">•</span>\n      <div>\n        <span class="font-weight-medium">Rejestr i okres:</span>\n        czy faktura trafia do właściwego rejestru oraz właściwego okresu rozliczeniowego.\n      </div>\n    </div>\n\n    <div class="d-flex align-start">\n      <span class="me-2 text-medium-emphasis">•</span>\n      <div>\n        <span class="font-weight-medium">Duplikat:</span>\n        jeżeli potwierdzasz duplikat, ustaw <span class="font-weight-medium">„Czy duplikat?”</span> na <span class="font-weight-medium">Tak</span>.\n      </div>\n    </div>\n  </div>\n\n  <div class="mt-4 text-subtitle-2 font-weight-medium">\n    Jak uzupełnić formularz\n  </div>\n\n  <div class="mt-2 d-flex flex-column ga-2 text-body-2">\n    <div class="d-flex align-start">\n      <span class="me-2 text-medium-emphasis">1.</span>\n      <div>\n        Wybierz <span class="font-weight-medium">Decyzję dotyczącą księgowania dokumentu</span>.\n      </div>\n    </div>\n\n    <div class="d-flex align-start">\n      <span class="me-2 text-medium-emphasis">2.</span>\n      <div>\n        Przy decyzji <span class="font-weight-medium">OK – zaksięgowano</span> uzupełnij\n        <span class="font-weight-medium">Datę księgowania</span> oraz <span class="font-weight-medium">Opis dokumentu</span>\n        (pola wymagane).\n      </div>\n    </div>\n\n    <div class="d-flex align-start">\n      <span class="me-2 text-medium-emphasis">3.</span>\n      <div>\n        Jeżeli wybierasz <span class="font-weight-medium">Błędna rejestracja</span>, proces wróci do kroku\n        <span class="font-weight-medium">Rejestracja</span> w celu korekty decyzji i uzupełnienia uzasadnienia.\n      </div>\n    </div>\n  </div>\n\n  <div class="mt-4 text-caption text-medium-emphasis">\n    Uwaga: wybierając <span class="font-weight-medium">Błędna rejestracja</span>, opisz w kroku rejestracji przyczynę\n    wprost (co poprawić lub dlaczego dokument powinien zostać odrzucony), aby uniknąć ponownych niejasności.\n  </div>\n</div>',
          layout: {
            component: 'alert',
            props: {
              variant: 'tonal',
              type: null,
              density: 'default',
            },
            fillRow: true,
          },
        },
        invoiceInfo: {
          content:
            '<div class="w-100 rounded border bg-surface pa-4 elevation-1">\n  <div class="d-flex flex-wrap align-start ga-4">\n    <div class="flex-grow-1">\n      <!-- 1. linia: numer faktury -->\n      <div class="text-subtitle-1 font-weight-medium text-truncate">\n        Faktura nr {invoice.number:-}\n      </div>\n\n      <!-- daty: jedna pod drugą -->\n      <div class="text-body-2 mt-2">\n        <div>\n          <span class="text-medium-emphasis">Data otrzymania / wpływu:</span>\n          <span class="ms-1">{invoice.acquisitionDate:-}</span>\n        </div>\n        <div class="mt-1">\n          <span class="text-medium-emphasis">Data wystawienia:</span>\n          <span class="ms-1">{invoice.issueDate:-}</span>\n        </div>\n      </div>\n    </div>\n\n    <!-- Prawa sekcja -->\n    <div class="ms-auto w-100 w-sm-auto text-left text-sm-right">\n      <div class="d-inline-flex align-center rounded-pill bg-surface-variant text-on-surface-variant px-3 py-1 text-no-wrap">\n        <span class="text-caption">Nr obiegu</span>\n        <span class="text-body-2 font-weight-medium ms-2">{flowNumber:-}</span>\n      </div>\n    </div>\n  </div>\n</div>\n',
          layout: {
            tag: 'p',
            component: 'static-content',
          },
        },
        invoice: {
          properties: {
            ksefNumber: {
              label: 'Numer KSeF',
              layout: {
                component: 'data-viewer',
              },
              isCopyEnabled: true,
            },
          },
        },
        supplierInfo: {
          content:
            '<div class="w-100 rounded border bg-surface pa-4 elevation-1">\n  <div class="d-flex flex-wrap align-start ga-4">\n    <div class="flex-grow-1">\n      <div class="text-subtitle-1 font-weight-medium text-truncate">\n        {supplier.name:-}\n      </div>\n\n      <div class="text-body-2 text-medium-emphasis">\n        {supplier.addressLine1:-}\n      </div>\n      <div class="text-body-2 text-medium-emphasis">\n        {supplier.addressLine2:-}\n      </div>\n\n      <div class="text-body-2 mt-2 d-flex flex-wrap align-center ga-2">\n        <span>\n          <span class="text-medium-emphasis">NIP:</span>\n          <span class="font-weight-bold ms-1">{supplier.vatId:-}</span>\n        </span>\n\n        <span class="text-medium-emphasis">•</span>\n        <span>\n          <span class="text-medium-emphasis">Email:</span>\n          <span class="ms-1">{supplier.email:-}</span>\n        </span>\n\n        <span class="text-medium-emphasis">•</span>\n        <span>\n          <span class="text-medium-emphasis">Telefon:</span>\n          <span class="ms-1">{supplier.phone:-}</span>\n        </span>\n      </div>\n    </div>\n\n    <!-- Prawa sekcja: na XS pełna szerokość i pod spodem -->\n    <div class="ms-auto w-100 w-sm-auto text-left text-sm-right">\n      <div class="d-inline-flex align-center rounded-pill bg-surface-variant text-on-surface-variant px-3 py-1 text-no-wrap">\n        <span class="text-caption">Kod</span>\n        <span class="text-body-2 font-weight-medium ms-2">{supplier.supplierCode:-}</span>\n      </div>\n\n      <div class="text-subtitle-2 font-weight-bold mt-2">\n        Dostawca\n      </div>\n    </div>\n  </div>\n</div>',
          layout: {
            tag: 'p',
            component: 'static-content',
          },
        },
        btnCheckSupplier: {
          label: 'Sprawdź ponownie dostawcę',
          layout: {
            component: 'button',
            cols: {
              xs: 6,
              sm: 6,
              md: 6,
              lg: 6,
              xl: 6,
              xxl: 6,
            },
            fillRow: true,
          },
          mode: 'action',
          config: {
            code: 'callScript',
            params: {
              script: 'btnCheckInvoiceSupplier',
            },
          },
        },
        supplierMessages: {
          layout: {
            component: 'validation-messages-viewer',
            props: {
              variant: 'tonal',
              density: 'compact',
            },
          },
        },
        documentDuplicate: {
          label: 'Czy duplikat?',
          layout: {
            fillRow: true,
            component: 'radio-button',
            props: {
              inline: true,
            },
          },
          source: {
            items: [
              {
                value: false,
                title: 'Nie',
              },
              {
                value: true,
                title: 'Tak',
              },
            ],
          },
          defaultValue: false,
          validations: [],
        },
        documentDescription: {
          label: 'Opis dokumentu',
          layout: {
            fillRow: true,
            component: 'text-area',
          },
          validations: [
            {
              name: 'conditional-required',
              rule: 'accountingStepDecision="ok"',
              message: '',
            },
          ],
        },
        accountingStepDecision: {
          label: 'Decyzja dotycząca księgowania dokumentu',
          layout: {
            fillRow: true,
            component: 'radio-button',
            props: {
              inline: true,
            },
          },
          source: {
            items: [
              {
                value: 'ok',
                title: 'OK - zaksięgowano',
              },
              {
                value: 'blednaRejestracja',
                title: 'Błędna rejestracja',
              },
            ],
          },
        },
        accountingDate: {
          label: 'Data księgowania',
          layout: {
            cols: {
              xs: 12,
              sm: 6,
              md: 6,
              lg: 4,
              xl: 4,
              xxl: 4,
            },
            fillRow: true,
            component: 'date-picker',
          },
          validations: [
            {
              name: 'conditional-required',
              rule: 'accountingStepDecision="ok"',
              message: null,
            },
          ],
        },
        btnCheckIvoiceData: {
          label: 'Sprawdź dokument zakupowy',
          layout: {
            component: 'button',
            cols: {
              xs: 6,
              sm: 6,
              md: 6,
              lg: 6,
              xl: 6,
              xxl: 6,
            },
            fillRow: true,
          },
          mode: 'action',
          config: {
            code: 'callScript',
            params: {
              script: 'btnCheckInvoiceData',
            },
            waitForSaveState: true,
          },
        },
        invoiceDataMessages: {
          layout: {
            component: 'validation-messages-viewer',
            props: {
              variant: 'tonal',
              density: 'compact',
            },
          },
        },
      },
      required: ['documentDuplicate', 'accountingStepDecision'],
    },
  },
};

export const GroupReadonly: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        fieldsGroup609: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                button629: {
                  label: 'Kliknij mnie',
                  layout: {
                    component: 'button',
                    cols: { xs: 6, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                    fillRow: true,
                  },
                  mode: 'action',
                  config: {},
                },
                switch533: {
                  label: 'Item-switch533',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'switch',
                  },
                },
                textField836: {
                  label: 'Item-textField836',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'text-field',
                  },
                },
                textField050: {
                  label: 'Item-textField050',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'text-field',
                  },
                },
                switch366: {
                  label: 'Item-switch366',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'switch',
                  },
                },
              },
            },
            props: { readonly: true },
          },
        },
      },
    },
  },
};

export const CalendarAutocomplete: Story = {
  play: async (context) => {},
  args: {
    formModel: {
      period: '2021-12',
    },
    schema: {
      type: 'object',
      properties: {
        period: {
          label: 'Period',
          layout: {
            component: 'year-month',
          },
        },
        calendar: {
          label: 'Select calendar',
          layout: {
            component: 'calendar-autocomplete',
          },
          source: {
            url: '/mocks/calendars',
            title: 'label',
            value: 'id',
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_CALENDARS,
    },
  },
};

export const TableCrud: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        span: {
          content: 'Basic display all data as a text values',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        tableOfProductsView: {
          layout: {
            component: 'table-view-api',
          },
          source: {
            data: '/mock-data/table-view-mock',
            buttons: [
              {
                label: 'Add products',
                btnProps: {
                  color: 'primary',
                  rounded: false,
                },
                mode: 'internal',
                config: {
                  code: 'add',
                },
              },
            ],
            headers: [
              {
                title: 'Name',
                key: 'name',
                valueMapping: 'name',
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
                type: 'NUMBER',
              },
              {
                title: 'Base',
                key: 'base',
                valueMapping: 'base',
                type: 'TEXT',
              },
              {
                title: 'Volume',
                key: 'volume',
                valueMapping: 'volume',
                type: 'TEXT',
              },
            ],
          },
        },
        tableOfProducts: {
          layout: {
            component: 'table-view',
          },
          source: {
            data: '/mock-data/table-view-mock',
            buttons: [
              {
                label: 'Add products',
                btnProps: {
                  color: 'primary',
                  rounded: false,
                },
                mode: 'internal',
                config: {
                  code: 'add',
                },
              },
            ],
            headers: [
              {
                title: 'Name',
                key: 'name',
                valueMapping: 'name',
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
                type: 'NUMBER',
              },
              {
                title: 'Base',
                key: 'base',
                valueMapping: 'base',
                type: 'TEXT',
              },
              {
                title: 'Volume',
                key: 'volume',
                valueMapping: 'volume',
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
      handlers: [...TABLE_PAGE_WITHOUT_AGGREGATES, ...UPDATE_TABLE_ROW],
    },
  },
};

const generateTableData = (rows: number) =>
  Array.from({ length: rows }, (_, i) => ({
    wojewodztwo: null,
    powiat: null,
    grmina: null,
    name: `Product ${i + 1}`,
    location: `Location ${Math.ceil(Math.random() * 5)}`,
    height: parseFloat((Math.random() * 10 + 1).toFixed(2)),
    /*base: `Base ${Math.ceil(Math.random() * 3)}`,
    volume: `${(Math.random() * 100).toFixed(2)} L`,*/
  }));

const tableBase = (bookmarkValue: number) => ({
  layout: {
    component: 'table-internal',
    hide: `nata(bookmarks!=${bookmarkValue})`,
  },
  source: {
    buttons: [
      {
        label: 'Add products',
        btnProps: {
          color: 'primary',
          rounded: false,
        },
        mode: 'internal',
        config: {
          code: 'add',
        },
      },
    ],
    headers: [
      {
        title: 'Wojewodztwo',
        key: 'wojewodztwo-collection',
        type: 'COLLECTION',
        editable: [
          {
            label: 'Województwo',
            key: 'wojewodztwo',
            valueMapping:
              'wojewodztwo:/api/dictionaries?feature-id=wojewodztwa1&lm=nazwa&vm=symbol:label:id:true',
            type: 'DICTIONARY',
            onChange: {
              mode: 'change-model',
              variables: [
                {
                  path: 'powiat', // zaleznosci w wierszu
                  value: null,
                },
                {
                  path: 'gmina',
                  value: null,
                },
              ],
            },
          },
        ],
        properties: {
          sortable: false,
          minWidth: '250px',
          width: '250px',
          maxWidth: '250px',
          cellProps: {
            style: 'padding-top: 8px; padding-bottom: 8px',
          },
        },
      },
      {
        title: 'Powiat',
        key: 'powiat-collection',
        type: 'COLLECTION',
        editable: [
          {
            key: 'powiat',
            label: 'Powiat',
            valueMapping:
              'powiat:/api/dictionaries?feature-id=powiaty1&lm=nazwa&vm=symbol&filter=symbol%3D%3D{tableOne[].wojewodztwo.id}*:label:id:true',
            type: 'DICTIONARY',
            onChange: {
              mode: 'change-model',
              variables: [
                {
                  path: 'gmina',
                  value: null,
                },
              ],
            },
          },
        ],
        properties: {
          sortable: false,
          minWidth: '250px',
          width: '250px',
          maxWidth: '250px',
          cellProps: {
            style: 'padding-top: 8px; padding-bottom: 8px',
          },
        },
      },
      {
        title: 'Gmina',
        key: 'gmina-collection',
        type: 'COLLECTION',
        editable: [
          {
            label: 'Gmina',
            key: 'gmina',
            valueMapping:
              'gmina:/api/dictionaries?feature-id=gminy1&lm=nazwa&vm=symbol&filter=symbol%3D%3D{tableOne[].powiat.id}*:label:id:true',
            type: 'DICTIONARY',
          },
        ],
        properties: {
          sortable: false,
          minWidth: '250px',
          width: '250px',
          maxWidth: '250px',
          cellProps: {
            style: 'padding-top: 8px; padding-bottom: 8px',
          },
        },
      },
      {
        title: 'SimpleSelect',
        key: 'simpleselect-collection',
        type: 'COLLECTION',
        editable: [
          {
            label: 'Select',
            key: 'simpleGmina',
            valueMapping: 'simpleGmina:source:label:id:true',
            type: 'SELECT',
            source: [
              { id: 1, label: 'Gmina 1' },
              { id: 2, label: 'Gmina 2' },
              { id: 3, label: 'Gmina 3' },
            ],
          },
        ],
        properties: {
          sortable: false,
          minWidth: '250px',
          width: '250px',
          maxWidth: '250px',
          cellProps: {
            style: 'padding-top: 8px; padding-bottom: 8px',
          },
        },
      },
      {
        title: 'Height',
        key: 'height-collection',
        type: 'COLLECTION',
        editable: [
          {
            key: 'height',
            valueMapping: 'height',
            type: 'NUMBER',
          },
        ],
        properties: {
          sortable: false,
          minWidth: '100px',
          width: '100px',
          maxWidth: '100px',
          cellProps: {
            style: 'padding-top: 8px; padding-bottom: 8px',
          },
        },
      },
      {
        title: 'Jsonata expression',
        key: 'nameAndLocation',
        valueMapping: '<b>Height</b>{height?height:0+4}',
        type: 'TEXT',
        properties: {
          sortable: false,
          minWidth: '200px',
          width: '200px',
          maxWidth: '200px',
          cellProps: {
            style: 'padding-top: 8px; padding-bottom: 8px',
          },
        },
      },
      {
        title: 'Actions',
        key: 'actions',
        properties: {
          mode: 'inline',
        },
        actions: [
          {
            title: 'Delete',
            icon: 'mdi-delete-outline',
            mode: 'internal',
            config: {
              code: 'delete',
            },
          },
          {
            title: 'Duplicate',
            icon: 'mdi-content-copy',
            mode: 'internal',
            config: {
              code: 'duplicate',
            },
          },
        ],
      },
    ],
  },
});

export const HighPerformance: Story = {
  play: async (context) => {},
  args: {
    formModel: {
      tableOne: generateTableData(5),
      tableTwo: generateTableData(4),
      tableThree: generateTableData(6),
      tableFour: generateTableData(5),
      tableFive: generateTableData(3),
      tableSix: generateTableData(4),
      tableSeven: generateTableData(6),
      tableEight: generateTableData(5),
      tableNine: generateTableData(4),
      tableTen: generateTableData(3),
    },
    schema: {
      type: 'object',
      properties: {
        bookmarks: {
          layout: {
            component: 'bookmark',
          },
          source: {
            items: [
              { value: 1, title: 'General Information' },
              { value: 2, title: 'Previous Year Crops' },
              { value: 3, title: 'Previous Year Contracts' },
              { value: 4, title: 'Soil Analysis' },
              { value: 5, title: 'Irrigation' },
              { value: 6, title: 'Fertilization' },
              { value: 7, title: 'Crop Protection' },
              { value: 8, title: 'Machinery' },
              { value: 9, title: 'Labor' },
              { value: 10, title: 'Summary' },
            ],
          },
        },
        tableOne: tableBase(1),
        tableTwo: tableBase(2),
        tableThree: tableBase(3),
        tableFour: tableBase(4),
        tableFive: tableBase(5),
        tableSix: tableBase(6),
        tableSeven: tableBase(7),
        tableEight: tableBase(8),
        tableNine: tableBase(9),
        tableTen: tableBase(10),
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: [...TABLE_PAGE_WITHOUT_AGGREGATES, ...UPDATE_TABLE_ROW, ...WOJEWODZTWA],
    },
  },
};
