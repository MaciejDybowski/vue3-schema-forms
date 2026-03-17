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

const childSchema = {
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
};

function deepResolveRefs(node: any): any {
  if (Array.isArray(node)) {
    return node.map((item) => deepResolveRefs(item));
  }

  if (!node || typeof node !== 'object') {
    return node;
  }

  if (node.$ref === '/api/forms?path=child-form') {
    return childSchema;
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
});

