// @ts-nocheck
import { HttpResponse, http } from 'msw';
import { Story } from 'storybook/dist/csf';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Editable/SingleOrMultiChoiceDictionary',
  ...formStoryWrapperTemplate,
};

const SMALL_OPTIONS = [
  { id: 'AFN', label: 'Afgani' },
  { id: 'ALL', label: 'Lek' },
  { id: 'AMD', label: 'Dram' },
  { id: 'AOA', label: 'Kwanza' },
  { id: 'ARS', label: 'Peso argentyńskie' },
  { id: 'AUD', label: 'Dolar australijski' },
];

const LARGE_OPTIONS = Array.from({ length: 150 }, (_, index) => ({
  id: `ID-${index + 1}`,
  label: `Option ${index + 1}`,
}));

let lastRequestedSize = 0;

const SMALL_DICTIONARY_HANDLER = [
  http.get('/mocks/choice-dictionary-small', async ({ request }) => {
    const url = new URL(request.url);
    const size = Number(url.searchParams.get('size') ?? '10');
    lastRequestedSize = size;

    return HttpResponse.json({
      content: SMALL_OPTIONS.slice(0, size),
      numberOfElements: SMALL_OPTIONS.length,
      first: true,
      last: true,
      number: 0,
      size,
    });
  }),
];

const LARGE_DICTIONARY_HANDLER = [
  http.get('/mocks/choice-dictionary-large', async ({ request }) => {
    const url = new URL(request.url);
    const size = Number(url.searchParams.get('size') ?? '10');
    lastRequestedSize = size;

    return HttpResponse.json({
      content: LARGE_OPTIONS.slice(0, size),
      numberOfElements: LARGE_OPTIONS.length,
      first: true,
      last: false,
      number: 0,
      size,
    });
  }),
];

function buildSchema({
  multiple = false,
  returnObject = false,
  choiceOptionsLimit,
  url = '/mocks/choice-dictionary-small',
}: {
  multiple?: boolean;
  returnObject?: boolean;
  choiceOptionsLimit?: number;
  url?: string;
} = {}) {
  return {
    type: 'object',
    properties: {
      currency: {
        label: 'Currency',
        layout: {
          component: 'single-or-multi-choice-dictionary',
        },
        source: {
          url,
          title: 'label',
          value: 'id',
          multiple,
          returnObject,
          choiceOptionsLimit,
        },
      },
    },
  };
}

export const SingleValueReturnPrimitive: Story = {
  name: 'Single + Return Object = False',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    const option = await canvas.findByLabelText('Lek');
    await userEvent.click(option, { delay: 100 });

    await expect(context.args.formModel).toEqual({
      currency: 'ALL',
    });
  }),
  args: {
    formModel: {},
    schema: buildSchema({
      multiple: false,
      returnObject: false,
    }),
  },
  parameters: {
    msw: {
      handlers: SMALL_DICTIONARY_HANDLER,
    },
  },
};

export const SingleValueReturnObject: Story = {
  name: 'Single + Return Object = True',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    const option = await canvas.findByLabelText('Dram');
    await userEvent.click(option, { delay: 100 });

    await expect(context.args.formModel).toEqual({
      currency: {
        id: 'AMD',
        label: 'Dram',
      },
    });
  }),
  args: {
    formModel: {},
    schema: buildSchema({
      multiple: false,
      returnObject: true,
    }),
  },
  parameters: {
    msw: {
      handlers: SMALL_DICTIONARY_HANDLER,
    },
  },
};

export const MultiValueReturnPrimitive: Story = {
  name: 'Multi + Return Object = False',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    await userEvent.click(await canvas.findByLabelText('Afgani'), { delay: 100 });
    await userEvent.click(await canvas.findByLabelText('Kwanza'), { delay: 100 });

    await expect(context.args.formModel).toEqual({
      currency: ['AFN', 'AOA'],
    });
  }),
  args: {
    formModel: {},
    schema: buildSchema({
      multiple: true,
      returnObject: false,
    }),
  },
  parameters: {
    msw: {
      handlers: SMALL_DICTIONARY_HANDLER,
    },
  },
};

export const MultiValueReturnObject: Story = {
  name: 'Multi + Return Object = True',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    await userEvent.click(await canvas.findByLabelText('Afgani'), { delay: 100 });
    await userEvent.click(await canvas.findByLabelText('Dolar australijski'), { delay: 100 });

    await expect(context.args.formModel).toEqual({
      currency: [
        { id: 'AFN', label: 'Afgani' },
        { id: 'AUD', label: 'Dolar australijski' },
      ],
    });
  }),
  args: {
    formModel: {},
    schema: buildSchema({
      multiple: true,
      returnObject: true,
    }),
  },
  parameters: {
    msw: {
      handlers: SMALL_DICTIONARY_HANDLER,
    },
  },
};

export const LimitAndOverflowWarning: Story = {
  name: 'Limit Override + Overflow Warning',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    await waitFor(() => {
      expect(lastRequestedSize).toBe(25);
    });

    await expect(context.canvasElement).toHaveTextContent(
      /Dictionary returned more options than limit \(25\)\.\s*Narrow the source or use\s*autocomplete\/combobox\./,
    );
  }),
  args: {
    formModel: {},
    schema: buildSchema({
      multiple: true,
      returnObject: false,
      choiceOptionsLimit: 25,
      url: '/mocks/choice-dictionary-large',
    }),
  },
  parameters: {
    msw: {
      handlers: LARGE_DICTIONARY_HANDLER,
    },
  },
};

export const LimitCapAt100: Story = {
  name: 'Limit Cap = 100',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    await waitFor(() => {
      expect(lastRequestedSize).toBe(100);
    });

    const options = canvas.getAllByRole('checkbox');
    await expect(options.length).toBe(100);
  }),
  args: {
    formModel: {},
    schema: buildSchema({
      multiple: true,
      returnObject: false,
      choiceOptionsLimit: 999,
      url: '/mocks/choice-dictionary-large',
    }),
  },
  parameters: {
    msw: {
      handlers: LARGE_DICTIONARY_HANDLER,
    },
  },
};
