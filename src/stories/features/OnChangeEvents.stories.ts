// @ts-nocheck
import { expect, fireEvent, userEvent, within } from '@storybook/test';

import { DictionarySource } from '../../types/shared/Source';
import { waitForMountedAsync } from '../editable-fields/utils';
import { CURRENCIES_REQUEST } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';





export default {
  title: 'Features/OnChange events',
  ...formStoryWrapperTemplate,
};

export const CallActionWithParametersAndRequestBody: Story = {
  name: "Case: form action will be send after value change",
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            "Definition of the onChange event, which triggers an action with a given code. Additionally, we can specify HTTP request parameters and a body mapping that will be sent to the action's endpoint. The form exposes a callback() function in the object sent to the Host. When this function is called, the form refreshes its data model to remain reactive to changes from the third-party application.",
          layout: {
            component: 'static-content',
            tag: 'p',
          },
        },
        checkConsole: {
          content: 'Check browser console!',
          layout: {
            component: 'static-content',
            tag: 'p',
          },
        },
        actionOnChange: {
          label: 'Action on change value',
          layout: {
            component: 'text-field',
          },
          onChange: {
            mode: 'action',
            code: 'callScript',
            params: {
              scriptName: 'checkIfDuplicate',
            },
            body: {
              number: '{supplier.number}',
              invoiceNumber: '{invoice.number}',
            },
          },
        },
      },
    },
  },
};

export const ResetValueOnChange: Story = {
  name: "Case: reset value of other property in model",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    let textField = canvas.getByLabelText('Field A');
    await userEvent.type(textField, 'Changed', {
      delay: 100,
    });
    await new Promise((r) => setTimeout(r, 1000));
    await expect(context.args.formModel).toEqual({ fieldA: 'Changed', fieldB: null });
  },
  args: {
    formModel: {
      fieldB: 'Maciej',
    },
    schema: {
      type: 'object',
      properties: {
        fieldA: {
          label: 'Field A',
          layout: {
            component: 'text-field',
          },
          onChange: {
            mode: 'change-model',
            variables: [
              {
                path: 'fieldB',
                value: null,
              },
            ],
          },
        },
        fieldB: {
          label: 'Field B',
          layout: {
            component: 'text-field',
          },
        },
      },
      required: [],
    },
  },
};

export const ResetValueOnChangeInDuplicatedSection: Story = {
  name: "Case: reset value of other property (duplicate section) in model",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    let textField = canvas.getByLabelText('Field A');
    await userEvent.type(textField, 'Changed', {
      delay: 100,
    });
    await new Promise((r) => setTimeout(r, 1000));
    await expect(context.args.formModel).toEqual({
      section: [{ fieldA: 'Changed', fieldB: null }],
    });
  },
  args: {
    formModel: {
      section: [
        {
          fieldB: 'Maciej',
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        section: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                fieldA: {
                  label: 'Field A',
                  layout: {
                    component: 'text-field',
                  },
                  onChange: {
                    mode: 'change-model',
                    variables: [
                      {
                        path: 'fieldB',
                        value: null,
                      },
                    ],
                  },
                },
                fieldB: {
                  label: 'Field B',
                  layout: {
                    component: 'text-field',
                  },
                },
              },
            },
          },
        },
      },
      required: [],
    },
  },
};

export const ResetValueOnChangeInDuplicatedSectionWithDictionary: Story = {
  name: "Case: reset value of dictionary in duplicated section",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const list = document.getElementsByClassName('v-list');
    fireEvent.scroll(list[0], { target: { scrollTop: 0 } });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });

    await new Promise((r) => setTimeout(r, 1000));
    await expect(context.args.formModel).toEqual({
      section: [
        {
          currency: {
            id: 'USD',
            label: 'US Dollar',
          },
          fieldB: null,
        },
      ],
    });
  },
  args: {
    formModel: {
      section: [
        {
          fieldB: 'Maciej',
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        section: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                currency: {
                  label: 'Currency',
                  layout: {
                    component: 'dictionary',
                  },
                  source: {
                    url: '/mock-data/currencies',
                    title: 'label',
                    value: 'id',
                  } as DictionarySource,
                  onChange: {
                    mode: 'change-model',
                    variables: [
                      {
                        path: 'fieldB',
                        value: null,
                      },
                    ],
                  },
                } as SchemaSourceField,
                fieldB: {
                  label: 'Field B',
                  layout: {
                    component: 'text-field',
                  },
                },
              },
            },
          },
        },
      },
      required: [],
    },
  },
  parameters: {
    msw: {
      handlers: [CURRENCIES_REQUEST],
    },
  },
};
