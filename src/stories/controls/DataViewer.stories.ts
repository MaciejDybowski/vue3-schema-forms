// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect } from "@storybook/test";
import { within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";
import { DictionarySource } from "../../types/schema/elements";
import { waitForMountedAsync } from "./utils";

const meta = {
  title: "Forms/Controls/Data viewer",
  component: VueSchemaForms,
  tags: ["autodocs"],
  argTypes: {
    schema: {
      control: "object",
      description: "Schema u" /*table: { disable: true }*/,
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
  name: "Plain text, matching keys",
  play: async (context) => {
    await waitForMountedAsync()
    const canvas = within(context.canvasElement);
    const field = canvas.getByText("Read value from model [text]");
    const text = canvas.getByText("This is plain text");

    await expect(field).toBeInTheDocument();
    await expect(text).toBeInTheDocument();
  },
  args: {
    modelValue: {
      plainText: "This is plain text",
    },
    schema: {
      properties: {
        description: {
          content: "Reading the value of a field where we have a key match in the model and the value is plain text",
          type: "text",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        plainText: {
          label: "Read value from model [text]",
          layout: {
            component: "data-viewer",
          },
        },
      },
    } as Schema,
  },
};

export const StandardNumber: Story = {
  name: "Number, matching keys",
  play: async (context) => {
    await waitForMountedAsync()
    const canvas = within(context.canvasElement);
    const field = canvas.getByText("Read value from model [number]");
    const text = canvas.getByText("4,000.25");

    await expect(field).toBeInTheDocument();
    await expect(text).toBeInTheDocument();
  },
  args: {
    modelValue: {
      number: 4000.25,
    },
    schema: {
      properties: {
        description: {
          content:
            "Reading the value of a field where we have a key match in the model and the value is a number, it will be reformatted correctly",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        number: {
          label: "Read value from model [number]",
          type: "number",
          layout: {
            component: "data-viewer",
          },
        },
      },
    } as Schema,
  },
};

export const StandardDate: Story = {
  name: "Date, matching keys",
  play: async (context) => {
    await waitForMountedAsync()
    const canvas = within(context.canvasElement);
    const field = canvas.getByText("Read value from model [date]");
    const text = canvas.getByText("01/25/2024");

    await expect(field).toBeInTheDocument();
    await expect(text).toBeInTheDocument();
  },
  args: {
    modelValue: {
      date: "2024-01-25T00:00:00.000Z",
    },
    schema: {
      properties: {
        description: {
          content:
            "Reading the value of a field where we have a key match in the model and the value is a date - formatting will take on format DD/MM/YYYYY",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        date: {
          label: "Read value from model [date]",
          type: "date",
          valueMapping: "{date}",
          layout: {
            component: "data-viewer",
          },
        },
      },
    } as Schema,
  },
};

export const StandardPhone: Story = {
  name: "Phone, matching keys",
  play: async (context) => {
    await waitForMountedAsync()
    const canvas = within(context.canvasElement);
    const field = canvas.getByText("Read value from model [phone]");
    const text = canvas.getByText("510 333 202");

    await expect(field).toBeInTheDocument();
    await expect(text).toBeInTheDocument();
  },
  args: {
    modelValue: {
      phone: "+48510333202",
    },
    schema: {
      properties: {
        description: {
          content: "Reading the value of a field where we have a key match in the model and the value comes from phone-input",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        phone: {
          label: "Read value from model [phone]",
          type: "phone",
          layout: {
            component: "data-viewer",
          },
        },
      },
    } as Schema,
  },
};

export const StandardObject: Story = {
  name: "Object, matching keys",
  play: async (context) => {
    await waitForMountedAsync()
    const canvas = within(context.canvasElement);
    const field = canvas.getByText("Read value from model [object]");
    const text = canvas.getByText("Value");

    await expect(field).toBeInTheDocument();
    await expect(text).toBeInTheDocument();
  },
  args: {
    modelValue: {
      obj: {
        text: "Value",
      },
    },
    schema: {
      properties: {
        description: {
          content:
            "Reading the value of a field where we have a key match and we use valueMapping to read from a value that is an object",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        obj: {
          label: "Read value from model [object]",
          valueMapping: "{obj.text}",
          type: "text",
          layout: {
            component: "data-viewer",
          },
        },
      },
    } as Schema,
  },
};

export const StandardDictionary: Story = {
  name: "Dictionary, matching keys",
  parameters: {
    mockData: [
      {
        url: "/api/dictionaries&query=PLN?&page=0&size=20",
        method: "GET",
        status: 200,
        response: {
          content: [
            {
              id: "PLN",
              label: "Polski złoty",
              digitsAfterDecimal: "2",
            },
          ],
          empty: false,
          first: true,
          last: true,
          number: 0,
          numberOfElements: 1,
          pageable: {
            offset: 0,
            pageNumber: 0,
            pageSize: 20,
            paged: true,
            unpaged: false,
          },
          size: 20,
        },
      },
    ],
  },
  play: async (context) => {
    await waitForMountedAsync()
    const canvas = within(context.canvasElement);
    const field = canvas.getByText("Read value from model [dictionary]");
    await new Promise((resolve) => setTimeout(resolve, 200)); // <- wait for api call
    const text = canvas.getByText("Polski złoty");

    await expect(field).toBeInTheDocument();
    await expect(text).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      properties: {
        description: {
          content:
            "Reading the value of a field where we have a key match and we use `valueMapping` to read from a value that is an object",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        dictionary: {
          label: "Read value from model [dictionary]",
          valueMapping: "{dictionary.label}",
          layout: {
            component: "data-viewer",
          },
          source: {
            url: "/api/dictionaries&query=PLN",
            title: "label",
            value: "id",
            returnObject: true,
            singleOptionAutoSelect: true,
          } as DictionarySource,
        },
      },
    } as Schema,
  },
};

export const ValueMapping: Story = {
  name: "ValueMapping from models keys",
  play: async (context) => {
    await waitForMountedAsync()
    const canvas = within(context.canvasElement);
    const field = canvas.getByText("Create text from model variables");
    const text = canvas.getByText("This is plain text and other value 400.25");

    await expect(field).toBeInTheDocument();
    await expect(text).toBeInTheDocument();
  },
  args: {
    modelValue: {
      plainText: "This is plain text",
      number: 400.25,
    },
    schema: {
      properties: {
        description: {
          content: "You can add `data-viewer` fields by assembling text from variables derived from the form model",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        plainText: {
          label: "Create text from model variables",
          valueMapping: "{plainText} and other value {number}",
          layout: {
            component: "data-viewer",
          },
        },
      },
    } as Schema,
  },
};

export const StandardCalc: Story = {
  name: "Calculations",
  play: async (context) => {
    await waitForMountedAsync()
    const canvas = within(context.canvasElement);
    const field = canvas.getByText("Result of calc");
    const text = canvas.getByText("4,100.25");

    await expect(field).toBeInTheDocument();
    await expect(text).toBeInTheDocument();
  },
  args: {
    modelValue: {
      a: 4000.25,
      b: 100,
    },
    schema: {
      properties: {
        description: {
          content: "You can also show the result of the calculation with the data-viewer",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        result: {
          label: "Result of calc",
          type: "number",
          layout: {
            component: "data-viewer",
          },
          calculation: "a + b",
        },
      },
    } as Schema,
  },
};

export const StandardCalcVariable: Story = {
  name: "Calculations with variables",
  play: async (context) => {
    await waitForMountedAsync()
    const canvas = within(context.canvasElement);
    const field = canvas.getByText("Result of calc");
    const text = canvas.getByText("4,100.25");

    await expect(field).toBeInTheDocument();
    await expect(text).toBeInTheDocument();
  },
  args: {
    modelValue: {
      a: 4000.25,
      b: 100,
      currency: {
        id: "PLN",
      },
    },
    schema: {
      properties: {
        description: {
          content: "You can also show the result of the calculation with the data-viewer",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        result: {
          label: "Result of calc",
          type: "number",
          layout: {
            component: "data-viewer",
          },
          calculation: "a + b",
        },
      },
    } as Schema,
  },
};

export const VariableInDuplicatedSection: Story = {
  play: async (context) => {
    await waitForMountedAsync()
    const canvas = within(context.canvasElement);
    const field = canvas.getByText("Currency: PLN");
    await expect(field).toBeInTheDocument();
  },
  args: {
    modelValue: {
      a: 4000.25,
      b: 100,
      currency: {
        id: "PLN",
        rate: 32.1,
      },
    },
    schema: {
      properties: {
        currency: {
          properties: {
            id: {
              label: "Currency",
              layout: {
                component: "text-field",
              }
            },
            rate: {
              label: "Rate",
              layout: {
                component: "number-field",
              }
            }
          }
        },
        items: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                testField: {
                  label: "Currency: {currency.id}",
                  valueMapping: "{currency.rate}",
                  layout: {
                    component: "data-viewer"
                  }
                }
              }
            }
          }
        }
      },
    } as Schema,
  },
};
