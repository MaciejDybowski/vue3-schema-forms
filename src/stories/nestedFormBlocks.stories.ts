// @ts-nocheck
import { HttpResponse, http } from 'msw';
import { expect, userEvent, within } from 'storybook/test';

import { formStoryWrapperTemplate, playForm } from './templates/shared-blocks';

export default {
  title: 'Examples/Nested Forms',
  ...formStoryWrapperTemplate,
};

const options = {
  fieldProps: {
    variant: 'outlined',
    density: 'comfortable',
  },
  context: {
    project: {
      id: 1,
    },
  },
  i18n: {
    $ref: '../json-mock/translations',
  },
  otherVariable: 'TEST',
  nestedFormsPath: '../json-mock/1/form-schema?formName={0}',
};

const JSON_TRANSLATIONS_BLOCK = [
  http.get('/json-mock/translations', async (req, res, ctx) => {
    return HttpResponse.json({
      pl: {
        firstName: 'Imię',
        lastName: 'Nazwisko',
        email: 'E-mail',
        password: 'Hasło',
      },
      en: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'E-mail',
        password: 'Password',
      },
    });
  }),
];

const JSON_FORM_BLOCK = [
  http.get('/json-mock/1/form-schema', ({ request }) => {
    const url = new URL(request.url);
    const formName = url.searchParams.get('formName');

    if (formName === '/folder1/example1a') {
      return HttpResponse.json({
        type: 'object',
        properties: {
          example1a: {
            label: 'Field A',
            layout: { component: 'text-field', cols: 6, fillRow: true },
          },
        },
      });
    }

    if (formName === '/folder1/example1b') {
      return HttpResponse.json({
        type: 'object',
        properties: {
          example1b: {
            label: 'Field A (required)',
            layout: { component: 'text-field', cols: 6, fillRow: true },
          },
        },
        required: ['example1b'],
      });
    }

    if (formName === '/folder1/example2a') {
      return HttpResponse.json({
        type: 'object',
        properties: {
          example2a: {
            label: 'Example 2A First level',
            layout: { component: 'text-field', cols: 6, fillRow: true },
          },
          formB: {
            '0': '/folder1/example2a-2',
            $ref: '#/options/nestedFormsPath',
            flatStructure: true,
          },
        },
      });
    }

    if (formName === '/folder1/example2a-2') {
      return HttpResponse.json({
        type: 'object',
        properties: {
          example2a2: {
            label: 'Example 2A Second level (required)',
            layout: { component: 'text-field', cols: 6, fillRow: true },
          },
        },
        required: ['example2a2'],
      });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];

const JSON_CONTEXT_FORM_BLOCK = [
  http.get('/api/v1/features/:menuFeatureId/form-blocks', ({ params, request }) => {
    const url = new URL(request.url);
    const path = url.searchParams.get('path');

    if (params.menuFeatureId === 'test' && path === '/Formularze usługi/Blok faktury.form') {
      return HttpResponse.json({
        type: 'object',
        properties: {
          invoiceNumber: {
            label: 'Numer faktury',
            layout: { component: 'text-field', cols: 6, fillRow: true },
          },
        },
        required: ['invoiceNumber'],
      });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];

export const Example1: Story = {
  name: 'Example 1 A: Nested Block, Wrapped with Key and Required Fields (Translation Included)',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    const nestedField = canvas.getByLabelText('Field A');
    const firstName = canvas.getByLabelText('First name');

    await userEvent.type(nestedField, 'Nested A', { delay: 80 });
    await userEvent.type(firstName, 'Jan', { delay: 80 });

    await expect(context.args.formModel).toEqual({
      formA: {
        example1a: 'Nested A',
      },
      firstName: 'Jan',
    });

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 120 });
    await expect(canvas.queryByText('Field is required.')).toEqual(null);
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        formA: {
          '0': '/folder1/example1a',
          $ref: '#/options/nestedFormsPath',
          flatStructure: false,
        },

        firstName: {
          label: { $ref: '#/i18n/~$locale~/firstName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
      },
    },
    options: options,
  },
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK, ...JSON_FORM_BLOCK],
    },
  },
};

export const Example1B: Story = {
  name: 'Example 1 B: Nested Block, Wrapped with Key and No Required Fields (Translation Included)',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    const nestedField = canvas.getByLabelText('Field A (required)');
    const firstName = canvas.getByLabelText('First name');

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 120 });
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();

    await userEvent.type(nestedField, 'Nested B', { delay: 80 });
    await userEvent.type(firstName, 'Anna', { delay: 80 });

    await expect(context.args.formModel).toEqual({
      formA: {
        example1b: 'Nested B',
      },
      firstName: 'Anna',
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        formA: {
          '0': '/folder1/example1b',
          $ref: '#/options/nestedFormsPath',
          flatStructure: false,
        },

        firstName: {
          label: { $ref: '#/i18n/~$locale~/firstName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
      },
    },
    options: options,
  },
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK, ...JSON_FORM_BLOCK],
    },
  },
};

export const Example1C: Story = {
  name: 'Example 1 C: Nested Block, Flat Structure = True, No Required Fields (Translation Included)',
  play: playForm(async ({ context }) => {
    const canvas = within(context.canvasElement);

    const nestedField = canvas.getByLabelText('Field A');
    const firstName = canvas.getByLabelText('First name');

    await expect(nestedField).toBeInTheDocument();
    await expect(firstName).toBeInTheDocument();

    await userEvent.type(nestedField, 'Flat A', { delay: 80 });
    await userEvent.type(firstName, 'Ola', { delay: 80 });

    await expect(context.args.formModel).toEqual({
      example1a: 'Flat A',
      firstName: 'Ola',
    });
    await expect(context.args.formModel.formA).toBeUndefined();

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 120 });
    await expect(canvas.queryByText('Field is required.')).toEqual(null);
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        formA: {
          '0': '/folder1/example1a',
          $ref: '#/options/nestedFormsPath',
          flatStructure: true,
        },
        firstName: {
          label: {
            $ref: '#/i18n/~$locale~/firstName',
          },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
      },
    },
    options: options,
  },
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK, ...JSON_FORM_BLOCK],
    },
  },
};

export const Example1D: Story = {
  name: 'Example 1 D: Nested Block, Flat Structure and Required Fields (Translation Included)',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    const nestedField = canvas.getByLabelText('Field A (required)');
    const firstName = canvas.getByLabelText('First name');

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 120 });
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();

    await userEvent.type(nestedField, 'Flat B', { delay: 80 });
    await userEvent.type(firstName, 'Kasia', { delay: 80 });

    await expect(context.args.formModel).toEqual({
      example1b: 'Flat B',
      firstName: 'Kasia',
    });
    await expect(context.args.formModel.formA).toBeUndefined();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        formA: {
          '0': '/folder1/example1b',
          $ref: '#/options/nestedFormsPath',
          flatStructure: true,
        },

        firstName: {
          label: { $ref: '#/i18n/~$locale~/firstName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
      },
    },
    options: options,
  },
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK, ...JSON_FORM_BLOCK],
    },
  },
};

export const Example2A: Story = {
  name: 'Example 2 A: 2 Levels of Nesting, Flat Structure = True',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    const nestedField = canvas.getByLabelText('Example 2A First level');
    const nestedField2ndLevel = canvas.getByLabelText('Example 2A Second level (required)');
    const firstName = canvas.getByLabelText('First name');

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 120 });
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();

    await userEvent.type(nestedField, 'Flat B', { delay: 80 });
    await userEvent.type(nestedField2ndLevel, 'Flat B', { delay: 80 });
    await userEvent.type(firstName, 'Kasia', { delay: 80 });

    await expect(context.args.formModel).toEqual({
      example2a: 'Flat B',
      example2a2: 'Flat B',
      firstName: 'Kasia',
    });
    await expect(context.args.formModel.formA).toBeUndefined();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        formA: {
          '0': '/folder1/example2a',
          $ref: '#/options/nestedFormsPath',
          flatStructure: true,
        },

        firstName: {
          label: { $ref: '#/i18n/~$locale~/firstName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
      },
    },
    options: options,
  },
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK, ...JSON_FORM_BLOCK],
    },
  },
};

export const ContextMenuFeatureIdInNestedFormsPath: Story = {
  name: 'Context menuFeatureId in nestedFormsPath',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);

    const nestedField = canvas.getByLabelText('Numer faktury');
    await expect(nestedField).toBeInTheDocument();

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 120 });
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();

    await userEvent.type(nestedField, 'FV/1/2026', { delay: 80 });

    await expect(context.args.formModel).toEqual({
      invoiceNumber: 'FV/1/2026',
    });
    await expect(context.args.formModel.formBlock).toBeUndefined();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        formBlock: {
          '0': '/Formularze usługi/Blok faktury.form',
          $ref: '#/options/nestedFormsPath',
          flatStructure: true,
        },
      },
    },
    options: {
      context: {
        menuFeatureId: 'test',
      },
      nestedFormsPath: '../api/v1/features/{context.menuFeatureId}/form-blocks?path={0}',
    },
  },
  parameters: {
    msw: {
      handlers: [...JSON_CONTEXT_FORM_BLOCK],
    },
  },
};
