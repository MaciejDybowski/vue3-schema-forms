// @ts-nocheck
import { MOCK_CALENDARS } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Editable/YearAndMonth',
  ...formStoryWrapperTemplate,
};

// TODO - testy

export const Standard: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      properties: {
        period: {
          label: 'Period',
          layout: {
            component: 'year-and-month',
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: MOCK_CALENDARS,
    },
  },
};
