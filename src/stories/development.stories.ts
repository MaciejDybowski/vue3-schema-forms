// @ts-nocheck
import { Meta, StoryObj } from '@storybook/vue3-vite';
import { HttpResponse, http } from 'msw';

import FormStoryWrapper from '../../.storybook/components/FormStoryWrapper.vue';











export default {
  title: 'Development Area',
  component: FormStoryWrapper,
  args: {
    emittedObject: {},
    signals: {},
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

const JSON_TRANSLATIONS_BLOCK = [
  http.get('/json-mock/translations', async (req, res, ctx) => {
    return HttpResponse.json({
      pl: {
        firstName: 'Imię',
        lastName: 'Nazwisko',
        email: 'E-mail',
        password: 'Hasło',
      },
      en: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'E-mail',
        password: 'Password',
      },
    });
  }),
];

const JSON_FORM_BLOCK = [
  http.get(
    '/json-mock/1/form-schema?formName=/folder1/formularz_waritant_a',
    async (req, res, ctx) => {
      return HttpResponse.json({
        type: 'object',
        properties: {
          test: {
            label: 'test',
            layout: {
              component: 'text-field',
            },
          },
        },
      });
    },
  ),
];

export const TableOne: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        formA: {
          '0': '/folder1/formularz_waritant_a',
          $ref: '#/options/nestedFormsPath',
          flatStructure: true,
        },

        firstName: {
          label: { $ref: '#/i18n/~$locale~/firstName' },
          layout: {
            component: 'text-field',
            cols: 6,
            fillRow: true,
          },
        },
      },
    },
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'comfortable',
      },
      context: {
        project: {
          id: 1,
        },
      },
      i18n: {
        $ref: '../json-mock/translations',
      },
      otherVariable: 'TEST',
      nestedFormsPath: '../json-mock/1/form-schema?formName={0}',
    },
  },
  parameters: {
    msw: {
      handlers: [...JSON_TRANSLATIONS_BLOCK, ...JSON_FORM_BLOCK],
    },
  },
};

const JSON_FORM_BLOCK_2 = [
  http.get('/api/projects/mon-testy/forms?path=child-form', async (req, res, ctx) => {
    return HttpResponse.json({
      type: 'object',
      properties: {
        test: {
          label: 'Required input',
          layout: {
            component: 'text-field',
          },
        },
      },
      required: ['test'],
    });
  }),
];

export const table2: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        fieldA: {
          label: 'fieldA',
          layout: {
            cols: {
              xs: 12,
              sm: 6,
              md: 6,
              lg: 4,
              xl: 4,
              xxl: 4,
            },
            fillRow: true,
            component: 'text-field',
          },
          onChange: [],
        },
        blokA: {
          '0': 'child-form',
          $ref: '#/options/nestedFormsPath',
          flatStructure: true,
        },
        fieldB: {
          label: 'fieldB',
          layout: {
            cols: {
              xs: 12,
              sm: 6,
              md: 6,
              lg: 4,
              xl: 4,
              xxl: 4,
            },
            fillRow: true,
            component: 'text-field',
          },
          onChange: [],
        },
      },
    },
    options: {
      fieldProps: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        readonly: false,
      },
      buttonProps: {
        size: 'small',
        variant: 'flat',
        rounded: '',
      },
      nestedFormsPath: ' ../api/projects/mon-testy/forms?path={0}',
    },
  },
  parameters: {
    msw: {
      handlers: [...JSON_FORM_BLOCK_2],
    },
  },
};

export const table3: Story = {
  args: {
    formModel: {},
    schema: {
      type: 'object',
      properties: {
        field: {
          label: "Field 1",
          layout: {
            component: "text-field"
          }
        },
        items: {
          layout: {
            component: 'duplicated-section',
            schema: {
              type: 'object',
              properties: {
                item1: {
                  label: 'item1',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'text-field',
                  },
                  onChange: [],
                },
                item2: {
                  label: 'item2',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'text-field',
                  },
                  onChange: [],
                },
              },
            },
            options: {
              addBtnText: 'Add element',
              showDivider: false,
              ordinalNumberInModel: false,
              showFirstInitRow: true,
            },
          },
          editable: 'field="test"',
          showElements: true,
          onChange: [],
        },
        files: {
          layout: {
            component: 'duplicated-section',
            schema: {
              type: 'object',
              properties: {
                file1: {
                  label: 'file1',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'text-field',
                  },
                  onChange: [],
                },
                file2: {
                  label: 'file2',
                  layout: {
                    cols: { xs: 12, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 },
                    fillRow: true,
                    component: 'text-field',
                  },
                  onChange: [],
                },
              },
            },
            options: {
              addBtnText: 'Add element',
              showDivider: false,
              ordinalNumberInModel: false,
              showFirstInitRow: true,
            },
          },
          editable: true,
          showElements: 'field="1"',
          onChange: [],
        },
      },
    },
  },
  parameters: {},
};
