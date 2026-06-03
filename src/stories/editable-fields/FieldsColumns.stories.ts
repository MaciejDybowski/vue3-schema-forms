// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Editable/FieldsColumns',
  ...formStoryWrapperTemplate,
};

export const TwoColumns = {
  name: 'Two Columns',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    await userEvent.type(canvas.getByLabelText('First name'), 'Jan', { delay: 50 });
    await userEvent.type(canvas.getByLabelText('Last name'), 'Kowalski', { delay: 50 });

    await expect(context.args.formModel).toEqual({
      firstName: 'Jan',
      lastName: 'Kowalski',
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        columns: {
          layout: {
            component: 'fields-columns',
            cols: 12,
            columns: [
              {
                cols: 6,
                schema: {
                  type: 'object',
                  properties: {
                    firstName: {
                      label: 'First name',
                      layout: { component: 'text-field' },
                    },
                  },
                },
              },
              {
                cols: 6,
                schema: {
                  type: 'object',
                  properties: {
                    lastName: {
                      label: 'Last name',
                      layout: { component: 'text-field' },
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
};

export const UnevenColumnsHeight = {
  name: 'Uneven Columns Height',
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        columns: {
          layout: {
            component: 'fields-columns',
            cols: 12,
            columns: [
              {
                cols: 6,
                schema: {
                  type: 'object',
                  properties: {
                    shortField: {
                      label: 'Short field',
                      layout: { component: 'text-field' },
                    },
                  },
                },
              },
              {
                cols: 6,
                schema: {
                  type: 'object',
                  properties: {
                    longDescription: {
                      label: 'Long description',
                      layout: {
                        component: 'text-area',
                        props: { rows: 8 },
                      },
                    },
                    additionalComment: {
                      label: 'Additional comment',
                      layout: { component: 'text-field' },
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
};

export const WithCardAndExpansionPanels = {
  name: 'With Card And Expansion Panels',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    await userEvent.type(canvas.getByLabelText('Card field'), 'card value', { delay: 50 });
    await userEvent.type(canvas.getByLabelText('Panel field'), 'panel value', { delay: 50 });

    await expect(context.args.formModel).toEqual({
      cardField: 'card value',
      panelField: 'panel value',
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        columns: {
          layout: {
            component: 'fields-columns',
            cols: 12,
            columns: [
              {
                cols: 6,
                schema: {
                  type: 'object',
                  properties: {
                    cardWrapper: {
                      title: 'Card in column',
                      layout: {
                        component: 'card',
                        cardProps: {
                          variant: 'outlined',
                          cardTitleClass: 'bg-light-blue-lighten-5',
                        },
                        schema: {
                          type: 'object',
                          properties: {
                            cardField: {
                              label: 'Card field',
                              layout: { component: 'text-field' },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              {
                cols: 6,
                schema: {
                  type: 'object',
                  properties: {
                    panelsWrapper: {
                      layout: {
                        component: 'expansion-panels',
                      },
                      panels: [
                        {
                          title: 'Panel in column',
                          openByDefault: true,
                          schema: {
                            type: 'object',
                            properties: {
                              panelField: {
                                label: 'Panel field',
                                layout: { component: 'text-field' },
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
};

export const ResponsiveColumns = {
  name: 'Responsive Columns',
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        columns: {
          layout: {
            component: 'fields-columns',
            cols: 12,
            columns: [
              {
                cols: { xs: 12, sm: 12, md: 4, lg: 4, xl: 4, xxl: 4 },
                schema: {
                  type: 'object',
                  properties: {
                    left: {
                      label: 'Left column',
                      layout: { component: 'text-field' },
                    },
                  },
                },
              },
              {
                cols: { xs: 12, sm: 12, md: 8, lg: 8, xl: 8, xxl: 8 },
                schema: {
                  type: 'object',
                  properties: {
                    right: {
                      label: 'Right column',
                      layout: { component: 'text-area' },
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
};
