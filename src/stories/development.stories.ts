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
        density: 'compact'
      },
      buttonProps: {
        size: 'small',
        variant: 'elevated',
        rounded: ''
      }
    }
  }
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;


export const TableOne: Story = {
  args: {
    formModel: {},
    schema: {
      'type': 'object',
      'properties': {
        'expansionPanels518': {
          'layout': {
            'component': 'expansion-panels',
            'props': { 'readonly': true }
          },
          'panels': [{
            'title': 'Tytuł sekcji',
            'titleIcon': 'mdi-home',
            'titleIconSize': 20,
            'schema': {
              'properties': {
                'textField937': {
                  'label': 'Item-textField937',
                  'layout': {
                    'cols': { 'xs': 12, 'sm': 6, 'md': 6, 'lg': 4, 'xl': 4, 'xxl': 4 },
                    'fillRow': true,
                    'component': 'text-field'
                  }
                }
              }
            }
          }]
        }
      }
    }
  }
};

