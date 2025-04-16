// @ts-nocheck
import { conditionSchema } from "@/stories/schemas";
import { expect, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { SchemaField, SchemaTextField } from "../../types/schema/elements";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Features/ConditionalRendering",
  ...formStoryWrapperTemplate,
};

/**
 * #### Conditional Rendering
 * The library is capable of resolving dependencies between fields based on the library https://www.npmjs.com/package/expr-eval
 *
 * `if: string` - a value defined in the `Layout` object
 */
export const ConditionStory: Story = {
  name: "if",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const renderedField = canvas.queryByText("Result");
    await expect(renderedField).toEqual(null);

    const login = canvas.getByLabelText("Login");
    const password = canvas.getByLabelText("Password");

    await userEvent.type(login, "admin", { delay: 100 });
    await userEvent.type(password, "admin", { delay: 300 });

    const rendered = canvas.getByLabelText("Result");
    await expect(rendered).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: conditionSchema,
  },
};

export const ConditionWithCalcStory: Story = {
  name: "if with calcs",
  play: async ({ canvasElement }) => {},
  args: {
    formModel: {
      a: 10,
      b: 99,
    },
    schema: {
      type: "object",
      properties: {
        a: {
          label: "A",
          layout: {
            component: "number-field",
          },
        },
        b: {
          label: "B",
          layout: {
            component: "number-field",
          },
        },
        c: {
          label: "Result",
          layout: {
            component: "number-field",
          },
          calculation: "a + b",
        },
        secretCode: {
          label: "Result",
          layout: {
            component: "text-field",
            if: "nata(c>100)",
          },
        },
      },
    },
  },
};

export const ConditionalWithDuplicatedSection: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const renderedField = canvas.queryByText("Some field with if");
    await expect(renderedField).toEqual(null);

    const field = await canvas.getByLabelText("Test");
    await userEvent.type(field, "root", { delay: 100 });

    const ifField = await canvas.getByLabelText("Some field with if");
    await userEvent.type(ifField, "Test", { delay: 100 });

    await expect(context.args.formModel).toEqual({
      data: {
        test: "root",
      },
      invoice: {
        items: [{ someFieldWithIf: "Test" }],
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
              label: "Test",
              layout: {
                component: "text-field",
                cols: 3,
              },
            } as SchemaTextField,
          },
        },
        invoice: {
          properties: {
            items: {
              layout: {
                component: "duplicated-section",
                schema: {
                  properties: {
                    someField: {
                      label: "Item",
                      layout: { component: "text-field", cols: 3 },
                    },
                    someFieldWithIf: {
                      label: "Some field with if",
                      layout: { component: "text-field", cols: 3, if: "nata(data.test='root')" },
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

/**
 * #### With duplicated section and internal condition
 * The model of a given duplicate section is merged with the model of the entire form, so if a conflict of keys arises in the model, the mechanism may not work properly
 */
export const ConditionalWithDuplicatedSectionAndInternalField: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const renderedField = canvas.queryByText("Some field with if");
    await expect(renderedField).toEqual(null);

    const field = canvas.getByLabelText("Test");
    await userEvent.type(field, "root", { delay: 100 });

    const ifField = canvas.getByLabelText("Item");
    await userEvent.type(ifField, "root", { delay: 100 });

    await expect(context.args.formModel).toEqual({
      data: {
        test: "root",
      },
      invoice: {
        items: [{ dane: { someField: "root" } }],
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        data: {
          properties: {
            test: {
              label: "Test",
              layout: {
                component: "text-field",
                cols: 3,
              },
            },
          },
        },
        invoice: {
          properties: {
            items: {
              layout: {
                component: "duplicated-section",
                schema: {
                  properties: {
                    dane: {
                      properties: {
                        someField: {
                          label: "Item",
                          layout: {
                            component: "text-field",
                            cols: 3,
                          },
                        },
                        someFieldWithIf: {
                          label: "Some field with if",
                          layout: {
                            component: "text-field",
                            cols: 3,
                            if: 'nata(dane.someField="root")',
                          },
                        },
                        someFieldWithIf2: {
                          label: "Some field with if",
                          layout: {
                            component: "text-field",
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
