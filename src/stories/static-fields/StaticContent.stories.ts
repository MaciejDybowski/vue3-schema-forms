// @ts-nocheck
import { expect, within } from 'storybook/test';

import { Schema } from '../../types/schema/Schema';
import { Layout } from '../../types/schema/elements';
import { waitForMountedAsync } from '../editable-fields/utils';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';





export default {
  title: 'Elements/Static/Paragraphs And Headings',
  ...formStoryWrapperTemplate,
};

export const Examples: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        h1: {
          content: 'h1 - Static form text content',
          layout: {
            component: 'static-content',
            tag: 'h1',
          } as Layout,
        },
        h2: {
          content: 'h2- Static form text content',
          layout: {
            component: 'static-content',
            tag: 'h2',
          } as Layout,
        },
        h3: {
          content: 'h3- Static form text content',
          layout: {
            component: 'static-content',
            tag: 'h3',
          } as Layout,
        },
        h4: {
          content: 'h4 - Static form text content',
          layout: {
            component: 'static-content',
            tag: 'h4',
          } as Layout,
        },
        h5: {
          content: 'h5 - Static form text content',
          layout: {
            component: 'static-content',
            tag: 'h5',
          } as Layout,
        },
        paragraph: {
          content: 'p - Static form text content',
          layout: {
            component: 'static-content',
            tag: 'p',
          } as Layout,
        },
        span: {
          content: 'span - Static form text content tag',
          layout: {
            component: 'static-content',
            tag: 'span',
          } as Layout,
        },
        longText: {
          content:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          layout: {
            component: 'static-content',
            tag: 'span',
          } as Layout,
        },
      },
    } as Schema,
  },
};

export const TextWithVariablesAndHTML: Story = {
  name: 'Case: combine text with variables and HTML elements',
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Hello Karol Kowalski!')).toBeInTheDocument();
  },
  args: {
    formModel: {
      data: {
        firstName: 'Karol',
        lastName: 'Kowalski',
        datetime: '2025-03-25T12:37:34.12312',
      },
    },
    schema: {
      type: 'object',
      properties: {
        h2: {
          content: 'Hello {data.firstName} {data.lastName}!',
          layout: {
            component: 'static-content',
            tag: 'h2',
          } as Layout,
        },
        description: {
          content: '<b>{data.firstName}</b>, this span was generated as v-html content.',
          layout: {
            component: 'static-content',
            tag: 'span',
          } as Layout,
        },
      },
    } as Schema,
  },
};

export const NumberVariableInText = {
  name: 'Case: combine text with variables and HTML elements',
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Integer number: 4 and float number: 4.230')).toBeInTheDocument();
  },
  args: {
    formModel: {
      data: {
        int: 4,
        float: 4.23032,
      },
    },
    schema: {
      type: 'object',
      properties: {
        description2: {
          content:
            'It is possible to show numbers in text. Formatter is <kbd>variable:defaultValue:NUMBER:decimalPlaces</kbd>. Default decimal places is 2',
          layout: {
            component: 'static-content',
            tag: 'span',
          } as Layout,
        },
        description: {
          content: 'Integer number: {data.int} and float number: {data.float::NUMBER:3}',
          layout: {
            component: 'static-content',
            tag: 'span',
          } as Layout,
        },
      },
    } as Schema,
  },
};

export const DateAndDatetimeHTML = {
  name: 'Case: combine date/datetime variables and HTML elements',
  play: async ({ canvasElement }) => {
    await waitForMountedAsync();
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Date is: 04/22/2025, datetime is: 03/25/2025 12:37:34 PM'),
    ).toBeInTheDocument();
  },
  args: {
    formModel: {
      data: {
        date: '2025-04-22',
        datetime: '2025-03-25T12:37:34.12312',
      },
    },
    schema: {
      type: 'object',
      properties: {
        description2: {
          content:
            'It is possible to show date and datetime in text. Formatter is <kbd>variable:defaultValue:DATE</kbd> or <kbd>variable:defaultValue:DATETIME </kbd>',
          layout: {
            component: 'static-content',
            tag: 'span',
          } as Layout,
        },
        description: {
          content: 'Date is: {data.date::DATE}, datetime is: {data.datetime::DATETIME}',
          layout: {
            component: 'static-content',
            tag: 'span',
          } as Layout,
        },
      },
    } as Schema,
  },
};

export const JsonataInText: Story = {
  name: 'Case: JSONata function',
  play: async ({ canvasElement }) => {
    await waitForMountedAsync(40);
    const span = canvasElement.querySelector('span div');
    await expect(span).toBeInTheDocument();

    await expect(span.textContent).toContain('Kowalski');
  },
  args: {
    formModel: {
      data: {
        lastName: 'Kowalski',
        datetime: '2025-03-25T12:37:34.12312',
      },
    },
    schema: {
      type: 'object',
      properties: {
        h2: {
          content: 'Hello {data.firstName} {data.lastName}!',
          layout: {
            component: 'static-content',
            tag: 'h2',
          } as Layout,
        },
        description: {
          content:
            '<b>{nata(data.firstName ? data.firstName : data.lastName)}</b>, this span was generated as v-html content. And datetime = {data.datetime:-:DATETIME}',
          layout: {
            component: 'static-content',
            tag: 'span',
          } as Layout,
        },
      },
    } as Schema,
  },
};
