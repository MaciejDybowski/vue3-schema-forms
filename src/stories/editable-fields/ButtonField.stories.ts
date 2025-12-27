// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { BTN_MOCK } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync, waitForVuetifyDialogReady, waitForVuetifyInputReady } from './utils';













export default {
  title: 'Elements/Editable/Button',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole('button', { name: 'Click it!' });
    await expect(button).toBeInTheDocument();
  },
  args: {
    schema: {
      type: 'object',
      properties: {
        textArea: {
          label: 'Click it!',
          layout: {
            component: 'button',
          },
        },
      },
    } as Schema,
  },
};

export const WithProps: Story = {
  name: 'Case: customization',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole('button', { name: 'Click it!' });
    await expect(button).toBeInTheDocument();

    const btnClasses = document.getElementsByClassName('mdi-plus mdi v-icon');
    await expect(btnClasses.length).toEqual(1);
  },
  args: {
    schema: {
      type: 'object',
      properties: {
        textArea: {
          label: 'Click it!',
          layout: {
            component: 'button',
            props: {
              'prepend-icon': 'mdi-plus',
            },
          },
        },
      },
    } as Schema,
  },
};

export const Disabled: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole('button', { name: 'Click it!' });
    await expect(button).toBeInTheDocument();

    const btnClasses = document.getElementsByClassName('v-btn--disabled v-btn--readonly');
    await expect(btnClasses.length).toEqual(1);
  },
  name: 'Case: disabled',
  args: {
    formModel: {
      itemId: 'item-1',
      example1: 'Example',
      item: {
        example2: 'Example 2',
      },
    },
    schema: {
      type: 'object',
      properties: {
        button: {
          label: 'Click it!',
          layout: {
            component: 'button',
          },
          mode: 'api-call',
          config: {
            source: '/mocks/files/{itemId}',
            method: 'PUT',
            body: {
              example1: '{example1}',
              example2: '{item.example2}',
            },
          },
        },
      },
    },
    options: {
      buttonProps: {
        readonly: true,
      },
    },
  },
};

export const CopyToClipboard: Story = {
  name: 'Mode: copy value to clipboard  ',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole('button', { name: 'Copy above' });
    await expect(button).toBeInTheDocument();

    const copiedValues: string[] = [];
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: (text) => {
        window.__copiedText = text;
        copiedValues.push(text);
        return Promise.resolve();
      },
    });

    await button.click();
    await expect(copiedValues[0]).toEqual('Lorem ipsum...');
  },
  args: {
    formModel: {
      input: 'Lorem ipsum...',
    },
    schema: {
      type: 'object',
      properties: {
        input: {
          label: 'Input',
          layout: {
            component: 'text-area',
          },
        },
        button: {
          label: 'Copy above',
          layout: {
            component: 'button',
            props: {
              'append-icon': 'mdi-content-copy',
            },
          },
          mode: 'copy',
          config: {
            modelReference: 'input',
          },
        },
      },
    },
  },
};

export const DialogWithInjectedForm: Story = {
  name: 'Mode: dialog with internal form',

  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const openButton = await canvas.findByRole('button', {
      name: 'Open dialog!',
    });

    await userEvent.click(openButton);

    await waitForVuetifyDialogReady();
    const dialogCanvas = within(document.body);
    const fieldA = await dialogCanvas.findByLabelText('field A');

    await waitForVuetifyInputReady(fieldA);

    await userEvent.clear(fieldA);
    await userEvent.type(fieldA, 'Test');

    const copyButton = await dialogCanvas.findByRole('button', {
      name: 'Copy field A',
    });

    await userEvent.click(copyButton);
    const saveButton = await dialogCanvas.findByRole('button', {
      name: 'Save',
    });

    await userEvent.click(saveButton);
    await waitFor(() => {
      expect(context.args.emittedObject.code).toBe('my_action_code');
      expect(context.args.emittedObject.body.fieldA).toBe('Test');
    });
  },

  args: {
    formModel: {},
    emittedObject: {},
    schema: {
      type: 'object',
      properties: {
        button: {
          label: 'Open dialog!',
          layout: {
            component: 'button',
          },
          mode: 'form-and-action',
          config: {
            code: 'my_action_code',
            modelReference: 'popupModel',
            title: 'Title of the dialog - static text without deps',
            acceptText: 'Save',
          },
          schema: {
            properties: {
              fieldA: {
                label: 'field A',
                layout: {
                  component: 'text-field',
                  cols: 4,
                },
              },
              fieldB: {
                label: 'field B',
                layout: {
                  component: 'text-field',
                  cols: 4,
                },
              },
              fieldC: {
                label: 'field C',
                layout: {
                  component: 'text-field',
                  cols: 4,
                },
              },
              button: {
                label: 'Copy field A',
                layout: {
                  component: 'button',
                  props: {
                    'append-icon': 'mdi-content-copy',
                  },
                  cols: 6,
                },
                mode: 'copy',
                config: {
                  modelReference: 'fieldA',
                },
              },
            },
          },
        },
      },
    },
  },
};

export const EmitActionObject: Story = {
  name: 'Mode: emit action object',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole('button', { name: 'Emit action object!' });
    await expect(button).toBeInTheDocument();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await button.click();

    await expect(context.args.emittedObject.code).toEqual('my_action_code');
    await expect(context.args.emittedObject.params.script).toEqual('temp');
  },
  args: {
    formModel: {},
    emittedObject: {},
    schema: {
      type: 'object',
      properties: {
        button: {
          label: 'Emit action object!',
          layout: {
            component: 'button',
          },
          mode: 'action',
          config: {
            code: 'my_action_code',
            params: {
              script: 'temp',
            },
          },
        },
      },
    },
  },
};

export const APICall: Story = {
  name: 'Mode: API call with emit event',
  play: async (context) => {
    await waitForMountedAsync();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole('button', { name: 'Call API' });
    await expect(button).toBeInTheDocument();

    button.click();

    await new Promise((resolve) => setTimeout(resolve, 400));
    await expect(context.args.emittedObject.code).toEqual('refresh-attachments');
  },
  args: {
    formModel: {
      itemId: 'item-1',
      example1: 'Example',
      item: {
        example2: 'Example 2',
      },
    },
    emittedObject: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            'Btn has ability to call API directly with mapped body and params object, after that it can emit event with action code',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        button: {
          label: 'Call API',
          layout: {
            component: 'button',
          },
          mode: 'api-call',
          config: {
            source: '/mocks/files/{itemId}',
            method: 'POST',
            body: {
              example1: '{example1}',
              example2: '{item.example2}',
            },
            emit: {
              code: 'refresh-attachments',
            },
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: BTN_MOCK,
    },
  },
};

export const APICallWaitForSave: Story = {
  name: 'Mode: API call with emit event and wait for saved state',
  play: async (context) => {
    await waitForMountedAsync();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole('button', { name: 'Call API' });
    await expect(button).toBeInTheDocument();

    const fieldA = await canvas.findByLabelText('Field A');
    await userEvent.type(fieldA, 'Should wait for this', {
      delay: 100,
    });
    button.click();

    await new Promise((resolve) => setTimeout(resolve, 400));
    await expect(context.args.emittedObject.code).toEqual('refresh-attachments');
  },
  args: {
    formModel: {
      itemId: 'item-1',
      example1: 'Example',
      item: {
        example2: 'Example 2',
      },
    },
    emittedObject: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            "VueSchemaForms component expose variable formDataWasSaved for manage state of form. If some fields on form has impact for API Call we should add `waitForSaveState:true` and button will wait for next 'saved' state. For start/default form state is saved (true)",
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        fieldA: {
          label: 'Field A',
          layout: {
            component: 'text-field',
          },
        },
        button: {
          label: 'Call API',
          layout: {
            component: 'button',
          },
          mode: 'api-call',
          config: {
            source: '/mocks/files/{itemId}',
            method: 'POST',
            body: {
              example1: '{example1}',
              example2: '{item.example2}',
            },
            waitForSaveState: true,
            emit: {
              code: 'refresh-attachments',
            },
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: BTN_MOCK,
    },
  },
};
