// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';
import { EngineSourceField } from '../types/engine/controls';
import { Schema } from '../types/schema/Schema';
import { MOCK_FOR_FILE_INPUT } from './mock-responses';





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

export const Story1: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        select: {
          'bg-color': '#f0f0f0',
          layout: {
            component: 'bookmark',
            cols:12
          },
          source: {
            items: [
              { value: 1, title: 'Informacje ogólne' },
              { value: 2, title: '[1] Uprawy rok poprzedni' },
              { value: 3, title: '[2] Umowy rok poprzedni' },
              { value: 4, title: '[3] Szacunkowa produkcja' },
              { value: 5, title: '[4] Dostawy' },
              { value: 6, title: '[5] Stan magazynowy' },
              { value: 7, title: '[6] Zniszeczenie' },
              { value: 8, title: '[7] Uprawy rok bieżący' },
              { value: 9, title: '[8] Umowy Umowy rok bieżący' },
              { value: 10, title: '[9] Dodatkowe informacje/wyjaśnienia' },
              { value: 11, title: 'Pismo' },
              { value: 12, title: 'Załączniki' },
              { value: 13, title: 'Walidacje' },
            ],
          },
        } as EngineSourceField,
      },
    } as Schema,
  },
  parameters: {
    msw: {
      handlers: [...MOCK_FOR_FILE_INPUT],
    },
  },
};
