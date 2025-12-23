// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import { Schema } from '../types/schema/Schema';
import { MOCK_CALENDARS } from './mock-responses';





export default {
  title: 'Development Area',
  component: FormStoryWrapper,
  args: {
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
      buttonProps: {
        size: 'small',
        variant: 'elevated',
        rounded: '',
      },
    },
  },
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;

export const CalendarAutocomplete: Story = {
  play: async (context) => {},
  args: {
    formModel: {
      period: '2021-12',
    },
    schema: {
      type: 'object',
      properties: {
        period: {
          label: 'Period',
          layout: {
            component: 'year-month',
          },
        },
        calendar: {
          label: 'Select calendar',
          layout: {
            component: 'calendar-autocomplete',
          },
          source: {
            url: '/mocks/calendars',
            title: 'label',
            value: 'id',
          },
        },
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_CALENDARS,
    },
  },
};
