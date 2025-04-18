// @ts-nocheck
import { initialize } from "msw-storybook-addon";

import { Schema } from "../../types/schema/Schema";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";



export default {
  title: "Forms/Controls/Button",
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {},
  args: {
    schema: {
      type: "object",
      properties: {
        textArea: {
          label: "Click it!",
          layout: {
            component: "button",
          },
        },
      },
    } as Schema,
  },
};

export const WithProps: Story = {
  play: async (context) => {},
  args: {
    schema: {
      type: "object",
      properties: {
        textArea: {
          label: "Click it!",
          layout: {
            component: "button",
            props: {
              "prepend-icon": "mdi-plus",
            },
          },
        },
      },
    } as Schema,
  },
};

export const CopyToClipboard: Story = {
  args: {
    formModel: {
      input: "Lorem ipsum...",
    },
    schema: {
      type: "object",
      properties: {
        input: {
          label: "Input",
          layout: {
            component: "text-area",
          },
        },
        button: {
          label: "Copy above",
          layout: {
            component: "button",
            props: {
              "append-icon": "mdi-content-copy",
            },
          },
          mode: "copy",
          config: {
            modelReference: "input",
          },
        },
      },
    },
  },
};

export const DialogWithInjectedForm: Story = {
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        button: {
          label: "Open dialog!",
          layout: {
            component: "button",
          },
          mode: "form-and-action",
          config: {
            code: "update_csv",
            modelReference: "popupModel",
            title: "Title of the dialog - static text without deps",
            acceptText: "Import",
          },
          schema: {
            properties: {
              csvBody: {
                label: "CsvBody",
                layout: {
                  component: "text-field",
                  cols: 9,
                },
              },
              button: {
                label: "Copy CSV",
                layout: {
                  component: "button",
                  props: {
                    "append-icon": "mdi-content-copy",
                  },
                  cols: 3,
                },
                mode: "copy",
                config: {
                  modelReference: "csvBody",
                },
              },
            },
          },
        },
      },
    },
  },
};
