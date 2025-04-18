// @ts-nocheck
import { offsetSchema } from "@/stories/schemas";

import { formStoryWrapperTemplate } from "../templates/shared-blocks";

import { initialize } from "msw-storybook-addon";


export default {
  title: "Forms/Features/Layouts",
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
export const FillRowAndOffsets: Story = {
  args: {
    schema: offsetSchema,
  },
};

export const FillRow: Story = {
  args: {
    schema: {
      type: "object",
      properties: {
        item1: {
          label: "Item 1",
          layout: {
            component: "text-field",
            cols: 3,
          },
        },
        item4: {
          label: "Item 4",
          layout: {
            component: "text-field",
            cols: 12,
          },
        },
        item5: {
          label: "Item 5",
          layout: {
            component: "text-field",
            cols: 3,
          },
        },
        item6: {
          label: "Item 6",
          layout: {
            component: "text-field",
            cols: 3,
            fillRow: true,
          },
        },
        item2: {
          label: "Item 2",
          layout: {
            component: "text-field",
            cols: 3,
          },
        },
        item3: {
          label: "Item 3",
          layout: {
            component: "text-field",
            cols: 1,
          },
        },
      },
    },
  },
};
