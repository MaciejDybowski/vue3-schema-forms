// @ts-nocheck
import { within } from 'storybook/test';

import { MOCK_FOR_FILE_INPUT } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';





export default {
  title: 'Elements/Editable/File',
  ...formStoryWrapperTemplate,
};

export const Standard = {
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
  },
  args: {
    formModel: {
      file: {
        id: '12345',
        name: 'Projekt Demo.zip',
        size: 10360,
        type: 'zip',
      },
    },
    schema: {
      type: 'object',
      properties: {
        file: {
          label: 'Example file',
          layout: {
            component: 'file-field',
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...MOCK_FOR_FILE_INPUT],
    },
  },
};

export const MaxFileSizeAndExtension: Story = {
  args: {
    formModel: {
      file: {
        id: '12345',
        name: 'Projekt Demo.zip',
        size: 10360,
        type: 'zip',
      },
    },
    schema: {
      type: 'object',
      properties: {
        file: {
          label: 'Example file',
          layout: {
            component: 'file-field',
          },
          fileMaxSize: 5,
          fileAvailableExtensions: 'pptx',
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...MOCK_FOR_FILE_INPUT],
    },
  },
};
