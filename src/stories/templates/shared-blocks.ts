import { VueSchemaForms } from "../../components";
import { mswLoader } from "msw-storybook-addon";

export const commonMetadata = {
  component: VueSchemaForms,
  tags: ["autodocs"],
  args: {
    modelValue: {},
    options: {
      fieldProps: {
        variant: "outlined",
        density: "comfortable",
      },
    },
  },
  loaders: [mswLoader],
};
