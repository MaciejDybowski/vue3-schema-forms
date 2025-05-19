// @ts-nocheck
import { Meta, StoryObj } from "@storybook/vue3";
import MultipleFormStoryWrapper from "../../../.storybook/components/MultipleFormStoryWrapper.vue";

export default {
  title: "Features/Multi-Form",
  component: MultipleFormStoryWrapper,
  args: {
    formModelOne: {},
    schemaOne: {},
    formModelTwo: {},
    schemaOneTwo: {},
    options: {
      fieldProps: {
        variant: "outlined",
        density: "compact",
      },
    },
  },
} satisfies Meta<typeof MultipleFormStoryWrapper>;

type Story = StoryObj<typeof MultipleFormStoryWrapper>;

export const MultiForms: Story = {
  args: {
    formModelOne: {},
    schemaOne: {
      type: "object",
      properties: {
        fieldA: {
          label: "Field A",
          layout: {
            component: "text-field"
          }
        },
        fieldB: {
          label: "Field {fieldA} with extra",
          layout: {
            component: "text-field"
          }
        }
      }
    },
    formModelTwo: {},
    schemaTwo: {
      type: "object",
      properties: {
        fieldA: {
          label: "Field A",
          layout: {
            component: "text-field"
          }
        },
        fieldB: {
          label: "Field {fieldA} with extra",
          layout: {
            component: "text-field"
          }
        }
      }
    },
  },
};

