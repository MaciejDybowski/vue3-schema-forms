// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect } from "@storybook/test";
import { userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { EngineSourceField } from "../../types/engine/controls";
import { Schema } from "../../types/schema/Schema";
import { SimpleSource } from "../../types/schema/elements";
import { StoryTemplateWithValidation } from "../templates/story-template";
import { waitForMountedAsync } from "./utils";
import { commonMetadata, formStoryWrapperTemplate } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Controls/Select",
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText("Simple select");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({ select: 1 });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        select: {
          label: "Simple select",
          layout: {
            component: "select",
          },
          source: {
            items: [
              { value: 1, title: "Option 1" },
              { value: 2, title: "Option 2" },
              { value: 3, title: "Option 3" },
            ],
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};
/**
 * You can set the default value of field from schema
 */
export const WithDefault: Story = {
  name: "With default (value)",
  play: async (context) => {
    await expect(context.args.formModel).toEqual({ selectWithDefault: 3 });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        selectWithDefault: {
          label: "Simple select",
          layout: {
            component: "select",
          },
          defaultValue: 3,
          source: {
            items: [
              { value: 1, title: "Option 1" },
              { value: 2, title: "Option 2" },
              { value: 3, title: "Option 3" },
            ],
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMapping: Story = {
  name: "Custom mapping",
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText("Simple select");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({ selectCustomMapping: 1 });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        selectCustomMapping: {
          label: "Simple select",
          layout: {
            component: "select",
          },
          source: {
            items: [
              { id: 1, text: "Option 1" },
              { id: 2, text: "Option 2" },
              { id: 3, text: "Option 3" },
            ],
            value: "id",
            title: "text",
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMappingReturnObject: Story = {
  name: "Custom mapper + return obj",
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText("Simple select");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({ selectCustomMappingObject: { id: 1, text: "Option 1" } });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        selectCustomMappingObject: {
          label: "Simple select",
          layout: {
            component: "select",
          },
          source: {
            items: [
              { id: 1, text: "Option 1" },
              { id: 2, text: "Option 2" },
              { id: 3, text: "Option 3" },
            ],
            value: "id",
            title: "text",
            returnObject: true,
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMappingReturnObjectDefault: Story = {
  name: "Custom mapper + obj + default",
  play: async (context) => {
    await waitForMountedAsync()
    await expect(context.args.formModel).toEqual({
      selectCustomMappingObjectDefault: {
        id: 2,
        text: "Option 2",
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        selectCustomMappingObjectDefault: {
          label: "Simple select",
          layout: {
            component: "select",
          },
          defaultValue: { id: 2, text: "Option 2" },
          source: {
            items: [
              { id: 1, text: "Option 1" },
              { id: 2, text: "Option 2" },
              { id: 3, text: "Option 3" },
            ],
            value: "id",
            title: "text",
            returnObject: true,
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const GetOptionsFromAPI: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText("Simple select");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[0], { delay: 200 });

    await expect(context.args.formModel).toEqual({ selectOptionsFromAPI: { id: 1, label: "Option 1" } });
  },
  parameters: {
    mockData: [
      {
        url: "/api/v1/options",
        method: "GET",
        status: 200,
        response: [
          { id: 1, label: "Option 1" },
          { id: 2, label: "Option 2" },
          { id: 3, label: "Option 3" },
          { id: 4, label: "Option 4" },
        ],
      },
    ],
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        selectOptionsFromAPI: {
          label: "Simple select",
          layout: {
            component: "select",
            props: {
              inline: true,
            },
          },
          source: {
            url: "/api/v1/options",
            title: "label",
            value: "id",
            returnObject: true,
          } as SimpleSource,
        },
      },
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
export const SimpleValidation: Story = {
  name: "Select with required annotation",
  
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText("Simple select");
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    const items = document.getElementsByClassName("v-list-item");
    await userEvent.click(items[0], { delay: 200 });
    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText("Form is valid")).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        radioButtonRequired: {
          label: "Simple select",
          layout: {
            component: "select",
          },
          source: {
            items: [
              { value: 1, title: "Option 1" },
              { value: 2, title: "Option 2" },
              { value: 3, title: "Option 3" },
            ],
          },
        } as EngineSourceField,
      },
      required: ["radioButtonRequired"],
    } as Schema,
  },
};
