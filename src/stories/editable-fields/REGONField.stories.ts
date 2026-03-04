// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';

export default {
  title: 'Elements/Editable/REGON Field',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  name: 'Standard REGON Field (9-digit)',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('REGON');
    // Valid 9-digit REGON: 123456785
    await userEvent.type(field, '123456785', { delay: 50 });
    await expect(context.args.formModel).toEqual({ regon: '123456785' });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            'Field for entering Polish REGON number (9 or 14 digits) with automatic format and checksum validation.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        regon: {
          label: 'REGON',
          layout: {
            component: 'regon-field',
          },
        },
      },
    } as Schema,
  },
};

export const Standard14Digit: Story = {
  name: 'Standard REGON Field (14-digit)',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('REGON');
    // Valid 14-digit REGON: 12345678512347
    await userEvent.type(field, '12345678512347', { delay: 50 });
    await expect(context.args.formModel).toEqual({ regon: '12345678512347' });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            '14-digit REGON is assigned to local units (branches, subsidiaries). First 9 digits are the parent REGON, digits 10-13 are the unit sequence number, digit 14 is the check digit.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        regon: {
          label: 'REGON',
          layout: {
            component: 'regon-field',
          },
        },
      },
    } as Schema,
  },
};

export const ChecksumValidationError: Story = {
  name: 'Checksum Validation: Error mode',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('REGON');
    // Invalid checksum (last digit changed)
    await userEvent.type(field, '123456789', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const errorMessage = canvas.queryByText(/nieprawidłowa suma kontrolna|invalid regon checksum/i);
      expect(errorMessage).not.toBeNull();
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            'When checkSumValidation is set to "error", an incorrect checksum blocks form submission.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        regon: {
          label: 'REGON',
          checkSumValidation: 'error',
          layout: {
            component: 'regon-field',
          },
        },
      },
    } as Schema,
  },
};

export const ChecksumValidationWarning: Story = {
  name: 'Checksum Validation: Warning mode',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('REGON');
    // Invalid checksum (last digit changed)
    await userEvent.type(field, '123456789', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const warningMessage = canvas.queryByText(/nieprawidłowa suma kontrolna|invalid regon checksum/i);
      expect(warningMessage).not.toBeNull();
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            'When checkSumValidation is set to "warning", an incorrect checksum shows a warning hint but does not block form submission.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        regon: {
          label: 'REGON',
          checkSumValidation: 'warning',
          layout: {
            component: 'regon-field',
          },
        },
      },
    } as Schema,
  },
};

export const NoChecksumValidation: Story = {
  name: 'No Checksum Validation',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('REGON');
    // Any 9-digit number accepted without checksum validation
    await userEvent.type(field, '123456789', { delay: 50 });
    await expect(context.args.formModel).toEqual({ regon: '123456789' });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'Without checkSumValidation set, only the format (9 or 14 digits) is validated.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        regon: {
          label: 'REGON',
          layout: {
            component: 'regon-field',
          },
        },
      },
    } as Schema,
  },
};

export const InvalidFormat: Story = {
  name: 'Validation: Invalid Format',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('REGON');
    // 10 digits - invalid length
    await userEvent.type(field, '1234567890', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const errorMessage = canvas.queryByText(/musi składać się z dokładnie|must contain exactly/i);
      expect(errorMessage).not.toBeNull();
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'REGON must be exactly 9 or 14 digits long. Any other length is invalid.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        regon: {
          label: 'REGON',
          checkSumValidation: 'error',
          layout: {
            component: 'regon-field',
          },
        },
      },
    } as Schema,
  },
};

export const RequiredField: Story = {
  name: 'Required REGON Field',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('REGON');
    await userEvent.click(field);
    await userEvent.tab();
    await waitFor(() => {
      const errorMessage = canvas.queryByText(/^Pole jest wymagane\.$|^Field is required\.$/i);
      expect(errorMessage).not.toBeNull();
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      required: ['regon'],
      properties: {
        description: {
          content: 'Pole REGON oznaczone jako obowiązkowe.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        regon: {
          label: 'REGON',
          checkSumValidation: 'error',
          layout: {
            component: 'regon-field',
          },
        },
      },
    } as Schema,
  },
};

export const ValidRegon9WithCorrectChecksum: Story = {
  name: 'Valid 9-digit REGON with correct checksum',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('REGON');
    // Valid REGON: 123456785 (checksum = 5)
    await userEvent.type(field, '123456785', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const errorMessage = canvas.queryByText(/nieprawidłowa suma kontrolna|invalid regon checksum/i);
      expect(errorMessage).toBeNull();
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            'REGON 9-digit checksum algorithm: weights [8,9,2,3,4,5,6,7], sum % 11 (if result == 10 then check digit = 0).',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        regon: {
          label: 'REGON',
          checkSumValidation: 'error',
          layout: {
            component: 'regon-field',
          },
        },
      },
    } as Schema,
  },
};

