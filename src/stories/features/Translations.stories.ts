// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';
import { HttpResponse, http } from 'msw';

import { formStoryWrapperTemplate } from '../templates/shared-blocks';





export default {
  title: 'Features/Internationalization (i18n)',
  ...formStoryWrapperTemplate,
};
/**
 * #### Translations for Any Text in the Form
 * `label: { $ref: '#/i18n/~$locale~/your_i18n_key' }` - the translation definition relies on the i18n plugin
 *
 * `i18n: object` - when defining the form schema, include an object with translations.
 * ##### !!! The schema is translated at the very beginning of the rendering process; changing the language "live" can be costly and requires re-rendering the entire form. !!!
 */
export const i18nObjectInSchema: Story = {
  name: 'Example 1: i18n object in schema',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('First name');
    const field1 = canvas.getByLabelText('Last name');
    const field2 = canvas.getByLabelText('E-mail');
    const field3 = canvas.getByLabelText('Password');

    await expect(field).toBeInTheDocument();
    await expect(field1).toBeInTheDocument();
    await expect(field2).toBeInTheDocument();
    await expect(field3).toBeInTheDocument();
  },
  args: {
    schema: {
      type: 'object',
      properties: {
        firstName: {
          label: { $ref: '#/i18n/~$locale~/firstName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
        lastName: {
          label: { $ref: '#/i18n/~$locale~/lastName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
        email: {
          label: { $ref: '#/i18n/~$locale~/email' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
        password: {
          label: { $ref: '#/i18n/~$locale~/password' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
      },
      i18n: {
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
      },
    },
  },
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

export const i18nObjectAsRef: Story = {
  name: 'Example 2: i18n object as $ref in options',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await new Promise((r) => setTimeout(r, 200));
    const field = canvas.getByLabelText('First name');
    const field1 = canvas.getByLabelText('Last name');
    const field2 = canvas.getByLabelText('E-mail');
    const field3 = canvas.getByLabelText('Password');

    await expect(field).toBeInTheDocument();
    await expect(field1).toBeInTheDocument();
    await expect(field2).toBeInTheDocument();
    await expect(field3).toBeInTheDocument();
  },
  args: {
    schema: {
      type: 'object',
      properties: {
        firstName: {
          label: { $ref: '#/i18n/~$locale~/firstName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
        lastName: {
          label: { $ref: '#/i18n/~$locale~/lastName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
        email: {
          label: { $ref: '#/i18n/~$locale~/email' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
        password: {
          label: { $ref: '#/i18n/~$locale~/password' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
      },
    },
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'comfortable',
      },
      i18n: {
        $ref: '../json-mock/translations',
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK],
    },
  },
};

export const internationalizationWithParams: Story = {
  name: 'Example 3: add params to translations',
  play: async (context) => {
    await new Promise((r) => setTimeout(r, 200));
    const canvas = within(context.canvasElement);
    await expect(canvas.getByText('Welcome John Smith on our site!')).toBeInTheDocument();
  },
  args: {
    formModel: {
      firstName: 'John',
      lastName: 'Smith',
    },
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            'It is possible to define $ref object in specific way to provide translation for example from backend where you manage them in properties file',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        welcome: {
          content: {
            $ref: '#/i18n/~$locale~/welcomeText',
            0: '{firstName}',
            1: '{lastName}',
          },
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
      },
      i18n: {
        pl: {
          welcomeText: 'Witaj {0} {1} na naszej stronie!',
        },
        en: {
          welcomeText: 'Welcome {0} {1} on our site!',
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK],
    },
  },
};

export const ParamsWithDifferentLevels: Story = {
  name: 'Example 4: nested keys in i18n object',
  play: async (context) => {
    await new Promise((r) => setTimeout(r, 200));
    const canvas = within(context.canvasElement);
    await expect(
      canvas.getByText('Customer name is Customer XYZ and customer number is 123 XDS'),
    ).toBeInTheDocument();
    await expect(canvas.getByText('Hello Customer XYZ!')).toBeInTheDocument();
    const field = canvas.getByLabelText('Customer name');
    await expect(field).toBeInTheDocument();
  },
  args: {
    formModel: {
      customer: {
        basicData: {
          name: 'Customer XYZ',
          number: '123 XDS',
        },
      },
    },
    schema: {
      type: 'object',
      properties: {
        span: {
          content: {
            $ref: '#/i18n/~$locale~/helloWorld',
            '0': '{customer.basicData.name}',
          },
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        span2: {
          content: {
            $ref: '#/i18n/~$locale~/customer/basicData/descriptionText',
            '0': '{customer.basicData.name}',
            '1': '{customer.basicData.number}',
          },
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        customer: {
          properties: {
            basicData: {
              properties: {
                name: {
                  label: {
                    $ref: '#/i18n/~$locale~/customer/basicData/name',
                  },
                  layout: {
                    component: 'text-field',
                  },
                },
              },
            },
          },
        },
      },
      i18n: {
        en: {
          customer: {
            basicData: {
              name: 'Customer name',
              descriptionText: 'Customer name is {0} and customer number is {1}',
            },
          },
          helloWorld: 'Hello {0}!',
        },
        pl: {
          customer: {
            basicData: {
              name: 'Nazwa kleinta',
              descriptionText: 'Nazwa klienta {0} i jego numer {1}',
            },
          },
          helloWorld: 'Witaj {0}!',
        },
      },
    },
  },
};

export const TranslationTesting2: Story = {
  name: 'Example 5: using jsonata in $ref parameters',
  play: async (context) => {
    await new Promise((r) => setTimeout(r, 200));
    const canvas = within(context.canvasElement);

    const field = canvas.getByLabelText('Change it!');

    await expect(
      canvas.getByText('Hello! This text will show when switch is false'),
    ).toBeInTheDocument();

    await userEvent.click(field, { delay: 200 });

    await expect(
      canvas.getByText('Hello! This text will show when switch is true'),
    ).toBeInTheDocument();
  },
  args: {
    formModel: {
      valueOne: 'This text will show when switch is false',
      valueTwo: 'This text will show when switch is true',
    },
    schema: {
      type: 'object',
      properties: {
        switch: {
          label: 'Change it!',
          layout: {
            component: 'switch',
          },
        },
        customerData: {
          content: {
            $ref: '#/i18n/~$locale~/form/examples/helloWorld',
            '0': '{nata(switch ? valueTwo : valueOne)}',
          },
          layout: {
            component: 'static-content',
            tag: 'p',
            cols: {
              xs: 12,
              sm: 12,
              md: 12,
              lg: 8,
              xl: 8,
              xxl: 8,
            },
          },
        },
      },
      i18n: {
        en: {
          form: {
            examples: {
              helloWorld: 'Hello! {0}',
            },
          },
        },
        pl: {
          form: {
            examples: {
              helloWorld: 'Witaj! {0}',
            },
          },
        },
      },
    },
  },
};
