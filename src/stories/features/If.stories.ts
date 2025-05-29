// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import { conditionSchema } from '@/stories/schemas';

import { Schema } from '../../types/schema/Schema';
import { SchemaField, SchemaTextField } from '../../types/schema/elements';
import { waitForMountedAsync } from '../editable-fields/utils';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Features/Conditional Rendering/Using if',
  ...formStoryWrapperTemplate,
};

export const ConditionStory: Story = {
  name: 'Case: simple usage',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const renderedField = canvas.queryByText('Result');
    await expect(renderedField).toEqual(null);

    const login = canvas.getByLabelText('Login');
    const password = canvas.getByLabelText('Password');

    await userEvent.type(login, 'admin', { delay: 100 });
    await userEvent.type(password, 'admin', { delay: 300 });

    const rendered = canvas.getByLabelText('Result');
    await expect(rendered).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: conditionSchema,
  },
};

export const ConditionWithCalcStory: Story = {
  name: 'Case: based on calculation result',
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    const a = canvas.getByLabelText('A');
    await userEvent.type(a, '10', { delay: 100 });
    const renderedField = canvas.getByLabelText('Secret code');
    await expect(renderedField).toBeInTheDocument();
  },
  args: {
    formModel: {
      b: 99,
    },
    schema: {
      type: 'object',
      properties: {
        a: {
          label: 'A',
          layout: {
            component: 'number-field',
          },
        },
        b: {
          label: 'B',
          layout: {
            component: 'number-field',
          },
        },
        c: {
          label: 'Result',
          layout: {
            component: 'number-field',
          },
          calculation: 'a + b',
        },
        secretCode: {
          label: 'Secret code',
          layout: {
            component: 'text-field',
            if: 'nata(c>100)',
          },
        },
      },
    },
  },
};

export const ConditionalWithDuplicatedSection: Story = {
  name: 'Case: usage in duplicated section',
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const renderedField = canvas.queryByText('Some field with if');
    await expect(renderedField).toEqual(null);

    const field = await canvas.getByLabelText('Test');
    await userEvent.type(field, 'root', { delay: 100 });

    const ifField = await canvas.getByLabelText('Some field with if');
    await userEvent.type(ifField, 'Test', { delay: 100 });

    await expect(context.args.formModel).toEqual({
      data: {
        test: 'root',
      },
      invoice: {
        items: [{ someFieldWithIf: 'Test' }],
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      properties: {
        data: {
          properties: {
            test: {
              label: 'Test',
              layout: {
                component: 'text-field',
                cols: 3,
              },
            } as SchemaTextField,
          },
        },
        invoice: {
          properties: {
            items: {
              layout: {
                component: 'duplicated-section',
                schema: {
                  properties: {
                    someField: {
                      label: 'Item',
                      layout: { component: 'text-field', cols: 3 },
                    },
                    someFieldWithIf: {
                      label: 'Some field with if',
                      layout: { component: 'text-field', cols: 3, if: "nata(data.test='root')" },
                    },
                  },
                },
              },
            } as SchemaField,
          },
        },
      },
    } as Schema,
  },
};

export const ConditionalWithDuplicatedSectionAndInternalField: Story = {
  name: 'Case: usage in duplicated section with internal condition',
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const renderedField = canvas.queryByText('Some field with if');
    await expect(renderedField).toEqual(null);

    const field = canvas.getByLabelText('Test');
    await userEvent.type(field, 'root', { delay: 100 });

    const ifField = canvas.getByLabelText('Item');
    await userEvent.type(ifField, 'root', { delay: 100 });

    await expect(context.args.formModel).toEqual({
      data: {
        test: 'root',
      },
      invoice: {
        items: [{ dane: { someField: 'root' } }],
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        data: {
          properties: {
            test: {
              label: 'Test',
              layout: {
                component: 'text-field',
                cols: 3,
              },
            },
          },
        },
        invoice: {
          properties: {
            items: {
              layout: {
                component: 'duplicated-section',
                schema: {
                  properties: {
                    dane: {
                      properties: {
                        someField: {
                          label: 'Item',
                          layout: {
                            component: 'text-field',
                            cols: 3,
                          },
                        },
                        someFieldWithIf: {
                          label: 'Some field with if',
                          layout: {
                            component: 'text-field',
                            cols: 3,
                            if: 'nata(dane.someField="root")',
                          },
                        },
                        someFieldWithIf2: {
                          label: 'Some field with if',
                          layout: {
                            component: 'text-field',
                            cols: 3,
                            if: 'nata(data.test="root")',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      required: [],
    } as Schema,
  },
};
