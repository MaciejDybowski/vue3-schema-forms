// @ts-nocheck
import { MULTI_ORDERED_SELECT_MOCK } from "../mock-responses";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";

export default {
  title: "Elements/Editable/OrderedMultiSelect",
  ...formStoryWrapperTemplate,
};


// TODO - napisać testy !!!!!!

export const Standard: Story = {
  play: async (context) => {},
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
      },
      i18n: {},
    },
  },
  parameters: {
    msw: {
      handlers: MULTI_ORDERED_SELECT_MOCK,
    },
  },
};

export const Required: Story = {
  play: async (context) => {},
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

export const Variant: Story = {
  name: "Case: input variant",
  play: async (context) => {},
  args: {
    model: {
      orderedMultiSelect: null,
    },
    schema: {
      type: "object",
      properties: {
        orderedMultiSelect: {
          label: "Wybierz elementy do generowania exclea",
          variant: "combobox",
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
      },
    },
  },
  parameters: {
    msw: {
      handlers: MULTI_ORDERED_SELECT_MOCK,
    },
  },
};
