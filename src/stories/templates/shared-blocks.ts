import { VueSchemaForms } from "../../components";
import { mswLoader } from "msw-storybook-addon";
import FormStoryWrapper from "../../components/app/FormStoryWrapper.vue";

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


export const formStoryWrapperTemplate = {
  component: FormStoryWrapper,
  args: {
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: "outlined",
        density: "comfortable",
      },
    },
  },
  loaders: [mswLoader],
}