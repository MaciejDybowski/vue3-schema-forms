import { beforeEach, describe, expect, it, vi } from 'vitest';

import { resolveSchemaWithLocale } from '@/core/engine/utils';

const { resolveMock } = vi.hoisted(() => ({
  resolveMock: vi.fn(),
}));

vi.mock('@/core/engine/jsonSchemaResolver', () => ({
  jsonSchemaResolver: {
    resolve: resolveMock,
  },
}));

const schemaByPath: Record<string, any> = {
  'child-form': {
    type: 'object',
    properties: {
      test: {
        label: 'test',
        layout: {
          component: 'text-field',
        },
      },
    },
    required: ['test'],
  },
  'child-level-1': {
    type: 'object',
    properties: {
      level1Field: {
        label: 'level1Field',
        layout: {
          component: 'text-field',
        },
      },
      level2Block: {
        '0': 'child-level-2',
        $ref: '#/options/nestedFormsPath',
        flatStructure: true,
      },
    },
    required: ['level1Field'],
  },
  'child-level-2': {
    type: 'object',
    properties: {
      level2Field: {
        label: 'level2Field',
        layout: {
          component: 'text-field',
        },
      },
    },
    required: ['level2Field'],
  },
  'limit-level-1': {
    type: 'object',
    properties: {
      level1: { label: 'level1', layout: { component: 'text-field' } },
      block2: { '0': 'limit-level-2', $ref: '#/options/nestedFormsPath', flatStructure: true },
    },
    required: ['level1'],
  },
  'limit-level-2': {
    type: 'object',
    properties: {
      level2: { label: 'level2', layout: { component: 'text-field' } },
      block3: { '0': 'limit-level-3', $ref: '#/options/nestedFormsPath', flatStructure: true },
    },
    required: ['level2'],
  },
  'limit-level-3': {
    type: 'object',
    properties: {
      level3: { label: 'level3', layout: { component: 'text-field' } },
      block4: { '0': 'limit-level-4', $ref: '#/options/nestedFormsPath', flatStructure: true },
    },
    required: ['level3'],
  },
  'limit-level-4': {
    type: 'object',
    properties: {
      level4: { label: 'level4', layout: { component: 'text-field' } },
      block5: { '0': 'limit-level-5', $ref: '#/options/nestedFormsPath', flatStructure: true },
    },
    required: ['level4'],
  },
  'limit-level-5': {
    type: 'object',
    properties: {
      level5: { label: 'level5', layout: { component: 'text-field' } },
      block6: { '0': 'limit-level-6', $ref: '#/options/nestedFormsPath', flatStructure: true },
    },
    required: ['level5'],
  },
  'limit-level-6': {
    type: 'object',
    properties: {
      level6: { label: 'level6', layout: { component: 'text-field' } },
    },
    required: ['level6'],
  },
};

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function deepResolveRefs(node: any): any {
  if (Array.isArray(node)) {
    return node.map((item) => deepResolveRefs(item));
  }

  if (!node || typeof node !== 'object') {
    return node;
  }

  if (typeof node.$ref === 'string' && node.$ref.startsWith('/api/forms?path=')) {
    const path = node.$ref.split('/api/forms?path=')[1];
    const resolvedSchema = schemaByPath[path];
    return resolvedSchema ? cloneValue(resolvedSchema) : node;
  }

  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(node)) {
    result[key] = deepResolveRefs(value);
  }
  return result;
}

describe('Zagnieżdzone formularze:', () => {
  beforeEach(() => {
    resolveMock.mockReset();
    resolveMock.mockImplementation(async (schema: any) => ({
      result: deepResolveRefs(schema),
    }));
  });

  it('spłaszcza strukturę gdy flatStructure=true', async () => {
    const schema = {
      type: 'object',
      required: ['fieldA', 'blokA'],
      properties: {
        fieldA: {
          label: 'fieldA',
          layout: {
            component: 'text-field',
          },
        },
        blokA: {
          '0': 'child-form',
          $ref: '#/options/nestedFormsPath',
          flatStructure: true,
        },
        fieldB: {
          label: 'fieldB',
          layout: {
            component: 'text-field',
          },
        },
      },
    };

    const options = {
      nestedFormsPath: {
        $ref: '/api/forms?path={0}',
      },
    };

    const resolved = await resolveSchemaWithLocale(schema as any, 'pl', options as any);

    expect(Object.keys(resolved.properties ?? {})).toEqual(['fieldA', 'test', 'fieldB']);
    expect(resolved.properties?.blokA).toBeUndefined();
    expect(resolved.properties?.test).toBeDefined();
    expect(resolved.required).toEqual(['fieldA', 'test']);
  });

  it('dodaje required z child schema gdy parent nie ma required i flatStructure=true', async () => {
    const schema = {
      type: 'object',
      properties: {
        fieldA: {
          label: 'fieldA',
          layout: {
            component: 'text-field',
          },
        },
        blokA: {
          '0': 'child-form',
          $ref: '#/options/nestedFormsPath',
          flatStructure: true,
        },
      },
    };

    const options = {
      nestedFormsPath: {
        $ref: '/api/forms?path={0}',
      },
    };

    const resolved = await resolveSchemaWithLocale(schema as any, 'pl', options as any);

    expect(Object.keys(resolved.properties ?? {})).toEqual(['fieldA', 'test']);
    expect(resolved.properties?.blokA).toBeUndefined();
    expect(resolved.required).toEqual(['test']);
  });

  it('zachowuje strukturę zagnieżdżoną gdy flatStructure=false', async () => {
    const schema = {
      type: 'object',
      required: ['fieldA', 'blokA'],
      properties: {
        fieldA: {
          label: 'fieldA',
          layout: {
            component: 'text-field',
          },
        },
        blokA: {
          '0': 'child-form',
          $ref: '#/options/nestedFormsPath',
          flatStructure: false,
        },
        fieldB: {
          label: 'fieldB',
          layout: {
            component: 'text-field',
          },
        },
      },
    };

    const options = {
      nestedFormsPath: {
        $ref: '/api/forms?path={0}',
      },
    };

    const resolved = await resolveSchemaWithLocale(schema as any, 'pl', options as any);

    expect(Object.keys(resolved.properties ?? {})).toEqual(['fieldA', 'blokA', 'fieldB']);
    expect(resolved.properties?.test).toBeUndefined();
    expect(resolved.properties?.blokA?.properties?.test).toBeDefined();
    expect(resolved.required).toEqual(['fieldA', 'blokA']);
    expect(resolved.properties?.blokA?.required).toEqual(['test']);
  });

  it('obsługuje 2 poziomy zagnieżdżenia gdy każdy poziom ma flatStructure=true', async () => {
    const schema = {
      type: 'object',
      properties: {
        blockA: {
          '0': 'child-level-1',
          $ref: '#/options/nestedFormsPath',
          flatStructure: true,
        },
      },
    };

    const options = {
      nestedFormsPath: {
        $ref: '/api/forms?path={0}',
      },
    };

    const resolved = await resolveSchemaWithLocale(schema as any, 'pl', options as any);

    expect(Object.keys(resolved.properties ?? {})).toEqual(['level1Field', 'level2Field']);
    expect(resolved.properties?.level2Block).toBeUndefined();
    expect(resolved.required).toEqual(['level1Field', 'level2Field']);
  });

  it('zatrzymuje rozwijanie nested blocków po 5 poziomach', async () => {
    const schema = {
      type: 'object',
      properties: {
        block1: {
          '0': 'limit-level-1',
          $ref: '#/options/nestedFormsPath',
          flatStructure: true,
        },
      },
    };

    const options = {
      nestedFormsPath: {
        $ref: '/api/forms?path={0}',
      },
    };

    const resolved = await resolveSchemaWithLocale(schema as any, 'pl', options as any);

    expect(resolved.properties?.level1).toBeDefined();
    expect(resolved.properties?.level5).toBeDefined();
    expect(resolved.properties?.level6).toBeUndefined();
    expect(resolved.properties?.block6).toBeDefined();
    expect(resolved.required).toEqual(['level1', 'level2', 'level3', 'level4', 'level5']);
  });
});
