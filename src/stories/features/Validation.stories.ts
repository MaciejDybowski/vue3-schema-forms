// @ts-nocheck
import { Story } from 'storybook/dist/csf';
import { expect, userEvent, waitFor, within } from 'storybook/test';



import { Schema } from '../../types/schema/Schema';
import { SchemaField } from '../../types/schema/elements';
import { waitForMountedAsync } from '../editable-fields/utils';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
















































export default {
  title: 'Features/Validations',
  ...formStoryWrapperTemplate,
};

export const Required: Story = {
  name: 'Example: define required field',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 100 });

    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        item1: {
          label: 'Normal Item',
          layout: { component: 'text-field' },
        },
      },
      required: ['item1'],
    },
  },
};

export const RequiredWithNested: Story = {
  name: 'Example: define required field in nested object',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 100 });

    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        item1: {
          label: 'Normal Item',
          layout: { component: 'text-field' },
        },
        nested: {
          properties: {
            item2: {
              label: 'Nested Item',
              layout: { component: 'text-field' },
            },
          },
          required: ['item2'],
        },
      },
    },
  },
};

export const RegexpWithDependencies: Story = {
  name: 'Example: using regexp expression for validation with params',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 100 });

    const field = canvas.getByLabelText('Field with validation');
    await userEvent.type(field, '3.2123', { delay: 100 });
    await userEvent.tab()

    await expect(canvas.getByText('To much digits')).toBeInTheDocument();
  },
  args: {
    formModel: {
      fieldA: 3,
    },
    schema: {
      properties: {
        fieldA: {
          label: 'FieldA',
          type: 'int',
          layout: {
            component: 'number-field',
          },
        },
        fieldWithValidation: {
          label: 'Field with validation',
          type: 'float',
          precision: 5,
          layout: {
            component: 'number-field',
          },
          validations: [
            {
              name: 'regexpForDigitsLimitation',
              message: 'Acceptable number above 0',
              regexp: '^[0-9]\\d*(\\.\\d+)?$',
            },
            {
              name: 'regexpForDigitsLimitation',
              message: 'To much digits',
              regexp: '^\\d+(\\.\\d{0,{fieldA}})?$',
            },
          ],
        },
      },
    },
  },
};

export const CustomRegexpValidations: Story = {
  name: 'Example: using regexp expression for validation with translation',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 100 });

    await expect(canvas.getByText('Email must be valid')).toBeInTheDocument();

    const field = canvas.getByLabelText('Email');
    await userEvent.type(field, 'john_smith@github.com', { delay: 100 });

    await userEvent.click(Submit, { delay: 100 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        email: {
          label: 'Email',
          layout: {
            component: 'text-field',
          },
          validations: [
            {
              regexp: '([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)',
              message: { $ref: '#/i18n/~$locale~/emailIsNotValid' },
            },
          ],
        } as SchemaField,
      },
      i18n: {
        pl: {
          emailIsNotValid: 'Adres e-mail nie jest poprawny',
        },
        en: {
          emailIsNotValid: 'Email must be valid',
        },
      },
    } as Schema,
  },
};

/**
 * #### Conditional field requirement can be defined by adding an object to the `validations` array,
 * where the name is `conditional-required` and the condition is specified using JSONata.
 */
export const ConditionalRequired: Story = {
  name: 'Example: built-in conditional required with JSONata',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();

    const field = canvas.getByLabelText('Is field required?');
    await userEvent.click(field, { delay: 200 });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();

    const textField = canvas.getByLabelText('Text-field');
    await userEvent.type(textField, 'Required field', {
      delay: 100,
    });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },

  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {
        fieldA: {
          label: 'Is field required?',
          layout: {
            component: 'switch',
          },
        },
        fieldB: {
          label: 'Text-field',
          layout: {
            component: 'text-field',
          },
          validations: [
            {
              name: 'conditional-required',
              rule: 'fieldA=true',
            },
          ],
        },
      },
    },
  },
};

export const ConditionalRequiredWithDefault: Story = {
  name: 'Example: built-in conditional required with JSONata and default',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();

    const select = canvas.getByLabelText('Select with condition');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[1], { delay: 200 });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },

  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            "When field could be not defined on start you should add option 'or $not($exists(your_field))' for default value of required",
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        fieldC: {
          label: 'Select with condition',
          layout: {
            component: 'select',
          },
          source: {
            items: [
              { value: 'yes', title: 'Field is required' },
              { value: 'no', title: 'Field is not required' },
            ],
            returnObject: true,
          },
        },
        fieldD: {
          label: 'Text-area',
          layout: {
            component: 'text-area',
          },
          validations: [
            {
              name: 'conditional-required',
              rule: "fieldC.value='yes' or $not($exists(fieldC))",
            },
          ],
        },
      },
    },
  },
};

export const AlertErrorConnectionWithValidation: Story = {
  name: 'Example: alert with error props trigger validation error',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Error message!')).toBeInTheDocument();
    await expect(canvas.getByText('Alert')).toBeInTheDocument();
  },

  args: {
    validationBehaviour: 'messages',
    formModel: {},
    schema: {
      properties: {
        alert: {
          content: 'Error message!',
          layout: {
            component: 'static-content',
            tag: 'v-alert',
            props: {
              type: 'error',
              variant: 'outlined',
            },
          },
        },
        field: {
          label: 'Field A',
          layout: {
            component: 'text-field',
          },
        },
      },
    },
  },
};

export const ValidationFunctionWithJSONNataAndContext: Story = {
  name: 'Example: using JSONata expression with context object',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();

    let textField = canvas.getByLabelText('Username');
    await userEvent.type(textField, 'john_smith', {
      delay: 100,
    });

    await userEvent.click(Submit, { delay: 200 });
    await expect(
      canvas.getByText('For some reason this value is not allowed.'),
    ).toBeInTheDocument();

    await userEvent.clear(textField);
    await userEvent.type(textField, 'carol_brown', {
      delay: 100,
    });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },

  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {
        username: {
          label: 'Username',
          layout: {
            component: 'text-field',
          },
          validations: [
            {
              name: 'valid-sth',
              rule: 'username!=context.currentUser.username or $not($exists(username))',
              message: 'For some reason this value is not allowed.',
            },
          ],
        },
      },
    },
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'comfortable',
      },
      context: {
        currentUser: {
          username: 'john_smith',
        },
      },
    },
  },
};

export const ValidationFunctionInSections: Story = {
  name: 'Example: using JSONata expression in duplicated section and context object',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Value not allowed.')).toBeInTheDocument();
  },

  args: {
    formModel: {
      nicknames: [{ nickname: 'carol_brown' }, { nickname: 'john_smith' }],
    },
    schema: {
      type: 'object',
      properties: {
        nicknames: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                nickname: {
                  label: 'nickname',
                  layout: {
                    component: 'text-field',
                    cols: 6,
                  },
                  validations: [
                    {
                      name: 'valid-sth',
                      rule: 'nicknames[].nickname!=context.currentUser.username',
                      message: 'Value not allowed.',
                    },
                  ],
                },
              },
            },
            options: {
              addBtnText: 'Add',
            },
          },
        },
      },
    },
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'comfortable',
      },
      context: {
        currentUser: {
          username: 'john_smith',
        },
      },
    },
  },
};

export const JsonataDateCompare: Story = {
  name: 'Example: using complex JSONata function for date comparison',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const validFrom = canvas.getByLabelText('Valid From');
    const validTo = canvas.getByLabelText('Valid To');
    const submit = canvas.getByText('Validate');

    const clearField = async (field: HTMLElement) => {
      await userEvent.clear(field);
    };

    const cases = [
      [null, null, true],
      [null, '', true],
      ['', null, true],
      ['01/01/2025', null, true],
      [null, '01/01/2025', true],
      ['01/01/2025', '01/02/2025', true],
      ['01/02/2025', '01/01/2025', false],
      ['01/29/2024', '01/29/2024', false],
    ];

    for (const [fromVal, toVal, expectedValid] of cases) {
      await clearField(validFrom);
      await clearField(validTo);

      if (fromVal !== null && fromVal !== '') {
        await userEvent.type(validFrom, fromVal);
      }
      if (toVal !== null && toVal !== '') {
        await userEvent.type(validTo, toVal);
      }

      await userEvent.click(submit, { delay: 200 });

      // delay 300ms na walidację UI
      await new Promise((r) => setTimeout(r, 300));

      if (expectedValid) {
        await expect(
          canvas.queryByText('The end date of the offer cannot be earlier than the start date.'),
        ).not.toBeInTheDocument();
      } else {
        await expect(
          canvas.getByText('The end date of the offer cannot be earlier than the start date.'),
        ).toBeInTheDocument();
      }
    }
  },

  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {
        span: {
          content:
            '($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(validFrom, validTo))',
          layout: {
            component: 'static-content',
            tag: 'span',
          } as Layout,
        },
        validFrom: {
          label: 'Valid From',
          layout: {
            component: 'date-picker',
          },
        },
        validTo: {
          label: 'Valid To',
          layout: {
            component: 'date-picker',
          },
          validations: [
            {
              name: 'valid-sth',
              rule: '($isValidRange := function($from, $to) { ($exists($from) and $from != null and $exists($to) and $to != null) ? $toMillis($from) < $toMillis($to) : true }; $isValidRange(validFrom, validTo))',
              message: 'The end date of the offer cannot be earlier than the start date.',
            },
          ],
        },
      },
    },
  },
};


export const useDisableValidationWhenHidden: Story = {
  name: "Example: disableValidationWhenHidden property",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('This is an error message')).toBeInTheDocument();

    const switchField = canvas.getByLabelText('Change it!');
    await userEvent.click(switchField, { delay: 200 });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();

    const textField = canvas.getByLabelText('Text field');
    await userEvent.type(textField, 'Some value', { delay: 100 });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('This is an error message')).toBeInTheDocument();
  },
  args: {
    formModel: {
      switch: false,
      validationMessages: [
        {
          code: 'ERR001',
          message: 'This is an error message',
          severity: 'error',
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        switch: {
          label: 'Change it!',
          layout: {
            component: 'switch',
          },
        },
        validationMessages: {
          layout: {
            component: 'validation-messages-viewer',
            hide: `nata(switch=false)`,
            props: {
              variant: 'tonal',
            },
          },
        },
        textField: {
          label: 'Text field',
          layout: {
            component: 'text-field',
            hide: `nata(switch=false)`,
            disableValidationWhenHidden: true,
          },
        },
      },
      required: ['textField'],
    },
  },
};
