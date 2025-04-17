// @ts-nocheck
import { initialize } from "msw-storybook-addon";

import { formStoryWrapperTemplate } from "../templates/shared-blocks";
import { IMAGE_REQUEST } from "../mock-responses";

initialize();

export default {
  title: "Forms/Controls/Image",
  ...formStoryWrapperTemplate,
};

export const Standard = {
  args: {
    formModel: {},
    schema: {
      type: "object",
      properties: {
        span: {
          content: "Forms has ability for display images as a static content and passing `src` link",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        image: {
          src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
          layout: {
            component: "image",
            props: {
              "aspect-ratio": 1,
              width: "200",
              height: "200",
              cover: true,
            },
          },
        },
      },
    },
  },
};

export const WithParametersAndModel = {
  name: "Case: bind parameters and context",
  args: {
    formModel: {
      image: {
        id: "main",
        dataId: "1273-00",
        name: "1273-00.jpg",
        lastModifiedAt: null,
      },
    },
    schema: {
      type: "object",
      properties: {
        span: {
          content:
            "If you want to display picture of product or sth in your business you should pass model for image and prepare URL",
          layout: {
            component: "static-content",
            tag: "span",
          },
        },
        image: {
          src: "/mocks/{context.menuFeatureId}/images/{id}?Workspace-Id={context.workspaceId}&dataId={dataId}&width={width}&height={height}&lastModifiedAt=",
          layout: {
            component: "image",
            props: {
              "aspect-ratio": 1,
              width: "300",
              height: "295",
              cover: true,
            },
          },
        },
      },
    },
    options: {
      context: {
        workspaceId: "companyA",
        menuFeatureId: "products",
      },
    },
  },
  parameters: {
    msw: {
      handlers: [IMAGE_REQUEST],
    },
  },
};
