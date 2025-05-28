// @ts-nocheck
import { offsetSchema } from '@/stories/schemas';

import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Features/Layouts',
  ...formStoryWrapperTemplate,
};

/**
 * #### Arranging form fields using the "fill to end" function and offsets
 * `fillRow: boolean` - the space after the field is filled to the end of the row (completing to 12)
 *
 * `offset`: number - specifies the number of "empty" columns before the field that will be generated
 *
 * `cols: number | Cols` - specifies the column width in the grid system. It can be a number or an object that meets the structure of the `Cols` interface.
 */
export const Example1: Story = {
  name: "Example 1: cols as numbers",
  args: {
    schema: {
      type: 'object',
      properties: {
        item1: {
          label: 'Item 1',
          layout: {
            component: 'text-field',
            cols: 12,
          },
        },
        item2: {
          label: 'Item 2',
          layout: {
            component: 'text-field',
            cols: 6,
          },
        },
        item3: {
          label: 'Item 3',
          layout: {
            component: 'text-field',
            cols: 6,
          },
        },
      },
    },
  },
};

export const Example2: Story = {
  name: "Example 2: cols as object",
  args: {
    schema: {
      type: 'object',
      properties: {
        item1: {
          label: 'Item 1',
          layout: {
            component: 'text-field',
            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 4 },
          },
        },
        item2: {
          label: 'Item 2',
          layout: {
            component: 'text-field',
            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 4 },
          },
        },
        item3: {
          label: 'Item 3',
          layout: {
            component: 'text-field',
            cols: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 },
          },
        },
      },
    },
  },
};

export const Example3: Story = {
  name: "Example 3: fillRow property",
  args: {
    schema: {
      type: 'object',
      properties: {
        item1: {
          label: 'Item 1',
          layout: {
            component: 'text-field',
            cols: 4,
            fillRow: true
          },
        },
        item2: {
          label: 'Item 2',
          layout: {
            component: 'text-field',
            cols: 4,
            fillRow: true
          },
        },
        item3: {
          label: 'Item 3',
          layout: {
            component: 'text-field',
            cols: 4,
            fillRow: true
          },
        },
      },
    },
  },
};

export const Example4: Story = {
  name: "Example 4: offset property",
  args: {
    schema: {
      type: 'object',
      properties: {
        item1: {
          label: 'Item 1',
          layout: {
            component: 'text-field',
            cols: 12,
          },
        },
        item2: {
          label: 'Item 2',
          layout: {
            component: 'text-field',
            offset: 6,
            cols: 6,
          },
        },
        item3: {
          label: 'Item 3',
          layout: {
            component: 'text-field',
            cols: 6,
          },
        },
      },
    },
  },
};
