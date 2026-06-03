// @ts-nocheck
import { expect, fireEvent, userEvent, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Editable/NumberField',
  ...formStoryWrapperTemplate,
};

export const TypeInteger: Story = {
  name: 'Integer',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('Number field');
    await userEvent.type(field, '{backspace}');
    await userEvent.type(field, '1', { delay: 300 });
    await expect(context.args.formModel).toEqual({ numberField: 1 });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        numberField: {
          label: 'Number field',
          type: 'int',
          layout: {
            component: 'number-field',
          },
        },
      },
    } as Schema,
  },
};

export const TypeFloat: Story = {
  name: 'Float',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('Number field');
    await userEvent.type(field, '{backspace}');
    await userEvent.type(field, '1.25', { delay: 300 });
    await expect(context.args.formModel).toEqual({ numberField: 1.25 });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        span: {
          content: 'If `type=float` precision is equal 2',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        numberField: {
          label: 'Number field',
          type: 'float',
          layout: {
            component: 'number-field',
          },
        },
      },
    } as Schema,
  },
};

export const DefaultValue: Story = {
  name: 'Default Value',
  play: playForm(async (context) => {
    await expect(context.args.formModel).toEqual({ numberInt: 1, numberFloat: 1.25 });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        numberInt: {
          defaultValue: 1,
          label: 'Number int',
          type: 'int',
          layout: {
            component: 'number-field',
          },
        },
        numberFloat: {
          defaultValue: 1.25,
          label: 'Number float',
          type: 'float',
          layout: {
            component: 'number-field',
          },
        },
      },
    } as Schema,
  },
};

export const Required: Story = {
  name: 'Required',
  play: playForm(async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const exampleElement = canvas.getByLabelText('Number field');
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);

    await userEvent.type(exampleElement, '1', {
      delay: 100,
    });

    await userEvent.click(Submit);
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        numberField: {
          label: 'Number field',
          type: 'int',
          layout: {
            component: 'number-field',
          },
        },
      },
      required: ['numberField'],
    } as Schema,
  },
};

export const CenterTextInField: Story = {
  name: 'Change Alignment of Field Value',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('Number field');
    await userEvent.type(field, '1.25', { delay: 300 });
    await expect(context.args.formModel).toEqual({ numberField: 1.25 });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        numberField: {
          label: 'Number field',
          type: 'float',
          layout: {
            component: 'number-field',
            class: 'content-center',
            cols: 12,
          },
        },
      },
    } as Schema,
  },
};
export const FloatStandard4DecimalPlaces: Story = {
  name: 'Change Precision',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('Number (float)');
    await userEvent.type(field, '1.34632', { delay: 300 });
    await fireEvent.focusOut(field);
    await expect(context.args.formModel).toEqual({ numberFloat4: 1.3463 });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        numberFloat4: {
          label: 'Number (float)',
          type: 'float',
          precision: 4,
          layout: {
            component: 'number-field',
          },
        },
      },
    } as Schema,
  },
};

export const FloatPrecisionOnBlur: Story = {
  name: 'Round Precision on Blur',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('Number (float)');

    await userEvent.type(field, '23.555555', { delay: 100 });
    await expect(context.args.formModel).toEqual({ numberFloat4: 23.555555 });

    await fireEvent.focusOut(field);
    await expect(context.args.formModel).toEqual({ numberFloat4: 23.5556 });
    await expect((field as HTMLInputElement).value).toMatch(/^23[,.]5556$/);

    await fireEvent.focusIn(field);
    await expect(field).toHaveValue('23.5556');
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        numberFloat4: {
          label: 'Number (float)',
          type: 'float',
          precision: 4,
          precisionMin: 2,
          layout: {
            component: 'number-field',
          },
        },
      },
    } as Schema,
  },
};

export const FloatCommaAndDotInput: Story = {
  name: 'Accept Comma and Dot Separators',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const commaField = await canvas.getByLabelText('Comma number');
    const dotField = await canvas.getByLabelText('Dot number');

    await userEvent.type(commaField, '12,34', { delay: 100 });
    await userEvent.type(dotField, '56.78', { delay: 100 });

    await expect(context.args.formModel).toEqual({ commaNumber: 12.34, dotNumber: 56.78 });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        commaNumber: {
          label: 'Comma number',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
        dotNumber: {
          label: 'Dot number',
          type: 'float',
          precision: 2,
          layout: {
            component: 'number-field',
          },
        },
      },
    } as Schema,
  },
};

export const FloatPasteWithComma: Story = {
  name: 'Paste Number with Comma',
  globals: {
    locale: 'pl',
  },
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('Number (float)');

    await userEvent.click(field);
    await userEvent.paste('1 234,56');
    await expect(context.args.formModel).toEqual({ numberFloat: 1234.56 });

    await fireEvent.focusOut(field);
    await expect((field as HTMLInputElement).value).toMatch(/^1[\s\u00A0]?234,56$/);
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        numberFloat: {
          label: 'Number (float)',
          type: 'float',
          precision: 2,
          precisionMin: 2,
          layout: {
            component: 'number-field',
          },
        },
      },
    } as Schema,
  },
};

export const DependencyDecimalPlaces: Story = {
  name: 'Change Precision with Dependency',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('Number (float)');
    await userEvent.type(field, '1.34632', { delay: 300 });
    await fireEvent.focusOut(field);
    await expect(context.args.formModel).toEqual({ decimalPlaces: 4, numberFloat4: 1.3463 });
  }),
  args: {
    formModel: {
      decimalPlaces: 4,
    },
    schema: {
      type: 'object',
      properties: {
        span: {
          content:
            'For static decimal places dependency we can pass a `path` for variable in model',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        numberFloat4: {
          label: 'Number (float)',
          type: 'float',
          precision: 'decimalPlaces',
          layout: {
            component: 'number-field',
          },
        },
      },
    } as Schema,
  },
};

export const DependenciesInDefaultValue: Story = {
  name: 'Default Value from Model Dependency',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('Percent');
    await expect(context.args.formModel).toEqual({ percent: 32, number: 32 });
    fireEvent.focusOut(field);
  }),
  args: {
    formModel: {
      number: 32,
    },
    schema: {
      type: 'object',
      properties: {
        percent: {
          defaultValue: '{number}',
          label: 'Percent',
          type: 'float',
          formatType: 'percent',
          layout: {
            component: 'number-field',
          },
        },
      },
    } as Schema,
  },
};

export const PrecisionListener: Story = {
  name: 'Dynamic Precision',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const precision = await canvas.getByLabelText('Dynamic precision');

    const tests = [
      { input: '4', expected: { numberField: 1.2356, precisionReference: 4 } },
      { input: '3', expected: { numberField: 1.236, precisionReference: 3 } },
      { input: '2', expected: { numberField: 1.24, precisionReference: 2 } },
    ];

    await expect(context.args.formModel).toEqual({
      numberField: 1.235567,
      precisionReference: 5,
    });

    for (const { input, expected } of tests) {
      await userEvent.clear(precision);
      await userEvent.type(precision, input, { delay: 100 });
      await expect(context.args.formModel).toEqual(expected);
    }
  }),
  args: {
    formModel: {
      numberField: 1.235567,
      precisionReference: 5,
    },
    schema: {
      type: 'object',
      properties: {
        precisionReference: {
          label: 'Dynamic precision',
          type: 'float',
          precision: 6,
          layout: {
            component: 'number-field',
          },
        },
        numberField: {
          label: 'Number field',
          type: 'float',
          precision: 'precisionReference',
          layout: {
            component: 'number-field',
          },
        },
      },
      i18n: {},
    },
  },
  parameters: {},
};
