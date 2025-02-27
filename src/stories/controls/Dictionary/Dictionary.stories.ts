// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { REQUEST_NOT_LAZY, REQUEST_PAGE_0_1, REQUEST_SEARCH_DOL } from "@/stories/controls/Dictionary/responses";
import { StoryTemplateWithValidation } from "@/stories/templates/story-template";
import { expect, fireEvent, userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../../types/schema/Schema";
import { DictionarySource } from "../../../types/shared/Source";
import { waitForMountedAsync } from "../utils";

const meta = {
  title: "Forms/Controls/Dictionary [autocomplete]",
  component: VueSchemaForms,
  tags: ["autodocs"],
  argTypes: {
    schema: {
      control: "object",
      description: "Schema u" /*table: { disable: true }*/,
    },
    modelValue: {
      control: "object",
      description: "Model" /*table: { disable: true }*/,
    },
    options: {
      control: "object",
      description: "Opcje" /*table: { disable: true }*/,
    },
    "update:modelValue": { table: { disable: true } },
  },
  args: {
    modelValue: {},
    options: {},
  },
  parameters: {
    controls: { hideNoControlsWarning: true }, //https://github.com/storybookjs/storybook/issues/24422
  },
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ReadOnlyWithValue: Story = {
  play: async (context) => {
    /*await waitForMountedAsync()

    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText("Currency");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const list = document.getElementsByClassName("v-list");
    fireEvent.scroll(list[0], { target: { scrollTop: 900 } });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[19], { delay: 200 });
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await userEvent.click(items[21], { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      currency: {
        id: "BWP",
        label: "Pula",
        digitsAfterDecimal: "2",
      },
    });*/
  },
  args: {
    modelValue: {
      currency: {
        id: "BWP",
        label: "Pula",
        digitsAfterDecimal: "2",
      },
    },
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
            props: {
              readonly: true,
            },
          },
          source: {
            url: "/api/currencies",
            title: "label",
            value: "id",
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    mockData: [REQUEST_PAGE_0_1],
  },
};
export const ReadOnlyRequiredWithValue: Story = {
  play: async (context) => {
    /*await waitForMountedAsync()

    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText("Currency");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const list = document.getElementsByClassName("v-list");
    fireEvent.scroll(list[0], { target: { scrollTop: 900 } });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[19], { delay: 200 });
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await userEvent.click(items[21], { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      currency: {
        id: "BWP",
        label: "Pula",
        digitsAfterDecimal: "2",
      },
    });*/
  },
  args: {
    modelValue: {
      currency: {
        id: "BWP",
        label: "Pula",
        digitsAfterDecimal: "2",
      },
    },
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
            props: {
              readonly: true,
            },
          },
          source: {
            url: "/api/currencies",
            title: "label",
            value: "id",
          } as DictionarySource,
        } as SchemaSourceField,
      },
      required: ["currency"]
    } as Schema,
  },
  parameters: {
    mockData: [REQUEST_PAGE_0_1],
  },
};
export const ReadOnlyRequiredWithoutValue: Story = {
  play: async (context) => {
    /*await waitForMountedAsync()

    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText("Currency");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const list = document.getElementsByClassName("v-list");
    fireEvent.scroll(list[0], { target: { scrollTop: 900 } });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[19], { delay: 200 });
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await userEvent.click(items[21], { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      currency: {
        id: "BWP",
        label: "Pula",
        digitsAfterDecimal: "2",
      },
    });*/
  },
  args: {
    modelValue: {

    },
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
            props: {
              readonly: true,
            },
          },
          source: {
            url: "/api/currencies",
            title: "label",
            value: "id",
          } as DictionarySource,
        } as SchemaSourceField,
      },
      required: ['currency']
    } as Schema,
  },
  parameters: {
    mockData: [REQUEST_PAGE_0_1],
  },
};


export const Standard: Story = {
  play: async (context) => {
    await waitForMountedAsync();

    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText("Currency");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const list = document.getElementsByClassName("v-list");
    fireEvent.scroll(list[0], { target: { scrollTop: 900 } });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[19], { delay: 200 });
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await userEvent.click(items[21], { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      currency: {
        id: "BWP",
        label: "Pula",
        digitsAfterDecimal: "2",
      },
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/api/currencies",
            title: "label",
            value: "id",
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    mockData: [REQUEST_PAGE_0_1],
  },
};

export const WithDescription: Story = {
  play: async (context) => {
    /*await waitForMountedAsync();

    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText("Currency");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const list = document.getElementsByClassName("v-list");
    fireEvent.scroll(list[0], { target: { scrollTop: 900 } });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[19], { delay: 200 });
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await userEvent.click(items[21], { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      currency: {
        id: "BWP",
        label: "Pula",
        digitsAfterDecimal: "2",
      },
    });*/
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/api/currencies",
            title: "label",
            value: "id",
            description: "label"
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    mockData: [REQUEST_PAGE_0_1],
  },
};

export const WithSearch: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText("Currency");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await userEvent.type(select, "Dol", { delay: 200 });
    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.modelValue).toEqual({
      currency: {
        id: "AUD",
        label: "Dolar australijski",
        digitsAfterDecimal: "2",
      },
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/api/currencies",
            title: "label",
            value: "id",
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    mockData: [REQUEST_PAGE_0_1, REQUEST_SEARCH_DOL],
  },
};

export const ReturnValue: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText("Currency");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[0], { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      currency: "Afgani",
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/api/currencies",
            title: "label",
            value: "id",
            returnObject: false,
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    mockData: [REQUEST_PAGE_0_1],
  },
};

export const Required: Story = {
  render: StoryTemplateWithValidation,
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText("Currency");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[0], { delay: 200 });
    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
    await expect(context.args.modelValue).toEqual({
      currency: {
        id: "AFN",
        label: "Afgani",
        digitsAfterDecimal: "2",
      },
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/api/currencies",
            title: "label",
            value: "value",
          } as DictionarySource,
        } as SchemaSourceField,
      },
      required: ["currency"],
    } as Schema,
  },
  parameters: {
    mockData: [REQUEST_PAGE_0_1],
  },
};

export const LazyLoadingDisabled: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText("Currency");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[0], { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      currency: {
        id: "BTN",
        label: "Ngultrum",
        digitsAfterDecimal: "2",
      },
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/api/currencies",
            title: "label",
            value: "id",
            lazy: false,
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    mockData: [REQUEST_NOT_LAZY],
  },
};

export const DefaultValueAsATextWithDependencies: Story = {
  play: async (context) => {
    /*  await waitForMountedAsync();

      const canvas = within(context.canvasElement);
      const select = await canvas.getByLabelText("Currency");
      await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

      const list = document.getElementsByClassName("v-list");
      fireEvent.scroll(list[0], { target: { scrollTop: 900 } });

      const items = document.getElementsByClassName("v-list-item");
      await userEvent.click(items[19], { delay: 200 });
      await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
      await userEvent.click(items[21], { delay: 200 });

      await expect(context.args.modelValue).toEqual({
        currency: {
          id: "BWP",
          label: "Pula",
          digitsAfterDecimal: "2",
        },
      });*/
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",

      properties: {
        currency: {
          defaultValue: "Crypto coin as {context.userInfo.username:DefaultValueLogin}",
          label: "Currency",
          layout: {
            component: "dictionary",
            props: {
              readonly: true,
            },
          },
          source: {
            url: "/api/currencies",
            title: "label",
            value: "id",
            returnObject: false,
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
    options: {
      context: {
        userInfo: {
          username: "maciejd",
          firstName: "Maciej",
          lastName: "Dybowski",
        },
      },
    },
    parameters: {
      mockData: [REQUEST_PAGE_0_1],
    },
  },
};
