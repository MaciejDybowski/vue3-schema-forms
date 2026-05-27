// @ts-nocheck
import { HttpResponse, http } from 'msw';

import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Editable/Attachment Image Picker',
  ...formStoryWrapperTemplate,
};

const files = [
  {
    id: 'f9ccb0d3-1560-44e8-a91c-73447d96413d',
    filename: 'krists-sidlovskis-a1dAc9_-gYk-unsplash',
    filesize: 3842709,
    mediaType: 'jpg',
    description: null,
    labels: [],
    createdAt: '2026-05-27T05:01:42.655058Z',
    isEditable: true,
  },
  {
    id: '4c32861e-d591-4924-beb5-a353d4433ffc',
    filename: 'Wersja 1/',
    filesize: 0,
    mediaType: '',
  },
  {
    id: '54427cdb-4fb8-42c2-867f-ac61b51c6c87',
    filename: '/Wersja 1/thilak-mohan-fBgeVKhtLOI-unsplash',
    filesize: 3301932,
    mediaType: 'jpg',
    description: null,
    labels: [],
    createdAt: '2026-05-27T05:02:10.813969Z',
    isEditable: true,
  },
  {
    id: 'e8ad3502-a97f-4160-b690-70a29b8bb0cd',
    filename: '/Wersja 1/etienne-girardet-NGb91VwnOWY-unsplash',
    filesize: 768766,
    mediaType: 'jpg',
    description: null,
    labels: [],
    createdAt: '2026-05-27T05:02:12.522247Z',
    isEditable: true,
  },
  {
    id: '5badad01-0f11-4e66-9d7a-c69f7b0d386a',
    filename: 'Wersja 2/',
    filesize: 0,
    mediaType: '',
  },
  {
    id: '5904e252-f84a-4db6-a08a-4f9f0d3d317a',
    filename: '/Wersja 2/reinaldo-EQz1tZWS1hM-unsplash',
    filesize: 2145903,
    mediaType: 'jpg',
    description: null,
    labels: [],
    createdAt: '2026-05-27T05:02:40.619729Z',
    isEditable: true,
  },
  {
    id: 'ff73813f-ee75-437e-9117-37c3ef0efaba',
    filename: '/Wersja 2/malcolm-lightbody-bIGNR9azHoU-unsplash',
    filesize: 4267483,
    mediaType: 'jpg',
    description: null,
    labels: [],
    createdAt: '2026-05-27T05:02:48.784742Z',
    isEditable: true,
  },
  {
    id: '76f8f9db-e67a-422e-96e1-76c51564dad1',
    filename: 'Wersja 3/',
    filesize: 0,
    mediaType: '',
  },
  {
    id: 'fc043f4e-f697-4ccf-ae29-56e2e032f2f5',
    filename: '/Wersja 3/karen-alsop-8M8xi-5o2cA-unsplash',
    filesize: 1865471,
    mediaType: 'jpg',
    description: null,
    labels: [],
    createdAt: '2026-05-27T05:03:17.973866Z',
    isEditable: true,
  },
  {
    id: '1809f963-4251-4d8e-a38c-38c4f3f02574',
    filename: '/Wersja 3/Wersja 3-1/',
    filesize: 0,
    mediaType: '',
  },
  {
    id: 'ba99749f-bd3e-481b-ad01-4d2996d923ee',
    filename: '/Wersja 3/Wersja 3-1/david-von-diemar-0BZcsD8UVmM-unsplash',
    filesize: 2152044,
    mediaType: 'jpg',
    description: null,
    labels: [],
    createdAt: '2026-05-27T05:05:41.306077Z',
    isEditable: true,
  },
];

const colors = ['#5661f2', '#18a058', '#f59e0b', '#dc2626', '#0ea5e9', '#9333ea'];

function imageSvg(id) {
  const index = files.findIndex((file) => file.id === id);
  const color = colors[Math.max(index, 0) % colors.length];
  const title =
    files
      .find((file) => file.id === id)
      ?.filename?.split('/')
      .filter(Boolean)
      .pop() || id;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="${color}"/>
        <stop offset="1" stop-color="#111827"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#g)"/>
    <circle cx="220" cy="180" r="120" fill="rgba(255,255,255,.16)"/>
    <circle cx="1000" cy="620" r="180" fill="rgba(255,255,255,.12)"/>
    <text x="80" y="430" font-family="Arial, sans-serif" font-size="58" font-weight="700" fill="white">${title}</text>
    <text x="84" y="500" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,.78)">Mock attachment image</text>
  </svg>`;
}

const handlers = [
  http.get('/api/v1/features/:menuFeatureId/files', () => {
    return HttpResponse.json(files);
  }),
  http.get('/api/v1/features/:menuFeatureId/files/:fileId/content', ({ params }) => {
    return new HttpResponse(imageSvg(params.fileId), {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  }),
];

const schema = (mode = 'grid', props = {}, controlProps = {}) => ({
  type: 'object',
  properties: {
    designDataId: {
      label: 'Data ID źródła załączników',
      layout: {
        component: 'text-field',
      },
    },
    selectedPhotos: {
      label: 'Zdjęcia z załączników',
      source: {
        menuFeatureId: 'design-details',
        dataIdPath: '{designDataId}',
      },
      mode,
      ...controlProps,
      layout: {
        component: 'attachment-image-picker',
        props,
      },
    },
  },
});

export const Grid = {
  args: {
    formModel: {
      designDataId: '85d2691a-ed25-4878-9d87-a4dbac86081d',
      selectedPhotos: [],
    },
    schema: schema('grid'),
  },
  parameters: {
    msw: {
      handlers,
    },
  },
};

export const Carousel = {
  args: {
    formModel: {
      designDataId: '85d2691a-ed25-4878-9d87-a4dbac86081d',
      selectedPhotos: [],
    },
    schema: schema('carousel'),
  },
  parameters: {
    msw: {
      handlers,
    },
  },
};

export const FolderSelect = {
  args: {
    formModel: {
      designDataId: '85d2691a-ed25-4878-9d87-a4dbac86081d',
      selectedPhotos: [],
    },
    schema: schema('grid', {}, { folderViewMode: 'select' }),
  },
  parameters: {
    msw: {
      handlers,
    },
  },
};

export const Readonly = {
  args: {
    formModel: {
      designDataId: '85d2691a-ed25-4878-9d87-a4dbac86081d',
      selectedPhotos: [
        {
          id: '54427cdb-4fb8-42c2-867f-ac61b51c6c87',
          filename: '/Wersja 1/thilak-mohan-fBgeVKhtLOI-unsplash',
          mediaType: 'jpg',
          menuFeatureId: 'design-details',
          dataId: '85d2691a-ed25-4878-9d87-a4dbac86081d',
          contentUrl:
            '/api/v1/features/design-details/files/54427cdb-4fb8-42c2-867f-ac61b51c6c87/content?dataId=85d2691a-ed25-4878-9d87-a4dbac86081d',
        },
      ],
    },
    schema: schema('grid', { readonly: true }),
  },
  parameters: {
    msw: {
      handlers,
    },
  },
};
