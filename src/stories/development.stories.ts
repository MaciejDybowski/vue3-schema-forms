// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";

import FormStoryWrapper from "../../.storybook/components/FormStoryWrapper.vue";
import { MULTI_ORDERED_SELECT_MOCK } from "./mock-responses";

export default {
  title: "Development Area",
  component: FormStoryWrapper,
  args: {
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: "outlined",
        density: "compact",
      },
    },
  },
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;

export const TranslationTesting: Story = {
  args: {
    formModel: {
      variable: "Test",
      element: "Masakra",
    },
    schema: {
      type: "object",
      properties: {
        span: {
          content: {
            $ref: "#/i18n/~$locale~/longSpan",
            "0": "{variable}",
          },
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        field: {
          label: {
            $ref: "#/i18n/~$locale~/home/test/item",
            "0": "{variable}",
            "1": "{element}",
          },
          layout: {
            component: "text-field",
          },
        },
      },
      i18n: {
        pl: {
          home: {
            test: {
              item: "Item PL {0} and {1}",
            },
          },
          longSpan:
            "Lorem Ipsum is simply dummy text of the printing and typesetting {0}. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        en: {
          home: {
            test: {
              item: "Item EN {0} and {1}",
            },
          },
          longSpan:
            "Lorem Ipsum is simply dummy text of the printing and typesetting {0}. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
      },
    },
  },
};

export const TranslationTesting2: Story = {
  args: {
    formModel: {
      isCustomerExist: false,
      customer: {
        name: "Text",
        shipCountry: {
          label: "Country",
        },
        salesRegion: {
          label: "Region",
        },
      },
    },
    schema: {
      type: "object",
      properties: {
        customerData: {
          content: {
            $ref: "#/i18n/~$locale~/form/prepareOffer/customerData",
            "0": "{customer.name:No data}",
            "1": "{nata(isCustomerExist ? customer.shipCountry : customer.shipCountry.label)}",
            "2": "{nata(isCustomerExist ? customer.salesRegion : customer.salesRegion.label)}",
          },
          layout: {
            component: "static-content",
            tag: "p",
            cols: {
              xs: 12,
              sm: 12,
              md: 12,
              lg: 8,
              xl: 8,
              xxl: 8,
            },
          },
        },
      },
      i18n: {
        pl: {
          form: {
            prepareOffer: {
              customerData: "test {0} item {1} oraz {2}",
            },
          },
        },
        en: {
          form: {
            prepareOffer: {
              customerData: "test {0} item {1} oraz {2}",
            },
          },
        },
      },
    },
  },
};

export const Story1: Story = {
  args: {
    formModel: {
      keyValueList: [
        { label: "Nazwa", value: "Bedframe + bedsides", temp: "123" },
        { label: "EAN", value: "5904767831813" },
        { label: "Program", value: "ARYSTYDA" },
        { label: "Funkcja", value: "Sleeping" },
        { label: "Typ mebla", value: "Bedframes" },
        { label: "Oznaczenie", value: "2SK" },
        { label: "Oświetlenie", value: "0 [lm]" },
      ],
    },
    schema: {
      type: "object",
      properties: {
        keyValueList: {
          label: "Pole do pokazania listy klucz wartosc",
          config: [
            { title: "Pole", valueMapping: "label" },
            { title: "Wartość", valueMapping: "value" },
            { title: "Test", valueMapping: "temp" },
          ],
          layout: {
            component: "key-value-list",
            cols: 6,
          },
        },
      },
      i18n: {},
    },
  },
  parameters: {},
};

export const Story2: Story = {
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        "text-field-438": {
          label: { $ref: "#/i18n/~$locale~/textField438" },
          layout: { component: "text-field" },
        },
        "fields-group-078": {
          layout: {
            component: "fields-group",
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
            schema: {
              type: "object",
              properties: {
                "text-field-168": {
                  label: { $ref: "../i18n/~$locale~/textField168" },
                  layout: { component: "text-field" },
                },
              },
              i18n: { pl: { textField168: "123" }, en: { textField168: "123" }, de: { textField168: "" } },
            },
          },
        },
      },
      i18n: { pl: { textField438: "qwe" }, en: { textField438: "qwe" }, de: { textField438: "qwe" } },
    },
  },
  parameters: {},
};

export const Story3: Story = {
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        typelistColumns: {
          label: "",
          variant: "list",
          layout: {
            cols: {
              xs: 12,
              sm: 12,
              md: 12,
              lg: 12,
              xl: 12,
              xxl: 12,
            },
            component: "ordered-multi-select",
          },
          source: {
            url: "/mocks/multi-ordered-items",
            title: "label",
            value: "id",
            returnObject: true,
          },
        },
        resetButton: {
          label: "Reset to default",
          layout: {
            component: "button",
          },
          mode: "action",
          config: {
            code: "callScript",
            params: {
              script: "reset_typelist_settings",
            },
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: MULTI_ORDERED_SELECT_MOCK,
    },
  },
};

export const Table: Story = {
  name: "ordered-multi-select",
  args: {
    model: {
      orderedMultiSelect: null,
    },
    schema: {
      type: "object",
      properties: {
        orderedMultiSelect: {
          label: "Wybierz elementy do generowania exclea",
          variant: "list",
          layout: {
            cols: 12,
            component: "ordered-multi-select",
          },
          source: {
            url: "/mocks/multi-ordered-items",
            title: "label",
            value: "id",
          },
        },
        /*   orderedMultiSelect2: {
             label: "Wybierz elementy do generowania exclea",
             variant: "combobox",
             layout: {
               cols: 6,
               component: "ordered-multi-select",
             },
             source: {
               url: "/mock/dictionaries/items-to-excel",
               title: "label",
               value: "id",
             },
           },*/
      },
      required: ["orderedMultiSelect"],
      i18n: {},
    },
  },
  parameters: {
    msw: {
      handlers: MULTI_ORDERED_SELECT_MOCK,
    },
  },
};

export const Table4: Story = {
  args: {
    formModel: {
      fieldA: "2025-05-09",
    },
    schema: {
      type: "object",
      properties: {
        fieldA: {
          label: "Date",
          layout: {
            component: "date-picker",
            cols: 4,
            props: {
              readonly: true,
            },
          },
        },
        fieldB: {
          label: "Text",
          layout: {
            component: "text-field",
            cols: 4,
            props: {
              hint: "Test",
              "persistent-hint": true,
            },
          },
        },
        fieldC: {
          label: "Date&Time",
          layout: {
            component: "date-time-picker",
            cols: 4,
          },
        },
      },
    },
  },
};
