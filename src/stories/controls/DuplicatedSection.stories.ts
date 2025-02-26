// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { StoryTemplateWithValidation } from "@/stories/templates/story-template";
import { expect, userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";

const meta = {
  title: "Forms/Controls/DuplicatedSection",
  component: VueSchemaForms,
  tags: ["autodocs"],
  argTypes: {
    schema: {
      control: "object",
      description: "Schema" /*table: { disable: true }*/,
    },
    modelValue: {
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
    modelValue: {},
    options: {},
  },
  parameters: {
    controls: { hideNoControlsWarning: true }, //https://github.com/storybookjs/storybook/issues/24422
  },
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
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

/**
 * Duplicated section with required fields
 */
export const StandardWithRequired: Story = {
  render: StoryTemplateWithValidation,
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText("Field is required.")).toBeInTheDocument();

    const input1 = await canvas.findByLabelText("Product");
    await userEvent.type(input1, "Item 1", { delay: 100 });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
                },
              },
              required: ["product"],
            },
            cols: 6,
          },
        },
      },
    } as Schema,
  },
};

/**
 * You can set the default value of field from schema
 */
export const WithDefaults: Story = {
  name: "Default values",
  args: {
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          defaultValue: [{ product: "Item1" }, { product: "Item2" }],
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
          },
          cols: 6,
        },
      },
    } as Schema,
  },
};

export const WithDivider: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              showDivider: true,
            },
          },
        },
      },
    },
  },
};

export const WithBtnProps: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              addBtnText: { $ref: "#/i18n/~$locale~/addAction" },
            },
          },
        },
      },
      i18n: {
        en: {
          addAction: "Add item",
        },
        pl: {
          addAction: "Dodaj pozycję",
        },
      },
    },
    options: {
      buttonProps: {
        variant: "outlined",
        rounded: "xl",
      },
    },
  },
};

export const AddAction: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const input1 = await canvas.findByLabelText("Product");
    await userEvent.type(input1, "Item 1", { delay: 100 });

    await expect(context.args.modelValue).toEqual({
      invoiceItems: [{ product: "Item 1" }],
    });

    const addButton = await canvas.findByRole("button", { name: "Add" });
    await userEvent.click(addButton, { delay: 400 });

    const duplicatedSections = document.getElementsByClassName("duplicated-section-item");
    await expect(duplicatedSections[1]).toBeInTheDocument();

    const input2 = await within(duplicatedSections[1]).findByLabelText("Product");
    await userEvent.type(input2, "Item 2", { delay: 100 });

    await expect(context.args.modelValue).toEqual({
      invoiceItems: [{ product: "Item 1" }, { product: "Item 2" }],
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              showDivider: true,
            },
          },
        },
      },
    } as Schema,
  },
};

export const CopyBelowAction: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const input1 = await canvas.findByLabelText("Product");
    await userEvent.type(input1, "Item 1", { delay: 100 });

    await expect(context.args.modelValue).toEqual({
      invoiceItems: [{ product: "Item 1" }],
    });

    const duplicatedSections = document.getElementsByClassName("duplicated-section-item");
    await expect(duplicatedSections[0]).toBeInTheDocument();

    const section = within(duplicatedSections[0]);
    const contextMenu = section.queryAllByRole("button")[0];

    await userEvent.hover(duplicatedSections[0], { delay: 200 });
    await userEvent.click(contextMenu, { delay: 200 });

    const copyBelowAction = document.getElementsByClassName("v-list-item")[1];
    await userEvent.click(copyBelowAction, { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      invoiceItems: [{ product: "Item 1" }, { product: "Item 1" }],
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              showDivider: true,
            },
          },
        },
      },
    } as Schema,
  },
};

export const CopyModeOfButton: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const input1 = await canvas.findByLabelText("Product");
    await userEvent.type(input1, "Item 1", { delay: 100 });

    await expect(context.args.modelValue).toEqual({
      invoiceItems: [{ product: "Item 1" }],
    });

    const duplicatedSections = document.getElementsByClassName("duplicated-section-item");
    await expect(duplicatedSections[0]).toBeInTheDocument();

    const section = within(duplicatedSections[0]);
    const contextMenu = section.queryAllByRole("button")[0];

    await userEvent.hover(duplicatedSections[0], { delay: 200 });
    await userEvent.click(contextMenu, { delay: 200 });

    const copyBelowAction = document.getElementsByClassName("v-list-item")[1];
    await userEvent.click(copyBelowAction, { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      invoiceItems: [{ product: "Item 1" }, { product: "Item 1" }],
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              showDivider: true,
              addBtnText: "Copy last row",
              addBtnMode: "copy",
            },
          },
        },
      },
    } as Schema,
  },
};

export const DeleteAction: Story = {
  play: async (context) => {
    await expect(context.args.modelValue).toEqual({
      invoiceItems: [{ product: "Item 1" }, { product: "Item 2" }],
    });

    const duplicatedSections = document.getElementsByClassName("duplicated-section-item");
    await expect(duplicatedSections[1]).toBeInTheDocument();

    const section = within(duplicatedSections[1]);
    const contextMenu = section.queryAllByRole("button")[0];

    await userEvent.hover(duplicatedSections[1], { delay: 200 });
    await userEvent.click(contextMenu, { delay: 200 });

    const deleteAction = document.getElementsByClassName("v-list-item")[0];
    await userEvent.click(deleteAction, { delay: 200 });

    await expect(context.args.modelValue).toEqual({
      invoiceItems: [{ product: "Item 1" }],
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          defaultValue: [{ product: "Item 1" }, { product: "Item 2" }],
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              showDivider: true,
            },
          },
        },
      },
    } as Schema,
  },
};

export const AddBelowAction: Story = {
  play: async (context) => {
    await expect(context.args.modelValue).toEqual({
      invoiceItems: [{ product: "Item 1" }, { product: "Item 2" }],
    });

    let duplicatedSections = document.getElementsByClassName("duplicated-section-item");
    await expect(duplicatedSections[1]).toBeInTheDocument();

    let section = within(duplicatedSections[0]);
    const contextMenu = section.queryAllByRole("button")[0];

    await userEvent.hover(duplicatedSections[0], { delay: 200 });
    await userEvent.click(contextMenu, { delay: 200 });

    const deleteAction = document.getElementsByClassName("v-list-item")[2];
    await userEvent.click(deleteAction, { delay: 200 });

    duplicatedSections = document.getElementsByClassName("duplicated-section-item");
    section = within(duplicatedSections[1]);
    const input2 = await section.findByLabelText("Product");
    await userEvent.type(input2, "new item", { delay: 100 });

    await expect(context.args.modelValue).toEqual({
      invoiceItems: [{ product: "Item 1" }, { product: "new item" }, { product: "Item 2" }],
    });
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          defaultValue: [{ product: "Item 1" }, { product: "Item 2" }],
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              showDivider: true,
            },
          },
        },
      },
    } as Schema,
  },
};

export const ReadOnlyMode: Story = {
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        description: {
          content: "Add editable:false on first level of definition object. ex. nearby layout",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        stages: {
          editable: false,
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                simpleDate: {
                  label: "DateTime",
                  layout: {
                    component: "date-time-picker",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const OrdinalNumber: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                paragraph: {
                  content: "Pozycja nr. {ordinalNumber}",
                  type: "text",
                  layout: {
                    component: "static-content",
                    tag: "span",
                  },
                },
                product: {
                  label: "Lp. {ordinalNumber} - Product",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              showDivider: true,
              ordinalNumberInModel: true,
            },
          },
        },
      },
    },
  },
};

export const NotDisplayInitRowWhenEmpty: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await expect(context.args.modelValue).toEqual({});
    const inputElement = canvas.queryByLabelText("Product");
    await expect(inputElement).not.toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              showFirstInitRow: false,
            },
          },
        },
      },
    },
  },
};

export const DisplayProperlyWhenModelAndInitRowIsEnabled: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await expect(context.args.modelValue).toEqual({
      invoiceItems: [{ product: "Item 1" }],
    });
    const inputElement = canvas.queryByLabelText("Product");
    await expect(inputElement).toBeInTheDocument();
  },
  args: {
    modelValue: {
      invoiceItems: [{ product: "Item 1" }],
    },
    schema: {
      type: "object",
      properties: {
        invoiceItems: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                product: {
                  label: "Product",
                  layout: { component: "text-field", cols: 12 },
                },
              },
            },
            options: {
              showFirstInitRow: false,
            },
          },
        },
      },
    },
  },
};
