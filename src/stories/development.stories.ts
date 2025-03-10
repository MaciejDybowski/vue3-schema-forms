// @ts-nocheck
import { ArgTypes } from "@storybook/types";
import { Meta, StoryObj } from "@storybook/vue3";

import DevelopmentTable from "../components/app/DevelopmentTable.vue";
import { OFFER_ITEMS_MOCK, RELATIONSHIP_RESPONSE } from "./responses";

const meta = {
  title: "Development Page",
  component: DevelopmentTable,
  argTypes: {
    schema: { control: "object", description: "Schema u" },
    model: { control: "object", description: "Model" },
    options: { control: "object", description: "Opcje" },
  } as Partial<ArgTypes<any>>,
  args: {
    options: {
      fieldProps: {
        variant: "outlined",
        density: "comfortable",
      },
    },
    model: {},
  },
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ForteStart: Story = {
  args: {
    model: {},
    schema: {},
  },
};

export const Forte: Story = {
  args: {
    model: {
      offer: {
        id: "maciek-offer",
      },
    },
    schema: {},
  },
  parameters: {
    mockData: [OFFER_ITEMS_MOCK],
  },
};

export const Table1: Story = {
  parameters: {
    mockData: [RELATIONSHIP_RESPONSE],
  },
  args: {
    model: {
      dataId: 1,
    },
    schema: {
      type: "object",
      properties: {
        partners: {
          layout: {
            component: "table-view",
          },
          source: {
            data: "/api/v1/customers/{dataId}/relationships",
            headers: [
              {
                title: "Number",
                key: "number",
                type: "TEXT",
                valueMapping: "{partner.number}",
              },
              {
                title: "Name",
                key: "name",
                type: "TEXT",
                valueMapping: "{partner.name}",
              },
              {
                title: "Function",
                key: "function.name",
                type: "TEXT",
                valueMapping: "{function.name}",
              },
            ],
          },
          actions: {
            "partner.name": "redirectToCustomerDetails",
            "partner.number": "redirectToCustomerDetails",
          },
        },
      },
      required: [],
    },
  },
};
