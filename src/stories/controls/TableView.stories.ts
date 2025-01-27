// @ts-nocheck
import { VueSchemaForms } from "@/components";
import { expect, userEvent, within } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3";

import { Schema } from "../../types/schema/Schema";

const meta = {
  title: "Forms/Controls/TableView",
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

type Story = StoryObj<typeof meta>;


const REQUEST_PAGE_0_1 = {
  url: "/mock-data/table-view-mock?page=0&size=20",
  method: "GET",
  status: 200,
  response: (request) => {
    const { body, searchParams } = request;
    if (searchParams.page === "0" && searchParams.size === "10") {
      return PAGE_0;
    }
    if (searchParams.page === "1" && searchParams.size === "10") {
      return PAGE_1;
    }
    return "no data";
  },
};

const PAGE_0 = {
  content: [
    {
      dataId: "AFN",
      name: "Afgani",
    },
    {
      dataId: "ALL",
      name: "Lek",
    },
  ],
};

const PAGE_1 = {
  content: [
    {
      dataId: "PLN",
      name: "Polski",
    },
    {
      dataId: "ANG",
      name: "Angielski",
    },
  ],
};

/**
 * Description here
 */
export const Standard: Story = {
  play: async (context) => {
  },
  args: {
    modelValue: {},
    schema: {
      type: "object",
      properties: {
        tableOfProducts: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/mock-data/table-view-mock",
            headers: [
              {
                title: "ID",
                key: "dataId",
                type: "TEXT",
              },
              {
                title: "Name",
                key: "name",
                type: "TEXT",
              },
            ],
          },
        },
      },
    } as Schema,
  },
  parameters: {
    mockData: [REQUEST_PAGE_0_1],
  },
};


