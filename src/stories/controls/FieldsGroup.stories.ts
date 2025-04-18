// @ts-nocheck
import { initialize } from "msw-storybook-addon";

import { expect, userEvent, within } from "@storybook/test";

import { DictionarySource } from "../../types/shared/Source";
import { MOCK_REQUEST_CURRENCY } from "../mock-responses";
import { formStoryWrapperTemplateWithMSW } from "../templates/shared-blocks";
import { waitForMountedAsync } from "./utils";



export default {
  title: "Forms/Controls/FieldsGroup",
  ...formStoryWrapperTemplateWithMSW,
};

export const Standard = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Field A in group A");
    await userEvent.type(field, "Field closed in group", {
      delay: 100,
    });
    await expect(context.args.formModel).toEqual({ fieldA: "Field closed in group" });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        group: {
          layout: {
            component: "fields-group",
            schema: {
              type: "object",
              properties: {
                fieldA: {
                  label: "Field A in group A",
                  layout: {
                    component: "text-field",
                  },
                },
                fieldQ: {
                  label: "Field Q in group A",
                  layout: {
                    component: "text-field",
                  },
                },
                field1: {
                  label: "Field C in group A",
                  layout: {
                    component: "text-field",
                  },
                },
              },
            },
            cols: 6,
          },
        },
      },
    },
  },
};

export const Required = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const fieldA = canvas.getByLabelText("Field A in group A");
    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit);
    await userEvent.type(fieldA, "Example value", {
      delay: 100,
    });
    await userEvent.click(Submit);
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        data: {
          layout: {
            component: "fields-group",
            schema: {
              type: "object",
              properties: {
                fieldA: {
                  label: "Field A in group A",
                  layout: {
                    component: "text-field",
                  },
                },
                fieldQ: {
                  label: "Field Q in group A",
                  layout: {
                    component: "text-field",
                  },
                },
                field1: {
                  label: "Field C in group A",
                  layout: {
                    component: "text-field",
                  },
                },
              },
              required: ["fieldA"],
            },
            cols: 6,
          },
        },
      },
    },
  },
};

export const TwoFieldsGroup = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText("Field A in group A");
    await userEvent.type(field, "Field closed in group", {
      delay: 100,
    });

    const field2 = canvas.getByLabelText("Field K in group B");
    await userEvent.type(field2, "Field closed in other group", {
      delay: 100,
    });

    await expect(context.args.formModel).toEqual({
      fieldA: "Field closed in group",
      fieldK: "Field closed in other group",
    });
  },
  name: "Case: Two groups",
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        data: {
          layout: {
            component: "fields-group",
            schema: {
              type: "object",
              properties: {
                fieldA: {
                  label: "Field A in group A",
                  layout: {
                    component: "text-field",
                  },
                },
                fieldQ: {
                  label: "Field Q in group A",
                  layout: {
                    component: "text-field",
                  },
                },
                field1: {
                  label: "Field C in group A",
                  layout: {
                    component: "text-field",
                  },
                },
              },
            },
            cols: 6,
          },
        },
        lane2: {
          layout: {
            component: "fields-group",
            schema: {
              type: "object",
              properties: {
                fieldK: {
                  label: "Field K in group B",
                  layout: {
                    component: "text-field",
                  },
                },
              },
            },
            cols: 6,
          },
        },
      },
    },
  },
};

export const GroupWithHiddenDict = {
  name: "Case: if/dependency/hidden",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const switcher = canvas.getByLabelText("Show currency field");
    let currency = canvas.queryByLabelText("Currency");

    await expect(currency).not.toBeInTheDocument();
    await userEvent.click(switcher, { delay: 200 });
    currency = canvas.getByLabelText("Currency");
    await expect(currency).toBeInTheDocument();

    await userEvent.click(currency, { pointerEventsCheck: 0, delay: 200 });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[0], { delay: 200 });

    await expect(context.args.formModel).toEqual({
      fieldQ: "Example value",
      showCurrency: true,
      currency: { id: "AFN", label: "Afgani", digitsAfterDecimal: "2" },
    });
  },
  args: {
    formModel: {
      fieldQ: "Example value",
    },
    schema: {
      type: "object",
      properties: {
        data: {
          layout: {
            component: "fields-group",
            schema: {
              type: "object",
              properties: {
                showCurrency: {
                  label: "Show currency field",
                  layout: {
                    component: "switch",
                  },
                },
                currency: {
                  label: "Currency",
                  layout: {
                    component: "dictionary",
                    if: "nata(showCurrency)",
                  },
                  source: {
                    url: "/mocks/currencies",
                    title: "label",
                    value: "id",
                    description: "label",
                  } as DictionarySource,
                } as SchemaSourceField,
                fieldQ: {
                  label: "Field Q in group A",
                  layout: {
                    component: "text-field",
                  },
                },
                field1: {
                  label: "Field C in group A",
                  layout: {
                    component: "text-field",
                  },
                },
              },
            },
            cols: 6,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const ResetValueWhenIF = {
  name: "Case: reset value on IF",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const switcher = canvas.getByLabelText("Change it!");

    await expect(context.args.formModel).toEqual({
      fieldQ: "Example value",
      switch: true,
    });

    await userEvent.click(switcher, { delay: 200 });

    await expect(context.args.formModel).toEqual({
      switch: false,
      fieldQ: null,
      temp: null,
      field1: null,
    });

    await userEvent.click(switcher, { delay: 200 });
  },
  args: {
    formModel: {
      switch: true,
      fieldQ: "Example value",
    },
    schema: {
      type: "object",
      properties: {
        switch: {
          label: "Change it!",
          layout: {
            component: "switch",
          },
        },
        data: {
          layout: {
            component: "fields-group",
            if: "nata(switch)",
            schema: {
              type: "object",
              properties: {
                temp: {
                  properties: {
                    fieldA: {
                      label: "Nested with properties",
                      layout: {
                        component: "text-field",
                      },
                    },
                  },
                },
                fieldQ: {
                  label: "Field Q in group A",
                  layout: {
                    component: "text-field",
                  },
                },
                field1: {
                  label: "Field C in group A",
                  layout: {
                    component: "text-field",
                  },
                },
              },
              required: ["fieldA"],
            },
            cols: 6,
          },
        },
      },
    },
  },
};
export const NotResetValueWhenHidden = {
  name: "Case: not reset value when hidden",
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const switcher = canvas.getByLabelText("Change it!");

    await expect(context.args.formModel).toEqual({
      fieldQ: "Example value",
      switch: true,
    });

    await userEvent.click(switcher, { delay: 200 });

    await expect(context.args.formModel).toEqual({
      switch: false,
      fieldQ: "Example value",
    });

    await userEvent.click(switcher, { delay: 200 });
  },
  args: {
    formModel: {
      switch: true,
      fieldQ: "Example value",
    },
    schema: {
      type: "object",
      properties: {
        switch: {
          label: "Change it!",
          layout: {
            component: "switch",
          },
        },
        data: {
          layout: {
            component: "fields-group",
            hide: "nata(switch)",
            schema: {
              type: "object",
              properties: {
                temp: {
                  properties: {
                    fieldA: {
                      label: "Nested with properties",
                      layout: {
                        component: "text-field",
                      },
                    },
                  },
                },
                fieldQ: {
                  label: "Field Q in group A",
                  layout: {
                    component: "text-field",
                  },
                },
                field1: {
                  label: "Field C in group A",
                  layout: {
                    component: "text-field",
                  },
                },
              },
              required: ["fieldA"],
            },
            cols: 6,
          },
        },
      },
    },
  },
};
