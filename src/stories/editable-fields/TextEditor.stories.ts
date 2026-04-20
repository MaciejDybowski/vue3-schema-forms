// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { HttpResponse, http } from 'msw';



import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';


























export default {
  title: 'Elements/Editable/TextEditor',
  ...formStoryWrapperTemplate,
};

function getTextEditor(canvas: HTMLElement) {
  return canvas.querySelector('[contenteditable="true"]') as HTMLElement;
}

const TEXT_EDITOR_UPLOAD_MOCK = [
  http.post('/api/v1/features/:menuFeatureId/files', async () => {
    return HttpResponse.json({
      fileId: 'text-editor-file-id',
      dataId: 'product-data-001',
      sign: 'text-editor-sign',
    });
  }),
];

const TEXT_EDITOR_IMAGE_PREVIEW_MOCK = [
  http.get('/api/v1/features/:menuFeatureId/images/:imageId/:sign', async ({ params }) => {
    const imageId = String(params.imageId || 'unknown-id');
    const sign = String(params.sign || 'unknown-sign');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="160"><rect width="100%" height="100%" fill="#e8eef9"/><text x="20" y="80" font-size="18" fill="#2a3f5f">Preview ${imageId}/${sign}</text></svg>`;

    return new HttpResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }),
];

const TEXT_EDITOR_UPLOAD_MOCK_ERROR = [
  http.post('/api/v1/features/unknown-feature-id/files', async () => {
    return HttpResponse.json(
      {
        message: 'Conflict: upload error',
        error: 'CONFLICT',
      },
      { status: 409 },
    );
  }),
];

export const Standard: Story = {
  play: async (context) => {},
  args: {
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          layout: {
            component: 'text-editor',
          },
        },
      },
    },
  },
};

export const ReducedOptions: Story = {
  play: async (context) => {},
  args: {
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          editorFeatures: ["bold", "italic"],
          layout: {
            component: 'text-editor',
          },
        },
      },
    },
  },
};

export const WithDefault: Story = {
  name: 'Default value',
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          label: 'Description',
          defaultValue: 'Lorem ipsum...',
          layout: {
            component: 'text-editor',
          },
        },
      },
    } as Schema,
  },
};

export const SimpleValidation: Story = {
  name: 'Required',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    let editor: HTMLElement | null = null;
    await waitFor(() => {
      editor = getTextEditor(canvasElement);
      if (!editor) throw new Error('TextEditor not found yet');
    });

    await userEvent.type(editor!, 'Required field', { delay: 100 });

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton);

    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          layout: {
            component: 'text-editor',
          },
        },
      },
      required: ['textEditor'],
    } as Schema,
  },
};

export const RequiredMarker: Story = {
  name: 'Required marker',
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();

    await waitFor(() => {
      const requiredWrapper = canvasElement.querySelector('.required-input');
      if (!requiredWrapper) {
        throw new Error('Required marker wrapper not found');
      }
    });

    await expect(canvasElement.querySelector('.required-input')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          label: 'Opis',
          layout: {
            component: 'text-editor',
          },
        },
      },
      required: ['textEditor'],
    } as Schema,
  },
};

export const RequiredAncCounter: Story = {
  name: 'Counter',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    let editor: HTMLElement | null = null;
    await waitFor(() => {
      editor = getTextEditor(canvasElement);
      if (!editor) throw new Error('TextEditor not found yet');
    });

    await userEvent.type(editor!, 'Required field with counter', { delay: 100 });

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 400 });

    await expect(canvas.getAllByText(/Max/)[0]).toBeInTheDocument();
    await expect(canvas.getByText('Max 20 characters.')).toBeInTheDocument();

    await userEvent.clear(editor!, { delay: 400 });
    await userEvent.type(editor!, 'Counter pass', { delay: 100 });
    await userEvent.click(submitButton);

    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          layout: {
            component: 'text-editor',
            props: {
              counter: '20',
            },
          },
        },
      },
      required: ['textEditor'],
    } as Schema,
  },
};



export const OnChangeEvents: Story = {
  name: 'OnChangeEvents',
  play: async ({ canvasElement, args }) => {
    await waitForMountedAsync();

    let editor: HTMLElement | null = null;
    await waitFor(() => {
      editor = getTextEditor(canvasElement);
      if (!editor) throw new Error('TextEditor not found yet');
    });

    await userEvent.type(editor!, 'Test content', { delay: 100 });
    await new Promise((r) => setTimeout(r, 1000));

    await expect(args.formModel).toEqual({ textEditor: '<p>Test content</p>', fieldB: null });
  },
  args: {
    formModel: {
      fieldB: 'Test',
    },
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          layout: {
            component: 'text-editor',
            props: {
              counter: '20',
            },
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
      required: ['textEditor'],
    } as Schema,
  },
};

export const HtmlWithImageAndFileButtons: Story = {
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();

    await expect(canvasElement.querySelector('.mdi-image-plus')).toBeInTheDocument();
    await expect(canvasElement.querySelector('.mdi-paperclip')).toBeInTheDocument();
  },
  args: {
    formModel: {
      product: {
        mainImage: {
          id: 'text-editor-file-id',
          dataId: 'product-data-001',
          lastModifiedAt: '2026-04-13T12:00:00.000Z',
          sign: 'sig-001',
        },
      },
    },
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          label: 'Opis',
          editorFeatures: ['bold', 'italic', 'insertImage', 'insertFile', 'source'],
          fileAvailableExtensions: 'pdf,docx,txt',
          imageAvailableExtensions: 'png,jpg,jpeg,webp',
          fileMaxSize: 10,
          layout: {
            component: 'text-editor',
            props: {
              width: '320',
              height: '180',
            },
          },
          options: {
            context: {
              workspaceId: 'pricing',
              menuFeatureId: 'products',
            },
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...TEXT_EDITOR_UPLOAD_MOCK, ...TEXT_EDITOR_IMAGE_PREVIEW_MOCK],
    },
  },
};

export const MarkdownUploadMode: Story = {
  args: {
    formModel: {
      textEditor: 'Początkowy tekst',
      product: {
        mainImage: {
          id: 'text-editor-file-id',
          dataId: 'product-data-002',
          lastModifiedAt: '2026-04-13T12:00:00.000Z',
          sign: 'sig-002',
        },
      },
    },
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          label: 'Opis markdown',
          contentType: 'markdown',
          editorFeatures: ['insertImage', 'insertFile', 'source'],
          fileAvailableExtensions: 'pdf,txt',
          imageAvailableExtensions: 'png,jpg',
          layout: {
            component: 'text-editor',
            props: {
              width: '320',
              height: '180',
            },
          },
          options: {
            context: {
              workspaceId: 'pricing',
              menuFeatureId: 'products',
            },
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...TEXT_EDITOR_UPLOAD_MOCK, ...TEXT_EDITOR_IMAGE_PREVIEW_MOCK],
    },
  },
};

export const UploadErrorScenario: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        textEditor: {
          label: 'Opis',
          editorFeatures: ['insertImage', 'insertFile'],
          fileAvailableExtensions: 'pdf',
          imageAvailableExtensions: 'png',
          layout: {
            component: 'text-editor',
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [...TEXT_EDITOR_UPLOAD_MOCK_ERROR],
    },
  },
};
