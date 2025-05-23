// @ts-nocheck
import { expect, userEvent, within } from '@storybook/test';

import { Schema } from '../../types/schema/Schema';
import { SchemaTextField } from '../../types/schema/elements';
import { waitForMountedAsync } from '../editable-fields/utils';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Features/Conditional Rendering/Hidden fields',
  ...formStoryWrapperTemplate,
};

export const Default: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field1 = canvas.getByLabelText('Visible field');
    const field2 = canvas.getByLabelText('Visible field 2');
    const hideField = canvas.getByLabelText('Hide field');

    await userEvent.type(field1, '3', { delay: 100 });
    await userEvent.type(field2, '3', { delay: 300 });

    await expect(hideField.checkVisibility()).toEqual(false);
    await expect(context.args.formModel).toEqual({
      field1: 3,
      field2: 3,
      field3: 6,
    });
  },
  args: {
    formModel: {},
    schema: {
      properties: {
        span: {
          content:
            'A hidden field is invisible but rendered, this means that dependencies / functions / calculations will be executed',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        field1: {
          label: 'Visible field',
          layout: { component: 'number-field', cols: 3 },
        },
        field2: {
          label: 'Visible field 2',
          layout: { component: 'number-field', cols: 3 },
        },
        field3: {
          label: 'Hide field',
          layout: { component: 'number-field', cols: 3, hide: true },
          calculation: 'field1 + field2',
        } as SchemaTextField,
        field4: {
          label: 'Visible field 3',
          layout: { component: 'number-field', cols: 3 },
        },
      },
    } as Schema,
  },
};
