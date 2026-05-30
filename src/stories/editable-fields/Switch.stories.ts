// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Editable/Switch',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  name: 'Standard',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Change it!');
    await expect(context.args.formModel).toEqual({ switch: false });
    await userEvent.click(field, { delay: 200 });
    await expect(context.args.formModel).toEqual({ switch: true });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        switch: {
          label: 'Change it!',
          layout: {
            component: 'switch',
          },
        },
      },
    } as Schema,
  },
};

export const ValueByCalculation: Story = {
  name: 'Value by Calculation',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Change it!');
    await expect(context.args.formModel).toEqual({ switch: true });
    await userEvent.click(field, { delay: 200 });
    await expect(context.args.formModel).toEqual({ switch: false, switchManuallyChanged: true });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        switch: {
          label: 'Change it!',
          calculation: '2+2=4',
          layout: {
            component: 'switch',
          },
        },
      },
    } as Schema,
  },
};

export const TriggerEvent: Story = {
  name: 'Trigger Event',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Reset field B on change');
    await expect(context.args.formModel).toEqual({
      switch: false,
      switch2: false,
      fieldA: 'Template',
      fieldB: 'Template',
    });
    await userEvent.click(field, { delay: 200 });

    await waitFor(() => {
      expect(context.args.formModel).toEqual({
        switch: true,
        switch2: false,
        fieldA: 'Template',
        fieldB: null,
      });
    });
  }),
  args: {
    formModel: {
      fieldA: 'Template',
      fieldB: 'Template',
    },
    schema: {
      type: 'object',
      properties: {
        fieldA: {
          label: 'Field A',
          layout: {
            component: 'text-field',
          },
        },
        fieldB: {
          label: 'Field B',
          layout: {
            component: 'text-field',
          },
        },
        switch: {
          label: 'Reset field B on change',
          layout: {
            component: 'switch',
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
        switch2: {
          label: 'Call script on change',
          layout: {
            component: 'switch',
          },
          onChange: [
            {
              mode: 'action',
              code: 'callScript',
              params: {
                script: 'scriptA',
              },
              body: {
                fieldA: '{fieldA}',
              },
            },
          ],
        },
      },
    } as Schema,
  },
};

export const Default: Story = {
  name: 'Default Value',
  play: playForm(async (context) => {
    await expect(context.args.formModel).toEqual({ switchDefault: true });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        switchDefault: {
          defaultValue: true,
          label: 'Change it!',
          layout: {
            component: 'switch',
          },
        },
      },
    } as Schema,
  },
};

export const Colorful: Story = {
  name: 'Props: Color',
  play: playForm(async (context) => {
    await expect(context.args.formModel).toEqual({ switchDefault: true });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        switchDefault: {
          defaultValue: true,
          label: 'Change it!',
          layout: {
            component: 'switch',
            props: {
              color: 'red',
            },
          },
        },
      },
    } as Schema,
  },
};

export const CustomMappingValues: Story = {
  name: 'Custom Values Mapping',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Change it!');

    await expect(context.args.formModel).toEqual({ customSwitchDefault: 'No' });
    await userEvent.click(field, { delay: 200 });
    await expect(context.args.formModel).toEqual({ customSwitchDefault: 'Yes' });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        customSwitchDefault: {
          label: 'Change it!',
          layout: {
            component: 'switch',
            props: {
              'false-value': 'No',
              'true-value': 'Yes',
            },
          },
        },
      },
    } as Schema,
  },
};

export const MultipleConfiguration: Story = {
  name: 'Multiple Configuration',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Change it! - custom');
    await userEvent.click(field, { delay: 200 });
    await expect(context.args.formModel).toEqual({ switch1: false, switch2: 'Yes' });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        switch1: {
          label: 'Change it! - boolean',
          layout: {
            component: 'switch',
          },
        },
        switch2: {
          label: 'Change it! - custom',
          layout: {
            component: 'switch',
            props: {
              'false-value': 'No',
              'true-value': 'Yes',
            },
          },
        },
      },
    } as Schema,
  },
};

export const VisibilityMode: Story = {
  name: 'Visibility Mode',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Change it!');
    await userEvent.click(field, { delay: 200 });

    const fieldDependent = canvas.getByLabelText('Textfield (readonly)');
    await expect(context.args.formModel).toEqual({});
    await expect(fieldDependent).toBeInTheDocument();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        span: {
          content:
            "Switch with mode='visibility' does not emit an event outside the form. It only works internally and allows in readonly mode for show/hide interactions",
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        textFieldAbove: {
          label: 'Textfield (above)',
          layout: {
            component: 'text-field',
          },
        },
        switchDefault: {
          mode: 'visibility',
          label: 'Change it!',
          layout: {
            component: 'switch',
          },
        },
        textField: {
          label: 'Textfield (readonly)',
          layout: {
            component: 'text-field',
            if: 'nata(switchDefault)',
          },
        },
      },
    } as Schema,
    options: {
      fieldProps: {
        variant: 'outlined',
      },
    },
  },
};
