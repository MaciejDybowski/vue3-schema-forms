// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';



import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import { Schema } from '../types/schema/Schema';
import { MOCK_CALENDARS, TABLE_PAGE_WITHOUT_AGGREGATES, UPDATE_TABLE_ROW } from './mock-responses';





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
      handlers: [...TABLE_PAGE_WITHOUT_AGGREGATES , ...UPDATE_TABLE_ROW],
    },
  },
};