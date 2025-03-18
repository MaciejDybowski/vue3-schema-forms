// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect } from "@storybook/test";
import { userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";
import { SchemaTextField } from "../../types/schema/elements";
import { StoryTemplateWithValidation } from "../templates/story-template";
import { DictionarySource } from "../../types/shared/Source";
import { REQUEST_NOT_LAZY, REQUEST_PAGE_HIDDEN_DICT, REQUEST_PAGE_0_1, REQUEST_SEARCH_DOL } from "@/stories/controls/Dictionary/responses";
import DevelopmentTable from "../../components/app/DevelopmentTable.vue";

const meta = {
  title: "Forms/Controls/FieldsGroup",
  component: DevelopmentTable,
  tags: ["autodocs"],
  argTypes: {
    schema: {
      control: "object",
      description: "Schema u" /*table: { disable: true }*/,
    },
    model: {
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
    model: {},
    options: {
      fieldProps: {
        variant: "outlined",
        density: "comfortable",
      },
    },
  },
  parameters: {
    controls: { hideNoControlsWarning: true }, //https://github.com/storybookjs/storybook/issues/24422
  },
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

export const TwoFieldsGroup = {
  args: {
    model: {},
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
  args: {
    modelValue: {
      fieldQ:"Test"
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
                currency: {
                  label: "Currency",
                  layout: {
                    component: "dictionary",
                    if:"nata(fieldA='a')"
                  },
                  source: {
                    url: "/api/currencies?query={fieldQ}",
                    title: "label",
                    value: "id",
                    description: "label"
                  } as DictionarySource,
                } as SchemaSourceField,
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
  parameters: {
    mockData: [REQUEST_PAGE_HIDDEN_DICT],
  },
};


export const Required = {
  args: {
    model: {},
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
              required: ["fieldA"]
            },
            cols: 6,
          },
        },
      },

    },
  },
};

export const ResetValueWhenHidden = {
  args: {
    model: {},
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
            if: "nata(switch=true)",
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
                  }
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
              required: ["fieldA"]
            },
            cols: 6,
          },
        },
      },

    },
  },
};

