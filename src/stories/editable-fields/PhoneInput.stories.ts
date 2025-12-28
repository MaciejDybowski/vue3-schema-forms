// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { SchemaTextField } from '../../types/schema/elements';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';












export default {
  title: 'Elements/Editable/Phone',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    const canvas = within(context.canvasElement);
    const phoneLabels = await canvas.findAllByText('Phone Input');
    await expect(phoneLabels).toHaveLength(2);
    await expect(phoneLabels[1]).toBeInTheDocument();
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
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });
    await expect(context.args.formModel.phoneInput).toBe('+48510333202');
  },
  args: {
    formModel: { phoneInput: '+48510333202' },
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
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });

    const canvas = within(context.canvasElement);

    const input = canvas.getByRole('textbox', { name: 'Phone Input' });

    await userEvent.type(input, '510333202', { pointerEventsCheck: 0, delay: 50 });

    const submit = await canvas.findByText('Validate');
    await userEvent.click(submit);

    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
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
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });

    const canvas = within(context.canvasElement);

    const input = canvas.getByRole('combobox', { name: 'Country' });

    await userEvent.click(input, { pointerEventsCheck: 0, delay: 100 });

    const countryItems = await waitFor(() =>
      Array.from(document.getElementsByClassName('v-phone-input__country__title')).filter((el) =>
        el.textContent?.trim(),
      ),
    );

    if (countryItems.length > 1) {
      const countryTitle = countryItems[1].textContent?.trim();
      await expect(countryTitle).toEqual('Polska (Poland)');
      await userEvent.click(countryItems[1], { pointerEventsCheck: 0, delay: 100 });
    }
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
            countryLabel: 'Country',
          },
        } as SchemaTextField,
      },
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
