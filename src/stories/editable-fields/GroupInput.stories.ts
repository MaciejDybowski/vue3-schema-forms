// @ts-nocheck
import { Story } from 'storybook/dist/csf';
import { expect, userEvent, waitFor, within } from 'storybook/test';



import { GROUP_INPUT_MOCKS } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';















export default {
  title: 'Elements/Editable/GroupInput',
  ...formStoryWrapperTemplate,
};

export const LimitModel: Story = {
  name: 'Case: model = object, multiple = false',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText('Group');
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
        name: 'Testowa',
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
          label: 'Group',
          layout: {
            cols: 12,
            component: 'group-input',
            props: {
              multiple: false,
            },
          },
          source: {
            url: '/mocks/groups',
            itemsPerPage: 20,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: GROUP_INPUT_MOCKS,
    },
  },
};

export const LimitModelArray: Story = {
  name: 'Case: model = array, maxSelection enabled',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText('Group');
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
          name: 'Testowa',
          labels: 'the-best',
        },
      ],
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        user: {
          label: 'Group',
          layout: {
            cols: 12,
            component: 'group-input',
            props: {
              maxSelection: 2,
              multiple: true,
            },
          },
          source: {
            url: '/mocks/groups',
            itemsPerPage: 20,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: GROUP_INPUT_MOCKS,
    },
  },
};

export const AutoSelect: Story = {
  name: 'Case: autoselect',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText('Group');
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
        name: 'Testowa',
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
          label: 'Group',
          layout: {
            cols: 12,
            component: 'group-input',
          },
          source: {
            url: '/mocks/groups?filter=id=={owner.id}',
            itemsPerPage: 20,
            singleOptionAutoSelect: true,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: GROUP_INPUT_MOCKS,
    },
  },
};

export const TriggerEvent: Story = {
  name: 'Case: trigger event',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const select = await canvas.getByLabelText('Group');
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
          name: 'Testowa',
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
          label: 'Group',
          layout: {
            cols: 12,
            component: 'group-input',
            props: {
              multiple: false,
            },
          },
          source: {
            url: '/mocks/groups',
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
      handlers: GROUP_INPUT_MOCKS,
    },
  },
};

export const ModelWithOnlyId: Story = {
  name: 'Case: model = { id: ... } (incomplete)',
  play: async (context) => {
    await waitForMountedAsync();
    await waitFor(
      () => {
        expect(context.args.formModel.user).toEqual({
          id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
          name: 'Testowa',
          labels: 'the-best',
        });
      },
      { timeout: 5000 },
    );
  },
  args: {
    formModel: {
      user: { id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56' },
    },
    schema: {
      type: 'object',
      properties: {
        user: {
          label: 'Group',
          layout: {
            cols: 12,
            component: 'group-input',
          },
          source: {
            url: '/mocks/groups',
            itemsPerPage: 20,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: GROUP_INPUT_MOCKS,
    },
  },
};

export const ModelWithOnlyIdArray: Story = {
  name: 'Case: model = [{ id: ... }, { id: ... }] (incomplete array)',
  play: async (context) => {
    await waitForMountedAsync();
    await waitFor(
      () => {
        expect(context.args.formModel.user).toEqual([
          {
            id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
            name: 'Testowa',
            labels: 'the-best',
          },
          {
            id: '2d6e0d79-5f5b-4c4f-b6e1-aaa2b38fba1f',
            name: 'Administratorzy',
          },
        ]);
      },
      { timeout: 5000 },
    );
  },
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
          label: 'Group',
          layout: {
            cols: 12,
            component: 'group-input',
            props: {
              multiple: true,
            },
          },
          source: {
            url: '/mocks/groups',
            itemsPerPage: 20,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: GROUP_INPUT_MOCKS,
    },
  },
};

export const ReadonlyModelWithOnlyId: Story = {
  name: 'Case: model = { id: ... }, readonly = true',
  play: async (context) => {
    await waitForMountedAsync();
    await waitFor(
      () => {
        expect(context.args.formModel.user).toEqual({
          id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56',
          name: 'Testowa',
          labels: 'the-best',
        });
      },
      { timeout: 5000 },
    );
  },
  args: {
    formModel: {
      user: { id: '1b9d6bcd-bbfd-4b2d-9b77-1b7b8a4f3c56' },
    },
    schema: {
      type: 'object',
      properties: {
        user: {
          label: 'Group',
          layout: {
            cols: 12,
            component: 'group-input',
            props: {
              readonly: true,
            },
          },
          source: {
            url: '/mocks/groups',
            itemsPerPage: 20,
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: GROUP_INPUT_MOCKS,
    },
  },
};
