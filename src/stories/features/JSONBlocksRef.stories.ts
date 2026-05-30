// @ts-nocheck
import { HttpResponse, http } from 'msw';
import { expect, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Features/Data Binding/JSON Blocks ($ref)',
  ...formStoryWrapperTemplate,
};

const JSON_SCHEMA_BLOCK = [
  http.get('/json-mock/forte-table-offer-standard', async (req, res, ctx) => {
    return HttpResponse.json({
      label: 'Input fetched from API static.json',
      layout: { component: 'text-field' },
    });
  }),
];

export const SchemaWithReference: Story = {
  name: 'Example 1 - Fetch Part of Schema from API',
  play: playForm(async (context) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Input fetched from API static.json');
    await expect(field).toBeInTheDocument();
  }),
  args: {
    formModel: {},
    schema: {
      properties: {
        span: {
          content: 'It is possible to combine schema from many smaller parts by using $ref',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        fieldA: {
          label: 'Field A',
          layout: {
            component: 'text-field',
          },
        },
        fieldB: {
          label: 'Field B',
          layout: {
            component: 'text-field',
          },
        },
        fieldC: { $ref: '../json-mock/forte-table-offer-standard' },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: [...JSON_SCHEMA_BLOCK],
    },
  },
};
