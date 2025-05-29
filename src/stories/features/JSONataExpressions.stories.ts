// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { waitForMountedAsync } from '../editable-fields/utils';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';





export default {
  title: 'Features/JSONata integration',
  ...formStoryWrapperTemplate,
};

export const OnPropsSimpleField: Story = {
  name: 'Example 1: It is possible to use nata function in props',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    let hint = document.getElementsByClassName('v-messages');
    await expect(hint.length).toEqual(0);

    const option2 = canvas.getByLabelText('Euro');
    await userEvent.click(option2, { delay: 200 });
    hint = document.getElementsByClassName('v-messages');
    await expect(hint.length).toEqual(1);
  },
  args: {
    formModel: { waluta: { value: 'PLN', title: 'Polski złoty' } },
    schema: {
      type: 'object',
      properties: {
        waluta: {
          label: 'Waluta',
          layout: {
            component: 'radio-button',
          },
          source: {
            items: [
              { value: 'PLN', title: 'Polski złoty' },
              { value: 'EUR', title: 'Euro' },
            ],
            returnObject: true,
          },
        },
        kwotaNetto: {
          label: 'Kwota netto',
          layout: {
            component: 'text-field',
            props: {
              'persistent-hint': "nata(waluta.value!='PLN' ? true : false)",
              hint: 'Kwota netto PLN: {kwotaNettoPln:0}',
            },
          },
        },
      },
      required: [],
    } as Schema,
  },
};

export const OnPropsIfInDuplicatedSection: Story = {
  name: 'Example 2: It is possible to use nata function in props in duplicated section',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    let hint = document.getElementsByClassName('v-messages');
    await expect(hint.length).toEqual(0);

    const option2 = canvas.getByLabelText('Euro');
    await userEvent.click(option2, { delay: 200 });
    hint = document.getElementsByClassName('v-messages');
    await expect(hint.length).toEqual(1);
  },
  args: {
    formModel: { waluta: { value: 'PLN', title: 'Polski złoty' } },
    schema: {
      type: 'object',
      properties: {
        waluta: {
          label: 'Waluta',
          layout: {
            component: 'radio-button',
          },
          source: {
            items: [
              { value: 'PLN', title: 'Polski złoty' },
              { value: 'EUR', title: 'Euro' },
            ],
            returnObject: true,
          },
        },
        section: {
          layout: {
            component: 'duplicated-section',
            schema: {
              properties: {
                kwotaNetto: {
                  label: 'Kwota netto',
                  layout: {
                    component: 'text-field',
                    props: {
                      'persistent-hint': "nata(waluta.value!='PLN' ? true :false)",
                      hint: 'Kwota netto PLN: {kwotaNettoPln:0}',
                    },
                  },
                },
              },
            },
          },
        },
      },
      required: [],
    } as Schema,
  },
};
