// @ts-nocheck
import { PointerEventsCheckLevel } from '@testing-library/user-event';
import { expect, userEvent, waitFor, within } from 'storybook/test';



import { Schema } from '../../types/schema/Schema';
import { BTN_MOCK } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';




































































export default {
  title: 'Elements/Editable/Button ✅',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
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
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
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
  name: 'Case: disabled',
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole('button', { name: 'Click it!' });
    await expect(button).toBeInTheDocument();

    const btnClasses = document.getElementsByClassName('v-btn--disabled v-btn--readonly');
    await expect(btnClasses.length).toEqual(1);
  },
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
  name: 'Mode: copy value to clipboard',
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
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
  play: async ({ canvasElement, context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });

    const canvas = within(canvasElement);
    const user = userEvent.setup({
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });

    const openButton = canvas.getByRole('button', { name: /Open dialog!/i });
    await user.click(openButton);

    await waitFor(() => {
      expect(document.querySelector('.v-overlay-container')).toBeInTheDocument();
    });

    const overlayContainer = document.querySelector('.v-overlay-container');
    const dialogCanvas = within(overlayContainer!);

    const input = dialogCanvas.getByRole('textbox', { name: /field a/i });
    await waitFor(() => {
      expect(input).toBeVisible();
      expect(input).not.toHaveAttribute('disabled');
    });

    await user.type(input, 'Test');
    await waitFor(() => {
      expect(input).toHaveValue('Test');
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
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole('button', { name: 'Emit action object!' });
    await expect(button).toBeInTheDocument();
    await button.click();

    await waitFor(() => {
      expect(context.args.emittedObject.code).toEqual('my_action_code');
      expect(context.args.emittedObject.params.script).toEqual('temp');
    });
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
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole('button', { name: 'Call API' });
    await expect(button).toBeInTheDocument();

    await button.click();

    await waitFor(() => {
      expect(context.args.emittedObject.code).toEqual('refresh-attachments');
    });
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
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole('button', { name: 'Call API' });
    await expect(button).toBeInTheDocument();

    const fieldA = await canvas.findByLabelText('Field A');
    await userEvent.type(fieldA, 'Should wait for this', {
      delay: 100,
    });
    await button.click();

    await waitFor(() => {
      expect(context.args.emittedObject.code).toEqual('refresh-attachments');
    });
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


export const Redirect: Story = {
  name: 'Mode: Redirect',
  args: {
    formModel: {
      designs: [
        {
          designReference: {
            id: '221012cf-0b62-4548-857c-61d2f8dc7035',
            description: '',
            label: 'Design 1',
          },
        },
      ],
    },
    emittedObject: {},
    schema: {
      type: 'object',
      properties: {
        projectDesignsGroup: {
          layout: {
            component: 'fields-group',
            schema: {
              type: 'object',
              properties: {
                designsAndGraphicsTitle: {
                  content: 'Designs & Graphics',
                  layout: { tag: 'h2', component: 'static-content' },
                },
                designsAndGraphicsAlert: {
                  memorable: false,
                  content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                  layout: { component: 'alert' },
                },
                designs: {
                  layout: {
                    component: 'duplicated-section',
                    schema: {
                      type: 'object',
                      properties: {
                        designReference: {
                          label: 'Design',
                          layout: {
                            cols: { xs: 12, sm: 6, md: 6, lg: 8, xl: 8, xxl: 8 },
                            component: 'dictionary',
                          },
                          source: {
                            url: '/api/dictionaries?feature-id=design-repository&lm=name&vm=dataId',
                            title: 'label',
                            value: 'id',
                            description: 'description',
                            returnObject: true,
                            lazy: true,
                            singleOptionAutoSelect: true,
                            multiple: false,
                            maxSelection: 0,
                          },
                          onChange: [],
                        },
                        redirectToDesignBtn: {
                          label: 'Go to design',
                          layout: {
                            component: 'button',
                            cols: { xs: 6, sm: 6, md: 6, lg: 2, xl: 2, xxl: 2 },
                            if: 'nata(designs[].designReference!=null)',
                          },
                          mode: 'redirect',
                          config: {
                            params: {
                              menuFeatureId: 'design-details',
                              dataId: '{designs[].designReference.id}',
                            },
                          },
                        },
                        addNewDesignBtn: {
                          label: 'Add new design',
                          layout: {
                            component: 'button',
                            cols: { xs: 6, sm: 6, md: 6, lg: 2, xl: 2, xxl: 2 },
                            fillRow: true,
                            if: 'nata(designs[].designReference=null)',
                          },
                          mode: 'action',
                          config: {},
                        },
                        regManDesignDecision: {
                          label: 'Decision',
                          layout: {
                            cols: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
                            fillRow: true,
                            component: 'radio-button',
                            props: { inline: true },
                            if: "nata(processStep = 'CMPL')",
                          },
                          source: {
                            items: [
                              { value: 'ok', title: 'Ok' },
                              { value: 'notBad', title: 'Not bad' },
                              { value: 'bad', title: 'Bad' },
                            ],
                            returnObject: true,
                          },
                          onChange: [],
                        },
                      },
                      required: ['regManDesignDecision'],
                    },
                    options: {
                      addBtnText: 'Add element',
                      showDivider: false,
                      ordinalNumberInModel: false,
                      showFirstInitRow: true,
                    },
                  },
                  editable: true,
                  showElements: true,
                  onChange: [],
                },
              },
            },
            options: { showDivider: false, addBtnText: 'Add' },
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


