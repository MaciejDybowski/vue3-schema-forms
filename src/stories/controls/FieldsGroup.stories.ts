// @ts-nocheck
import { REQUEST_PAGE_HIDDEN_DICT } from "@/stories/controls/Dictionary/responses";

import DevelopmentTable from "../../components/app/DevelopmentTable.vue";
import { DictionarySource } from "../../types/shared/Source";
import { commonMetadata } from "../templates/shared-blocks";

export default {
  title: "Forms/Controls/FieldsGroup",
  ...commonMetadata,
  component: DevelopmentTable,
};

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
      fieldQ: "Test",
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
                    if: "nata(fieldA='a')",
                  },
                  source: {
                    url: "/api/currencies?query={fieldQ}",
                    title: "label",
                    value: "id",
                    description: "label",
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
              required: ["fieldA"],
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
    model: {
      fieldQ: "Maciej ukryte",
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
            hide: "nata(switch=false)",
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
