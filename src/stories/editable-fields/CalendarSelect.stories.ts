// @ts-nocheck
import { MOCK_CALENDARS } from '../mock-responses';
import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Editable/CalendarSelect',
  ...formStoryWrapperTemplate,
};

// TODO - testy

export const Standard: Story = {
  name: 'Standard',
  play: playForm(async (context) => {}),
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
  },
};
