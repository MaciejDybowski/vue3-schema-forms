// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import dayjs from '../../components/controls/date/dayjs';
import { Schema } from '../../types/schema/Schema';
import { SchemaDateField } from '../../types/schema/elements';
import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Editable/Date',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  name: 'Standard',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Date');
    await userEvent.type(field, '01/29/2024');
    await expect(context.args.formModel.simpleDate).toEqual('2024-01-29');
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        simpleDate: {
          label: 'Date',
          layout: {
            component: 'date-picker',
          },
        },
      },
    } as Schema,
  },
};

export const DefaultValue: Story = {
  name: 'Default Value',
  play: playForm(async (context) => {
    await expect(context.args.formModel).toEqual({ dateWithDefault: '2024-01-29' });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        dateWithDefault: {
          label: 'Date',
          defaultValue: '2024-01-29',
          layout: {
            component: 'date-picker',
          },
        },
      },
    } as Schema,
  },
};

export const ReadOnly: Story = {
  name: 'Read Only',
  play: playForm(async (context) => {
    const btnClasses = document.getElementsByClassName('v-btn--icon v-btn--readonly');
    await expect(btnClasses.length).toEqual(1);
  }),
  args: {
    formModel: {
      readonlyDate: '2024-01-29T00:00:00.000+01:00',
    },
    schema: {
      type: 'object',
      properties: {
        readonlyDate: {
          label: 'Date',
          layout: {
            component: 'date-picker',
            props: {
              readonly: true,
            },
          },
        },
      },
      required: ['readonlyDate'],
    } as Schema,
  },
};

export const PickFromMenu: Story = {
  name: 'Pick Date from Menu',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const icon = document.getElementsByClassName('mdi-calendar');
    await userEvent.click(icon[0]);
    const dateButton = document.getElementsByClassName('v-btn__content');
    await userEvent.click(dateButton[10], { delay: 400 });
    await expect(dayjs(context.args.formModel.simpleDateFromPicker).isValid()).toBe(true);
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        simpleDateFromPicker: {
          label: 'Date',
          layout: {
            component: 'date-picker',
          },
          closeOnFirstClick: true,
        } as SchemaDateField,
      },
    } as Schema,
  },
};

export const CustomFormatInModel: Story = {
  name: 'Custom Format in Schema Definition',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Date');
    await userEvent.type(field, '01/30/2024');
    await expect(context.args.formModel).toEqual({ dateWithCustomFormat: '30/01/2024' });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        dateWithCustomFormat: {
          label: 'Date',
          layout: {
            component: 'date-picker',
          },
          formatInModel: 'DD/MM/YYYY',
        } as SchemaDateField,
      },
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
export const SimpleValidation: Story = {
  name: 'Required Validation',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();
    const field = canvas.getByLabelText('Date');
    await userEvent.type(field, '01/29/2024');
    await userEvent.click(Submit);
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        requiredDate: {
          label: 'Date',
          layout: {
            component: 'date-picker',
          },
        },
      },
      required: ['requiredDate'],
    } as Schema,
  },
};

export const Validation_1: Story = {
  name: 'Past Date Is Not Allowed Validation',

  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    const field = canvas.getByLabelText('Date');
    await userEvent.type(field, '01/29/2023');
    await userEvent.click(Submit);
    await expect(canvas.getByText('Date cannot be in the past')).toBeInTheDocument();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        requiredDate: {
          label: 'Date',
          layout: {
            component: 'date-picker',
          },
          pastDateAvailable: false,
        } as SchemaDateField,
      },
      required: ['requiredDate'],
    } as Schema,
  },
};

export const Validation_2: Story = {
  name: 'Future Date Is Not Allowed Validation',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    const field = canvas.getByLabelText('Date');
    await userEvent.type(field, '01/29/2030');
    await userEvent.click(Submit);
    await expect(canvas.getByText('Date cannot be in the future')).toBeInTheDocument();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        requiredDate: {
          label: 'Date',
          layout: {
            component: 'date-picker',
          },
          futureDateAvailable: false,
        } as SchemaDateField,
      },
      required: ['requiredDate'],
    } as Schema,
  },
};
