// @ts-nocheck
import { Story } from 'storybook/dist/csf';
import { expect, userEvent, waitFor, within } from 'storybook/test';



import { EngineSourceField } from '../../types/engine/controls';
import { Schema } from '../../types/schema/Schema';
import { SimpleSource } from '../../types/schema/elements';
import { MOCK_REQUEST_CURRENCY } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { playWrapper, waitForMountedAsync } from './utils';
















































export default {
  title: 'Elements/Editable/Select',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Simple select');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({ select: 1 });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        select: {
          label: 'Simple select',
          layout: {
            component: 'select',
          },
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const Multiple: Story = {
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Simple select');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await userEvent.click(items[1], { delay: 200 });
    await expect(context.args.formModel).toEqual({ select: [1, 2] });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        select: {
          label: 'Simple select',
          layout: {
            component: 'select',
          },
          source: {
            multiple: true,
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};
/**
 * You can set the default value of field from schema
 */
export const WithDefault: Story = {
  name: 'Default value',
  play: playWrapper(async (context) => {
    await expect(context.args.formModel).toEqual({ selectWithDefault: 3 });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        selectWithDefault: {
          label: 'Select',
          layout: {
            component: 'select',
          },
          defaultValue: 3,
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

/**
 * Example shows how to define a "required" field on a form
 */
export const SimpleValidation: Story = {
  name: 'Required',
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Simple select');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit, { delay: 200 });
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        radioButtonRequired: {
          label: 'Simple select',
          layout: {
            component: 'select',
          },
          source: {
            items: [
              { value: 1, title: 'Option 1' },
              { value: 2, title: 'Option 2' },
              { value: 3, title: 'Option 3' },
            ],
          },
        } as EngineSourceField,
      },
      required: ['radioButtonRequired'],
    } as Schema,
  },
};

export const CustomMapping: Story = {
  name: 'Mapper: title/value',
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Simple select');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({ selectCustomMapping: 1 });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        selectCustomMapping: {
          label: 'Simple select',
          layout: {
            component: 'select',
          },
          source: {
            items: [
              { id: 1, text: 'Option 1' },
              { id: 2, text: 'Option 2' },
              { id: 3, text: 'Option 3' },
            ],
            value: 'id',
            title: 'text',
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMappingReturnObject: Story = {
  name: 'Mapper: title/value/returnObject',
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Simple select');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      selectCustomMappingObject: { id: 1, text: 'Option 1' },
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        selectCustomMappingObject: {
          label: 'Simple select',
          layout: {
            component: 'select',
          },
          source: {
            items: [
              { id: 1, text: 'Option 1' },
              { id: 2, text: 'Option 2' },
              { id: 3, text: 'Option 3' },
            ],
            value: 'id',
            title: 'text',
            returnObject: true,
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const CustomMappingReturnObjectDefault: Story = {
  name: 'Mapper: title/value/returnObject/default',
  play: playWrapper(async (context) => {
    await waitForMountedAsync();
    await expect(context.args.formModel).toEqual({
      selectCustomMappingObjectDefault: {
        id: 2,
        text: 'Option 2',
      },
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        selectCustomMappingObjectDefault: {
          label: 'Simple select',
          layout: {
            component: 'select',
          },
          defaultValue: { id: 2, text: 'Option 2' },
          source: {
            items: [
              { id: 1, text: 'Option 1' },
              { id: 2, text: 'Option 2' },
              { id: 3, text: 'Option 3' },
            ],
            value: 'id',
            title: 'text',
            returnObject: true,
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
};

export const GetOptionsFromAPI: Story = {
  name: 'Case: Items from API',
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Simple select');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });

    await expect(context.args.formModel).toEqual({
      selectOptionsFromAPI: {
        id: 'AFN',
        label: 'Afgani',
        digitsAfterDecimal: '2',
        labels: 'the-best',
      },
    });
  }),

  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        selectOptionsFromAPI: {
          label: 'Simple select',
          layout: {
            component: 'select',
            props: {
              inline: true,
            },
          },
          source: {
            url: '/mocks/currencies',
            title: 'label',
            value: 'id',
            returnObject: true,
          } as SimpleSource,
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_REQUEST_CURRENCY,
    },
  },
};

export const onChangeCopyValue: Story = {
  name: 'Case: Copy values into other fields',
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const select = canvas.getByLabelText('Wybierz dostawcę');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });

    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });

    // Select second supplier (TechSupply)
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[1], { delay: 200 });

    // Verify that all fields were populated correctly from selected supplier
    await waitFor(() => {
      expect(context.args.formModel).toEqual({
        supplier: {
          id: 2,
          name: 'TechSupply Sp. z o.o.',
          nip: '9876543210',
          email: 'kontakt@techsupply.pl',
          phone: '+48 22 987 65 43',
          city: 'Kraków',
        },
        supplierName: 'TechSupply Sp. z o.o.',
        supplierNip: '9876543210',
        supplierEmail: 'kontakt@techsupply.pl',
        supplierPhone: '+48 22 987 65 43',
        supplierCity: 'Kraków',
      });
    });

    // Verify input fields contain correct values
    expect(canvas.getByLabelText('Nazwa dostawcy')).toHaveValue('TechSupply Sp. z o.o.');
    expect(canvas.getByLabelText('NIP')).toHaveValue('9876543210');
    expect(canvas.getByLabelText('Email')).toHaveValue('kontakt@techsupply.pl');
    expect(canvas.getByLabelText('Telefon')).toHaveValue('+48 22 987 65 43');
    expect(canvas.getByLabelText('Miasto')).toHaveValue('Kraków');
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        supplier: {
          label: 'Wybierz dostawcę',
          layout: {
            cols: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
            fillRow: true,
            component: 'select',
          },
          source: {
            items: [
              {
                id: 1,
                name: 'ABC Logistics Sp. z o.o.',
                nip: '1234567890',
                email: 'biuro@abclogistics.pl',
                phone: '+48 22 123 45 67',
                city: 'Warszawa',
              },
              {
                id: 2,
                name: 'TechSupply Sp. z o.o.',
                nip: '9876543210',
                email: 'kontakt@techsupply.pl',
                phone: '+48 22 987 65 43',
                city: 'Kraków',
              },
              {
                id: 3,
                name: 'EuroTrans S.A.',
                nip: '5556667778',
                email: 'info@eurotrans.eu',
                phone: '+48 12 555 66 77',
                city: 'Gdańsk',
              },
              {
                id: 4,
                name: 'ProMaterial Hurt',
                nip: '1112223334',
                email: 'zamowienia@promaterial.pl',
                phone: '+48 61 111 22 33',
                city: 'Poznań',
              },
            ],
            title: 'name',
            value: 'id',
            returnObject: true,
          },
          onChange: {
            mode: 'change-model',
            variables: [
              { path: 'supplierName', value: '{supplier.name}' },
              { path: 'supplierNip', value: '{supplier.nip}' },
              { path: 'supplierEmail', value: '{supplier.email}' },
              { path: 'supplierPhone', value: '{supplier.phone}' },
              { path: 'supplierCity', value: '{supplier.city}' },
            ],
          },
        },
        supplierName: {
          label: 'Nazwa dostawcy',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            component: 'text-field',
          },
        },
        supplierNip: {
          label: 'NIP',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            component: 'text-field',
          },
        },
        supplierEmail: {
          label: 'Email',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            component: 'text-field',
          },
        },
        supplierPhone: {
          label: 'Telefon',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            component: 'text-field',
          },
        },
        supplierCity: {
          label: 'Miasto',
          layout: {
            cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
            component: 'text-field',
          },
        },
      },
    },
  },
};