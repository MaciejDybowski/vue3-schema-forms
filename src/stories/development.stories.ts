// @ts-nocheck
import { initialize, mswLoader } from "msw-storybook-addon";

import { Meta, StoryObj } from "@storybook/vue3";

import FormStoryWrapper from "../components/app/FormStoryWrapper.vue";
import meta from "./development-old.stories";

initialize();

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
  loaders: [mswLoader],
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof meta>;

export const TranslationTesting: Story = {
  args: {
    formModel: {
      variable: "dependency from model",
    },
    schema: {
      type: "object",
      properties: {
        field: {
          label: {
            $ref: "i18n://#/i18n/~$locale~/item"
          },
          layout: {
            component: "text-field",
          },
        },
      },
      i18n: {
        pl: {
          item: "Item PL {0}",
        },
        en: {
          item: "Item EN {0}",
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
