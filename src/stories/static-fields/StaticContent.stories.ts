// @ts-nocheck
import { expect, within } from "@storybook/test";

import { Schema } from "../../types/schema/Schema";
import { Layout } from "../../types/schema/elements";
import { formStoryWrapperTemplate } from "../templates/shared-blocks";
import { waitForMountedAsync } from "../editable-fields/utils";

export default {
  title: "Elements/Static/Paragraphs And Headings",
  ...formStoryWrapperTemplate,
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
  name:"Case: combine text with variables and HTML elements",
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Hello Karol Kowalski!")).toBeInTheDocument();
  },
  args: {
    formModel: {
      data: {
        firstName: "Karol",
        lastName: "Kowalski",
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

export const JsonataInText: Story = {
  name:"Case: JSONata function",
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const span = canvasElement.querySelector('span div');
    await expect(span).toBeInTheDocument();
    await expect(span.textContent).toContain('Kowalski');
  },
  args: {
    formModel: {
      data: {
        lastName: "Kowalski",
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
            "<b>{nata(data.firstName ? data.firstName : data.lastName)}</b>, this span was generated as v-html content. And datetime = {data.datetime:-:DATETIME}",
          layout: {
            component: "static-content",
            tag: "span",
          } as Layout,
        },
      },
    } as Schema,
  },
};

