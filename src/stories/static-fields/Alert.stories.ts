// @ts-nocheck
import { expect, userEvent, within } from 'storybook/test';

import { formStoryWrapperTemplate, playForm } from '../templates/shared-blocks';

export default {
  title: 'Components/Static/Alert',
  ...formStoryWrapperTemplate,
};

export const Default: Story = {
  name: 'Default',
  play: playForm(async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Lorem ipsum...')).toBeInTheDocument();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        alert: {
          content: 'Lorem ipsum...',
          layout: {
            component: 'alert',
            props: {
              variant: 'outlined',
            },
          },
        },
      } as any,
    },
  },
};

export const Info: Story = {
  name: 'Info',
  play: playForm(async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Lorem ipsum...')).toBeInTheDocument();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        alert: {
          content: 'Lorem ipsum...',
          layout: {
            component: 'alert',
            props: {
              type: 'info',
              variant: 'outlined',
            },
          },
        },
      } as any,
    },
  },
};

export const Warning: Story = {
  name: 'Warning',
  play: playForm(async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Lorem ipsum...')).toBeInTheDocument();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        alert: {
          content: 'Lorem ipsum...',
          layout: {
            component: 'alert',
            props: {
              type: 'warning',
              variant: 'outlined',
            },
          },
        },
      } as any,
    },
  },
};

export const Error: Story = {
  name: 'Error',
  play: playForm(async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Lorem ipsum...')).toBeInTheDocument();
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);
    await expect(canvas.getByText('Alert')).toBeInTheDocument();
  }),
  args: {
    validationBehaviour: 'messages',
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        alert: {
          content: 'Lorem ipsum...',
          includeInValidation: true,
          layout: {
            component: 'alert',
            props: {
              type: 'error',
              variant: 'outlined',
            },
          },
        },
      } as any,
    },
  },
};

export const ErrorWithoutTakePartInValidation: Story = {
  name: 'Error Excluded from Validation',
  play: playForm(async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Lorem ipsum...')).toBeInTheDocument();
    const Submit = canvas.getByText('Validate');
    await userEvent.click(Submit);
    await expect(canvas.getByText('Form is valid')).toBeInTheDocument();
  }),
  args: {
    validationBehaviour: 'messages',
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        alert: {
          content: 'Lorem ipsum...',
          layout: {
            component: 'alert',
            props: {
              type: 'error',
              variant: 'outlined',
            },
          },
        },
      } as any,
    },
  },
};

export const CombineWithModelVariables: Story = {
  name: 'Combine with Model Variables',
  play: playForm(async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Is difference between Value A = 123 and Value B = 321'),
    ).toBeInTheDocument();
  }),
  args: {
    formModel: {
      valueA: '123',
      valueB: '321',
    },
    schema: {
      type: 'object',
      properties: {
        alert: {
          content: 'Is difference between Value A = {valueA} and Value B = {valueB}',
          layout: {
            component: 'alert',
            props: {
              type: 'warning',
              variant: 'outlined',
            },
          },
        },
      } as any,
    },
  },
};

export const MemorableState: Story = {
  name: 'Memorable State',
  play: playForm(async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      ),
    ).toBeInTheDocument();
  }),
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        span: {
          content:
            '<p>\n' +
            '  The <strong>alert</strong> component can save its state (e.g. expanded/collapsed) by emitting an event. The parent application is responsible for handling and storing this state.\n' +
            '</p>\n' +
            '\n' +
            '\n' +
            '<pre><code>function changeState() {\n' +
            '  expanded.value = !expanded.value;\n' +
            '  actionHandlerEventBus.emit("form-action", {\n' +
            '    code: "save-form-element-state",\n' +
            '    path: schema.key,\n' +
            '    expanded: expanded.value,\n' +
            '  });\n' +
            '}\n' +
            '</code></pre>\n' +
            '\n' +
            '\n' +
            '<p>\n' +
            '  The saved state should be passed to the form options via <code>context.userInfoProperties.alerts</code>, allowing the alert to restore its state on load.\n' +
            '</p>\n',
          layout: {
            component: 'static-content',
            tag: 'span',
          },
        },
        alert: {
          memorable: true,
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          layout: {
            component: 'alert',
            props: {
              type: 'info',
              variant: 'outlined',
            },
          },
        },
      } as any,
    },
  },
};
