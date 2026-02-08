// @ts-nocheck
import { Story } from 'storybook/dist/csf';
import { expect, userEvent, waitFor, within } from 'storybook/test';



import { USER_INPUT_MOCKS } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';

















export default {
  title: 'Elements/Editable/UserInput',
  ...formStoryWrapperTemplate,
};

export const LimitModel: Story = {
  name: 'Case: model = object, multiple = false',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText('User');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });

    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      user: {
        id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
        email: 'alice@example.com',
        firstName: 'Alice',
        lastName: 'Smith',
        username: 'asmith',
        labels: 'the-best',
      },
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        user: {
          label: 'User',
          layout: {
            cols: 12,
            component: 'user-input',
            props: {
              multiple: false,
            },
          },
          source: {
            url: '/mocks/users',
            itemsPerPage: 20,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: USER_INPUT_MOCKS,
    },
  },
};

export const LimitModelArray: Story = {
  name: 'Case: model = array, maxSelection enabled',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText('User');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      user: [
        {
          id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
          email: 'alice@example.com',
          firstName: 'Alice',
          lastName: 'Smith',
          username: 'asmith',
          labels: 'the-best',
        },
      ],
    });
  },
  args: {
    model: {},
    schema: {
      type: 'object',
      properties: {
        user: {
          label: 'User',
          layout: {
            cols: 12,
            component: 'user-input',
            props: {
              maxSelection: 2,
              multiple: true,
            },
          },
          source: {
            url: '/mocks/users',
            itemsPerPage: 20,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: USER_INPUT_MOCKS,
    },
  },
};

export const AutoSelect: Story = {
  name: 'Case: autoselect',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText('User');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });
    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await expect(context.args.formModel).toEqual({
      owner: {
        id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
      },
      user: {
        id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
        email: 'alice@example.com',
        firstName: 'Alice',
        lastName: 'Smith',
        username: 'asmith',
        labels: 'the-best',
      },
    });
  },
  args: {
    formModel: {
      owner: {
        id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
      },
    },
    schema: {
      type: 'object',
      properties: {
        user: {
          label: 'User',
          layout: {
            cols: 12,
            component: 'user-input',
          },
          source: {
            url: '/mocks/users?filter=id=={owner.id}',
            itemsPerPage: 20,
            singleOptionAutoSelect: true,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: USER_INPUT_MOCKS,
    },
  },
};

export const TriggerEvent: Story = {
  name: 'Case: trigger event',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText('User');
    await userEvent.click(select, { pointerEventsCheck: 0, delay: 200 });
    await waitFor(() => {
      const items = document.querySelectorAll('.v-list-item');
      expect(items.length).toBeGreaterThan(0);
    });

    const items = document.getElementsByClassName('v-list-item');
    await userEvent.click(items[0], { delay: 200 });
    await waitFor(() => {
      expect(context.args.formModel).toEqual({
        user: {
          id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
          email: 'alice@example.com',
          firstName: 'Alice',
          lastName: 'Smith',
          username: 'asmith',
          labels: 'the-best',
        },
        fieldB: null,
      });
    });
  },
  args: {
    formModel: {
      fieldB: 'Template',
    },
    schema: {
      type: 'object',
      properties: {
        fieldB: {
          label: 'Field B',
          layout: {
            component: 'text-field',
          },
        },
        user: {
          label: 'User',
          layout: {
            cols: 12,
            component: 'user-input',
            props: {
              multiple: false,
            },
          },
          source: {
            url: '/mocks/users',
            itemsPerPage: 20,
          },
          onChange: [
            {
              mode: 'change-model',
              variables: [
                {
                  path: 'fieldB',
                  value: null,
                },
              ],
            },
          ],
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: USER_INPUT_MOCKS,
    },
  },
};
