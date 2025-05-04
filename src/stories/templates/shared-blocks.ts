import { mswLoader } from "msw-storybook-addon";

import FormStoryWrapper from "../../../.storybook/components/FormStoryWrapper.vue";

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
  }
};