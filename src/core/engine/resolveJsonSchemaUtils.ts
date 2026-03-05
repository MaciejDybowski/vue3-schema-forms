import { SchemaOptions } from '@/types/schema/SchemaOptions';

export function isOptionsRef(value: any, options: SchemaOptions): boolean {
  if (!value?.$ref?.startsWith('#/options/')) return false;
  const key = value.$ref.slice('#/options/'.length);
  return key in options;
}

/**
 * Usuwa flagę flatStructure z węzłów $ref przed serializacją/resolve.
 */
export function stripFlatStructureFlag(properties: Record<string, any>, options: SchemaOptions): void {
  for (const value of Object.values(properties)) {
    if (isOptionsRef(value, options)) {
      delete value.flatStructure;
    } else if (value?.properties) {
      stripFlatStructureFlag(value.properties, options);
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
): Set<string> {
  const keys = new Set<string>();
  for (const [key, value] of Object.entries(properties)) {
    const fullPath = parentPath ? `${parentPath}.${key}` : key;
    if (isOptionsRef(value, options) && value.flatStructure === true) {
      keys.add(fullPath);
    } else if (value?.properties) {
      collectNestedFormsPathKeys(value.properties, options, fullPath).forEach((k) => keys.add(k));
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
): void {
  const needsRebuild = Object.keys(properties).some((key) => {
    const fullPath = parentPath ? `${parentPath}.${key}` : key;
    return keys.has(fullPath);
  });

  if (needsRebuild) {
    // Odbuduj obiekt zachowując insertion order – placeholder zastępowany swoimi .properties w tym samym miejscu
    const rebuilt: Record<string, any> = {};
    for (const key of Object.keys(properties)) {
      const fullPath = parentPath ? `${parentPath}.${key}` : key;
      if (keys.has(fullPath)) {
        const nestedProperties: Record<string, any> = properties[key]?.properties ?? {};
        Object.assign(rebuilt, nestedProperties);
      } else {
        rebuilt[key] = properties[key];
      }
    }
    // Nadpisz zawartość oryginalnego obiektu in-place
    for (const key of Object.keys(properties)) delete properties[key];
    Object.assign(properties, rebuilt);
  }

  // Rekurencja dla węzłów które nie były placeholderami
  for (const key of Object.keys(properties)) {
    const fullPath = parentPath ? `${parentPath}.${key}` : key;
    if (!keys.has(fullPath) && properties[key]?.properties) {
      flattenNestedFormsPathNodes(properties[key].properties, keys, fullPath);
    }
  }
}

