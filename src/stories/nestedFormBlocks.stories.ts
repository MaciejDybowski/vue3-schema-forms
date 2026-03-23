// @ts-nocheck
import { formStoryWrapperTemplate } from './templates/shared-blocks';

import { http, HttpResponse } from 'msw';
import { expect, userEvent, within } from 'storybook/test';
import { waitForMountedAsync } from './editable-fields/utils';


export default {
  title: 'Elements/Nested Form Blocks',
  ...formStoryWrapperTemplate
};

const options = {
  fieldProps: {
    variant: 'outlined',
    density: 'comfortable'
  },
  context: {
    project: {
      id: 1
    }
  },
  i18n: {
    $ref: '../json-mock/translations'
  },
  otherVariable: 'TEST',
  nestedFormsPath: '../json-mock/1/form-schema?formName={0}'
};

const JSON_TRANSLATIONS_BLOCK = [
  http.get('/json-mock/translations', async (req, res, ctx) => {
    return HttpResponse.json({
      pl: {
        firstName: 'Imię',
        lastName: 'Nazwisko',
        email: 'E-mail',
        password: 'Hasło'
      },
      en: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'E-mail',
        password: 'Password'
      }
    });
  })
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
            layout: { component: 'text-field', cols: 6, fillRow: true }
          }
        }
      });
    }

    if (formName === '/folder1/example1b') {
      return HttpResponse.json({
        type: 'object',
        properties: {
          example1b: {
            label: 'Field A (required)',
            layout: { component: 'text-field', cols: 6, fillRow: true }
          }
        },
        required: ['example1b']
      });
    }

    return new HttpResponse(null, { status: 404 });
  })
];

export const Example1: Story = {
  name: 'Example 1A: Nested block, wrapped with key and required fields (translation included)',
  play: async (context) => {
    await waitForMountedAsync(50);

    const canvas = within(context.canvasElement);

    const nestedField = canvas.getByLabelText('Field A');
    const firstName = canvas.getByLabelText('First name');

    await userEvent.type(nestedField, 'Nested A', { delay: 80 });
    await userEvent.type(firstName, 'Jan', { delay: 80 });

    await expect(context.args.formModel).toEqual({
      formA: {
        example1a: 'Nested A'
      },
      firstName: 'Jan'
    });

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 120 });
    await expect(canvas.queryByText('Field is required.')).toEqual(null);
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        formA: {
          '0': '/folder1/example1a',
          $ref: '#/options/nestedFormsPath',
          flatStructure: false
        },

        firstName: {
          label: { $ref: '#/i18n/~$locale~/firstName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true
          }
        }
      }
    },
    options: options
  },
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK, ...JSON_FORM_BLOCK]
    }
  }
};

export const Example1B: Story = {
  name: 'Example 1B: Nested block, wrapped with key and no required fields (translation included)',
  play: async (context) => {
    await waitForMountedAsync(50);
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
        example1b: 'Nested B'
      },
      firstName: 'Anna'
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        formA: {
          '0': '/folder1/example1b',
          $ref: '#/options/nestedFormsPath',
          flatStructure: false
        },

        firstName: {
          label: { $ref: '#/i18n/~$locale~/firstName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true
          }
        }
      }
    },
    options: options
  },
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK, ...JSON_FORM_BLOCK]
    }
  }
};

export const Example1C: Story = {
  name: 'Example 1C: Nested block, faltStructure = true, no required fields (translation included)',
  play: async ({ context }) => {
    await waitForMountedAsync(50);

    const canvas = within(context.canvasElement);

    const nestedField = canvas.getByLabelText('Field A');
    const firstName = canvas.getByLabelText('First name');

    await expect(nestedField).toBeInTheDocument();
    await expect(firstName).toBeInTheDocument();

    await userEvent.type(nestedField, 'Flat A', { delay: 80 });
    await userEvent.type(firstName, 'Ola', { delay: 80 });

    await expect(context.args.formModel).toEqual({
      example1a: 'Flat A',
      firstName: 'Ola'
    });
    await expect(context.args.formModel.formA).toBeUndefined();

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 120 });
    await expect(canvas.queryByText('Field is required.')).toEqual(null);
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        formA: {
          '0':
            '/folder1/example1a',
          $ref:
            '#/options/nestedFormsPath',
          flatStructure:
            true
        }
        ,
        firstName: {
          label: {
            $ref: '#/i18n/~$locale~/firstName'
          }
          ,
          layout: {
            component: 'text-field',
            cols:
              6,
            fillRow:
              true
          }
        }
      }
    }
    ,
    options: options
  }
  ,
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK, ...JSON_FORM_BLOCK]
    }
  }
};


export const Example1D: Story = {
  name: 'Example 1D: Nested block, flatStructure and required fields (translation included)',
  play: async (context) => {
    await waitForMountedAsync(50);
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
      firstName: 'Kasia'
    });
    await expect(context.args.formModel.formA).toBeUndefined();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        formA: {
          '0': '/folder1/example1b',
          $ref: '#/options/nestedFormsPath',
          flatStructure: true
        },

        firstName: {
          label: { $ref: '#/i18n/~$locale~/firstName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true
          }
        }
      }
    },
    options: options
  },
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK, ...JSON_FORM_BLOCK]
    }
  }
};