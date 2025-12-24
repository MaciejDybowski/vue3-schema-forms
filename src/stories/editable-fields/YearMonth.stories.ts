// @ts-nocheck
import { MOCK_CALENDARS } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Editable/YearMonth',
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
            component: 'year-month',
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
