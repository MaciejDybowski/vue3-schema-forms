// @ts-nocheck
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { MOCK_CALENDARS } from "../mock-responses";

export default {
  title: 'Elements/Editable/CalendarSelect',
  ...formStoryWrapperTemplate,
};

// TODO - testy

export const Standard: Story = {
  play: async (context) => {},
  args: {
    formModel: {},
    schema: {
      properties: {
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
    },
  },
  parameters: {
    msw: {
      handlers: MOCK_CALENDARS,
    },
  }
};
