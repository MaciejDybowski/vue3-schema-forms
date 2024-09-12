// @ts-nocheck
import { ArgTypes } from "@storybook/types";
import { Meta, StoryObj } from "@storybook/vue3";

import DevelopmentTable from "../components/app/DevelopmentTable.vue";

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

export const Table1: Story = {
  args: {
    model: {},
    schema: {
      type: "object",
      properties: {
        dostawca: {
          label: "Wybierz dostawcę",
          layout: { component: "select" },
          source: {
            items: [
              { id: 1, label: "Option 1" },
              { id: 2, label: "Option 2" },
              { id: 3, lbel: "Option 3" },
            ],
            title: "label",
            value: "id",
            returnObject: true,
          },
        },
        kod: {
          label: "Kod dostawcy",
          layout: { component: "data-viewer", if: "dostawcaRejestr" },
          valueMapping: "{dostawca.id}",
          type: "text",
        },
        nazwa: {
          label: "Nazwa dostawcy",
          layout: {
            component: "data-viewer",
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 },
            if: "dostawca",
          },
          valueMapping: "{dostawca.label}",
          type: "text",
        },
        nip: {
          label: "NIP",
          layout: {
            component: "data-viewer",
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 },
            if: "dostawca",
          },
          valueMapping: "{dostawca.id}",
          type: "text",
        },
      },
    },
  },
};

export const Table2: Story = {
  args: {
    model: {
      faktura: {
        waluta: {
          id: "USD",
        },
      },
      sumy: {
        kwotaNettoPln: 23,
      },
    },
    schema: {
      type: "object",
      properties: {
        kwotaNetto: {
          label: "Kwota netto",
          layout: {
            cols: {
              xs: 12,
              sm: 12,
              md: 12,
              lg: 12,
              xl: 4,
              xxl: 4,
            },
            component: "number-field",
            props: {
              hint: "Kwota netto PLN: {sumy.kwotaNettoPln}",
              "persistent-hint": 'if(faktura.waluta.id!="PLN",true,false)',
              readonly: true,
            },
          },
          type: "float",
          calculation: "SUM(kwotaNetto,pozycjeDokumentu)",
        },
      },
    },
  },
};
