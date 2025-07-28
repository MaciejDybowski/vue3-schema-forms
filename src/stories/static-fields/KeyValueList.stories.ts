import { formStoryWrapperTemplate } from '../templates/shared-blocks';

export default {
  title: 'Elements/Static/Key-Value List',
  ...formStoryWrapperTemplate,
};

export const Standard = {
  args: {
    formModel: {
      keyValueList: [
        { label: 'Nazwa', value: 'Bedframe + bedsides', temp: '123' },
        { label: 'EAN', value: '5904767831813' },
        { label: 'Program', value: 'ARYSTYDA' },
        { label: 'Funkcja', value: 'Sleeping' },
        { label: 'Typ mebla', value: 'Bedframes' },
        { label: 'Oznaczenie', value: '2SK' },
        { label: 'Oświetlenie', value: '0 [lm]', test: { item: 'qwerty' } },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        keyValueList: {
          label: 'Pole do pokazania listy klucz wartosc',
          config: [
            { title: 'Pole', valueMapping: 'label' },
            { title: 'Wartość', valueMapping: 'value' },
            { title: 'Test.item', valueMapping: 'test.item' },
          ],
          layout: {
            component: 'key-value-list',
            cols: 6,
          },
        },
      },
      i18n: {},
    },
  },
  parameters: {},
};


export const AnyArrayFromModel = {
  args: {
    formModel: {
      items: [
        { label: 'Nazwa', value: 'Bedframe + bedsides', temp: '123' },
        { label: 'EAN', value: '5904767831813' },
        { label: 'Program', value: 'ARYSTYDA' },
        { label: 'Funkcja', value: 'Sleeping' },
        { label: 'Typ mebla', value: 'Bedframes' },
        { label: 'Oznaczenie', value: '2SK' },
        { label: 'Oświetlenie', value: '0 [lm]', test: { item: 'qwerty' } },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        keyValueList: {
          label: 'Pole do pokazania listy klucz wartosc',
          sourcePath: "items",
          config: [
            { title: 'Pole', valueMapping: 'label' },
            { title: 'Wartość', valueMapping: 'value' },
            { title: 'Test.item', valueMapping: 'test.item' },
          ],
          layout: {
            component: 'key-value-list',
            cols: 6,
          },
        },
      },
      i18n: {},
    },
  },
  parameters: {},
};