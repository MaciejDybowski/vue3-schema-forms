// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import dayjs from '../../components/controls/date/dayjs';
import { Schema } from '../../types/schema/Schema';
import { SchemaDateField } from '../../types/schema/elements';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';





export default {
  title: 'Elements/Editable/DateTime',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('DateTime');
    await userEvent.type(field, '01/29/2024 14:30:00 AM', {delay: 100});
    await expect(context.args.formModel.simpleDate).toEqual('2024-01-29T02:30:00.000+01:00');
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        simpleDate: {
          label: 'DateTime',
          layout: {
            component: 'date-time-picker',
          },
        },
      },
    } as Schema,
  },
};

export const DefaultValue: Story = {
  play: async (context) => {
    await expect(context.args.formModel).toEqual({
      dateWithDefault: '2024-01-29T02:30:00.000+01:00',
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        dateWithDefault: {
          label: 'DateTime',
          defaultValue: '2024-01-29T02:30:00.000+01:00',
          layout: {
            component: 'date-time-picker',
          },
        },
      },
    } as Schema,
  },
};

export const ReadOnly: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const btnClasses = document.getElementsByClassName('v-btn--icon v-btn--readonly');
    await expect(btnClasses.length).toEqual(1);
  },
  args: {
    formModel: {
      readonlyDate: '2024-01-29T14:30:00.000+01:00',
    },
    schema: {
      type: 'object',
      properties: {
        readonlyDate: {
          label: 'DateTime',
          layout: {
            component: 'date-time-picker',
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
  name: 'Case: pick datetime from menu',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const icon = document.getElementsByClassName('mdi-calendar');
    await userEvent.click(icon[0], { delay: 250 });
    const dateButton = document.getElementsByClassName('v-btn__content');
    const menuButton = document.getElementsByClassName(
      'v-btn v-btn--block v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text v-tab',
    );
    await userEvent.click(dateButton[15], { delay: 250 });
    await userEvent.click(menuButton[1], { delay: 250 });

    const hoursButton = document.getElementsByClassName('v-time-picker-clock__item');
    await userEvent.click(hoursButton[10], { delay: 150 });
    const minutesButton = document.getElementsByClassName('v-time-picker-clock__item');
    await userEvent.click(minutesButton[2], { delay: 150 });
    await expect(dayjs(context.args.formModel.simpleDateTimeFromPicker).isValid()).toBe(true);
    await expect(context.args.formModel.simpleDateTimeFromPicker).toEqual(
      '2025-07-03T11:56:00.000+02:00',
    );
    await userEvent.click(icon[0]);
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        simpleDateTimeFromPicker: {
          label: 'DateTime',
          layout: {
            component: 'date-time-picker',
          },
          closeOnFirstClick: true,
        } as SchemaDateField,
      },
    } as Schema,
  },
};

export const SimpleValidation: Story = {
  name: 'Validation: required',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();

    const field = canvas.getByLabelText('DateTime');
    await userEvent.type(field, '01/29/2024 10:00:00 AM');
    await userEvent.click(Submit);
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        requiredDateTime: {
          label: 'DateTime',
          layout: {
            component: 'date-time-picker',
          },
        },
      },
      required: ['requiredDateTime'],
    } as Schema,
  },
};
