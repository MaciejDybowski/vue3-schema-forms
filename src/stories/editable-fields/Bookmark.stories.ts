// @ts-nocheck
import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Editable/Bookmark',
  ...formStoryWrapperTemplate,
};

// ---------- Shared Data ----------

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
  } as Schema);


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
