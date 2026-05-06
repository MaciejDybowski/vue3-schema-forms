// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';

export default {
  title: 'Elements/Editable/ColorPicker',
  ...formStoryWrapperTemplate,
};



export const Standard: Story = {
  play: async (context) => {

  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        colorPrimary: {
          label: 'Color',
          layout: {
            component: 'color-picker',
          },
        },
      },
    } as Schema,
  },
};

export const Required: Story = {
  play: async (context) => {

  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        colorPrimary: {
          label: 'Color',
          layout: {
            component: 'color-picker',
          },
        },
      },
      required: ['colorPrimary'],
    } as Schema,
  },
};

export const WithModel: Story = {
  play: async (context) => {

  },
  args: {
    formModel: {
      colorPrimary: '#00FF00',
    },
    schema: {
      type: 'object',
      properties: {
        colorPrimary: {
          label: 'Color',
          layout: {
            component: 'color-picker',
          },
        },
      },
      required: ['colorPrimary'],
    } as Schema,
  },
};

export const Readonly: Story = {
  play: async (context) => {

  },
  args: {
    formModel: {
      colorPrimary: '#FF5733',
    },
    schema: {
      type: 'object',
      properties: {
        colorPrimary: {
          label: 'Color (Readonly)',
          layout: {
            component: 'color-picker',
            props: {
              readonly: true
            }
          },
        },
      },
    } as Schema,
  },
};

