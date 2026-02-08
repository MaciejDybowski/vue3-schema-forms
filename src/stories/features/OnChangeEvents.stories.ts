// @ts-nocheck
import { Story } from 'storybook/dist/csf';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';



import { DictionarySource } from '../../types/shared/Source';
import { waitForMountedAsync } from '../editable-fields/utils';
import { CURRENCIES_REQUEST } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';










































































































































export default {
  title: 'Features/OnChange events',
  ...formStoryWrapperTemplate,
};

export const ConditionalOnChangeCopyValue: Story = {
  name: 'Case: copy value only when condition is met',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    // Select the dropdown
    const select = canvas.getByLabelText('Select');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    // Wait for the dropdown list to appear
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });

    // Select "Option 2" (value: 2) - condition should NOT be met
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[1], { delay: 200 }); // Option 2

    await new Promise((r) => setTimeout(r, 500));

    // Verify that 'smart' field was NOT updated because condition (value=1) is not met
    await expect(context.args.formModel.smart).toBeUndefined();

    // Now select "Option 1" (value: 1) - condition SHOULD be met
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });

    const itemsAgain = document.getElementsByClassName('v-list-item');
    await userEvent.click(itemsAgain[0], { delay: 200 }); // Option 1

    await new Promise((r) => setTimeout(r, 1200));

    // Verify that 'smart' field WAS updated because condition (value=1) is met
    await expect(context.args.formModel.smart).toBe('Option 1');
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        testSlownik: {
          label: 'Select',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            fillRow: true,
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
          onChange: [
            {
              mode: 'change-model',
              variables: [
                {
                  path: 'smart',
                  value: '{testSlownik.title}',
                  if: 'testSlownik.value=1',
                },
              ],
            },
          ],
        },
        smart: {
          label: 'Sth field',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            fillRow: true,
            component: 'text-field',
          },
        },
      },
    },
  },
};

export const CallActionWithParametersAndRequestBody: Story = {
  name: 'Case: form action will be send after value change',
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
          onChange: [
            {
              mode: 'action',
              code: 'callScript',
              params: {
                script: 'checkIfDuplicate',
              },
              body: {
                number: '{supplier.number}',
                invoiceNumber: '{invoice.number}',
              },
            },
          ],
        },
      },
    },
  },
};

export const ResetValueOnChange: Story = {
  name: 'Case: reset value of other property in model',
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
          onChange: [
            {
              mode: 'change-model',
              variables: [
                {
                  path: 'fieldB',
                  value: null,
                },
              ],
            },
          ],
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
  name: 'Case: reset value of other property (duplicate section) in model',
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
                  onChange: [
                    {
                      mode: 'change-model',
                      variables: [
                        {
                          path: 'fieldB',
                          value: null,
                        },
                      ],
                    },
                  ],
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
  name: 'Case: reset value of dictionary in duplicated section',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Currency');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const list = document.getElementsByClassName('v-list');
    await fireEvent.scroll(list[0], { target: { scrollTop: 0 } });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
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
                  onChange: [
                    {
                      mode: 'change-model',
                      variables: [
                        {
                          path: 'fieldB',
                          value: null,
                        },
                      ],
                    },
                  ],
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



export const ChangeModelAndAction: Story = {
  name: 'Change-model then action',
  play: async (context) => {


    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const source = canvas.getByLabelText('Source');
    await userEvent.type(source, 'Hello', { delay: 50 });

    // debounce in handler is 400ms in implementation — wait a bit more
    await new Promise((r) => setTimeout(r, 700));

    // after onChange handlers run, target should be updated by change-model handler
    await expect(context.args.formModel.target).toBe('Hello');
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        source: {
          label: 'Source',
          layout: { component: 'text-field' },
          onChange: [
            {
              mode: 'change-model',
              variables: [
                {
                  path: 'target',
                  value: '{source}',
                },
              ],
            },
            {
              mode: 'action',
              code: 'logToHost',
              params: {
                message: '{source}',
              },
            },
          ],
        },
        target: {
          label: 'Target',
          layout: { component: 'text-field' },
        },
      },
    },
  },
};

export const EmitEventAndConditionalReset: Story = {
  name: 'Emit event and conditional reset',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const source = canvas.getByLabelText('Trigger');
    await userEvent.type(source, 'reset', { delay: 50 });
    await new Promise((r) => setTimeout(r, 700));

    await expect(context.args.formModel.target).toBeNull();
  },
  args: {
    formModel: { target: 'initial' },
    schema: {
      type: 'object',
      properties: {
        trigger: {
          label: 'Trigger',
          layout: { component: 'text-field' },
          onChange: [
            {
              mode: 'emit-event',
              eventSignal: 'source-changed',
            },
            {
              mode: 'change-model',
              variables: [
                {
                  path: 'target',
                  value: null,
                  if: "trigger='reset'",
                },
              ],
            },
          ],
        },
        target: {
          label: 'Target',
          layout: { component: 'text-field' },
        },
      },
    },
  },
};

