// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import { EngineSourceField } from '../../types/engine/controls';
import { Schema, SchemaOptions } from '../../types/schema/Schema';
import {
  DictionarySource,
  Layout,
  SchemaSourceField,
  SchemaTextField,
  SimpleSource,
} from '../../types/schema/elements';
import { waitForMountedAsync } from '../editable-fields/utils';
import { MOCK_REQUEST_CURRENCY } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Features/Dependencies',
  ...formStoryWrapperTemplate,
};

export const step1: Story = {
  name: 'Example 1: Usage of text value of field from model without nested objects',
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      properties: {
        fieldA: {
          label: 'Field A',
          layout: {
            component: 'text-field',
          },
        },
        fieldB: {
          content: 'This is text with value of fieldA: {fieldA:Default value}',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
      },
    },
  },
};

export const step2: Story = {
  name: 'Example 2: Usage of nested values of field from model',
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      properties: {
        fieldA: {
          label: 'Field A',
          defaultValue: { value: 1, title: 'Option 1' },
          layout: {
            component: 'select',
          },
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
            returnObject: true,
          },
        },
        divider: {
          layout: {
            component: 'divider',
          },
          thickness: 10,
          color: 'blue',
        },
        fieldB: {
          content: 'This is text with value of fieldA: {fieldA:Default value}',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        fieldC: {
          content: 'This is text with value of fieldA: {fieldA.value:Default value}',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        fieldD: {
          content: 'This is text with value of fieldA: {fieldA.title:Default value}',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        divider2: {
          layout: {
            component: 'divider',
          },
          thickness: 10,
          color: 'blue',
        },
        fieldE: {
          label: 'This is text with value of fieldA: {fieldA:Default value}',
          valueMapping: '{fieldA:Default value}',
          layout: {
            component: 'data-viewer',
          },
        },
        fieldF: {
          label: 'This is text with value of fieldA: {fieldA.value:Default value}',
          valueMapping: '{fieldA.value:Default value}',
          layout: {
            component: 'data-viewer',
          },
        },
        fieldG: {
          label: 'This is text with value of fieldA: {fieldA.title:Default value}',
          valueMapping: '{fieldA.title:Default value}',
          layout: {
            component: 'data-viewer',
          },
        },
      },
    },
  },
};

export const step3: Story = {
  name: 'Example 3: Usage of values which are in duplicated section in the form model',
  play: async (context) => {},
  args: {
    formModel: {
      fieldB: 'Root level',
      products: [
        {
          dataId: 1,
          name: 'any value #1',
        },
        {
          dataId: 2,
          name: 'any value #2',
        },
      ],
    },
    schema: {
      properties: {
        fieldB: {
          label: 'Root level field',
          layout: {
            component: 'text-field',
          },
        },
        divider: {
          layout: {
            component: 'divider',
          },
          thickness: 20,
          color: 'blue',
        },
        products: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                dataId: {
                  label: 'dataId',
                  layout: {
                    component: 'text-field',
                  },
                },
                name: {
                  label: 'name',
                  layout: {
                    component: 'text-field',
                  },
                },
                merge2: {
                  content: '#{products[].dataId} - {fieldB} - {products[].name}',
                  layout: {
                    component: 'static-content',
                    tag: 'span',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const step4: Story = {
  name: 'Example 4: Usage of values which are in nested duplicated section in the form model',
  play: async (context) => {},
  args: {
    formModel: {
      fieldB: 'Root level',
      testObject: {
        testField: 'Test value',
      },
      products: [
        {
          dataId: 1,
          name: 'Item 1',
          prices: [
            {
              id: 99,
              value: 23.1,
            },
            {
              id: 999,
              value: 1.23,
            },
          ],
        },
        {
          dataId: 300,
          name: 'Item 300',
          prices: [
            {
              id: 300,
              value: 300,
            },
            {
              id: 301,
              value: 301,
            },
          ],
        },
      ],
    },
    schema: {
      properties: {
        fieldB: {
          label: 'Root level field',
          layout: {
            component: 'text-field',
          },
        },
        divider: {
          layout: {
            component: 'divider',
          },
          thickness: 20,
          color: 'blue',
        },
        products: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                dataId: {
                  label: 'dataId',
                  layout: {
                    component: 'text-field',
                  },
                },
                name: {
                  label: 'name',
                  layout: {
                    component: 'text-field',
                  },
                },
                prices: {
                  layout: {
                    component: 'duplicated-section',
                    schema: {
                      properties: {
                        id: {
                          label: 'price id',
                          layout: {
                            component: 'text-field',
                            cols: 2,
                          },
                        },
                        value: {
                          label: 'price value',
                          type: 'float',
                          precision: 2,
                          layout: {
                            component: 'number-field',
                            cols: 2,
                          },
                        },
                        testField: {
                          content:
                            '#{products[].dataId} - {fieldB} - {products[].name}, multi nested price Id = {products[].prices[].id},  {testObject.testField}',
                          layout: {
                            component: 'static-content',
                            tag: 'span',
                            cols: 8,
                          },
                        },
                      },
                    },
                  },
                },
                merge2: {
                  content:
                    '#{products[].dataId} - {fieldB} - {products[].name}, {testObject.testField}',
                  layout: {
                    component: 'static-content',
                    tag: 'span',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const step5: Story = {
  name: 'Example 5: Usage of values which are in field group',
  play: async (context) => {},
  args: {
    formModel: {
      fieldA: 'value in field group',
    },
    schema: {
      properties: {
        group: {
          layout: {
            component: 'fields-group',
            schema: {
              properties: {
                fieldA: {
                  label: 'Root level field',
                  layout: {
                    component: 'text-field',
                  },
                },
              },
            },
          },
        },
        divider: {
          layout: {
            component: 'divider',
          },
          thickness: 20,
          color: 'blue',
        },
        fieldB: {
          content: 'This is text with value of fieldA: {fieldA:Default value}',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
      },
    },
  },
};

export const UseDependenciesInLabel: Story = {
  name: 'Example 6: Usage of values which are in form model to combine in label',
  play: async (context) => {
    const canvas = within(context.canvasElement);

    await context.step('Resolved deps on load', async () => {
      let labelResolved = await canvas.findAllByText('Price (net)');
      await expect(labelResolved.length).toEqual(4); // 2 visible and 2 not visible
    });

    await context.step('Resolved when variable changed', async () => {
      const gross = canvas.getByLabelText('at gross prices');
      await userEvent.click(gross, { delay: 200 });

      let labelResolved = await canvas.findAllByText('Price (gross)');
      await expect(labelResolved.length).toEqual(4); // 2 visible and 2 not visible
    });
  },
  args: {
    formModel: {
      data: {
        items: [
          {
            product: 'Computer',
            quantity: 1,
            price: 3200,
          },
          {
            product: 'Laptop',
            quantity: 2,
            price: 1334.23,
          },
        ],
      },
    },
    schema: {
      type: 'object',
      properties: {
        invoiceMetadata: {
          properties: {
            pricing: {
              label: 'The invoice is issued:',
              layout: { component: 'radio-button', cols: 3, fillRow: true } as Layout,
              default: { value: 'net', title: 'at net prices', formatted: 'net' },
              source: {
                items: [
                  { value: 'net', title: 'at net prices', formatted: 'net' },
                  { value: 'gross', title: 'at gross prices', formatted: 'gross' },
                ],
                returnObject: true,
              } as SimpleSource,
            } as EngineSourceField,
          },
        },
        data: {
          properties: {
            items: {
              layout: {
                component: 'duplicated-section',
                schema: {
                  properties: {
                    product: { label: 'Product', layout: { component: 'text-field', cols: 4 } },
                    quantity: {
                      label: 'Quantity',
                      type: 'number',
                      default: 1,
                      layout: { component: 'text-field', cols: 2 },
                    },
                    price: {
                      label: 'Price ({invoiceMetadata.pricing.formatted})',
                      type: 'number',
                      layout: { component: 'text-field', cols: 3 },
                    },
                  },
                },
              } as Layout,
            },
          },
        },
      },
    } as Schema,
  },
};

export const UseFormVariablesInFieldProps: Story = {
  name: 'Example 7: Usage of values which are in form model to combine in props',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const currency = canvas.getByLabelText('Currency');

    await context.step('Resolve dependency', async () => {
      await userEvent.click(currency, { pointerEventsCheck: 0, delay: 200 });
      const items = document.getElementsByClassName('v-list-item');
      await userEvent.click(items[0], { delay: 200 });

      const querySuffix = await canvas.findAllByText('AFN');
      let queryHint = await canvas.findAllByText('Digits after decimal = 2');

      await expect(querySuffix.length).toEqual(2);
      await expect(queryHint.length).toEqual(2);
    });

    await context.step('Dynamic changed already resolved', async () => {
      const items = document.getElementsByClassName('v-list-item');

      await userEvent.click(currency, { pointerEventsCheck: 0, delay: 200 });
      await userEvent.click(items[1], { delay: 200 });

      const queryHint = await canvas.findAllByText('Digits after decimal = 3');
      await expect(queryHint.length).toEqual(2);
    });
  },

  args: {
    formModel: {
      amount: 32,
      items: [{ item: 'Item 1', quantity: 3, price: 32.21 }],
    },
    schema: {
      properties: {
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
            cols: 3,
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
          } as DictionarySource,
        } as SchemaSourceField,
        amount: {
          label: 'Amount (outside)',
          type: 'number',
          layout: {
            component: 'text-field',
            cols: 3,
            props: {
              suffix: '{currency.id}',
              hint: 'Digits after decimal = {currency.digitsAfterDecimal}',
              'persistent-hint': true,
            },
          },
        } as SchemaTextField,
        items: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                item: {
                  label: 'Item',
                  layout: { component: 'text-field', cols: 3 },
                },
                quantity: {
                  label: 'Quantity',
                  type: 'number',
                  default: 1,
                  layout: { component: 'text-field', cols: 3 },
                },
                price: {
                  label: 'Price',
                  type: 'number',
                  layout: { component: 'text-field', cols: 3 },
                  props: {
                    suffix: '{currency.id}',
                    'persistent-hint': true,
                  },
                },
                summary: {
                  label: 'Amount',
                  type: 'number',
                  layout: {
                    component: 'text-field',
                    cols: 3,
                    props: {
                      suffix: '{currency.id}',
                      hint: 'Digits after decimal = {currency.digitsAfterDecimal}',
                      'persistent-hint': true,
                    },
                  },
                  calculation: 'quantity * price',
                } as SchemaTextField,
              },
            },
          },
        },
      },
    } as Schema,
    options: {
      digitsAfterDecimal: '{currency.digitsAfterDecimal}',
    } as SchemaOptions,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const UseVariableDependencyWithFallbackMessage: Story = {
  name: 'Example 8: Define fallback massage in case of unresolved dependency',
  play: async (context) => {
    const canvas = within(context.canvasElement);

    await context.step('Check default label with fallback message', async () => {
      let labelResolved = await canvas.findAllByText('Telephone with your country prefix');
      await expect(labelResolved.length).toEqual(2); // 1 visible and 1 not visible
    });

    await context.step('Check default label after variable set in model', async () => {
      const select = canvas.getByLabelText('Country');
      await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

      const items = document.getElementsByClassName('v-list-item');
      await userEvent.click(items[0], { delay: 200 });

      let labelResolved = await canvas.findAllByText('Telephone with PL prefix');
      await expect(labelResolved.length).toEqual(2); // 1 visible and 1 not visible
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            'If we want to have dependencies and a default value when this value is not yet in the model then we do it as follows: <b>path_to_variable:value_default</b>',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        country: {
          label: 'Country',
          layout: {
            component: 'select',
            cols: 3,
            fillRow: true,
          },
          source: {
            items: [{ value: 'PL', title: 'Poland' }],
          } as SimpleSource,
        },
        textField: {
          label: 'Telephone with {country:your country} prefix',
          layout: {
            component: 'text-field',
            cols: 3,
          },
        },
      },
    } as Schema,
  },
};

export const ComplexExample: Story = {
  name: 'Example 9: Complex example',
  args: {
    formModel: {
      dataId: '#01',
      name: 'Main name',
      products: [
        {
          dataId: '1',
          name: 'Test',
          description: 'Test',
          items: [{ item: 'Test' }],
        },
        {
          dataId: '2',
          name: 'Test2',
          description: 'Test2',
          items: [{ item: 'Test2' }],
        },
      ],
      products2: [
        {
          dataId: '1',
          name: 'Test',
          description: 'Test',
          items: [{ item: 'Test' }],
        },
        {
          dataId: '2',
          name: 'Test2',
          description: 'Test2',
          items: [{ item: 'Test2' }],
        },
      ],
    },
    schema: {
      properties: {
        dataId: {
          label: 'DataId {dataId}',
          layout: {
            component: 'text-field',
          },
        },
        name: {
          label: 'Name',
          layout: {
            component: 'text-field',
          },
        },
        products: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                dataId: {
                  label: 'dataId',
                  layout: {
                    component: 'text-field',
                    cols: 3,
                  },
                },
                name: {
                  label: 'name',
                  layout: {
                    component: 'text-field',
                    cols: 3,
                  },
                },
                merge2: {
                  content: '{dataId} main, {products[].dataId} - w section',
                  layout: {
                    component: 'static-content',
                    tag: 'span',
                    cols: 3,
                  },
                },
                items: {
                  layout: {
                    component: 'duplicated-section',
                    schema: {
                      properties: {
                        item: {
                          label: 'Item',
                          layout: {
                            component: 'text-field',
                            cols: 6,
                          },
                        },
                        turboMerge: {
                          content:
                            '{dataId} main, {products[].dataId} section, {products[].items[].item}',
                          layout: {
                            component: 'static-content',
                            tag: 'span',
                            cols: 3,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        group: {
          layout: {
            component: 'fields-group',
            cols: 6,
            schema: {
              properties: {
                products2: {
                  layout: {
                    component: 'duplicated-section',
                    schema: {
                      properties: {
                        dataId: {
                          label: 'dataId',
                          layout: {
                            component: 'text-field',
                            cols: 3,
                          },
                        },
                        name: {
                          label: 'name',
                          layout: {
                            component: 'text-field',
                            cols: 3,
                          },
                        },
                        merge2: {
                          content: '{dataId} głowne, {products[].dataId} - w sekcji',
                          layout: {
                            component: 'static-content',
                            tag: 'span',
                            cols: 3,
                          },
                        },
                        items: {
                          layout: {
                            component: 'duplicated-section',
                            schema: {
                              properties: {
                                item: {
                                  label: 'Item',
                                  layout: {
                                    component: 'text-field',
                                    cols: 6,
                                  },
                                },
                                turboMerge: {
                                  content:
                                    '{dataId} głowne, {products[].dataId} sekcja, {products[].items[].item}',
                                  layout: {
                                    component: 'static-content',
                                    tag: 'span',
                                    cols: 3,
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
