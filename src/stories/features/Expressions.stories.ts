// @ts-nocheck
import { expect } from 'storybook/test';
import { userEvent, within, waitFor } from 'storybook/test';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Features/Built-in expressions',
  ...formStoryWrapperTemplate,
};

export const example1: Story = {
  name: 'Example 1: Usage of date calculation functions',
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });

    // Assert initial values after expressions are calculated
    expect(context.args.formModel).toEqual({
      stages: [
        {
          simpleDate: '2025-05-08T12:32:21.000+02:00',
        },
        {
          simpleDate: '2025-05-03T04:34:12.000+02:00',
        },
      ],
      stages2: [
        {
          simpleDate: '2025-05-14T08:23:10.000+02:00',
        },
        {
          simpleDate: '2025-05-17T11:32:34.000+02:00',
        },
      ],
      theOldestDate: '2025-05-03T04:34:12.000+02:00',
      theYoungestDate: '2025-05-17T11:32:34.000+02:00',
      days: '14',
      hours: '6',
      minutes: '58',
    });
  },
  args: {
    formModel: {
      stages: [
        {
          simpleDate: '2025-05-08T12:32:21.000+02:00',
        },
        {
          simpleDate: '2025-05-03T04:34:12.000+02:00',
        },
      ],
      stages2: [
        {
          simpleDate: '2025-05-14T08:23:10.000+02:00',
        },
        {
          simpleDate: '2025-05-17T11:32:34.000+02:00',
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        stages: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                simpleDate: {
                  label: 'DateTime',
                  layout: {
                    component: 'date-time-picker',
                  },
                },
              },
            },
          },
        },
        stages2: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                simpleDate: {
                  label: 'DateTime',
                  layout: {
                    component: 'date-time-picker',
                  },
                },
              },
            },
          },
        },
        theOldestDate: {
          label: 'The oldest date from array',
          layout: {
            component: 'text-field',
            cols: 6,
          },
          expression: 'FIND_OLDEST_DATE(simpleDate, stages)',
        },
        theYoungestDate: {
          label: 'The youngest date from array',
          layout: {
            component: 'text-field',
            cols: 6,
          },
          expression: 'FIND_EARLIEST_DATE(simpleDate, stages2)',
        },
        days: {
          label: 'Days',
          layout: {
            component: 'text-field',
            cols: 4,
          },
          expression: 'CALC_DATE_DIFF_RETURN_DAY(theOldestDate, theYoungestDate)',
        },
        hours: {
          label: 'Hours',
          layout: {
            component: 'text-field',
            cols: 4,
          },
          expression: 'CALC_DATE_DIFF_RETURN_HOURS(theOldestDate, theYoungestDate)',
        },
        minutes: {
          label: 'Minutes',
          layout: {
            component: 'text-field',
            cols: 4,
          },
          expression: 'CALC_DATE_DIFF_RETURN_MINUTES(theOldestDate, theYoungestDate)',
        },
      },
    },
  },
};

export const UseJSONataFunctions: Story = {
  name: 'Example 2: JSONata function',
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    // Assert initial values after JSONata expressions are calculated
    expect(context.args.formModel).toEqual({
      documentItems: [
        {
          costType: {
            id: '213',
          },
          grossAmount: 23.321,
        },
        {
          costType: {
            id: '212133',
          },
          grossAmount: 100.321,
        },
      ],
      joinedCostTypes: '213,212133',
      joinedGrossAmounts: 'costLimit>23,321;costLimit>100,321',
    });
  },
  args: {
    formModel: {
      documentItems: [
        {
          costType: { id: '213' },
          grossAmount: 23.321,
        },
        {
          costType: { id: '212133' },
          grossAmount: 100.321,
        },
      ],
    },
    schema: {
      properties: {
        documentItems: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                costType: {
                  label: 'Cost Type',
                  type: 'object',
                  valueMapping: '{documentItems[].costType.id}',
                  layout: {
                    component: 'data-viewer',
                    cols: 6,
                  },
                },
                grossAmount: {
                  label: 'Gross Amount',
                  type: 'number',
                  precision: 3,
                  layout: {
                    component: 'number-field',
                    cols: 6,
                  },
                },
              },
            },
          },
        },
        joinedCostTypes: {
          expression: 'JSONATA(documentItems.costType.id ~> $join(","))',
          label: 'JSONata joining cost type IDs',
          layout: {
            component: 'text-field',
            cols: 6,
          },
        },
        joinedGrossAmounts: {
          expression:
            'JSONATA(documentItems.grossAmount ~> $map(function($v) { $replace("costLimit>" & $string($v), ".", ",")}) ~> $join(";"))',
          label: 'JSONata joining gross amounts',
          layout: {
            component: 'text-field',
            cols: 6,
          },
        },
      },
    },
  },
};

export const SwitchAkceptacjaZarzadu: Story = {
  name: 'Example 3: Switch z JSONata calculation',
  play: async ({ context, mount, canvasElement }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });

    const canvas = within(canvasElement);

    // Find and interact with the "Kwota zaliczki" field
    const textField = await canvas.findByLabelText('Kwota zaliczki');

    // Enter 150000 and check switch state
    await userEvent.clear(textField);
    await userEvent.type(textField, '150000', { delay: 100 });
    await new Promise((r) => setTimeout(r, 300));
    expect(await canvas.findByLabelText('Pozostałe koszty do zaliczki – akceptacja zarządu')).toBeChecked();

    // Enter 50000 and check switch state
    await userEvent.clear(textField);
    await userEvent.type(textField, '50000', { delay: 100 });
    await new Promise((r) => setTimeout(r, 300));
    expect(await canvas.findByLabelText('Pozostałe koszty do zaliczki – akceptacja zarządu')).not.toBeChecked();
  },
  args: {
    formModel: {
      kwota: 120000,
      akceptacjaZarzadu: false,
    },
    schema: {
      properties: {
        kwota: {
          label: 'Kwota zaliczki',
          type: 'number',
          precision: 0,
          layout: {
            component: 'number-field',
            cols: 6,
          },
        },
        akceptacjaZarzadu: {
          label: 'Pozostałe koszty do zaliczki – akceptacja zarządu',
          type: 'boolean',
          defaultValue: false,
          calculation: '$number(kwota) > 100000',
          layout: {
            component: 'switch',
            cols: 6,
          },
        },
      },
    },
  },
};
