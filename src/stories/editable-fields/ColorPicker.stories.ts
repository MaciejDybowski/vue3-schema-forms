// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Editable/ColorPicker',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  name: 'Standard',
  play: playForm(async (context) => {}),
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
  name: 'Required',
  play: playForm(async (context) => {}),
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
  name: 'With Model',
  play: playForm(async (context) => {}),
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
  name: 'Read Only',
  play: playForm(async (context) => {}),
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
              readonly: true,
            },
          },
        },
      },
    } as Schema,
  },
};
