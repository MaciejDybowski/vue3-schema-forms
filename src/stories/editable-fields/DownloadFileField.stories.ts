// @ts-nocheck
import { expect, waitFor, within } from 'storybook/test';
import { HttpResponse, http } from 'msw';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Editable/Download File',
  ...formStoryWrapperTemplate,
};

const pngBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

const httpbinImageHandlers = [
  http.get('/api/v1/services/httpbin.org/image/:imageType', ({ params, request }) => {
    const imageType = String(params.imageType || 'png');
    const url = new URL(request.url);
    const format = url.searchParams.get('format');
    const traceId = url.searchParams.get('traceId');

    if (format !== 'pdf' || traceId !== 'trace-123') {
      return HttpResponse.json({ message: 'Invalid query mapping' }, { status: 400 });
    }

    const binary = Uint8Array.from(atob(pngBase64), (c) => c.charCodeAt(0));
    const blob = new Blob([binary], {
      type: imageType === 'jpeg' ? 'image/jpeg' : 'image/png',
    });

    return new HttpResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
  }),
];

export const ButtonMode: Story = {
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });

    const canvas = within(context.canvasElement);
    const button = await canvas.findByRole('button', { name: 'Pobierz plik' });
    await expect(button).toBeInTheDocument();
  },
  args: {
    schema: {
      type: 'object',
      properties: {
        download: {
          label: 'Pobierz plik',
          renderMode: 'button',
          externalApi: {
            serviceCode: 'httpbin.org',
            method: 'GET',
            endpoint: '/image/{imageType}',
            body: {
              locale: '{lang}',
            },
            query: {
              format: 'pdf',
            },
            params: {
              traceId: '{traceId}',
            },
          },
          layout: {
            component: 'download-file',
          },
        },
      },
    } as Schema,
    formModel: {
      imageType: 'png',
      lang: 'pl',
      traceId: 'trace-123',
    },
  },
  parameters: {
    msw: {
      handlers: httpbinImageHandlers,
    },
  },
};

export const LinkMode: Story = {
  play: async ({ context, mount }) => {
    await mount();
    await waitFor(() => {
      expect(context.args.signals.formIsReady).toBe(true);
    });

    const canvas = within(context.canvasElement);
    const link = await canvas.findByRole('button', { name: 'Pobierz' });
    await expect(link).toBeInTheDocument();
  },
  args: {
    schema: {
      type: 'object',
      properties: {
        download: {
          label: 'Pobierz',
          renderMode: 'link',
          fileName: 'Raport-Kwartalny.pdf',
          fileType: 'PDF',
          status: 'ready',
          externalApi: {
            serviceCode: 'httpbin.org',
            method: 'GET',
            endpoint: '/image/{imageType}',
            query: {
              format: 'pdf',
            },
            params: {
              traceId: '{traceId}',
            },
          },
          layout: {
            component: 'download-file',
          },
        },
      },
    } as Schema,
    formModel: {
      imageType: 'jpeg',
      traceId: 'trace-123',
    },
  },
  parameters: {
    msw: {
      handlers: httpbinImageHandlers,
    },
  },
};
