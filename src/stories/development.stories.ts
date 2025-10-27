// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';





export default {
  title: 'Development Area',
  component: FormStoryWrapper,
  args: {
    formModel: {},
    schema: {},
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
      },
      buttonProps: {
        size: 'small',
        variant: 'elevated',
        rounded: '',
      },
    },
  },
} satisfies Meta<typeof FormStoryWrapper>;

type Story = StoryObj<typeof FormStoryWrapper>;

export const Story3: Story = {
  args: {
    formModel: {
      text: '<p>Kurs ecsc</p><p>zegrze </p><h1>Karol</h1><ol><li><p>1</p></li><li><p>2</p></li><li><p>3</p></li><li><p>4</p></li><li><p>5</p></li><li><p>6</p></li></ol><p></p>',
    },
    schema: {
      type: 'object',
      properties: {
        text: {
          layout: {
            component: 'text-editor',
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [],
    },
  },
};

export const Story2: Story = {
  args: {
    formModel: {
      markdownTable:
        '# Markdown syntax guide\n' +
        '\n' +
        '## Headers\n' +
        '\n' +
        '# This is a Heading h1\n' +
        '## This is a Heading h2\n' +
        '###### This is a Heading h6\n' +
        '\n' +
        '## Emphasis\n' +
        '\n' +
        '*This text will be italic*  \n' +
        '_This will also be italic_\n' +
        '\n' +
        '**This text will be bold**  \n' +
        '__This will also be bold__\n' +
        '\n' +
        '_You **can** combine them_\n' +
        '\n' +
        '## Lists\n' +
        '\n' +
        '### Unordered\n' +
        '\n' +
        '* Item 1\n' +
        '* Item 2\n' +
        '* Item 2a\n' +
        '* Item 2b\n' +
        '    * Item 3a\n' +
        '    * Item 3b\n' +
        '\n' +
        '### Ordered\n' +
        '\n' +
        '1. Item 1\n' +
        '2. Item 2\n' +
        '3. Item 3\n' +
        '    1. Item 3a\n' +
        '    2. Item 3b\n' +
        '\n' +
        '## Images\n' +
        '\n' +
        '![This is an alt text.](/image/sample.webp "This is a sample image.")\n' +
        '\n' +
        '## Links\n' +
        '\n' +
        'You may be using [Markdown Live Preview](https://markdownlivepreview.com/).\n' +
        '\n' +
        '## Blockquotes\n' +
        '\n' +
        '> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.\n' +
        '>\n' +
        '>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.\n' +
        '\n' +
        '## Tables\n' +
        '\n' +
        '| Left columns  | Right columns |\n' +
        '| ------------- |:-------------:|\n' +
        '| left foo      | right foo     |\n' +
        '| left bar      | right bar     |\n' +
        '| left baz      | right baz     |\n' +
        '\n' +
        '## Blocks of code\n' +
        '\n' +
        '```\n' +
        "let message = 'Hello world';\n" +
        'alert(message);\n' +
        '```\n' +
        '\n' +
        '## Inline code\n' +
        '\n' +
        'This web site is using `markedjs/marked`.\n',
    },
    schema: {
      type: 'object',
      properties: {
        markdownTable: {
          label: 'Transport Rate',
          layout: {
            component: 'markdown',
          },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [],
    },
  },
};
