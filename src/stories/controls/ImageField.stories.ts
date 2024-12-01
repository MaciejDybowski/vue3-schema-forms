// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect } from "@storybook/test";
import { userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";



import { Schema } from "../../types/schema/Schema";
import { SchemaTextField } from "../../types/schema/elements";
import { StoryTemplateWithValidation } from "../templates/story-template";


const meta = {
  title: "Forms/Controls/Image",
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

export const Image = {
  args: {
    modelValue: {
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
