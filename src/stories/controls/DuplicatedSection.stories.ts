// @ts-nocheck
import { expect, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { DictionarySource } from "../../types/shared/Source";
import { MOCK_REQUEST_CURRENCY } from "../mock-responses";
import { formStoryWrapperTemplateWithMSW } from "../templates/shared-blocks";
import { waitForMountedAsync } from "./utils";

export default {
  title: "Forms/Controls/DuplicatedSection",
  ...formStoryWrapperTemplateWithMSW,
};

export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await expect(context.args.formModel).toEqual({
      items: [{ product: "Product 1" }, { product: "Product 1" }],
    });
  },
  args: {
    formModel: {
      items: [{ product: "Product 1" }, { product: "Product 1" }],
    },
    schema: {
      type: "object",
      properties: {
        items: {
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
  name: "Required",
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
    formModel: {},
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
  name: "Default value",
  args: {
    formModel: {},
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
  name: "Case: add divider between sections",
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await expect(context.args.formModel).toEqual({
      items: [{ product: "Product 1" }, { product: "Product 1" }],
    });
    const divider = document.getElementsByClassName("v-divider mt-6");
    await expect(divider.length).toEqual(1);
  },
  args: {
    formModel: {
      items: [{ product: "Product 1" }, { product: "Product 1" }],
    },
    schema: {
      type: "object",
      properties: {
        items: {
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
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const addButton = await canvas.findByRole("button", { name: "Add item" });
    await expect(addButton).toBeInTheDocument();
    const btnClasses = document.getElementsByClassName(" v-btn--variant-outlined rounded-xl");
    await expect(btnClasses.length).toEqual(1);
  },
  name: "Case: Add button customization",
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        items: {
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
      fieldProps: {
        variant: "outlined",
        density: "comfortable",
      },
      buttonProps: {
        variant: "outlined",
        rounded: "xl",
      },
    },
  },
};

export const CopyModeOfButton: Story = {
  name: "Case: button mode",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const input1 = await canvas.findByLabelText("Product");
    await userEvent.type(input1, "Item 1", { delay: 100 });

    await expect(context.args.formModel).toEqual({
      invoiceItems: [{ product: "Item 1" }],
    });

    const duplicatedSections = document.getElementsByClassName("duplicated-section-item");
    await expect(duplicatedSections[0]).toBeInTheDocument();

    const addButton = await canvas.findByRole("button", { name: "Copy last row" });
    await userEvent.click(addButton, { delay: 400 });

    await expect(context.args.formModel).toEqual({
      invoiceItems: [{ product: "Item 1" }, { product: "Item 1" }],
    });
  },
  args: {
    formModel: {},
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

export const OrdinalNumber: Story = {
  name: "Case: add ordinal number to row",
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await waitForMountedAsync();
    await expect(context.args.formModel).toEqual({
      items: [{ ordinalNumber: 1 }],
    });

    let duplicatedSections = document.getElementsByClassName("duplicated-section-item");
    await expect(duplicatedSections[0]).toBeInTheDocument();

    const field = canvas.getByLabelText("Lp. 1 - Product");
    await userEvent.type(field, "Number one", { delay: 100 });

    const addButton = await canvas.findByRole("button", { name: "Add" });
    await userEvent.click(addButton, { delay: 400 });

    const field2 = canvas.getByLabelText("Lp. 2 - Product");
    await userEvent.type(field2, "Number two", { delay: 100 });

    await expect(context.args.formModel).toEqual({
      items: [
        { product: "Number one", ordinalNumber: 1 },
        { product: "Number two", ordinalNumber: 2 },
      ],
    });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        items: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                paragraph: {
                  content: "Item nr. {items[].ordinalNumber}",
                  type: "text",
                  layout: {
                    component: "static-content",
                    tag: "span",
                  },
                },
                product: {
                  label: "Lp. {items[].ordinalNumber} - Product",
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
  name: "Case: not display empty first row",
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await expect(context.args.formModel).toEqual({});
    const inputElement = canvas.queryByLabelText("Product");
    await expect(inputElement).not.toBeInTheDocument();
  },
  args: {
    formModel: {},
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
  name: "Case: display first row when model is exist",
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await expect(context.args.formModel).toEqual({
      invoiceItems: [{ product: "Item 1" }],
    });
    const inputElement = canvas.queryByLabelText("Product");
    await expect(inputElement).toBeInTheDocument();
  },
  args: {
    formModel: {
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

export const AddAction: Story = {
  name: "Test: Add action",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const input1 = await canvas.findByLabelText("Product");
    await userEvent.type(input1, "Item 1", { delay: 100 });

    await expect(context.args.formModel).toEqual({
      items: [{ product: "Item 1" }],
    });

    const addButton = await canvas.findByRole("button", { name: "Add" });
    await userEvent.click(addButton, { delay: 400 });

    const duplicatedSections = document.getElementsByClassName("duplicated-section-item");
    await expect(duplicatedSections[1]).toBeInTheDocument();

    const input2 = await within(duplicatedSections[1]).findByLabelText("Product");
    await userEvent.type(input2, "Item 2", { delay: 100 });

    await expect(context.args.formModel).toEqual({
      items: [{ product: "Item 1" }, { product: "Item 2" }],
    });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        items: {
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
  name: "Test: Copy below action",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const input1 = await canvas.findByLabelText("Product");
    await userEvent.type(input1, "Item 1", { delay: 100 });

    await expect(context.args.formModel).toEqual({
      items: [{ product: "Item 1" }],
    });

    const duplicatedSections = document.getElementsByClassName("duplicated-section-item");
    await expect(duplicatedSections[0]).toBeInTheDocument();

    const section = within(duplicatedSections[0]);
    const contextMenu = section.queryAllByRole("button")[0];

    await userEvent.hover(duplicatedSections[0], { delay: 200 });
    await userEvent.click(contextMenu, { delay: 200 });

    const copyBelowAction = document.getElementsByClassName("v-list-item")[1];
    await userEvent.click(copyBelowAction, { delay: 200 });

    await expect(context.args.formModel).toEqual({
      items: [{ product: "Item 1" }, { product: "Item 1" }],
    });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        items: {
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

export const DeleteAction: Story = {
  name: "Test: Delete action",
  play: async (context) => {
    await expect(context.args.formModel).toEqual({
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

    await expect(context.args.formModel).toEqual({
      invoiceItems: [{ product: "Item 1" }],
    });
  },
  args: {
    formModel: {},
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
  name: "Test: Add below action",
  play: async (context) => {
    await expect(context.args.formModel).toEqual({
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

    await expect(context.args.formModel).toEqual({
      invoiceItems: [{ product: "Item 1" }, { product: "new item" }, { product: "Item 2" }],
    });
  },
  args: {
    formModel: {},
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

export const ReadOnlyModeTODO: Story = {
  name: "Test: Read only mode",
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await expect(context.args.formModel).toEqual({
      items: [
        {
          textField: "Item 1",
          numberField: 1.23,
          simpleDate: "2025-04-22",
          simpleDateTime: "2025-04-22T00:00:00.000+02:00",
        },
      ],
    });
  },
  args: {
    formModel: {
      items: [
        {
          textField: "Item 1",
          numberField: 1.23,
          simpleDate: "2025-04-22",
          simpleDateTime: "2025-04-22T00:00:00.000+02:00",
        },
      ],
    },
    schema: {
      type: "object",
      properties: {
        items: {
          editable: false,
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                textField: {
                  label: "Text field",
                  layout: {
                    component: "text-field",
                  },
                },
                numberField: {
                  label: "Number field",
                  layout: {
                    component: "number-field",
                  },
                },
                simpleDate: {
                  label: "Date",
                  layout: {
                    component: "date-picker",
                  },
                },
                simpleDateTime: {
                  label: "DateTime",
                  layout: {
                    component: "date-time-picker",
                  },
                },
                dictionary: {
                  label: "Dictionary",
                  layout: {
                    component: "dictionary",
                  },
                  source: {
                    url: "/mocks/currencies",
                    title: "label",
                    value: "id",
                  } as DictionarySource,
                } as SchemaSourceField,
              },
            },
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
