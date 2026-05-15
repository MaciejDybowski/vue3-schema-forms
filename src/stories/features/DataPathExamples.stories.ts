// @ts-nocheck
import { Story } from 'storybook/dist/csf';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import {
  GROUP_INPUT_MOCKS,
  LOCATION_MOCK_REQUEST,
  MOCK_REQUEST_CURRENCY,
  MULTI_ORDERED_SELECT_MOCK,
  USER_INPUT_MOCKS,
} from '../mock-responses';
import { formStoryWrapperTemplate } from '../templates/shared-blocks';

const simpleItems = [
  { value: 'one', title: 'Option 1' },
  { value: 'two', title: 'Option 2' },
  { value: 'three', title: 'Option 3' },
];

async function clearAndType(element: HTMLElement, value: string) {
  await userEvent.clear(element);
  await userEvent.type(element, value, { delay: 20 });
}

async function selectListItem(field: HTMLElement, index: number) {
  await userEvent.click(field, { pointerEventsCheck: 0, delay: 50 });
  await waitFor(() => {
    expect(document.querySelectorAll('.v-list-item').length).toBeGreaterThan(index);
  });
  await userEvent.click(document.querySelectorAll('.v-list-item')[index], {
    pointerEventsCheck: 0,
    delay: 50,
  });
}

async function waitForFormReady(context: any) {
  await waitFor(() => {
    expect(context.args.signals.formIsReady).toBe(true);
  });
}

export default {
  title: 'Features/DataPathExamples',
  ...formStoryWrapperTemplate,
};

export const BasicEditableFields: Story = {
  name: 'Basic editable fields',
  play: async (context) => {
    await waitForFormReady(context);
    const canvas = within(context.canvasElement);

    await clearAndType(canvas.getByLabelText('Text field'), 'Text updated by dataPath');
    await waitFor(() => {
      expect(context.args.formModel.data.text).toBe('Text updated by dataPath');
    });

    await clearAndType(canvas.getByLabelText('Text area'), 'Textarea updated by dataPath');
    await waitFor(() => {
      expect(context.args.formModel.data.textarea).toBe('Textarea updated by dataPath');
    });

    await clearAndType(canvas.getByLabelText('Number field'), '42.5');
    await waitFor(() => {
      expect(context.args.formModel.data.number).toBe(42.5);
    });

    await userEvent.click(canvas.getByLabelText('Switch'), { delay: 50 });
    await waitFor(() => {
      expect(context.args.formModel.data.switchValue).toBe(false);
    });

    await selectListItem(canvas.getByLabelText('Select'), 0);
    await waitFor(() => {
      expect(context.args.formModel.data.select).toBe('one');
    });
  },
  args: {
    formModel: {
      data: {
        text: 'Initial text from dataPath',
        textarea: 'Initial textarea from dataPath',
        number: 12.34,
        switchValue: true,
        date: '2026-05-14',
        datetime: '2026-05-14T10:30:00.000Z',
        phone: '+48510333202',
        color: '#00ff00',
        select: 'two',
        radio: 'one',
        checkbox: ['one', 'three'],
        yearMonth: '2026-05',
      },
    },
    schema: {
      type: 'object',
      properties: {
        textAlias: {
          dataPath: 'data.text',
          label: 'Text field',
          layout: { component: 'text-field', cols: 6 },
        },
        textareaAlias: {
          dataPath: 'data.textarea',
          label: 'Text area',
          layout: { component: 'text-area', cols: 6 },
        },
        numberAlias: {
          dataPath: 'data.number',
          label: 'Number field',
          type: 'float',
          precision: 2,
          layout: { component: 'number-field', cols: 4 },
        },
        switchAlias: {
          dataPath: 'data.switchValue',
          label: 'Switch',
          layout: { component: 'switch', cols: 4 },
        },
        dateAlias: {
          dataPath: 'data.date',
          label: 'Date picker',
          layout: { component: 'date-picker', cols: 4 },
        },
        dateTimeAlias: {
          dataPath: 'data.datetime',
          label: 'Date time picker',
          layout: { component: 'date-time-picker', cols: 4 },
        },
        phoneAlias: {
          dataPath: 'data.phone',
          label: 'Phone',
          layout: { component: 'phone', cols: 4 },
        },
        colorAlias: {
          dataPath: 'data.color',
          label: 'Color picker',
          layout: { component: 'color-picker', cols: 4 },
        },
        selectAlias: {
          dataPath: 'data.select',
          label: 'Select',
          layout: { component: 'select', cols: 4 },
          source: { items: simpleItems },
        },
        radioAlias: {
          dataPath: 'data.radio',
          label: 'Radio button',
          layout: { component: 'radio-button', cols: 4 },
          source: { items: simpleItems },
        },
        checkboxAlias: {
          dataPath: 'data.checkbox',
          label: 'Checkbox',
          layout: { component: 'checkbox', cols: 4 },
          source: { multiple: true, items: simpleItems },
        },
        yearMonthAlias: {
          dataPath: 'data.yearMonth',
          label: 'Year month',
          layout: { component: 'year-month', cols: 4 },
        },
      },
    },
  },
};

export const DefaultsAndDerivedValues: Story = {
  name: 'Defaults, calculation and dependency',
  play: async (context) => {
    await waitForFormReady(context);
    const canvas = within(context.canvasElement);

    await waitFor(() => {
      expect(context.args.formModel.target.defaultText).toBe('Default saved by dataPath');
      expect(context.args.formModel.target.total).toBe(20);
      expect(context.args.formModel.target.dependencyResult).toBe('Dependency value');
    });

    await clearAndType(canvas.getByLabelText('Dependency source'), 'Dependency changed');
    await waitFor(() => {
      expect(context.args.formModel.source.dependencySource).toBe('Dependency changed');
      expect(context.args.formModel.target.dependencyResult).toBe('Dependency changed');
    });
  },
  args: {
    formModel: {
      source: {
        price: 10,
        quantity: 2,
        dependencySource: 'Dependency value',
      },
    },
    schema: {
      type: 'object',
      properties: {
        generatedDefaultAlias: {
          dataPath: 'target.defaultText',
          label: 'Default text',
          defaultValue: 'Default saved by dataPath',
          layout: { component: 'text-field', cols: 6 },
        },
        calculatedAlias: {
          dataPath: 'target.total',
          label: 'Calculated total',
          type: 'float',
          precision: 2,
          calculation: 'source.price * source.quantity',
          layout: { component: 'number-field', cols: 6 },
        },
        dependencyAlias: {
          dataPath: 'target.dependencyResult',
          label: 'Dependency result',
          dependency: 'source.dependencySource',
          dependencyTriggers: ['source.dependencySource'],
          layout: { component: 'text-field', cols: 6 },
        },
        dependencySourceAlias: {
          dataPath: 'source.dependencySource',
          label: 'Dependency source',
          layout: { component: 'text-field', cols: 6 },
        },
      },
    },
  },
};

export const TransparentContainers: Story = {
  name: 'Fields group, card and expansion panels',
  play: async (context) => {
    await waitForFormReady(context);
    const canvas = within(context.canvasElement);

    await clearAndType(canvas.getByLabelText('Text in fields group'), 'Updated in fields group');
    await waitFor(() => {
      expect(context.args.formModel.containers.groupText).toBe('Updated in fields group');
    });

    await clearAndType(canvas.getByLabelText('Text in card'), 'Updated in card');
    await waitFor(() => {
      expect(context.args.formModel.containers.cardText).toBe('Updated in card');
    });

    await clearAndType(canvas.getByLabelText('Text in expansion panel'), 'Updated in panel');
    await waitFor(() => {
      expect(context.args.formModel.containers.panelText).toBe('Updated in panel');
    });
  },
  args: {
    formModel: {
      containers: {
        groupText: 'Fields group value',
        cardText: 'Card value',
        panelText: 'Panel value',
      },
    },
    schema: {
      type: 'object',
      properties: {
        groupAlias: {
          label: 'Fields group',
          layout: {
            component: 'fields-group',
            cols: 12,
            schema: {
              type: 'object',
              properties: {
                groupTextAlias: {
                  dataPath: 'containers.groupText',
                  label: 'Text in fields group',
                  layout: { component: 'text-field' },
                },
              },
            },
          },
        },
        cardAlias: {
          title: 'Card with dataPath field',
          layout: {
            component: 'card',
            cols: 12,
            schema: {
              type: 'object',
              properties: {
                cardTextAlias: {
                  dataPath: 'containers.cardText',
                  label: 'Text in card',
                  layout: { component: 'text-field' },
                },
              },
            },
          },
        },
        panelsAlias: {
          layout: { component: 'expansion-panels', cols: 12 },
          panels: [
            {
              title: 'Panel with dataPath field',
              openByDefault: true,
              schema: {
                type: 'object',
                properties: {
                  panelTextAlias: {
                    dataPath: 'containers.panelText',
                    label: 'Text in expansion panel',
                    layout: { component: 'text-field' },
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
};

export const DuplicatedSectionOneLevel: Story = {
  name: 'Duplicated section 1 level',
  play: async (context) => {
    await waitForFormReady(context);
    const canvas = within(context.canvasElement);
    const itemValueFields = await canvas.findAllByLabelText('Item value 1');

    await clearAndType(itemValueFields[0], 'Updated item 1');
    await waitFor(() => {
      expect(context.args.formModel.items[0].value1).toBe('Updated item 1');
    });
  },
  args: {
    formModel: {
      items: [
        { value1: 'Item 1 value', value2: 1 },
        { value1: 'Item 2 value', value2: 2 },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        itemsSectionAlias: {
          dataPath: 'items',
          label: 'Items',
          layout: {
            component: 'duplicated-section',
            cols: 12,
            schema: {
              type: 'object',
              properties: {
                itemValue1Alias: {
                  dataPath: 'items[].value1',
                  label: 'Item value 1',
                  layout: { component: 'text-field', cols: 6 },
                },
                itemValue2Alias: {
                  dataPath: 'items[].value2',
                  label: 'Item value 2',
                  type: 'int',
                  layout: { component: 'number-field', cols: 6 },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const DuplicatedSectionTwoLevels: Story = {
  name: 'Duplicated section 2 levels',
  play: async (context) => {
    await waitForFormReady(context);
    const canvas = within(context.canvasElement);

    await clearAndType(await canvas.findByLabelText('Parent name'), 'Updated parent');
    await waitFor(() => {
      expect(context.args.formModel.items[0].name).toBe('Updated parent');
    });

    const childFields = await canvas.findAllByLabelText('Child name');
    await clearAndType(childFields[1], 'Updated child 1.2');
    await waitFor(() => {
      expect(context.args.formModel.items[0].children[1].name).toBe('Updated child 1.2');
    });
  },
  args: {
    formModel: {
      items: [
        {
          name: 'Parent 1',
          children: [
            { name: 'Child 1.1' },
            { name: 'Child 1.2' },
          ],
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        parentsAlias: {
          dataPath: 'items',
          label: 'Parents',
          layout: {
            component: 'duplicated-section',
            cols: 12,
            schema: {
              type: 'object',
              properties: {
                parentNameAlias: {
                  dataPath: 'items[].name',
                  label: 'Parent name',
                  layout: { component: 'text-field' },
                },
                childrenAlias: {
                  dataPath: 'items[].children',
                  label: 'Children',
                  layout: {
                    component: 'duplicated-section',
                    schema: {
                      type: 'object',
                      properties: {
                        childNameAlias: {
                          dataPath: 'items[].children[].name',
                          label: 'Child name',
                          layout: { component: 'text-field' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const DuplicatedSectionThreeLevels: Story = {
  name: 'Duplicated section 3 levels',
  play: async (context) => {
    await waitForFormReady(context);
    const canvas = within(context.canvasElement);

    await clearAndType(await canvas.findByLabelText('Parent name'), 'Updated parent 3 levels');
    await waitFor(() => {
      expect(context.args.formModel.items[0].name).toBe('Updated parent 3 levels');
    });

    await clearAndType(await canvas.findByLabelText('Detail value'), 'Updated detail');
    await waitFor(() => {
      expect(context.args.formModel.items[0].children[0].details[0].value).toBe('Updated detail');
    });
  },
  args: {
    formModel: {
      items: [
        {
          name: 'Parent 1',
          children: [
            {
              name: 'Child 1.1',
              details: [{ value: 'Detail 1.1.1' }],
            },
          ],
        },
      ],
    },
    schema: {
      type: 'object',
      properties: {
        parentsAlias: {
          dataPath: 'items',
          label: 'Parents',
          layout: {
            component: 'duplicated-section',
            cols: 12,
            schema: {
              type: 'object',
              properties: {
                parentNameAlias: {
                  dataPath: 'items[].name',
                  label: 'Parent name',
                  layout: { component: 'text-field' },
                },
                childrenAlias: {
                  dataPath: 'items[].children',
                  label: 'Children',
                  layout: {
                    component: 'duplicated-section',
                    schema: {
                      type: 'object',
                      properties: {
                        childNameAlias: {
                          dataPath: 'items[].children[].name',
                          label: 'Child name',
                          layout: { component: 'text-field' },
                        },
                        detailsAlias: {
                          dataPath: 'items[].children[].details',
                          label: 'Details',
                          layout: {
                            component: 'duplicated-section',
                            schema: {
                              type: 'object',
                              properties: {
                                detailValueAlias: {
                                  dataPath: 'items[].children[].details[].value',
                                  label: 'Detail value',
                                  layout: { component: 'text-field' },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const DictionaryAndRemoteFields: Story = {
  name: 'Dictionary, ordered, user, group and location',
  play: async (context) => {
    await waitForFormReady(context);
    const canvas = within(context.canvasElement);

    await selectListItem(await canvas.findByLabelText('Dictionary'), 2);
    await waitFor(() => {
      expect(context.args.formModel.remote.dictionary.id).toBe('AMD');
    });

    await selectListItem(await canvas.findByLabelText('Combobox'), 0);
    await waitFor(() => {
      expect(context.args.formModel.remote.combobox.id).toBe('AFN');
    });
  },
  args: {
    formModel: {
      remote: {
        dictionary: null,
        combobox: null,
        ordered: [],
        user: null,
        group: null,
        location: null,
      },
    },
    schema: {
      type: 'object',
      properties: {
        dictionaryAlias: {
          dataPath: 'remote.dictionary',
          label: 'Dictionary',
          layout: { component: 'dictionary', cols: 6 },
          source: { url: '/mocks/currencies', title: 'label', value: 'id' },
        },
        comboboxAlias: {
          dataPath: 'remote.combobox',
          label: 'Combobox',
          layout: { component: 'combobox', cols: 6 },
          source: { url: '/mocks/currencies', title: 'label', value: 'id' },
        },
        orderedAlias: {
          dataPath: 'remote.ordered',
          label: 'Ordered multi select',
          variant: 'list',
          layout: { component: 'ordered-multi-select', cols: 12 },
          source: { url: '/mocks/multi-ordered-items', title: 'label', value: 'id' },
        },
        userAlias: {
          dataPath: 'remote.user',
          label: 'User',
          layout: { component: 'user-input', cols: 6, props: { multiple: false } },
          source: { url: '/mocks/users', itemsPerPage: 20 },
        },
        groupAlias: {
          dataPath: 'remote.group',
          label: 'Group',
          layout: { component: 'group-input', cols: 6, props: { multiple: false } },
          source: { url: '/mocks/groups', itemsPerPage: 20 },
        },
        locationAlias: {
          dataPath: 'remote.location',
          label: 'Location',
          layout: { component: 'location', cols: 12 },
        },
      },
    },
  },
  parameters: {
    msw: {
      handlers: [
        ...MULTI_ORDERED_SELECT_MOCK,
        ...MOCK_REQUEST_CURRENCY,
        ...USER_INPUT_MOCKS,
        ...GROUP_INPUT_MOCKS,
        LOCATION_MOCK_REQUEST,
      ],
    },
  },
};

export const DisplayAndStaticFields: Story = {
  name: 'Display and special fields',
  args: {
    formModel: {
      display: {
        viewer: 'Viewer value from dataPath',
        validationMessages: [],
        bookmark: 'two',
        multiLanguage: { pl: 'Wartosc', en: 'Value' },
        file: null,
        editableText: 'Editable special value',
      },
    },
    schema: {
      type: 'object',
      properties: {
        viewerAlias: {
          dataPath: 'display.viewer',
          label: 'Data viewer',
          type: 'text',
          layout: { component: 'data-viewer', cols: 6 },
        },
        validationMessagesAlias: {
          dataPath: 'display.validationMessages',
          label: 'Validation messages viewer',
          layout: { component: 'validation-messages-viewer', cols: 6 },
        },
        bookmarkAlias: {
          dataPath: 'display.bookmark',
          label: 'Bookmark',
          layout: { component: 'bookmark', cols: 6 },
          source: { items: simpleItems },
        },
        multiLanguageAlias: {
          dataPath: 'display.multiLanguage',
          label: 'Multi language',
          layout: { component: 'multi-language-control', cols: 6 },
        },
        fileAlias: {
          dataPath: 'display.file',
          label: 'File field',
          layout: { component: 'file-field', cols: 6 },
        },
        editableTextAlias: {
          dataPath: 'display.editableText',
          label: 'Editable field next to display fields',
          layout: { component: 'text-field', cols: 6 },
        },
        staticInfo: {
          content: 'Static fields do not update the model, but can coexist with dataPath fields.',
          layout: { component: 'static-content', cols: 12, tag: 'span' },
        },
      },
    },
  },
  play: async (context) => {
    await waitForFormReady(context);
    const canvas = within(context.canvasElement);

    await clearAndType(
      await canvas.findByLabelText('Editable field next to display fields'),
      'Display story updated value',
    );
    await waitFor(() => {
      expect(context.args.formModel.display.editableText).toBe('Display story updated value');
    });
  },
};
