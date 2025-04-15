// @ts-nocheck
import { commonMetadata, formStoryWrapperTemplate } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";
initialize();

export default {
  title: "Forms/Controls/Image",
  ...formStoryWrapperTemplate,
};

export const Image = {
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
        image: {
          //src: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
          src: "/api/v1/features/{context.menuFeatureId}/images/{id}?Workspace-Id={context.workspaceId}&dataId={dataId}&width={width}&height={height}&lastModifiedAt=",
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
        workspaceId: "znicze",
        menuFeatureId: "product-details",
      },
    },
  },
};
