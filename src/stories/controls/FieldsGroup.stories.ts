// @ts-nocheck
import { initialize } from "msw-storybook-addon";

import { DictionarySource } from "../../types/shared/Source";
import { MOCK_REQUEST_CURRENCY } from "../mock-responses";
import { formStoryWrapperTemplate, formStoryWrapperTemplateWithMSW } from "../templates/shared-blocks";

initialize();


export default {
  title: "Forms/Controls/FieldsGroup",
  ...formStoryWrapperTemplateWithMSW,
};

export const TwoFieldsGroup = {
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
  args: {
    formModel: {
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
                    url: "/mocks/currencies?query={fieldQ}",
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
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const Required = {
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

export const ResetValueWhenHidden = {
  args: {
    formModel: {
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
