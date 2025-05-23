// @ts-nocheck
import { expect, userEvent, within } from '@storybook/test';

import { Schema } from '../../types/schema/Schema';
import { SchemaTextField } from '../../types/schema/elements';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';

export default {
  title: 'Elements/Editable/Phone',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Phone Input');
    await expect(field).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        phoneInput: {
          label: 'Phone Input',
          layout: {
            component: 'phone',
          },
        },
      },
    } as Schema,
  },
};

/**
 * You can set the default value of field from schema
 */
export const DefaultValue: Story = {
  name: 'Default value',
  play: async (context) => {
    await expect(context.args.formModel).toEqual({ phoneInput: '+48510333202' });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        phoneInput: {
          label: 'Phone Input',
          defaultValue: '+48510333202',
          layout: {
            component: 'phone',
          },
        },
      },
    } as Schema,
  },
};

export const Required: Story = {
  name: 'Required',

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const exampleElement = canvas.getByLabelText('Phone input');
    await userEvent.type(exampleElement, '510333', {
      delay: 100,
    });
    await expect(canvas.getAllByText(/The number provided/)[0]).toBeInTheDocument();
    await userEvent.type(exampleElement, '202');
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);

    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        phoneInput: {
          label: 'Phone input',
          layout: {
            component: 'phone',
          },
          phoneInputProps: {
            'include-countries': ['pl'],
          },
        },
      },
      required: ['phoneInput'],
    } as Schema,
  },
};

export const WithPhoneInputPropsProps: Story = {
  name: 'Case: passing lib props',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Country');
    await userEvent.click(field, { pointerEventsCheck: 0, delay: 200 });
    const items = document.getElementsByClassName('v-phone-input__country__title');
    if (items.length > 0) {
      const countryTitle = items[1].textContent?.trim(); // or innerText if needed
      await expect(countryTitle).toEqual('Polska (Poland)');
    }
    await userEvent.click(items[1], { pointerEventsCheck: 0, delay: 200 });
  },
  args: {
    schema: {
      type: 'object',
      properties: {
        description: {
          layout: {
            component: 'static-content',
            tag: 'span',
          },
          content:
            'To modify the settings for the v-phone-input itself, you need to pass your own settings to the phoneInputProps object in schema definition',
        },
        phoneInput: {
          label: 'Phone Input',
          layout: {
            component: 'phone',
          },
          phoneInputProps: {
            'include-countries': ['pl', 'de', 'gb'],
          },
        } as SchemaTextField,
      },
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
