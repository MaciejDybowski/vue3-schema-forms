// @ts-nocheck
import { expect } from '@storybook/test';

import { waitForMountedAsync } from '../editable-fields/utils';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Features/Style integration (CSS)',
  ...formStoryWrapperTemplate,
};

export const Story1: Story = {
  name: 'Example 1: passing vuetify CSS classes into element',
  play: async (context) => {
    await waitForMountedAsync();
    const field = document.getElementsByClassName('text-h4');
    await expect(field[0]).toBeInTheDocument();
  },
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
