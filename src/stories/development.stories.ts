// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';



import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';











































































export default {
  title: 'Development Area',
  component: FormStoryWrapper,
  args: {
    emittedObject: {},
    signals: {},
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
      buttonProps: {
        size: 'small',
        variant: 'elevated',
        rounded: '',
      },
    },
  },
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;

export const table1: Story = {
  args: {
    formModel: {
      switch:false,
      validationMessages: [
        {
          code: 'ERR001',
          message: 'This is an error message',
          severity: 'error',
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        switch: {
          label: 'Change it!',
          layout: {
            component: 'switch',
          },
        },
        validationMessages: {
          layout: {
            component: 'validation-messages-viewer',
            hide: `nata(switch=false)`,
            disableValidationWhenHidden: true,
            props: {
              variant: 'tonal',
            },
          },
        },
        textField: {
          label: 'Text field',
          layout: {
            component: 'text-field',
            hide: `nata(switch=false)`,
            disableValidationWhenHidden: true,
          },
        },
      },
      required: ['textField'],
    },
  },
};
