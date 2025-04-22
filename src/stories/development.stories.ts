// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";

import FormStoryWrapper from "../components/app/FormStoryWrapper.vue";
import meta from "./development-old.stories";

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

type Story = StoryObj<typeof meta>;

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
