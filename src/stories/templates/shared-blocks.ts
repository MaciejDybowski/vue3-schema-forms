import FormStoryWrapper from '../../../.storybook/components/FormStoryWrapper.vue';

export const formStoryWrapperTemplate = {
  component: FormStoryWrapper,
  args: {
    signals: {
      formIsReady: false
    },
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
    },
  },
  parameters: {
    /*docs: {
      story: { autoplay: true },
    },*/
  }
};
