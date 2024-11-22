// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect, userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { StoryTemplateWithValidation } from "../templates/story-template";

const meta = {
  title: "Forms/Features/On change events",
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

type Story = StoryObj<typeof meta>;

export const CallActionWithParametersAndRequestBody: Story = {
  render: StoryTemplateWithValidation,
  play: async (context) => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        description: {
          content:
            "Definicja zdarzenia `onChange`, które wywoła akcję o podanym kodzie. Dodatkowo możemy dodać parametry żądania http oraz mapowanie body, które zostanie wysłane na endpoint akcji. Formularz wystawia funkcję callback() w obiekcie wysłanym do Hosta. Po wywołaniu tej funkcji formularz odświeża model danych tak aby być reaktywnym na zmiany z aplikacji trzeciej",
          layout: {
            component: "static-content",
            tag: "p",
          },
        },
        actionOnChange: {
          label: "Action on change value",
          layout: {
            component: "text-field",
          },
          onChange: {
            mode: "action",
            code: "callScript",
            params: {
              scriptName: "sprawdz_czy_duplikat",
            },
            body: {
              nip: "{daneDostawcy.nip}",
              numerFaktury: "{faktura.nrFaktury}",
            },
          },
        },
      },
    },
  },
};

export const ResetValueOnChange: Story = {
  render: StoryTemplateWithValidation,
  play: async (context) => {
    const canvas = within(context.canvasElement);

    let textField = canvas.getByLabelText("Field A");
    await userEvent.type(textField, "Changed", {
      delay: 100,
    });
    await new Promise((r) => setTimeout(r, 1000));
    await expect(context.args.modelValue).toEqual({ fieldA: "Changed", fieldB: null });
  },
  args: {
    modelValue: {
      fieldB: "Maciej",
    },
    schema: {
      type: "object",
      properties: {
        fieldA: {
          label: "Field A",
          layout: {
            component: "text-field",
          },
          onChange: {
            mode: "change-model",
            variables: [
              {
                path: "fieldB",
                value: null,
              },
            ],
          },
        },
        fieldB: {
          label: "Field B",
          layout: {
            component: "text-field",
          },
        },
      },
      required: [],
    },
  },
};
