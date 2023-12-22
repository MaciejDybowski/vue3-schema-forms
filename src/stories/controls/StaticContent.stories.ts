// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3';
import { Schema } from '@/vocabulary/schema';
import { VueSchemaForms } from '@/components';
import { Layout } from '@/vocabulary/schema/elements';

const meta = {
  title: 'Forms/Static content',
  component: VueSchemaForms,
  tags: ['autodocs'],
  argTypes: {
    schema: {
      control: 'object',
      description: 'Schema' /*table: { disable: true }*/,
    },
    modelValue: {
      control: 'object',
      description: 'Model' /*table: { disable: true }*/,
    },
    options: {
      control: 'object',
      description: 'Opcje' /*table: { disable: true }*/,
    },
    'update:modelValue': { table: { disable: true } },
  },
  args: {
    modelValue: {},
    options: {},
  },
  parameters: {
    controls: { hideNoControlsWarning: true }, //https://github.com/storybookjs/storybook/issues/24422
  },
} satisfies Meta<typeof VueSchemaForms>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Examples: Story = {
  args: {
    modelValue: {},
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
  args: {
    modelValue: {
      data: {
        firstName: 'Maciej',
        lastName: 'Dybowski',
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


