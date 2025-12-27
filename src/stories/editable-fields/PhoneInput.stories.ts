// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { SchemaTextField } from '../../types/schema/elements';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { getVuetifyInput, playWrapper, waitForVuetifyInputReady } from './utils';













export default {
  title: 'Elements/Editable/Phone',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.findAllByText('Phone Input');
    await expect(field[1]).toBeInTheDocument();
  }),
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
  play: playWrapper(async (context) => {
    await expect(context.args.formModel).toEqual({ phoneInput: '+48510333202' });
  }),
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

  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);

    const label = (await canvas.findAllByText('Phone Input'))[0];

    const input = await getVuetifyInput(label);

    await waitForVuetifyInputReady(input);

    await userEvent.type(input, '510333202', { delay: 50 });

    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);

    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  }),

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
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);

    const labelElements = await canvas.findAllByText('Country');
    const labelEl = labelElements[0]; // drugi element (ten z dropdownem)
    const input = await getVuetifyInput(labelEl);

    await userEvent.click(input, { pointerEventsCheck: 0, delay: 100 });

    const countryItems = await waitFor(() =>
      Array.from(document.getElementsByClassName('v-phone-input__country__title')).filter((el) =>
        el.textContent?.trim(),
      ),
    );

    if (countryItems.length > 1) {
      const countryTitle = countryItems[1].textContent?.trim();
      await expect(countryTitle).toEqual('Polska (Poland)');

      await userEvent.click(countryItems[1] as HTMLElement, { pointerEventsCheck: 0, delay: 100 });
    }
  }),
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
