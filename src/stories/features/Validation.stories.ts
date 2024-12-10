// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect } from "@storybook/test";
import { userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";
import { SchemaField } from "../../types/schema/elements";
import { StoryTemplateWithCustomValidation, StoryTemplateWithValidation } from "../templates/story-template";

const meta = {
  title: "Forms/Features/Validations",
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

/*
export const CustomRegexpValidations: Story = {
  render: StoryTemplateWithValidation,
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit, { delay: 100 });

    await expect(canvas.getByText("Email must be valid")).toBeInTheDocument();

    const field = canvas.getByLabelText("Email");
    await userEvent.type(field, "maciejdybowski@github.com", { delay: 100 });

    await userEvent.click(Submit, { delay: 100 });
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        email: {
          label: "Email",
          layout: {
            component: "text-field",
          },
          validations: [
            {
              regexp: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
              message: { $ref: "#/i18n/~$locale~/emailIsNotValid" },
            },
          ],
        } as SchemaField,
      },
      required: [""],
      i18n: {
        pl: {
          emailIsNotValid: "Adres e-mail nie jest poprawny",
        },
        en: {
          emailIsNotValid: "Email must be valid",
        },
      },
    } as Schema,
  },
};
*/

/**
 * #### Required field with nested
 */
export const RequiredWithNested: Story = {
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        item1: {
          label: "Normal Item",
          layout: { component: "text-field" },
        },
        nested: {
          properties: {
            item2: {
              label: "Nested Item",
              layout: { component: "text-field" },
            },
          },
          required: ["item2"],
        },
      },
      required: ["item1"] as Schema,
    },
  },
};

const validationExample = {
  type: "object",
  properties: {
    field1: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field2: { label: "Identifier", layout: { component: "text-field" } } as SchemaField,
    field3: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field4: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field5: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field6: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field7: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field8: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field9: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field10: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field11: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field12: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field13: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field14: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field15: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field16: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field17: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
    field18: { label: "Field 1", layout: { component: "text-field" } } as SchemaField,
  },
  required: ["field2"],
} as Schema;
export const ExposedValidationAndScroll: Story = {
  args: {
    defaultFormActions: true,
    validationBehaviour: "scroll",
    modelValue: {},
    schema: validationExample,
  },
};

export const ExposedValidationAndScrollWithRules: Story = {
  args: {
    defaultFormActions: true,
    validationBehaviour: "scroll",
    modelValue: {},
    schema: {
      properties: {
        fieldA: {
          label:"Field A",
          layout: {
            component: "text-field"
          },
          validations: [
            {
              name: "valid-sth",
              rule: "fieldA != fieldB",
              message: "Custom message"
            },
          ],
        },
        fieldB: {
          label: "Field B",
          layout: {
            component: "text-field"
          }
        }
      }
    },
  },
};


export const ExposedValidationAndMessages: Story = {
  args: {
    defaultFormActions: true,
    validationBehaviour: "messages",
    modelValue: {},
    schema: validationExample,
  },
};

export const AddCustomSubmitWithBuiltInValidation: Story = {
  render: StoryTemplateWithCustomValidation,
  args: {
    modelValue: {},
    schema: validationExample,
  },
};

/**
 * #### Warunkową wymagalność pola możemy zdefiniować dodając obiekt do tablicy `validations`, gdzie nazwa to `conditional-required` a warunek zgodny z JSONata
 */
export const ConditionalRequired: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();

    const field = canvas.getByLabelText("Is field required?");
    await userEvent.click(field, { delay: 200 });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText("Field is required.")).toBeInTheDocument();

    const textField = canvas.getByLabelText("Test field");
    await userEvent.type(textField, "Required field", {
      delay: 100,
    });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  render: StoryTemplateWithValidation,
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        fieldA: {
          label: "Is field required?",
          layout: {
            component: "switch",
          },
        },
        fieldB: {
          label: "Test field",
          layout: {
            component: "text-field",
          },
          validations: [
            {
              name: "conditional-required",
              rule: "fieldA=true",
            },
          ],
        },
      },
    },
  },
};


/**
 * #### Można definiować funkcje walidacyjne oparte o budowanie warunków JSONata
 */
export const ValidationFunctionWithJSONNataAndContext: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();

    let textField = canvas.getByLabelText("Username");
    await userEvent.type(textField, "Maciej", {
      delay: 100,
    });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText("Custom message")).toBeInTheDocument();

    const textField2 = canvas.getByLabelText("Username");
    await userEvent.type(textField2, "Karol", {
      delay: 100,
    });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  render: StoryTemplateWithValidation,
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        username: {
          label: "Username",
          layout: {
            component: "text-field",
          },
          validations: [
            {
              name: "valid-sth",
              rule: "username!=context.currentUser.username or $not($exists(username))",
              message: "Custom message"
            },
          ],
        },
      },
    },
    options: {
      context: {
        currentUser: {
          username: "Maciej"
        }
      }
    }
  },
};

export const ValidationFunctionInSections: Story = {
  play: async (context) => {
  },
  render: StoryTemplateWithValidation,
  args: {
    modelValue: {
      "pozycjeDokumentu": [
        {"fieldA":"Karol"},
        {"fieldA":"Maciej"}
      ]
    },
    schema: {
      type: "object",
      properties: {
        pozycjeDokumentu: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                fieldA: {
                  label: "FieldA",
                  layout: {
                    component: "text-field",
                    cols: 6
                  },
                  validations: [
                    {
                      name: "valid-sth",
                      rule: "pozycjeDokumentu[].fieldA!=context.currentUser.username",
                      message: "Custom message"
                    },
                  ]
                }
              }
            }
          }
        }
      },
    },
    options: {
      context: {
        currentUser: {
          username: "Maciej"
        }
      }
    }
  },
}