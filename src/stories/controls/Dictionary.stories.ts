// @ts-nocheck
import { initialize } from "msw-storybook-addon";

import { expect, userEvent, waitFor, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { DictionarySource } from "../../types/shared/Source";
import { MOCK_REQUEST_CURRENCY, RESPONSE_DICTIONARY } from "../mock-responses";
import { formStoryWrapperTemplate, formStoryWrapperTemplateWithMSW } from "../templates/shared-blocks";
import { StoryTemplateWithValidation } from "../templates/story-template";
import { waitForMountedAsync } from "./utils";

initialize();

export default {
  title: "Forms/Controls/Dictionary [autocomplete]",
  ...formStoryWrapperTemplateWithMSW,
};

export const Standard: Story = {
  play: async (context) => {
    await waitForMountedAsync();

    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText("Currency");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const list = document.getElementsByClassName("v-list");
    //fireEvent.scroll(list[0], { target: { scrollTop: 900 } });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[0], { delay: 200 });
    //await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    //await userEvent.click(items[21], { delay: 200 });

    await expect(context.args.formModel).toEqual({
      currency: { id: "AFN", label: "Afgani", digitsAfterDecimal: "2" },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/mocks/currencies",
            title: "label",
            value: "id",
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
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

    await expect(context.args.formModel).toEqual({
      currency: {
        id: "BWP",
        label: "Pula",
        digitsAfterDecimal: "2",
      },
    });*/
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/mocks/currencies",
            title: "label",
            value: "id",
            description: "label",
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const WithSearch: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText("Currency");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await userEvent.type(select, "Dol", { delay: 200 });

    const option = await waitFor(
      () => {
        const items = [...document.querySelectorAll(".v-list-item")];
        const found = items.find((item) => item.textContent?.toLowerCase().includes("dolar australijski"));
        if (!found) {
          throw new Error("Czekam na filtrację wyników...");
        }
        return found;
      },
      { timeout: 3000 },
    );

    await userEvent.pointer({ keys: "[MouseLeft]", target: option, pointerName: "mouse", pointerType: "mouse" });
    await userEvent.click(option as HTMLElement, { delay: 400 });

    await expect(context.args.formModel).toEqual({
      currency: {
        id: "AUD",
        label: "Dolar australijski",
        digitsAfterDecimal: "2",
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/mocks/currencies",
            title: "label",
            value: "id",
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
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

    await expect(context.args.formModel).toEqual({
      currency: "Afgani",
    });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/mocks/currencies",
            title: "label",
            value: "id",
            returnObject: false,
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const Required: Story = {
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
    await expect(context.args.formModel).toEqual({
      currency: {
        id: "AFN",
        label: "Afgani",
        digitsAfterDecimal: "2",
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/mocks/currencies",
            title: "label",
            value: "value",
          } as DictionarySource,
        } as SchemaSourceField,
      },
      required: ["currency"],
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const LazyLoadingDisabled: Story = {
  play: async (context) => {
    /* await waitForMountedAsync();
     const canvas = within(context.canvasElement);
     const select = canvas.getByLabelText("Currency");
     await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
     const items = document.getElementsByClassName("v-list-item");
     await userEvent.click(items[0], { delay: 200 });
 
     await expect(context.args.formModel).toEqual({
       currency: {
         id: "BTN",
         label: "Ngultrum",
         digitsAfterDecimal: "2",
       },
     });*/
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/mocks/currencies",
            title: "label",
            value: "id",
            lazy: false,
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
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

      await expect(context.args.formModel).toEqual({
        currency: {
          id: "BWP",
          label: "Pula",
          digitsAfterDecimal: "2",
        },
      });*/
  },
  args: {
    formModel: {},
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
            url: "/mocks/currencies",
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
      msw: {
        handlers: MOCK_REQUEST_CURRENCY,
      },
    },
  },
};

export const OneTimeValueFilter: Story = {
  play: async (context) => {},
  args: {
    formModel: {
      customer: {
        defaultCurrencyCode: "PLN",
      },
    },
    schema: {
      type: "object",
      properties: {
        currency: {
          label: "Currency",
          layout: {
            component: "dictionary",
          },
          source: {
            url: "/mocks/currencies?value-filter={customer.defaultCurrencyCode}",
            title: "label",
            value: "id",
            returnObject: true,
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const ConditionalFilter: Story = {
  args: {
    formModel: {
      testInput: "test",
      deps: {
        item: {
          id: "9",
        },
      },
    },
    schema: {
      type: "object",
      properties: {
        radioButton: {
          initValue: false,
          label: "Choose option",
          layout: {
            component: "radio-button",
          },
          source: {
            items: [
              { value: 1, title: "Filtr" },
              { value: 2, title: "Bez" },
            ],
          },
        },
        dictionary: {
          label: "Słownik",
          layout: {
            component: "dictionary",
            cols: 12,
          },
          source: {
            url: "/mock-dictionaries?filter=id=={deps.item.id}&enable-filter=radioButton=1",
            title: "label",
            value: "id",
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
      },
      required: [],
    },
  },
  parameters: {
    msw: {
      handlers: RESPONSE_DICTIONARY,
    },
  },
};

export const ConditionalValueFilter: Story = {
  args: {
    formModel: {
      testInput: "test",
      deps: {
        item: {
          id: "9",
        },
      },
    },
    schema: {
      type: "object",
      properties: {
        radioButton: {
          initValue: false,
          label: "Choose option",
          layout: {
            component: "radio-button",
          },
          source: {
            items: [
              { value: 1, title: "Filtr" },
              { value: 2, title: "Bez" },
            ],
          },
        },
        dictionary: {
          label: "Słownik",
          layout: {
            component: "dictionary",
            cols: 12,
          },
          source: {
            url: "/mock-dictionaries?value-filter={deps.item.id}&enable-filter=radioButton=1",
            title: "label",
            value: "id",
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
      },
      required: [],
    },
  },
  parameters: {
    msw: {
      handlers: RESPONSE_DICTIONARY,
    },
  },
};

export const ReadOnlyWithValue: Story = {
  play: async (context) => {},
  args: {
    formModel: {
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
            url: "/mocks/currencies",
            title: "label",
            value: "id",
          } as DictionarySource,
        } as SchemaSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};
export const ReadOnlyRequiredWithValue: Story = {
  play: async (context) => {},
  args: {
    formModel: {
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
            url: "/mocks/currencies",
            title: "label",
            value: "id",
          } as DictionarySource,
        } as SchemaSourceField,
      },
      required: ["currency"],
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};
export const ReadOnlyRequiredWithoutValue: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
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
            url: "/mocks/currencies",
            title: "label",
            value: "id",
          } as DictionarySource,
        } as SchemaSourceField,
      },
      required: ["currency"],
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};
