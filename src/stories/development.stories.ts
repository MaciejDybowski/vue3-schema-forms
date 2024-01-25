// @ts-nocheck
import DevelopmentTable from '../components/app/DevelopmentTable.vue';
import { Meta, StoryObj } from '@storybook/vue3';
import { ArgTypes } from '@storybook/types';
import { Schema } from '@/vocabulary/schema';
import { DictionarySource, SchemaField } from '../vocabulary/schema/elements';

const meta = {
  title: 'Development Page',
  component: DevelopmentTable,
  argTypes: {
    schema: { control: 'object', description: 'Schema u' },
    model: { control: 'object', description: 'Model' },
    options: { control: 'object', description: 'Opcje' },
  } as Partial<ArgTypes<any>>,
  args: {
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'comfortable',
      },
    },
    model: {},
  },
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Table1: Story = {
  parameters: {
    mockData: [
      {
        url: '/api/dictionaries&query=PLN?&page=0&size=20',
        method: 'GET',
        status: 200,
        response: {
          'content': [
            {
              'id': 'PLN',
              'label': 'Polski złoty',
              'digitsAfterDecimal': '2',
            },
          ],
          'empty': false,
          'first': true,
          'last': true,
          'number': 0,
          'numberOfElements': 1,
          'pageable': {
            'offset': 0,
            'pageNumber': 0,
            'pageSize': 20,
            'paged': true,
            'unpaged': false,
          },
          'size': 20,
        },
      },
    ],
  },
  args: {
    model: {
      field1: 'Just text',
      field2: 1334.21233,
      field3: { text: '_text-test_' },
      field4: { number: 1333.233232 },
      referenceField: { text: 'Test' },
      date: '2023-12-31T23:00:00.000Z',
      currency: {
        id: 'PLN',
      },
      phone: '+48510333202',

    },
    schema: {
      type: 'object',
      properties: {
        test: {
          label: 'Pole do obliczeń',
          type: 'number',
          layout: {
            component: 'text-field',
          },
        },
        field1: {
          type: 'text',
          label: 'Data viewer: text',
          layout: {
            component: 'data-viewer',
          },
        } as SchemaField,
        field2: {
          type: 'number',
          label: 'Data viewer: number',
          layout: {
            component: 'data-viewer',
          },
        } as SchemaField,
        field3: {
          type: 'text',
          valueMapping: 'Dodatkowa treść: {field3.text}',
          label: 'Data viewer: object.text',
          layout: {
            component: 'data-viewer',
          },
        },
        field4: {
          type: 'number',
          valueMapping: 'Test: {field4.number}',
          label: 'Data viewer: object.number',
          layout: {
            component: 'data-viewer',
          },
        },
        field5: {
          type: 'text',
          valueMapping: '{referenceField.text}',
          label: 'Data viewer: with reference object',
          layout: {
            component: 'data-viewer',
          },
        },
        date: {
          type: 'date',
          //valueMapping: "{date}",
          label: 'Data viewer: date',
          layout: {
            component: 'data-viewer',
          },
        },
        calc: {
          type: 'number',
          label: 'Calculation',
          valueMapping: 'Wynik obliczeń to: {calc} w walucie {currency.id}',
          calculation: 'field4.number + field2 + test',
          layout: {
            component: 'data-viewer',
          },
        },
        phone: {
          label: 'Telefon',
          type: 'phone',
          layout: {
            component: 'data-viewer',
          },
        } as SchemaField,
        dictionary: {
          label: 'Waluta faktury - słownik',
          valueMapping: '{dictionary.label}',
          layout: {
            component: 'data-viewer',
          },
          source: {
            url: '/api/dictionaries&query=PLN',
            title: 'label',
            value: 'id',
            returnObject: true,
            singleOptionAutoSelect: true,
          } as DictionarySource,
        },
      },
      required: ['field1'],
    } as Schema,
  },
};

