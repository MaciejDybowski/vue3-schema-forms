// @ts-nocheck
import { HttpResponse, http } from 'msw';
import { expect, waitFor, within } from 'storybook/test';



import { Schema } from '../../types/schema/Schema';
import { waitForMountedAsync } from '../editable-fields/utils';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';























export default {
  title: 'Elements/Editable/Proxy Service Caller',
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
            component: 'proxy-service-caller',
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
            component: 'proxy-service-caller',
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

export const Examples: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        downloadButton: {
          label: 'Pobierz dokument (Przycisk)',
          layout: {
            component: 'proxy-service-caller',
          },
          externalApi: {
            serviceCode: 'documents-service',
            endpoint: '/download/123',
            method: 'GET',
          },
          fileName: 'manual-name.pdf',
        },
        downloadLink: {
          label: 'Pobierz dokument (Link)',
          layout: {
            component: 'proxy-service-caller',
          },
          renderMode: 'link',
          externalApi: {
            serviceCode: 'documents-service',
            endpoint: '/download/123',
            method: 'GET',
          },
          fileName: 'manual-link-name.pdf',
        },
      },
    } as Schema,
  },
};

export const DynamicFileName: Story = {
  name: 'Case: Dynamic Filename (Variables and JSONata)',
  parameters: {
    msw: {
      handlers: [
        http.get('/api/v1/services/documents-service/download', () => {
          const blob = new Blob(['To jest zawartość mockowanego pliku PDF.'], { type: 'application/pdf' });
          return new HttpResponse(blob, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'attachment;',
            },
          });
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    await waitForMountedAsync(100);
    const canvas = within(canvasElement);
    // Note: Since runDownload is triggered on click, we mainly test if the component renders with labels
    await expect(canvas.getByText('Pobierz FV_2024_001.pdf')).toBeInTheDocument();
    await expect(canvas.getByText('Pobierz Zatwierdzona_FV_2024_001.pdf')).toBeInTheDocument();
  },
  args: {
    formModel: {
      data: {
        docNumber: 'FV_2024_001',
        isPaid: true,
      },
    },
    schema: {
      type: 'object',
      properties: {
        variableName: {
          label: 'Pobierz {data.docNumber}.pdf',
          layout: {
            component: 'proxy-service-caller',
          },
          externalApi: {
            serviceCode: 'documents-service',
            endpoint: '/download',
            method: 'GET',
          },
          fileName: '{data.docNumber}.pdf',
        },
        jsonataName: {
          label:
            'Pobierz {nata(data.isPaid ? "Zatwierdzona_" & data.docNumber : "Draft_" & data.docNumber)}.pdf',
          layout: {
            component: 'proxy-service-caller',
          },
          externalApi: {
            serviceCode: 'documents-service',
            endpoint: '/download',
            method: 'GET',
          },
          fileName:
            '{nata(data.isPaid ? "Zatwierdzona_" & data.docNumber : "Draft_" & data.docNumber)}.pdf',
        },
      },
    } as Schema,
  },
};

export const FileNamePriority: Story = {
  name: 'Case: Filename Priority (Header vs Config)',
  parameters: {
    msw: {
      handlers: [
        http.get('/api/v1/services/documents-service/priority-test', () => {
          const blob = new Blob(['To jest zawartość pliku, który powinien mieć nazwę z nagłówka.'], {
            type: 'application/pdf',
          });
          return new HttpResponse(blob, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'attachment; filename="header-wins.pdf"',
            },
          });
        }),
      ],
    },
  },
  args: {
    schema: {
      type: 'object',
      properties: {
        priorityTest: {
          label: 'Pobierz (Nagłówek "header-wins.pdf" vs Config "config-name.pdf")',
          layout: {
            component: 'proxy-service-caller',
          },
          externalApi: {
            serviceCode: 'documents-service',
            endpoint: '/priority-test',
            method: 'GET',
          },
          fileName: 'config-name.pdf',
        },
      },
    } as Schema,
  },
};

export const States: Story = {
  name: 'Case: Loading and Error States',
  args: {
    schema: {
      type: 'object',
      properties: {
        missingConfig: {
          label: 'Błędna konfiguracja',
          layout: {
            component: 'proxy-service-caller',
          },
          // missing externalApi
        },
        readonlyMode: {
          label: 'Tylko do odczytu',

          layout: {
            component: 'proxy-service-caller',
            props: {
              readonly: true,
            },
          },
          externalApi: {
            serviceCode: 'service',
            endpoint: '/test',
            method: 'GET',
          },
        },
      },
    } as Schema,
  },
};
