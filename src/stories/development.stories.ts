// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import { Schema } from '../types/schema/Schema';
import {
  MOCK_CALENDARS,
  TABLE_PAGE_WITHOUT_AGGREGATES,
  UPDATE_TABLE_ROW,
  WOJEWODZTWA,
} from './mock-responses';












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
            label: "Gmina",
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
      },
      {
        title: 'Jsonata expression',
        key: 'nameAndLocation',
        valueMapping:
          '<b>Height + 4 = </b>{(height+4)}',
        type: 'TEXT',

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
