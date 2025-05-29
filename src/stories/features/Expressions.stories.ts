// @ts-nocheck
import { expect } from 'storybook/test';

import { formStoryWrapperTemplate } from '../templates/shared-blocks';





export default {
  title: 'Features/Built-in expressions',
  ...formStoryWrapperTemplate,
};

/**
 * #### Performing expression based on form fields
 * `expression: string` - an expression b ased on form fields. This expression uses predefined functions built-in the forms engine. The list will be shown below
 *
 * ##### This expression uses predefined functions built into the forms engine. The list will be shown below
 * * FIND_OLDEST_DATE(variable, array.path)
 * * FIND_EARLIEST_DATE(variable, array.path)
 * * CALC_DATE_DIFF_RETURN_DAY(date1, date2)
 * * CALC_DATE_DIFF_RETURN_HOURS(date1, date2)
 * * CALC_DATE_DIFF_RETURN_MINUTES(date1, date2)
 * * JSONATA(jsonataExpression)
 *
 * The expressions are currently available only in the `text-field` / `number-field` component
 */
export const example1: Story = {
  name: 'Example 1: Usage of date calculation functions',
  play: async (context) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    await expect(context.args.formModel).toEqual({
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
  play: async (context) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    await expect(context.args.formModel).toEqual({
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
