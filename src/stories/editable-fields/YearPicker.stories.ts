import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';

export default {
  title: 'Elements/Editable/YearPicker',
  ...formStoryWrapperTemplate,
};

async function selectFirstYearPickerItem(canvas, label = 'Year picker') {
  const select = await canvas.getByLabelText(label);
  await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
  await waitFor(() => {
    const items = document.querySelectorAll('.v-list-item');
    expect(items.length).toBeGreaterThan(0);
  });
  const items = document.getElementsByClassName('v-list-item');
  await userEvent.click(items[0], { delay: 200 });
}

export const Standard = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    await selectFirstYearPickerItem(canvas);
    await expect(context.args.formModel).toEqual({ year: 2025 });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        year: {
          label: 'Year picker',
          layout: {
            component: 'year-picker',
          },
        },
      },
    } as Schema,
  },
};

export const Range = {
  name: 'Case: pass rage of years',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    await selectFirstYearPickerItem(canvas);
    await expect(context.args.formModel).toEqual({ year: 2023 });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        year: {
          label: 'Year picker',
          range: [2020, 2023],
          layout: {
            component: 'year-picker',
          },
        },
      },
    } as Schema,
  },
};

export const Required = {
  name: 'Case: required',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 100 });
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();

    await selectFirstYearPickerItem(canvas);
    await expect(context.args.formModel).toEqual({ year: 2023 });

    await userEvent.click(Submit, { delay: 100 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        year: {
          label: 'Year picker',
          range: [2020, 2023],
          layout: {
            component: 'year-picker',
          },
        },
      },
      required: ['year'],
    } as Schema,
  },
};

export const Expression = {
  name: 'Case: expression for years',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    await selectFirstYearPickerItem(canvas);
    await expect(context.args.formModel).toEqual({ year: 2025 });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        year: {
          label: 'Year picker',
          expression: '[currentYear .. (currentYear + 10)]',
          layout: {
            component: 'year-picker',
          },
        },
      },
    } as Schema,
  },
};
