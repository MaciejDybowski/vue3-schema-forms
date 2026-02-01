// @ts-nocheck
import { Story } from 'storybook/dist/csf';
import { expect, userEvent, waitFor, within } from 'storybook/test';



import { Schema } from '../../types/schema/Schema';
import { MOCK_CALENDARS } from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { playWrapper, waitForMountedAsync } from './utils';














export default {
  title: 'Elements/Editable/YearMonth',
  ...formStoryWrapperTemplate,
};

/**
 * Standard YearMonth field without validation
 */
export const Standard: Story = {
  name: 'Standard',
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Period');

    // Click to open picker
    await userEvent.click(field, { delay: 200 });

    // Wait for picker to open
    await waitFor(() => {
      const picker = document.querySelector('.v-date-picker');
      expect(picker).toBeInTheDocument();
    });

    // Find and click Save button
    const saveButton = document.querySelector('.v-date-picker button[class*="bg-surface"]:last-child');
    await userEvent.click(saveButton, { delay: 200 });

    // Verify model is set
    await waitFor(() => {
      expect(context.args.formModel.period).toBeDefined();
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        period: {
          label: 'Period',
          layout: {
            component: 'year-month',
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


/**
 * Test case: Required field validation on form submit
 */
export const RequiredFieldValidation: Story = {
  name: 'Case: Required',
  play: playWrapper(async (context) => {
    /*const canvas = within(context.canvasElement);

    // Click Validate button without entering value
    const validateButton = canvas.getByText('Validate');
    await userEvent.click(validateButton, { delay: 200 });

    // Validation error should appear
    await waitFor(() => {
      const errorMessage = context.canvasElement.querySelector('.v-messages__message');
      expect(errorMessage).toBeInTheDocument();
    });

    // Now enter a value
    const field = canvas.getByLabelText('Period');
    await userEvent.click(field, { delay: 200 });

    // Wait for picker
    await waitFor(() => {
      const picker = document.querySelector('.v-date-picker');
      expect(picker).toBeInTheDocument();
    });

    // Click Save
    const saveButton = document.querySelector('.v-date-picker button[class*="bg-surface"]:last-child');
    await userEvent.click(saveButton, { delay: 200 });

    // Wait and validate again
    await waitForMountedAsync(300);
    await userEvent.click(validateButton, { delay: 200 });

    // Should now be valid
    await waitFor(() => {
      expect(canvas.getByText('Form is valid')).toBeInTheDocument();
    });*/
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        period: {
          label: 'Period',
          layout: {
            component: 'year-month',
          },
        },
      },
      required: ['period'],
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_CALENDARS,
    },
  },
};

/**
 * Test case: With default value
 */
export const WithDefaultValue: Story = {
  name: 'Case: Default value',
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);

    // Should display formatted value
    await waitFor(() => {
      const field = canvas.getByLabelText('Period');
      expect(field).toHaveValue('03/2024');
    });

    // Model should have the value
    expect(context.args.formModel.period).toBe('2024-03');
  }),
  args: {
    formModel: {
      period: '2024-03',
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
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_CALENDARS,
    },
  },
};

/**
 * Test case: Clear value
 */
export const ClearValue: Story = {
  name: 'Case: Clear value',
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);

    // Wait for initial value to be displayed
    await waitFor(() => {
      const field = canvas.getByLabelText('Period');
      expect(field).toHaveValue('06/2025');
    });

    // Find and click clear button
    const clearButton = context.canvasElement.querySelector('.v-icon--clickable');
    if (clearButton) {
      await userEvent.click(clearButton, { delay: 200 });
    }

    // Wait for value to be cleared
    await waitFor(() => {
      expect(context.args.formModel.period).toBeFalsy();
    });
  }),
  args: {
    formModel: {
      period: '2025-06',
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
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: MOCK_CALENDARS,
    },
  },
};

/**
 * Test case: Readonly field should not open picker
 */
export const ReadonlyField: Story = {
  name: 'Case: Readonly field',
  play: playWrapper(async (context) => {
    const canvas = within(context.canvasElement);
    const field = canvas.getByLabelText('Period');

    // Click should not open picker
    await userEvent.click(field, { delay: 200 });
    await waitForMountedAsync(300);

    // Picker should not be visible
    const picker = document.querySelector('.v-date-picker');
    expect(picker).not.toBeInTheDocument();

    // Value should still be displayed
    expect(field).toHaveValue('01/2024');
  }),
  args: {
    formModel: {
      period: '2024-01',
    },
    schema: {
      type: 'object',
      properties: {
        period: {
          label: 'Period',
          layout: {
            component: 'year-month',
            props: {
              readonly: true,
            },
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
