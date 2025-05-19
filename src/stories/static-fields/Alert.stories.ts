// @ts-nocheck
import { expect, userEvent, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { Layout } from "../../types/schema/elements";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";
import { waitForMountedAsync } from "../editable-fields/utils";

export default {
  title: "Elements/Static/Alert",
  ...formStoryWrapperTemplate,
};


export const Default: Story = {
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Lorem ipsum...")).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        alert: {
          content: "Lorem ipsum...",
          layout: {
            component: "static-content",
            tag: "v-alert",
            props: {
              variant: "outlined",
            },
          },
        },
      } as any,
    },
  },
};

export const Info: Story = {
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Lorem ipsum...")).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        alert: {
          content: "Lorem ipsum...",
          layout: {
            component: "static-content",
            tag: "v-alert",
            props: {
              type: "info",
              variant: "outlined",
            },
          },
        },
      } as any,
    },
  },
};

export const Warning: Story = {
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Lorem ipsum...")).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        alert: {
          content: "Lorem ipsum...",
          layout: {
            component: "static-content",
            tag: "v-alert",
            props: {
              type: "warning",
              variant: "outlined",
            },
          },
        },
      } as any,
    },
  },
};

export const Error: Story = {
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Lorem ipsum...")).toBeInTheDocument();
    const Submit = canvas.getByText("Validate");
    await userEvent.click(Submit);
    await expect(canvas.getByText("Alert")).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        alert: {
          content: "Lorem ipsum...",
          layout: {
            component: "static-content",
            tag: "v-alert",
            props: {
              type: "error",
              variant: "outlined",
            },
          },
        },
      } as any,
    },
  },
};

export const CombineWithModelVariables: Story = {
  name: "Case: combine with model variables",
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Is difference between Value A = 123 and Value B = 321")).toBeInTheDocument();
  },
  args: {
    formModel: {
      valueA: "123",
      valueB: "321",
    },
    schema: {
      type: "object",
      properties: {
        alert: {
          content: "Is difference between Value A = {valueA} and Value B = {valueB}",
          layout: {
            component: "static-content",
            tag: "v-alert",
            props: {
              type: "warning",
              variant: "outlined",
            },
          },
        },
      } as any,
    },
  },
};