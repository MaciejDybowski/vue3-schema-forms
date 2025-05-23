// @ts-nocheck
import { initialize } from 'msw-storybook-addon';

import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Static/Markdown',
  ...formStoryWrapperTemplate,
};

export const MarkdownTable: Story = {
  play: async (context) => {},
  args: {
    formModel: {
      dataId: '0195d1b7-8c56-75cf-836f-0da2c18ecd4c',
      name: 'zadbano.pl dla konsumenta',
      baseFuelPrice: null,
      currentFuelPrice: null,
      fuelSurchargeMultiplier: null,
      currency: {
        id: 'PLN',
        label: 'Zloty',
      },
      transportRate: {
        markdownTable:
          '| Max Volume (m³) \\ Max Weight (kg) | 60.00 | 120.00 | 180.00 | 240.00 | 300.00 | 405.00 | 510.00 | 600.00 |\n|-------|--------|--------|--------|--------|--------|--------|--------|\n| N/A | 49 | 99 | 149 | 199 | 249 | 349 | 399 | 449 |',
        csvTable:
          'Max_Volume_(m³)_\\_Max_Weight_(kg)\t60.00\t120.00\t180.00\t240.00\t300.00\t405.00\t510.00\t600.00\nN/A\t49\t99\t149\t199\t249\t349\t399\t449',
      },
    },
    schema: {
      type: 'object',
      properties: {
        name: {
          label: 'Name',
          layout: {
            component: 'text-field',
          },
        },
        currency: {
          label: 'Currency',
          layout: {
            component: 'dictionary',
          },
          source: {
            url: '/api/dictionaries?feature-id=currencies&lm=name&vm=dataId',
            title: 'label',
            value: 'id',
            returnObject: true,
            lazy: true,
            singleOptionAutoSelect: true,
          },
        },
        baseFuelPrice: {
          label: 'Base Fuel Price',
          layout: {
            component: 'number-field',
          },
          type: 'float',
          precision: '4',
          precisionMin: '',
        },
        currentFuelPrice: {
          label: 'Current Fuel Price',
          layout: {
            component: 'number-field',
          },
          type: 'float',
          precision: '4',
          precisionMin: '',
        },
        fuelSurchargeMultiplier: {
          label: 'Fuel Surcharge Multiplier',
          layout: {
            component: 'number-field',
          },
          type: 'float',
          precision: '2',
          precisionMin: '2',
        },
        'divider-477': {
          layout: {
            component: 'divider',
          },
        },
        'static-content-052': {
          content: 'Transport Rate',
          layout: {
            component: 'static-content',
            tag: 'h3',
          },
        },
        transportRate: {
          properties: {
            markdownTable: {
              label: 'Transport Rate',
              layout: {
                component: 'markdown',
              },
            },
          },
        },
      },
      required: ['name', 'currency'],
    },
  },
};
