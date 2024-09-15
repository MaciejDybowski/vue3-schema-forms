// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect } from "@storybook/test";
import { userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";

const meta = {
  title: "Forms/Features/If expression",
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

export const OnComponentSimpleField: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    let textArea = document.getElementsByClassName("v-textarea");
    await expect(textArea.length).toEqual(1);
    const option2 = canvas.getByLabelText("Text field");
    await userEvent.click(option2, { delay: 200 });

    const textField = document.getElementsByClassName("node-text-field");
    textArea = document.getElementsByClassName("v-textarea");
    await expect(textField[0]).not.toEqual(null);
    await expect(textArea.length).toEqual(0);
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        conditional: {
          label: "Choose component",
          layout: {
            component: "radio-button",
          },
          source: {
            items: [
              { value: false, title: "Text area" },
              { value: true, title: "Text field" },
            ],
          },
        },
        fieldA: {
          label: "Field A",
          layout: {
            component: "if(conditional==false,text-area,text-field)",
          },
        },
      },
      required: [],
    } as Schema,
  },
};

export const OnComponentIfInDuplicatedSection: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    let textArea = document.getElementsByClassName("v-textarea");
    await expect(textArea.length).toEqual(1);
    const option2 = canvas.getByLabelText("Text field");
    await userEvent.click(option2, { delay: 200 });

    const textField = document.getElementsByClassName("node-text-field");
    textArea = document.getElementsByClassName("v-textarea");
    await expect(textField[0]).not.toEqual(null);
    await expect(textArea.length).toEqual(0);
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        conditional: {
          label: "Choose component",
          layout: {
            component: "radio-button",
          },
          source: {
            items: [
              { value: false, title: "Text area" },
              { value: true, title: "Text field" },
            ],
          },
        },
        section: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                fieldA: {
                  label: "Field A",
                  layout: {
                    component: "if(conditional==false,text-area,text-field)",
                  },
                },
              },
            },
          },
        },
      },
      required: [],
    } as Schema,
  },
};

export const OnPropsSimpleField: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    let hint = document.getElementsByClassName("v-messages");
    await expect(hint.length).toEqual(0);

    const option2 = canvas.getByLabelText("Euro");
    await userEvent.click(option2, { delay: 200 });
    hint = document.getElementsByClassName("v-messages");
    await expect(hint.length).toEqual(1);
  },
  args: {
    modelValue: { waluta: { value: "PLN", title: "Polski złoty" } },
    schema: {
      type: "object",
      properties: {
        waluta: {
          label: "Waluta",
          layout: {
            component: "radio-button",
          },
          source: {
            items: [
              { value: "PLN", title: "Polski złoty" },
              { value: "EUR", title: "Euro" },
            ],
            returnObject: true,
          },
        },
        kwotaNetto: {
          label: "Kwota netto",
          layout: {
            component: "text-field",
            props: {
              "persistent-hint": "if(waluta.value!='PLN',true,false)",
              hint: "Kwota netto PLN: {kwotaNettoPln:0}",
            },
          },
        },
      },
      required: [],
    } as Schema,
  },
};

export const OnPropsIfInDuplicatedSection: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    let hint = document.getElementsByClassName("v-messages");
    await expect(hint.length).toEqual(0);

    const option2 = canvas.getByLabelText("Euro");
    await userEvent.click(option2, { delay: 200 });
    hint = document.getElementsByClassName("v-messages");
    await expect(hint.length).toEqual(1);
  },
  args: {
    modelValue: { waluta: { value: "PLN", title: "Polski złoty" } },
    schema: {
      type: "object",
      properties: {
        waluta: {
          label: "Waluta",
          layout: {
            component: "radio-button",
          },
          source: {
            items: [
              { value: "PLN", title: "Polski złoty" },
              { value: "EUR", title: "Euro" },
            ],
            returnObject: true,
          },
        },
        section: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                kwotaNetto: {
                  label: "Kwota netto",
                  layout: {
                    component: "text-field",
                    props: {
                      "persistent-hint": "if(waluta.value!='PLN',true,false)",
                      hint: "Kwota netto PLN: {kwotaNettoPln:0}",
                    },
                  },
                },
              },
            },
          },
        },
      },
      required: [],
    } as Schema,
  },
};
