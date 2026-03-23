import { SchemaOptions } from '@/types/schema/SchemaOptions';

const OPTIONS_REF_PREFIX = '#/options/';
export const MAX_NESTED_FORM_DEPTH = 5;

export function resolveOptionsRefTemplate(options: SchemaOptions, key: string): string | undefined {
  const optionValue = (options as Record<string, unknown>)?.[key];

  if (typeof optionValue === 'string') {
    const normalized = optionValue.trim();
    return normalized.length > 0 ? normalized : undefined;
  }

  if (optionValue && typeof optionValue === 'object') {
    const nestedRef = (optionValue as { $ref?: unknown }).$ref;
    if (typeof nestedRef === 'string') {
      const normalized = nestedRef.trim();
      return normalized.length > 0 ? normalized : undefined;
    }
  }

  return undefined;
}

export function isOptionsRef(value: any, options: SchemaOptions): boolean {
  if (typeof value?.$ref !== 'string' || !value.$ref.startsWith(OPTIONS_REF_PREFIX)) return false;
  const key = value.$ref.slice(OPTIONS_REF_PREFIX.length);
  return resolveOptionsRefTemplate(options, key) !== undefined;
}

export function hasOptionsRefs(
  properties: Record<string, any>,
  options: SchemaOptions,
  maxDepth = MAX_NESTED_FORM_DEPTH,
  depth = 0,
): boolean {
  if (depth > maxDepth) return false;

  for (const value of Object.values(properties)) {
    if (isOptionsRef(value, options)) return true;
    if (value?.properties && hasOptionsRefs(value.properties, options, maxDepth, depth + 1)) {
      return true;
    }
  }

  return false;
}

/**
 * Usuwa flagę flatStructure z węzłów $ref przed serializacją/resolve.
 */
export function stripFlatStructureFlag(
  properties: Record<string, any>,
  options: SchemaOptions,
  maxDepth = MAX_NESTED_FORM_DEPTH,
  depth = 0,
): void {
  if (depth > maxDepth) return;

  for (const value of Object.values(properties)) {
    if (isOptionsRef(value, options)) {
      delete value.flatStructure;
    }

    if (value?.properties) {
      stripFlatStructureFlag(value.properties, options, maxDepth, depth + 1);
    }
  }
}

/**
 * Zbiera klucze properties których $ref wskazuje na dowolny klucz w options (np. '#/options/nestedFormsPath').
 * Działa rekurencyjnie – zwraca Set ścieżek dla późniejszego spłaszczenia.
 */
export function collectNestedFormsPathKeys(
  properties: Record<string, any>,
  options: SchemaOptions,
  parentPath = '',
  maxDepth = MAX_NESTED_FORM_DEPTH,
  depth = 0,
): Set<string> {
  const keys = new Set<string>();
  if (depth > maxDepth) return keys;

  for (const [key, value] of Object.entries(properties)) {
    const fullPath = parentPath ? `${parentPath}.${key}` : key;

    if (isOptionsRef(value, options) && value.flatStructure === true) {
      keys.add(fullPath);
      continue;
    }

    if (value?.properties) {
      collectNestedFormsPathKeys(value.properties, options, fullPath, maxDepth, depth + 1).forEach((k) =>
        keys.add(k),
      );
    }
  }

  return keys;
}

/**
 * Po resolve – dla każdego klucza z nestedFormsPathKeys:
 *  - pobiera .properties z rozwiązanego węzła
 *  - usuwa węzeł-placeholder
 *  - wstrzykuje pobrane properties na bieżący poziom (spłaszczenie)
 */
export function flattenNestedFormsPathNodes(
  properties: Record<string, any>,
  keys: Set<string>,
  parentPath = '',
  parentNode?: { required?: string[] },
  maxDepth = MAX_NESTED_FORM_DEPTH,
  depth = 0,
): void {
  if (depth > maxDepth) return;

  const needsRebuild = Object.keys(properties).some((key) => {
    const fullPath = parentPath ? `${parentPath}.${key}` : key;
    return keys.has(fullPath);
  });

  if (needsRebuild) {
    const rebuilt: Record<string, any> = {};

    for (const key of Object.keys(properties)) {
      const fullPath = parentPath ? `${parentPath}.${key}` : key;

      if (!keys.has(fullPath)) {
        rebuilt[key] = properties[key];
        continue;
      }

      const nestedNode = properties[key] ?? {};
      const nestedProperties: Record<string, any> = nestedNode.properties ?? {};
      Object.assign(rebuilt, nestedProperties);

      let parentRequired = Array.isArray(parentNode?.required) ? parentNode.required : undefined;

      if (Array.isArray(parentRequired)) {
        const placeholderIndex = parentRequired.indexOf(key);
        if (placeholderIndex >= 0) {
          parentRequired.splice(placeholderIndex, 1);
        }
      }

      if (Array.isArray(nestedNode.required) && nestedNode.required.length > 0) {
        if (!Array.isArray(parentRequired) && parentNode) {
          parentNode.required = [];
          parentRequired = parentNode.required;
        }

        if (Array.isArray(parentRequired)) {
          for (const nestedRequiredKey of nestedNode.required) {
            if (!parentRequired.includes(nestedRequiredKey)) {
              parentRequired.push(nestedRequiredKey);
            }
          }
        }
      }
    }

    for (const key of Object.keys(properties)) delete properties[key];
    Object.assign(properties, rebuilt);
  }

  for (const key of Object.keys(properties)) {
    const fullPath = parentPath ? `${parentPath}.${key}` : key;
    if (!keys.has(fullPath) && properties[key]?.properties) {
      flattenNestedFormsPathNodes(properties[key].properties, keys, fullPath, properties[key], maxDepth, depth + 1);
    }
  }
}
