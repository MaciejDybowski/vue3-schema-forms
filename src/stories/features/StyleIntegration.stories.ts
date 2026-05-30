// @ts-nocheck
import { expect } from 'storybook/test';

import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Features/Styling/CSS Integration',
  ...formStoryWrapperTemplate,
};

export const Story1: Story = {
  name: 'Example 1 - Passing Vuetify CSS Classes into Element',
  play: playForm(async (context) => {
    const field = document.getElementsByClassName('text-h4');
    await expect(field[0]).toBeInTheDocument();
  }),
  args: {
    schema: {
      type: 'object',
      properties: {
        span: {
          content: 'Custom class was passed in',
          layout: {
            component: 'static-content',
            tag: 'span',
            class: 'text-subtitle-4 text-h4',
          },
        },
        textField: {
          label: 'Text',
          layout: {
            component: 'text-field',
          },
        },
      },
    },
  },
};
