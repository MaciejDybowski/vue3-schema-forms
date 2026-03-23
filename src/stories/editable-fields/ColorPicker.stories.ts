// @ts-nocheck
import { within } from 'storybook/test';
import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';


export default {
  title: 'Elements/Editable/ColorPicker',
  ...formStoryWrapperTemplate
};

export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        colorPrimary: {
          label: 'Color',
          layout: {
            component: 'color-picker'
          }
        }
      }
    } as Schema
  }
};



