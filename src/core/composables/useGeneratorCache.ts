// composables/useGeneratorCache.ts
import { reactive, provide, inject, InjectionKey } from 'vue';

type GeneratorCache = Map<string, any>;
const GeneratorCacheKey: InjectionKey<GeneratorCache> = Symbol('GeneratorCache');

export function provideGeneratorCache() {
  const cache = reactive(new Map<string, any>());
  provide(GeneratorCacheKey, cache);
  return cache;
}

export function useGeneratorCache() {
  const cache = inject(GeneratorCacheKey);
  if (!cache) {
    throw new Error('GeneratorCache not provided');
  }

  return {
    get: (key: string) => cache.get(key),
    set: (key: string, value: any) => cache.set(key, value),
    has: (key: string) => cache.has(key),
    clear: () => cache.clear(),
    delete: (key: string) => cache.delete(key),
  };
}
