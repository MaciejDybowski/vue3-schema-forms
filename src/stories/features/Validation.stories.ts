// @ts-nocheck
import { expect, userEvent, within } from '@storybook/test';

import { Schema } from '../../types/schema/Schema';
import { SchemaField } from '../../types/schema/elements';
import { waitForMountedAsync } from '../editable-fields/utils';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { StoryTemplateWithCustomValidation } from '../templates/story-template';

export default {
  title: 'Features/Validations',
  ...formStoryWrapperTemplate,
};

export const RegexpWithDependencies: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 100 });

    const field = canvas.getByLabelText('Field with validation');
    await userEvent.type(field, '3.2123', { delay: 100 });

    await expect(canvas.getByText('Zbyt dużo znaków po przecinku')).toBeInTheDocument();
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
              message: 'Akceptowalna jest tylko liczba dodatnia',
              regexp: '^[0-9]\\d*(\\.\\d+)?$',
            },
            {
              name: 'regexpForDigitsLimitation',
              message: 'Zbyt dużo znaków po przecinku',
              regexp: '^\\d+(\\.\\d{0,{fieldA}})?$',
            },
          ],
        },
      },
    },
  },
};

export const CustomRegexpValidations: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 100 });

    await expect(canvas.getByText('Email must be valid')).toBeInTheDocument();

    const field = canvas.getByLabelText('Email');
    await userEvent.type(field, 'maciejdybowski@github.com', { delay: 100 });

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
 * #### Required field with nested
 */
export const RequiredWithNested: Story = {
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
      required: ['item1'] as Schema,
    },
  },
};

const validationExample = {
  type: 'object',
  properties: {
    field1: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field2: { label: 'Identifier', layout: { component: 'text-field' } } as SchemaField,
    field3: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field4: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field5: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field6: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field7: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field8: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field9: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field10: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field11: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field12: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field13: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field14: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field15: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field16: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field17: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
    field18: { label: 'Field 1', layout: { component: 'text-field' } } as SchemaField,
  },
  required: ['field2'],
} as Schema;
export const ExposedValidationAndScroll: Story = {
  args: {
    defaultFormActions: true,
    validationBehaviour: 'scroll',
    formModel: {},
    schema: validationExample,
  },
};

export const ExposedValidationAndScrollWithRules: Story = {
  args: {
    defaultFormActions: true,
    validationBehaviour: 'scroll',
    formModel: {},
    schema: {
      properties: {
        fieldA: {
          label: 'Field A',
          layout: {
            component: 'text-field',
          },
          validations: [
            {
              name: 'valid-sth',
              rule: 'fieldA != fieldB',
              message: 'Custom message',
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
};

export const ExposedValidationAndMessages: Story = {
  args: {
    defaultFormActions: true,
    validationBehaviour: 'messages',
    formModel: {},
    schema: validationExample,
  },
};

export const AddCustomSubmitWithBuiltInValidation: Story = {
  render: StoryTemplateWithCustomValidation,
  args: {
    formModel: {},
    schema: validationExample,
  },
};

/**
 * #### Warunkową wymagalność pola możemy zdefiniować dodając obiekt do tablicy `validations`, gdzie nazwa to `conditional-required` a warunek zgodny z JSONata
 */
export const ConditionalRequired: Story = {
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
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();

    const select = canvas.getByLabelText('Select with condition');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

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

/**
 * #### Można definiować funkcje walidacyjne oparte o budowanie warunków JSONata
 */
export const ValidationFunctionWithJSONNataAndContext: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();

    let textField = canvas.getByLabelText('Username');
    await userEvent.type(textField, 'Maciej', {
      delay: 100,
    });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Custom message')).toBeInTheDocument();

    const textField2 = canvas.getByLabelText('Username');
    await userEvent.type(textField2, 'Karol', {
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
              message: 'Custom message',
            },
          ],
        },
      },
    },
    options: {
      context: {
        currentUser: {
          username: 'Maciej',
        },
      },
    },
  },
};

export const ValidationFunctionInSections: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Value=Maciej is not allowed.')).toBeInTheDocument();
  },

  args: {
    formModel: {
      pozycjeDokumentu: [{ fieldA: 'Karol' }, { fieldA: 'Maciej' }],
    },
    schema: {
      type: 'object',
      properties: {
        pozycjeDokumentu: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                fieldA: {
                  label: 'FieldA',
                  layout: {
                    component: 'text-field',
                    cols: 6,
                  },
                  validations: [
                    {
                      name: 'valid-sth',
                      rule: 'pozycjeDokumentu[].fieldA!=context.currentUser.username',
                      message: 'Value=Maciej is not allowed.',
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
      context: {
        currentUser: {
          username: 'Maciej',
        },
      },
    },
  },
};

export const AlertErrorConnectionWithValidation: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Error message!')).toBeInTheDocument();
  },

  args: {
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

export const JsonataDateCompare: Story = {
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
