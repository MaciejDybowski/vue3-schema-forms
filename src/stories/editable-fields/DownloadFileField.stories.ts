// @ts-nocheck
import { expect, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Editable/Download File',
  ...formStoryWrapperTemplate,
};

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
            serviceCode: 'download-report',
            method: 'POST',
            endpoint: '/api/reports/{reportId}',
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
      reportId: 'RPT-1',
      lang: 'pl',
      traceId: 'trace-123',
    },
  },
};

export const CardMode: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        download: {
          label: 'Pobierz',
          renderMode: 'card',
          fileName: 'Raport-Kwartalny.pdf',
          fileType: 'PDF',
          status: 'ready',
          externalApi: {
            serviceCode: 'download-file',
            method: 'GET',
            endpoint: '/api/files/{fileId}',
            query: {
              temporary: false,
            },
            params: {
              channel: 'web',
            },
          },
          layout: {
            component: 'download-file',
          },
        },
      },
    } as Schema,
    formModel: {
      fileId: '123',
    },
  },
};
