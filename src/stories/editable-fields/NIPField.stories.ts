// @ts-nocheck
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Editable/NIP Field',
  ...formStoryWrapperTemplate,
};

export const Standard: Story = {
  name: 'Standard NIP Field (Polish)',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('NIP/VAT ID');
    // Valid Polish NIP: 1234563218
    await userEvent.type(field, '1234563218', { delay: 50 });
    await expect(context.args.formModel).toEqual({ nip: '1234563218' });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            'Field for entering Polish NIP or European VAT ID with automatic format and checksum validation.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        nip: {
          label: 'NIP/VAT ID',
          layout: {
            component: 'nip-field',
          },
        },
      },
    } as Schema,
  },
};

export const PolishNipWithPrefix: Story = {
  name: 'Polish NIP with Pl Prefix',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('NIP/VAT ID');
    await userEvent.type(field, 'PL1234563218', { delay: 50 });
    await expect(context.args.formModel).toEqual({ nip: 'PL1234563218' });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        nip: {
          label: 'NIP/VAT ID',
          checkSumValidation: 'error',
          layout: {
            component: 'nip-field',
          },
        },
      },
    } as Schema,
  },
};

export const GermanVatId: Story = {
  name: 'German Vat ID (De)',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('NIP/VAT ID');
    // Valid German VAT: DE111111125 (passes checksum)
    await userEvent.type(field, 'DE111111125', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const errorMessages = canvas.queryByText(/Invalid/i);
      expect(errorMessages).toBeNull();
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'German VAT ID format: DE + 9 digits (first digit cannot be 0).',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        nip: {
          label: 'NIP/VAT ID',
          checkSumValidation: 'error',
          layout: {
            component: 'nip-field',
          },
        },
      },
    } as Schema,
  },
};

export const FrenchVatId: Story = {
  name: 'French Vat ID (Fr)',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('NIP/VAT ID');
    // Valid French VAT: FR40303265045
    await userEvent.type(field, 'FR40303265045', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const errorMessages = canvas.queryByText(/Invalid/i);
      expect(errorMessages).toBeNull();
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'French VAT ID format: FR + 2 check digits + 9 digit SIREN.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        nip: {
          label: 'NIP/VAT ID',
          checkSumValidation: 'error',
          layout: {
            component: 'nip-field',
          },
        },
      },
    } as Schema,
  },
};

export const ItalianVatId: Story = {
  name: 'Italian Vat ID (It)',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('NIP/VAT ID');
    // Valid Italian VAT: IT12345670017
    await userEvent.type(field, 'IT12345670017', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const errorMessages = canvas.queryByText(/Invalid/i);
      expect(errorMessages).toBeNull();
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'Italian VAT ID format: IT + 11 digits.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        nip: {
          label: 'NIP/VAT ID',
          checkSumValidation: 'error',
          layout: {
            component: 'nip-field',
          },
        },
      },
    } as Schema,
  },
};

export const BritishVatId: Story = {
  name: 'British Vat ID (Gb)',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('NIP/VAT ID');
    // Valid GB VAT: GB434031494 (passes checksum - new algorithm)
    await userEvent.type(field, 'GB434031494', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const errorMessages = canvas.queryByText(/Invalid/i);
      expect(errorMessages).toBeNull();
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content: 'British VAT ID format: GB + 9 or 12 digits, or GD/HA + 3 digits.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        nip: {
          label: 'NIP/VAT ID',
          checkSumValidation: 'error',
          layout: {
            component: 'nip-field',
          },
        },
      },
    } as Schema,
  },
};

export const InvalidFormat: Story = {
  name: 'Invalid Format Validation',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('NIP/VAT ID');
    // Invalid format
    await userEvent.type(field, 'XX12345', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const errorMessage = canvas.getByText(/Invalid.*format/i);
      expect(errorMessage).toBeInTheDocument();
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        nip: {
          label: 'NIP/VAT ID',
          layout: {
            component: 'nip-field',
          },
        },
      },
    } as Schema,
  },
};

export const ChecksumError: Story = {
  name: 'Checksum - Error (Blocking) Validation',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('NIP/VAT ID');
    // Invalid Polish NIP checksum
    await userEvent.type(field, '1234567890', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const errorMessage = canvas.getByText(/Invalid.*checksum/i);
      expect(errorMessage).toBeInTheDocument();
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        nip: {
          label: 'NIP/VAT ID',
          checkSumValidation: 'error',
          layout: {
            component: 'nip-field',
          },
        },
      },
    } as Schema,
  },
};

export const ChecksumWarning: Story = {
  name: 'Checksum - Warning (Non - Blocking) Validation',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('NIP/VAT ID');
    await userEvent.type(field, '1234567890', { delay: 50 });
    await userEvent.tab();
    await waitFor(() => {
      const warningMessage = canvas.getByText(/Invalid.*checksum/i);
      expect(warningMessage).toBeInTheDocument();
      expect(warningMessage).toHaveClass('text-warning');
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        nip: {
          label: 'NIP/VAT ID',
          checkSumValidation: 'warning',
          layout: {
            component: 'nip-field',
          },
        },
      },
    } as Schema,
  },
};

export const RequiredField: Story = {
  name: 'Required Validation',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('NIP/VAT ID');
    await userEvent.click(field);
    await userEvent.tab();
    await waitFor(() => {
      const errorMessage = canvas.getByText(/Field is required/i);
      expect(errorMessage).toBeInTheDocument();
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        nip: {
          label: 'NIP/VAT ID',
          required: true,
          layout: {
            component: 'nip-field',
          },
        },
      },
      required: ['nip'],
    } as Schema,
  },
};

export const AutoNormalization: Story = {
  name: 'Auto - Normalization (Spaces, Dashes, Lowercase)',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('NIP/VAT ID');
    // Input with spaces, dashes and lowercase
    await userEvent.type(field, 'pl 123-456-32-18', { delay: 50 });
    await waitFor(() => {
      expect(context.args.formModel.nip).toBe('PL1234563218');
    });
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        description: {
          content:
            'Field automatically normalizes input: removes spaces, dots, dashes and converts to uppercase.',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        nip: {
          label: 'NIP/VAT ID',
          layout: {
            component: 'nip-field',
          },
        },
      },
    } as Schema,
  },
};

export const ReadOnly: Story = {
  name: 'Read Only Mode',
  play: playForm(async (context) => {
    const canvas = within(context.canvasElement);
    const field = await canvas.getByLabelText('NIP/VAT ID');
    expect(field).toHaveAttribute('readonly');
  }),
  args: {
    formModel: { nip: 'DE111111125' },
    schema: {
      type: 'object',
      properties: {
        nip: {
          label: 'NIP/VAT ID',
          layout: {
            component: 'nip-field',
            props: {
              readonly: true,
            },
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
        nip: {
          label: 'NIP/VAT ID',
          layout: {
            component: 'nip-field',
            props: {
              hint: 'Enter Polish NIP (10 digits) or EU VAT ID (e.g., DE123456789, FR12345678901)',
              persistentHint: true,
            },
          },
        },
      },
    } as Schema,
  },
};
