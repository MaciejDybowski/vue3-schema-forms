// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';











export default {
  title: 'Elements/Editable/Bookmarks ✅',
  ...formStoryWrapperTemplate,
};

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
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    baseItems.forEach((item) => {
      expect(canvas.getByText(item.title)).toBeInTheDocument();
    });
  },
  args: {
    formModel: {},
    schema: createSchema(),
  },
};

export const PrependIcons: Story = {
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const expectedIcons = [
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
    ];
    expectedIcons.forEach((icon, index) => {
      const tabElement = canvas.getByTestId(`bookmark-icon-${index}`);
      const iconElement = tabElement.querySelector('.v-icon');
      expect(iconElement).toBeInTheDocument();
      expect(iconElement).toHaveClass(icon);
    });
  },
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
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });

    const canvas = within(context.canvasElement);

    // 1. tło v-tabs – jak masz już zrobione
    const tablist = canvas.getByRole('tablist');
    expect(tablist).toHaveStyle({ backgroundColor: 'rgb(240, 240, 240)' });

    // 2. kolor tekstu na pierwszym tabu (wewnątrz v-slide-group__content)
    const [firstTab] = canvas.getAllByRole('tab');
    expect(firstTab).toBeInTheDocument();
    expect(firstTab).toHaveStyle({ color: 'rgb(238, 170, 221)' });
  },
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
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const bookmark = canvas.getByTestId('bookmarks');
    expect(bookmark).toHaveClass('v-tabs--vertical');
  },
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
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 100 });
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
