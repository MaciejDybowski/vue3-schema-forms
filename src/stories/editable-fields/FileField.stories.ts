// @ts-nocheck
import { within } from 'storybook/test';

import { MOCK_FOR_FILE_INPUT, MOCK_FOR_FILE_INPUT_ERROR } from '../mock-responses';
import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Editable/File',
  ...formStoryWrapperTemplate,
};

export const Standard = {
  name: 'Standard',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
  }),
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
  name: 'Max File Size and Extension',
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

export const TRY_UPLOAD_FILE_AND_CATCH_ERROR: Story = {
  name: 'Try Upload Error Handling',
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        file: {
          fileAvailableExtensions: '.pdf',
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
      handlers: [...MOCK_FOR_FILE_INPUT_ERROR],
    },
  },
};
