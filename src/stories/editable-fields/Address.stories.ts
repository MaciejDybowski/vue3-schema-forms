// @ts-nocheck
import { expect, userEvent, within } from '@storybook/test';
import { initialize } from 'msw-storybook-addon';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Editable/Address',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Country');
    await userEvent.type(field, 'Poland', { delay: 100 });
    await expect(context.args.formModel).toEqual({
      address: {
        country: 'Poland',
        region: null,
        addressLine: null,
        postalCode: null,
        city: null,
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            'The address component is nothing more than a nested schema with default config and additional props for form autocomplete. How to override some options will be shown in the following stories',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        address: {
          label: 'Address',
          layout: {
            component: 'address',
          },
        },
      },
    } as Schema,
  },
};

export const Override: Story = {
  name: 'Case: fields customization',
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Country');
    await userEvent.type(field, 'Poland', { delay: 100 });
    await expect(context.args.formModel).toEqual({
      address: {
        country: 'Poland',
        region: null,
        addressLine: null,
        postalCode: null,
        city: null,
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            'The mechanism works so that it merges objects with configuration options. Only the required section is overwritten in its entirety from the custom configuration or taken default',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        address: {
          label: 'Address',
          layout: {
            component: 'address',
            schema: {
              properties: {
                country: {
                  layout: {
                    cols: 6,
                  },
                },
                region: {
                  layout: {
                    cols: 6,
                  },
                },
                addressLine: {
                  layout: {
                    cols: 4,
                  },
                },
                postalCode: {
                  layout: {
                    cols: 4,
                  },
                },
                city: {
                  layout: {
                    cols: 4,
                  },
                },
              },
              required: ['addressLine'],
            },
          },
        },
      },
    } as Schema,
  },
};

export const StandardValidation: Story = {
  name: 'Case: standard validation',

  play: async (context) => {
    const canvas = within(context.canvasElement);
    const country = canvas.getByLabelText('Country');
    await userEvent.type(country, 'Poland', { delay: 100 });

    const addressLine = canvas.getByLabelText('Street and number');
    await userEvent.type(addressLine, 'Opolska', { delay: 100 });

    const postalCode = canvas.getByLabelText('Postal code');
    await userEvent.type(postalCode, '123', { delay: 100 });

    const city = canvas.getByLabelText('City');
    await userEvent.type(city, 'Kraków', { delay: 100 });

    await expect(context.args.formModel).toEqual({
      address: {
        country: 'Poland',
        region: null,
        addressLine: 'Opolska',
        postalCode: '123',
        city: 'Kraków',
      },
    });

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);

    // 👇 Assert DOM structure
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        address: {
          label: 'Address',
          layout: {
            component: 'address',
          },
        },
      },
    } as Schema,
  },
};

export const OverrideValidation: Story = {
  name: 'Case: custom validation',
  play: async (context) => {
    const canvas = within(context.canvasElement);

    const addressLine = canvas.getByLabelText('Street and number');
    await userEvent.type(addressLine, 'Opolska', { delay: 100 });

    await expect(context.args.formModel).toEqual({
      address: {
        country: null,
        region: null,
        addressLine: 'Opolska',
        postalCode: null,
        city: null,
      },
    });

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);

    // 👇 Assert DOM structure
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        address: {
          label: 'Address',
          layout: {
            component: 'address',
            schema: {
              required: ['addressLine'],
            },
          },
        },
      },
    } as Schema,
  },
};
