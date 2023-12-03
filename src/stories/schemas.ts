import { Schema } from '@/vocabulary/schema';
import { SchemaTextField } from '@/vocabulary/schema/elements';

export const offsetSchema: Schema = {
  type: 'object',
  properties: {
    field1: {
      label: 'Full-width Field',
      layout: {
        component: 'text-field',
        cols: 12,
      },
    },
    field2: {
      label: 'Variable-width Field Relative to Screen',
      layout: {
        component: 'text-field',
        cols: {
          xxl: 6,
          xl: 6,
          md: 8,
          sm: 12,
        },
      },
    },
    field3: {
      label: 'Field with "fillRow" Option',
      layout: {
        component: 'text-field',
        cols: 6,
        fillRow: true,
      },
    },
    field4: {
      label: 'Field with Offset Set to 4',
      layout: {
        component: 'text-field',
        offset: 4,
        cols: 3,
      },
    },
    field5: {
      label: 'Field with Offset Set to 2',
      layout: {
        component: 'text-field',
        offset: 2,
        cols: 3,
      },
    },
  },
};
export const conditionSchema: Schema = {
  type: 'object',
  properties: {
    description: {
      content: 'Type: admin/admin',
      layout: {
        component: 'static-content',
        tag: 'span',
      },
    },
    login: {
      label: 'Login',
      layout: {
        component: 'text-field',
      },
    },
    password: {
      label: 'Password',
      layout: {
        component: 'text-field',
        props: {
          type: 'password',
        },
      },
    },
    secretCode: {
      label: 'Result',
      layout: {
        component: 'text-field',
        if: 'login =="admin" and password == "admin"',
      },
    },
  },
};

export const schemaWithTranslation: Schema = {
  type: 'object',
  properties: {
    firstName: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: 6,
        fillRow: true,
      },
    },
    lastName: {
      label: { $ref: '#/i18n/~$locale~/lastName' },
      layout: {
        component: 'text-field',
        cols: 6,
        fillRow: true,
      },
    },
    email: {
      label: { $ref: '#/i18n/~$locale~/email' },
      layout: {
        component: 'text-field',
        cols: 6,
        fillRow: true,
      },
    },
    password: {
      label: { $ref: '#/i18n/~$locale~/password' },
      layout: {
        component: 'text-field',
        cols: 6,
        fillRow: true,
      },
    },
  },
  i18n: {
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
  },
};

export const aLotOfTranslationsSchema: Schema = {
  type: 'object',
  properties: {
    firstName: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName1: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName2: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName3: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName4: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName5: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName6: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName7: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName8: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName9: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName11: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName12: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName13: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName14: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName15: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName16: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName17: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName18: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName19: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName22: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName23: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName24: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName25: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName26: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName27: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName28: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName29: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    firstName30: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
  },
  i18n: {
    en: {
      firstName: 'First Name',
    },
    pl: {
      firstName: 'Imię',
    },
  },
};

export const duplicatedSectionSchema: Schema = {
  type: 'object',
  properties: {
    firstName: {
      label: { $ref: '#/i18n/~$locale~/firstName' },
      layout: {
        component: 'text-field',
        cols: {
          lg: 6,
          md: 8,
        },
        props: {
          density: 'compact',
        },
      },
    },
    nested: {
      properties: {
        test1: {
          label: 'test1',
          layout: {
            component: 'text-field',
            cols: {
              lg: 6,
              md: 8,
            },
            props: {
              density: 'compact',
            },
          },
        },
      },
      required: ['test1'],
    },
    users: {
      layout: {
        component: 'duplicated-section',
        schema: {
          type: 'object',
          properties: {
            field1: {
              label: { $ref: '#/i18n/~$locale~/firstName' },
              layout: {
                component: 'text-field',
                cols: 3,
              },
            },
            field2: {
              label: { $ref: '#/i18n/~$locale~/firstName' },
              layout: {
                component: 'text-field',
                cols: 3,
              },
            },
            field3: {
              label: { $ref: '#/i18n/~$locale~/firstName' },
              layout: {
                component: 'text-field',
                cols: 3,
              },
            },
            field4: {
              label: { $ref: '#/i18n/~$locale~/firstName' },
              layout: {
                component: 'text-field',
                cols: 3,
              },
            },
            field5: {
              label: { $ref: '#/i18n/~$locale~/firstName' },
              layout: {
                component: 'text-field',
                cols: 3,
              },
            },
            field6: {
              label: { $ref: '#/i18n/~$locale~/firstName' },
              layout: {
                component: 'text-field',
                cols: 3,
              },
            },
          },
        },
      },
    },
  },
  required: ['firstName'],
  i18n: {
    en: {
      firstName: 'First Name',
    },
    pl: {
      firstName: 'Imię',
    },
  },
};

export const schema_100_field: Schema = {
  type: 'object',
  properties: {
    field1: { label: '1', layout: { component: 'text-field' } },
    field2: { label: '1', layout: { component: 'text-field' } },
    field3: { label: '1', layout: { component: 'text-field' } },
    field4: { label: '1', layout: { component: 'text-field' } },
    field5: { label: '1', layout: { component: 'text-field' } },
    field6: { label: '1', layout: { component: 'text-field' } },
    field7: { label: '1', layout: { component: 'text-field' } },
    field8: { label: '1', layout: { component: 'text-field' } },
    field9: { label: '1', layout: { component: 'text-field' } },
    field10: { label: '1', layout: { component: 'text-field' } },
    field11: { label: '1', layout: { component: 'text-field' } },
    field12: { label: '1', layout: { component: 'text-field' } },
    field13: { label: '1', layout: { component: 'text-field' } },
    field14: { label: '1', layout: { component: 'text-field' } },
    field15: { label: '1', layout: { component: 'text-field' } },
    field16: { label: '1', layout: { component: 'text-field' } },
    field17: { label: '1', layout: { component: 'text-field' } },
    field18: { label: '1', layout: { component: 'text-field' } },
    field19: { label: '1', layout: { component: 'text-field' } },
    field20: { label: '1', layout: { component: 'text-field' } },
    field21: { label: '1', layout: { component: 'text-field' } },
    field22: { label: '1', layout: { component: 'text-field' } },
    field23: { label: '1', layout: { component: 'text-field' } },
    field24: { label: '1', layout: { component: 'text-field' } },
    field25: { label: '1', layout: { component: 'text-field' } },
    field26: { label: '1', layout: { component: 'text-field' } },
    field27: { label: '1', layout: { component: 'text-field' } },
    field28: { label: '1', layout: { component: 'text-field' } },
    field29: { label: '1', layout: { component: 'text-field' } },
    field30: { label: '1', layout: { component: 'text-field' } },
    afield1: { label: '1', layout: { component: 'text-field' } },
    afield2: { label: '1', layout: { component: 'text-field' } },
    afield3: { label: '1', layout: { component: 'text-field' } },
    afield4: { label: '1', layout: { component: 'text-field' } },
    afield5: { label: '1', layout: { component: 'text-field' } },
    afield6: { label: '1', layout: { component: 'text-field' } },
    afield7: { label: '1', layout: { component: 'text-field' } },
    afield8: { label: '1', layout: { component: 'text-field' } },
    afield9: { label: '1', layout: { component: 'text-field' } },
    afield10: { label: '1', layout: { component: 'text-field' } },
    afield11: { label: '1', layout: { component: 'text-field' } },
    afield12: { label: '1', layout: { component: 'text-field' } },
    afield13: { label: '1', layout: { component: 'text-field' } },
    afield14: { label: '1', layout: { component: 'text-field' } },
    afield15: { label: '1', layout: { component: 'text-field' } },
    afield16: { label: '1', layout: { component: 'text-field' } },
    afield17: { label: '1', layout: { component: 'text-field' } },
    afield18: { label: '1', layout: { component: 'text-field' } },
    afield19: { label: '1', layout: { component: 'text-field' } },
    afield20: { label: '1', layout: { component: 'text-field' } },
    afield21: { label: '1', layout: { component: 'text-field' } },
    afield22: { label: '1', layout: { component: 'text-field' } },
    afield23: { label: '1', layout: { component: 'text-field' } },
    afield24: { label: '1', layout: { component: 'text-field' } },
    afield25: { label: '1', layout: { component: 'text-field' } },
    afield26: { label: '1', layout: { component: 'text-field' } },
    afield27: { label: '1', layout: { component: 'text-field' } },
    afield28: { label: '1', layout: { component: 'text-field' } },
    afield29: { label: '1', layout: { component: 'text-field' } },
    afield30: { label: '1', layout: { component: 'text-field' } },
    qfield1: { label: '1', layout: { component: 'text-field' } },
    qfield2: { label: '1', layout: { component: 'text-field' } },
    qfield3: { label: '1', layout: { component: 'text-field' } },
    qfield4: { label: '1', layout: { component: 'text-field' } },
    qfield5: { label: '1', layout: { component: 'text-field' } },
    qfield6: { label: '1', layout: { component: 'text-field' } },
    qfield7: { label: '1', layout: { component: 'text-field' } },
    qfield8: { label: '1', layout: { component: 'text-field' } },
    qfield9: { label: '1', layout: { component: 'text-field' } },
    qfield10: { label: '1', layout: { component: 'text-field' } },
    qfield11: { label: '1', layout: { component: 'text-field' } },
    qfield12: { label: '1', layout: { component: 'text-field' } },
    qfield13: { label: '1', layout: { component: 'text-field' } },
    qfield14: { label: '1', layout: { component: 'text-field' } },
    qfield15: { label: '1', layout: { component: 'text-field' } },
    qfield16: { label: '1', layout: { component: 'text-field' } },
    qfield17: { label: '1', layout: { component: 'text-field' } },
    qfield18: { label: '1', layout: { component: 'text-field' } },
    qfield19: { label: '1', layout: { component: 'text-field' } },
    qfield20: { label: '1', layout: { component: 'text-field' } },
    qfield21: { label: '1', layout: { component: 'text-field' } },
    qfield22: { label: '1', layout: { component: 'text-field' } },
    qfield23: { label: '1', layout: { component: 'text-field' } },
    qfield24: { label: '1', layout: { component: 'text-field' } },
    qfield25: { label: '1', layout: { component: 'text-field' } },
    qfield26: { label: '1', layout: { component: 'text-field' } },
    qfield27: { label: '1', layout: { component: 'text-field' } },
    qfield28: { label: '1', layout: { component: 'text-field' } },
    qfield29: { label: '1', layout: { component: 'text-field' } },
    qfield30: { label: '1', layout: { component: 'text-field' } },
    zfield1: { label: '1', layout: { component: 'text-field' } },
    zfield2: { label: '1', layout: { component: 'text-field' } },
    zfield3: { label: '1', layout: { component: 'text-field' } },
    zfield4: { label: '1', layout: { component: 'text-field' } },
    zfield5: { label: '1', layout: { component: 'text-field' } },
    zfield6: { label: '1', layout: { component: 'text-field' } },
    zfield7: { label: '1', layout: { component: 'text-field' } },
    zfield8: { label: '1', layout: { component: 'text-field' } },
    zfield9: { label: '1', layout: { component: 'text-field' } },
    zfield10: { label: '1', layout: { component: 'text-field' } },
  },
};

export const calculationSchemaInDuplicatedSection: Schema = {
  type: 'object',
  properties: {
    digitsAfterDecimal: {
      type: 'number',
      label: 'Digits after decimal',
      layout: {
        component: 'text-field',
        cols: 2,
      },
    },
    items: {
      layout: {
        component: 'duplicated-section',
        schema: {
          type: 'object',
          properties: {
            field1: {
              label: 'Field 1',
              type: 'number',
              layout: { component: 'text-field', cols: 2 },
            },
            field2: {
              label: 'Field 2',
              type: 'number',
              layout: { component: 'text-field', cols: 2 },
            },
            field3: {
              label: 'Result +',
              layout: {
                component: 'text-field',
                cols: 2,
              },
              calculation: 'field1 + field2',
            } as SchemaTextField,
            field4: {
              label: 'Result ^2',
              layout: {
                component: 'text-field',
                cols: 2,
              },
              calculation: 'field3 * field3',
            } as SchemaTextField,
            field5: {
              label: 'Result^2 - field1',
              layout: {
                component: 'text-field',
                cols: 2,
              },
              calculation: 'field4 - field1',
            } as SchemaTextField,
            field6: {
              label: 'Result combined',
              layout: {
                component: 'text-field',
                cols: 2,
              },
              calculation: 'field1 + field2 + field4 - field5',
            } as SchemaTextField,
          },
        },
      },
    },
  },
};

export const simpleCalculationSchema: Schema = {
  type: 'object',
  properties: {
    field1: {
      label: 'Field 1',
      type: 'number',
      layout: { component: 'text-field', cols: 2 },
    },
    field2: {
      label: 'Field 2',
      type: 'number',
      layout: { component: 'text-field', cols: 2 },
    },
    field3: {
      label: 'Result +',
      layout: {
        component: 'text-field',
        cols: 2,
      },
      calculation: 'field1 + field2',
    } as SchemaTextField,
    field4: {
      label: 'Result ^2',
      layout: {
        component: 'text-field',
        cols: 2,
      },
      calculation: 'field3 * field3',
    } as SchemaTextField,
  },
};

export const simpleCalculationWithDynamicDigits: Schema = {
  type: 'object',
  properties: {
    currency: {
      properties: {
        digitsAfterDecimal: {
          label: 'Digits after decimal',
          type: 'number',
          layout: {
            component: 'text-field',
            cols: 2,
            fillRow: true,
          },
        },
      },
    },
    field1: {
      label: 'Field 1',
      type: 'number',
      layout: { component: 'text-field', cols: 2 },
    },
    field2: {
      label: 'Field 2',
      type: 'number',
      layout: { component: 'text-field', cols: 2 },
    },
    field3: {
      label: 'Result +',
      layout: {
        component: 'text-field',
        cols: 2,
      },
      calculation: 'field1 + field2',
    } as SchemaTextField,
    field4: {
      label: 'Result ^2',
      layout: {
        component: 'text-field',
        cols: 2,
      },
      calculation: 'field3 * field3',
    } as SchemaTextField,
  },
};
