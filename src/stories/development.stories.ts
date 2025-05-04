// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";

import FormStoryWrapper from "../../.storybook/components/FormStoryWrapper.vue";

export default {
  title: "Development Stories",
  component: FormStoryWrapper,
  args: {
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: "outlined",
        density: "comfortable",
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
            item: {
              test: "Item PL {0} and {1}",
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
