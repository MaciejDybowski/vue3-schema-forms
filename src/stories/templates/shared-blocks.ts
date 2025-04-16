import { mswLoader } from "msw-storybook-addon";

import FormStoryWrapper from "../../components/app/FormStoryWrapper.vue";

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
  }
};


export const formStoryWrapperTemplateWithMSW = {
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
};