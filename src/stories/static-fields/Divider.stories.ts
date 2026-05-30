// @ts-nocheck
import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Static/Divider',
  ...formStoryWrapperTemplate,
};

export const Default: Story = {
  name: 'Default',
  play: playForm(async () => {}),
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
  name: 'Thickness',
  play: playForm(async () => {}),
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
  name: 'Color',
  play: playForm(async () => {}),
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
  name: 'Opacity',
  play: playForm(async () => {}),
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
