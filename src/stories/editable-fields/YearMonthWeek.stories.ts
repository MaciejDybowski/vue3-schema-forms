// @ts-nocheck
import { Story } from 'storybook/dist/csf';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Editable/YearMonthWeek',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  name: 'Standard',
  args: {
    formModel: {
      deliveryWeek: '2026-W22',
    },
    schema: {
      type: 'object',
      properties: {
        deliveryWeek: {
          label: 'Delivery week',
          layout: {
            component: 'year-month-week',
          },
        },
      },
    } as Schema,
  },
};

export const SelectWeekNumber: Story = {
  name: 'Select Week Number',
  args: {
    formModel: {
      deliveryWeek: '2026-W22',
    },
    schema: {
      type: 'object',
      properties: {
        deliveryWeek: {
          label: 'Delivery week',
          layout: {
            component: 'year-month-week',
          },
        },
      },
    } as Schema,
  },
};

export const OnlyFirstDayOfWeekClickable: Story = {
  name: 'Only Monday Clickable',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Delivery week');

    await userEvent.click(field, { delay: 200 });

    await waitFor(() => {
      expect(document.querySelector('.v-date-picker-month__days')).toBeInTheDocument();
    });

    const enabledDayButtons = document.querySelectorAll(
      '.v-date-picker-month__days .v-date-picker-month__day:not(.v-date-picker-month__weekday) button:not([disabled])',
    );

    expect(enabledDayButtons.length).toBeGreaterThan(0);
    expect(enabledDayButtons.length).toBeLessThanOrEqual(6);
  }),
  args: {
    formModel: {
      deliveryWeek: '2026-W22',
    },
    schema: {
      type: 'object',
      properties: {
        deliveryWeek: {
          label: 'Delivery week',
          layout: {
            component: 'year-month-week',
          },
        },
      },
    } as Schema,
  },
};

export const WithDefaultValue: Story = {
  name: 'Default Value',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    await waitFor(() => {
      expect(canvas.getByLabelText('Delivery week')).toHaveValue('2026-W22');
    });

    expect(context.args.formModel.deliveryWeek).toBe('2026-W22');
  }),
  args: {
    formModel: {
      deliveryWeek: '2026-W22',
    },
    schema: {
      type: 'object',
      properties: {
        deliveryWeek: {
          label: 'Delivery week',
          layout: {
            component: 'year-month-week',
          },
        },
      },
    } as Schema,
  },
};

export const ClearValue: Story = {
  name: 'Clear Value',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    await waitFor(() => {
      expect(canvas.getByLabelText('Delivery week')).toHaveValue('2026-W22');
    });

    const clearButton = context.canvasElement.querySelector('.v-icon--clickable');
    if (clearButton) {
      await userEvent.click(clearButton, { delay: 200 });
    }

    await waitFor(() => {
      expect(context.args.formModel.deliveryWeek).toBeFalsy();
    });
  }),
  args: {
    formModel: {
      deliveryWeek: '2026-W22',
    },
    schema: {
      type: 'object',
      properties: {
        deliveryWeek: {
          label: 'Delivery week',
          layout: {
            component: 'year-month-week',
          },
        },
      },
    } as Schema,
  },
};

export const ReadonlyField: Story = {
  name: 'Read Only Field',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Delivery week');

    await userEvent.click(field, { delay: 200 });

    expect(document.querySelector('.v-date-picker')).not.toBeInTheDocument();
    expect(field).toHaveValue('2026-W22');
  }),
  args: {
    formModel: {
      deliveryWeek: '2026-W22',
    },
    schema: {
      type: 'object',
      properties: {
        deliveryWeek: {
          label: 'Delivery week',
          layout: {
            component: 'year-month-week',
            props: {
              readonly: true,
            },
          },
        },
      },
    } as Schema,
  },
};

export const WeekAcrossYearBoundary: Story = {
  name: 'Week Across Year Boundary',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    await waitFor(() => {
      expect(canvas.getByLabelText('Delivery week')).toHaveValue('2025-W01');
    });

    expect(context.args.formModel.deliveryWeek).toBe('2025-W01');
  }),
  args: {
    formModel: {
      deliveryWeek: '2025-W01',
    },
    schema: {
      type: 'object',
      properties: {
        deliveryWeek: {
          label: 'Delivery week',
          layout: {
            component: 'year-month-week',
          },
        },
      },
    } as Schema,
  },
};
