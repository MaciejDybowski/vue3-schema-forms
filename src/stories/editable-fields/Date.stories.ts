// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import dayjs from '../../components/controls/date/dayjs';
import { Schema } from '../../types/schema/Schema';
import { SchemaDateField } from '../../types/schema/elements';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { playWrapper, waitForMountedAsync } from './utils';

export default {
  title: 'Elements/Editable/Date',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: playWrapper(async (context) => {
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
  play: playWrapper(async (context) => {
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
  play: playWrapper(async (context) => {
    await waitForMountedAsync();
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
  name: 'Case: pick date from menu',
  play: playWrapper(async (context) => {
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
  name: 'Case: custom format in schema definition',
  play: playWrapper(async (context) => {
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
  name: 'Validation: required',
  play: playWrapper(async (context) => {
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
  name: 'Validation: past date is not allowed',

  play: playWrapper(async (context) => {
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
  name: 'Validation: future date is not allowed',
  play: playWrapper(async (context) => {
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
