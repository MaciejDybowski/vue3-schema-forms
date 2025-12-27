// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';


export default {
  title: 'Elements/Editable/Bookmark',
  ...formStoryWrapperTemplate,
};

// TODO - napisać testy

const baseItems = [
  { value: 1, title: 'General Information' },
  { value: 2, title: 'Previous Year Crops' },
  { value: 3, title: 'Previous Year Contracts' },
  { value: 4, title: 'Estimated Production' },
  { value: 5, title: 'Deliveries' },
  { value: 6, title: 'Warehouse Status' },
  { value: 7, title: 'Losses & Damages' },
  { value: 8, title: 'Current Year Crops' },
  { value: 9, title: 'Current Year Contracts' },
  { value: 10, title: 'Additional Notes' },
  { value: 11, title: 'Letter' },
  { value: 12, title: 'Attachments' },
  { value: 13, title: 'Validation' },
];

const baseLayout = {
  component: 'bookmark',
  cols: 12,
};

const createSchema = (options = {}) =>
  ({
    type: 'object',
    properties: {
      bookmark: {
        layout: { ...baseLayout, ...options.layout },
        source: { items: options.items || baseItems },
        ...(options.props || {}),
      },
    },
  }) as Schema;

export const Standard: Story = {
  play: async () => {},
  args: {
    formModel: {},
    schema: createSchema(),
  },
};

export const PrependIcons: Story = {
  play: async () => {},
  args: {
    formModel: {},
    schema: createSchema({
      items: baseItems.map((item, i) => ({
        ...item,
        icon: [
          'mdi-cog',
          'mdi-leaf',
          'mdi-file-document',
          'mdi-factory',
          'mdi-truck',
          'mdi-warehouse',
          'mdi-trash-can',
          'mdi-sprout',
          'mdi-file-document-outline',
          'mdi-information',
          'mdi-email',
          'mdi-paperclip',
          'mdi-check-circle',
        ][i],
      })),
    }),
  },
};

export const BgColorAndColor: Story = {
  play: async () => {},
  args: {
    formModel: {},
    schema: createSchema({
      props: {
        'bg-color': '#f0f0f0',
        color: '#eeaadd',
      },
    }),
  },
};

export const Vertical: Story = {
  play: async () => {},
  args: {
    formModel: {},
    schema: createSchema({
      layout: {
        cols: 4,
      },
      props: {
        direction: 'vertical',
        'bg-color': '#f0f0f0',
      },
    }),
  },
};

export const ValidationInHiddenParts = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 100 });
    await expect(
      canvas.getByText('The number provided is incorrect. (Ex: 421 321 621)'),
    ).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        bookmarks: {
          layout: {
            component: 'bookmark',
          },
          source: {
            items: [
              { value: 1, title: 'General Information' },
              { value: 2, title: 'Previous Year Crops' },
              { value: 3, title: 'Previous Year Contracts' },
            ],
          },
        },
        fieldGroupA: {
          layout: {
            hide: 'nata($not(bookmarks=1))',
            component: 'fields-group',
            schema: {
              properties: {
                fieldGroupAOne: {
                  label: 'Field Group A -1',
                  layout: {
                    component: 'text-field',
                  },
                },
                fieldGroupATwo: {
                  label: 'Field Group A -2',
                  layout: {
                    component: 'text-field',
                  },
                },
              },
            },
          },
        },
        fieldGroupB: {
          layout: {
            hide: 'nata($not(bookmarks=2))',
            component: 'fields-group',
            schema: {
              properties: {
                fieldGroupBOne: {
                  label: 'Field Group B -1',
                  layout: {
                    component: 'text-field',
                  },
                },
                fieldGroupBTwo: {
                  label: 'Field Group B -2',
                  layout: {
                    component: 'text-field',
                  },
                },
              },
            },
          },
        },
        fieldGroupC: {
          layout: {
            hide: 'nata($not(bookmarks=3))',
            component: 'fields-group',
            schema: {
              properties: {
                phoneInput: {
                  defaultValue: '5103332021',
                  label: 'Phone Input',
                  layout: {
                    component: 'phone',
                  },
                },
                fieldGroupCOne: {
                  label: 'Field Group C -1',
                  layout: {
                    component: 'text-field',
                  },
                },
                fieldGroupCTwo: {
                  label: 'Field Group C -2',
                  layout: {
                    component: 'text-field',
                  },
                },
              },
              required: ['fieldGroupCOne', 'fieldGroupCTwo'],
            },
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [],
    },
  },
};
