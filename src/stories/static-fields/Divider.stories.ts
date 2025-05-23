// @ts-nocheck
import { expect, within } from '@storybook/test';

import { Schema } from '../../types/schema/Schema';
import { Layout } from '../../types/schema/elements';
import { waitForMountedAsync } from '../editable-fields/utils';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Static/Divider',
  ...formStoryWrapperTemplate,
};

export const Default: Story = {
  play: async () => {},
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        divider: {
          layout: {
            component: 'divider',
          },
        },
      },
    } as Schema,
  },
};

export const Thickness: Story = {
  play: async () => {},
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        divider: {
          layout: {
            component: 'divider',
          },
          thickness: 20,
        },
      },
    } as Schema,
  },
};

export const Color: Story = {
  play: async () => {},
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        divider: {
          layout: {
            component: 'divider',
          },
          thickness: 5,
          color: '#B80D1AAD',
          opacity: '100',
        },
      },
    } as Schema,
  },
};

export const Opacity: Story = {
  play: async () => {},
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        divider: {
          layout: {
            component: 'divider',
          },
          opacity: '25',
        },
      },
    } as Schema,
  },
};
