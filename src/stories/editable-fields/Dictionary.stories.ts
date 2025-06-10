// @ts-nocheck
import { Story } from 'storybook/dist/csf';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { DictionarySource } from '../../types/shared/Source';
import { CURRENCIES_REQUEST, MOCK_REQUEST_CURRENCY, RESPONSE_DICTIONARY } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';





export default {
  title: 'Elements/Editable/Dictionary [autocomplete]',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      currency: { id: 'AFN', label: 'Afgani', digitsAfterDecimal: '2', labels: 'the-best' },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const MultipleValues: Story = {
  name: 'Case: model as array',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    const first = items[0];
    await expect(first.textContent).toEqual('Afganithe-best');
    await userEvent.click(items[0], { delay: 200 });
    await userEvent.click(items[1], { delay: 200 });
    await userEvent.click(items[2], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      currency: [
        {
          id: 'AFN',
          label: 'Afgani',
          digitsAfterDecimal: '2',
          labels: 'the-best',
        },
        {
          id: 'ALL',
          label: 'Lek',
          digitsAfterDecimal: '3',
          labels: 'the-least',
        },
        {
          id: 'AMD',
          label: 'Dram',
          digitsAfterDecimal: '2',
        },
      ],
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
            multiple: true,
          },
        },
      },
      required: ['currency'],
    },
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const MultipleValuesWithLimit: Story = {
  name: 'Case: model as array with limit',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    const first = items[0];
    await expect(first.textContent).toEqual('Afganithe-best');
    await userEvent.click(items[0], { delay: 200 });
    await userEvent.click(items[1], { delay: 200 });
    await userEvent.click(items[2], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      currency: [
        {
          id: 'ALL',
          label: 'Lek',
          digitsAfterDecimal: '3',
          labels: 'the-least',
        },
        {
          id: 'AMD',
          label: 'Dram',
          digitsAfterDecimal: '2',
        },
      ],
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
            multiple: true,
            maxSelection: 2,
          },
        },
      },
      required: ['currency'],
    },
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const WithDescription: Story = {
  name: 'Case: add description to list item',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    const first = items[0];
    await expect(first.textContent).toEqual('AfganiAfganithe-best');
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      currency: { id: 'AFN', label: 'Afgani', digitsAfterDecimal: '2', labels: 'the-best' },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
            description: 'label',
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const WithSearch: Story = {
  name: 'Case: searching by query parameter',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await userEvent.type(select, 'Dol', { delay: 200 });

    const option = await waitFor(
      () => {
        const items = [...document.querySelectorAll('.v-list-item')];
        const found = items.find((item) =>
          item.textContent?.toLowerCase().includes('dolar australijski'),
        );
        if (!found) {
          throw new Error('Czekam na filtrację wyników...');
        }
        return found;
      },
      { timeout: 3000 },
    );

    await userEvent.pointer({
      keys: '[MouseLeft]',
      target: option,
      pointerName: 'mouse',
      pointerType: 'mouse',
    });
    await userEvent.click(option as HTMLElement, { delay: 400 });

    await expect(context.args.formModel).toEqual({
      currency: {
        id: 'AUD',
        label: 'Dolar australijski',
        digitsAfterDecimal: '2',
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const ReturnValue: Story = {
  name: 'Case: return object = false',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      currency: 'Afgani',
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
            returnObject: false,
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
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
            component: 'dictionary',
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

export const DefaultValueAsATextWithDependencies: Story = {
  name: 'Case: pass a default value with variable (only returnObject=false mode)',
  play: async (context) => {
    await waitForMountedAsync();
    await expect(context.args.formModel).toEqual({
      currency: 'Crypto coin as karold',
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          defaultValue: 'Crypto coin as {context.userInfo.username:DefaultValueLogin}',
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
            returnObject: false,
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
    options: {
      context: {
        userInfo: {
          username: 'karold',
          firstName: 'Karol',
          lastName: 'Kowalski',
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const OneTimeValueFilter: Story = {
  name: 'Case: value filter (disappear after first call)',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      customer: {
        defaultCurrencyCode: 'PLN',
      },
      currency: {
        id: 'AFN',
        label: 'Afgani',
        digitsAfterDecimal: '2',
        labels: 'the-best',
      },
    });
  },
  args: {
    formModel: {
      customer: {
        defaultCurrencyCode: 'PLN',
      },
    },
    schema: {
      type: 'object',
      properties: {
        span: {
          content: 'Used for filter specific one data / object from API',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/mocks/currencies?value-filter={customer.defaultCurrencyCode}',
            title: 'label',
            value: 'id',
            returnObject: true,
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const ConditionalFilter: Story = {
  name: 'Case: conditional RSQL filter',
  play: async (context) => {},
  args: {
    formModel: {
      testInput: 'test',
      deps: {
        item: {
          id: '9',
        },
      },
    },
    schema: {
      type: 'object',
      properties: {
        radioButton: {
          initValue: false,
          label: 'Choose option',
          layout: {
            component: 'radio-button',
          },
          source: {
            items: [
              { value: 1, title: 'Filtr' },
              { value: 2, title: 'Bez' },
            ],
          },
        },
        dictionary: {
          label: 'Słownik',
          layout: {
            component: 'dictionary',
            cols: 12,
          },
          source: {
            url: '/mock-dictionaries?filter=id=={deps.item.id}&enable-filter=radioButton=1',
            title: 'label',
            value: 'id',
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
      },
      required: [],
    },
  },
  parameters: {
    msw: {
      handlers: RESPONSE_DICTIONARY,
    },
  },
};

export const ConditionalValueFilter: Story = {
  name: 'Case: conditional value filter',
  args: {
    formModel: {
      testInput: 'test',
      deps: {
        item: {
          id: '9',
        },
      },
    },
    schema: {
      type: 'object',
      properties: {
        radioButton: {
          initValue: false,
          label: 'Choose option',
          layout: {
            component: 'radio-button',
          },
          source: {
            items: [
              { value: 1, title: 'Filtr' },
              { value: 2, title: 'Bez' },
            ],
          },
        },
        dictionary: {
          label: 'Słownik',
          layout: {
            component: 'dictionary',
            cols: 12,
          },
          source: {
            url: '/mock-dictionaries?value-filter={deps.item.id}&enable-filter=radioButton=1',
            title: 'label',
            value: 'id',
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
      },
      required: [],
    },
  },
  parameters: {
    msw: {
      handlers: RESPONSE_DICTIONARY,
    },
  },
};

export const RequiredDict: Story = {
  name: 'Validation: required',
  play: async (context) => {
    /*  await waitForMountedAsync();
      await waitForMountedAsync();
      const canvas = within(context.canvasElement);
      const select = canvas.getByLabelText("Currency");
      await userEvent.click(select, { pointerEventsCheck: 0, delay: 100 });
  
      const items = document.getElementsByClassName("v-list-item");
      await userEvent.click(items[0], { delay: 100 });
      const Submit = canvas.getByText("Validate");
      await userEvent.click(Submit, { delay: 100 });
      await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
      await expect(context.args.formModel).toEqual({
        currencyLabel: {
          id: "USD",
          label: "US Dollar",
        },
      });*/
    // TODO w GUI przechodzi w autoskrypcie - nie
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        currencyLabel: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/mock-data/currencies',
            title: 'label',
            value: 'value',
          },
        },
      },
      required: ['currency'],
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: [CURRENCIES_REQUEST],
    },
  },
};

export const ReadOnlyWithValue: Story = {
  name: 'Case: readonly with value',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {
      currencyReadonly: {
        id: 'BWP',
        label: 'Pula',
        digitsAfterDecimal: '2',
      },
    },
    schema: {
      type: 'object',
      properties: {
        currencyReadonly: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
            props: {
              readonly: true,
            },
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
};
export const ReadOnlyRequiredWithValue: Story = {
  name: 'Case: readonly with value and required',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {
      currency: {
        id: 'BWP',
        label: 'Pula',
        digitsAfterDecimal: '2',
      },
    },
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
            props: {
              readonly: true,
            },
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
          } as DictionarySource,
        } as SchemaSourceField,
      },
      required: ['currency'],
    } as Schema,
  },
};
export const ReadOnlyRequiredWithoutValue: Story = {
  name: 'Case: readonly without value and required',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
            props: {
              readonly: true,
            },
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
          } as DictionarySource,
        } as SchemaSourceField,
      },
      required: ['currency'],
    } as Schema,
  },
};
