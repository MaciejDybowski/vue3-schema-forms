// @ts-nocheck
import { expect, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { Layout } from "../../types/schema/elements";
import { commonMetadata } from "../templates/shared-blocks";
import { waitForMountedAsync } from "./utils";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Static content",
  ...commonMetadata,
};

export const Examples: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        h1: {
          content: "h1 - Static form text content",
          layout: {
            component: "static-content",
            tag: "h1",
          } as Layout,
        },
        h2: {
          content: "h2- Static form text content",
          layout: {
            component: "static-content",
            tag: "h2",
          } as Layout,
        },
        h3: {
          content: "h3- Static form text content",
          layout: {
            component: "static-content",
            tag: "h3",
          } as Layout,
        },
        h4: {
          content: "h4 - Static form text content",
          layout: {
            component: "static-content",
            tag: "h4",
          } as Layout,
        },
        h5: {
          content: "h5 - Static form text content",
          layout: {
            component: "static-content",
            tag: "h5",
          } as Layout,
        },
        paragraph: {
          content: "p - Static form text content",
          layout: {
            component: "static-content",
            tag: "p",
          } as Layout,
        },
        span: {
          content: "span - Static form text content tag",
          layout: {
            component: "static-content",
            tag: "span",
          } as Layout,
        },
        longText: {
          content:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          layout: {
            component: "static-content",
            tag: "span",
          } as Layout,
        },
      },
    } as Schema,
  },
};

export const TextWithVariablesAndHTML: Story = {
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Hello Maciej Dybowski!")).toBeInTheDocument();
  },
  args: {
    modelValue: {
      data: {
        firstName: "Maciej",
        lastName: "Dybowski",
        datetime: "2025-03-25T12:37:34.12312",
      },
    },
    schema: {
      type: "object",
      properties: {
        h2: {
          content: "Hello {data.firstName} {data.lastName}!",
          layout: {
            component: "static-content",
            tag: "h2",
          } as Layout,
        },
        description: {
          content:
            "<b>{data.firstName}</b>, this span was generated as v-html content. And datetime = {data.datetime:-:DATETIME}",
          layout: {
            component: "static-content",
            tag: "span",
          } as Layout,
        },
      },
    } as Schema,
  },
};

export const GenerateVuetifyStaticComponent: Story = {
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Is difference between Value A = 123 and Value B = 321")).toBeInTheDocument();
  },
  args: {
    modelValue: {
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

export const DividerDefault: Story = {
  play: async () => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        divider: {
          layout: {
            component: "divider",
          },
        },
      },
    } as Schema,
  },
};

export const DividerThickness: Story = {
  play: async () => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        divider: {
          layout: {
            component: "divider",
          },
          thickness: 20,
        },
      },
    } as Schema,
  },
};

export const DividerColor: Story = {
  play: async () => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        divider: {
          layout: {
            component: "divider",
          },
          thickness: 5,
          color: "#B80D1AAD",
          opacity: "100",
        },
      },
    } as Schema,
  },
};

export const DividerOpacity: Story = {
  play: async () => {},
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        divider: {
          layout: {
            component: "divider",
          },
          opacity: "25",
        },
      },
    } as Schema,
  },
};
