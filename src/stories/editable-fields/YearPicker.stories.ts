// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';

export default {
  title: 'Elements/Editable/YearPicker',
  ...formStoryWrapperTemplate,
};

async function selectYearPickerItem(canvas: ReturnType<typeof within>, year = 2050, label = 'Year picker') {
  const select = await canvas.getByLabelText(label);
  await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

  // poczekaj aż elementy listy się pojawią
  await waitFor(() => {
    const items = document.querySelectorAll('.v-list-item');
    expect(items.length).toBeGreaterThan(0);
  });

  const items = Array.from(document.getElementsByClassName('v-list-item')) as HTMLElement[];
  const text = String(year);
  const matched = items.find((el) => el.textContent?.trim() === text || el.textContent?.trim().includes(text));

  if (matched) {
    await userEvent.click(matched, { delay: 200 });
  } else {
    // fallback: kliknij pierwszy dostępny element, aby test nie zablokował się
    await userEvent.click(items[0], { delay: 200 });
  }
}


export const Standard = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    await selectYearPickerItem(canvas, 2050);
    await expect(context.args.formModel).toEqual({ year: 2050 });
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

export const Required = {
  name: 'Case: required',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 100 });
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();

    await selectYearPickerItem(canvas, 2050);
    await expect(context.args.formModel).toEqual({ year: 2050 });

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
    await selectYearPickerItem(canvas, 2026);
    await expect(context.args.formModel).toEqual({ year: 2026 });
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
