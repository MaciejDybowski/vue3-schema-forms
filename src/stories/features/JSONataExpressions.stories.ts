// @ts-nocheck
import { expect, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { waitForMountedAsync } from "../controls/utils";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";


export default {
  title: "Forms/Features/JSONata expressions",
  ...formStoryWrapperTemplate,
};

/*// nagle przestało wykrywać textArea w tescie
export const OnComponentSimpleField: Story = {
  play: async (context) => {
    await waitForMountedAsync()
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
    formModel: {},
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
            component: "nata(conditional=false ? 'text-area' : 'text-field')",
          },
        },
      },
      required: [],
    } as Schema,
  },
};

// nagle przestało wykrywać textArea w tescie
export const OnComponentIfInDuplicatedSection: Story = {
  play: async (context) => {
    await waitForMountedAsync()
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
    formModel: {},
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
                    component: "nata(conditional=false?'text-area':'text-field')",
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
};*/

export const OnPropsSimpleField: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    let hint = document.getElementsByClassName("v-messages");
    await expect(hint.length).toEqual(0);

    const option2 = canvas.getByLabelText("Euro");
    await userEvent.click(option2, { delay: 200 });
    hint = document.getElementsByClassName("v-messages");
    await expect(hint.length).toEqual(1);
  },
  args: {
    formModel: { waluta: { value: "PLN", title: "Polski złoty" } },
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
              "persistent-hint": "nata(waluta.value!='PLN' ? true : false)",
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
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    let hint = document.getElementsByClassName("v-messages");
    await expect(hint.length).toEqual(0);

    const option2 = canvas.getByLabelText("Euro");
    await userEvent.click(option2, { delay: 200 });
    hint = document.getElementsByClassName("v-messages");
    await expect(hint.length).toEqual(1);
  },
  args: {
    formModel: { waluta: { value: "PLN", title: "Polski złoty" } },
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
                      "persistent-hint": "nata(waluta.value!='PLN' ? true :false)",
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

export const UseJSONataFunctions: Story = {
  name: "JSONata function in action",
  args: {
    formModel: {
      pozycjeDokumentu: [
        {
          rodzajKosztu: { id: "213" },
          kwotaBrutto: 23.321,
        },
        {
          rodzajKosztu: { id: "212133" },
          kwotaBrutto: 100.321,
        },
      ],
    },
    schema: {
      properties: {
        pozycjeDokumentu: {
          layout: {
            component: "duplicated-section",
            schema: {
              properties: {
                rodzajKosztu: {
                  label: "Rodzaj kosztu",
                  type: "object",
                  valueMapping: "{pozycjeDokumentu[].rodzajKosztu.id}",
                  layout: {
                    component: "data-viewer",
                    cols: 6,
                  },
                },
                kwotaBrutto: {
                  label: "Kwota brutto",
                  type: "number",
                  precision: 3,
                  layout: {
                    component: "number-field",
                    cols: 6,
                  },
                },
              },
            },
          },
        },
        sklejenieRodzaj: {
          expression: 'JSONATA(pozycjeDokumentu.rodzajKosztu.id ~> $join(","))',
          label: "Próba sklejenie rodzaj expresion jsonNata",
          layout: {
            component: "text-field",
            cols: 6,
          },
        },
        sklejenieKwoty: {
          expression:
            'JSONATA(pozycjeDokumentu.kwotaBrutto ~> $map(function($v) { $replace("limitKosztowPln>" & $string($v), ".", ",")}) ~> $join(";"))',
          label: "Próba sklejenie kwoty expresion jsonNata",
          layout: {
            component: "text-field",
            cols: 6,
          },
        },
      },
    },
  },
};
