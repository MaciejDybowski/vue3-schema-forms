// @ts-nocheck
import { Story } from 'storybook/dist/csf';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { USER_INPUT_MOCKS } from '../mock-responses';
import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Editable/UserInput',
  ...formStoryWrapperTemplate,
};

export const LimitModel: Story = {
  name: 'Model = Object, Multiple = False',
  play: playForm(async (context) => {
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
  }),
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
  name: 'Model = Array, Max Selection Enabled',
  play: playForm(async (context) => {
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
  }),
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
  name: 'Autoselect',
  play: playForm(async (context) => {
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
  }),
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
  name: 'Trigger Event',
  play: playForm(async (context) => {
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
  }),
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

export const ModelWithOnlyId: Story = {
  name: 'Model = { ID:... } (Incomplete)',
  play: playForm(async (context) => {
    await waitFor(
      () => {
        expect(context.args.formModel.user).toEqual({
          id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
          email: 'alice@example.com',
          firstName: 'Alice',
          lastName: 'Smith',
          username: 'asmith',
          labels: 'the-best',
        });
      },
      { timeout: 5000 },
    );
  }),
  args: {
    formModel: {
      user: { id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56' },
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

export const ModelWithOnlyIdArray: Story = {
  name: 'Model = [{ ID:... }, { ID:... }] (Incomplete Array)',
  play: playForm(async (context) => {
    await waitFor(
      () => {
        expect(context.args.formModel.user).toEqual([
          {
            id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
            email: 'alice@example.com',
            firstName: 'Alice',
            lastName: 'Smith',
            username: 'asmith',
            labels: 'the-best',
          },
          {
            id: '2d6e0d79-5f5b-4c4f-b6e1-aaa2b38fba1f',
            email: 'bob@example.com',
            firstName: 'Bob',
            lastName: 'Johnson',
            username: 'bjohnson',
            labels: 'the-least',
          },
        ]);
      },
      { timeout: 5000 },
    );
  }),
  args: {
    formModel: {
      user: [
        { id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56' },
        { id: '2d6e0d79-5f5b-4c4f-b6e1-aaa2b38fba1f' },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        user: {
          label: 'User',
          layout: {
            cols: 12,
            component: 'user-input',
            props: {
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

export const ReadonlyModelWithOnlyId: Story = {
  name: 'Model = { ID:... }, Read Only = True',
  play: playForm(async (context) => {
    await waitFor(
      () => {
        expect(context.args.formModel.user).toEqual({
          id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
          email: 'alice@example.com',
          firstName: 'Alice',
          lastName: 'Smith',
          username: 'asmith',
          labels: 'the-best',
        });
      },
      { timeout: 5000 },
    );
  }),
  args: {
    formModel: {
      user: { id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56' },
    },
    schema: {
      type: 'object',
      properties: {
        user: {
          label: 'User',
          layout: {
            cols: 12,
            component: 'user-input',
            props: {
              readonly: true,
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
