// @ts-nocheck
import { Story } from 'storybook/dist/csf';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { waitForMountedAsync } from '../editable-fields/utils';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Static/ValidationMessagesViewer',
  ...formStoryWrapperTemplate,
};

export const ErrorBlocksForm: Story = {
  name: 'Severity error should block form validation',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    await expect(canvas.getByText('This is an error message')).toBeInTheDocument();

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 200 });

    // Form should be blocked - error message should appear in validation summary
    await expect(canvas.getByText('Alert')).toBeInTheDocument();
  },
  args: {
    validationBehaviour: 'messages',
    formModel: {
      validationMessages: [
        {
          code: 'ERR001',
          message: 'This is an error message',
          severity: 'error',
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        validationMessages: {
          layout: {
            component: 'validation-messages-viewer',
            props: {
              variant: "tonal"
            }
          },
        },
      },
    } as Schema,
  },
};

export const WarningDoesNotBlockForm: Story = {
  name: 'Severity warning should not block form validation',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    await expect(canvas.getByText('This is a warning message')).toBeInTheDocument();

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 200 });

    // Form should NOT be blocked - no "Alert" in validation summary
    await expect(canvas.queryByText('Alert')).not.toBeInTheDocument();
  },
  args: {
    validationBehaviour: 'messages',
    formModel: {
      validationMessages: [
        {
          code: 'WARN001',
          message: 'This is a warning message',
          severity: 'warning',
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        validationMessages: {
          layout: {
            component: 'validation-messages-viewer',
          },
        },
      },
    } as Schema,
  },
};

export const InfoDoesNotBlockForm: Story = {
  name: 'Severity info should not block form validation',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    await expect(canvas.getByText('This is an info message')).toBeInTheDocument();

    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 200 });

    // Form should NOT be blocked - no "Alert" in validation summary
    await expect(canvas.queryByText('Alert')).not.toBeInTheDocument();
  },
  args: {
    validationBehaviour: 'messages',
    formModel: {
      validationMessages: [
        {
          code: 'INFO001',
          message: 'This is an info message',
          severity: 'info',
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        validationMessages: {
          layout: {
            component: 'validation-messages-viewer',
          },
        },
      },
    } as Schema,
  },
};

export const DisableValidationWhenHidden: Story = {
  name: 'Disable validation when hidden - error message should not block form validation',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);

    // Initially the validationMessages field is hidden - form should not be blocked
    const submitButton = canvas.getByText('Validate');
    await userEvent.click(submitButton, { delay: 200 });

    // Error message viewer is hidden and disableValidationWhenHidden is true - no "Alert" in summary
    await expect(canvas.queryByText('Alert')).not.toBeInTheDocument();

    // Show the validation messages viewer by toggling the switch
    const switchField = canvas.getByLabelText('Show messages');
    await userEvent.click(switchField, { delay: 200 });

    await waitFor(() => expect(canvas.getByText('This is an error message')).toBeInTheDocument());

    // Now the field is visible - form should be blocked by the error severity message
    await userEvent.click(submitButton, { delay: 200 });
    await expect(canvas.getByText('Alert')).toBeInTheDocument();
  },
  args: {
    validationBehaviour: 'messages',
    formModel: {
      showMessages: false,
      validationMessages: [
        {
          code: 'ERR001',
          message: 'This is an error message',
          severity: 'error',
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        showMessages: {
          label: 'Show messages',
          layout: {
            component: 'switch',
          },
        },
        validationMessages: {
          disableValidationWhenHidden: true,
          layout: {
            component: 'validation-messages-viewer',
            hide: 'nata(showMessages=false)',
            props: {
              variant: 'tonal',
            },
          },
        },
      },
    } as Schema,
  },
};


