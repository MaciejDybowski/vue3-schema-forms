// @ts-nocheck
import { expect, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";

export default {
  title: "Forms/Controls/Button",
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole("button", { name: "Click it!" });
    await expect(button).toBeInTheDocument();
  },
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
  name: "Case: customization",
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole("button", { name: "Click it!" });
    await expect(button).toBeInTheDocument();

    const btnClasses = document.getElementsByClassName("mdi-plus mdi v-icon");
    await expect(btnClasses.length).toEqual(1);
  },
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
  name: "Mode: copy value to clipboard  ",
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole("button", { name: "Copy above" });
    await expect(button).toBeInTheDocument();

    const copiedValues: string[] = [];
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: (text) => {
        window.__copiedText = text;
        copiedValues.push(text);
        return Promise.resolve();
      },
    });

    await button.click();
    await expect(copiedValues[0]).toEqual("Lorem ipsum...");
  },
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
  name: "Mode: dialog with internal form",
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole("button", { name: "Open dialog!" });
    await expect(button).toBeInTheDocument();
    await button.click();

    const fieldA = await within(document.body).findByLabelText("field A");
    await userEvent.type(fieldA, "Test");


    const buttonCopied = await within(document.body).findByRole("button", { name: "Copy field A" });
    await expect(buttonCopied).toBeInTheDocument();

    const copiedValues: string[] = [];
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: (text) => {
        window.__copiedText = text;
        copiedValues.push(text);
        return Promise.resolve();
      },
    });

    await buttonCopied.click();
    await expect(copiedValues[0]).toEqual("Test");

    const buttonSave = await within(document.body).findByRole("button", { name: "Save" });

    await new Promise(resolve => setTimeout(resolve, 400));
    await buttonSave.click();

    await expect(context.args.emittedObject).toEqual({});
  },
  args: {
    formModel: {},
    emittedObject: {},
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
            acceptText: "Save",
          },
          schema: {
            properties: {
              fieldA: {
                label: "field A",
                layout: {
                  component: "text-field",
                  cols: 4,
                },
              },
              fieldB: {
                label: "field B",
                layout: {
                  component: "text-field",
                  cols: 4,
                },
              },
              fieldC: {
                label: "field C",
                layout: {
                  component: "text-field",
                  cols: 4,
                },
              },
              button: {
                label: "Copy field A",
                layout: {
                  component: "button",
                  props: {
                    "append-icon": "mdi-content-copy",
                  },
                  cols: 6,
                },
                mode: "copy",
                config: {
                  modelReference: "fieldA",
                },
              },
            },
          },
        },
      },
    },
  },
};

export const APICall: Story = {
  args: {
    formModel: {
      itemId: "item-1",
      example1: "Example",
      item: {
        example2: "Example 2",
      },
    },
    schema: {
      type: "object",
      properties: {
        button: {
          label: "API Call here",
          layout: {
            component: "button",
          },
          mode: "api-call",
          config: {
            source: "/mocks/files/{itemId}",
            method: "PUT",
            body: {
              example1: "{example1}",
              example2: "{item.example2}",
            },
          },
        },
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    formModel: {
      itemId: "item-1",
      example1: "Example",
      item: {
        example2: "Example 2",
      },
    },
    schema: {
      type: "object",
      properties: {
        button: {
          label: "Disabled button",
          layout: {
            component: "button",
          },
          mode: "api-call",
          config: {
            source: "/mocks/files/{itemId}",
            method: "PUT",
            body: {
              example1: "{example1}",
              example2: "{item.example2}",
            },
          },
        },
      },
    },
    options: {
      buttonProps: {
        readonly: true,
      },
    },
  },
};

export const APICallWaitForSave: Story = {
  args: {
    formModel: {
      itemId: "item-1",
      example1: "Example",
      item: {
        example2: "Example 2",
      },
    },
    schema: {
      type: "object",
      properties: {
        button: {
          label: "API Call here",
          layout: {
            component: "button",
          },
          mode: "api-call",
          config: {
            source: "/mocks/files/{itemId}",
            method: "PUT",
            body: {
              example1: "{example1}",
              example2: "{item.example2}",
            },
            waitForSaveState: true,
          },
        },
      },
    },
  },
};
