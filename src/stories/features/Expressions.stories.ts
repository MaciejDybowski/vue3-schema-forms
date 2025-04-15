// @ts-nocheck
import { commonMetadata, formStoryWrapperTemplate } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Features/Expressions",
  ...formStoryWrapperTemplate,
};

/**
 * #### Performing expression based on form fields
 * `expression: string` - an expression b ased on form fields. This expression uses predefined functions built into the forms engine. The list will be shown below
 *
 * ##### This expression uses predefined functions built into the forms engine. The list will be shown below
 * * FIND_OLDEST_DATE(variable, array.path)
 * * FIND_EARLIEST_DATE(variable, array.path)
 * * CALC_DATE_DIFF_RETURN_DAY(date1, date2)
 * * CALC_DATE_DIFF_RETURN_HOURS(date1, date2)
 * * CALC_DATE_DIFF_RETURN_MINUTES(date1, date2)
 *
 * Like calculations, the expression listens for changes in the model - currently only available for the `text-field` component
 */
export const examples: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        stages: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                simpleDate: {
                  label: "DateTime",
                  layout: {
                    component: "date-time-picker",
                  },
                },
              },
            },
          },
        },
        stages2: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                simpleDate: {
                  label: "DateTime",
                  layout: {
                    component: "date-time-picker",
                  },
                },
              },
            },
          },
        },
        minimum: {
          label: "Minimum",
          layout: {
            component: "text-field",
          },
          expression: "FIND_OLDEST_DATE(simpleDate, stages)",
        },
        maximum: {
          label: "Maximum",
          layout: {
            component: "text-field",
          },
          expression: "FIND_EARLIEST_DATE(simpleDate, stages2)",
        },
        dni: {
          label: "Dni",
          layout: {
            component: "text-field",
          },
          expression: "CALC_DATE_DIFF_RETURN_DAY(maximum, minimum)",
        },
        godziny: {
          label: "Godziny",
          layout: {
            component: "text-field",
          },
          expression: "CALC_DATE_DIFF_RETURN_HOURS(maximum, minimum)",
        },
        minuty: {
          label: "Minuty",
          layout: {
            component: "text-field",
          },
          expression: "CALC_DATE_DIFF_RETURN_MINUTES(maximum, minimum)",
        },
      },
    },
  },
};
