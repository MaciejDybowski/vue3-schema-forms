// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';



import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';
import { waitForMountedAsync } from './utils';



















































export default {
  title: 'Elements/Editable/PESEL Field',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  name: 'Standard PESEL Field',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('PESEL Number');
    // Valid PESEL: 44051401458 (born 14.05.1944)
    await userEvent.type(field, '44051401458', { delay: 50 });
    await expect(context.args.formModel).toEqual({ pesel: '44051401458' });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'Standard field for entering Polish PESEL number with automatic validation of format, checksum, and birth date.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        pesel: {
          label: 'PESEL Number',
          layout: {
            component: 'pesel-field',
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
    const field = await canvas.getByLabelText('PESEL Number');
    // Too short number
    await userEvent.type(field, '1234567', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const errorMessage = canvas.getByText(/must contain exactly 11 digits/i);
      expect(errorMessage).toBeInTheDocument();
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'Enter a PESEL number that is too short to see the format validation error.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        pesel: {
          label: 'PESEL Number',
          layout: {
            component: 'pesel-field',
          },
        },
      },
    } as Schema,
  },
};

export const ChecksumError: Story = {
  name: 'Validation: Checksum - Error (blocking)',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('PESEL Number');
    // 11 digits with valid date but invalid checksum - should show blocking error
    await userEvent.type(field, '90010100000', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const errorMessage = canvas.getByText(/Invalid PESEL checksum./i);
      expect(errorMessage).toBeInTheDocument();
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'Field with checksum validation as ERROR (blocking). Invalid checksums will block form submission.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        pesel: {
          label: 'PESEL Number',
          checkSumValidation: 'error',
          layout: {
            component: 'pesel-field',
          },
        },
      },
    } as Schema,
  },
};

export const ChecksumWarning: Story = {
  name: 'Validation: Checksum - Warning (non-blocking)',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('PESEL Number');
    // 11 digits with valid date but invalid checksum - should show warning hint, not blocking error
    await userEvent.type(field, '90010100000', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const warningMessage = canvas.getByText(/Invalid PESEL checksum./i);
      expect(warningMessage).toBeInTheDocument();
      expect(warningMessage).toHaveClass('text-warning');
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'Field with checksum validation as WARNING (non-blocking). Invalid checksums will show a warning hint but will NOT block form submission.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        pesel: {
          label: 'PESEL Number',
          checkSumValidation: 'warning',
          layout: {
            component: 'pesel-field',
          },
        },
      },
    } as Schema,
  },
};

export const ValidPesel: Story = {
  name: 'Validation: Valid PESEL',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('PESEL Number');
    // Valid PESEL with correct checksum
    await userEvent.type(field, '44051401458', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      // There should be no error message
      const errorMessages = canvas.queryByText(/Invalid/i);
      expect(errorMessages).toBeNull();
    });
    await expect(context.args.formModel).toEqual({ pesel: '44051401458' });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'A valid PESEL number should pass all validations without errors.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        pesel: {
          label: 'PESEL Number',
          layout: {
            component: 'pesel-field',
          },
        },
      },
    } as Schema,
  },
};

export const RequireAdult: Story = {
  name: 'Validation: Require Adult (18+) - Error',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('PESEL Number (Adult only)');
    // Valid PESEL of a person born on 01.01.2015 (11 years old in 2026 - minor)
    // 15210100008 - valid PESEL with correct checksum
    await userEvent.type(field, '15210100008', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const errorMessage = canvas.getByText(/Person must be at least 18 years old./i);
      expect(errorMessage).toBeInTheDocument();
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'Field with adult validation as ERROR (blocking). Entering a PESEL of a person under 18 will block form submission.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        pesel: {
          label: 'PESEL Number (Adult only)',
          adultsValidation: 'error',
          layout: {
            component: 'pesel-field',
          },
        },
      },
    } as Schema,
  },
};

export const RequireAdultWarning: Story = {
  name: 'Validation: Require Adult (18+) - Warning',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('PESEL Number (Adult recommended)');
    // Valid PESEL of a person born on 01.01.2015 (11 years old in 2026 - minor)
    await userEvent.type(field, '15210100008', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      // Warning should appear as hint, not blocking error
      const warningMessage = canvas.getByText(/Person must be at least 18 years old./i);
      expect(warningMessage).toBeInTheDocument();
      // Check that the warning has orange/warning color class
      expect(warningMessage).toHaveClass('text-warning');
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'Field with adult validation as WARNING (non-blocking). Entering a PESEL of a person under 18 will show a warning hint but will NOT block form submission.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        pesel: {
          label: 'PESEL Number (Adult recommended)',
          adultsValidation: 'warning',
          layout: {
            component: 'pesel-field',
          },
        },
      },
    } as Schema,
  },
};

export const RequiredField: Story = {
  name: 'Validation: Required',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('PESEL Number');
    await userEvent.click(field);
    await userEvent.tab();
    await waitFor(() => {
      const errorMessage = canvas.getByText(/Field is required/i);
      expect(errorMessage).toBeInTheDocument();
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'PESEL field marked as required. Leaving it empty will cause a validation error.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        pesel: {
          label: 'PESEL Number',
          required: true,
          layout: {
            component: 'pesel-field',
          },
        },
      },
      required: ["pesel"]
    } as Schema,
  },
};

export const WithDefaultValue: Story = {
  name: 'With Default Value',
  play: async (context) => {
    await waitForMountedAsync();
    await expect(context.args.formModel).toEqual({ pesel: '44051401458' });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'PESEL field with a predefined default value.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        pesel: {
          label: 'PESEL Number',
          defaultValue: '44051401458',
          layout: {
            component: 'pesel-field',
          },
        },
      },
    } as Schema,
  },
};

export const ReadOnly: Story = {
  name: 'Read Only Mode',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('PESEL Number');
    expect(field).toHaveAttribute('readonly');
  },
  args: {
    formModel: { pesel: '44051401458' },
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'PESEL field in read-only mode. Validations are disabled.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        pesel: {
          label: 'PESEL Number',
          layout: {
            component: 'pesel-field',
            props: {
              readonly: true,
            },
          },
        },
      },
    } as Schema,
  },
};

export const Century2000: Story = {
  name: 'PESEL from 2000s',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('PESEL Number');
    // Valid PESEL of a person born on 01.01.2000
    // Month + 20 for people born in 2000-2099
    // 00210100004 - valid PESEL with correct checksum
    await userEvent.type(field, '00210100004', { delay: 50 });
    await expect(context.args.formModel).toEqual({ pesel: '00210100004' });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'Field supports PESEL numbers of people born after 2000 (month + 20). Example: a person born on 01.01.2000 has the month encoded as 21.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        pesel: {
          label: 'PESEL Number',
          layout: {
            component: 'pesel-field',
          },
        },
      },
    } as Schema,
  },
};

export const NonDigitFiltering: Story = {
  name: 'Auto-filtering Non-digit Characters',
  play: async (context) => {
    await waitForMountedAsync();
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('PESEL Number');
    // Typing text with non-digit characters - should be removed
    await userEvent.type(field, '44-051-401-458', { delay: 50 });
    await waitFor(() => {
      expect(context.args.formModel.pesel).toBe('44051401458');
    });
  },
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'Field automatically removes all non-digit characters. Typing "44-051-401-458" will be automatically converted to "44051401458".',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        pesel: {
          label: 'PESEL Number',
          layout: {
            component: 'pesel-field',
          },
        },
      },
    } as Schema,
  },
};

export const WithHint: Story = {
  name: 'With Hint',
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        pesel: {
          label: 'PESEL Number',
          layout: {
            component: 'pesel-field',
            props: {
              hint: 'Enter an 11-digit PESEL number without spaces or dashes',
              persistentHint: true,
            },
          },
        },
      },
    } as Schema,
  },
};
