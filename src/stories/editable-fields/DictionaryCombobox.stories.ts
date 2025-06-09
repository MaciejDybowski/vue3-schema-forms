// @ts-nocheck
import { HttpResponse, http } from 'msw';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { Story } from 'storybook/dist/csf';
import { waitForMountedAsync } from './utils';
import { expect, userEvent, within } from 'storybook/test';
import { DictionarySource } from '../../types/shared/Source';
import { MOCK_REQUEST_CURRENCY } from '../mock-responses';

export default {
  title: 'Elements/Editable/Dictionary [combobox]',
  ...formStoryWrapperTemplate,
};

const MOCK_REQUEST = [
  http.get('/api/combo-mock', async (req, res, ctx) => {
    return HttpResponse.json({
      content: [
        {
          id: 27,
          label: 'Test',
        },
      ],
    });
  }),
];

export const Standard: Story = {
  play: async (context) => {
    // const canvas = within(context.canvasElement);
    // const field = canvas.getByLabelText("Text area");
    // await userEvent.type(field, "This is standard text area...", { delay: 100 });
    // await expect(context.args.formModel).toEqual({ textArea: "This is standard text area..." });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        combobox: {
          label: 'Combobox',
          layout: {
            component: 'combobox',
          },
          source: {
            url: '/api/combo-mock',
            title: 'label',
            value: 'id',
            lazy: true,
            returnObject: false,
            singleOptionAutoSelect: false,
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST,
    },
  },
};


export const Label: Story = {
  name: 'Case: extra label content',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const chips = document.getElementsByClassName('v-chip__content');
    await expect(chips.length).toEqual(2);
    await expect(chips[0].textContent).toEqual('The best');
    await expect(chips[1].textContent).toEqual('The least');
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'combobox',
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'value',
          } as DictionarySource,
        } as SchemaSourceField,
      },
      required: ['currency'],
    } as Schema,
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'comfortable',
      },
      dictionaryProps: {
        labels: [
          {
            id: 'the-best',
            title: { en: 'The best', pl: 'Najlepsza' },
            backgroundColor: 'green',
            textColor: 'white',
          },
          {
            id: 'the-least',
            title: { en: 'The least', pl: 'Słabe' },
            backgroundColor: 'blue',
            textColor: 'white',
          },
        ],
      },
    },
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};
