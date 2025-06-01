// @ts-nocheck
import { Story } from 'storybook/dist/csf';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { MULTI_ORDERED_SELECT_MOCK } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';





export default {
  title: 'Elements/Editable/OrderedMultiSelect',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await userEvent.click(items[2], { delay: 200 });
    await userEvent.click(items[4], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      orderedMultiSelect: [
        {
          id: 1,
          label: 'Poland',
        },
        {
          id: 3,
          label: 'France',
        },
        {
          id: 5,
          label: 'Spain',
        },
      ],
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        orderedMultiSelect: {
          label: 'Choose countries',
          variant: 'list',
          layout: {
            cols: 12,
            component: 'ordered-multi-select',
          },
          source: {
            url: '/mocks/multi-ordered-items',
            title: 'label',
            value: 'id',
          },
        },
      },
      i18n: {},
    },
  },
  parameters: {
    msw: {
      handlers: MULTI_ORDERED_SELECT_MOCK,
    },
  },
};

export const Required: Story = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await userEvent.click(items[2], { delay: 200 });
    await userEvent.click(items[4], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      orderedMultiSelect: [
        {
          id: 1,
          label: 'Poland',
        },
        {
          id: 3,
          label: 'France',
        },
        {
          id: 5,
          label: 'Spain',
        },
      ],
    });
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 400 });

    await expect(canvas.getByText('Custom message')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        orderedMultiSelect: {
          label: 'Wybierz elementy do generowania exclea',
          variant: 'list',
          layout: {
            cols: 12,
            component: 'ordered-multi-select',
          },
          source: {
            url: '/mocks/multi-ordered-items',
            title: 'label',
            value: 'id',
          },
        },
      },
      required: ['orderedMultiSelect'],
      i18n: {},
    },
  },
  parameters: {
    msw: {
      handlers: MULTI_ORDERED_SELECT_MOCK,
    },
  },
};

export const Variant: Story = {
  name: 'Case: input variant',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    const item = canvas.getByLabelText('Choose countries');
    await userEvent.click(item, { delay: 200 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await userEvent.click(items[2], { delay: 200 });
    await userEvent.click(items[4], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      orderedMultiSelect: [
        {
          id: 1,
          label: 'Poland',
        },
        {
          id: 3,
          label: 'France',
        },
        {
          id: 5,
          label: 'Spain',
        },
      ],
    });
  },
  args: {
    model: {
      orderedMultiSelect: null,
    },
    schema: {
      type: 'object',
      properties: {
        orderedMultiSelect: {
          label: 'Choose countries',
          variant: 'combobox',
          layout: {
            cols: 12,
            component: 'ordered-multi-select',
          },
          source: {
            url: '/mocks/multi-ordered-items',
            title: 'label',
            value: 'id',
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: MULTI_ORDERED_SELECT_MOCK,
    },
  },
};
