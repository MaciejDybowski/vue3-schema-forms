// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { SchemaLocationField } from '../../types/schema/elements';
import { LOCATION_MOCK_REQUEST } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';





export default {
  title: 'Elements/Editable/Location',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            'The location control is based on OpenStreetMaps. In the standard version, there are no restrictions on the language and country of the returned responses. You can do this by defining a results object in JSON Schema (next stories)',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        location: {
          label: 'Location field',
          layout: {
            component: 'location',
          },
        } as SchemaLocationField,
      },
    } as Schema,
  },
  parameters: {
    msw: [LOCATION_MOCK_REQUEST],
  },
};

export const WithValue: Story = {
  name: 'Default value',
  play: async (context) => {
    await expect(context.args.formModel).toEqual({
      location: {
        country: 'Polska',
        country_code: 'pl',
        state: 'województwo małopolskie',
        city: 'Kraków',
        city_district: 'Prądnik Biały',
        suburb: 'Prądnik Biały',
        quarter: 'Azory',
        street: 'Opolska',
        postcode: '31-301',
        formatted_address:
          'Opolska, Azory, Prądnik Biały, Kraków, województwo małopolskie, 31-301, Polska',
        lat: 50.0893889,
        lng: 19.9105881,
      },
    });
  },
  args: {
    formModel: {
      location: {
        country: 'Polska',
        country_code: 'pl',
        state: 'województwo małopolskie',
        city: 'Kraków',
        city_district: 'Prądnik Biały',
        suburb: 'Prądnik Biały',
        quarter: 'Azory',
        street: 'Opolska',
        postcode: '31-301',
        formatted_address:
          'Opolska, Azory, Prądnik Biały, Kraków, województwo małopolskie, 31-301, Polska',
        lat: 50.0893889,
        lng: 19.9105881,
      },
    },
    schema: {
      type: 'object',
      properties: {
        location: {
          label: 'Location field',
          layout: {
            component: 'location',
          },
          results: {
            lang: 'pl',
            countryLimit: 'pl',
          },
        } as SchemaLocationField,
      },
    } as Schema,
  },
  parameters: {
    msw: [LOCATION_MOCK_REQUEST],
  },
};

export const Required: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Location field');
    const Submit = canvas.getByText('Validate');

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Field is required.')).toBeInTheDocument();

    await userEvent.click(select, { pointerEventsCheck: 0, delay: 150 });
    await userEvent.type(select, 'Opolska Kraków', { delay: 150 });
    await new Promise((resolve) => setTimeout(resolve, 1500)); // <- wait for api call
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });

    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        location: {
          label: 'Location field',
          layout: {
            component: 'location',
            props: {
              variant: 'outlined',
              density: 'compact',
            },
          },
          results: {
            lang: 'pl',
            countryLimit: 'pl',
          },
        } as SchemaLocationField,
      },
      required: ['location'],
    } as Schema,
  },
  parameters: {
    msw: [LOCATION_MOCK_REQUEST],
  },
};

export const WithLangAndCountryLimits: Story = {
  name: 'Case: Lang and Country limitations',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Location field');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    await userEvent.type(select, 'Opolska, Kraków');

    await new Promise((resolve) => setTimeout(resolve, 1500)); // <- wait for api call
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');

    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      location: {
        country: 'Polska',
        country_code: 'pl',
        state: 'województwo małopolskie',
        county: undefined,
        municipality: undefined,
        village: undefined,
        city: 'Kraków',
        city_district: 'Prądnik Biały',
        suburb: 'Prądnik Biały',
        quarter: 'Azory',
        street: 'Opolska',
        house_number: undefined,
        postcode: '31-326',
        formatted_address:
          'Opolska, Azory, Prądnik Biały, Kraków, województwo małopolskie, 31-326, Polska',
        lat: 50.089445,
        lng: 19.914695,
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        location: {
          label: 'Location field',
          layout: {
            component: 'location',
          },
          results: {
            lang: 'pl',
            countryLimit: 'pl',
          },
        } as SchemaLocationField,
      },
    } as Schema,
  },
  parameters: {
    msw: [LOCATION_MOCK_REQUEST],
  },
};
