// @ts-nocheck
import SchemaEngine from '../components/app/SchemaEngine.vue';
import { Meta, StoryObj } from '@storybook/vue3';
import { ArgTypes } from '@storybook/types';
import { Schema } from '@/vocabulary/schema';
import { DictionarySource, SchemaSourceField } from '@/vocabulary/schema/elements';

const meta = {
  title: 'Development Page',
  component: SchemaEngine,
  argTypes: {
    schema: { control: 'object', description: 'Schema u' },
    model: { control: 'object', description: 'Model' },
    options: { control: 'object', description: 'Opcje' },
  } as Partial<ArgTypes<any>>,
  args: {
    options: {
      textFieldProps: {
        variant: 'outlined',
        density: 'comfortable',
      },
    },
    model: {},
  },
} satisfies Meta<typeof SchemaEngine>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Table1: Story = {
  parameters: {
    mockData: [
      {
        url: 'http://10.16.72.9:8085/api/v1/ksef-invoices?param1=Maciek&page=0&size=20',
        method: 'GET',
        status: 200,
        response: {
          'content': [
            {
              'ksefReferenceNumber': '1854510877-20231213-4BEE88074DB1-0B',
              'invoiceReferenceNumber': 'FV/2023/22',
              'text': "asia"
            },
            {
              'ksefReferenceNumber': '1854510877-20231213-87863E46C331-62',
              'invoiceReferenceNumber': 'FV/2023/23',
              'text': "qwe"
            },
            {
              'ksefReferenceNumber': '1854510877-20231213-3D94CDC7871A-65',
              'invoiceReferenceNumber': 'FV/2023/24',
              'text': "asia123"
            },
            {
              'ksefReferenceNumber': '1854510877-20231213-A-65',
              'invoiceReferenceNumber': 'test',
              'text': "asia1232131"
            },
          ],
          'pageable': {
            'pageNumber': 0,
            'pageSize': 20,
            'sort': {
              'unsorted': true,
              'sorted': false,
              'empty': true,
            },
            'offset': 0,
            'paged': true,
            'unpaged': false,
          },
          'numberOfElements': 4,
          'size': 4,
          'number': 0,
          'sort': {
            'unsorted': true,
            'sorted': false,
            'empty': true,
          },
          'first': true,
          'last': true,
          'empty': false,
        },
      },
    ],
  },
  args: {
    model: {
      firstName: 'Maciek',

    },
    schema: {
      type: 'object',
      properties: {
        firstName: {
          label: 'Imię',
          layout: { component: 'text-field' },
        },
        lastName: {
          label: 'Nazwisko',
          layout: { component: 'text-field' },
        },
        currency: {
          label: 'Waluta',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: 'http://10.16.72.9:8085/api/v1/ksef-invoices?param1={firstName}',
            title: 'invoiceReferenceNumber',
            value: 'ksefReferenceNumber',
            description: "text",

          } as DictionarySource,
        } as SchemaSourceField,
      },

    } as Schema,
  },
};


