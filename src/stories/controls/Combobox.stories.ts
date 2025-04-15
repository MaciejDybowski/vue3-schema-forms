// @ts-nocheck
import { HttpResponse, http } from "msw";
import { initialize } from "msw-storybook-addon";

import { Schema } from "../../types/schema/Schema";
import { commonMetadata, formStoryWrapperTemplate } from "../templates/shared-blocks";

initialize();


export default {
  title: "Forms/Controls/Dictionary [combobox]",
  ...formStoryWrapperTemplate,
};

const MOCK_REQUEST = [
  http.get("/api/combo-mock", async (req, res, ctx) => {
    return HttpResponse.json({
      content: [
        {
          id: 27,
          label: "Test",
        },
      ],
    });
  }),
];

export const Standard: Story = {
  play: async (context) => {
    // const canvas = within(context.canvasElement);
    // const field = canvas.getByLabelText("Text area");
    // await userEvent.type(field, "This is standard text area...", { delay: 100 });
    // await expect(context.args.formModel).toEqual({ textArea: "This is standard text area..." });
  },
  args: {
    model: {
      textField: "Maciej",
    },
    schema: {
      type: "object",
      properties: {
        textField: {
          label: "Textfield",
          layout: {
            component: "text-field",
          },
        },
        combobox: {
          label: "Combobox",
          layout: {
            component: "combobox",
          },
          source: {
            url: "/api/combo-mock?query={textField}",
            title: "label",
            value: "id",
            lazy: true,
            returnObject: false,
            singleOptionAutoSelect: true,
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST,
    },
  },
};
